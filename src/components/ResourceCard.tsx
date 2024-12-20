import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { Application } from '../types';

interface ResourceCardProps {
  resource: Application;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-100">
          {resource.logo ? (
            <img
              src={resource.logo}
              alt={resource.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(resource.name)}&background=random`;
              }}
            />
          ) : (
            <span className="text-xl font-bold text-gray-400">
              {resource.name.charAt(0)}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-medium text-gray-900 truncate">
              {resource.name}
            </h3>
            {resource.badge && (
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                             ${resource.badge === 'featured' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                {resource.badge === 'featured' ? '⭐ Featured' : '🔥 Top'}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 mt-1">
            {resource.description}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-500">
              {resource.provider}
            </span>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
