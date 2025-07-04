import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

// GET /api/templates - Get all templates for the current user
export async function GET(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    
    if (!clerkId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get the user's database ID, create if doesn't exist
    let user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true }
    });

    if (!user) {
      // User doesn't exist in database, create them
      try {
        user = await prisma.user.create({
          data: {
            clerkId,
            email: `${clerkId}@placeholder.com`, // Unique placeholder email
            name: 'User', // Placeholder name
          },
          select: { id: true }
        });

        // Create default templates for new users
        await createDefaultTemplates(user.id);
      } catch (error) {
        console.error('Error creating user:', error);
        return new NextResponse('User not found and could not be created', { status: 404 });
      }
    }

    // Get platform filter from query params
    const { searchParams } = new URL(req.url);
    const platform = searchParams.get('platform');

    const templates = await prisma.template.findMany({
      where: {
        userId: user.id,
        ...(platform && { platform: platform as any }),
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('[TEMPLATES_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

// Helper function to create default templates
async function createDefaultTemplates(userId: string) {
  const defaultTemplates = [
    {
      name: 'Professional LinkedIn',
      description: 'Transform content into professional LinkedIn posts with business insights',
      platform: 'LINKEDIN' as const,
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
      name: 'Professional Twitter',
      description: 'Transform content into professional Twitter posts',
      platform: 'TWITTER' as const,
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
    {
      name: 'Casual LinkedIn',
      description: 'Make content more casual and approachable for LinkedIn',
      platform: 'LINKEDIN' as const,
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
      name: 'Casual Twitter',
      description: 'Make content more casual and approachable for Twitter',
      platform: 'TWITTER' as const,
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
  ];

  for (const template of defaultTemplates) {
    await prisma.template.create({
      data: {
        name: template.name,
        description: template.description,
        platform: template.platform,
        prompt: template.prompt,
        userId: userId,
      },
    });
  }
}

// POST /api/templates - Create a new template
export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    
    if (!clerkId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get the user's database ID, create if doesn't exist
    let user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true }
    });

    if (!user) {
      // User doesn't exist in database, create them
      try {
        user = await prisma.user.create({
          data: {
            clerkId,
            email: `${clerkId}@placeholder.com`, // Unique placeholder email
            name: 'User', // Placeholder name
          },
          select: { id: true }
        });
      } catch (error) {
        console.error('Error creating user:', error);
        return new NextResponse('User not found and could not be created', { status: 404 });
      }
    }

    const body = await req.json();
    const { name, description, platform, prompt } = body;

    if (!name || !platform || !prompt) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Validate platform value
    if (!['LINKEDIN', 'TWITTER'].includes(platform)) {
      return new NextResponse('Invalid platform value', { status: 400 });
    }

    const template = await prisma.template.create({
      data: {
        name,
        description,
        platform,
        prompt,
        userId: user.id,
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error('[TEMPLATES_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 