// components/skeletons/HeroSkeleton.jsx
import React from 'react'

const HeroSkeleton = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ivory">
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 w-full py-12">
        <div className="max-w-2xl space-y-6">
          {/* Badge Skeleton */}
          <div className="h-8 bg-gray-200 rounded-full w-40 animate-pulse"></div>
          
          {/* Heading Skeleton */}
          <div className="h-16 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-16 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          
          {/* Description Skeleton */}
          <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          
          {/* Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="h-12 bg-gray-200 rounded-full w-48 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-full w-48 animate-pulse"></div>
          </div>
          
          {/* Trust Indicators Skeleton */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSkeleton