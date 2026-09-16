// components/skeletons/TestimonialsSkeleton.jsx
import React from 'react'

const TestimonialsSkeleton = () => {
  return (
    <section className="py-20 px-4 bg-ivory">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto animate-pulse"></div>
        </div>
        
        {/* Testimonials Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-sand/20 p-6 rounded-lg">
              {/* Stars Skeleton */}
              <div className="flex justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
                ))}
              </div>
              
              {/* Text Skeleton */}
              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2 animate-pulse"></div>
              
              {/* Author Skeleton */}
              <div className="h-5 bg-gray-200 rounded w-1/3 mx-auto mt-4 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSkeleton