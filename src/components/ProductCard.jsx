

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { useCart } from '../context/CartContext';
// import { getImageUrl } from '../Helper';


// const ProductCard = ({ product }) => {
//   const { addToCart } = useCart();
//   const [added, setAdded] = useState(false);

//   const handleAddToCart = (e) => {
//     e.preventDefault();
//     addToCart(product, 1);
//     setAdded(true);
//     setTimeout(() => setAdded(false), 2000);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       viewport={{ once: true }}
//       className="group relative bg-sand/30 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
//     >
//       {product.badge && (
//         <span className="absolute top-4 left-4 z-10 bg-terracotta text-ivory text-xs px-3 py-1 rounded-full">
//           {product.badge}
//         </span>
//       )}
      
//       <Link to={`/product/${product.id}`}>
//         <div className="relative overflow-hidden aspect-[3/4] cursor-pointer">
//           <img 
//             src={getImageUrl(product.image)} 
//             alt={product.name}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//             loading="lazy"
//           />
//         </div>
//       </Link>
      
//       <div className="p-6 text-center">
//         <Link to={`/product/${product.id}`}>
//           <h3 className="font-serif text-xl text-warm-brown mb-2 hover:text-terracotta transition-colors">
//             {product.name}
//           </h3>
//         </Link>
//         <p className="text-warm-brown-light text-sm mb-3 font-light line-clamp-2">{product.short_description || product.description}</p>
//         <p className="text-terracotta font-sans font-semibold mb-4">₹{product.price}</p>
        
//         <div className="flex gap-3 justify-center">
//           <button
//             onClick={handleAddToCart}
//             className={`inline-block px-4 py-2 rounded-full transition-all duration-300 text-sm ${
//               added 
//                 ? 'bg-green-500 text-white' 
//                 : 'bg-terracotta text-ivory hover:bg-warm-brown'
//             }`}
//           >
//             {added ? (
//               <><i className="fas fa-check mr-1"></i> Added!</>
//             ) : (
//               <><i className="fas fa-shopping-bag mr-1"></i> Add to Bag</>
//             )}
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductCard;


// components/ProductCard.jsx
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { getImageUrl } from '../Helper'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Make sure product has all required fields
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      // Add any other fields you need
    }
    
    addToCart(productToAdd, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative bg-sand/30 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-4 left-4 z-10 bg-terracotta text-ivory text-xs px-3 py-1 rounded-full">
          {product.badge}
        </span>
      )}
      
      {/* Image Container */}
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden aspect-[3/4] cursor-pointer">
          <img 
            src={getImageUrl(product.image)} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </Link>
      
      {/* Content */}
      <div className="p-6 text-center">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-xl text-warm-brown mb-2 hover:text-terracotta transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-warm-brown-light text-sm mb-3 font-light line-clamp-2">{product.short_description || product.description}</p>
        <p className="text-terracotta font-sans font-semibold mb-4">₹{product.price}</p>
        
        <button
          onClick={handleAddToCart}
          className={`inline-block px-4 py-2 rounded-full transition-all duration-300 text-sm ${
            added 
              ? 'bg-green-500 text-white' 
              : 'bg-terracotta text-ivory hover:bg-warm-brown'
          }`}
        >
          {added ? (
            <><i className="fas fa-check mr-1"></i> Added!</>
          ) : (
            <><i className="fas fa-shopping-bag mr-1"></i> Add to Bag</>
          )}
        </button>
      </div>
    </motion.div>
  )
}

export default ProductCard