// components/skeletons/BlogCardSkeleton.jsx
import React from 'react'

const BlogCardSkeleton = () => {
  return (
    <div className="bg-ivory rounded-xl overflow-hidden border border-sand/50 animate-pulse">
      <div className="h-56 bg-gray-200"></div>
      <div className="p-6 space-y-3">
        <div className="flex gap-2">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  )
}

export default BlogCardSkeleton