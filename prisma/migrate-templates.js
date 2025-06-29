const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function migrateTemplates() {
  console.log('Starting template migration...');

  try {
    // Step 1: Get all existing templates with their platform templates
    const existingTemplates = await prisma.template.findMany({
      include: {
        platformTemplates: true,
        posts: true,
      },
    });

    console.log(`Found ${existingTemplates.length} existing templates`);

    // Step 2: Create new platform-specific templates
    for (const template of existingTemplates) {
      console.log(`Processing template: ${template.name}`);

      // Create a new template for each platform
      for (const platformTemplate of template.platformTemplates) {
        const newTemplate = await prisma.template.create({
          data: {
            name: `${template.name} (${platformTemplate.platform})`,
            description: template.description,
            platform: platformTemplate.platform,
            prompt: platformTemplate.prompt,
            userId: template.userId,
            isDefault: template.isDefault,
          },
        });

        console.log(`Created new template: ${newTemplate.name} for ${platformTemplate.platform}`);

        // Step 3: Create PostTemplate records for existing posts
        for (const post of template.posts) {
          await prisma.postTemplate.create({
            data: {
              postId: post.id,
              templateId: newTemplate.id,
              platform: platformTemplate.platform,
              generatedContent: post.formattedContent, // Use existing formatted content if available
            },
          });
        }
      }

      // Step 4: Delete the old template (this will cascade delete platformTemplates)
      await prisma.template.delete({
        where: { id: template.id },
      });

      console.log(`Deleted old template: ${template.name}`);
    }

    console.log('Template migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the migration
migrateTemplates()
  .then(() => {
    console.log('Migration script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration script failed:', error);
    process.exit(1);
  }); 