import React, { useState, useEffect, useRef } from 'react';
import { Application } from '../types';
import { ExternalLink, Info } from 'lucide-react';

interface ApplicationCardProps {
  application: Application;
}

export function ApplicationCard({ application }: ApplicationCardProps) {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the card to close info
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsInfoVisible(false);
      }
    }

    if (isInfoVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isInfoVisible]);

  const handleCardClick = () => {
    window.open(application.url, '_blank', 'noopener,noreferrer');
  };

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking info icon
    setIsInfoVisible(!isInfoVisible);
  };

  return (
    <div
      ref={cardRef}
      className="relative bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        {/* Logo */}
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 flex items-center justify-center border border-gray-100">
          {application.logo ? (
            <img
              src={application.logo}
              alt={application.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(application.name)}&background=random`;
              }}
            />
          ) : (
            <span className="text-xl font-bold text-gray-400">
              {application.name.charAt(0)}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-gray-900 truncate">
              {application.name}
            </h3>
            {application.badge && (
              <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium
                             ${application.badge === 'featured' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                {application.badge === 'featured' ? '⭐' : '🔥'}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 truncate">
            {application.provider}
          </p>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleInfoClick}
            className={`p-1 rounded-full transition-colors duration-200 
                      ${isInfoVisible ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-100'}`}
            title="View description"
          >
            <Info className="w-4 h-4" />
          </button>
          <ExternalLink className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Description Tooltip */}
      {(isInfoVisible || isHovered) && (
        <div 
          ref={tooltipRef}
          className="absolute left-0 right-0 top-full mt-1 p-3 bg-gray-900 text-white rounded-lg shadow-lg z-10"
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-gray-900"></div>
          <p className="text-sm leading-relaxed">
            {application.description}
          </p>
        </div>
      )}
    </div>
  );
}
