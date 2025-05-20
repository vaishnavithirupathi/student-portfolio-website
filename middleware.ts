import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  // Check if the route is an API route for adding content
  if (
    request.nextUrl.pathname.startsWith('/api/projects/add') ||
    request.nextUrl.pathname.startsWith('/api/blogs/add') ||
    request.nextUrl.pathname.startsWith('/api/education/add')
  ) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

// Configure which routes to protect
export const config = {
  matcher: [
    '/api/projects/add',
    '/api/blogs/add',
    '/api/education/add',
  ],
};
