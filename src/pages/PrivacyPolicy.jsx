// pages/PrivacyPolicy.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { useCache } from '../hooks/useCache'
import PrivacyPolicySkeleton from '../components/skeletons/PrivacyPolicySkeleton'

const PrivacyPolicy = () => {
  const { data: settings, loading: settingsLoading } = useCache('settings', '/settings')

  // Get settings values with fallbacks
  const siteName = settings?.site_name || 'NIRA BODY'
  const email = settings?.email || 'nira.bodycare@gmail.com'
  const phone = settings?.phone || '+91 8976084417'
  const address = settings?.address || 'Nira Body Care, Mumbai'

  if (settingsLoading) {
    return <PrivacyPolicySkeleton />
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-ivory py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-warm-brown mb-4">
            Privacy Policy
          </h1>
          <div className="w-20 h-0.5 bg-terracotta mx-auto"></div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-sand/20 p-6 md:p-8 rounded-lg">
            <p className="text-warm-brown leading-relaxed">
              At <span className="font-semibold text-terracotta">{siteName}</span>, your privacy is important to us.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-warm-brown mb-4">
              Information We Collect
            </h2>
            <p className="text-warm-brown-light leading-relaxed mb-3">
              When you place an order, subscribe to our newsletter, or contact us, we may collect information such as:
            </p>
            <ul className="space-y-2 ml-6">
              {['Your name', 'Email address', 'Phone number', 'Shipping address', 'Payment details'].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-warm-brown-light">
                  <i className="fas fa-circle text-terracotta text-xs mt-2"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-warm-brown mb-4">
              How We Use Your Information
            </h2>
            <p className="text-warm-brown-light leading-relaxed mb-3">We use this information to:</p>
            <ul className="space-y-2 ml-6">
              {[
                'Process orders',
                'Deliver products',
                'Communicate with customers',
                'Improve our website and services',
                'Send updates and marketing communications (only if you opt in)'
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-warm-brown-light">
                  <i className="fas fa-check-circle text-terracotta text-sm mt-0.5"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Sharing Information */}
          <section className="bg-sand/20 p-6 md:p-8 rounded-lg">
            <h2 className="font-serif text-2xl text-warm-brown mb-3">
              Sharing Your Information
            </h2>
            <p className="text-warm-brown-light leading-relaxed">
              We <span className="font-semibold text-terracotta">do not sell, rent, or share</span> your personal information 
              with third parties for marketing purposes.
            </p>
            <p className="text-warm-brown-light leading-relaxed mt-3">
              Payment information is processed securely through trusted payment providers and is never stored on our servers.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-warm-brown mb-4">
              Cookies
            </h2>
            <p className="text-warm-brown-light leading-relaxed">
              Our website may use cookies to improve user experience, analyze website traffic, and personalize content.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="font-serif text-2xl md:text-3xl text-warm-brown mb-4">
              Your Rights
            </h2>
            <p className="text-warm-brown-light leading-relaxed">
              You may request access, correction, or deletion of your personal information by contacting us.
            </p>
          </section>

          {/* Consent */}
          <section className="bg-sand/20 p-6 md:p-8 rounded-lg">
            <h2 className="font-serif text-2xl text-warm-brown mb-3">
              Your Consent
            </h2>
            <p className="text-warm-brown-light leading-relaxed">
              By using our website, you consent to the collection and use of information as outlined in this policy.
            </p>
          </section>

          {/* Contact Us */}
          <section className="border-t-2 border-sand/50 pt-8">
            <h2 className="font-serif text-2xl md:text-3xl text-warm-brown mb-4">
              Contact Us
            </h2>
            <p className="text-warm-brown-light leading-relaxed mb-4">
              For privacy-related questions or concerns, please contact us:
            </p>
            <div className="bg-ivory border border-sand rounded-lg p-6 inline-block w-full md:w-auto">
              <div className="flex items-center gap-3 mb-3">
                <i className="fas fa-envelope text-terracotta text-xl"></i>
                <a href={`mailto:${email}`} className="text-terracotta hover:text-warm-brown transition-colors">
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-phone text-terracotta text-xl"></i>
                <span className="text-warm-brown-light">{phone}</span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <i className="fas fa-map-marker-alt text-terracotta text-xl"></i>
                <span className="text-warm-brown-light">{address}</span>
              </div>
            </div>
          </section>

          {/* Effective Date */}
          <div className="text-center pt-8">
            <p className="text-warm-brown-light text-sm">
              By using our website, you agree to the terms outlined in this Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PrivacyPolicy