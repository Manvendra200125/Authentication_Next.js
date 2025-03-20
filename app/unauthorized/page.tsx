'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800/60 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-red-800/30 hover:shadow-red-500/10 transition-all duration-500 p-8 animate-fade-in" style={{ transition: 'all 0.5s ease' }}>
          <div className="flex justify-center mb-6 animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.1s' }}>
            <div className="p-3 rounded-full bg-red-900/30 border border-red-800/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-red-400 mb-2 animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.2s' }}>
            Access Denied
          </h1>
          
          <p className="mt-4 text-gray-300 text-center mb-8 animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.3s' }}>
            You do not have permission to access this page. Please contact an administrator or return to an authorized area.
          </p>
          
          <div className="space-y-3 animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.4s' }}>
            <button
              onClick={() => router.back()}
              className="w-full px-4 py-3 bg-gray-700/80 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </button>
            
            <Link
              href="/"
              className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
              </svg>
              Return to Home
            </Link>
            
            <Link
              href="/login"
              className="w-full px-4 py-3 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 