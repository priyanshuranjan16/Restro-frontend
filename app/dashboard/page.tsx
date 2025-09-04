'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(2);

  const appIcons = [
    {
      id: 'discuss',
      name: 'Discuss',
      icon: (
        <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-orange-500 rounded-full relative">
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-orange-400 rounded-full"></div>
          </div>
        </div>
      ),
      onClick: () => console.log('Discuss clicked')
    },
    {
      id: 'dashboards',
      name: 'Dashboards',
      icon: (
        <div className="w-12 h-12 grid grid-cols-2 gap-1">
          <div className="bg-blue-500 rounded-sm"></div>
          <div className="bg-pink-500 rounded-sm"></div>
          <div className="bg-green-500 rounded-sm"></div>
          <div className="bg-cyan-400 rounded-sm"></div>
        </div>
      ),
      onClick: () => console.log('Dashboards clicked')
    },
    {
      id: 'pos',
      name: 'Point of Sale',
      icon: (
        <div className="w-12 h-12 relative">
          <div className="w-full h-8 bg-gradient-to-r from-purple-500 to-yellow-400 rounded-t-lg"></div>
          <div className="w-full h-4 bg-gradient-to-r from-purple-600 to-yellow-500 rounded-b-lg"></div>
        </div>
      ),
      onClick: () => console.log('POS clicked')
    },
    {
      id: 'kitchen',
      name: 'Kitchen Display',
      icon: (
        <div className="w-12 h-12 relative">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-yellow-400 rounded-full mx-auto mt-2 relative">
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-purple-600 rounded-full"></div>
          </div>
        </div>
      ),
      onClick: () => console.log('Kitchen Display clicked')
    },
    {
      id: 'invoicing',
      name: 'Invoicing',
      icon: (
        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
          <div className="text-white font-bold text-lg">$</div>
        </div>
      ),
      onClick: () => console.log('Invoicing clicked')
    },
    {
      id: 'inventory',
      name: 'Inventory',
      icon: (
        <div className="w-12 h-12 relative">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-purple-500 transform rotate-12 rounded-sm"></div>
          <div className="absolute top-1 left-1 w-6 h-6 bg-gradient-to-br from-orange-300 to-purple-400 transform rotate-12 rounded-sm"></div>
        </div>
      ),
      onClick: () => console.log('Inventory clicked')
    },
    {
      id: 'barcode',
      name: 'Barcode',
      icon: (
        <div className="w-12 h-12 flex items-center justify-center">
          <div className="space-y-1">
            <div className="w-8 h-1 bg-purple-500"></div>
            <div className="w-6 h-1 bg-purple-500"></div>
            <div className="w-8 h-1 bg-purple-500"></div>
            <div className="w-4 h-1 bg-purple-500"></div>
            <div className="w-8 h-1 bg-purple-500"></div>
          </div>
        </div>
      ),
      onClick: () => console.log('Barcode clicked')
    },
    {
      id: 'apps',
      name: 'Apps',
      icon: (
        <div className="w-12 h-12 relative">
          <div className="w-full h-full rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 w-6 h-6 bg-red-500"></div>
            <div className="absolute top-0 right-0 w-6 h-6 bg-green-500"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 bg-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-purple-500"></div>
          </div>
        </div>
      ),
      onClick: () => console.log('Apps clicked')
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: (
        <div className="w-12 h-12 relative">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-purple-500 transform rotate-45 rounded-sm mx-auto mt-2 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-full"></div>
            </div>
          </div>
        </div>
      ),
      onClick: () => console.log('Settings clicked')
    }
  ];

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(147, 51, 234, 0.1) 10px,
            rgba(147, 51, 234, 0.1) 20px
          )`
        }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">RestroSphere</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {notifications > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </div>
              )}
            </button>
          </div>

          {/* History */}
          <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>

          {/* Close */}
          <button 
            onClick={handleLogout}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 font-medium">Restro</span>
            <div className="relative">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                P
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* App Icons Grid */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-8">
            {appIcons.map((app) => (
              <button
                key={app.id}
                onClick={app.onClick}
                className="group flex flex-col items-center space-y-3 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {app.icon}
                </div>
                <span className="text-sm font-medium text-gray-700 group-hover:text-purple-600 transition-colors">
                  {app.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
