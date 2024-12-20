import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Ensure valid page numbers
  const current = Math.max(1, Math.min(currentPage, totalPages));
  const total = Math.max(1, totalPages);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (total <= maxPagesToShow) {
      // Show all pages if total is less than maxPagesToShow
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate start and end of page range around current page
      let start = Math.max(2, current - 1);
      let end = Math.min(total - 1, current + 1);
      
      // Adjust range if at the start or end
      if (current <= 2) {
        end = 4;
      } else if (current >= total - 1) {
        start = total - 3;
      }
      
      // Add ellipsis if needed
      if (start > 2) {
        pages.push('...');
      }
      
      // Add pages in range
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (end < total - 1) {
        pages.push('...');
      }
      
      // Always show last page
      pages.push(total);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="p-2 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-700 
                 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-400">...</span>
          ) : (
            <button
              onClick={() => typeof page === 'number' && onPageChange(page)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200
                       ${current === page
                         ? 'bg-blue-600 text-white'
                         : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
                       }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        className="p-2 rounded-lg text-gray-400 hover:text-gray-300 hover:bg-gray-700 
                 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
