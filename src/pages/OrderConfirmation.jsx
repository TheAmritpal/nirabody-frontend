// import React, { useEffect, useState } from 'react'
// import { Link, useParams, useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'

// const OrderConfirmation = () => {
//   const { orderId } = useParams()
//   const navigate = useNavigate()
//   const [order, setOrder] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     // Get order from localStorage
//     const orders = JSON.parse(localStorage.getItem('niraOrders') || '[]')
//     const foundOrder = orders.find(o => o.orderId === orderId)
    
//     if (foundOrder) {
//       setOrder(foundOrder)
//     }
//     setLoading(false)
//   }, [orderId])

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-ivory flex items-center justify-center">
//         <div className="text-center">
//           <i className="fas fa-spinner fa-spin text-3xl text-terracotta"></i>
//           <p className="text-warm-brown-light mt-2">Loading order details...</p>
//         </div>
//       </div>
//     )
//   }

//   if (!order) {
//     return (
//       <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
//         <div className="text-center">
//           <i className="fas fa-search text-6xl text-sand mb-4"></i>
//           <h1 className="font-serif text-3xl text-warm-brown mb-2">Order Not Found</h1>
//           <p className="text-warm-brown-light mb-6">We couldn't find the order you're looking for.</p>
//           <Link to="/shop" className="bg-terracotta text-ivory px-8 py-3 rounded-full hover:bg-warm-brown transition">
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-ivory py-12 px-4"
//     >
//       <div className="max-w-3xl mx-auto">
//         {/* Success Icon */}
//         <div className="text-center">
//           <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//             <i className="fas fa-check-circle text-green-600 text-4xl"></i>
//           </div>
          
//           <h1 className="font-serif text-3xl md:text-4xl text-warm-brown mb-2">
//             Thank You for Your Order! 🎉
//           </h1>
//           <p className="text-warm-brown-light mb-6">
//             Your ritual journey begins soon
//           </p>
//         </div>

//         {/* Order Details */}
//         <div className="bg-sand/20 rounded-2xl p-6 mb-6">
//           <div className="text-center">
//             <p className="text-warm-brown text-sm">Order Number</p>
//             <p className="font-mono text-terracotta text-xl font-semibold break-all">
//               {order.orderId}
//             </p>
//           </div>
//           <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-sand/50">
//             <div className="text-center">
//               <p className="text-warm-brown-light text-xs">Order Date</p>
//               <p className="text-warm-brown text-sm font-medium">
//                 {new Date(order.date).toLocaleDateString('en-IN')}
//               </p>
//             </div>
//             <div className="text-center">
//               <p className="text-warm-brown-light text-xs">Payment Method</p>
//               <p className="text-warm-brown text-sm font-medium capitalize">
//                 {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 
//                  order.paymentMethod === 'card' ? 'Credit/Debit Card' : 'UPI'}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="bg-ivory border border-sand/50 rounded-2xl p-6 mb-6">
//           <h2 className="font-serif text-xl text-warm-brown mb-4">Order Summary</h2>
          
//           {/* Items */}
//           <div className="space-y-3 max-h-64 overflow-y-auto">
//             {order.items.map((item, idx) => (
//               <div key={idx} className="flex gap-3 pb-3 border-b border-sand/50">
//                 <img 
//                   src={item.image} 
//                   alt={item.name} 
//                   className="w-16 h-16 object-cover rounded-lg"
//                 />
//                 <div className="flex-1">
//                   <p className="text-warm-brown font-medium">{item.name}</p>
//                   <p className="text-warm-brown-light text-sm">Quantity: {item.quantity}</p>
//                 </div>
//                 <p className="text-terracotta font-semibold">₹{item.price * item.quantity}</p>
//               </div>
//             ))}
//           </div>
          
//           {/* Price Breakdown */}
//           <div className="mt-4 pt-4 border-t border-sand/50 space-y-2">
//             <div className="flex justify-between text-warm-brown-light text-sm">
//               <span>Subtotal</span>
//               <span>₹{order.subtotal}</span>
//             </div>
//             <div className="flex justify-between text-warm-brown-light text-sm">
//               <span>Shipping</span>
//               <span>{order.shipping === 0 ? 'Free' : `₹${order.shipping}`}</span>
//             </div>
//             <div className="flex justify-between text-warm-brown-light text-sm">
//               <span>GST (5%)</span>
//               <span>₹{order.tax}</span>
//             </div>
//             <div className="flex justify-between text-warm-brown font-semibold pt-2 border-t border-sand/50">
//               <span>Total Paid</span>
//               <span className="text-terracotta text-xl">₹{order.total}</span>
//             </div>
//           </div>
//         </div>

//         {/* Shipping Address */}
//         <div className="bg-sand/20 rounded-2xl p-6 mb-8">
//           <h2 className="font-serif text-xl text-warm-brown mb-3">Shipping Address</h2>
//           <div className="space-y-1 text-warm-brown-light">
//             <p className="font-medium text-warm-brown">
//               {order.customer.firstName} {order.customer.lastName}
//             </p>
//             <p>{order.customer.address}</p>
//             {order.customer.apartment && <p>{order.customer.apartment}</p>}
//             <p>{order.customer.city}, {order.customer.state} - {order.customer.pincode}</p>
//             <p className="mt-2">📞 {order.customer.phone}</p>
//             <p>✉️ {order.customer.email}</p>
//           </div>
//         </div>

//         {/* What's Next */}
//         <div className="bg-terracotta/5 rounded-2xl p-6 mb-8 text-center">
//           <i className="fas fa-envelope text-terracotta text-2xl mb-2"></i>
//           <h3 className="font-serif text-lg text-warm-brown mb-2">What's Next?</h3>
//           <p className="text-warm-brown-light text-sm mb-3">
//             A confirmation email has been sent to <strong>{order.customer.email}</strong>
//           </p>
//           <p className="text-warm-brown-light text-sm">
//             You will receive tracking details once your order is shipped (1-3 business days).
//           </p>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center">
//           <Link 
//             to="/shop" 
//             className="bg-terracotta text-ivory px-8 py-3 rounded-full hover:bg-warm-brown transition text-center"
//           >
//             Continue Shopping
//           </Link>
//           <Link 
//             to="/ritual-guide" 
//             className="border border-terracotta text-terracotta px-8 py-3 rounded-full hover:bg-terracotta hover:text-ivory transition text-center"
//           >
//             Explore Rituals
//           </Link>
//         </div>

//         {/* Share Section */}
//         <div className="text-center mt-8 pt-8 border-t border-sand/50">
//           <p className="text-warm-brown-light text-sm mb-3">Share your ritual journey</p>
//           <div className="flex justify-center gap-4">
//             <a href="#" className="text-terracotta hover:text-warm-brown transition text-xl">
//               <i className="fab fa-instagram"></i>
//             </a>
//             <a href="#" className="text-terracotta hover:text-warm-brown transition text-xl">
//               <i className="fab fa-facebook"></i>
//             </a>
//             <a href="#" className="text-terracotta hover:text-warm-brown transition text-xl">
//               <i className="fab fa-twitter"></i>
//             </a>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default OrderConfirmation


// pages/OrderConfirmation.jsx
// pages/OrderConfirmation.jsx
import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

import { useAuth } from '../context/AuthContext'
import { getImageUrl } from '../Helper'
import { getOrderById } from '../utlis/orderApi'

