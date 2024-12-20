import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styles } from '../../theme';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className={`${styles.container} py-4`}>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.svg" alt="AI Tools Directory" className="h-8" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium ${
                isActive('/') ? 'text-[#FF5722]' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Tools
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium ${
                isActive('/about') ? 'text-[#FF5722]' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium ${
                isActive('/contact') ? 'text-[#FF5722]' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Contact
            </Link>
            {user && (
              <Link
                to="/admin/dashboard"
                className={`text-sm font-medium ${
                  location.pathname.startsWith('/admin')
                    ? 'text-[#FF5722]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Admin
              </Link>
            )}

            <button
              onClick={() => {
                const submitModal = document.getElementById('submit-modal');
                if (submitModal instanceof HTMLDialogElement) {
                  submitModal.showModal();
                }
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-[#FF5722] rounded-lg hover:bg-[#F4511E] transition-colors"
            >
              Submit Tool
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => {
                const submitModal = document.getElementById('submit-modal');
                if (submitModal instanceof HTMLDialogElement) {
                  submitModal.showModal();
                }
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-[#FF5722] rounded-lg hover:bg-[#F4511E] transition-colors"
            >
              Submit Tool
            </button>
            <button
              onClick={() => {
                // Toggle mobile menu
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu) {
                  mobileMenu.classList.toggle('hidden');
                }
              }}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div id="mobile-menu" className="hidden md:hidden py-4">
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className={`text-sm font-medium ${
                isActive('/') ? 'text-[#FF5722]' : 'text-gray-600'
              }`}
            >
              Tools
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium ${
                isActive('/about') ? 'text-[#FF5722]' : 'text-gray-600'
              }`}
            >
              About
            </Link>
            <Link
              to="/contact"
              className={`text-sm font-medium ${
                isActive('/contact') ? 'text-[#FF5722]' : 'text-gray-600'
              }`}
            >
              Contact
            </Link>
            {user && (
              <Link
                to="/admin/dashboard"
                className={`text-sm font-medium ${
                  location.pathname.startsWith('/admin')
                    ? 'text-[#FF5722]'
                    : 'text-gray-600'
                }`}
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
