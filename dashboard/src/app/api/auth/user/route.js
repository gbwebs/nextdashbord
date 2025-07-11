
import { NextResponse } from 'next/server';

export async function GET(req) {
  const token = req.cookies.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const email = token.split('-')[1]; 
  return NextResponse.json({ user: { email } });
}
