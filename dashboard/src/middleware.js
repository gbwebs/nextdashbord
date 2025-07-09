// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('auth_token')?.value;
  const isAuthenticated = Boolean(token);

  console.log('🔒 Middleware triggered:', {
    path: request.nextUrl.pathname,
    token,
    isAuthenticated,
  });

  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // ✅ MATCHES /dashboard too
};