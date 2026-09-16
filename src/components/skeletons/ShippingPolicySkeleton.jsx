// components/skeletons/ShippingPolicySkeleton.jsx
import React from 'react'

const ShippingPolicySkeleton = () => {
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
          <section className="bg-sand/20 p-6 md:p-8 rounded-lg text-center">
            <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mt-2 animate-pulse"></div>
          </section>

          {/* Order Processing Skeleton */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"></div>
              <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
            <div className="ml-14">
              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          </section>

          {/* Shipping Timeline Skeleton */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center"></div>
              <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
            <div className="ml-14">
              <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-32 mb-3 animate-pulse"></div>
              <div className="bg-sand/20 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded-full mt-0.5"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Info Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center p-4 border border-sand rounded-lg">
                <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-20 mx-auto animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShippingPolicySkeleton