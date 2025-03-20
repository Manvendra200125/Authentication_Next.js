'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/auth/AuthProvider';

export default function AdminPage() {
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
          <svg className="animate-spin h-5 w-5 text-pink-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    // This should not happen because of middleware, but just in case
    router.push('/unauthorized');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-pink-800/30 animate-fade-in" style={{ transition: 'all 0.5s ease' }}>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500 mb-4 md:mb-0">Admin Panel</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-300">
              Logged in as <span className="font-semibold text-pink-300">{user.email}</span> (
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
          <div className="bg-gray-800/60 backdrop-blur-lg shadow-xl rounded-xl p-6 mb-6 border border-pink-800/30 animate-fade-in hover:shadow-pink-500/10 transition-all duration-300" style={{ transition: 'all 0.5s ease' }}>
            <h2 className="text-2xl font-semibold mb-4 text-pink-300">Admin Controls</h2>
            <p className="mb-6 text-gray-300">
              This page is only accessible to users with the admin role. You have complete control over the system's administration features.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.2s' }}>
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-xl p-5 border border-purple-700/30 hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-500/40 transition-all duration-300 hover:scale-[1.02] group">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-purple-300">User Management</h3>
                </div>
                <p className="text-gray-400 mb-4">Manage user accounts and permissions.</p>
                <button className="px-3 py-1 bg-purple-600/80 hover:bg-purple-600 text-white text-sm rounded hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                  Manage Users
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-5 border border-blue-700/30 hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/40 transition-all duration-300 hover:scale-[1.02] group">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-blue-300">System Settings</h3>
                </div>
                <p className="text-gray-400 mb-4">Configure application settings and preferences.</p>
                <button className="px-3 py-1 bg-blue-600/80 hover:bg-blue-600 text-white text-sm rounded hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                  System Settings
                </button>
              </div>

              <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-xl p-5 border border-green-700/30 hover:shadow-lg hover:shadow-green-500/10 hover:border-green-500/40 transition-all duration-300 hover:scale-[1.02] group">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="text-xl font-semibold text-green-300">Content Management</h3>
                </div>
                <p className="text-gray-400 mb-4">Manage website content and resources.</p>
                <button className="px-3 py-1 bg-green-600/80 hover:bg-green-600 text-white text-sm rounded hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
                  Manage Content
                </button>
              </div>

              <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 rounded-xl p-5 border border-amber-700/30 hover:shadow-lg hover:shadow-amber-500/10 hover:border-amber-500/40 transition-all duration-300 hover:scale-[1.02] group">
                <div className="flex items-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-400 mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-amber-300">Analytics</h3>
                </div>
                <p className="text-gray-400 mb-4">View site analytics and statistics.</p>
                <button className="px-3 py-1 bg-amber-600/80 hover:bg-amber-600 text-white text-sm rounded hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
                  View Analytics
                </button>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-br from-pink-900/30 to-purple-800/20 rounded-xl border border-pink-700/30 animate-fade-in hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300" style={{ transition: 'all 0.5s ease', transitionDelay: '0.3s' }}>
              <div className="flex items-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-xl font-semibold text-pink-300">Quick Actions</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Perform administrative tasks quickly and efficiently.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-pink-600/80 hover:bg-pink-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-pink-600/20 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add New User
                </button>
                <button className="px-4 py-2 bg-purple-600/80 hover:bg-purple-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/20 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Refresh Cache
                </button>
                <button className="px-4 py-2 bg-blue-600/80 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Send Notification
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-4 animate-fade-in" style={{ transition: 'all 0.5s ease', transitionDelay: '0.5s' }}>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-indigo-700/80 backdrop-blur text-white rounded hover:bg-indigo-600 transition-all duration-300 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3m0 0l3 3m-3-3v12m6-6l3 3m0 0l3-3m-3 3V6" />
              </svg>
              Back to Dashboard
            </Link>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-700/80 backdrop-blur text-white rounded hover:bg-gray-600 transition-all duration-300 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7m-7-7v14" />
              </svg>
              Back to Home
            </Link>
          </div>
        </main>
      </div>
      
      <style jsx global>{`
        .animate-fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
} 