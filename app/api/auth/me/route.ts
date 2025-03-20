import { NextResponse } from 'next/server';
import { getUserFromCookies } from '@/app/lib/auth/utils';

export async function GET() {
  try {
    const user = await getUserFromCookies();
    
    if (!user) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 