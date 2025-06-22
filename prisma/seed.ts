import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a test user (you'll need to replace this with a real user ID from your system)
  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      clerkId: 'test-clerk-id',
    },
  });

  // Create example templates
  const professionalTemplate = await prisma.template.create({
    data: {
      name: 'Professional LinkedIn',
      description: 'Transform content into professional LinkedIn posts with business insights',
      userId: testUser.id,
      platformTemplates: {
        create: [
          {
            platform: 'LINKEDIN',
            prompt: `Transform the following content into a professional LinkedIn post. 
            
Guidelines:
- Use a professional, business-focused tone
- Include industry insights and thought leadership
- Keep it engaging but authoritative
- Use bullet points or numbered lists when appropriate
- End with a call-to-action or question to encourage engagement
- Maximum 1300 characters

Content to transform:`,
          },
          {
            platform: 'TWITTER',
            prompt: `Transform the following content into a professional Twitter post.
            
Guidelines:
- Use a professional but conversational tone
- Focus on key insights and takeaways
- Use relevant hashtags (2-3 max)
- Keep it concise and impactful
- Include a call-to-action when appropriate
- Maximum 280 characters

Content to transform:`,
          },
        ],
      },
    },
  });

  const casualTemplate = await prisma.template.create({
    data: {
      name: 'Casual & Friendly',
      description: 'Make content more casual and approachable for social media',
      userId: testUser.id,
      platformTemplates: {
        create: [
          {
            platform: 'LINKEDIN',
            prompt: `Transform the following content into a casual, friendly LinkedIn post.
            
Guidelines:
- Use a warm, approachable tone
- Make it conversational and relatable
- Include personal anecdotes or examples when relevant
- Use emojis sparingly but effectively
- Ask engaging questions to spark conversation
- Keep it authentic and human
- Maximum 1300 characters

Content to transform:`,
          },
          {
            platform: 'TWITTER',
            prompt: `Transform the following content into a casual, friendly Twitter post.
            
Guidelines:
- Use a warm, conversational tone
- Make it relatable and engaging
- Use emojis to add personality
- Include relevant hashtags (2-3 max)
- Ask questions to encourage interaction
- Keep it fun and approachable
- Maximum 280 characters

Content to transform:`,
          },
        ],
      },
    },
  });

  const educationalTemplate = await prisma.template.create({
    data: {
      name: 'Educational & Informative',
      description: 'Transform content into educational posts that teach and inform',
      userId: testUser.id,
      platformTemplates: {
        create: [
          {
            platform: 'LINKEDIN',
            prompt: `Transform the following content into an educational LinkedIn post.
            
Guidelines:
- Focus on teaching and providing value
- Break down complex concepts into digestible points
- Use "Did you know?" or "Here's what I learned" formats
- Include actionable tips or insights
- Use numbered lists or bullet points for clarity
- Encourage learning and discussion
- Maximum 1300 characters

Content to transform:`,
          },
          {
            platform: 'TWITTER',
            prompt: `Transform the following content into an educational Twitter thread or post.
            
Guidelines:
- Focus on teaching and providing value
- Break down information into digestible chunks
- Use "Pro tip:" or "Quick fact:" formats
- Include actionable insights
- Use relevant hashtags for education topics
- Encourage learning and questions
- Maximum 280 characters (or plan for a thread)

Content to transform:`,
          },
        ],
      },
    },
  });

  console.log('Seed data created successfully!');
  console.log('Created templates:', {
    professional: professionalTemplate.name,
    casual: casualTemplate.name,
    educational: educationalTemplate.name,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 