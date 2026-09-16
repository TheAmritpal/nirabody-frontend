// pages/FAQs.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCache } from '../hooks/useCache'
import FAQSkeleton from '../components/skeletons/FAQSkeleton'

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null)
  const { data: settings, loading: settingsLoading } = useCache('settings', '/settings')

  // Get settings values with fallbacks
  const email = settings?.email || 'nira.bodycare@gmail.com'
  const phone = settings?.phone || '+91 8976084417'
  const whatsapp = settings?.whatsapp || 'https://wa.me/918976084417'
  const siteName = settings?.site_name || 'NIRA BODY'

  const faqCategories = [
    {
      category: "Products & Ingredients",
      icon: "fas fa-leaf",
      questions: [
        {
          q: `What makes ${siteName} different from other skincare brands?`,
          a: `${siteName} combines ancient beauty wisdom with modern clean formulation standards. We focus on hormone-safe, conscious ingredients and ritual-based wellness, not just quick fixes. Every product is designed to support long-term skin health while creating meaningful self-care moments.`
        },
        {
          q: "Are NIRA BODY products safe for all skin types?",
          a: "Yes! Our products are formulated with gentle, natural ingredients suitable for all skin types. However, if you have specific allergies or sensitive skin conditions, we recommend checking the ingredients list or consulting with a dermatologist before use."
        },
        {
          q: "Are your products hormone-safe?",
          a: "Absolutely. Hormone-safe skincare is at the core of our philosophy. We avoid endocrine disruptors, synthetic fragrances, parabens, phthalates, and other harmful chemicals that can interfere with your body's natural balance."
        },
        {
          q: "Are NIRA BODY products cruelty-free and vegan?",
          a: "Yes! We are 100% cruelty-free and never test on animals. Most of our products are vegan, and we clearly label any exceptions on the product page."
        }
      ]
    },
    {
      category: "Rituals & Usage",
      icon: "fas fa-spa",
      questions: [
        {
          q: "How do I start my NIRA ritual?",
          a: "Begin with our 5-step ritual: Dry Brush, Cleanse, Apply Body Oil, Sculpt & Massage, and Restore. Check our Ritual Guide page for detailed instructions and tips for each step."
        },
        {
          q: "How often should I practice the NIRA ritual?",
          a: "For best results, we recommend practicing your ritual daily. The complete ritual takes 18-25 minutes, but even a simplified 5-minute version can make a difference in how you feel."
        },
        {
          q: "Can I use the products without the full ritual?",
          a: "Absolutely! While we believe in the power of ritual, our products work wonderfully on their own. Use them in whatever way fits your lifestyle and schedule."
        },
        {
          q: "How long until I see results?",
          a: "Most customers notice improved skin texture and radiance within 2-4 weeks of consistent use. For best results, we recommend practicing your ritual daily for at least 30 days."
        }
      ]
    },
    {
      category: "Orders & Shipping",
      icon: "fas fa-truck",
      questions: [
        {
          q: "How long does shipping take?",
          a: "We ship across India with an estimated delivery time of 7-10 business days after order processing. Orders are processed within 1-3 business days."
        },
        {
          q: "Do you offer international shipping?",
          a: "Currently, we ship within India only. We're working on expanding internationally soon. Stay tuned for updates!"
        },
        {
          q: "How can I track my order?",
          a: "Once your order is dispatched, you'll receive tracking details via email, SMS, or WhatsApp. You can use these to track your package in real-time."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit/debit cards, UPI, net banking, and Cash on Delivery (COD). All payments are processed securely through trusted payment gateways."
        }
      ]
    },
    {
      category: "Returns & Refunds",
      icon: "fas fa-exchange-alt",
      questions: [
        {
          q: "What is your return policy?",
          a: "We accept returns for damaged products, incorrect items, or defective products. Please contact us within 48 hours of receiving your order with photos of the product and packaging."
        },
        {
          q: "Can I return opened or used products?",
          a: "Due to hygiene and safety reasons, we cannot accept returns for opened or used products. Please check our Returns Policy page for more details."
        },
        {
          q: "How long does it take to get a refund?",
          a: "Once your return request is approved, refunds are processed within 7-10 business days to your original payment method."
        },
        {
          q: "Are shipping charges refundable?",
          a: "Shipping charges, handling fees, and COD charges are non-refundable. Refunds are issued only for the value of the product(s) purchased."
        }
      ]
    },
    {
      category: "Account & Support",
      icon: "fas fa-headset",
      questions: [
        {
          q: "How do I create an account?",
          a: "Click on the user icon in the top navigation bar and select 'Sign Up'. You can create an account using your email address or social media profiles."
        },
        {
          q: "How can I contact customer support?",
          a: `You can reach us via email at ${email} or WhatsApp at ${phone}. Our support team is available Monday-Saturday, 10 AM - 7 PM IST.`
        },
        {
          q: "Do you have a loyalty program?",
          a: "Yes! Join our Ritual Circle newsletter to get early access, exclusive offers, and skincare education. We're also working on a full loyalty program - stay tuned!"
        },
        {
          q: "Can I cancel or modify my order?",
          a: "Orders can be cancelled within 2 hours of placement. Once processed, we cannot modify or cancel the order. Please contact us immediately if you need to make changes."
        }
      ]
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  if (settingsLoading) {
    return <FAQSkeleton />
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
          <div className="absolute inset-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl text-ivory mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-ivory/90 text-base md:text-lg max-w-2xl mx-auto"
          >
            Everything you need to know about {siteName}
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="relative">
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-brown-light"></i>
            <input
              type="text"
              placeholder="Search your question..."
              className="w-full pl-12 pr-4 py-4 border border-sand rounded-xl focus:outline-none focus:border-terracotta bg-ivory text-warm-brown"
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase()
                // Search functionality can be added here
              }}
            />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        {faqCategories.map((category, catIndex) => (
          <motion.div
            key={catIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            className="mb-12"
          >
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
                <i className={`${category.icon} text-terracotta text-lg`}></i>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-warm-brown">
                {category.category}
              </h2>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {category.questions.map((faq, qIndex) => {
                const globalIndex = `${catIndex}-${qIndex}`
                const isOpen = openIndex === globalIndex
                
                return (
                  <div
                    key={qIndex}
                    className="bg-ivory border border-sand/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                  >
                    <button
                      onClick={() => toggleFAQ(globalIndex)}
                      className="w-full text-left p-5 flex justify-between items-center hover:bg-sand/10 transition-colors duration-300"
                    >
                      <span className="font-serif text-lg text-warm-brown pr-4">
                        {faq.q}
                      </span>
                      <motion.i 
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="fas fa-chevron-down text-terracotta flex-shrink-0"
                      ></motion.i>
                    </button>
                    
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 pt-0 border-t border-sand/30">
                            <p className="text-warm-brown-light leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}

        {/* Still Have Questions Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center bg-sand/20 rounded-2xl p-8 md:p-10 border border-sand/50"
        >
          <i className="fas fa-comments text-terracotta text-3xl mb-4"></i>
          <h3 className="font-serif text-2xl text-warm-brown mb-3">
            Still Have Questions?
          </h3>
          <p className="text-warm-brown-light mb-6">
            Can't find what you're looking for? Our team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`mailto:${email}`}
              className="inline-flex items-center justify-center gap-2 bg-terracotta text-ivory px-6 py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide"
            >
              <i className="fas fa-envelope"></i>
              Email Us
            </a>
            <a 
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-all duration-300 font-sans text-sm uppercase tracking-wide"
            >
              <i className="fab fa-whatsapp"></i>
              WhatsApp Us
            </a>
          </div>
          <p className="text-warm-brown-light text-sm mt-6">
            Response time: 24-48 business hours
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <span className="text-warm-brown-light text-sm">Quick Links:</span>
          <a href="/shipping-policy" className="text-terracotta text-sm hover:text-warm-brown transition-colors">Shipping Policy</a>
          <a href="/returns-policy" className="text-terracotta text-sm hover:text-warm-brown transition-colors">Returns Policy</a>
          <a href="/privacy-policy" className="text-terracotta text-sm hover:text-warm-brown transition-colors">Privacy Policy</a>
          <a href="/contact" className="text-terracotta text-sm hover:text-warm-brown transition-colors">Contact Us</a>
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

export default FAQs