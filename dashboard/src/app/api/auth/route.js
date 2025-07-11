
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password } = await req.json();


  if (email === 'admin@oneclickdrive.com' && password === 'admin123') {
    const res = NextResponse.json({ success: true });


    res.cookies.set('auth_token', `token-${email}`, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60,
    });

    return res;
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