const OrderConfirmation = () => {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/order-confirmation/${orderId}` } })
      return
    }

    const fetchOrder = async () => {
      try {
        const result = await getOrderById(orderId)
        if (result.status) {
          setOrder(result.data)
        } else {
          setError(true)
          if (result.redirect === '/login') {
            navigate('/login', { state: { from: `/order-confirmation/${orderId}` } })
          }
        }
      } catch (error) {
        console.error('Error fetching order:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [orderId, isAuthenticated, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-terracotta"></i>
          <p className="text-warm-brown-light mt-2">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="text-center">
          <i className="fas fa-search text-6xl text-sand mb-4"></i>
          <h1 className="font-serif text-3xl text-warm-brown mb-2">Order Not Found</h1>
          <p className="text-warm-brown-light mb-6">We couldn't find the order you're looking for.</p>
          <Link to="/shop" className="bg-terracotta text-ivory px-8 py-3 rounded-full hover:bg-warm-brown transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-ivory py-12 px-4"
    >
      <div className="max-w-3xl mx-auto">
        {/* Success Icon */}
        <div className="text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-check-circle text-green-600 text-4xl"></i>
          </div>
          
          <h1 className="font-serif text-3xl md:text-4xl text-warm-brown mb-2">
            Thank You for Your Order! 🎉
          </h1>
          <p className="text-warm-brown-light mb-6">
            Your ritual journey begins soon
          </p>
        </div>

        {/* Order Details */}
        <div className="bg-sand/20 rounded-2xl p-6 mb-6">
          <div className="text-center">
            <p className="text-warm-brown text-sm">Order Number</p>
            <p className="font-mono text-terracotta text-xl font-semibold break-all">
              {order.order_id}
            </p>
          </div>
          <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-sand/50">
            <div className="text-center">
              <p className="text-warm-brown-light text-xs">Order Date</p>
              <p className="text-warm-brown text-sm font-medium">
                {new Date(order.created_at).toLocaleDateString('en-IN')}
              </p>
            </div>
            <div className="text-center">
              <p className="text-warm-brown-light text-xs">Payment Method</p>
              <p className="text-warm-brown text-sm font-medium capitalize">
                {order.payment_method === 'cod' ? 'Cash on Delivery' : 
                 order.payment_method === 'card' ? 'Credit/Debit Card' : 'UPI'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-warm-brown-light text-xs">Status</p>
              <p className="text-warm-brown text-sm font-medium capitalize">
                {order.order_status}
              </p>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-ivory border border-sand/50 rounded-2xl p-6 mb-6">
          <h2 className="font-serif text-xl text-warm-brown mb-4">Order Summary</h2>
          
          {/* Items */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-3 pb-3 border-b border-sand/50">
                <img 
                  src={getImageUrl(item.product_image) || 'https://via.placeholder.com/64'} 
                  alt={item.product_name} 
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-warm-brown font-medium">{item.product_name}</p>
                  <p className="text-warm-brown-light text-sm">Quantity: {item.quantity}</p>
                </div>
                <p className="text-terracotta font-semibold">₹{item.total}</p>
              </div>
            ))}
          </div>
          
          {/* Price Breakdown */}
          <div className="mt-4 pt-4 border-t border-sand/50 space-y-2">
            <div className="flex justify-between text-warm-brown-light text-sm">
              <span>Subtotal</span>
              <span>₹{order.subtotal}</span>
            </div>
            <div className="flex justify-between text-warm-brown-light text-sm">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'Free' : `₹${order.shipping}`}</span>
            </div>
            <div className="flex justify-between text-warm-brown-light text-sm">
              <span>GST (5%)</span>
              <span>₹{order.tax}</span>
            </div>
            <div className="flex justify-between text-warm-brown font-semibold pt-2 border-t border-sand/50">
              <span>Total Paid</span>
              <span className="text-terracotta text-xl">₹{order.total}</span>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-sand/20 rounded-2xl p-6 mb-8">
          <h2 className="font-serif text-xl text-warm-brown mb-3">Shipping Address</h2>
          <div className="space-y-1 text-warm-brown-light">
            <p className="font-medium text-warm-brown">{order.name}</p>
            <p>{order.address}</p>
            <p>{order.city}, {order.state} - {order.pincode}</p>
            <p className="mt-2">📞 {order.phone}</p>
            <p>✉️ {order.email}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/shop" 
            className="bg-terracotta text-ivory px-8 py-3 rounded-full hover:bg-warm-brown transition text-center"
          >
            Continue Shopping
          </Link>
          <Link 
            to="/profile" 
            className="border border-terracotta text-terracotta px-8 py-3 rounded-full hover:bg-terracotta hover:text-ivory transition text-center"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default OrderConfirmation