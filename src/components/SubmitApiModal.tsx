import React, { useState } from 'react';
import { X } from 'lucide-react';
import { styles } from '../theme';

interface SubmitApiModalProps {
  onClose: () => void;
}

export function SubmitApiModal({ onClose }: SubmitApiModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    email: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement submission logic
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-display font-bold text-gray-900">
            Submit Your AI Tool
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Tool Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg
                       focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              placeholder="e.g., GPT-4, DALL-E"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg
                       focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              placeholder="Brief description of your AI tool..."
            />
          </div>

          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              Tool URL
            </label>
            <input
              type="url"
              id="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg
                       focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              placeholder="https://..."
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Contact Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg
                       focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`${styles.button.base} ${styles.button.secondary} ${styles.button.sizes.md}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.button.base} ${styles.button.primary} ${styles.button.sizes.md}`}
            >
              Submit Tool
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
