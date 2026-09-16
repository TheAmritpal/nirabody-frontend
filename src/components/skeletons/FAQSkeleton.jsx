// components/skeletons/FAQSkeleton.jsx
import React from 'react'

const FAQSkeleton = () => {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-r from-warm-brown to-terracotta py-16 md:py-20">
        <div className="text-center px-4">
          <div className="h-12 bg-gray-300/30 rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-300/30 rounded w-96 mx-auto animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        {/* Search Bar Skeleton */}
        <div className="mb-12">
          <div className="h-14 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>

        {/* FAQ Categories Skeleton */}
        {[1, 2, 3, 4, 5].map((catIndex) => (
          <div key={catIndex} className="mb-12">
            {/* Category Header Skeleton */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>

            {/* FAQ Items Skeleton */}
            <div className="space-y-4">
              {[1, 2, 3, 4].map((qIndex) => (
                <div key={qIndex} className="bg-ivory border border-sand/50 rounded-xl p-5 animate-pulse">
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Still Have Questions Skeleton */}
        <div className="mt-12 text-center bg-sand/20 rounded-2xl p-8 md:p-10 border border-sand/50 animate-pulse">
          <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto mb-6"></div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="h-12 bg-gray-200 rounded-full w-32"></div>
            <div className="h-12 bg-gray-200 rounded-full w-32"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQSkeleton