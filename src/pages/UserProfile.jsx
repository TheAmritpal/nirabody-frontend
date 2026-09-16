// // pages/UserProfile.jsx
// import React, { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { Link } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'
// import axios from 'axios'
// import { apiUrl } from '../backend/pages/https'
// import { getImageUrl } from '../Helper'

// const UserProfile = () => {
//   const { user, logout, updateProfile } = useAuth()
//   const [userOrders, setUserOrders] = useState([])
//   const [activeTab, setActiveTab] = useState('profile')
//   const [loading, setLoading] = useState(false)
//   const [isEditing, setIsEditing] = useState(false)
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     address: '',
//     pincode: '',
//     city: '',
//     state: '',
//     country: ''
//   })

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || '',
//         email: user.email || '',
//         address: user.address || '',
//         pincode: user.pincode || '',
//         city: user.city || '',
//         state: user.state || '',
//         country: user.country || 'India'
//       })
//       fetchOrders()
//     }
//   }, [user])

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/user/orders/my-orders`)
//       if (response.data.status) {
//         setUserOrders(response.data.data)
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error)
//     }
//   }

//   const handleUpdateProfile = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     const result = await updateProfile(formData)
//     if (result.status) {
//       setIsEditing(false)
//       alert('Profile updated successfully!')
//     } else {
//       alert(result.message || 'Update failed')
//     }
//     setLoading(false)
//   }

//   if (!user) {
//     return (
//       <div className="min-h-screen bg-ivory flex items-center justify-center">
//         <div className="text-center">
//           <i className="fas fa-user-circle text-6xl text-sand mb-4"></i>
//           <h1 className="font-serif text-2xl text-warm-brown">Please login to view profile</h1>
//           <Link to="/login" className="mt-4 inline-block bg-terracotta text-ivory px-6 py-2 rounded-full">
//             Go to Login
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-ivory py-12 px-4"
//     >
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="w-24 h-24 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
//             <i className="fas fa-user-circle text-terracotta text-4xl"></i>
//           </div>
//           <h1 className="font-serif text-3xl text-warm-brown">Welcome, {user.name}!</h1>
//           <p className="text-warm-brown-light">📱 {user.phone} • Member since {new Date(user.created_at).toLocaleDateString()}</p>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-sand/50 mb-8">
//           <button
//             onClick={() => setActiveTab('profile')}
//             className={`px-6 py-3 font-sans text-sm uppercase tracking-wide transition-colors ${
//               activeTab === 'profile'
//                 ? 'text-terracotta border-b-2 border-terracotta'
//                 : 'text-warm-brown-light hover:text-warm-brown'
//             }`}
//           >
//             <i className="fas fa-user mr-2"></i> Profile
//           </button>
//           <button
//             onClick={() => setActiveTab('orders')}
//             className={`px-6 py-3 font-sans text-sm uppercase tracking-wide transition-colors ${
//               activeTab === 'orders'
//                 ? 'text-terracotta border-b-2 border-terracotta'
//                 : 'text-warm-brown-light hover:text-warm-brown'
//             }`}
//           >
//             <i className="fas fa-shopping-bag mr-2"></i> Orders ({userOrders.length})
//           </button>
//         </div>

//         {/* Profile Tab */}
//         {activeTab === 'profile' && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="bg-ivory border border-sand/50 rounded-2xl p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="font-serif text-xl text-warm-brown">Personal Information</h2>
//                 <button
//                   onClick={() => setIsEditing(!isEditing)}
//                   className="text-terracotta text-sm hover:underline"
//                 >
//                   {isEditing ? 'Cancel' : <><i className="fas fa-edit mr-1"></i> Edit</>}
//                 </button>
//               </div>

//               {isEditing ? (
//                 <form onSubmit={handleUpdateProfile} className="space-y-3">
//                   <div>
//                     <label className="block text-warm-brown-light text-sm">Full Name</label>
//                     <input
//                       type="text"
//                       value={formData.name}
//                       onChange={(e) => setFormData({...formData, name: e.target.value})}
//                       className="w-full px-3 py-2 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-warm-brown-light text-sm">Email</label>
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => setFormData({...formData, email: e.target.value})}
//                       className="w-full px-3 py-2 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-warm-brown-light text-sm">Address</label>
//                     <input
//                       type="text"
//                       value={formData.address}
//                       onChange={(e) => setFormData({...formData, address: e.target.value})}
//                       className="w-full px-3 py-2 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-warm-brown-light text-sm">Pincode</label>
//                     <input
//                       type="text"
//                       value={formData.pincode}
//                       onChange={(e) => setFormData({...formData, pincode: e.target.value})}
//                       className="w-full px-3 py-2 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory"
//                     />
//                   </div>
//                   <div className="grid grid-cols-2 gap-3">
//                     <div>
//                       <label className="block text-warm-brown-light text-sm">City</label>
//                       <input
//                         type="text"
//                         value={formData.city}
//                         onChange={(e) => setFormData({...formData, city: e.target.value})}
//                         className="w-full px-3 py-2 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-warm-brown-light text-sm">State</label>
//                       <input
//                         type="text"
//                         value={formData.state}
//                         onChange={(e) => setFormData({...formData, state: e.target.value})}
//                         className="w-full px-3 py-2 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory"
//                       />
//                     </div>
//                   </div>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-terracotta text-ivory py-2 rounded-full hover:bg-warm-brown transition"
//                   >
//                     {loading ? 'Saving...' : 'Save Changes'}
//                   </button>
//                 </form>
//               ) : (
//                 <div className="space-y-3">
//                   <div>
//                     <p className="text-warm-brown-light text-sm">Full Name</p>
//                     <p className="text-warm-brown font-medium">{user.name}</p>
//                   </div>
//                   <div>
//                     <p className="text-warm-brown-light text-sm">Email Address</p>
//                     <p className="text-warm-brown font-medium">{user.email}</p>
//                   </div>
//                   <div>
//                     <p className="text-warm-brown-light text-sm">Phone Number</p>
//                     <p className="text-warm-brown font-medium">{user.phone}</p>
//                   </div>
//                   <div>
//                     <p className="text-warm-brown-light text-sm">Address</p>
//                     <p className="text-warm-brown font-medium">{user.address || 'Not added'}</p>
//                   </div>
//                   <div>
//                     <p className="text-warm-brown-light text-sm">Pincode</p>
//                     <p className="text-warm-brown font-medium">{user.pincode || 'Not added'}</p>
//                   </div>
//                   <div>
//                     <p className="text-warm-brown-light text-sm">Location</p>
//                     <p className="text-warm-brown font-medium">
//                       {user.city || ''} {user.state ? `, ${user.state}` : ''} {user.country ? `, ${user.country}` : ''}
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="bg-ivory border border-sand/50 rounded-2xl p-6">
//               <h2 className="font-serif text-xl text-warm-brown mb-4">Account Statistics</h2>
//               <div className="space-y-4">
//                 <div className="bg-sand/10 rounded-lg p-4 text-center">
//                   <p className="text-3xl font-serif text-terracotta">{userOrders.length}</p>
//                   <p className="text-warm-brown-light text-sm">Total Orders</p>
//                 </div>
//                 <div className="bg-sand/10 rounded-lg p-4 text-center">
//                   <p className="text-3xl font-serif text-terracotta">
//                     {userOrders.filter(o => o.order_status === 'delivered').length}
//                   </p>
//                   <p className="text-warm-brown-light text-sm">Delivered Orders</p>
//                 </div>
//                 <button
//                   onClick={logout}
//                   className="w-full bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition font-sans text-sm uppercase tracking-wide"
//                 >
//                   <i className="fas fa-sign-out-alt mr-2"></i> Logout
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Orders Tab with Images */}
//         {activeTab === 'orders' && (
//           <div className="bg-ivory border border-sand/50 rounded-2xl p-6">
//             <h2 className="font-serif text-xl text-warm-brown mb-4">Your Orders</h2>
            
//             {userOrders.length === 0 ? (
//               <div className="text-center py-12">
//                 <i className="fas fa-shopping-bag text-5xl text-sand mb-4"></i>
//                 <p className="text-warm-brown-light mb-4">You haven't placed any orders yet.</p>
//                 <Link to="/shop" className="bg-terracotta text-ivory px-6 py-2 rounded-full inline-block">
//                   Start Shopping
//                 </Link>
//               </div>
//             ) : (
//               <div className="space-y-6">
//                 {userOrders.map((order) => (
//                   <div key={order.id} className="border border-sand/50 rounded-xl p-4 hover:shadow-md transition-shadow">
//                     <div className="flex justify-between items-start mb-3">
//                       <div>
//                         <p className="text-warm-brown-light text-sm">Order ID</p>
//                         <p className="font-mono text-terracotta font-medium">{order.order_id}</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-warm-brown-light text-sm">Order Date</p>
//                         <p className="text-warm-brown">{new Date(order.created_at).toLocaleDateString('en-IN')}</p>
//                       </div>
//                     </div>
                    
//                     {/* 🔥 Order Items with Images */}
//                     <div className="space-y-3 mb-3">
//                       {order.items.map((item, idx) => (
//                         <div key={idx} className="flex items-center gap-4 bg-gray-50 rounded-lg p-2">
//                           {/* Product Image */}
//                           <img 
//                             src={getImageUrl(item.product_image)} 
//                             alt={item.product_name}
//                             className="w-16 h-16 object-cover rounded-lg border border-gray-200"
//                             onError={(e) => {
//                               e.target.src = 'https://via.placeholder.com/64?text=No+Image'
//                             }}
//                           />
//                           <div className="flex-1 flex justify-between items-center">
//                             <div>
//                               <p className="font-medium text-warm-brown">{item.product_name}</p>
//                               <p className="text-sm text-warm-brown-light">Qty: {item.quantity}</p>
//                             </div>
//                             <p className="text-terracotta font-semibold">₹{item.total}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
                    
//                     <div className="border-t border-sand/50 pt-3 flex justify-between">
//                       <span className="text-warm-brown font-semibold">Total Paid</span>
//                       <span className="text-terracotta font-semibold">₹{order.total}</span>
//                     </div>
                    
//                     <div className="mt-3 flex flex-wrap gap-2">
//                       <span className={`text-xs px-2 py-1 rounded-full ${
//                         order.payment_method === 'cod' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
//                       }`}>
//                         {order.payment_method === 'cod' ? 'Cash on Delivery' : 
//                          order.payment_method === 'razorpay' ? 'Card/UPI' : 
//                          order.payment_method === 'upi' ? 'UPI' : 'Paid'}
//                       </span>
//                       <span className={`text-xs px-2 py-1 rounded-full ${
//                         order.order_status === 'delivered' ? 'bg-green-100 text-green-700' :
//                         order.order_status === 'cancelled' ? 'bg-red-100 text-red-700' :
//                         'bg-blue-100 text-blue-700'
//                       }`}>
//                         {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
//                       </span>
//                       <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
//                         {order.shipping === 0 ? 'Free Shipping' : 'Standard Shipping'}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   )
// }

// export default UserProfile



// pages/UserProfile.jsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCache } from '../hooks/useCache'
import axios from 'axios'
import { apiUrl } from '../backend/pages/https'
import { getImageUrl } from '../Helper'
import UserProfileSkeleton from '../components/skeletons/UserProfileSkeleton'

const UserProfile = () => {
  const { user, logout, updateProfile } = useAuth()
  const [userOrders, setUserOrders] = useState([])
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    pincode: '',
    city: '',
    state: '',
    country: ''
  })

  // Use cache for settings if needed
  const { data: settings } = useCache('settings', '/settings')

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || '',
        pincode: user.pincode || '',
        city: user.city || '',
        state: user.state || '',
        country: user.country || 'India'
      })
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    setOrdersLoading(true)
    try {
      const response = await axios.get(`${apiUrl}/user/orders/my-orders`)
      if (response.data.status) {
        setUserOrders(response.data.data || [])
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setOrdersLoading(false)
    }
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await updateProfile(formData)
    if (result.status) {
      setIsEditing(false)
      alert('Profile updated successfully!')
    } else {
      alert(result.message || 'Update failed')
    }
    setLoading(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-user-circle text-6xl text-sand mb-4"></i>
          <h1 className="font-serif text-2xl text-warm-brown">Please login to view profile</h1>
          <Link to="/login" className="mt-4 inline-block bg-terracotta text-ivory px-6 py-2 rounded-full">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  if (ordersLoading) {
    return <UserProfileSkeleton />
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-ivory py-12 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-user-circle text-terracotta text-4xl"></i>
          </div>
          <h1 className="font-serif text-3xl text-warm-brown">Welcome, {user.name}!</h1>
          <p className="text-warm-brown-light">📱 {user.phone} • Member since {new Date(user.created_at).toLocaleDateString()}</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-sand/50 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 font-sans text-sm uppercase tracking-wide transition-colors ${
              activeTab === 'profile'
                ? 'text-terracotta border-b-2 border-terracotta'
                : 'text-warm-brown-light hover:text-warm-brown'
            }`}
          >
            <i className="fas fa-user mr-2"></i> Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-sans text-sm uppercase tracking-wide transition-colors ${
              activeTab === 'orders'
                ? 'text-terracotta border-b-2 border-terracotta'
                : 'text-warm-brown-light hover:text-warm-brown'
            }`}
          >
            <i className="fas fa-shopping-bag mr-2"></i> Orders ({userOrders.length})
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-ivory border border-sand/50 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-serif text-xl text-warm-brown">Personal Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-terracotta text-sm hover:underline"
                >
                  {isEditing ? 'Cancel' : <><i className="fas fa-edit mr-1"></i> Edit</>}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-3">
                  <div>
                    <label className="block text-warm-brown-light text-sm">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory"
                    />
                  </div>
                  <div>
                    <label className="block text-warm-brown-light text-sm">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory"
                    />
                  </div>
                  <div>
                    <label className="block text-warm-brown-light text-sm">Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full px-3 py-2 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory"
                    />
                  </div>
                  <div>
                    <label className="block text-warm-brown-light text-sm">Pincode</label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      className="w-full px-3 py-2 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-warm-brown-light text-sm">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full px-3 py-2 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory"
                      />
                    </div>
                    <div>
                      <label className="block text-warm-brown-light text-sm">State</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({...formData, state: e.target.value})}
                        className="w-full px-3 py-2 border border-sand rounded-lg focus:outline-none focus:border-terracotta bg-ivory"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-terracotta text-ivory py-2 rounded-full hover:bg-warm-brown transition"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </form>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="text-warm-brown-light text-sm">Full Name</p>
                    <p className="text-warm-brown font-medium">{user.name}</p>
                  </div>
                  <div>
                    <p className="text-warm-brown-light text-sm">Email Address</p>
                    <p className="text-warm-brown font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-warm-brown-light text-sm">Phone Number</p>
                    <p className="text-warm-brown font-medium">{user.phone}</p>
                  </div>
                  <div>
                    <p className="text-warm-brown-light text-sm">Address</p>
                    <p className="text-warm-brown font-medium">{user.address || 'Not added'}</p>
                  </div>
                  <div>
                    <p className="text-warm-brown-light text-sm">Pincode</p>
                    <p className="text-warm-brown font-medium">{user.pincode || 'Not added'}</p>
                  </div>
                  <div>
                    <p className="text-warm-brown-light text-sm">Location</p>
                    <p className="text-warm-brown font-medium">
                      {user.city || ''} {user.state ? `, ${user.state}` : ''} {user.country ? `, ${user.country}` : ''}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-ivory border border-sand/50 rounded-2xl p-6">
              <h2 className="font-serif text-xl text-warm-brown mb-4">Account Statistics</h2>
              <div className="space-y-4">
                <div className="bg-sand/10 rounded-lg p-4 text-center">
                  <p className="text-3xl font-serif text-terracotta">{userOrders.length}</p>
                  <p className="text-warm-brown-light text-sm">Total Orders</p>
                </div>
                <div className="bg-sand/10 rounded-lg p-4 text-center">
                  <p className="text-3xl font-serif text-terracotta">
                    {userOrders.filter(o => o.order_status === 'delivered').length}
                  </p>
                  <p className="text-warm-brown-light text-sm">Delivered Orders</p>
                </div>
                <button
                  onClick={logout}
                  className="w-full bg-red-500 text-white py-3 rounded-full hover:bg-red-600 transition font-sans text-sm uppercase tracking-wide"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i> Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab with Images */}
        {activeTab === 'orders' && (
          <div className="bg-ivory border border-sand/50 rounded-2xl p-6">
            <h2 className="font-serif text-xl text-warm-brown mb-4">Your Orders</h2>
            
            {userOrders.length === 0 ? (
              <div className="text-center py-12">
                <i className="fas fa-shopping-bag text-5xl text-sand mb-4"></i>
                <p className="text-warm-brown-light mb-4">You haven't placed any orders yet.</p>
                <Link to="/shop" className="bg-terracotta text-ivory px-6 py-2 rounded-full inline-block">
                  Start Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {userOrders.map((order) => (
                  <div key={order.id} className="border border-sand/50 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-warm-brown-light text-sm">Order ID</p>
                        <p className="font-mono text-terracotta font-medium">{order.order_id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-warm-brown-light text-sm">Order Date</p>
                        <p className="text-warm-brown">{new Date(order.created_at).toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>
                    
                    {/* Order Items with Images */}
                    <div className="space-y-3 mb-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 bg-gray-50 rounded-lg p-2">
                          <img 
                            src={getImageUrl(item.product_image)} 
                            alt={item.product_name}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/64?text=No+Image'
                            }}
                          />
                          <div className="flex-1 flex justify-between items-center">
                            <div>
                              <p className="font-medium text-warm-brown">{item.product_name}</p>
                              <p className="text-sm text-warm-brown-light">Qty: {item.quantity}</p>
                            </div>
                            <p className="text-terracotta font-semibold">₹{item.total}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-sand/50 pt-3 flex justify-between">
                      <span className="text-warm-brown font-semibold">Total Paid</span>
                      <span className="text-terracotta font-semibold">₹{order.total}</span>
                    </div>
                    
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.payment_method === 'cod' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {order.payment_method === 'cod' ? 'Cash on Delivery' : 
                         order.payment_method === 'razorpay' ? 'Card/UPI' : 
                         order.payment_method === 'upi' ? 'UPI' : 'Paid'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.order_status === 'delivered' ? 'bg-green-100 text-green-700' :
                        order.order_status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {order.shipping === 0 ? 'Free Shipping' : 'Standard Shipping'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default UserProfile