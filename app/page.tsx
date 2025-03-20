'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/lib/auth/AuthProvider';

export default function HomePage() {
  const { user, isAuthenticated, isLoading } = useAuth();

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

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-4xl w-full">
        <div className="mb-12 text-center animate-fade-in" style={{ transition: 'all 0.5s ease' }}>
          <h1 className="text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
            Next.js Authentication with RBAC
          </h1>
          <p className="text-xl text-gray-300">
            A demonstration of cookie-based authentication with role-based access control
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/60 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-700/50 hover:shadow-indigo-500/10 transition-all duration-300 hover:scale-[1.02] animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.1s' }}>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-indigo-900/50 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-indigo-300">Authentication</h2>
            </div>
            <p className="text-gray-400 mb-6">Secure cookie-based authentication system that works seamlessly with both server actions and client requests.</p>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-700/50 hover:shadow-purple-500/10 transition-all duration-300 hover:scale-[1.02] animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.2s' }}>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-900/50 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-purple-300">RBAC</h2>
            </div>
            <p className="text-gray-400 mb-6">Role-based access control system that protects routes and resources based on user permissions.</p>
          </div>

          <div className="bg-gray-800/60 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-gray-700/50 hover:shadow-pink-500/10 transition-all duration-300 hover:scale-[1.02] animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.3s' }}>
            <div className="flex items-center mb-4">
              <div className="p-2 bg-pink-900/50 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-pink-300">Next.js & Go</h2>
            </div>
            <p className="text-gray-400 mb-6">Combines the power of Next.js 15 in the frontend with a robust Go backend for authentication services.</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-4 w-full max-w-xs mx-auto animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.4s' }}>
          {isLoading ? (
            <div className="py-4 flex justify-center">
              <svg className="animate-spin h-6 w-6 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : isAuthenticated ? (
            <>
              <Link 
                href="/dashboard" 
                className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Go to Dashboard
              </Link>
              {user?.role === 'admin' && (
                <Link 
                  href="/admin" 
                  className="px-4 py-3 bg-pink-600/80 hover:bg-pink-600 text-white rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Admin Panel
                </Link>
              )}
            </>
          ) : (
            <>
              <Link 
                href="/login" 
                className="px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg text-center transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </Link>
              <div className="px-5 py-4 bg-gray-800/80 rounded-lg border border-gray-700/50">
                <p className="text-gray-400 text-sm text-center">
                  Use these demo accounts:<br/>
                  <span className="text-indigo-400">user@example.com</span> / <span className="text-indigo-400">password123</span><br/>
                  <span className="text-pink-400">admin@example.com</span> / <span className="text-pink-400">admin123</span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
} 