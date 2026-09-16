


// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import axios from 'axios'

// import { apiUrl } from '../backend/pages/https'
// import { getImageUrl } from '../Helper'

// const HeroSection = () => {
//   const [sliders, setSliders] = useState([])
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [loading, setLoading] = useState(true)

//   // Fetch sliders from API
//   useEffect(() => {
//     const fetchSliders = async () => {
//       try {
//         const response = await axios.get(`${apiUrl || 'http://localhost:8000/api'}/sliders/active`)
//         if (response.data.status) {
//           setSliders(response.data.data)
//         }
//       } catch (error) {
//         console.error('Error fetching sliders:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchSliders()
//   }, [])

//   // Auto-slide every 5 seconds
//   useEffect(() => {
//     if (sliders.length <= 1) return
    
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % sliders.length)
//     }, 5000)
    
//     return () => clearInterval(interval)
//   }, [sliders.length])

//   // Dot indicators click handler
//   const goToSlide = (index) => {
//     setCurrentIndex(index)
//   }

//   if (loading) {
//     return (
//       <section className="relative min-h-screen flex items-center justify-center bg-ivory">
//         <div className="w-12 h-12 border-4 border-terracotta rounded-full border-t-transparent animate-spin"></div>
//       </section>
//     )
//   }

//   if (!sliders.length) {
//     return (
//       <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ivory">
//         <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
//           <div className="max-w-2xl">
//             <span className="inline-block text-terracotta font-sans text-sm uppercase tracking-wider mb-4 bg-ivory/30 backdrop-blur-sm px-4 py-1 rounded-full">
//               Holistic Body Care
//             </span>
//             <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-warm-brown leading-tight mb-6">
//               Ancient Wisdom.
//               <br />
//               Modern Rituals.
//             </h1>
//             <p className="text-warm-brown text-base sm:text-lg max-w-lg mb-8 font-light leading-relaxed">
//               Conscious skincare that restores radiance, honors rituals, 
//               and respects your hormones.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 items-start">
//               <Link to="/shop" className="inline-block bg-terracotta text-ivory px-6 sm:px-8 py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide shadow-lg text-center">
//                 Begin Your Ritual
//               </Link>
//               <Link to="/about" className="inline-block border-2 border-warm-brown text-warm-brown px-6 sm:px-8 py-3 rounded-full hover:bg-warm-brown hover:text-ivory transition-all duration-300 font-sans text-sm uppercase tracking-wide text-center">
//                 Our Story
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
//     )
//   }

//   const currentSlider = sliders[currentIndex]

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       {/* Background Image with Parallax Effect */}
//       <AnimatePresence mode="wait">
//         <motion.div 
//           key={currentSlider.id}
//           initial={{ opacity: 0, scale: 1.05 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 1.05 }}
//           transition={{ duration: 0.8 }}
//           className="absolute inset-0 z-0"
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-ivory/80 via-ivory/50 to-transparent z-10"></div>
//           <img 
//             src={getImageUrl(currentSlider.image)}
//             alt={currentSlider.description || "NIRA BODY Ritual Background"}
//             className="w-full h-full object-cover object-center"
//           />
//         </motion.div>
//       </AnimatePresence>
      
//       {/* Content - Left aligned */}
//       <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
//         <motion.div 
//           key={currentSlider.id}
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="max-w-2xl"
//         >
//           {/* Subtitle */}
//           <span className="inline-block text-terracotta font-sans text-sm uppercase tracking-wider mb-4 bg-ivory/30 backdrop-blur-sm px-4 py-1 rounded-full">
//             Holistic Body Care
//           </span>
          
//           {/* Main Heading - Use description from API or fallback */}
//           <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-warm-brown leading-tight mb-6">
//             {currentSlider.description ? (
//               currentSlider.description
//             ) : (
//               <>
//                 Ancient Wisdom.
//                 <br />
//                 Modern Rituals.
//               </>
//             )}
//           </h1>
          
//           {/* Description - Static or from API */}
//           <p className="text-warm-brown text-base sm:text-lg max-w-lg mb-8 font-light leading-relaxed">
//             Conscious skincare that restores radiance, honors rituals, 
//             and respects your hormones.
//           </p>
          
//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 items-start">
//             <Link 
//               to="/shop" 
//               className="inline-block bg-terracotta text-ivory px-6 sm:px-8 py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide shadow-lg text-center"
//             >
//               Begin Your Ritual
//             </Link>
//             <Link 
//               to="/about" 
//               className="inline-block border-2 border-warm-brown text-warm-brown px-6 sm:px-8 py-3 rounded-full hover:bg-warm-brown hover:text-ivory transition-all duration-300 font-sans text-sm uppercase tracking-wide text-center"
//             >
//               Our Story
//             </Link>
//           </div>
          
//           {/* Trust Indicators */}
//           <div className="flex flex-wrap gap-4 sm:gap-6 mt-8">
//             <div className="flex items-center gap-2">
//               <i className="fas fa-check-circle text-terracotta text-sm sm:text-base"></i>
//               <span className="text-warm-brown text-xs sm:text-sm">100% Clean</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <i className="fas fa-check-circle text-terracotta text-sm sm:text-base"></i>
//               <span className="text-warm-brown text-xs sm:text-sm">Hormone Safe</span>
//             </div>
//             <div className="flex items-center gap-2">
//               <i className="fas fa-leaf text-terracotta text-sm sm:text-base"></i>
//               <span className="text-warm-brown text-xs sm:text-sm">Cruelty Free</span>
//             </div>
//           </div>
//         </motion.div>
//       </div>
      
//       {/* Dot Indicators - Show only if multiple sliders */}
//       {sliders.length > 1 && (
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
//           {sliders.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
//                 currentIndex === index 
//                   ? 'bg-terracotta w-8' 
//                   : 'bg-terracotta/40 hover:bg-terracotta/60'
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}
      
//       {/* Decorative Bottom Gradient */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent pointer-events-none z-10"></div>
//     </section>
//   )
// }

// export default HeroSection

/// components/HeroSection.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCache } from '../hooks/useCache'
import { getImageUrl } from '../Helper'
import HeroSkeleton from './skeletons/HeroSkeleton'

const HeroSection = () => {
  const { data: sliders, loading } = useCache('sliders', '/sliders/active')
  const [currentIndex, setCurrentIndex] = useState(0)

  // Ensure sliders is always an array
  const slidersArray = sliders || []

  useEffect(() => {
    if (slidersArray.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slidersArray.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [slidersArray.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  if (loading) {
    return <HeroSkeleton />
  }

  if (!slidersArray.length) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ivory">
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
          <div className="max-w-2xl">
            <span className="inline-block text-terracotta font-sans text-sm uppercase tracking-wider mb-4 bg-ivory/30 backdrop-blur-sm px-4 py-1 rounded-full">
              Holistic Body Care
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-warm-brown leading-tight mb-6">
              Ancient Wisdom.<br />Modern Rituals.
            </h1>
            <p className="text-warm-brown text-base sm:text-lg max-w-lg mb-8 font-light leading-relaxed">
              Conscious skincare that restores radiance, honors rituals, and respects your hormones.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link to="/shop" className="inline-block bg-terracotta text-ivory px-6 sm:px-8 py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide shadow-lg text-center">
                Begin Your Ritual
              </Link>
              <Link to="/about" className="inline-block border-2 border-warm-brown text-warm-brown px-6 sm:px-8 py-3 rounded-full hover:bg-warm-brown hover:text-ivory transition-all duration-300 font-sans text-sm uppercase tracking-wide text-center">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Make sure currentIndex is within bounds
  const safeIndex = currentIndex >= slidersArray.length ? 0 : currentIndex
  const currentSlider = slidersArray[safeIndex]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlider?.id || 'default'}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-ivory/80 via-ivory/50 to-transparent z-10"></div>
          <img 
            src={getImageUrl(currentSlider?.image)}
            alt={currentSlider?.description || "NIRA BODY Ritual Background"}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <motion.div 
          key={currentSlider?.id || 'default'}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl"
        >
          <span className="inline-block text-terracotta font-sans text-sm uppercase tracking-wider mb-4 bg-ivory/30 backdrop-blur-sm px-4 py-1 rounded-full">
            Holistic Body Care
          </span>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-warm-brown leading-tight mb-6">
            {currentSlider?.description ? (
              currentSlider.description
            ) : (
              <>
                Ancient Wisdom.<br />Modern Rituals.
              </>
            )}
          </h1>
          
          <p className="text-warm-brown text-base sm:text-lg max-w-lg mb-8 font-light leading-relaxed">
            Conscious skincare that restores radiance, honors rituals, and respects your hormones.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Link to="/shop" className="inline-block bg-terracotta text-ivory px-6 sm:px-8 py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide shadow-lg text-center">
              Begin Your Ritual
            </Link>
            <Link to="/about" className="inline-block border-2 border-warm-brown text-warm-brown px-6 sm:px-8 py-3 rounded-full hover:bg-warm-brown hover:text-ivory transition-all duration-300 font-sans text-sm uppercase tracking-wide text-center">
              Our Story
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-4 sm:gap-6 mt-8">
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-terracotta text-sm sm:text-base"></i>
              <span className="text-warm-brown text-xs sm:text-sm">100% Clean</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-check-circle text-terracotta text-sm sm:text-base"></i>
              <span className="text-warm-brown text-xs sm:text-sm">Hormone Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fas fa-leaf text-terracotta text-sm sm:text-base"></i>
              <span className="text-warm-brown text-xs sm:text-sm">Cruelty Free</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {slidersArray.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          {slidersArray.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                safeIndex === index 
                  ? 'bg-terracotta w-8' 
                  : 'bg-terracotta/40 hover:bg-terracotta/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory to-transparent pointer-events-none z-10"></div>
    </section>
  )
}

export default HeroSection