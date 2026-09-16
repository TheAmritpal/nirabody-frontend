// pages/ShopAll.jsx
import React from 'react';
import { useCache } from '../hooks/useCache';
import ProductGrid from '../components/ProductGrid';
import ProductGridSkeleton from '../components/skeletons/ProductGridSkeleton';

const ShopAll = () => {
  const { data: productsData, loading } = useCache('products', '/products');
  const products = productsData || [];

  if (loading) {
    return (
      <div className="min-h-screen pt-8 bg-ivory">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <ProductGridSkeleton count={8} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8">
      <ProductGrid 
        products={products} 
        title="All Rituals"
        subtitle="Discover our complete collection of conscious skincare tools and formulations"
      />
    </div>
  );
};

export default ShopAll;