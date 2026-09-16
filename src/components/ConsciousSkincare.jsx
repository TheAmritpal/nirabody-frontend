import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ConsciousSkincare = () => {
  const features = [
    {
      icon: "fas fa-leaf",
      title: "Purposeful Ingredients",
      description: "Every ingredient has a reason, every formula serves a purpose."
    },
    {
      icon: "fas fa-heart",
      title: "Skin Health First",
      description: "Created with deeper respect for skin health over fleeting trends."
    },
    {
      icon: "fas fa-spa",
      title: "Intentional Rituals",
      description: "Every ritual supports long-term skin wellness and natural balance."
    },
    {
      icon: "fas fa-seedling",
      title: "Nature-Led Formulation",
      description: "Combining nature-led ingredients with effective, clean formulation."
    }
  ]

  return (
    <section className="py-20 px-4 bg-ivory">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-terracotta font-sans text-sm uppercase tracking-wider mb-3 bg-terracotta/10 px-4 py-1 rounded-full">
            Our Philosophy
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-warm-brown mb-4">
            What is Conscious Skincare?
          </h2>
          <div className="w-16 h-0.5 bg-terracotta mx-auto mb-6"></div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-warm-brown-light text-lg leading-relaxed">
              Conscious skincare is a thoughtful approach to beauty that values both 
              <span className="text-terracotta font-medium"> results and responsibility</span>. 
              It means choosing products made with purposeful ingredients, honest 
              formulations, and a deeper respect for skin health over trends.
            </p>

            <p className="text-warm-brown-light text-lg leading-relaxed">
              It is skincare created with <span className="text-terracotta font-medium">intention</span> — 
              where every ingredient has a reason, every formula serves a purpose, 
              and every ritual supports long-term skin wellness.
            </p>

            <div className="bg-sand/20 rounded-2xl p-6 border border-sand/50">
              <p className="text-warm-brown text-lg leading-relaxed">
                <span className="font-semibold text-terracotta">At NIRA BODY</span>, conscious skincare 
                means combining nature-led ingredients with effective formulation to 
                create products that feel luxurious, work beautifully, and honour your 
                skin's natural balance.
              </p>
            </div>

            <div className="pt-4">
              <p className="text-warm-brown-light text-lg leading-relaxed mb-2">
                We are here to move away from noise, overconsumption, and quick fixes —
              </p>
              <p className="font-serif text-2xl text-terracotta">
                Less clutter. More intention. Better skin.
              </p>
            </div>

            <Link
              to="/about"
              className="inline-block bg-terracotta text-ivory px-8 py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide mt-4"
            >
              Discover Our Story
            </Link>
          </motion.div>

          {/* Right Side - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-ivory border border-sand/50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-terracotta/30 group"
              >
                <div className="w-12 h-12 bg-terracotta/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-terracotta/20 transition-colors">
                  <i className={`${feature.icon} text-terracotta text-xl`}></i>
                </div>
                <h3 className="font-serif text-xl text-warm-brown mb-2">
                  {feature.title}
                </h3>
                <p className="text-warm-brown-light text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-terracotta/10 to-sand/30 rounded-2xl p-8 md:p-12 text-center border border-sand/50"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-3">
              <i className="fas fa-check-circle text-terracotta text-2xl"></i>
              <span className="text-warm-brown font-medium">Conscious Ingredients</span>
            </div>
            <div className="w-px h-6 bg-sand/50 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <i className="fas fa-check-circle text-terracotta text-2xl"></i>
              <span className="text-warm-brown font-medium">Hormone-Safe</span>
            </div>
            <div className="w-px h-6 bg-sand/50 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <i className="fas fa-check-circle text-terracotta text-2xl"></i>
              <span className="text-warm-brown font-medium">Cruelty-Free</span>
            </div>
            <div className="w-px h-6 bg-sand/50 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <i className="fas fa-check-circle text-terracotta text-2xl"></i>
              <span className="text-warm-brown font-medium">Sustainable Packaging</span>
            </div>
          </div>
        </motion.div>

        
      </div>
    </section>
  )
}

export default ConsciousSkincare