import React, { useEffect } from 'react';
import { MainLayout } from '../../shared/layouts/MainLayout';
import { styles } from '../../theme';

export default function PrivacyPage() {
  useEffect(() => {
    // Update meta tags for SEO
    document.title = 'Privacy Policy - AI Tools Directory';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Privacy Policy for AI Tools Directory. Learn how we collect, use, and protect your personal information.'
      );
    }
  }, []);

  return (
    <MainLayout>
      <div className={`${styles.container} py-12 lg:py-16`}>
        <article className="prose prose-lg max-w-3xl mx-auto">
          <h1 className={`${styles.heading.h1} text-gray-900 mb-6`}> Privacy Policy </h1>
          
           <p className="text-gray-600 mb-8">
            Last updated: January 1, 2025
          </p>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="text-gray-600 mb-4">
              AI Tools Directory ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
            <p className="text-gray-600">
              Please read this Privacy Policy carefully. By accessing and using our platform, you acknowledge that you have read, understood, and agree to be bound by all terms of this Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <div className="space-y-4">
              <h3 className="font-display text-xl font-medium text-gray-900">Personal Information</h3>
              <p className="text-gray-600">
                We may collect personal information that you voluntarily provide when using our platform, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Name and email address when submitting tools or contacting us</li>
                <li>Account information if you create an account</li>
                <li>Usage data and preferences</li>
                <li>Communication history with our team</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Providing and maintaining our platform</li>
              <li>Improving user experience</li>
              <li>Communicating with you about updates and changes</li>
              <li>Analyzing usage patterns and trends</li>
              <li>Preventing fraud and ensuring platform security</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              Information Sharing
            </h2>
            <p className="text-gray-600 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described below:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Service providers who assist in operating our platform</li>
              <li>Legal requirements and law enforcement requests</li>
              <li>Protection of our rights, privacy, safety, or property</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              Security Measures
            </h2>
            <p className="text-gray-600">
              We implement appropriate technical and organizational security measures to protect your personal information. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-600 mb-4">
              You have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Withdrawal of consent</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy or our practices, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                Email: privacy@aitoolsdirectory.com<br />
                Address: 123 AI Street, Tech City, TC 12345
              </p>
            </div>
          </section>
        </article>
      </div>
    </MainLayout>
  );
}
