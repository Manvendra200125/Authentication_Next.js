import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { UserRole } from './lib/auth/types';

// Define protected routes and their required roles
const PROTECTED_ROUTES: Record<string, UserRole[]> = {
  '/admin': ['admin'],
  '/dashboard': ['admin', 'user'],
  '/profile': ['admin', 'user', 'guest'],
};

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if the path is protected
  const requiredRoles = Object.entries(PROTECTED_ROUTES).find(([route]) => 
    path.startsWith(route)
  )?.[1];

  if (!requiredRoles) {
    return NextResponse.next();
  }

  // Get auth cookie from request
  const authCookie = request.cookies.get('auth_token');
  const userCookie = request.cookies.get('user_data');
  
  // If no cookies are found, redirect to login
  if (!authCookie || !userCookie) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', path);
    return NextResponse.redirect(loginUrl);
  }

  // Parse user data
  try {
    const userData = JSON.parse(userCookie.value);
    const userRole = userData.role as UserRole;

    // Check if user has required role
    if (!requiredRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  } catch (error) {
    // Invalid cookie format, redirect to login
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
  ],
}; 