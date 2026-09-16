import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const AboutUs = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-ivory"
    >
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80"
            alt="NIRA BODY Ritual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warm-brown/60 to-warm-brown/80"></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-6xl text-ivory mb-4"
          >
            Our Story
          </motion.h1>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-0.5 bg-terracotta mx-auto"
          ></motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        
        {/* Why Nira Body Exists */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-warm-brown mb-6 text-center">
            Why NIRA BODY Exists
          </h2>
          <div className="w-16 h-0.5 bg-terracotta mx-auto mb-8"></div>
          <p className="text-warm-brown-light text-lg leading-relaxed mb-6 text-center">
            NIRA BODY was created from a simple belief: <span className="text-terracotta font-semibold">self-care should be intentional, nourishing, and deeply restorative.</span>
          </p>
          <p className="text-warm-brown-light leading-relaxed mb-4">
            In today's fast-paced world, body care often becomes an afterthought. We wanted to change that by bringing back the timeless rituals that generations of women trusted for healthy, radiant skin.
          </p>
          <p className="text-warm-brown-light leading-relaxed">
            Inspired by ancient beauty wisdom and guided by modern clean formulation standards, NIRA BODY creates conscious skincare and body care products that support long-term skin health without compromising your wellbeing.
          </p>
        </motion.section>

        {/* Philosophy Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-sand/20 p-8 md:p-12 rounded-2xl mb-16"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-warm-brown mb-4 text-center">
            Our Philosophy
          </h3>
          <p className="text-warm-brown-light text-lg leading-relaxed text-center mb-6">
            Rooted in simplicity. Guided by intention.
          </p>
          <p className="text-warm-brown-light leading-relaxed">
            We believe effective skincare doesn't need to be complicated. Through thoughtfully crafted body oils, sculpting rituals, dry brushing practices, and wellness essentials, we help transform everyday routines into meaningful moments of self-care.
          </p>
        </motion.section>

        {/* What We Stand For - Values Grid */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-warm-brown mb-8 text-center">
            Every NIRA BODY Product is Designed with Intention
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "fas fa-leaf", title: "Conscious Ingredients", color: "text-green-600" },
              { icon: "fas fa-heartbeat", title: "Hormone-Safe Philosophy", color: "text-terracotta" },
              { icon: "fas fa-spa", title: "Ritual-Based Wellness", color: "text-purple-500" },
              { icon: "fas fa-seedling", title: "Long-Term Skin Nourishment", color: "text-emerald-600" },
              { icon: "fas fa-gem", title: "Everyday Luxury", color: "text-amber-600" },
              { icon: "fas fa-hand-holding-heart", title: "Mindful Self-Care", color: "text-rose-500" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="bg-ivory border border-sand rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-sand/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-terracotta/10 transition-colors">
                  <i className={`${item.icon} text-2xl ${item.color} group-hover:scale-110 transition-transform`}></i>
                </div>
                <h4 className="font-serif text-lg text-warm-brown">{item.title}</h4>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Mission Statement */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="relative">
            <i className="fas fa-quote-left text-6xl text-sand absolute -top-8 -left-4 opacity-50"></i>
            <p className="font-serif text-2xl md:text-3xl text-warm-brown leading-relaxed italic px-4">
              We are more than a skincare brand. We are a reminder to slow down, reconnect, and care for yourself with purpose.
            </p>
            <i className="fas fa-quote-right text-6xl text-sand absolute -bottom-8 -right-4 opacity-50"></i>
          </div>
        </motion.section>

        {/* Tagline */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-terracotta/10 rounded-2xl p-8 md:p-12">
            <p className="font-serif text-2xl md:text-3xl text-terracotta mb-3">
              Ancient beauty wisdom reimagined for modern women.
            </p>
            <div className="w-16 h-0.5 bg-terracotta mx-auto my-6"></div>
            <Link 
              to="/shop"
              className="inline-block bg-terracotta text-ivory px-8 py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide"
            >
              Begin Your Ritual
            </Link>
          </div>
        </motion.section>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-2 mt-16">
          <div className="w-2 h-2 rounded-full bg-terracotta"></div>
          <div className="w-2 h-2 rounded-full bg-terracotta/50"></div>
          <div className="w-2 h-2 rounded-full bg-terracotta/20"></div>
        </div>
      </div>
    </motion.div>
  )
}

export default AboutUs