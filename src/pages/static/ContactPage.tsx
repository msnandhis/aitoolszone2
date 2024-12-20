import React, { useState } from 'react';
import { MainLayout } from '../../shared/layouts/MainLayout';
import { styles } from '../../theme';
import { Mail, MessageSquare, Send, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit form logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="bg-white">
        <div className={`${styles.container} py-16 lg:py-24`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Content */}
            <div>
              <h1 className={`${styles.heading.h1} text-gray-900 mb-6`}>
                Get in Touch
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Have questions about our platform? Want to submit an API? 
                We'd love to hear from you. Send us a message and we'll 
                respond as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-gray-900 mb-1">
                      Email Us
                    </h3>
                    <p className="text-gray-600 mb-2">
                      For general inquiries and support
                    </p>
                    <a href="mailto:hello@aiapikit.com" className="text-primary-600 hover:text-primary-700">
                      hello@aiapikit.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-gray-900 mb-1">
                      Join Our Community
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Connect with other developers
                    </p>
                    <a href="https://discord.gg/aiapikit" className="text-primary-600 hover:text-primary-700">
                      Discord Community
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-gray-900 mb-1">
                      Location
                    </h3>
                    <p className="text-gray-600">
                      San Francisco, CA<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-gray-50 rounded-2xl border border-gray-200 p-8">
                <h2 className="font-display text-2xl font-semibold text-gray-900 mb-6">
                  Send us a message
                </h2>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <h3 className="font-display text-lg font-semibold text-green-800 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-green-700">
                      Thank you for your message. We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg
                                focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg
                                focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-200 rounded-lg
                                focus:ring-2 focus:ring-primary-100 focus:border-primary-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`${styles.button.base} ${styles.button.primary} ${styles.button.sizes.lg}
                                w-full flex items-center justify-center gap-2`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
