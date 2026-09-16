// pages/ProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useCache } from '../hooks/useCache';
import { apiUrl } from '../backend/pages/https';
import { getImageUrl } from '../Helper';
import ProductCardSkeleton from '../components/skeletons/ProductCardSkeleton';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data: productsData, loading: productsLoading } = useCache('products', '/products');
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // First try to find product in cache
        if (productsData && productsData.length > 0) {
          const cachedProduct = productsData.find(p => p.id === parseInt(id));
          if (cachedProduct) {
            setProduct(cachedProduct);
            
            // Get related products from cache
            if (cachedProduct.category) {
              const related = productsData.filter(p => 
                p.category?.slug === cachedProduct.category.slug && 
                p.id !== cachedProduct.id
              ).slice(0, 4);
              setRelatedProducts(related);
            }
            setLoading(false);
            return;
          }
        }

        // If not in cache, fetch from API
        const res = await axios.get(`${apiUrl}/products/${id}`);
        if (res.data.status) {
          setProduct(res.data.data);
          
          // Fetch related products from same category
          if (res.data.data.category) {
            const relatedRes = await axios.get(`${apiUrl}/products?category=${res.data.data.category.slug}`);
            if (relatedRes.data.status) {
              setRelatedProducts(relatedRes.data.data.filter(p => p.id !== res.data.data.id).slice(0, 4));
            }
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, productsData]);

  if (loading || productsLoading) {
    return (
      <div className="min-h-screen bg-ivory py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Image Skeleton */}
            <div className="lg:w-1/2">
              <div className="bg-sand/20 rounded-2xl overflow-hidden aspect-square animate-pulse bg-gray-200"></div>
            </div>
            
            {/* Content Skeleton */}
            <div className="lg:w-1/2 space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="text-center">
          <i className="fas fa-search text-6xl text-sand mb-4"></i>
          <h1 className="font-serif text-3xl text-warm-brown mb-2">Product Not Found</h1>
          <p className="text-warm-brown-light mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <Link to="/shop" className="bg-terracotta text-ivory px-6 py-3 rounded-full hover:bg-warm-brown transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // Combine main image with additional images
  const allImages = [product.image, ...(product.images || [])];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const benefits = product.benefits || [
    'Conscious ingredients',
    'Hormone-safe formulation',
    'Cruelty-free',
    'Sustainable packaging'
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-ivory py-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-warm-brown-light hover:text-terracotta transition-colors mb-6"
        >
          <i className="fas fa-arrow-left"></i>
          <span>Back to Shop</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Side - Product Images */}
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Main Image */}
              <div className="bg-sand/20 rounded-2xl overflow-hidden">
                <img 
                  src={getImageUrl(allImages[selectedImage])} 
                  alt={product.name}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              {allImages.length > 1 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index ? 'border-terracotta' : 'border-transparent hover:border-sand'
                      }`}
                    >
                      <img 
                        src={getImageUrl(img)} 
                        alt={`View ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="lg:w-1/2">
            {product.badge && (
              <span className="inline-block bg-terracotta/10 text-terracotta text-xs px-3 py-1 rounded-full mb-4">
                {product.badge}
              </span>
            )}
            
            <h1 className="font-serif text-3xl md:text-4xl text-warm-brown mb-3">
              {product.name}
            </h1>
            
            <p className="text-warm-brown-light leading-relaxed mb-4">
              {product.description}
            </p>
            
            <div className="mb-6">
              <span className="font-serif text-3xl text-terracotta font-semibold">
                ₹{product.price}
              </span>
              {product.original_price && (
                <span className="text-warm-brown-light line-through ml-3">
                  ₹{product.original_price}
                </span>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-warm-brown text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange('decrease')}
                  className="w-10 h-10 rounded-full border border-sand text-warm-brown hover:border-terracotta hover:text-terracotta transition-colors"
                >
                  <i className="fas fa-minus"></i>
                </button>
                <span className="text-warm-brown font-serif text-xl w-12 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange('increase')}
                  className="w-10 h-10 rounded-full border border-sand text-warm-brown hover:border-terracotta hover:text-terracotta transition-colors"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-full transition-all duration-300 font-sans text-sm uppercase tracking-wide mb-6 ${
                added 
                  ? 'bg-green-500 text-white' 
                  : 'bg-terracotta text-ivory hover:bg-warm-brown'
              }`}
            >
              {added ? (
                <><i className="fas fa-check mr-2"></i> Added to Bag!</>
              ) : (
                <><i className="fas fa-shopping-bag mr-2"></i> Add to Bag - ₹{product.price * quantity}</>
              )}
            </button>

            <div className="border-t border-sand/50 pt-6 mb-6">
              <h3 className="font-serif text-xl text-warm-brown mb-3">Benefits</h3>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-warm-brown-light">
                    <i className="fas fa-check-circle text-terracotta text-sm mt-0.5"></i>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-sand/50 pt-6">
              <h3 className="font-serif text-xl text-warm-brown mb-3">Product Details</h3>
              <ul className="space-y-2 text-warm-brown-light text-sm">
                <li><span className="font-medium">Category:</span> {product.category?.name || 'Body Care'}</li>
                <li><span className="font-medium">Skin Type:</span> All skin types</li>
                <li><span className="font-medium">Cruelty-Free:</span> Yes</li>
                <li><span className="font-medium">Hormone-Safe:</span> Yes</li>
                {product.stock !== undefined && (
                  <li><span className="font-medium">Stock:</span> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</li>
                )}
              </ul>
            </div>

            <div className="bg-sand/20 rounded-lg p-4 mt-6">
              <div className="flex items-center gap-3 mb-2">
                <i className="fas fa-truck text-terracotta"></i>
                <span className="text-warm-brown text-sm font-medium">Free Shipping on orders over ₹4000</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-exchange-alt text-terracotta"></i>
                <span className="text-warm-brown text-sm font-medium">Easy Returns within 48 hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-8 border-t border-sand/50">
            <h2 className="font-serif text-2xl text-warm-brown text-center mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="group">
                  <div className="bg-sand/20 rounded-lg overflow-hidden">
                    <img src={getImageUrl(relatedProduct.image)} alt={relatedProduct.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="p-3 text-center">
                      <h3 className="font-serif text-warm-brown">{relatedProduct.name}</h3>
                      <p className="text-terracotta font-semibold">₹{relatedProduct.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductPage;