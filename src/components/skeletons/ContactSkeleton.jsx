// components/skeletons/ContactSkeleton.jsx
import React from 'react'

const ContactSkeleton = () => {
  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-r from-warm-brown to-terracotta py-16 md:py-20">
        <div className="text-center px-4">
          <div className="h-12 bg-gray-300/30 rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-gray-300/30 rounded w-96 mx-auto animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        {/* Contact Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-sand/20 rounded-2xl p-6 border border-sand/50 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
              <div className="space-y-3">
                {[1, 2].map((j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Info Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-terracotta/5 rounded-2xl p-6 border border-sand/50 text-center animate-pulse">
              <div className="w-14 h-14 bg-gray-200 rounded-full mx-auto mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-24 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Form Skeleton */}
        <div className="bg-ivory rounded-2xl p-6 md:p-8 border border-sand/50 shadow-lg animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-12 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-12 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-12 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="space-y-2 mt-4">
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded-full mt-4"></div>
        </div>
      </div>
    </div>
  )
}

export default ContactSkeleton