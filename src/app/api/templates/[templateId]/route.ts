import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

// PATCH /api/templates/[templateId] - Update a template
export async function PATCH(
  req: Request,
  { params }: { params: { templateId: string } }
) {
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
    const { name, description, content } = body;

    if (!name || !content) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Verify template ownership
    const existingTemplate = await prisma.template.findUnique({
      where: {
        id: params.templateId,
        userId: user.id,
      },
    });

    if (!existingTemplate) {
      return new NextResponse('Template not found', { status: 404 });
    }

    const template = await prisma.template.update({
      where: {
        id: params.templateId,
      },
      data: {
        name,
        description,
        content,
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error('[TEMPLATE_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

// DELETE /api/templates/[templateId] - Delete a template
export async function DELETE(
  req: Request,
  { params }: { params: { templateId: string } }
) {
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

    // Verify template ownership
    const existingTemplate = await prisma.template.findUnique({
      where: {
        id: params.templateId,
        userId: user.id,
      },
    });

    if (!existingTemplate) {
      return new NextResponse('Template not found', { status: 404 });
    }

    await prisma.template.delete({
      where: {
        id: params.templateId,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('[TEMPLATE_DELETE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 