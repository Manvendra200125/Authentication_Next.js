import { cookies } from 'next/headers';
import { AuthToken, User } from './types';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 7 * 24 * 60 * 60, // 7 days
};

export const AUTH_COOKIE_NAME = 'auth_token';
export const USER_COOKIE_NAME = 'user_data';

// In Next.js 15, cookies() is a synchronous function, but its methods should be awaited
export async function setAuthCookies(tokens: AuthToken, user: User) {
  // Set auth token cookie
  cookies().set(AUTH_COOKIE_NAME, JSON.stringify(tokens), COOKIE_OPTIONS);
  
  // Set user data cookie
  cookies().set(USER_COOKIE_NAME, JSON.stringify(user), COOKIE_OPTIONS);
}

export async function getAuthCookies() {
  const authToken = cookies().get(AUTH_COOKIE_NAME);
  const userData = cookies().get(USER_COOKIE_NAME);
  
  if (!authToken || !userData) {
    return null;
  }
  
  try {
    return {
      tokens: JSON.parse(authToken.value) as AuthToken,
      user: JSON.parse(userData.value) as User,
    };
  } catch (error) {
    return null;
  }
}

export async function clearAuthCookies() {
  cookies().delete(AUTH_COOKIE_NAME);
  cookies().delete(USER_COOKIE_NAME);
}

export async function hasValidAuthCookies(): Promise<boolean> {
  const authData = await getAuthCookies();
  return authData !== null;
}

export async function getUserFromCookies(): Promise<User | null> {
  const authData = await getAuthCookies();
  return authData?.user || null;
}

export async function getAuthTokenFromCookies(): Promise<AuthToken | null> {
  const authData = await getAuthCookies();
  return authData?.tokens || null;
} 