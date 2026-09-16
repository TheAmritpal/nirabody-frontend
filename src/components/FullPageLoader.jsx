// components/FullPageLoader.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const FullPageLoader = () => {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Loading...')

  useEffect(() => {
    const texts = [
      'Loading your ritual journey...',
      'Preparing wellness experience...',
      'Curating sacred rituals...',
      'Discovering ancient wisdom...',
      'Almost ready...',
      'Welcome to NIRA BODY!'
    ]

    let textIndex = 0
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length
      setLoadingText(texts[textIndex])
    }, 1500)

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 8
      })
    }, 200)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-ivory">
      <div className="flex flex-col items-center space-y-8 max-w-sm mx-auto px-6">
        {/* Logo Animation */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-24 bg-terracotta/10 rounded-full flex items-center justify-center"
        >
          <i className="fas fa-spa text-terracotta text-4xl"></i>
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-serif text-3xl text-warm-brown"
        >
          NIRA<span className="text-terracotta"> BODY</span>
        </motion.h1>

        {/* Loading Text */}
        <motion.p
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-warm-brown-light text-sm"
        >
          {loadingText}
        </motion.p>

        {/* Progress Bar */}
        <div className="w-64 h-1.5 bg-sand/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-terracotta to-warm-brown rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Progress Percentage */}
        <p className="text-warm-brown-light text-xs">
          {Math.min(Math.round(progress), 100)}%
        </p>

        {/* Decorative Dots */}
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-terracotta/30"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FullPageLoader