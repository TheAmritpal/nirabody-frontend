// components/skeletons/FooterSkeleton.jsx
import React from 'react'

const FooterSkeleton = () => {
  return (
    <footer className="bg-warm-brown text-ivory pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Skeleton */}
          <div className="space-y-4">
            <div className="h-8 w-32 bg-gray-600/30 rounded animate-pulse"></div>
            <div className="h-4 w-full bg-gray-600/30 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-600/30 rounded animate-pulse"></div>
            <div className="space-y-2 mt-4">
              <div className="h-3 w-40 bg-gray-600/30 rounded animate-pulse"></div>
              <div className="h-3 w-32 bg-gray-600/30 rounded animate-pulse"></div>
              <div className="h-3 w-36 bg-gray-600/30 rounded animate-pulse"></div>
            </div>
          </div>
          
          {/* Quick Links Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-24 bg-gray-600/30 rounded animate-pulse"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 w-20 bg-gray-600/30 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
          
          {/* Support Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-24 bg-gray-600/30 rounded animate-pulse"></div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 w-24 bg-gray-600/30 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
          
          {/* Connect Skeleton */}
          <div className="space-y-4">
            <div className="h-6 w-24 bg-gray-600/30 rounded animate-pulse"></div>
            <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-6 h-6 bg-gray-600/30 rounded-full animate-pulse"></div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-ivory/10">
              <div className="h-4 w-48 bg-gray-600/30 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Copyright Skeleton */}
        <div className="border-t border-ivory/20 pt-8 text-center">
          <div className="h-4 w-96 mx-auto bg-gray-600/30 rounded animate-pulse"></div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSkeleton