// import React, { createContext, useContext, useState, useEffect } from 'react'

// const CartContext = createContext()

// export const useCart = () => {
//   const context = useContext(CartContext)
//   if (!context) {
//     throw new Error('useCart must be used within CartProvider')
//   }
//   return context
// }

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([])
//   const [cartCount, setCartCount] = useState(0)
//   const [cartTotal, setCartTotal] = useState(0)

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     const savedCart = localStorage.getItem('niraBodyCart')
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart))
//     }
//   }, [])

//   // Update localStorage whenever cart changes
//   useEffect(() => {
//     localStorage.setItem('niraBodyCart', JSON.stringify(cartItems))
//     // Update cart count
//     const count = cartItems.reduce((sum, item) => sum + item.quantity, 0)
//     setCartCount(count)
//     // Update cart total
//     const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
//     setCartTotal(total)
//   }, [cartItems])

//   // Add to cart
//   const addToCart = (product, quantity = 1) => {
//     setCartItems(prevItems => {
//       const existingItem = prevItems.find(item => item.id === product.id)
      
//       if (existingItem) {
//         // Update quantity if product already in cart
//         return prevItems.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         )
//       } else {
//         // Add new product to cart
//         return [...prevItems, { ...product, quantity }]
//       }
//     })
//   }

//   // Remove from cart
//   const removeFromCart = (productId) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
//   }

//   // Update quantity
//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity <= 0) {
//       removeFromCart(productId)
//       return
//     }
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === productId ? { ...item, quantity: newQuantity } : item
//       )
//     )
//   }

//   // Clear cart
//   const clearCart = () => {
//     setCartItems([])
//   }

//   return (
//     <CartContext.Provider value={{
//       cartItems,
//       cartCount,
//       cartTotal,
//       addToCart,
//       removeFromCart,
//       updateQuantity,
//       clearCart
//     }}>
//       {children}
//     </CartContext.Provider>
//   )
// }

// context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('niraBodyCart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
      } catch (error) {
        console.error('Error parsing cart:', error)
        setCartItems([])
      }
    }
    setIsLoaded(true)
  }, [])

  // Update localStorage and cart calculations whenever cart changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('niraBodyCart', JSON.stringify(cartItems))
      
      // Update cart count
      const count = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
      setCartCount(count)
      
      // Update cart total
      const total = cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0)
      setCartTotal(total)
    }
  }, [cartItems, isLoaded])

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 0) + quantity }
            : item
        )
      } else {
        return [...prevItems, { 
          ...product, 
          quantity: quantity,
          id: product.id
        }]
      }
    })
  }

  // Remove from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('niraBodyCart')
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  )
}