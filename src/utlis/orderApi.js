// // utils/orderApi.js
// import axios from 'axios'
// import { apiUrl } from '../backend/pages/https'


// export const createOrder = async (orderData) => {
//   try {
//     const response = await axios.post(`${apiUrl}/user/orders`, orderData)
//     return response.data
//   } catch (error) {
//     return error.response?.data || { status: false, message: 'Order failed' }
//   }
// }

// export const getMyOrders = async () => {
//   try {
//     const response = await axios.get(`${apiUrl}/user/orders/my-orders`)
//     return response.data
//   } catch (error) {
//     return error.response?.data || { status: false, data: [] }
//   }
// }

// export const getOrderById = async (orderId) => {
//   try {
//     const response = await axios.get(`${apiUrl}/user/orders/${orderId}`)
//     return response.data
//   } catch (error) {
//     return error.response?.data || { status: false, message: 'Order not found' }
//   }
// }


// utils/orderApi.js
import axios from 'axios'
import { apiUrl } from '../backend/pages/https'

// Get token from localStorage
const getToken = () => {
  const token = localStorage.getItem('niraUserToken')
  return token
}

// Create order
export const createOrder = async (orderData) => {
  try {
    const token = getToken()
    
    // If no token, user is not authenticated
    if (!token) {
      return { 
        status: false, 
        message: 'Please login to place an order',
        redirect: '/login'
      }
    }
    
    const response = await axios.post(
      `${apiUrl}/user/orders`, 
      orderData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Create order error:', error.response?.data || error.message)
    
    // Handle 401 error specifically
    if (error.response?.status === 401) {
      return { 
        status: false, 
        message: 'Session expired. Please login again.',
        redirect: '/login'
      }
    }
    
    return error.response?.data || { status: false, message: 'Order failed' }
  }
}

// Get all orders for current user
export const getMyOrders = async () => {
  try {
    const token = getToken()
    
    if (!token) {
      return { status: false, data: [], message: 'Please login' }
    }
    
    const response = await axios.get(
      `${apiUrl}/user/orders/my-orders`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Get orders error:', error.response?.data || error.message)
    
    if (error.response?.status === 401) {
      return { status: false, data: [], message: 'Session expired. Please login again.' }
    }
    
    return error.response?.data || { status: false, data: [] }
  }
}

// Get single order by ID
export const getOrderById = async (orderId) => {
  try {
    const token = getToken()
    
    if (!token) {
      return { status: false, message: 'Please login' }
    }
    
    const response = await axios.get(
      `${apiUrl}/user/orders/${orderId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Get order error:', error.response?.data || error.message)
    
    if (error.response?.status === 401) {
      return { status: false, message: 'Session expired. Please login again.' }
    }
    
    return error.response?.data || { status: false, message: 'Order not found' }
  }
}