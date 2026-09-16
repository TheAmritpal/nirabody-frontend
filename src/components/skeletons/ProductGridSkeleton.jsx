// components/skeletons/ProductGridSkeleton.jsx
import React from 'react'
import ProductCardSkeleton from './ProductCardSkeleton'

const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )
}

export default ProductGridSkeleton