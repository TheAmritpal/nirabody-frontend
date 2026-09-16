// import React, { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import axios from 'axios'
// import { apiUrl } from '../backend/pages/https'

// const Testimonials = () => {
//   const [testimonials, setTestimonials] = useState([])
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true)
//   const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)
//   const [loading, setLoading] = useState(true)

//   // Responsive breakpoint
//   const isMobile = windowWidth < 768
//   const itemsToShow = isMobile ? 1 : 3
//   const totalSlides = testimonials.length

//   // Fetch testimonials from API
//   useEffect(() => {
//     const fetchTestimonials = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/testimonials/active`)
//         if (response.data.status) {
//           setTestimonials(response.data.data)
//         }
//       } catch (error) {
//         console.error('Error fetching testimonials:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchTestimonials()
//   }, [])

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth)
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   // Auto-slide functionality
//   useEffect(() => {
//     if (!isAutoPlaying || totalSlides === 0 || totalSlides <= 1) return
    
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
//     }, 5000)
    
//     return () => clearInterval(interval)
//   }, [isAutoPlaying, totalSlides])

//   // Get current visible testimonials
//   const getCurrentTestimonials = () => {
//     if (totalSlides === 0) return []
    
//     // If only 1 testimonial, return it
//     if (totalSlides === 1) {
//       return testimonials
//     }
    
//     // If we have fewer testimonials than items to show, return all
//     if (totalSlides <= itemsToShow) {
//       return testimonials
//     }
    
//     const testimonialsToShow = []
//     for (let i = 0; i < itemsToShow; i++) {
//       const index = (currentIndex + i) % totalSlides
//       testimonialsToShow.push(testimonials[index])
//     }
//     return testimonialsToShow
//   }

//   const goToSlide = (index) => {
//     setCurrentIndex(index)
//     setIsAutoPlaying(false)
//     setTimeout(() => setIsAutoPlaying(true), 10000)
//   }

//   const goToPrevious = () => {
//     setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
//     setIsAutoPlaying(false)
//     setTimeout(() => setIsAutoPlaying(true), 10000)
//   }

//   const goToNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % totalSlides)
//     setIsAutoPlaying(false)
//     setTimeout(() => setIsAutoPlaying(true), 10000)
//   }

//   if (loading) {
//     return (
//       <section className="py-20 px-4 bg-ivory">
//         <div className="max-w-6xl mx-auto text-center">
//           <div className="w-12 h-12 border-4 border-terracotta rounded-full border-t-transparent animate-spin mx-auto"></div>
//         </div>
//       </section>
//     )
//   }

//   if (testimonials.length === 0) {
//     return null
//   }

//   const currentTestimonials = getCurrentTestimonials()
//   const showNavigation = totalSlides > 1
//   const isSingleItem = totalSlides === 1

//   return (
//     <section className="py-20 px-4 bg-ivory">
//       <div className="max-w-6xl mx-auto">
//         {/* Section Header */}
//         <div className="text-center mb-12">
//           <h2 className="font-serif text-4xl md:text-5xl text-warm-brown mb-3">
//             Kind Words
//           </h2>
//           <p className="text-warm-brown-light font-light">
//             From our ritual community
//           </p>
//         </div>

//         {/* Carousel Container */}
//         <div className="relative">
//           {/* Navigation Buttons - Only show if more than 1 */}
//           {showNavigation && (
//             <>
//               <button
//                 onClick={goToPrevious}
//                 className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10 w-10 h-10 bg-ivory border border-sand rounded-full shadow-lg hover:bg-terracotta hover:text-ivory hover:border-terracotta transition-all duration-300 flex items-center justify-center"
//                 aria-label="Previous"
//               >
//                 <i className="fas fa-chevron-left text-sm"></i>
//               </button>
//               <button
//                 onClick={goToNext}
//                 className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10 w-10 h-10 bg-ivory border border-sand rounded-full shadow-lg hover:bg-terracotta hover:text-ivory hover:border-terracotta transition-all duration-300 flex items-center justify-center"
//                 aria-label="Next"
//               >
//                 <i className="fas fa-chevron-right text-sm"></i>
//               </button>
//             </>
//           )}

//           {/* Testimonials Grid */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentIndex}
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -50 }}
//               transition={{ duration: 0.5 }}
//               className={`grid grid-cols-1 ${!isMobile && !isSingleItem ? 'md:grid-cols-3' : ''} gap-8 ${
//                 isSingleItem ? 'flex justify-center' : ''
//               }`}
//             >
//               {currentTestimonials.map((testimonial, index) => (
//                 <motion.div
//                   key={`${testimonial.id}-${currentIndex}`}
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: index * 0.1, duration: 0.4 }}
//                   className={`bg-sand/20 p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300 ${
//                     isSingleItem ? 'max-w-md mx-auto' : ''
//                   }`}
//                 >
//                   {/* Rating Stars */}
//                   <div className="text-terracotta mb-4">
//                     {[...Array(testimonial.rating || 5)].map((_, i) => (
//                       <i key={i} className="fas fa-star text-sm md:text-base"></i>
//                     ))}
//                   </div>
                  
//                   {/* Testimonial Text */}
//                   <p className="text-warm-brown-light italic mb-4 text-sm md:text-base leading-relaxed">
//                     "{testimonial.text}"
//                   </p>
                  
//                   {/* Author Name */}
//                   <p className="text-warm-brown font-semibold">— {testimonial.name}</p>
                  
