
// import React, { createContext, useContext, useState, useEffect } from 'react'
// import axios from 'axios'
// import { apiUrl } from '../backend/pages/https'


// const AuthContext = createContext()

// export const useAuth = () => {
//   const context = useContext(AuthContext)
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider')
//   }
//   return context
// }

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [token, setToken] = useState(null)

//   // Setup axios interceptor
//   useEffect(() => {
//     const storedToken = localStorage.getItem('niraUserToken')
//     if (storedToken) {
//       setToken(storedToken)
//       axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
//     }
//   }, [])

//   // Check if user is logged in
//   useEffect(() => {
//     const storedUser = localStorage.getItem('niraUser')
//     const storedToken = localStorage.getItem('niraUserToken')
    
//     if (storedUser && storedToken) {
//       setUser(JSON.parse(storedUser))
//       setIsAuthenticated(true)
//       setToken(storedToken)
//       axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
//     }
//     setLoading(false)
//   }, [])

//   // Send OTP
//   const sendOtp = async (phone) => {
//     try {
//       const response = await axios.post(`${apiUrl}/user/auth/send-otp`, { phone })
//       return response.data
//     } catch (error) {
//       return error.response?.data || { status: false, message: 'Failed to send OTP' }
//     }
//   }

//   // Verify OTP and Login/Register
//   const verifyOtp = async (phone, otp, userData = {}) => {
//     try {
//       const response = await axios.post(`${apiUrl}/user/auth/verify-otp`, {
//         phone,
//         otp,
//         ...userData
//       })
      
//       if (response.data.status) {
//         const { user, token } = response.data.data
//         setUser(user)
//         setIsAuthenticated(true)
//         setToken(token)
//         localStorage.setItem('niraUser', JSON.stringify(user))
//         localStorage.setItem('niraUserToken', token)
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
//         return response.data
//       }
//       return response.data
//     } catch (error) {
//       return error.response?.data || { status: false, message: 'Verification failed' }
//     }
//   }

//   // Resend OTP
//   const resendOtp = async (phone) => {
//     try {
//       const response = await axios.post(`${apiUrl}/user/auth/resend-otp`, { phone })
//       return response.data
//     } catch (error) {
//       return error.response?.data || { status: false, message: 'Failed to resend OTP' }
//     }
//   }

//   // Logout
//   const logout = async () => {
//     try {
//       await axios.post(`${apiUrl}/user/auth/logout`)
//     } catch (error) {
//       console.error('Logout error:', error)
//     }
    
//     setUser(null)
//     setIsAuthenticated(false)
//     setToken(null)
//     localStorage.removeItem('niraUser')
//     localStorage.removeItem('niraUserToken')
//     delete axios.defaults.headers.common['Authorization']
//   }

//   // Update profile
//   const updateProfile = async (userData) => {
//     try {
//       const response = await axios.put(`${apiUrl}/user/auth/profile`, userData)
//       if (response.data.status) {
//         setUser(response.data.data)
//         localStorage.setItem('niraUser', JSON.stringify(response.data.data))
//         return response.data
//       }
//       return response.data
//     } catch (error) {
//       return error.response?.data || { status: false, message: 'Update failed' }
//     }
//   }

//   // Get current user
//   const getCurrentUser = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/user/auth/me`)
//       if (response.data.status) {
//         setUser(response.data.data)
//         localStorage.setItem('niraUser', JSON.stringify(response.data.data))
//         return response.data
//       }
//       return response.data
//     } catch (error) {
//       return error.response?.data || { status: false, message: 'Failed to get user' }
//     }
//   }

//   return (
//     <AuthContext.Provider value={{
//       user,
//       isAuthenticated,
//       loading,
//       token,
//       sendOtp,
//       verifyOtp,
//       resendOtp,
//       logout,
//       updateProfile,
//       getCurrentUser
//     }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }


// context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { apiUrl } from '../backend/pages/https'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(null)

  // Setup axios interceptor for all requests
  useEffect(() => {
    const storedToken = localStorage.getItem('niraUserToken')
    if (storedToken) {
      setToken(storedToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
    }
  }, [])

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('niraUser')
    const storedToken = localStorage.getItem('niraUserToken')
    
    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser))
        setIsAuthenticated(true)
        setToken(storedToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
      } catch (error) {
        console.error('Error parsing user:', error)
        localStorage.removeItem('niraUser')
        localStorage.removeItem('niraUserToken')
      }
    }
    setLoading(false)
  }, [])

  // Send OTP for login
  const sendOtp = async (phone) => {
    try {
      const response = await axios.post(`${apiUrl}/user/auth/send-otp`, { phone })
      return response.data
    } catch (error) {
      return error.response?.data || { status: false, message: 'Failed to send OTP' }
    }
  }

  // Login with OTP
  const loginWithOtp = async (phone, otp) => {
    try {
      const response = await axios.post(`${apiUrl}/user/auth/verify-otp`, {
        phone,
        otp
      })
      
      if (response.data.status) {
        const { user, token } = response.data.data
        
        // Store user and token
        setUser(user)
        setIsAuthenticated(true)
        setToken(token)
        localStorage.setItem('niraUser', JSON.stringify(user))
        localStorage.setItem('niraUserToken', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        return response.data
      }
      return response.data
    } catch (error) {
      console.error('Login error:', error)
      return error.response?.data || { status: false, message: 'Login failed' }
    }
  }

  // Register new user (NO OTP)
  const register = async (userData) => {
    try {
      const response = await axios.post(`${apiUrl}/user/auth/register`, userData)
      return response.data
    } catch (error) {
      return error.response?.data || { status: false, message: 'Registration failed' }
    }
  }

  // Resend OTP
  const resendOtp = async (phone) => {
    try {
      const response = await axios.post(`${apiUrl}/user/auth/resend-otp`, { phone })
      return response.data
    } catch (error) {
      return error.response?.data || { status: false, message: 'Failed to resend OTP' }
    }
  }

  // Logout
  const logout = async () => {
    try {
      await axios.post(`${apiUrl}/user/auth/logout`)
    } catch (error) {
      console.error('Logout error:', error)
    }
    
    setUser(null)
    setIsAuthenticated(false)
    setToken(null)
    localStorage.removeItem('niraUser')
    localStorage.removeItem('niraUserToken')
    delete axios.defaults.headers.common['Authorization']
  }

  // Update profile
  const updateProfile = async (userData) => {
    try {
      const response = await axios.put(`${apiUrl}/user/auth/profile`, userData)
      if (response.data.status) {
        setUser(response.data.data)
        localStorage.setItem('niraUser', JSON.stringify(response.data.data))
        return response.data
      }
      return response.data
    } catch (error) {
      return error.response?.data || { status: false, message: 'Update failed' }
    }
  }

  // Get current user
  const getCurrentUser = async () => {
    try {
      const response = await axios.get(`${apiUrl}/user/auth/me`)
      if (response.data.status) {
        setUser(response.data.data)
        localStorage.setItem('niraUser', JSON.stringify(response.data.data))
        return response.data
      }
      return response.data
    } catch (error) {
      return error.response?.data || { status: false, message: 'Failed to get user' }
    }
  }

  // Check if token is valid
  const isTokenValid = async () => {
    try {
      const storedToken = localStorage.getItem('niraUserToken')
      if (!storedToken) return false
      
      const response = await axios.get(`${apiUrl}/user/auth/me`)
      return response.data.status === true
    } catch (error) {
      return false
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      token,
      sendOtp,
      loginWithOtp,
      register,
      resendOtp,
      logout,
      updateProfile,
      getCurrentUser,
      isTokenValid
    }}>
      {children}
    </AuthContext.Provider>
  )
}