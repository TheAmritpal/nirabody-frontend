


// import React, { useState, useEffect, useCallback } from 'react'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import axios from 'axios'
// import { useCart } from '../context/CartContext'
// import { useAuth } from '../context/AuthContext'
// import { apiUrl } from '../backend/pages/https'
// import { getImageUrl } from '../Helper'

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isCartOpen, setIsCartOpen] = useState(false)
//   const [isSearchOpen, setIsSearchOpen] = useState(false)
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [searchResults, setSearchResults] = useState([])
//   const [isSearching, setIsSearching] = useState(false)
//   const [currentAnnouncement, setCurrentAnnouncement] = useState(0)
//   const [settings, setSettings] = useState({})
//   const location = useLocation()
//   const navigate = useNavigate()
  
//   const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()
//   const { user, isAuthenticated, logout } = useAuth()

//   // Fetch settings
//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/settings`)
//         if (response.data.status) {
//           setSettings(response.data.data)
//         }
//       } catch (error) {
//         console.error('Error fetching settings:', error)
//       }
//     }
//     fetchSettings()
//   }, [])

//   // Announcement bar messages
//   const defaultAnnouncements = [
//     " Free shipping on orders ₹4000+ ",
//     " Hormone-safe skincare. Always.",
//     " Ancient rituals. Modern wellness.",
//     " Join the Ritual Circle & get 15% off",
//     " Fast & conscious shipping worldwide"
//   ]

//   const announcements = settings.announcements ? settings.announcements.split('|') : defaultAnnouncements

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentAnnouncement((prev) => (prev + 1) % announcements.length)
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [announcements.length])

//   // 🔥 Real-time search
//   useEffect(() => {
//     const searchProducts = async () => {
//       if (!searchQuery.trim() || searchQuery.length < 2) {
//         setSearchResults([])
//         return
//       }

//       setIsSearching(true)
//       try {
//         // Fetch all products from API
//         const response = await axios.get(`${apiUrl}/products`)
//         if (response.data.status) {
//           const allProducts = response.data.data || []
          
//           // Filter products based on search query
//           const filtered = allProducts.filter(product => 
//             product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             product.short_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             product.category?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//             (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
//           )
          
//           setSearchResults(filtered.slice(0, 8)) // Limit to 8 results
//         }
//       } catch (error) {
//         console.error('Error searching products:', error)
//         setSearchResults([])
//       } finally {
//         setIsSearching(false)
//       }
//     }

//     // Debounce search to avoid too many API calls
//     const debounceTimer = setTimeout(() => {
//       searchProducts()
//     }, 300)

//     return () => clearTimeout(debounceTimer)
//   }, [searchQuery])

//   const navItems = [
//     { name: 'Shop', path: '/shop' },
//     { name: 'Ritual Guide', path: '/ritual-guide' },
//     { name: 'About', path: '/about' },
//     { name: 'Blog', path: '/blog' },
//   ]

//   const isActive = (path) => location.pathname === path

//   const siteName = settings.site_name || 'NIRA BODY'

//   const handleLogout = () => {
//     logout()
//     setIsUserMenuOpen(false)
//     navigate('/')
//   }

//   const clearSearch = () => {
//     setSearchQuery('')
//     setSearchResults([])
//     setIsSearchOpen(false)
//   }

//   return (
//     <>
//       {/* TOP ANNOUNCEMENT BAR */}
//       <div className="bg-warm-brown text-ivory py-2.5 border-b border-ivory/10">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center">
//             <motion.p
//               key={currentAnnouncement}
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: -20, opacity: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-sm tracking-wide font-sans"
//             >
//               {announcements[currentAnnouncement]}
//             </motion.p>
//           </div>
//         </div>
//       </div>

//       {/* MAIN NAVBAR */}
//       <nav className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-sand/50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             {/* Mobile Menu Button */}
//             <button 
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="lg:hidden text-warm-brown hover:text-terracotta transition-colors"
//               aria-label="Toggle menu"
//             >
//               <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
//             </button>

//             {/* Logo */}
//             <Link 
//               to="/" 
//               className="font-serif text-2xl md:text-3xl tracking-wide text-warm-brown hover:text-terracotta transition-colors"
//             >
//               {siteName}
//             </Link>

//             {/* Desktop Navigation */}
//             <div className="hidden lg:flex space-x-8">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   to={item.path}
//                   className={`text-sm uppercase tracking-wide transition-colors ${
//                     isActive(item.path)
//                       ? 'text-terracotta'
//                       : 'text-warm-brown hover:text-terracotta'
//                   }`}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </div>

//             {/* Icons */}
//             <div className="flex items-center space-x-5">
//               {/* Search Icon */}
//               <button 
//                 onClick={() => setIsSearchOpen(true)}
//                 className="text-warm-brown hover:text-terracotta transition-colors"
//                 aria-label="Search"
//               >
//                 <i className="fas fa-search text-xl"></i>
//               </button>
              
//               {/* User Icon */}
//               <div className="relative">
//                 <button 
//                   onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//                   className="text-warm-brown hover:text-terracotta transition-colors"
//                   aria-label="User menu"
//                 >
//                   <i className="far fa-user text-xl"></i>
//                 </button>
                
//                 <AnimatePresence>
//                   {isUserMenuOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute right-0 mt-2 w-56 bg-ivory border border-sand/50 rounded-lg shadow-xl z-50 overflow-hidden"
//                     >
//                       {isAuthenticated ? (
//                         <div>
//                           <div className="px-4 py-3 border-b border-sand/50 bg-sand/10">
//                             <p className="text-warm-brown font-semibold text-sm">{user?.name}</p>
//                             <p className="text-warm-brown-light text-xs mt-0.5">{user?.email}</p>
//                           </div>
//                           <Link
//                             to="/profile"
//                             className="flex items-center gap-3 px-4 py-2.5 text-warm-brown hover:bg-sand/20 transition-colors text-sm"
//                             onClick={() => setIsUserMenuOpen(false)}
//                           >
//                             <i className="fas fa-user-circle w-5 text-terracotta"></i>
//                             <span>My Profile</span>
//                           </Link>
//                           <Link
//                             to="/profile"
//                             className="flex items-center gap-3 px-4 py-2.5 text-warm-brown hover:bg-sand/20 transition-colors text-sm"
//                             onClick={() => setIsUserMenuOpen(false)}
//                           >
//                             <i className="fas fa-shopping-bag w-5 text-terracotta"></i>
//                             <span>My Orders</span>
//                           </Link>
//                           <button
//                             onClick={handleLogout}
//                             className="flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 transition-colors text-sm w-full text-left border-t border-sand/50"
//                           >
//                             <i className="fas fa-sign-out-alt w-5"></i>
//                             <span>Logout</span>
//                           </button>
//                         </div>
//                       ) : (
//                         <div>
//                           <Link
//                             to="/login"
//                             className="flex items-center gap-3 px-4 py-3 text-warm-brown hover:bg-sand/20 transition-colors"
//                             onClick={() => setIsUserMenuOpen(false)}
//                           >
//                             <i className="fas fa-sign-in-alt w-5 text-terracotta"></i>
//                             <span>Login</span>
//                           </Link>
//                           <Link
//                             to="/signup"
//                             className="flex items-center gap-3 px-4 py-3 text-warm-brown hover:bg-sand/20 transition-colors border-t border-sand/50"
//                             onClick={() => setIsUserMenuOpen(false)}
//                           >
//                             <i className="fas fa-user-plus w-5 text-terracotta"></i>
//                             <span>Sign Up</span>
//                           </Link>
//                         </div>
//                       )}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
              
//               {/* Cart Icon */}
//               <button 
//                 onClick={() => setIsCartOpen(true)}
//                 className="text-warm-brown hover:text-terracotta transition-colors relative group"
//                 aria-label="Shopping bag"
//               >
//                 <i className="fas fa-shopping-bag text-xl group-hover:scale-105 transition-transform"></i>
//                 <span className={`absolute -top-2 -right-2 text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 transition-all duration-300 ${
//                   cartCount > 0 
//                     ? 'bg-terracotta text-ivory scale-100' 
//                     : 'bg-sand text-warm-brown-light scale-90'
//                 }`}>
//                   {cartCount}
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {isMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="lg:hidden bg-ivory border-t border-sand/50 overflow-hidden"
//             >
//               <div className="px-4 py-6 space-y-4">
//                 {navItems.map((item) => (
//                   <Link
//                     key={item.name}
//                     to={item.path}
//                     className="block text-warm-brown hover:text-terracotta transition-colors py-2"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//                 <Link
//                   to="/contact"
//                   className="block text-warm-brown hover:text-terracotta transition-colors py-2"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Contact
//                 </Link>
//                 <Link
//                   to="/faqs"
//                   className="block text-warm-brown hover:text-terracotta transition-colors py-2"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   FAQs
//                 </Link>
//                 <hr className="border-sand/50 my-2" />
//                 {!isAuthenticated ? (
//                   <>
//                     <Link
//                       to="/login"
//                       className="block text-warm-brown hover:text-terracotta transition-colors py-2"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       <i className="fas fa-sign-in-alt mr-2"></i> Login
//                     </Link>
//                     <Link
//                       to="/signup"
//                       className="block text-warm-brown hover:text-terracotta transition-colors py-2"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       <i className="fas fa-user-plus mr-2"></i> Sign Up
//                     </Link>
//                   </>
//                 ) : (
//                   <>
//                     <Link
//                       to="/profile"
//                       className="block text-warm-brown hover:text-terracotta transition-colors py-2"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       <i className="fas fa-user mr-2"></i> My Profile
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left text-red-500 hover:text-red-600 transition-colors py-2"
//                     >
//                       <i className="fas fa-sign-out-alt mr-2"></i> Logout
//                     </button>
//                   </>
//                 )}
//                 <hr className="border-sand/50 my-2" />
//                 <Link
//                   to="/shipping-policy"
//                   className="block text-warm-brown-light text-sm py-1"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Shipping Policy
//                 </Link>
//                 <Link
//                   to="/returns-policy"
//                   className="block text-warm-brown-light text-sm py-1"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Returns Policy
//                 </Link>
//                 <Link
//                   to="/privacy-policy"
//                   className="block text-warm-brown-light text-sm py-1"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Privacy Policy
//                 </Link>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>

//       {/* SEARCH MODAL with Real Results */}
//       <AnimatePresence>
//         {isSearchOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/60 z-50"
//               onClick={clearSearch}
//             />
//             <motion.div
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: -50, opacity: 0 }}
//               transition={{ type: 'spring', damping: 25, stiffness: 300 }}
//               className="fixed top-0 left-0 right-0 bg-ivory shadow-2xl z-50 rounded-b-2xl"
//             >
//               <div className="max-w-4xl mx-auto p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h3 className="font-serif text-2xl text-warm-brown">Search</h3>
//                   <button 
//                     onClick={clearSearch}
//                     className="text-warm-brown hover:text-terracotta transition-colors"
//                   >
//                     <i className="fas fa-times text-2xl"></i>
//                   </button>
//                 </div>

//                 <div className="relative">
//                   <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-brown-light"></i>
//                   <input
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search for products, rituals, guides..."
//                     className="w-full pl-12 pr-4 py-4 border border-sand rounded-xl focus:outline-none focus:border-terracotta bg-ivory text-warm-brown text-lg"
//                     autoFocus
//                   />
//                   {isSearching && (
//                     <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
//                       <div className="w-5 h-5 border-2 border-terracotta rounded-full border-t-transparent animate-spin"></div>
//                     </div>
//                   )}
//                 </div>

//                 {searchQuery && (
//                   <div className="mt-6 max-h-96 overflow-y-auto">
//                     {searchResults.length > 0 ? (
//                       <div className="space-y-3">
//                         <p className="text-warm-brown-light text-sm">Found {searchResults.length} results</p>
//                         {searchResults.map((product) => (
//                           <Link
//                             key={product.id}
//                             to={`/product/${product.id}`}
//                             onClick={clearSearch}
//                             className="flex items-center gap-4 p-4 hover:bg-sand/30 rounded-lg transition-colors group"
//                           >
//                             <img 
//                               src={getImageUrl(product.image)} 
//                               alt={product.name} 
//                               className="w-16 h-16 object-cover rounded-lg" 
//                             />
//                             <div className="flex-1">
//                               <p className="font-serif text-warm-brown group-hover:text-terracotta transition-colors">
//                                 {product.name}
//                               </p>
//                               <p className="text-warm-brown-light text-sm">
//                                 {product.category?.name || 'Product'}
//                               </p>
//                             </div>
//                             <p className="text-terracotta font-semibold">₹{product.price}</p>
//                           </Link>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-8">
//                         <i className="fas fa-search text-4xl text-sand mb-3"></i>
//                         <p className="text-warm-brown-light">No products found matching "{searchQuery}"</p>
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {!searchQuery && (
//                   <div className="mt-6">
//                     <p className="text-warm-brown-light text-sm mb-3">Popular searches:</p>
//                     <div className="flex flex-wrap gap-2">
//                       {['Body Oil', 'Dry Brush', 'Gua Sha', 'Ritual Kit', 'Aloe Vera'].map((term) => (
//                         <button
//                           key={term}
//                           onClick={() => setSearchQuery(term)}
//                           className="px-4 py-2 bg-sand/20 rounded-full text-warm-brown hover:bg-sand/40 transition-colors text-sm"
//                         >
//                           {term}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* CART SIDEBAR (Same as before) */}
//       <AnimatePresence>
//         {isCartOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 z-50"
//               onClick={() => setIsCartOpen(false)}
//             />
//             <motion.div
//               initial={{ x: '100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '100%' }}
//               transition={{ type: 'tween', duration: 0.3 }}
//               className="fixed right-0 top-0 h-full w-full max-w-md bg-ivory shadow-xl z-50 overflow-y-auto"
//             >
//               <div className="p-6">
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="font-serif text-2xl text-warm-brown">
//                     Your Cart {cartCount > 0 && `(${cartCount})`}
//                   </h2>
//                   <button 
//                     onClick={() => setIsCartOpen(false)} 
//                     className="text-warm-brown hover:text-terracotta transition-colors"
//                   >
//                     <i className="fas fa-times text-xl"></i>
//                   </button>
//                 </div>

//                 {cartItems.length === 0 ? (
//                   <div className="text-center py-12">
//                     <i className="far fa-shopping-bag text-5xl text-sand mb-4"></i>
//                     <p className="text-warm-brown-light mb-4">Your cart is empty</p>
//                     <p className="text-warm-brown-light text-sm mb-6">Looks like you haven't added anything to your cart yet.</p>
//                     <Link
//                       to="/shop"
//                       onClick={() => setIsCartOpen(false)}
//                       className="inline-block bg-terracotta text-ivory px-6 py-3 rounded-full hover:bg-warm-brown transition-colors"
//                     >
//                       Begin Your Ritual
//                     </Link>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto pr-2">
//                       {cartItems.map((item) => (
//                         <div key={item.id} className="flex gap-4 border-b border-sand/50 pb-4">
//                           <img 
//                             src={getImageUrl(item.image)} 
//                             alt={item.name} 
//                             className="w-20 h-20 object-cover rounded-lg" 
//                           />
//                           <div className="flex-1">
//                             <h3 className="font-serif text-warm-brown text-base">{item.name}</h3>
//                             <p className="text-terracotta font-semibold text-sm mt-1">₹{item.price}</p>
//                             <div className="flex items-center gap-3 mt-2">
//                               <button 
//                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                 className="w-7 h-7 rounded-full border border-sand text-warm-brown hover:border-terracotta hover:text-terracotta transition-colors"
//                               >
//                                 -
//                               </button>
//                               <span className="text-sm text-warm-brown w-6 text-center">{item.quantity}</span>
//                               <button 
//                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                 className="w-7 h-7 rounded-full border border-sand text-warm-brown hover:border-terracotta hover:text-terracotta transition-colors"
//                               >
//                                 +
//                               </button>
//                               <button 
//                                 onClick={() => removeFromCart(item.id)}
//                                 className="ml-auto text-warm-brown-light hover:text-red-500 transition-colors"
//                               >
//                                 <i className="fas fa-trash-alt"></i>
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     <div className="border-t border-sand/50 pt-4 space-y-3">
//                       <div className="flex justify-between text-warm-brown">
//                         <span>Subtotal</span>
//                         <span className="font-semibold">₹{cartTotal}</span>
//                       </div>
//                       <div className="flex justify-between text-sm text-warm-brown-light">
//                         <span>Shipping</span>
//                         <span>{cartTotal >= 4000 ? 'Free' : 'Calculated at checkout'}</span>
//                       </div>
//                       {cartTotal >= 4000 && (
//                         <div className="bg-green-50 text-green-700 text-xs p-2 rounded text-center">
//                           <i className="fas fa-truck mr-1"></i> You qualify for free shipping!
//                         </div>
//                       )}
//                       <div className="pt-3 space-y-2">
//                         <Link
//                           to="/checkout"
//                           onClick={() => setIsCartOpen(false)}
//                           className="w-full bg-terracotta text-ivory py-3 rounded-full hover:bg-warm-brown transition-colors text-center block font-sans text-sm uppercase tracking-wide"
//                         >
//                           Proceed to Checkout
//                         </Link>
//                         <button
//                           onClick={clearCart}
//                           className="w-full text-warm-brown-light text-sm hover:text-terracotta transition-colors py-2"
//                         >
//                           Clear Cart
//                         </button>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }

// export default Navbar

// components/Navbar.jsx
// components/Navbar.jsx
import React, { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useCache } from '../hooks/useCache'
import { apiUrl } from '../backend/pages/https'
import { getImageUrl } from '../Helper'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()
  
  const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  
  // Use cache for settings
  const { data: settings, loading: settingsLoading } = useCache('settings', '/settings')

  // Announcement bar messages
  const defaultAnnouncements = [
    " Free shipping on orders ₹4000+ ",
    " Hormone-safe skincare. Always.",
    " Ancient rituals. Modern wellness.",
    " Join the Ritual Circle & get 15% off",
    " Fast & conscious shipping worldwide"
  ]

  const announcements = settings?.announcements ? settings.announcements.split('|') : defaultAnnouncements

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [announcements.length])

  // Real-time search
  useEffect(() => {
    const searchProducts = async () => {
      if (!searchQuery.trim() || searchQuery.length < 2) {
        setSearchResults([])
        return
      }

      setIsSearching(true)
      try {
        const response = await axios.get(`${apiUrl}/products`)
        if (response.data.status) {
          const allProducts = response.data.data || []
          
          const filtered = allProducts.filter(product => 
            product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.short_description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
          )
          
          setSearchResults(filtered.slice(0, 8))
        }
      } catch (error) {
        console.error('Error searching products:', error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }

    const debounceTimer = setTimeout(() => {
      searchProducts()
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  const navItems = [
    { name: 'Shop', path: '/shop' },
    { name: 'Ritual Guide', path: '/ritual-guide' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ]

  const isActive = (path) => location.pathname === path

  const siteName = settings?.site_name || 'NIRA BODY'

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
    navigate('/')
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setIsSearchOpen(false)
  }

  // Show skeleton navbar while loading
  if (settingsLoading) {
    return (
      <nav className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-sand/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            <div className="hidden lg:flex space-x-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="flex items-center space-x-5">
              <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <>
      {/* TOP ANNOUNCEMENT BAR */}
      <div className="bg-warm-brown text-ivory py-2.5 border-b border-ivory/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <motion.p
              key={currentAnnouncement}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm tracking-wide font-sans"
            >
              {announcements[currentAnnouncement]}
            </motion.p>
          </div>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <nav className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-sm border-b border-sand/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-warm-brown hover:text-terracotta transition-colors"
              aria-label="Toggle menu"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>

            {/* Logo */}
            <Link 
              to="/" 
              className="font-serif text-2xl md:text-3xl tracking-wide text-warm-brown hover:text-terracotta transition-colors"
            >
              {siteName}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm uppercase tracking-wide transition-colors ${
                    isActive(item.path)
                      ? 'text-terracotta'
                      : 'text-warm-brown hover:text-terracotta'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-5">
              {/* Search Icon */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="text-warm-brown hover:text-terracotta transition-colors"
                aria-label="Search"
              >
                <i className="fas fa-search text-xl"></i>
              </button>
              
              {/* User Icon */}
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="text-warm-brown hover:text-terracotta transition-colors"
                  aria-label="User menu"
                >
                  <i className="far fa-user text-xl"></i>
                </button>
                
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-ivory border border-sand/50 rounded-lg shadow-xl z-50 overflow-hidden"
                    >
                      {isAuthenticated ? (
                        <div>
                          <div className="px-4 py-3 border-b border-sand/50 bg-sand/10">
                            <p className="text-warm-brown font-semibold text-sm">{user?.name}</p>
                            <p className="text-warm-brown-light text-xs mt-0.5">{user?.email}</p>
                          </div>
                          <Link
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-2.5 text-warm-brown hover:bg-sand/20 transition-colors text-sm"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <i className="fas fa-user-circle w-5 text-terracotta"></i>
                            <span>My Profile</span>
                          </Link>
                          <Link
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-2.5 text-warm-brown hover:bg-sand/20 transition-colors text-sm"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <i className="fas fa-shopping-bag w-5 text-terracotta"></i>
                            <span>My Orders</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 text-red-500 hover:bg-red-50 transition-colors text-sm w-full text-left border-t border-sand/50"
                          >
                            <i className="fas fa-sign-out-alt w-5"></i>
                            <span>Logout</span>
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Link
                            to="/login"
                            className="flex items-center gap-3 px-4 py-3 text-warm-brown hover:bg-sand/20 transition-colors"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <i className="fas fa-sign-in-alt w-5 text-terracotta"></i>
                            <span>Login</span>
                          </Link>
                          <Link
                            to="/signup"
                            className="flex items-center gap-3 px-4 py-3 text-warm-brown hover:bg-sand/20 transition-colors border-t border-sand/50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <i className="fas fa-user-plus w-5 text-terracotta"></i>
                            <span>Sign Up</span>
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Cart Icon */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="text-warm-brown hover:text-terracotta transition-colors relative group"
                aria-label="Shopping bag"
              >
                <i className="fas fa-shopping-bag text-xl group-hover:scale-105 transition-transform"></i>
                <span className={`absolute -top-2 -right-2 text-xs rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 transition-all duration-300 ${
                  cartCount > 0 
                    ? 'bg-terracotta text-ivory scale-100' 
                    : 'bg-sand text-warm-brown-light scale-90'
                }`}>
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-ivory border-t border-sand/50 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block text-warm-brown hover:text-terracotta transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className="block text-warm-brown hover:text-terracotta transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  to="/faqs"
                  className="block text-warm-brown hover:text-terracotta transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQs
                </Link>
                <hr className="border-sand/50 my-2" />
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      className="block text-warm-brown hover:text-terracotta transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-sign-in-alt mr-2"></i> Login
                    </Link>
                    <Link
                      to="/signup"
                      className="block text-warm-brown hover:text-terracotta transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-user-plus mr-2"></i> Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/profile"
                      className="block text-warm-brown hover:text-terracotta transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <i className="fas fa-user mr-2"></i> My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-red-500 hover:text-red-600 transition-colors py-2"
                    >
                      <i className="fas fa-sign-out-alt mr-2"></i> Logout
                    </button>
                  </>
                )}
                <hr className="border-sand/50 my-2" />
                <Link
                  to="/shipping-policy"
                  className="block text-warm-brown-light text-sm py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Shipping Policy
                </Link>
                <Link
                  to="/returns-policy"
                  className="block text-warm-brown-light text-sm py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Returns Policy
                </Link>
                <Link
                  to="/privacy-policy"
                  className="block text-warm-brown-light text-sm py-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Privacy Policy
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50"
              onClick={clearSearch}
            />
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 right-0 bg-ivory shadow-2xl z-50 rounded-b-2xl"
            >
              <div className="max-w-4xl mx-auto p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-serif text-2xl text-warm-brown">Search</h3>
                  <button 
                    onClick={clearSearch}
                    className="text-warm-brown hover:text-terracotta transition-colors"
                  >
                    <i className="fas fa-times text-2xl"></i>
                  </button>
                </div>

                <div className="relative">
                  <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-brown-light"></i>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for products, rituals, guides..."
                    className="w-full pl-12 pr-4 py-4 border border-sand rounded-xl focus:outline-none focus:border-terracotta bg-ivory text-warm-brown text-lg"
                    autoFocus
                  />
                  {isSearching && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-5 h-5 border-2 border-terracotta rounded-full border-t-transparent animate-spin"></div>
                    </div>
                  )}
                </div>

                {searchQuery && (
                  <div className="mt-6 max-h-96 overflow-y-auto">
                    {searchResults.length > 0 ? (
                      <div className="space-y-3">
                        <p className="text-warm-brown-light text-sm">Found {searchResults.length} results</p>
                        {searchResults.map((product) => (
                          <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            onClick={clearSearch}
                            className="flex items-center gap-4 p-4 hover:bg-sand/30 rounded-lg transition-colors group"
                          >
                            <img 
                              src={getImageUrl(product.image)} 
                              alt={product.name} 
                              className="w-16 h-16 object-cover rounded-lg" 
                            />
                            <div className="flex-1">
                              <p className="font-serif text-warm-brown group-hover:text-terracotta transition-colors">
                                {product.name}
                              </p>
                              <p className="text-warm-brown-light text-sm">
                                {product.category?.name || 'Product'}
                              </p>
                            </div>
                            <p className="text-terracotta font-semibold">₹{product.price}</p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <i className="fas fa-search text-4xl text-sand mb-3"></i>
                        <p className="text-warm-brown-light">No products found matching "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                )}

                {!searchQuery && (
                  <div className="mt-6">
                    <p className="text-warm-brown-light text-sm mb-3">Popular searches:</p>
                    <div className="flex flex-wrap gap-2">
                      {['Body Oil', 'Dry Brush', 'Gua Sha', 'Ritual Kit', 'Aloe Vera'].map((term) => (
                        <button
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="px-4 py-2 bg-sand/20 rounded-full text-warm-brown hover:bg-sand/40 transition-colors text-sm"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* CART SIDEBAR */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-ivory shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-serif text-2xl text-warm-brown">
                    Your Cart {cartCount > 0 && `(${cartCount})`}
                  </h2>
                  <button 
                    onClick={() => setIsCartOpen(false)} 
                    className="text-warm-brown hover:text-terracotta transition-colors"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <i className="far fa-shopping-bag text-5xl text-sand mb-4"></i>
                    <p className="text-warm-brown-light mb-4">Your cart is empty</p>
                    <p className="text-warm-brown-light text-sm mb-6">Looks like you haven't added anything to your cart yet.</p>
                    <Link
                      to="/shop"
                      onClick={() => setIsCartOpen(false)}
                      className="inline-block bg-terracotta text-ivory px-6 py-3 rounded-full hover:bg-warm-brown transition-colors"
                    >
                      Begin Your Ritual
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-[60vh] overflow-y-auto pr-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 border-b border-sand/50 pb-4">
                          <img 
                            src={getImageUrl(item.image)} 
                            alt={item.name} 
                            className="w-20 h-20 object-cover rounded-lg" 
                          />
                          <div className="flex-1">
                            <h3 className="font-serif text-warm-brown text-base">{item.name}</h3>
                            <p className="text-terracotta font-semibold text-sm mt-1">₹{item.price}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-7 h-7 rounded-full border border-sand text-warm-brown hover:border-terracotta hover:text-terracotta transition-colors"
                              >
                                -
                              </button>
                              <span className="text-sm text-warm-brown w-6 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-7 h-7 rounded-full border border-sand text-warm-brown hover:border-terracotta hover:text-terracotta transition-colors"
                              >
                                +
                              </button>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto text-warm-brown-light hover:text-red-500 transition-colors"
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-sand/50 pt-4 space-y-3">
                      <div className="flex justify-between text-warm-brown">
                        <span>Subtotal</span>
                        <span className="font-semibold">₹{cartTotal}</span>
                      </div>
                      <div className="flex justify-between text-sm text-warm-brown-light">
                        <span>Shipping</span>
                        <span>{cartTotal >= 4000 ? 'Free' : 'Calculated at checkout'}</span>
                      </div>
                      {cartTotal >= 4000 && (
                        <div className="bg-green-50 text-green-700 text-xs p-2 rounded text-center">
                          <i className="fas fa-truck mr-1"></i> You qualify for free shipping!
                        </div>
                      )}
                      <div className="pt-3 space-y-2">
                        <Link
                          to="/checkout"
                          onClick={() => setIsCartOpen(false)}
                          className="w-full bg-terracotta text-ivory py-3 rounded-full hover:bg-warm-brown transition-colors text-center block font-sans text-sm uppercase tracking-wide"
                        >
                          Proceed to Checkout
                        </Link>
                        <button
                          onClick={clearCart}
                          className="w-full text-warm-brown-light text-sm hover:text-terracotta transition-colors py-2"
                        >
                          Clear Cart
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar