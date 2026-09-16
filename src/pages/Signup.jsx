// pages/Signup.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { apiUrl } from '../backend/pages/https'

const Signup = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    pincode: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  // Check if user already exists
  const checkUserExists = async (phone, email) => {
    try {
      const response = await axios.post(`${apiUrl}/user/auth/check-user-exists`, {
        phone,
        email
      })
      return response.data
    } catch (error) {
      return { status: false, exists: false, message: 'Error checking user' }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      setError('Name is required')
      return
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      return
    }
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email')
      return
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      setError('Please enter a valid 10-digit phone number')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')
    
    // Check if user already exists
    const checkResult = await checkUserExists(formData.phone, formData.email)
    
    if (checkResult.exists) {
      if (checkResult.field === 'phone') {
        setError('This phone number is already registered. Please login instead.')
      } else if (checkResult.field === 'email') {
        setError('This email is already registered. Please login instead.')
      } else {
        setError('User already exists. Please login.')
      }
      setLoading(false)
      return
    }

    // If user doesn't exist, proceed with registration
    const result = await register(formData)
    
    if (result.status) {
      setSuccess('Account created successfully! Please login to continue.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        pincode: ''
      })
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } else {
      setError(result.message || 'Registration failed')
    }
    setLoading(false)
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-ivory py-20 px-4"
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-user-plus text-terracotta text-3xl"></i>
          </div>
          <h1 className="font-serif text-3xl text-warm-brown mb-2">
            Create Account
          </h1>
          <p className="text-warm-brown-light">
            Join the NIRA BODY community
          </p>
        </div>

        <div className="bg-ivory border border-sand/50 rounded-2xl p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-warm-brown text-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block text-warm-brown text-sm font-medium mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-warm-brown text-sm font-medium mb-2">
                Phone Number *
              </label>
              <div className="flex items-center border border-sand rounded-lg focus-within:border-terracotta transition-colors bg-ivory">
                <span className="px-3 text-warm-brown-light font-medium">+91</span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  placeholder="9876543210"
                  className="w-full px-3 py-3 bg-transparent focus:outline-none text-warm-brown"
                  maxLength="10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-warm-brown text-sm font-medium mb-2">
                Address (Optional)
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Your address"
                className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors"
              />
            </div>

            <div>
              <label className="block text-warm-brown text-sm font-medium mb-2">
                Pincode (Optional)
              </label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
                placeholder="6-digit pincode"
                maxLength="6"
                className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors"
              />
            </div>

            {error && (
              <div className={`px-4 py-3 rounded-lg text-sm flex items-start gap-2 ${
                error.includes('already registered') 
                  ? 'bg-yellow-50 border border-yellow-200 text-yellow-700'
                  : 'bg-red-50 border border-red-200 text-red-600'
              }`}>
                <i className={`fas ${
                  error.includes('already registered') 
                    ? 'fa-exclamation-triangle text-yellow-500' 
                    : 'fa-exclamation-circle text-red-500'
                } mt-0.5`}></i>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                <i className="fas fa-check-circle mr-2"></i>
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-terracotta text-ivory py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide disabled:opacity-50"
            >
              {loading ? (
                <><i className="fas fa-spinner fa-spin mr-2"></i> Checking...</>
              ) : (
                'Create Account'
              )}
            </button>

            <div className="text-center">
              <p className="text-warm-brown-light text-sm">
                Already have an account?{' '}
                <Link to="/login" className="text-terracotta hover:underline font-medium">
                  Login
                </Link>
              </p>
            </div>
          </form>

          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-warm-brown-light text-xs">
              By creating an account, you agree to our 
              <Link to="/privacy-policy" className="text-terracotta hover:underline mx-1">Privacy Policy</Link>
              and
              <Link to="/terms" className="text-terracotta hover:underline ml-1">Terms of Service</Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Signup