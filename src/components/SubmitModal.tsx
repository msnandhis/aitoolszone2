import React, { useState } from 'react';
import { styles } from '../theme';
import { X } from 'lucide-react';
import { submitApiApplication } from '../services/api';

export function SubmitModal() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    url: '',
    email: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await submitApiApplication(formData);
      setSubmitSuccess(true);
      setFormData({ name: '', description: '', url: '', email: '' });
    } catch (err) {
      setError('Failed to submit tool. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    const modal = document.getElementById('submit-modal');
    if (modal instanceof HTMLDialogElement) {
      modal.close();
      // Reset state after animation
      setTimeout(() => {
        setSubmitSuccess(false);
        setError(null);
      }, 300);
    }
  };

  return (
    <dialog
      id="submit-modal"
      className="bg-transparent p-4 max-w-lg w-full backdrop:bg-black backdrop:bg-opacity-50"
    >
      <div className="bg-white rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-display font-bold text-gray-900">
            Submit Your AI Tool
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Submission Received!
              </h3>
              <p className="text-gray-600 mb-6">
                Thank you for submitting your tool. We'll review it and get back to you soon.
              </p>
              <button
                onClick={handleClose}
                className={`${styles.button.base} ${styles.button.primary} ${styles.button.sizes.md}`}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Tool Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
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
                  name="description"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
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
                  name="url"
                  required
                  value={formData.url}
                  onChange={handleInputChange}
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
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg
                           focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
                  placeholder="you@example.com"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className={`${styles.button.base} ${styles.button.secondary} ${styles.button.sizes.md}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${styles.button.base} ${styles.button.primary} ${styles.button.sizes.md}
                             ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Tool'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </dialog>
  );
}
