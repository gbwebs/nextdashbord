// app/api/auth/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password } = await req.json();

  // Mock admin credentials
  if (email === 'admin@oneclickdrive.com' && password === 'admin123') {
    const res = NextResponse.json({ success: true });

    // Set cookie
    res.cookies.set('auth_token', `token-${email}`, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60, // 1 hour
    });

    return res;
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