//                   {/* Location */}
//                   {testimonial.location && (
//                     <p className="text-warm-brown-light text-xs mt-1">{testimonial.location}</p>
//                   )}
//                 </motion.div>
//               ))}
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* Dots Indicator - Only show if more than 1 */}
//         {showNavigation && (
//           <div className="flex justify-center gap-2 mt-8 flex-wrap">
//             {Array.from({ length: totalSlides }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`transition-all duration-300 rounded-full ${
//                   currentIndex === index
//                     ? 'w-8 h-2 bg-terracotta'
//                     : 'w-2 h-2 bg-sand hover:bg-terracotta/50'
//                 }`}
//                 aria-label={`Go to testimonial ${index + 1}`}
//               />
//             ))}
//           </div>
//         )}

//         {/* Slide Info - Only show if more than 1 */}
//         {showNavigation && (
//           <div className="text-center mt-4">
//             <p className="text-warm-brown-light text-sm">
//               {currentIndex + 1} / {totalSlides}
//             </p>
//           </div>
//         )}

//         {/* Mobile Swipe Hint */}
//         {isMobile && showNavigation && (
//           <div className="text-center mt-2">
//             <p className="text-warm-brown-light text-xs">
//               <i className="fas fa-hand-peace mr-1"></i>
//               Tap dots to see more
//             </p>
//           </div>
//         )}

//         {/* Total Reviews Count */}
//         <div className="text-center mt-8">
//           <div className="flex items-center justify-center gap-2 text-warm-brown-light text-sm">
//             <i className="fas fa-smile-wink text-terracotta"></i>
//             <span>{testimonials.length}+ happy customers and growing</span>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Testimonials



// components/Testimonials.jsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCache } from '../hooks/useCache'
import TestimonialsSkeleton from './skeletons/TestimonialsSkeleton'

const Testimonials = () => {
  const { data: testimonialsData, loading } = useCache('testimonials', '/testimonials/active')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)

  // Ensure testimonials is always an array
  const testimonials = testimonialsData || []

  const isMobile = windowWidth < 768
  const itemsToShow = isMobile ? 1 : 3
  const totalSlides = testimonials.length

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || totalSlides === 0 || totalSlides <= 1) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, totalSlides])

  const getCurrentTestimonials = () => {
    if (totalSlides === 0) return []
    if (totalSlides === 1) return testimonials
    if (totalSlides <= itemsToShow) return testimonials
    
    const testimonialsToShow = []
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % totalSlides
      testimonialsToShow.push(testimonials[index])
    }
    return testimonialsToShow
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  if (loading) {
    return <TestimonialsSkeleton />
  }

  if (testimonials.length === 0) {
    return null
  }

  const currentTestimonials = getCurrentTestimonials()
  const showNavigation = totalSlides > 1
  const isSingleItem = totalSlides === 1

  return (
    <section className="py-20 px-4 bg-ivory">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-warm-brown mb-3">
            Kind Words
          </h2>
          <p className="text-warm-brown-light font-light">
            From our ritual community
          </p>
        </div>

        <div className="relative">
          {showNavigation && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-6 z-10 w-10 h-10 bg-ivory border border-sand rounded-full shadow-lg hover:bg-terracotta hover:text-ivory hover:border-terracotta transition-all duration-300 flex items-center justify-center"
                aria-label="Previous"
              >
                <i className="fas fa-chevron-left text-sm"></i>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-6 z-10 w-10 h-10 bg-ivory border border-sand rounded-full shadow-lg hover:bg-terracotta hover:text-ivory hover:border-terracotta transition-all duration-300 flex items-center justify-center"
                aria-label="Next"
              >
                <i className="fas fa-chevron-right text-sm"></i>
              </button>
            </>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className={`grid grid-cols-1 ${!isMobile && !isSingleItem ? 'md:grid-cols-3' : ''} gap-8 ${
                isSingleItem ? 'flex justify-center' : ''
              }`}
            >
              {currentTestimonials.map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${currentIndex}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className={`bg-sand/20 p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300 ${
                    isSingleItem ? 'max-w-md mx-auto' : ''
                  }`}
                >
                  <div className="text-terracotta mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <i key={i} className="fas fa-star text-sm md:text-base"></i>
                    ))}
                  </div>
                  
                  <p className="text-warm-brown-light italic mb-4 text-sm md:text-base leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  
                  <p className="text-warm-brown font-semibold">— {testimonial.name}</p>
                  
                  {testimonial.location && (
                    <p className="text-warm-brown-light text-xs mt-1">{testimonial.location}</p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {showNavigation && (
          <>
            <div className="flex justify-center gap-2 mt-8 flex-wrap">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === index
                      ? 'w-8 h-2 bg-terracotta'
                      : 'w-2 h-2 bg-sand hover:bg-terracotta/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <div className="text-center mt-4">
              <p className="text-warm-brown-light text-sm">
                {currentIndex + 1} / {totalSlides}
              </p>
            </div>
          </>
        )}

        {isMobile && showNavigation && (
          <div className="text-center mt-2">
            <p className="text-warm-brown-light text-xs">
              <i className="fas fa-hand-peace mr-1"></i>
              Tap dots to see more
            </p>
          </div>
        )}

        <div className="text-center mt-8">
          <div className="flex items-center justify-center gap-2 text-warm-brown-light text-sm">
            <i className="fas fa-smile-wink text-terracotta"></i>
            <span>{testimonials.length}+ happy customers and growing</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials