// // pages/ReturnsPolicy.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useCache } from '../hooks/useCache'
import ReturnsPolicySkeleton from '../components/skeletons/ReturnsPolicySkeleton'

const ReturnsPolicy = () => {
  const [activeTab, setActiveTab] = useState('returns')
  const { data: settings, loading: settingsLoading } = useCache('settings', '/settings')

  // Get settings values with fallbacks
  const siteName = settings?.site_name || 'NIRA BODY'
  const email = settings?.email || 'nira.bodycare@gmail.com'
  const phone = settings?.phone || '+91 8976084417'
  const whatsapp = settings?.whatsapp || 'https://wa.me/918976084417'

  const tabs = [
    { id: 'returns', label: 'Returns' },
    { id: 'refunds', label: 'Refunds & Replacements' },
    { id: 'exchanges', label: 'Exchanges' }
  ]

  if (settingsLoading) {
    return <ReturnsPolicySkeleton />
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-ivory"
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-warm-brown to-terracotta py-16 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl text-ivory mb-4"
          >
            Returns & Refund Policy
          </motion.h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        
        {/* Introduction */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-sand/20 rounded-2xl p-6 md:p-8 mb-8 border border-sand/50 text-center"
        >
          <i className="fas fa-shield-alt text-terracotta text-3xl mb-3"></i>
          <p className="text-warm-brown leading-relaxed">
            At <span className="font-semibold text-terracotta">{siteName}</span>, we take great care in creating and packaging our products. 
            Due to the personal nature of skincare and body care products, we maintain strict hygiene and quality standards.
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-sand/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-sans text-sm uppercase tracking-wide transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-terracotta border-b-2 border-terracotta'
                  : 'text-warm-brown-light hover:text-warm-brown'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Returns Tab Content */}
        {activeTab === 'returns' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* When Returns Can Be Requested */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-warm-brown mb-4 flex items-center gap-2">
                <i className="fas fa-exchange-alt text-terracotta text-xl"></i>
                Returns
              </h2>
              <p className="text-warm-brown-light leading-relaxed mb-4">
                Returns may be requested if:
              </p>
              <ul className="space-y-2 ml-6">
                {[
                  'The wrong product was delivered',
                  'The product arrived damaged',
                  'The product arrived in a defective condition'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-warm-brown-light">
                    <i className="fas fa-times-circle text-terracotta text-sm mt-0.5"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-terracotta/10 p-4 rounded-lg mt-4">
                <p className="text-warm-brown text-sm">
                  <i className="fas fa-clock text-terracotta mr-2"></i>
                  To request a return, please contact us within <span className="font-semibold text-terracotta">48 hours</span> of receiving your order.
                </p>
              </div>
            </section>

            {/* How to Request */}
            <section className="bg-sand/20 rounded-2xl p-6 md:p-8 border border-sand/50">
              <h3 className="font-serif text-xl text-warm-brown mb-4">How To Request A Return</h3>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a 
                  href={`mailto:${email}`}
                  className="flex items-center justify-center gap-3 bg-ivory border border-sand rounded-lg p-4 hover:shadow-md transition-all duration-300"
                >
                  <i className="fas fa-envelope text-terracotta text-xl"></i>
                  <div>
                    <p className="text-warm-brown-light text-sm">Email us at</p>
                    <p className="text-terracotta font-medium">{email}</p>
                  </div>
                </a>
                <a 
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-ivory border border-sand rounded-lg p-4 hover:shadow-md transition-all duration-300"
                >
                  <i className="fab fa-whatsapp text-green-600 text-xl"></i>
                  <div>
                    <p className="text-warm-brown-light text-sm">Message us on</p>
                    <p className="text-green-600 font-medium">{phone}</p>
                  </div>
                </a>
              </div>
              <p className="font-semibold text-warm-brown mb-2">Please include:</p>
              <ul className="space-y-2 ml-6">
                {[
                  'Order Number',
                  'Full Name',
                  'Reason for Return',
                  'Photos of the product and packaging'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-warm-brown-light">
                    <i className="fas fa-check-circle text-terracotta text-sm mt-0.5"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Non-Returnable Items */}
            <section>
              <h3 className="font-serif text-xl text-warm-brown mb-4 flex items-center gap-2">
                <i className="fas fa-ban text-terracotta"></i>
                Non-Returnable Items
              </h3>
              <div className="bg-amber-50/30 border-l-4 border-terracotta p-4 rounded-r-lg">
                <p className="text-warm-brown-light leading-relaxed mb-2">
                  For hygiene and safety reasons, we cannot accept returns for:
                </p>
                <ul className="space-y-1 ml-6">
                  {[
                    'Opened products',
                    'Used products',
                    'Products damaged due to misuse',
                    'Products purchased during clearance or special promotions'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-warm-brown-light">
                      <i className="fas fa-times-circle text-terracotta text-sm mt-0.5"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </motion.div>
        )}

        {/* Refunds & Replacements Tab Content */}
        {activeTab === 'refunds' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            {/* When Refunds/Replacements are Offered */}
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-warm-brown mb-4 flex items-center gap-2">
                <i className="fas fa-money-bill-wave text-terracotta text-xl"></i>
                Refunds & Replacements
              </h2>
              <p className="text-warm-brown-light leading-relaxed mb-4">
                We only offer replacements or refunds in the following cases:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { icon: "fas fa-box-open", title: "Product received damaged", color: "text-red-500" },
                  { icon: "fas fa-exchange-alt", title: "Incorrect product received", color: "text-orange-500" },
                  { icon: "fas fa-cube", title: "Product missing from order", color: "text-yellow-600" }
                ].map((item, index) => (
                  <div key={index} className="bg-sand/20 rounded-lg p-4 text-center border border-sand/50">
                    <i className={`${item.icon} ${item.color} text-2xl mb-2`}></i>
                    <p className="text-warm-brown text-sm font-medium">{item.title}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* How to Request */}
            <section className="bg-terracotta/5 rounded-2xl p-6 md:p-8 border border-sand/50">
              <h3 className="font-serif text-xl text-warm-brown mb-4">How to Request</h3>
              <div className="bg-amber-50/30 p-4 rounded-lg mb-4">
                <p className="text-warm-brown text-sm">
                  <i className="fas fa-clock text-terracotta mr-2"></i>
                  Please contact us within <span className="font-semibold text-terracotta">24-48 hours</span> of receiving your order
                </p>
              </div>
              <p className="font-semibold text-warm-brown mb-2">Please provide:</p>
              <ul className="space-y-2 ml-6 mb-6">
                {[
                  'Order number',
                  'Photographs of the product and packaging',
                  'Description of the issue'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-warm-brown-light">
                    <i className="fas fa-check-circle text-terracotta text-sm mt-0.5"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-green-50/30 p-4 rounded-lg">
                <p className="text-warm-brown text-sm">
                  <i className="fas fa-check text-terracotta mr-2"></i>
                  Once approved, a replacement will be shipped or a refund will be processed to the original payment method.
                </p>
              </div>
            </section>

            {/* Important Notes */}
            <section>
              <h3 className="font-serif text-xl text-warm-brown mb-4 flex items-center gap-2">
                <i className="fas fa-info-circle text-terracotta"></i>
                Important Notes
              </h3>
              <div className="bg-amber-50/30 border-l-4 border-terracotta p-4 rounded-r-lg">
                <p className="text-warm-brown-light leading-relaxed">
                  Please note that shipping charges, handling fees, cash-on-delivery (COD) fees, 
                  and any applicable convenience charges are <span className="font-semibold text-terracotta">non-refundable</span> and will be deducted from the total refund amount. 
                  Refunds will only be issued for the value of the product(s) purchased.
                </p>
              </div>
            </section>

            {/* Refund Timeline */}
            <div className="bg-sand/20 rounded-lg p-4 text-center">
              <i className="fas fa-hourglass-half text-terracotta text-2xl mb-2"></i>
              <p className="text-warm-brown">
                Once approved, refunds will be processed within <span className="font-semibold text-terracotta">7–10 business days</span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Exchanges Tab Content */}
        {activeTab === 'exchanges' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <section>
              <h2 className="font-serif text-2xl md:text-3xl text-warm-brown mb-4 flex items-center gap-2">
                <i className="fas fa-sync-alt text-terracotta text-xl"></i>
                Exchanges
              </h2>
              <div className="bg-sand/20 rounded-2xl p-6 md:p-8 border border-sand/50 text-center">
                <i className="fas fa-truck text-terracotta text-3xl mb-3"></i>
                <p className="text-warm-brown-light leading-relaxed mb-4">
                  Approved exchanges will be shipped once the original item has been received and inspected.
                </p>
                <div className="bg-terracotta/10 p-4 rounded-lg mt-4">
                  <p className="text-warm-brown text-sm">
                    <i className="fas fa-clock text-terracotta mr-2"></i>
                    Please allow <span className="font-semibold text-terracotta">5-7 business days</span> for exchange processing after we receive your return.
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 bg-ivory rounded-2xl p-6 md:p-8 border border-sand/50 shadow-lg text-center"
        >
          <h3 className="font-serif text-xl text-warm-brown mb-4">Have Questions?</h3>
          <p className="text-warm-brown-light mb-6">
            For any concerns regarding your order, please reach out to us:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`mailto:${email}`}
              className="flex items-center justify-center gap-3 bg-terracotta/10 border border-terracotta/20 rounded-lg p-4 hover:bg-terracotta/20 transition-all duration-300"
            >
              <i className="fas fa-envelope text-terracotta text-xl"></i>
              <span className="text-terracotta font-medium">{email}</span>
            </a>
            <a 
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4 hover:bg-green-100 transition-all duration-300"
            >
              <i className="fab fa-whatsapp text-green-600 text-xl"></i>
              <span className="text-green-600 font-medium">{phone}</span>
            </a>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-terracotta"></div>
          <div className="w-2 h-2 rounded-full bg-terracotta/50"></div>
          <div className="w-2 h-2 rounded-full bg-terracotta/20"></div>
        </div>
      </div>
    </motion.div>
  )
}

export default ReturnsPolicy