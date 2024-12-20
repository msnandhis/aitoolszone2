import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { styles } from "../theme";
import { Application } from "../types";
import { ApplicationCard } from "./ApplicationCard";

interface CategorySectionProps {
  applications: Application[];
  onCategoryClick?: (category: string) => void;
}

interface CategoryGroup {
  [key: string]: Application[];
}

export function CategorySection({
  applications = [],
  onCategoryClick,
}: CategorySectionProps) {
  // Create category ID mapping
  const categoryIds = applications.reduce<{ [key: string]: string }>(
    (acc, application) => {
      const categoryName = application.categories[0]?.name;
      const categoryId = application.categories[0]?.id;
      if (categoryName && categoryId) {
        acc[categoryName] = categoryId;
      }
      return acc;
    },
    {}
  );

  // Group applications by category
  const groupedApplications = applications.reduce<CategoryGroup>(
    (acc, application) => {
      const categoryName = application.categories[0]?.name || "Uncategorized";
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(application);
      return acc;
    },
    {}
  );

  // Sort applications within each category by badge priority
  Object.keys(groupedApplications).forEach((category) => {
    groupedApplications[category].sort((a, b) => {
      const badgePriority = { featured: 2, top: 1, null: 0 };
      const aPriority = badgePriority[a.badge || "null"];
      const bPriority = badgePriority[b.badge || "null"];

      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }

      // If badges are the same, sort by views
      return b.views - a.views;
    });
  });

  // Track current page for each category
  const [categoryPages, setCategoryPages] = useState<{ [key: string]: number }>(
    Object.keys(groupedApplications).reduce(
      (acc, category) => ({
        ...acc,
        [category]: 1,
      }),
      {}
    )
  );

  // Update pages when applications change
  useEffect(() => {
    setCategoryPages(
      Object.keys(groupedApplications).reduce(
        (acc, category) => ({
          ...acc,
          [category]: 1,
        }),
        {}
      )
    );
  }, [applications]);

  const ITEMS_PER_PAGE = 4; // 4 items per row * 1 rows

  const handlePageChange = (category: string, increment: number) => {
    setCategoryPages((prev) => {
      const currentPage = prev[category] || 1;
      const totalPages = Math.ceil(
        (groupedApplications[category]?.length || 0) / ITEMS_PER_PAGE
      );
      const newPage = Math.max(
        1,
        Math.min(currentPage + increment, totalPages)
      );
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
      {Object.entries(groupedApplications).map(
        ([category, categoryApplications]) => {
          const currentPage = categoryPages[category] || 1;
          const totalPages = Math.ceil(
            categoryApplications.length / ITEMS_PER_PAGE
          );
          const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
          const visibleApplications = categoryApplications.slice(
            startIndex,
            startIndex + ITEMS_PER_PAGE
          );

          return (
            <section key={category} className="relative">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    {category}
                    <span className="ml-2 text-sm text-gray-500">
                      ({categoryApplications.length})
                    </span>
                  </h2>
                  <button
                    onClick={() => {
                      const categoryId = categoryIds[category];
                      if (categoryId && onCategoryClick) {
                        onCategoryClick(categoryId);
                      }
                    }}
                    className="text-sm text-primary-500 hover:text-primary-600 font-medium"
                  >
                    View All
                  </button>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center">
                    <button
                      onClick={() => handlePageChange(category, -1)}
                      disabled={currentPage === 1}
                      className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-medium text-gray-500 mx-1">
                      {currentPage}/{totalPages}
                    </span>
                    <button
                      onClick={() => handlePageChange(category, 1)}
                      disabled={currentPage === totalPages}
                      className="p-0.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      aria-label="Next page"
                    >
                      <ChevronRight className="w-4 h-4" />
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
        }
      )}
    </div>
  );
}
