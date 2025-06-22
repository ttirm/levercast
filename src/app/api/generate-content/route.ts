import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

// POST /api/generate-content - Generate content using template prompts
export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    
    if (!clerkId) {
      return new NextResponse('Unauthorized', { status: 401 });
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

    // Get the template and its platform-specific prompt
    const template = await prisma.template.findFirst({
      where: {
        id: templateId,
        userId: user.id,
      },
      include: {
        platformTemplates: {
          where: {
            platform: platform as any,
          },
        },
      },
    });

    if (!template) {
      return new NextResponse('Template not found', { status: 404 });
    }

    const platformTemplate = template.platformTemplates[0];
    if (!platformTemplate) {
      return new NextResponse('Platform template not found', { status: 404 });
    }

    // TODO: Integrate with actual LLM service (OpenAI, Anthropic, etc.)
    // For now, we'll return a mock response
    const generatedContent = await generateContentWithLLM(
      platformTemplate.prompt,
      rawContent,
      platform
    );

    return NextResponse.json({
      generatedContent,
      template: {
        id: template.id,
        name: template.name,
        platform: platformTemplate.platform,
        prompt: platformTemplate.prompt,
      },
    });
  } catch (error) {
    console.error('[GENERATE_CONTENT_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

// Mock LLM integration - replace with actual LLM service
async function generateContentWithLLM(
  prompt: string,
  rawContent: string,
  platform: string
): Promise<string> {
  // This is a placeholder implementation
  // In a real implementation, you would:
  // 1. Call OpenAI API, Anthropic API, or another LLM service
  // 2. Pass the prompt and raw content
  // 3. Return the generated content
  
  const enhancedPrompt = `${prompt}

Raw content to transform:
"${rawContent}"

Please generate content that follows the above instructions for ${platform}.`;

  // For now, return a mock response
  return `Generated content for ${platform} using the template prompt. This would be the actual LLM-generated content based on: "${rawContent}"`;
} 