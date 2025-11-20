'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

function DashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(2);

  // Role-specific features
  const getRoleFeatures = () => {
    if (!user) return [];

    switch (user.role) {
      case 'waiter':
        return [
          {
            id: 'tables',
            name: 'Table Management',
            icon: '🪑',
            description: 'Manage table assignments and orders',
            onClick: () => console.log('Table Management clicked'),
            color: 'from-blue-500 to-cyan-400'
          },
          {
            id: 'orders',
            name: 'Take Orders',
            icon: '📝',
            description: 'Create and manage customer orders',
            onClick: () => console.log('Take Orders clicked'),
            color: 'from-green-500 to-emerald-400'
          },
          {
            id: 'menu',
            name: 'Menu View',
            icon: '📋',
            description: 'View menu items and availability',
            onClick: () => console.log('Menu View clicked'),
            color: 'from-purple-500 to-pink-400'
          },
          {
            id: 'kitchen',
            name: 'Kitchen Status',
            icon: '👨‍🍳',
            description: 'Check order status from kitchen',
            onClick: () => console.log('Kitchen Status clicked'),
            color: 'from-orange-500 to-red-400'
          }
        ];
      
      case 'cashier':
        return [
          {
            id: 'pos',
            name: 'Point of Sale',
            icon: '💳',
            description: 'Process payments and transactions',
            onClick: () => router.push('/pos'),
            color: 'from-purple-500 to-yellow-400'
          },
          {
            id: 'invoicing',
            name: 'Invoicing',
            icon: '🧾',
            description: 'Create and manage invoices',
            onClick: () => router.push('/invoicing'),
            color: 'from-blue-500 to-indigo-400'
          },
          {
            id: 'payments',
            name: 'Payment History',
            icon: '💰',
            description: 'View payment transactions',
            onClick: () => console.log('Payment History clicked'),
            color: 'from-green-500 to-teal-400'
          },
          {
            id: 'reports',
            name: 'Daily Reports',
            icon: '📊',
            description: 'View daily sales reports',
            onClick: () => console.log('Daily Reports clicked'),
            color: 'from-pink-500 to-rose-400'
          }
        ];
      
      case 'admin':
        return [
          {
            id: 'dashboards',
            name: 'Analytics Dashboard',
            icon: '📈',
            description: 'View business analytics and insights',
            onClick: () => console.log('Analytics Dashboard clicked'),
            color: 'from-blue-500 to-cyan-400'
          },
          {
            id: 'pos',
            name: 'Point of Sale',
            icon: '💳',
            description: 'Full POS system access',
            onClick: () => router.push('/pos'),
            color: 'from-purple-500 to-yellow-400'
          },
          {
            id: 'invoicing',
            name: 'Invoicing',
            icon: '🧾',
            description: 'Manage all invoices',
            onClick: () => router.push('/invoicing'),
            color: 'from-blue-500 to-indigo-400'
          },
          {
            id: 'inventory',
            name: 'Inventory',
            icon: '📦',
            description: 'Manage inventory and stock',
            onClick: () => console.log('Inventory clicked'),
            color: 'from-orange-500 to-purple-500'
          },
          {
            id: 'employees',
            name: 'Employee Management',
            icon: '👥',
            description: 'Manage staff and roles',
            onClick: () => console.log('Employee Management clicked'),
            color: 'from-green-500 to-emerald-400'
          },
          {
            id: 'settings',
            name: 'Settings',
            icon: '⚙️',
            description: 'System settings and configuration',
            onClick: () => console.log('Settings clicked'),
            color: 'from-gray-500 to-slate-400'
          },
          {
            id: 'reports',
            name: 'Reports',
            icon: '📊',
            description: 'View comprehensive reports',
            onClick: () => console.log('Reports clicked'),
            color: 'from-pink-500 to-rose-400'
          },
          {
            id: 'apps',
            name: 'Apps & Integrations',
            icon: '🔌',
            description: 'Manage integrations and apps',
            onClick: () => console.log('Apps clicked'),
            color: 'from-indigo-500 to-purple-400'
          }
        ];
      
      default:
        return [];
    }
  };

  const features = getRoleFeatures();

  const getRoleBadge = () => {
    if (!user) return null;
    
    const roleConfig = {
      waiter: { label: 'Waiter', color: 'bg-blue-500', icon: '🍽️' },
      cashier: { label: 'Cashier', color: 'bg-green-500', icon: '💳' },
      admin: { label: 'Admin', color: 'bg-purple-500', icon: '👑' }
    };

    const config = roleConfig[user.role];
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${config.color} text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2`}
      >
        <span>{config.icon}</span>
        <span>{config.label}</span>
      </motion.div>
    );
  };

  const handleLogout = () => {
    logout();
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex justify-between items-center p-6"
      >
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800 font-caveat">RestroSphere</h1>
          {getRoleBadge()}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notifications > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                >
                  {notifications}
                </motion.div>
              )}
            </button>
          </motion.div>

          {/* User Profile */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <span className="text-gray-700 font-medium">
              {user?.firstName} {user?.lastName}
            </span>
            <div className="relative">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                {user?.firstName?.[0] || 'U'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
          </motion.div>

          {/* Logout */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLogout}
            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            title="Logout"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </motion.button>
        </div>
      </motion.div>

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 px-8 pb-4"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName}! 👋
          </h2>
          <p className="text-gray-600">
            {user?.businessName && `${user.businessName} • `}
            {user?.role === 'admin' && 'Full system access'}
            {user?.role === 'cashier' && 'Payment and transaction management'}
            {user?.role === 'waiter' && 'Order and table management'}
          </p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Features Grid */}
          <div className={`grid gap-6 ${
            user?.role === 'admin' 
              ? 'grid-cols-2 md:grid-cols-4' 
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
          }`}>
            {features.map((feature, index) => (
              <motion.button
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={feature.onClick}
                className="group flex flex-col items-center space-y-4 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-left"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-3xl shadow-md`}
                >
                  {feature.icon}
                </motion.div>
                <div className="w-full">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors mb-1">
                    {feature.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
