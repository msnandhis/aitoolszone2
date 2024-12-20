import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../../theme';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className={`${styles.container} py-6`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © {currentYear} AIToolsZone.com. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link to="/about" className="text-sm text-gray-500 hover:text-[#FF5722]">
              About
            </Link>
            <Link to="/contact" className="text-sm text-gray-500 hover:text-[#FF5722]">
              Contact
            </Link>
            <Link to="/terms" className="text-sm text-gray-500 hover:text-[#FF5722]">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="text-sm text-gray-500 hover:text-[#FF5722]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
