// pages/Contact.jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { useCache } from '../hooks/useCache'
import { apiUrl } from '../backend/pages/https'
import ContactSkeleton from '../components/skeletons/ContactSkeleton'

const Contact = () => {
  const { data: settings, loading: settingsLoading } = useCache('settings', '/settings')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPopup, setShowPopup] = useState(false)
  const [popupMessage, setPopupMessage] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`${apiUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      })

      const data = await response.json()

      if (data.status) {
        setPopupMessage('Thank you for reaching out! We\'ll get back to you soon.')
        setShowPopup(true)
        setIsSubmitted(true)
        
        setFormData({ name: '', email: '', phone: '', message: '' })
        
        setTimeout(() => {
          setShowPopup(false)
          setIsSubmitted(false)
        }, 5000)
      } else {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(', ')
          setPopupMessage('❌ ' + errorMessages)
          setShowPopup(true)
          setTimeout(() => setShowPopup(false), 4000)
        } else {
          setPopupMessage('❌ ' + (data.message || 'Something went wrong. Please try again.'))
          setShowPopup(true)
          setTimeout(() => setShowPopup(false), 4000)
        }
      }
    } catch (err) {
      setPopupMessage('❌ Network error. Please check your connection and try again.')
      setShowPopup(true)
      setTimeout(() => setShowPopup(false), 4000)
      console.error('Form submission error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Get settings values with fallbacks
  const siteName = settings?.site_name || 'Nira Body Care'
  const phone = settings?.phone || '+91 8976084417'
  const phoneAlt = settings?.phone_alt || '+91 8976084417'
  const email = settings?.email || 'nira.bodycare@gmail.com'
  const address = settings?.address_full || 'Nira Body Care<br/>123, Main Street<br/>Mumbai, Maharashtra - 400001<br/>India'
  const businessHours = settings?.business_hours_full || 'Monday - Saturday<br/>10:00 AM - 7:00 PM IST<br/>Sunday & Public Holidays: Closed'
  const whatsapp = settings?.whatsapp || 'https://wa.me/918976084417'

  const contactCards = [
    {
      title: "Customer Support",
      subtitle: siteName,
      contacts: [
        { icon: "fab fa-whatsapp", value: phone, link: whatsapp, color: "text-green-600" },
        { icon: "fas fa-phone-alt", value: phone, link: `tel:${phone.replace(/[^0-9+]/g, '')}`, color: "text-terracotta" }
      ]
    },
    {
      title: "Customer & Partnership Support",
      subtitle: "Aarti M",
      contacts: [
        { icon: "fas fa-phone-alt", value: phoneAlt, link: `tel:${phoneAlt.replace(/[^0-9+]/g, '')}`, color: "text-terracotta" }
      ]
    },
    {
      title: "Customer & Partnership Support",
      subtitle: "Esha B",
      contacts: [
        { icon: "fas fa-phone-alt", value: "+91 9137200679", link: "tel:+919137200679", color: "text-terracotta" }
      ]
    }
  ]

  if (settingsLoading) {
    return <ContactSkeleton />
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-ivory relative"
    >
      {/* Popup Modal */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              className="bg-ivory rounded-2xl max-w-md w-full p-8 text-center shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-20 h-20 rounded-full bg-terracotta/10 flex items-center justify-center mx-auto mb-4">
                {popupMessage.includes('Thank you') ? (
                  <i className="fas fa-check-circle text-terracotta text-4xl"></i>
                ) : (
                  <i className="fas fa-exclamation-circle text-red-500 text-4xl"></i>
                )}
              </div>
              
              <p className="text-warm-brown text-lg font-medium leading-relaxed">
                {popupMessage}
              </p>
              
              <button
                onClick={() => setShowPopup(false)}
                className="mt-6 bg-terracotta text-ivory px-6 py-2 rounded-full hover:bg-warm-brown transition-all duration-300 text-sm font-medium"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
            We'd Love To Hear From You
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-ivory/90 text-base md:text-lg max-w-2xl mx-auto"
          >
            Whether you have questions about our products, rituals, orders, or partnerships, 
            our team is here to help.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {contactCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-sand/20 rounded-2xl p-6 border border-sand/50 hover:shadow-lg transition-all duration-300"
            >
              <h3 className="font-serif text-xl text-warm-brown mb-1">{card.title}</h3>
              <p className="text-terracotta text-sm mb-4">{card.subtitle}</p>
              <div className="space-y-3">
                {card.contacts.map((contact, i) => (
                  <a
                    key={i}
                    href={contact.link}
                    target={contact.link.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-warm-brown-light hover:text-terracotta transition-colors group"
                  >
                    <div className="w-10 h-10 bg-ivory rounded-full flex items-center justify-center group-hover:bg-terracotta/10 transition-colors">
                      <i className={`${contact.icon} ${contact.color} text-lg`}></i>
                    </div>
                    <span className="font-medium">{contact.value}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Email, Business Hours, and Address Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-terracotta/5 rounded-2xl p-6 border border-sand/50 text-center"
          >
            <div className="w-14 h-14 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-envelope text-terracotta text-xl"></i>
            </div>
            <h3 className="font-serif text-xl text-warm-brown mb-2">Email Us</h3>
            <a 
              href={`mailto:${email}`}
              className="text-terracotta hover:text-warm-brown transition-colors text-sm"
            >
              {email}
            </a>
            <p className="text-warm-brown-light text-xs mt-2">
              Respond within 24-48 hours
            </p>
          </motion.div>

          {/* Business Hours Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="bg-sand/20 rounded-2xl p-6 border border-sand/50 text-center"
          >
            <div className="w-14 h-14 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-clock text-terracotta text-xl"></i>
            </div>
            <h3 className="font-serif text-xl text-warm-brown mb-2">Business Hours</h3>
            <div 
              className="text-warm-brown-light text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: businessHours }}
            />
          </motion.div>

          {/* Address Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-sand/20 rounded-2xl p-6 border border-sand/50 text-center"
          >
            <div className="w-14 h-14 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <i className="fas fa-map-marker-alt text-terracotta text-xl"></i>
            </div>
            <h3 className="font-serif text-xl text-warm-brown mb-2">Visit Us</h3>
            <div 
              className="text-warm-brown-light text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: address }}
            />
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-ivory rounded-2xl p-6 md:p-8 border border-sand/50 shadow-lg"
        >
          <h3 className="font-serif text-2xl text-warm-brown text-center mb-6">Send Us a Message</h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-warm-brown text-sm font-medium mb-2">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-warm-brown text-sm font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-warm-brown text-sm font-medium mb-2">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors"
                placeholder="Enter your phone number"
              />
            </div>
            
            <div>
              <label className="block text-warm-brown text-sm font-medium mb-2">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-terracotta text-ivory px-6 py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-sand/20 rounded-2xl p-8 border border-sand/50">
            <i className="fas fa-star text-terracotta text-2xl mb-3"></i>
            <p className="text-warm-brown-light leading-relaxed mb-2">
              We aim to respond to all inquiries within <span className="font-semibold text-terracotta">24–48 business hours</span>.
            </p>
            <p className="text-warm-brown font-serif text-lg">
              Thank you for being part of the Nira Body community. ✨
            </p>
            <div className="mt-4 pt-4 border-t border-sand/50">
              <p className="text-warm-brown-light text-sm">
                Conscious body care. Intentional rituals. Lasting radiance.
              </p>
            </div>
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

export default Contact