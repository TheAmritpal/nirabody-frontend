import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { getImageUrl } from '../Helper'
import { createOrder } from '../utlis/orderApi'

const Checkout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { cartItems, cartTotal, clearCart } = useCart()
  const { isAuthenticated, user, token } = useAuth()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState(null)
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod',
    notes: '',
    saveInfo: false
  })
  
  const [errors, setErrors] = useState({})

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } })
    }
  }, [isAuthenticated, navigate])

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (user && isAuthenticated) {
      const nameParts = user.name?.split(' ') || ['', '']
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || ''
      }))
    }
  }, [user, isAuthenticated])

  // Calculate shipping (free over ₹4000)
  const shipping = cartTotal >= 4000 ? 0 : 50
  const tax = Math.round(cartTotal * 0.05)
  const grandTotal = cartTotal + shipping + tax

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be 10 digits'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.state.trim()) newErrors.state = 'State is required'
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required'
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add items before checkout.')
      navigate('/shop')
      return
    }
    
    // Double check authentication before placing order
    if (!isAuthenticated) {
      alert('Please login to place an order.')
      navigate('/login', { state: { from: '/checkout' } })
      return
    }
    
    setIsProcessing(true)

    // Prepare order data for API
    const orderData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      address: formData.address + (formData.apartment ? `, ${formData.apartment}` : ''),
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
      subtotal: cartTotal,
      shipping: shipping,
      tax: tax,
      total: grandTotal,
      payment_method: formData.paymentMethod,
      notes: formData.notes,
      items: cartItems.map(item => ({
        product_name: item.name,
        product_image: item.image || null,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity
      }))
    }

    try {
      const result = await createOrder(orderData)
      
      // Check if redirect is needed
      if (result.redirect === '/login') {
        alert(result.message || 'Please login again')
        // Clear invalid token
        localStorage.removeItem('niraUserToken')
        navigate('/login', { state: { from: '/checkout' } })
        setIsProcessing(false)
        return
      }
      
      if (result.status) {
        setOrderId(result.data.order_id)
        clearCart()
        setOrderPlaced(true)
        
        // Redirect to order confirmation after 2 seconds
        setTimeout(() => {
          navigate(`/order-confirmation/${result.data.order_id}`)
        }, 2000)
      } else {
        alert(result.message || 'Order failed. Please try again.')
      }
    } catch (error) {
      console.error('Order error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }
  
  // If not authenticated, show loading while redirecting
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-3xl text-terracotta mb-4"></i>
          <p className="text-warm-brown-light">Redirecting to login...</p>
        </div>
      </div>
    )
  }
  
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="text-center">
          <i className="fas fa-shopping-cart text-6xl text-sand mb-4"></i>
          <h1 className="font-serif text-3xl text-warm-brown mb-2">Your cart is empty</h1>
          <p className="text-warm-brown-light mb-6">Add some products to your cart before checking out.</p>
          <Link to="/shop" className="bg-terracotta text-ivory px-8 py-3 rounded-full hover:bg-warm-brown transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }
  
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-check text-green-600 text-3xl"></i>
          </div>
          <h1 className="font-serif text-3xl text-warm-brown mb-2">Order Placed Successfully!</h1>
          <p className="text-warm-brown-light mb-2">Order ID: <span className="font-mono text-terracotta">{orderId}</span></p>
          <p className="text-warm-brown-light mb-6">Thank you for your order. You will receive a confirmation email shortly.</p>
          <div className="animate-pulse">
            <p className="text-terracotta">Redirecting to order confirmation...</p>
          </div>
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
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl text-warm-brown mb-2">Checkout</h1>
          <p className="text-warm-brown-light">Complete your ritual journey</p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Checkout Form */}
          <div className="flex-1">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-ivory border border-sand/50 rounded-2xl p-6">
                <h2 className="font-serif text-xl text-warm-brown mb-4 flex items-center gap-2">
                  <i className="fas fa-user text-terracotta text-sm"></i>
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-warm-brown text-sm font-medium mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors ${errors.firstName ? 'border-red-500' : 'border-sand'}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-warm-brown text-sm font-medium mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors ${errors.lastName ? 'border-red-500' : 'border-sand'}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                  <div>
                    <label className="block text-warm-brown text-sm font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors ${errors.email ? 'border-red-500' : 'border-sand'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-warm-brown text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors ${errors.phone ? 'border-red-500' : 'border-sand'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>
              
              {/* Shipping Information */}
              <div className="bg-ivory border border-sand/50 rounded-2xl p-6">
                <h2 className="font-serif text-xl text-warm-brown mb-4 flex items-center gap-2">
                  <i className="fas fa-truck text-terracotta text-sm"></i>
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-warm-brown text-sm font-medium mb-2">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors ${errors.address ? 'border-red-500' : 'border-sand'}`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-warm-brown text-sm font-medium mb-2">Apartment, Suite, etc. (Optional)</label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                      placeholder="Apartment, building, floor"
                      className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-warm-brown text-sm font-medium mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors ${errors.city ? 'border-red-500' : 'border-sand'}`}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-warm-brown text-sm font-medium mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors ${errors.state ? 'border-red-500' : 'border-sand'}`}
                      />
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>
                    <div>
                      <label className="block text-warm-brown text-sm font-medium mb-2">Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="6-digit pincode"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors ${errors.pincode ? 'border-red-500' : 'border-sand'}`}
                      />
                      {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Payment Method */}
              <div className="bg-ivory border border-sand/50 rounded-2xl p-6">
                <h2 className="font-serif text-xl text-warm-brown mb-4 flex items-center gap-2">
                  <i className="fas fa-credit-card text-terracotta text-sm"></i>
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 border border-sand rounded-lg cursor-pointer hover:bg-sand/10 transition">
                    <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="text-terracotta" />
                    <div className="flex-1">
                      <p className="font-medium text-warm-brown">Cash on Delivery</p>
                      <p className="text-warm-brown-light text-sm">Pay when you receive your order</p>
                    </div>
                    <i className="fas fa-rupee-sign text-terracotta"></i>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-sand rounded-lg cursor-pointer hover:bg-sand/10 transition">
                    <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} className="text-terracotta" />
                    <div className="flex-1">
                      <p className="font-medium text-warm-brown">Credit / Debit Card</p>
                      <p className="text-warm-brown-light text-sm">Visa, Mastercard, RuPay</p>
                    </div>
                    <div className="flex gap-1">
                      <i className="fab fa-cc-visa text-gray-600"></i>
                      <i className="fab fa-cc-mastercard text-gray-600"></i>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-3 border border-sand rounded-lg cursor-pointer hover:bg-sand/10 transition">
                    <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleChange} className="text-terracotta" />
                    <div className="flex-1">
                      <p className="font-medium text-warm-brown">UPI / QR Code</p>
                      <p className="text-warm-brown-light text-sm">Google Pay, PhonePe, Paytm</p>
                    </div>
                    <i className="fas fa-qrcode text-terracotta"></i>
                  </label>
                </div>
              </div>
              
              {/* Order Notes */}
              <div className="bg-ivory border border-sand/50 rounded-2xl p-6">
                <h2 className="font-serif text-xl text-warm-brown mb-4 flex items-center gap-2">
                  <i className="fas fa-pen text-terracotta text-sm"></i>
                  Order Notes (Optional)
                </h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Special instructions for delivery, preferred delivery time, etc."
                  className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors resize-none"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-4 rounded-full font-sans text-sm uppercase tracking-wide transition-all duration-300 ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-terracotta hover:bg-warm-brown text-ivory'}`}
              >
                {isProcessing ? <><i className="fas fa-spinner fa-spin mr-2"></i> Processing...</> : <><i className="fas fa-lock mr-2"></i> Place Order • ₹{grandTotal}</>}
              </button>
              
              <p className="text-center text-warm-brown-light text-xs">
                By placing your order, you agree to our <Link to="/privacy-policy" className="text-terracotta hover:underline">Privacy Policy</Link>
              </p>
            </form>
          </div>
          
          {/* Right Side - Order Summary */}
          <div className="lg:w-96">
            <div className="bg-sand/20 rounded-2xl p-6 sticky top-24 border border-sand/50">
              <h2 className="font-serif text-xl text-warm-brown mb-4 flex items-center gap-2">
                <i className="fas fa-shopping-bag text-terracotta text-sm"></i>
                Order Summary ({cartCount} items)
              </h2>
              
              <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-3 border-b border-sand/50">
                    <img src={getImageUrl(item.image)} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <p className="text-warm-brown text-sm font-medium">{item.name}</p>
                      <p className="text-warm-brown-light text-xs">Qty: {item.quantity}</p>
                      <p className="text-terracotta text-sm font-semibold">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 pt-4 border-t border-sand/50">
                <div className="flex justify-between text-warm-brown-light text-sm">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-warm-brown-light text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between text-warm-brown-light text-sm">
                  <span>GST (5%)</span>
                  <span>₹{tax}</span>
                </div>
                {cartTotal >= 4000 && (
                  <div className="bg-green-50 text-green-700 text-xs p-2 rounded text-center">
                    <i className="fas fa-truck mr-1"></i> Free shipping applied!
                  </div>
                )}
                <div className="flex justify-between text-warm-brown font-semibold pt-2 border-t border-sand/50">
                  <span>Total</span>
                  <span className="text-terracotta text-xl">₹{grandTotal}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-sand/50">
                <div className="flex justify-center gap-4 text-warm-brown-light text-xs">
                  <div className="text-center"><i className="fas fa-shield-alt text-terracotta text-lg mb-1 block"></i><span>Secure Payment</span></div>
                  <div className="text-center"><i className="fas fa-truck text-terracotta text-lg mb-1 block"></i><span>Fast Shipping</span></div>
                  <div className="text-center"><i className="fas fa-undo-alt text-terracotta text-lg mb-1 block"></i><span>Easy Returns</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Checkout