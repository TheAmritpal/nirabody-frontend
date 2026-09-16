// components/skeletons/UserProfileSkeleton.jsx
import React from 'react'

const UserProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-ivory py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
        </div>

        {/* Tabs Skeleton */}
        <div className="flex border-b border-sand/50 mb-8">
          <div className="px-6 py-3">
            <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
          <div className="px-6 py-3">
            <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </div>

        {/* Profile Content Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info Skeleton */}
          <div className="bg-ivory border border-sand/50 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 bg-gray-200 rounded w-40 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <div className="h-3 bg-gray-200 rounded w-20 mb-1 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Account Stats Skeleton */}
          <div className="bg-ivory border border-sand/50 rounded-2xl p-6">
            <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
            <div className="space-y-4">
              <div className="bg-sand/10 rounded-lg p-4 text-center">
                <div className="h-8 bg-gray-200 rounded w-12 mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
              </div>
              <div className="bg-sand/10 rounded-lg p-4 text-center">
                <div className="h-8 bg-gray-200 rounded w-12 mx-auto mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
              </div>
              <div className="h-12 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfileSkeleton