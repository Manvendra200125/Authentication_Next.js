import { NextResponse } from 'next/server';
import { clearAuthCookies } from '@/app/lib/auth/utils';

export async function POST() {
  try {
    // Clear authentication cookies
    await clearAuthCookies();

    return NextResponse.json({ message: 'Logged out successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 