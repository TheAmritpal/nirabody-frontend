// pages/ShippingPolicy.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { useCache } from '../hooks/useCache'
import ShippingPolicySkeleton from '../components/skeletons/ShippingPolicySkeleton'

const ShippingPolicy = () => {
  const { data: settings, loading: settingsLoading } = useCache('settings', '/settings')

  // Get settings values with fallbacks
  const siteName = settings?.site_name || 'NIRA BODY'
  const email = settings?.email || 'nira.bodycare@gmail.com'
  const phone = settings?.phone || '+91 8976084417'
  const whatsapp = settings?.whatsapp || 'https://wa.me/918976084417'
  const address = settings?.address || 'Nira Body Care, Mumbai'

  if (settingsLoading) {
    return <ShippingPolicySkeleton />
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
            Shipping Policy
          </h1>
          <div className="w-20 h-0.5 bg-terracotta mx-auto"></div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Introduction */}
          <section className="bg-sand/20 p-6 md:p-8 rounded-lg text-center">
            <p className="text-warm-brown leading-relaxed">
              Thank you for choosing <span className="font-semibold text-terracotta">{siteName}</span>.
              <br />
              We are committed to delivering your order safely and efficiently.
            </p>
          </section>

          {/* Order Processing */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
                <i className="fas fa-clock text-terracotta"></i>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-warm-brown">
                Order Processing
              </h2>
            </div>
            <div className="ml-14">
              <p className="text-warm-brown-light leading-relaxed mb-2">
                All orders are processed within <span className="font-semibold text-terracotta">1–3 business days</span> after payment confirmation.
              </p>
              <p className="text-warm-brown-light leading-relaxed">
                Orders placed on weekends or public holidays will be processed on the next working day.
              </p>
            </div>
          </section>

          {/* Shipping Timeline */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
                <i className="fas fa-truck text-terracotta"></i>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-warm-brown">
                Shipping Timeline
              </h2>
            </div>
            <div className="ml-14">
              <p className="text-warm-brown-light leading-relaxed mb-2">
                <span className="font-semibold text-terracotta">Estimated delivery time:</span>
              </p>
              <p className="text-warm-brown-light leading-relaxed text-lg mb-3">
                7–10 business days across India
              </p>
              <div className="bg-sand/20 p-4 rounded-lg mt-3">
                <div className="flex items-start gap-2">
                  <i className="fas fa-info-circle text-terracotta text-sm mt-0.5"></i>
                  <p className="text-warm-brown-light text-sm">
                    Please note that delivery timelines may vary depending on location, weather conditions, 
                    courier delays, or other unforeseen circumstances.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Order Tracking */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
                <i className="fas fa-map-marker-alt text-terracotta"></i>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-warm-brown">
                Order Tracking
              </h2>
            </div>
            <div className="ml-14">
              <p className="text-warm-brown-light leading-relaxed">
                Once your order has been dispatched, you will receive tracking details via 
                <span className="font-semibold text-terracotta"> email, SMS, or WhatsApp</span>.
              </p>
            </div>
          </section>

          {/* Incorrect Address */}
          <section className="bg-amber-50/30 border-l-4 border-terracotta p-6 rounded-r-lg">
            <div className="flex items-start gap-3">
              <i className="fas fa-exclamation-triangle text-terracotta text-xl"></i>
              <div>
                <h2 className="font-serif text-xl text-warm-brown mb-2">
                  Incorrect Address
                </h2>
                <p className="text-warm-brown-light leading-relaxed">
                  Customers are responsible for providing accurate shipping information. 
                  {siteName} is not responsible for delays or failed deliveries caused by incorrect address details.
                </p>
              </div>
            </div>
          </section>

          {/* Damaged Packages */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
                <i className="fas fa-box-open text-terracotta"></i>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-warm-brown">
                Damaged Packages
              </h2>
            </div>
            <div className="ml-14">
              <p className="text-warm-brown-light leading-relaxed">
                If your package arrives damaged, please contact us within 
                <span className="font-semibold text-terracotta"> 48 hours</span> of receiving your order 
                along with photographs of the package and product.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-sand/20 p-6 md:p-8 rounded-lg mt-8">
            <h2 className="font-serif text-2xl md:text-3xl text-warm-brown mb-6 text-center">
              Contact Us
            </h2>
            <p className="text-warm-brown-light text-center mb-6">
              For shipping-related inquiries:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Email */}
              <a 
                href={`mailto:${email}`}
                className="flex items-center justify-center gap-3 bg-ivory border border-sand rounded-lg p-4 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center group-hover:bg-terracotta/20 transition-colors">
                  <i className="fas fa-envelope text-terracotta"></i>
                </div>
                <div>
                  <p className="text-warm-brown-light text-sm">Email us at</p>
                  <p className="text-terracotta font-medium">{email}</p>
                </div>
              </a>
              
              {/* WhatsApp */}
              <a 
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-ivory border border-sand rounded-lg p-4 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <i className="fab fa-whatsapp text-green-600 text-xl"></i>
                </div>
                <div>
                  <p className="text-warm-brown-light text-sm">Message us on</p>
                  <p className="text-green-600 font-medium">{phone}</p>
                </div>
              </a>
            </div>
          </section>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 border border-sand rounded-lg">
              <i className="fas fa-clock text-terracotta text-2xl mb-2"></i>
              <p className="text-warm-brown font-semibold">Processing Time</p>
              <p className="text-warm-brown-light text-sm">1-3 Business Days</p>
            </div>
            <div className="text-center p-4 border border-sand rounded-lg">
              <i className="fas fa-shipping-fast text-terracotta text-2xl mb-2"></i>
              <p className="text-warm-brown font-semibold">Delivery Time</p>
              <p className="text-warm-brown-light text-sm">7-10 Business Days</p>
            </div>
            <div className="text-center p-4 border border-sand rounded-lg">
              <i className="fas fa-check-circle text-terracotta text-2xl mb-2"></i>
              <p className="text-warm-brown font-semibold">Tracking</p>
              <p className="text-warm-brown-light text-sm">Email · SMS · WhatsApp</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ShippingPolicy