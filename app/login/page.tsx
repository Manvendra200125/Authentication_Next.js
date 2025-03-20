'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/lib/auth/AuthProvider';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, error, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Animation effect on mount
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-fade-in');
    elements.forEach((element, index) => {
      if (element instanceof HTMLElement) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 100 * index);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      const from = searchParams.get('from') || '/dashboard';
      router.push(from);
    } catch (error) {
      // Error is handled by useAuth hook
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <div className="w-full max-w-md animate-fade-in" style={{ transition: 'all 0.5s ease' }}>
        <div className="bg-gray-800/60 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-gray-700/50 hover:shadow-indigo-500/10 transition-all duration-500">
          <div className="p-8">
            <div className="text-center mb-8 animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.1s' }}>
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                Sign In
              </h2>
              <p className="mt-3 text-gray-400">
                Access your account dashboard
              </p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.2s' }}>
                <label htmlFor="email" className="block text-sm font-medium text-indigo-300 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-4 py-3 bg-gray-700/50 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.3s' }}>
                <label htmlFor="password" className="block text-sm font-medium text-indigo-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-4 py-3 bg-gray-700/50 border border-gray-600 placeholder-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm text-center rounded-lg py-2 px-3 bg-red-900/30 border border-red-800/50 animate-fade-in" style={{ transition: 'all 0.5s ease' }}>
                  {error.message}
                </div>
              )}

              <div className="animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.4s' }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Sign in
                    </div>
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-400 animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.5s' }}>
              <p>
                Use these demo credentials:
              </p>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div className="border border-indigo-800/40 bg-indigo-900/20 rounded p-2 text-xs">
                  <span className="block text-indigo-400 font-medium">User Account</span>
                  <span className="block text-gray-300">user@example.com</span>
                  <span className="block text-gray-300">password123</span>
                </div>
                <div className="border border-purple-800/40 bg-purple-900/20 rounded p-2 text-xs">
                  <span className="block text-purple-400 font-medium">Admin Account</span>
                  <span className="block text-gray-300">admin@example.com</span>
                  <span className="block text-gray-300">admin123</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 