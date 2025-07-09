// app/api/auth/me/route.js
import { NextResponse } from 'next/server';

export async function GET(req) {
  const token = req.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const email = token.split('-')[1]; // Extract email from mock token
  return NextResponse.json({ user: { email } });
}
