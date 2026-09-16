// // import React from 'react'
// // import { Link } from 'react-router-dom'
// // import ProductCard from './ProductCard'

// // const ProductGrid = ({ products, title = "Sacred Rituals", subtitle = "Each product is crafted with conscious ingredients that nourish without disrupting your body's natural balance" }) => {
// //   return (
// //     <section className="py-20 px-4 bg-ivory">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="text-center mb-12">
// //           <h2 className="font-serif text-4xl md:text-5xl text-warm-brown mb-3">{title}</h2>
// //           <p className="text-warm-brown-light font-light max-w-2xl mx-auto">
// //             {subtitle}
// //           </p>
// //         </div>
        
// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
// //           {products.map((product) => (
// //             <ProductCard key={product.id} product={product} />
// //           ))}
// //         </div>
        
// //         <div className="text-center mt-12">
// //           <Link 
// //             to="/shop" 
// //             className="inline-block border border-terracotta text-terracotta px-8 py-3 rounded-full hover:bg-terracotta hover:text-ivory transition-all duration-300 font-sans text-sm uppercase tracking-wide"
// //           >
// //             Explore All Rituals
// //           </Link>
// //         </div>
// //       </div>
// //     </section>
// //   )
// // }

// // export default ProductGrid

// import React from 'react';
// import { Link } from 'react-router-dom';
// import ProductCard from './ProductCard';

// const ProductGrid = ({ products, title = "Sacred Rituals", subtitle = "Each product is crafted with conscious ingredients that nourish without disrupting your body's natural balance" }) => {
//   const activeProducts = products.filter(p => p.is_active !== false);

//   return (
//     <section className="py-20 px-4 bg-ivory">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="font-serif text-4xl md:text-5xl text-warm-brown mb-3">{title}</h2>
//           <p className="text-warm-brown-light font-light max-w-2xl mx-auto">
//             {subtitle}
//           </p>
//         </div>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {activeProducts.slice(0, 8).map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
        
//         <div className="text-center mt-12">
//           <Link 
//             to="/shop" 
//             className="inline-block border border-terracotta text-terracotta px-8 py-3 rounded-full hover:bg-terracotta hover:text-ivory transition-all duration-300 font-sans text-sm uppercase tracking-wide"
//           >
//             Explore All Rituals
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductGrid;

// components/ProductGrid.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, title = "Sacred Rituals", subtitle = "Each product is crafted with conscious ingredients that nourish without disrupting your body's natural balance" }) => {
  const activeProducts = products.filter(p => p.is_active !== false);

  return (
    <section className="py-20 px-4 bg-ivory">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-warm-brown mb-3">{title}</h2>
          <p className="text-warm-brown-light font-light max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {activeProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/shop" 
            className="inline-block border border-terracotta text-terracotta px-8 py-3 rounded-full hover:bg-terracotta hover:text-ivory transition-all duration-300 font-sans text-sm uppercase tracking-wide"
          >
            Explore All Rituals
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;