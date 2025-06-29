import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { generateContentWithOpenAI, validateOpenAIKey } from '@/lib/openai';

// POST /api/generate-content - Generate content using template prompt
export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    
    if (!clerkId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Check if OpenAI API key is configured
    if (!validateOpenAIKey()) {
      return new NextResponse('OpenAI API key not configured', { status: 500 });
    }

    // Get the user's database ID
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true }
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const body = await req.json();
    const { templateId, platform, rawContent } = body;

    if (!templateId || !platform || !rawContent) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Validate platform
    if (!['LINKEDIN', 'TWITTER'].includes(platform)) {
      return new NextResponse('Invalid platform', { status: 400 });
    }

    // Get the template for the given platform and templateId
    const template = await prisma.template.findFirst({
      where: {
        id: templateId,
        userId: user.id,
        platform: platform,
      },
      select: {
        id: true,
        name: true,
        platform: true,
        prompt: true,
      },
    });

    if (!template) {
      return new NextResponse('Template not found', { status: 404 });
    }

    // Generate content using OpenAI
    const generatedContent = await generateContentWithOpenAI({
      prompt: template.prompt,
      rawContent,
      platform,
    });

    return NextResponse.json({
      generatedContent,
      template: {
        id: template.id,
        name: template.name,
        platform: template.platform,
        prompt: template.prompt,
      },
    });
  } catch (error) {
    console.error('[GENERATE_CONTENT_POST]', error);
    
    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('OpenAI API key')) {
        return new NextResponse(error.message, { status: 500 });
      } else if (error.message.includes('rate limit')) {
        return new NextResponse(error.message, { status: 429 });
      } else if (error.message.includes('temporarily unavailable')) {
        return new NextResponse(error.message, { status: 503 });
      }
    }
    
    return new NextResponse('Internal Error', { status: 500 });
  }
} 