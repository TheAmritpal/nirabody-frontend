// import React, { useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
// import HeroSection from '../components/HeroSection'
// import ProductGrid from '../components/ProductGrid'
// import BrandStory from '../components/BrandStory'
// import Testimonials from '../components/Testimonials'
// import Newsletter from '../components/Newsletter'
// import RitualPreview from '../components/RitualPreview'
// import ConsciousSkincare from '../components/ConsciousSkincare'
// import axios from 'axios'
// import { apiUrl } from '../backend/pages/https'


// const HomePage = () => {

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(`${apiUrl}/products`);
//         if (res.data.status) {
//           setProducts(res.data.data);
//         }
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-ivory">
//         <div className="w-12 h-12 border-4 border-terracotta rounded-full border-t-transparent animate-spin"></div>
//       </div>
//     );
//   }
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <HeroSection />
//       <ProductGrid products={products} />
//       <BrandStory />
//       <ConsciousSkincare />
//       <RitualPreview />
//       <Testimonials />
//       <Newsletter />
//     </motion.div>
//   )
// }

// export default HomePage



// pages/HomePage.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { useCache } from '../hooks/useCache'
import HeroSection from '../components/HeroSection'
import ProductGrid from '../components/ProductGrid'
import BrandStory from '../components/BrandStory'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import RitualPreview from '../components/RitualPreview'
import ConsciousSkincare from '../components/ConsciousSkincare'
import ProductGridSkeleton from '../components/skeletons/ProductGridSkeleton'
import HeroSkeleton from '../components/skeletons/HeroSkeleton'

const HomePage = () => {
  const { data: products, loading: productsLoading } = useCache('products', '/products')
  const { data: sliders, loading: slidersLoading } = useCache('sliders', '/sliders/active')
  const { data: testimonials, loading: testimonialsLoading } = useCache('testimonials', '/testimonials/active')

  const loading = productsLoading || slidersLoading || testimonialsLoading

  if (loading) {
    return (
      <div>
        <HeroSkeleton />
        <section className="py-20 px-4 bg-ivory">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-10 bg-gray-200 rounded w-64 mx-auto mb-3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
            </div>
            <ProductGridSkeleton count={8} />
          </div>
        </section>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <ProductGrid products={products || []} />
      <BrandStory />
      <ConsciousSkincare />
      <RitualPreview />
      <Testimonials />
      <Newsletter />
    </motion.div>
  )
}

export default HomePage
  

