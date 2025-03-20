import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookies } from '@/app/lib/auth/utils';
import { AuthResponse, User, UserRole } from '@/app/lib/auth/types';

// Mock users for testing
const MOCK_USERS: Record<string, User> = {
  'user@example.com': {
    id: '1',
    email: 'user@example.com',
    role: 'user' as UserRole,
    name: 'Regular User',
  },
  'admin@example.com': {
    id: '2',
    email: 'admin@example.com',
    role: 'admin' as UserRole,
    name: 'Admin User',
  },
};

// Mock passwords
const MOCK_PASSWORDS = {
  'user@example.com': 'password123',
  'admin@example.com': 'admin123',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // In a real app, this would call the Go backend instead
    // For testing, we'll use mock data
    const user = MOCK_USERS[email as keyof typeof MOCK_USERS];
    const validPassword = MOCK_PASSWORDS[email as keyof typeof MOCK_PASSWORDS];

    if (!user || validPassword !== password) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create mock tokens
    const tokens = {
      accessToken: `mock-access-token-${Date.now()}`,
      refreshToken: `mock-refresh-token-${Date.now()}`,
    };

    // Set authentication cookies
    await setAuthCookies(tokens, user);

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 