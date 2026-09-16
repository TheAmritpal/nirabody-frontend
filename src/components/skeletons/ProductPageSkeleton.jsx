// components/skeletons/ProductPageSkeleton.jsx
import React from 'react'

const ProductPageSkeleton = () => {
  return (
    <div className="min-h-screen bg-ivory py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image Skeleton */}
          <div className="lg:w-1/2">
            <div className="bg-sand/20 rounded-2xl overflow-hidden aspect-square animate-pulse bg-gray-200"></div>
            <div className="flex gap-3 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
          
          {/* Content Skeleton */}
          <div className="lg:w-1/2 space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-12 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPageSkeleton