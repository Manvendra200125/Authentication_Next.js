'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth/AuthProvider';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

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

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-xl flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </div>
      </div>
    );
  }

  if (!user) {
    // This should not happen because of middleware, but just in case
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-700 animate-fade-in" style={{ transition: 'all 0.5s ease' }}>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-4 md:mb-0">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-300">
              Logged in as <span className="font-semibold text-indigo-300">{user.email}</span> (
              <span className="capitalize text-purple-300">{user.role}</span>)
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-all hover:shadow-lg hover:shadow-red-500/20"
            >
              Log out
            </button>
          </div>
        </header>

        <main>
          <div className="bg-gray-800/60 backdrop-blur-lg shadow-xl rounded-xl p-6 mb-6 border border-gray-700/50 animate-fade-in hover:shadow-indigo-500/10 transition-all duration-300 hover:scale-[1.01]" style={{ transition: 'all 0.5s ease' }}>
            <h2 className="text-2xl font-semibold mb-4 text-indigo-300">Welcome, {user.name || user.email}!</h2>
            <p className="mb-6 text-gray-300">
              This is a protected dashboard page. You are currently logged in with <span className="text-purple-300 font-semibold">{user.role}</span> permissions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.2s' }}>
              <div className="bg-gradient-to-br from-indigo-900/30 to-indigo-800/20 rounded-xl p-5 border border-indigo-700/30 hover:shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/40 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-indigo-300">Analytics</h3>
                </div>
                <p className="text-gray-400">View your activity and performance metrics</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-xl p-5 border border-purple-700/30 hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <h3 className="text-xl font-semibold text-purple-300">Notifications</h3>
                </div>
                <p className="text-gray-400">Check your latest updates and alerts</p>
              </div>
            </div>

            {user.role === 'admin' && (
              <div className="mt-8 p-6 bg-gradient-to-br from-pink-900/30 to-purple-800/20 rounded-xl border border-pink-700/30 animate-fade-in hover:shadow-lg hover:shadow-pink-500/10 hover:border-pink-500/30 transition-all duration-300" style={{ transition: 'all 0.5s ease', transitionDelay: '0.4s' }}>
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <h3 className="text-xl font-semibold text-pink-300">Admin Controls</h3>
                </div>
                <p className="text-gray-300 mb-4">
                  This special section is only visible to administrators like you.
                </p>
                <button className="px-4 py-2 bg-pink-600/80 hover:bg-pink-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-pink-600/20">
                  Access Admin Panel
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-4 animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.6s' }}>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-700/80 backdrop-blur text-white rounded hover:bg-gray-600 transition-all duration-300 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
              </svg>
              Back to Home
            </Link>
            {user.role === 'admin' && (
              <Link
                href="/admin"
                className="px-4 py-2 bg-purple-700/80 backdrop-blur text-white rounded hover:bg-purple-600 transition-all duration-300 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Admin Panel
              </Link>
            )}
          </div>
        </main>
      </div>
      
      <style jsx global>{`
        .animate-fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
} 