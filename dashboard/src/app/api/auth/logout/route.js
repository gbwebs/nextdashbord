// app/api/auth/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' });

  // Clear the cookie by setting maxAge: 0
  res.cookies.set('auth_token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });

  return res;
}
