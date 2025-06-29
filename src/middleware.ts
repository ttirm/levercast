import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect all routes under /app
    '/app/:path*',
    // Protect API routes
    '/api/:path*',
    // Protect trpc routes
    '/trpc/:path*',
    // Protect specific routes that require authentication
    '/new',
    '/posts/:path*',
    '/templates/:path*',
    '/settings/:path*',
    '/edit/:path*',
    // Exclude static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|sign-in|sign-up).*)',
  ],
};