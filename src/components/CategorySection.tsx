import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { styles } from '../theme';
import { Application } from '../types';
import { ApplicationCard } from './ApplicationCard';

interface CategorySectionProps {
  applications: Application[];
}

interface CategoryGroup {
  [key: string]: Application[];
}

export function CategorySection({ applications = [] }: CategorySectionProps) {
  // ... (keep existing state and functions)
   // Group applications by their first category (for display purposes)
   const groupedApplications = applications.reduce<CategoryGroup>((acc, application) => {
    const category = application.categories[0]?.name || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(application);
    return acc;
  }, {});

  // Sort applications within each category by badge priority
  Object.keys(groupedApplications).forEach(category => {
    groupedApplications[category].sort((a, b) => {
      const badgePriority = { featured: 2, top: 1, null: 0 };
      const aPriority = badgePriority[a.badge || 'null'];
      const bPriority = badgePriority[b.badge || 'null'];
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      // If badges are the same, sort by views
      return b.views - a.views;
    });
  });

  // Track current page for each category
  const [categoryPages, setCategoryPages] = useState<{ [key: string]: number }>(
    Object.keys(groupedApplications).reduce((acc, category) => ({
      ...acc,
      [category]: 1
    }), {})
  );

  // Update pages when applications change
  useEffect(() => {
    setCategoryPages(
      Object.keys(groupedApplications).reduce((acc, category) => ({
        ...acc,
        [category]: 1
      }), {})
    );
  }, [applications]);

  const ITEMS_PER_PAGE = 8; // 4 items per row * 2 rows

  const handlePageChange = (category: string, increment: number) => {
    setCategoryPages(prev => {
      const currentPage = prev[category] || 1;
      const totalPages = Math.ceil((groupedApplications[category]?.length || 0) / ITEMS_PER_PAGE);
      const newPage = Math.max(1, Math.min(currentPage + increment, totalPages));
      return { ...prev, [category]: newPage };
    });
  };

  // If no applications, show message
  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No applications found.</p>
      </div>
    );
  }


  return (
    <div className="space-y-8">
      {Object.entries(groupedApplications).map(([category, categoryApplications]) => {
        const currentPage = categoryPages[category] || 1;
        const totalPages = Math.ceil(categoryApplications.length / ITEMS_PER_PAGE);
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const visibleApplications = categoryApplications.slice(startIndex, startIndex + ITEMS_PER_PAGE);

        return (
          <section key={category} className="relative">
            {/* Category Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className={`${styles.heading.h2} text-gray-900`}>
                {category}
                <span className="ml-2 text-sm text-gray-500">
                  ({categoryApplications.length})
                </span>
              </h2>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(category, -1)}
                    disabled={currentPage === 1}
                    className={`${styles.button.base} ${styles.button.secondary} ${styles.button.sizes.sm}
                               disabled:bg-gray-50 disabled:text-gray-300`}
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-medium text-gray-600 min-w-[4rem] text-center">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(category, 1)}
                    disabled={currentPage === totalPages}
                    className={`${styles.button.base} ${styles.button.secondary} ${styles.button.sizes.sm}
                               disabled:bg-gray-50 disabled:text-gray-300`}
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Applications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {visibleApplications.map((application) => (
                <ApplicationCard
                  key={application.id}
                  application={application}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
