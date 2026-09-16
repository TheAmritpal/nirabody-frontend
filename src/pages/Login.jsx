
// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Link, useNavigate, useLocation } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'

// const Login = () => {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const { sendOtp, verifyOtp, resendOtp } = useAuth()
  
//   const [step, setStep] = useState('phone')
//   const [phone, setPhone] = useState('')
//   const [otp, setOtp] = useState('')
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: '',
//     pincode: ''
//   })
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [countdown, setCountdown] = useState(0)

//   const from = location.state?.from?.pathname || '/'

//   const handleSendOtp = async (e) => {
//     e.preventDefault()
//     if (phone.length < 10) {
//       setError('Please enter a valid phone number')
//       return
//     }

//     setLoading(true)
//     setError('')
    
//     const result = await sendOtp(phone)
//     if (result.status) {
//       setStep('otp')
//       setCountdown(60)
//       const interval = setInterval(() => {
//         setCountdown(prev => {
//           if (prev <= 1) {
//             clearInterval(interval)
//             return 0
//           }
//           return prev - 1
//         })
//       }, 1000)
//     } else {
//       setError(result.message || 'Failed to send OTP')
//     }
//     setLoading(false)
//   }

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault()
//     if (otp.length < 4) {
//       setError('Please enter the OTP')
//       return
//     }

//     setLoading(true)
//     setError('')
    
//     const result = await verifyOtp(phone, otp)
//     if (result.status) {
//       navigate(from, { replace: true })
//     } else if (result.require_registration) {
//       setStep('register')
//       setError('')
//     } else {
//       setError(result.message || 'Invalid OTP')
//     }
//     setLoading(false)
//   }

//   const handleRegister = async (e) => {
//     e.preventDefault()
//     if (!formData.name.trim()) {
//       setError('Name is required')
//       return
//     }
//     if (!formData.email.trim()) {
//       setError('Email is required')
//       return
//     }

//     setLoading(true)
//     setError('')
    
//     const result = await verifyOtp(phone, otp, formData)
//     if (result.status) {
//       navigate(from, { replace: true })
//     } else {
//       setError(result.message || 'Registration failed')
//     }
//     setLoading(false)
//   }

//   const handleResendOtp = async () => {
//     setLoading(true)
//     const result = await resendOtp(phone)
//     if (result.status) {
//       setCountdown(60)
//       const interval = setInterval(() => {
//         setCountdown(prev => {
//           if (prev <= 1) {
//             clearInterval(interval)
//             return 0
//           }
//           return prev - 1
//         })
//       }, 1000)
//       setError('')
//     } else {
//       setError(result.message || 'Failed to resend OTP')
//     }
//     setLoading(false)
//   }

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-ivory py-20 px-4"
//     >
//       <div className="max-w-md mx-auto">
//         <div className="text-center mb-8">
//           <div className="w-20 h-20 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
//             <i className="fas fa-spa text-terracotta text-3xl"></i>
//           </div>
//           <h1 className="font-serif text-3xl text-warm-brown mb-2">
//             {step === 'phone' && 'Welcome Back'}
//             {step === 'otp' && 'Verify OTP'}
//             {step === 'register' && 'Create Account'}
//           </h1>
//           <p className="text-warm-brown-light">
//             {step === 'phone' && 'Enter your phone number to continue'}
//             {step === 'otp' && `We sent a code to +91 ${phone}`}
//             {step === 'register' && 'Complete your profile'}
//           </p>
//         </div>

//         <div className="bg-ivory border border-sand/50 rounded-2xl p-6 shadow-lg">
//           {/* Phone Step */}
//           {step === 'phone' && (
//             <form onSubmit={handleSendOtp} className="space-y-4">
//               <div>
//                 <label className="block text-warm-brown text-sm font-medium mb-2">
//                   Phone Number *
//                 </label>
//                 <div className="flex items-center border border-sand rounded-lg focus-within:border-terracotta transition-colors bg-ivory">
//                   <span className="px-3 text-warm-brown-light font-medium">+91</span>
//                   <input
//                     type="tel"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
//                     placeholder="9876543210"
//                     className="w-full px-3 py-3 bg-transparent focus:outline-none text-warm-brown"
//                     maxLength="10"
//                     required
//                   />
//                 </div>
//               </div>

//               {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
//                   <i className="fas fa-exclamation-circle mr-2"></i>
//                   {error}
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-terracotta text-ivory py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide disabled:opacity-50"
//               >
//                 {loading ? (
//                   <><i className="fas fa-spinner fa-spin mr-2"></i> Sending...</>
//                 ) : (
//                   'Send OTP'
//                 )}
//               </button>
//             </form>
//           )}

//           {/* OTP Step */}
//           {step === 'otp' && (
//             <form onSubmit={handleVerifyOtp} className="space-y-4">
//               <div>
//                 <label className="block text-warm-brown text-sm font-medium mb-2">
//                   Enter OTP *
//                 </label>
//                 <div className="flex justify-center gap-3">
//                   {[0, 1, 2, 3].map((index) => (
//                     <input
//                       key={index}
//                       type="text"
//                       maxLength="1"
//                       value={otp[index] || ''}
//                       onChange={(e) => {
//                         const value = e.target.value.replace(/\D/g, '')
//                         const newOtp = otp.split('')
//                         newOtp[index] = value
//                         setOtp(newOtp.join(''))
//                         if (value && index < 3) {
//                           document.querySelectorAll('input')[index + 1]?.focus()
//                         }
//                       }}
//                       onKeyDown={(e) => {
//                         if (e.key === 'Backspace' && !otp[index] && index > 0) {
//                           document.querySelectorAll('input')[index - 1]?.focus()
//                         }
//                       }}
//                       className="w-14 h-14 text-center text-2xl font-semibold border border-sand rounded-lg focus:border-terracotta focus:outline-none bg-ivory text-warm-brown"
//                       autoFocus={index === 0}
//                     />
//                   ))}
//                 </div>
//               </div>

//               {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
//                   <i className="fas fa-exclamation-circle mr-2"></i>
//                   {error}
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={loading || otp.length < 4}
//                 className="w-full bg-terracotta text-ivory py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide disabled:opacity-50"
//               >
//                 {loading ? (
//                   <><i className="fas fa-spinner fa-spin mr-2"></i> Verifying...</>
//                 ) : (
//                   'Verify OTP'
//                 )}
//               </button>

//               <div className="text-center">
//                 {countdown > 0 ? (
//                   <p className="text-warm-brown-light text-sm">
//                     Resend in <span className="font-semibold text-terracotta">{countdown}s</span>
//                   </p>
//                 ) : (
//                   <button
//                     type="button"
//                     onClick={handleResendOtp}
//                     disabled={loading}
//                     className="text-terracotta text-sm hover:underline disabled:opacity-50"
//                   >
//                     Resend OTP
//                   </button>
//                 )}
//               </div>
//             </form>
//           )}

//           {/* Register Step */}
//           {step === 'register' && (
//             <form onSubmit={handleRegister} className="space-y-4">
//               <div>
//                 <label className="block text-warm-brown text-sm font-medium mb-2">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   placeholder="Enter your full name"
//                   className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-warm-brown text-sm font-medium mb-2">
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   placeholder="your@email.com"
//                   className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-warm-brown text-sm font-medium mb-2">
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.address}
//                   onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                   placeholder="Your address"
//                   className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors"
//                 />
//               </div>

//               <div>
//                 <label className="block text-warm-brown text-sm font-medium mb-2">
//                   Pincode
//                 </label>
//                 <input
//                   type="text"
//                   value={formData.pincode}
//                   onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })}
//                   placeholder="6-digit pincode"
//                   maxLength="6"
//                   className="w-full px-4 py-3 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory text-warm-brown transition-colors"
//                 />
//               </div>

//               {error && (
//                 <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
//                   <i className="fas fa-exclamation-circle mr-2"></i>
//                   {error}
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full bg-terracotta text-ivory py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide disabled:opacity-50"
//               >
//                 {loading ? (
//                   <><i className="fas fa-spinner fa-spin mr-2"></i> Creating...</>
//                 ) : (
//                   'Create Account'
//                 )}
//               </button>
//             </form>
//           )}

//           {/* Back to Login */}
//           {step !== 'phone' && (
//             <div className="mt-4 text-center">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setStep('phone')
//                   setError('')
//                   setOtp('')
//                 }}
//                 className="text-warm-brown-light text-sm hover:text-terracotta transition-colors"
//               >
//                 <i className="fas fa-arrow-left mr-1"></i> Go back
//               </button>
//             </div>
//           )}

//           {/* Terms */}
//           <div className="mt-6 text-center">
//             <p className="text-warm-brown-light text-xs">
//               By continuing, you agree to our 
//               <Link to="/privacy-policy" className="text-terracotta hover:underline mx-1">Privacy Policy</Link>
//               and
//               <Link to="/terms" className="text-terracotta hover:underline ml-1">Terms of Service</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default Login

// pages/Login.jsx
// pages/Login.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { apiUrl } from '../backend/pages/https'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { sendOtp, loginWithOtp, resendOtp } = useAuth()
  
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('phone')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const from = location.state?.from?.pathname || '/'

  // Check if user exists before sending OTP
  const checkUserExists = async (phone) => {
    try {
      const response = await axios.post(`${apiUrl}/user/auth/check-user`, { phone })
      return response.data
    } catch (error) {
      return { status: false, exists: false, message: 'Error checking user' }
    }
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    if (phone.length < 10) {
      setError('Please enter a valid phone number')
      return
    }

    setLoading(true)
    setError('')
    
    // First check if user exists
    const checkResult = await checkUserExists(phone)
    
    if (!checkResult.exists) {
      setError('User not found. Please sign up first.')
      setLoading(false)
      // Optionally redirect to signup after 2 seconds
      setTimeout(() => {
        navigate('/signup', { state: { phone } })
      }, 2000)
      return
    }

    // If user exists, send OTP
    const result = await sendOtp(phone)
    if (result.status) {
      setStep('otp')
      setCountdown(60)
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      setError(result.message || 'Failed to send OTP')
    }
    setLoading(false)
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    if (otp.length < 4) {
      setError('Please enter the OTP')
      return
    }

    setLoading(true)
    setError('')
    
    const result = await loginWithOtp(phone, otp)
    if (result.status) {
      navigate(from, { replace: true })
    } else {
      setError(result.message || 'Invalid OTP')
    }
    setLoading(false)
  }

  const handleResendOtp = async () => {
    setLoading(true)
    const result = await resendOtp(phone)
    if (result.status) {
      setCountdown(60)
      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      setError('')
    } else {
      setError(result.message || 'Failed to resend OTP')
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
            <i className="fas fa-spa text-terracotta text-3xl"></i>
          </div>
          <h1 className="font-serif text-3xl text-warm-brown mb-2">
            {step === 'phone' ? 'Welcome Back' : 'Verify OTP'}
          </h1>
          <p className="text-warm-brown-light">
            {step === 'phone' 
              ? 'Enter your phone number to login' 
              : `We sent a code to +91 ${phone}`}
          </p>
        </div>

        <div className="bg-ivory border border-sand/50 rounded-2xl p-6 shadow-lg">
          {/* Phone Step */}
          {step === 'phone' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-warm-brown text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <div className="flex items-center border border-sand rounded-lg focus-within:border-terracotta transition-colors bg-ivory">
                  <span className="px-3 text-warm-brown-light font-medium">+91</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full px-3 py-3 bg-transparent focus:outline-none text-warm-brown"
                    maxLength="10"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {error && (
                <div className={`px-4 py-3 rounded-lg text-sm flex items-start gap-2 ${
                  error.includes('User not found') 
                    ? 'bg-yellow-50 border border-yellow-200 text-yellow-700'
                    : 'bg-red-50 border border-red-200 text-red-600'
                }`}>
                  <i className={`fas ${
                    error.includes('User not found') 
                      ? 'fa-exclamation-triangle text-yellow-500' 
                      : 'fa-exclamation-circle text-red-500'
                  } mt-0.5`}></i>
                  <span>{error}</span>
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
                  'Send OTP'
                )}
              </button>

              <div className="text-center">
                <p className="text-warm-brown-light text-sm">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-terracotta hover:underline font-medium">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          )}

          {/* OTP Step */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-warm-brown text-sm font-medium mb-2">
                  Enter OTP *
                </label>
                <div className="flex justify-center gap-3">
                  {[0, 1, 2, 3].map((index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={otp[index] || ''}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '')
                        const newOtp = otp.split('')
                        newOtp[index] = value
                        setOtp(newOtp.join(''))
                        if (value && index < 3) {
                          document.querySelectorAll('input')[index + 1]?.focus()
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && !otp[index] && index > 0) {
                          document.querySelectorAll('input')[index - 1]?.focus()
                        }
                      }}
                      className="w-14 h-14 text-center text-2xl font-semibold border border-sand rounded-lg focus:border-terracotta focus:outline-none bg-ivory text-warm-brown"
                      autoFocus={index === 0}
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || otp.length < 4}
                className="w-full bg-terracotta text-ivory py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide disabled:opacity-50"
              >
                {loading ? (
                  <><i className="fas fa-spinner fa-spin mr-2"></i> Verifying...</>
                ) : (
                  'Login'
                )}
              </button>

              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-warm-brown-light text-sm">
                    Resend in <span className="font-semibold text-terracotta">{countdown}s</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-terracotta text-sm hover:underline disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep('phone')
                    setError('')
                    setOtp('')
                  }}
                  className="text-warm-brown-light text-sm hover:text-terracotta transition-colors"
                >
                  <i className="fas fa-arrow-left mr-1"></i> Go back
                </button>
              </div>
            </form>
          )}

          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-warm-brown-light text-xs">
              By continuing, you agree to our 
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

export default Login