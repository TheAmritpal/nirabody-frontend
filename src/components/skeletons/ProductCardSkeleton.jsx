// components/skeletons/ProductCardSkeleton.jsx
import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <div className="bg-sand/30 rounded-lg overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="aspect-[3/4] bg-gray-200"></div>
      
      {/* Content Skeleton */}
      <div className="p-6 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto"></div>
        <div className="h-10 bg-gray-200 rounded-full w-2/3 mx-auto"></div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton