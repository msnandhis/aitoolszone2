import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../../theme';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className={`${styles.container} py-8 px-4 sm:px-6 lg:px-8`}>
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-6 md:gap-4">
          {/* Copyright */}
          <div className="text-sm text-gray-500 text-center md:text-left">
            © {currentYear} AIToolsZone.com. All rights reserved.
          </div>

          {/* Links */}
          <nav className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center gap-y-4 gap-x-6 sm:gap-8">
            <Link 
              to="/about" 
              className="text-sm text-gray-500 hover:text-[#FF5722] transition-colors duration-200 text-center sm:text-left py-1"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-sm text-gray-500 hover:text-[#FF5722] transition-colors duration-200 text-center sm:text-left py-1"
            >
              Contact
            </Link>
            <Link 
              to="/terms" 
              className="text-sm text-gray-500 hover:text-[#FF5722] transition-colors duration-200 text-center sm:text-left py-1"
            >
              Terms & Conditions
            </Link>
            <Link 
              to="/privacy" 
              className="text-sm text-gray-500 hover:text-[#FF5722] transition-colors duration-200 text-center sm:text-left py-1"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
