import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

// GET /api/templates - Get all templates for the current user
export async function GET() {
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

    const templates = await prisma.template.findMany({
      where: {
        userId: user.id,
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

// POST /api/templates - Create a new template
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
    const { name, description, content } = body;

    if (!name || !content) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const template = await prisma.template.create({
      data: {
        name,
        description,
        content,
        userId: user.id,
      },
    });

    return NextResponse.json(template);
  } catch (error) {
    console.error('[TEMPLATES_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 