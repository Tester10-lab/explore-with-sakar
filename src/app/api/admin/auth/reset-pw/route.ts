import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';
import { writeKey } from '@/lib/store';

// ONE-TIME USE: Reset admin password
// DELETE this file after use!
// Call: GET /api/admin/auth/reset-pw?token=sakar-reset-2026

const RESET_TOKEN = 'sakar-reset-2026';
const NEW_USERNAME = 'admin';
const NEW_PASSWORD = 'sakar2026';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');

  if (token !== RESET_TOKEN) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const { hash, salt } = hashPassword(NEW_PASSWORD);
    const admin = {
      username: NEW_USERNAME,
      passwordHash: hash,
      salt,
      updatedAt: new Date().toISOString(),
    };
    await writeKey('admin', admin);

    return NextResponse.json({
      success: true,
      message: `Admin password reset. Username: "${NEW_USERNAME}", Password: "${NEW_PASSWORD}". DELETE /api/admin/auth/reset-pw now!`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
