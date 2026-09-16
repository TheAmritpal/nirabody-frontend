// components/skeletons/ReturnsPolicySkeleton.jsx
import React from 'react'

const ReturnsPolicySkeleton = () => {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-r from-warm-brown to-terracotta py-16 md:py-20">
        <div className="text-center px-4">
          <div className="h-12 bg-gray-300/30 rounded w-64 mx-auto mb-4 animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 md:py-20">
        {/* Introduction Skeleton */}
        <div className="bg-sand/20 rounded-2xl p-6 md:p-8 mb-8 border border-sand/50 text-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mt-2 animate-pulse"></div>
        </div>

        {/* Tabs Skeleton */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-sand/50">
          {[1, 2, 3].map((i) => (
            <div key={i} className="px-6 py-3">
              <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Returns Content Skeleton */}
        <div className="space-y-8">
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
            <div className="space-y-2 ml-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-gray-200 rounded-full mt-0.5"></div>
                  <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
                </div>
              ))}
            </div>
          </section>

          {/* How to Request Skeleton */}
          <section className="bg-sand/20 rounded-2xl p-6 md:p-8 border border-sand/50">
            <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex-1 bg-ivory border border-sand rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 rounded w-32 mt-1"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default ReturnsPolicySkeleton