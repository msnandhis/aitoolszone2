import React, { useEffect } from 'react';
import { MainLayout } from '../../shared/layouts/MainLayout';
import { styles } from '../../theme';
import { Sparkles, Zap, Globe2, Search, Star, Shield } from 'lucide-react';

export default function AboutPage() {
  useEffect(() => {
    // Update meta tags for SEO
    document.title = 'About AI Tools Directory - Discover the Best AI Tools and APIs';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Discover the most comprehensive directory of AI tools, APIs, and services. Find and compare the best artificial intelligence solutions for your needs.'
      );
    }
  }, []);

  return (
    <MainLayout>
      <div className="bg-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary-50 to-white">
          <div className={`${styles.container} py-16 lg:py-24`}>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 text-center mb-6">
              Discover the Future of AI
            </h1>
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
              AI Tools Directory is your comprehensive resource for discovering, comparing, and implementing artificial intelligence solutions. We curate the best AI tools and APIs to help you build smarter applications.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className={`${styles.container} py-16 lg:py-24`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                Easy Discovery
              </h3>
              <p className="text-gray-600">
                Find the perfect AI tools for your needs with our intuitive search and filtering system. Compare features, pricing, and capabilities at a glance.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                Curated Selection
              </h3>
              <p className="text-gray-600">
                We carefully review and verify each AI tool to ensure quality and reliability. Our directory features only the best solutions in the market.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-primary-500" />
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 mb-4">
                Trusted Reviews
              </h3>
              <p className="text-gray-600">
                Make informed decisions with real user reviews and detailed analysis of each tool's performance and capabilities.
              </p>
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-gray-50">
          <div className={`${styles.container} py-16 lg:py-24`}>
            <h2 className="text-3xl font-display font-bold text-gray-900 text-center mb-12">
              Explore AI Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Text Generation',
                'Image Generation',
                'Voice & Speech',
                'Data Analysis',
                'Code Generation',
                'Video Generation',
                'Chat & Conversation',
                'Machine Learning'
              ].map((category) => (
                <div
                  key={category}
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <h3 className="font-display font-semibold text-gray-900 mb-2">
                    {category}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Discover top {category.toLowerCase()} tools and APIs
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className={`${styles.container} py-16 lg:py-24`}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We're dedicated to making artificial intelligence accessible to everyone. Our platform helps developers, businesses, and innovators find and implement the right AI solutions to power their next breakthrough.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className={`${styles.button.base} ${styles.button.primary} ${styles.button.sizes.lg}`}>
                Browse AI Tools
              </button>
              <button className={`${styles.button.base} ${styles.button.secondary} ${styles.button.sizes.lg}`}>
                Submit Your Tool
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
