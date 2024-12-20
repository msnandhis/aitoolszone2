import React, { useEffect } from 'react';
import { MainLayout } from '../../shared/layouts/MainLayout';
import { styles } from '../../theme';

export default function TermsPage() {
  useEffect(() => {
    // Update meta tags for SEO
    document.title = 'Terms of Service - AI Tools Directory';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Terms of Service for AI Tools Directory. Read our terms and conditions for using our AI tools and services directory.'
      );
    }
  }, []);

  return (
    <MainLayout>
      <div className={`${styles.container} py-12 lg:py-16`}>
        <article className="prose prose-lg max-w-3xl mx-auto">
        <h1 className={`${styles.heading.h1} text-gray-900 mb-6`}> Terms & Conditions </h1>
          
          <p className="text-gray-600 mb-8">
            Last updated: January 1, 2025
          </p>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              Agreement to Terms
            </h2>
            <p className="text-gray-600">
              By accessing and using AI Tools Directory, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              Use License
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Permission is granted to temporarily access the materials (information and software) on AI Tools Directory for personal, non-commercial viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer the materials to another person</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              User Submissions
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                When submitting tools or content to our platform:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>You must have the right to submit the content</li>
                <li>Content must be accurate and not misleading</li>
                <li>You grant us the right to display and promote the content</li>
                <li>We reserve the right to remove content at our discretion</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              Disclaimer
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                The materials on AI Tools Directory are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Implied warranties of merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Non-infringement of intellectual property</li>
                <li>Accuracy, reliability, and availability of the content</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              Limitations
            </h2>
            <p className="text-gray-600">
              In no event shall AI Tools Directory or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our platform.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              Revisions and Errata
            </h2>
            <p className="text-gray-600">
              The materials appearing on AI Tools Directory could include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete, or current. We may make changes to the materials at any time without notice.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              Links
            </h2>
            <p className="text-gray-600">
              We have not reviewed all of the sites linked to our platform and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by AI Tools Directory. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              Governing Law
            </h2>
            <p className="text-gray-600">
              These terms and conditions are governed by and construed in accordance with the laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p className="text-gray-600">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">
                Email: terms@aitoolsdirectory.com<br />
                Address: 123 AI Street, Tech City, TC 12345
              </p>
            </div>
          </section>
        </article>
      </div>
    </MainLayout>
  );
}
