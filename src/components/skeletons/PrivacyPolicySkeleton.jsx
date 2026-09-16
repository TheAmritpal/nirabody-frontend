// components/skeletons/PrivacyPolicySkeleton.jsx
import React from 'react'

const PrivacyPolicySkeleton = () => {
  return (
    <div className="min-h-screen bg-ivory py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="w-20 h-0.5 bg-gray-200 mx-auto"></div>
        </div>

        <div className="space-y-8">
          {/* Introduction Skeleton */}
          <section className="bg-sand/20 p-6 md:p-8 rounded-lg">
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
          </section>

          {/* Information We Collect Skeleton */}
          <section>
            <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
            <div className="space-y-2 ml-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-200 rounded-full mt-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
              ))}
            </div>
          </section>

          {/* How We Use Information Skeleton */}
          <section>
            <div className="h-8 bg-gray-200 rounded w-56 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-3 animate-pulse"></div>
            <div className="space-y-2 ml-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-gray-200 rounded-sm mt-0.5"></div>
                  <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                </div>
              ))}
            </div>
          </section>

          {/* Sharing Information Skeleton */}
          <section className="bg-sand/20 p-6 md:p-8 rounded-lg">
            <div className="h-8 bg-gray-200 rounded w-48 mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mt-3 animate-pulse"></div>
          </section>

          {/* Contact Us Skeleton */}
          <section className="border-t-2 border-sand/50 pt-8">
            <div className="h-8 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
            <div className="bg-ivory border border-sand rounded-lg p-6 inline-block w-full md:w-auto">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-36 animate-pulse"></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicySkeleton