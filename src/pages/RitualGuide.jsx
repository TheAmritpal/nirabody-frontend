import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const RitualGuide = () => {
  const [activeStep, setActiveStep] = useState(1)

  const steps = [
    {
      number: 1,
      title: "Dry Brush",
      icon: "fas fa-brush",
      duration: "3–5 minutes",
      description: "Before showering, use your dry brush on dry skin using gentle upward strokes toward the heart.",
      benefits: [
        "Exfoliates dead skin cells",
        "Promotes smoother-looking skin",
        "Supports circulation",
        "Prepares skin for oils and treatments"
      ],
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80"
    },
    {
      number: 2,
      title: "Cleanse",
      icon: "fas fa-shower",
      duration: "5 minutes",
      description: "Take a warm shower to cleanse and refresh the skin.",
      note: "Avoid excessively hot water as it may contribute to skin dryness.",
      benefits: [
        "Removes impurities",
        "Refreshes the body",
        "Prepares skin for oil absorption"
      ],
      image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&q=80"
    },
    {
      number: 3,
      title: "Apply Body Oil",
      icon: "fas fa-oil-can",
      duration: "3–5 minutes",
      description: "Apply your NIRA BODY Body Oil to slightly damp skin. Massage slowly using circular motions.",
      benefits: [
        "Deep hydration",
        "Enhanced glow",
        "Improved skin softness",
        "Nourished skin barrier"
      ],
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80"
    },
    {
      number: 4,
      title: "Sculpt & Massage",
      icon: "fas fa-hand-peace",
      duration: "5–7 minutes",
      description: "Use your sculpting oil along with your Gua Sha or massage tool.",
      focusAreas: ["Arms", "Legs", "Abdomen", "Neck", "Shoulders"],
      tip: "Take slow, intentional movements while practicing deep breathing.",
      benefits: [
        "Improves lymphatic flow",
        "Reduces tension",
        "Sculpts and tones",
        "Enhances product absorption"
      ],
      image: "https://images.unsplash.com/photo-1617897903246-71924a6ce8a6?auto=format&fit=crop&q=80"
    },
    {
      number: 5,
      title: "Restore",
      icon: "fas fa-spa",
      duration: "2–3 minutes",
      description: "End your ritual with a moment of stillness.",
      message: "Take a few deep breaths and allow yourself to fully enjoy the experience.",
      benefits: [
        "Mental clarity",
        "Stress relief",
        "Mind-body connection",
        "Complete self-care experience"
      ],
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80"
    }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-ivory"
    >
      {/* Hero Section - Using brand colors */}
      <div className="relative bg-gradient-to-r from-warm-brown to-terracotta py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-6xl text-ivory mb-4"
          >
            The NIRA Ritual
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-ivory/90 text-lg max-w-2xl mx-auto"
          >
            At NIRA BODY, we believe that consistency creates transformation.
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        
        {/* Introduction */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-warm-brown-light text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Our ritual-based approach combines simple daily practices that support 
            healthy-looking skin, relaxation, circulation, and overall wellbeing.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <div className="hidden md:flex justify-between mb-12">
          {steps.map((step) => (
            <button
              key={step.number}
              onClick={() => setActiveStep(step.number)}
              className={`flex-1 text-center transition-all duration-300 ${activeStep === step.number ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
            >
              <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center transition-all duration-300 ${activeStep === step.number ? 'bg-terracotta text-ivory scale-110' : 'bg-sand text-warm-brown'}`}>
                <span className="font-serif text-xl">{step.number}</span>
              </div>
              <p className="text-sm text-warm-brown font-medium">{step.title}</p>
            </button>
          ))}
        </div>

        {/* Steps - All using same consistent sand/terracotta color scheme */}
        <div className="space-y-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-sand/20 rounded-2xl overflow-hidden shadow-lg border border-sand/50"
            >
              <div className="flex flex-col md:flex-row">
                {/* Left Side - Content */}
                <div className="flex-1 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center">
                      <span className="text-ivory font-serif text-xl font-bold">{step.number}</span>
                    </div>
                    <div>
                      <h2 className="font-serif text-2xl md:text-3xl text-warm-brown">
                        {step.title}
                      </h2>
                      <div className="flex items-center gap-2 mt-1">
                        <i className={`${step.icon} text-terracotta text-sm`}></i>
                        <span className="text-warm-brown-light text-sm">{step.duration}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-warm-brown leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {step.note && (
                    <div className="bg-terracotta/10 border-l-4 border-terracotta p-3 mb-4 rounded-r">
                      <p className="text-warm-brown-light text-sm">
                        <i className="fas fa-info-circle text-terracotta mr-2"></i>
                        {step.note}
                      </p>
                    </div>
                  )}

                  {step.focusAreas && (
                    <div className="mb-4">
                      <p className="font-semibold text-warm-brown mb-2">Focus on:</p>
                      <div className="flex flex-wrap gap-2">
                        {step.focusAreas.map((area, i) => (
                          <span key={i} className="bg-sand/50 px-3 py-1 rounded-full text-warm-brown-light text-sm">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.tip && (
                    <div className="bg-terracotta/10 p-3 rounded-lg mb-4">
                      <p className="text-warm-brown text-sm">
                        <i className="fas fa-lightbulb text-terracotta mr-2"></i>
                        {step.tip}
                      </p>
                    </div>
                  )}

                  {step.message && (
                    <p className="font-serif text-lg text-terracotta italic mb-4">
                      "{step.message}"
                    </p>
                  )}

                  <div>
                    <p className="font-semibold text-warm-brown mb-2">Benefits:</p>
                    <ul className="space-y-1">
                      {step.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2 text-warm-brown-light">
                          <i className="fas fa-check-circle text-terracotta text-sm mt-0.5"></i>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Side - Image */}
                <div className="md:w-80 h-64 md:h-auto relative overflow-hidden">
                  <img 
                    src={step.image} 
                    alt={`Step ${step.number}: ${step.title}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-brown/30 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Message */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-sand/20 rounded-2xl p-8 md:p-12 border border-sand/50"
        >
          <i className="fas fa-heart text-terracotta text-3xl mb-4"></i>
          <p className="font-serif text-xl md:text-2xl text-warm-brown leading-relaxed mb-6">
            Because body care is not just about how your skin looks —<br />
            it's about how you feel.
          </p>
          <Link 
            to="/shop"
            className="inline-block bg-terracotta text-ivory px-8 py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide"
          >
            Begin Your Ritual Today
          </Link>
        </motion.div>

        {/* Quick Tips */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="text-center p-4 border border-sand/50 rounded-lg bg-ivory">
            <i className="fas fa-clock text-terracotta text-2xl mb-2"></i>
            <p className="text-warm-brown font-semibold">Total Time</p>
            <p className="text-warm-brown-light text-sm">18-25 minutes daily</p>
          </div>
          <div className="text-center p-4 border border-sand/50 rounded-lg bg-ivory">
            <i className="fas fa-calendar-alt text-terracotta text-2xl mb-2"></i>
            <p className="text-warm-brown font-semibold">Best Time</p>
            <p className="text-warm-brown-light text-sm">Morning or Evening</p>
          </div>
          <div className="text-center p-4 border border-sand/50 rounded-lg bg-ivory">
            <i className="fas fa-chart-line text-terracotta text-2xl mb-2"></i>
            <p className="text-warm-brown font-semibold">Results</p>
            <p className="text-warm-brown-light text-sm">Visible in 2-4 weeks</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default RitualGuide