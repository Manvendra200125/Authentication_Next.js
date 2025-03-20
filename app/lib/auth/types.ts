export type UserRole = 'admin' | 'user' | 'guest';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name?: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthToken;
}

export interface AuthError {
  message: string;
  code: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
} 