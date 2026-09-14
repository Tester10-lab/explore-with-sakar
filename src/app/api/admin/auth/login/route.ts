import { NextRequest, NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/db';
import { verifyPassword, signToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const admin = getAdminUser();

    // Check username
    if (username.trim().toLowerCase() !== admin.username.toLowerCase()) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Check password
    const isValid = verifyPassword(password, admin.passwordHash, admin.salt);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid username or password' }, { status: 401 });
    }

    // Generate JWT token (expires in 7 days)
    const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
    const token = signToken({
      username: admin.username,
      role: 'admin',
      exp,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        username: admin.username,
        role: 'admin',
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
