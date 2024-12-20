import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  Wrench,
  FolderTree,
  MessageSquare,
  Users,
  Send,
  LogOut,
  Menu,
  X
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Tools', href: '/admin/tools', icon: Wrench },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Submissions', href: '/admin/submissions', icon: Send }
  ];

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-4">
        <a href="/" className="flex items-center">
          <img src="/logo.svg" alt="AI Tools Directory" className="h-8" />
        </a>
        <button
          onClick={() => setIsSidebarOpen(prev => !prev)}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-lg lg:shadow-none transform lg:transform-none lg:opacity-100 transition-all duration-300 ${
        isSidebarOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <a 
              href="/" 
              className="flex items-center px-2 py-1 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <img src="/logo.svg" alt="AI Tools Directory" className="h-8" />
            </a>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg active:bg-gray-200 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200
                             ${isActive
                               ? 'bg-primary-50 text-primary-700 shadow-sm'
                               : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100'
                             }`}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${
                    isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email}
                </p>
                <p className="text-xs text-gray-500">
                  Admin
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg active:bg-gray-200 transition-colors duration-200"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 w-full lg:pl-64">
        <main className="p-4 pt-20 lg:p-8 lg:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
}
