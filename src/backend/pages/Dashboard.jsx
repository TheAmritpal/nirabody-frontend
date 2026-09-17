

// import React, { useState, useEffect, useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import Sidebar from './Sidebar';
// import { User, X, Eye, EyeOff, Image, Film, Images } from 'lucide-react';
// import { apiUrl } from './https';
// import { AdminAuthContext } from '../context/AdminAuth';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//   const { user, isAuthenticated } = useContext(AdminAuthContext);
//   const [userId, setUserId] = useState(1); // Replace with auth context
//   const [adminData, setAdminData] = useState({ name: '', email: '' });
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
  
//   // Stats for new boxes
//   const [stats, setStats] = useState({
//     slider: { total: 0, currentMonth: 0 },
//     gallery: { total: 0, currentMonth: 0 },
//     video: { total: 0, currentMonth: 0 }
//   });

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     reset,
//   } = useForm({
//     mode: 'onChange',
//     defaultValues: {
//       name: '',
//       email: '',
//       password: '',
//     },
//   });

//   // Fetch admin details and stats
//   useEffect(() => {
//     const fetchAdminDetails = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/memeber/admin/users/${userId}`, {
//           headers: { Authorization: `Bearer ${user?.token}` },
//         });
//         const { name, email } = response.data.user;
//         setAdminData({ name, email });
//       } catch (error) {
//         console.error('Error fetching admin details:', error);
//         setAdminData({ name: 'Problem', email: 'Problem' });
//       }
//     };

//     const fetchStats = async () => {
//       try {
//         // You can replace these with actual API endpoints for your data
//         // For now using mock data
//         setStats({
//           slider: { total: 124, currentMonth: 18 },
//           gallery: { total: 356, currentMonth: 42 },
//           video: { total: 89, currentMonth: 12 }
//         });
//       } catch (error) {
//         console.error('Error fetching stats:', error);
//       }
//     };

//     fetchAdminDetails();
//     fetchStats();
//   }, [userId, user?.token]);

//   // Profile update submission
//   const onProfileSubmit = async (data) => {
//     try {
//       const payload = {};
//       if (data.name) payload.name = data.name;
//       if (data.email) payload.email = data.email;
//       if (data.password) payload.password = data.password;

//       const response = await axios.post(
//         `${apiUrl}/memeber/admin/users/${userId}`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${user?.token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

//       if (response.data.status) {
//         toast.success('Profile updated successfully', {
//           position: 'top-right',
//           autoClose: 3000,
//           hideProgressBar: true,
//           closeButton: true,
//           draggable: true,
//           theme: 'dark',
//         });
//         setAdminData({ name: data.name || adminData.name, email: data.email || adminData.email });
//         setTimeout(() => {
//           setIsProfileOpen(false);
//           reset();
//         }, 1000);
//       } else {
//         toast.error(response.data.message || 'Failed to update profile', {
//           position: 'top-right',
//           autoClose: 3000,
//           hideProgressBar: true,
//           closeButton: true,
//           draggable: true,
//           theme: 'dark',
//         });
//       }
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Failed to update profile';
//       toast.error(errorMessage, {
//         position: 'top-right',
//         autoClose: 3000,
//         hideProgressBar: true,
//         closeButton: true,
//         draggable: true,
//         theme: 'dark',
//       });
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
//   };

//   const modalVariants = {
//     hidden: { opacity: 0, scale: 0.8, y: '-50%', x: '-50%' },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       y: '-50%',
//       x: '-50%',
//       transition: { duration: 0.4, type: 'spring', damping: 25, stiffness: 300 },
//     },
//     exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
//   };

//   return (
//     <div className="relative flex h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 p-6 overflow-y-auto">
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="flex items-center justify-between mb-6"
//         >
//           <h1 className="text-2xl font-bold text-gray-800">Welcome to Dashboard</h1>
//           <motion.button
//             whileHover={{ scale: 1.1, rotate: 360 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setIsProfileOpen(true)}
//             className="p-3 text-white rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500"
//           >
//             <User className="w-6 h-6" />
//           </motion.button>
//         </motion.div>

//         {/* Quick Actions */}
//         <motion.div
//           variants={cardVariants}
//           initial="hidden"
//           animate="visible"
//           transition={{ delay: 0.3 }}
//           className="p-6 bg-white shadow-lg rounded-xl"
//         >
//           <h2 className="mb-4 text-xl font-semibold text-gray-800">Quick Actions</h2>
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//             <button className="p-4 text-center transition-colors rounded-lg bg-blue-50 hover:bg-blue-100">
//               <Link to="/backend/slider">     
//                 <Images className="w-6 h-6 mx-auto mb-2 text-blue-600" />
//                 <span className="text-sm font-medium text-gray-700">Manage Slider</span>
//               </Link>
//             </button>
//             <button className="p-4 text-center transition-colors rounded-lg bg-purple-50 hover:bg-purple-100">
//               <Link to="/backend/gallery">
//                 <Image className="w-6 h-6 mx-auto mb-2 text-purple-600" />
//                 <span className="text-sm font-medium text-gray-700">Manage Gallery</span>
//               </Link>
//             </button>
//             <button className="p-4 text-center transition-colors rounded-lg bg-pink-50 hover:bg-pink-100">
//               <Link to="/backend/video">
//                 <Film className="w-6 h-6 mx-auto mb-2 text-pink-600" />
//                 <span className="text-sm font-medium text-gray-700">Manage Videos</span>
//               </Link>
//             </button>
//           </div>
//         </motion.div>

//         {/* Profile Modal */}
//         <AnimatePresence>
//           {isProfileOpen && (
//             <>
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 0.5 }}
//                 exit={{ opacity: 0 }}
//                 className="fixed inset-0 z-40 bg-black"
//                 onClick={() => setIsProfileOpen(false)}
//               />
//               <motion.div
//                 variants={modalVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="exit"
//                 className="fixed z-50 w-full max-w-md overflow-hidden bg-white shadow-2xl top-1/2 left-1/2 rounded-2xl"
//               >
//                 <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
//                   <motion.div
//                     className="flex items-center justify-between mb-6"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.2 }}
//                   >
//                     <h3 className="text-xl font-bold text-gray-800">Profile Settings</h3>
//                     <motion.button
//                       whileHover={{ rotate: 180, scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => setIsProfileOpen(false)}
//                       className="p-2 rounded-full bg-white/20"
//                     >
//                       <X className="w-5 h-5 text-gray-700" />
//                     </motion.button>
//                   </motion.div>

//                   <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-6">
//                     <motion.div
//                       initial={{ x: -20, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       transition={{ delay: 0.3 }}
//                     >
//                       <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
//                       <motion.input
//                         {...register('email', {
//                           pattern: {
//                             value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
//                             message: 'Invalid email format',
//                           },
//                         })}
//                         type="email"
//                         className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 ${errors.email ? 'border-red-400' : 'border-gray-200'
//                           }`}
//                         placeholder="Email"
//                       />
//                       {errors.email && (
//                         <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
//                       )}
//                     </motion.div>

//                     <motion.div
//                       initial={{ x: -20, opacity: 0 }}
//                       animate={{ x: 0, opacity: 1 }}
//                       transition={{ delay: 0.4 }}
//                     >
//                       <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
//                       <div className="relative">
//                         <motion.input
//                           {...register('password', {
//                             minLength: { value: 8, message: 'Password must be at least 8 characters' },
//                           })}
//                           type={showPassword ? 'text' : 'password'}
//                           className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 ${errors.password ? 'border-red-400' : 'border-gray-200'
//                             }`}
//                           placeholder="Password"
//                         />
//                         <motion.button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2"
//                         >
//                           {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
//                         </motion.button>
//                       </div>
//                       {errors.password && (
//                         <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
//                       )}
//                     </motion.div>

//                     <motion.div
//                       className="flex justify-end space-x-3"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.5 }}
//                     >
//                       <motion.button
//                         whileHover={{ scale: 1.05, y: -2 }}
//                         whileTap={{ scale: 0.95 }}
//                         type="button"
//                         onClick={() => setIsProfileOpen(false)}
//                         className="px-6 py-2 font-medium text-gray-700 bg-gray-200 rounded-lg"
//                       >
//                         Cancel
//                       </motion.button>
//                       <motion.button
//                         whileHover={{ scale: 1.05, y: -2 }}
//                         whileTap={{ scale: 0.95 }}
//                         type="submit"
//                         disabled={isSubmitting}
//                         className={`px-6 py-2 font-medium text-white rounded-lg shadow-md ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-500'
//                           }`}
//                       >
//                         {isSubmitting ? 'Updating...' : 'Update'}
//                       </motion.button>
//                     </motion.div>
//                   </form>
//                 </div>
//               </motion.div>
//             </>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import {
  User, X, Eye, EyeOff,
  Users, MessageSquare, Mail,
  Star, ArrowUpRight,
  MessageCircle
} from 'lucide-react';
import { apiUrl } from './https';
import { AdminAuthContext } from '../context/AdminAuth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AdminAuthContext);
  const [userId] = useState(1);
  const [adminData, setAdminData] = useState({ name: '', email: '' });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  // Data states
  const [users, setUsers] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [messages, setMessages] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: { name: '', email: '', password: '' },
  });

  // Fetch admin details
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/memeber/admin/users/${userId}`,
          { headers: { Authorization: `Bearer ${user?.token}` } }
        );
        const { name, email } = response.data.user || {};
        setAdminData({ name: name || 'Admin', email: email || '' });
      } catch (error) {
        console.error('Error fetching admin:', error);
        setAdminData({ name: 'Admin', email: '' });
      }
    };
    if (user?.token) fetchAdminDetails();
  }, [userId, user?.token]);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const headers = { Authorization: `Bearer ${user?.token}` };

        const [usersRes, newsRes, testiRes, msgRes] = await Promise.all([
          axios.get(`${apiUrl}/memeber/users`, { headers }).catch(() => ({ data: {} })),
          axios.get(`${apiUrl}/memeber/newsletters`, { headers }).catch(() => ({ data: {} })),
          axios.get(`${apiUrl}/memeber/testimonials`, { headers }).catch(() => ({ data: {} })),
          axios.get(`${apiUrl}/memeber/messages`, { headers }).catch(() => ({ data: {} })),
        ]);

        const extractArray = (res) =>
          res?.data?.data || res?.data?.users ||
          res?.data?.newsletters || res?.data?.testimonials ||
          res?.data?.messages || (Array.isArray(res?.data) ? res.data : []);

        setUsers(extractArray(usersRes));
        setNewsletters(extractArray(newsRes));
        setTestimonials(extractArray(testiRes));
        setMessages(extractArray(msgRes));
      } catch (error) {
        console.error('Dashboard fetch error:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchAll();
  }, [user?.token]);

  // Computed stats
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const usersThisMonth = users.filter(u => new Date(u.createdAt) >= startOfMonth).length;
  const unreadMessages = messages.filter(m => !m.isRead && !m.read).length;
  const approvedTestimonials = testimonials.filter(t => t.isApproved || t.status === 'approved').length;

  const onProfileSubmit = async (data) => {
    try {
      const payload = {};
      if (data.name) payload.name = data.name;
      if (data.email) payload.email = data.email;
      if (data.password) payload.password = data.password;

      const response = await axios.post(
        `${apiUrl}/memeber/admin/users/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.status) {
        toast.success('Profile updated successfully');
        setAdminData({
          name: data.name || adminData.name,
          email: data.email || adminData.email,
        });
        setTimeout(() => {
          setIsProfileOpen(false);
          reset();
        }, 800);
      } else {
        toast.error(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: i * 0.08, ease: 'easeOut' },
    }),
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: '-50%', x: '-50%' },
    visible: {
      opacity: 1, scale: 1, y: '-50%', x: '-50%',
      transition: { duration: 0.4, type: 'spring', damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  // Stat cards (4 metrics)
  const statCards = [
    {
      title: 'Total Users',
      value: users.length,
      subtitle: `${usersThisMonth} this month`,
      icon: Users,
      gradient: 'from-orange-500 to-amber-500',
      bg: 'from-orange-50 to-amber-50',
    },
    {
      title: 'Newsletter Subs',
      value: newsletters.length,
      subtitle: 'Total subscribers',
      icon: Mail,
      gradient: 'from-purple-500 to-pink-500',
      bg: 'from-purple-50 to-pink-50',
    },
    {
      title: 'Testimonials',
      value: testimonials.length,
      subtitle: `${approvedTestimonials} approved`,
      icon: Star,
      gradient: 'from-yellow-500 to-orange-500',
      bg: 'from-yellow-50 to-orange-50',
    },
    {
      title: 'Messages',
      value: messages.length,
      subtitle: `${unreadMessages} unread`,
      icon: MessageSquare,
      gradient: 'from-pink-500 to-rose-500',
      bg: 'from-pink-50 to-rose-50',
    },
  ];

  // Recent 5 messages
  const recentMessages = [...messages]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="relative flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome back, {adminData.name}! 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Here's your store overview
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsProfileOpen(true)}
            className="p-3 text-white rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500"
          >
            <User className="w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6 lg:grid-cols-4">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -4 }}
                className={`p-5 bg-gradient-to-br ${card.bg} rounded-2xl shadow-sm border border-white/60`}
              >
                <div className={`inline-flex p-2.5 rounded-xl bg-gradient-to-br ${card.gradient} shadow-md mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {card.title}
                </p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {loading ? '—' : card.value}
                </p>
                <p className="text-xs text-gray-500 mt-1 truncate">{card.subtitle}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Unread Alert + Quick Actions */}
        <div className="grid grid-cols-1 gap-5 mb-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-5 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-pink-500 rounded-lg">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">Unread Messages</h3>
            </div>
            <p className="text-3xl font-bold text-pink-600">
              {loading ? '—' : unreadMessages}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              {messages.length} total messages
            </p>
            <Link
              to="/backend/message"
              className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-pink-700 hover:text-pink-800"
            >
              View messages <ArrowUpRight className="w-3 h-3" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-5 bg-white rounded-2xl shadow-sm border border-gray-100 lg:col-span-2"
          >
            <h3 className="mb-4 font-semibold text-gray-800">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Link to="/backend/users" className="p-3 text-center rounded-xl bg-orange-50 hover:bg-orange-100 group">
                <Users className="w-5 h-5 mx-auto mb-1.5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-gray-700">Users</span>
              </Link>
              <Link to="/backend/newsletter" className="p-3 text-center rounded-xl bg-purple-50 hover:bg-purple-100 group">
                <Mail className="w-5 h-5 mx-auto mb-1.5 text-purple-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-gray-700">Newsletter</span>
              </Link>
              <Link to="/backend/testimonial" className="p-3 text-center rounded-xl bg-yellow-50 hover:bg-yellow-100 group">
                <Star className="w-5 h-5 mx-auto mb-1.5 text-yellow-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-gray-700">Reviews</span>
              </Link>
              <Link to="/backend/message" className="p-3 text-center rounded-xl bg-pink-50 hover:bg-pink-100 group">
                <MessageSquare className="w-5 h-5 mx-auto mb-1.5 text-pink-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-gray-700">Messages</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Recent Messages (full width) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-pink-600" />
              <h3 className="font-semibold text-gray-800">Recent Messages</h3>
              {unreadMessages > 0 && (
                <span className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full font-medium">
                  {unreadMessages} new
                </span>
              )}
            </div>
            <Link to="/backend/message" className="text-xs text-pink-600 hover:underline font-medium">
              View All
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {loading ? (
              <div className="p-8 text-center text-gray-400 text-sm">Loading...</div>
            ) : recentMessages.length === 0 ? (
              <div className="p-8 text-center">
                <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400">No messages yet</p>
              </div>
            ) : (
              recentMessages.map((msg) => (
                <div key={msg._id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-gray-800">
                      {msg.name || msg.fullName || 'Unknown'}
                    </p>
                    {!(msg.isRead || msg.read) && (
                      <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {msg.subject || msg.email || ''}
                  </p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">
                    {msg.message || msg.content || ''}
                  </p>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Profile Modal */}
        <AnimatePresence>
          {isProfileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-black"
                onClick={() => setIsProfileOpen(false)}
              />
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed z-50 w-full max-w-md overflow-hidden bg-white shadow-2xl top-1/2 left-1/2 rounded-2xl"
              >
                <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Profile Settings</h3>
                    <motion.button
                      whileHover={{ rotate: 180, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsProfileOpen(false)}
                      className="p-2 rounded-full bg-white/20"
                    >
                      <X className="w-5 h-5 text-gray-700" />
                    </motion.button>
                  </div>

                  <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-5">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                      <input
                        {...register('name')}
                        type="text"
                        defaultValue={adminData.name}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                      <input
                        {...register('email', {
                          pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                            message: 'Invalid email format',
                          },
                        })}
                        type="email"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 ${
                          errors.email ? 'border-red-400' : 'border-gray-200'
                        }`}
                        placeholder="Email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                      <div className="relative">
                        <input
                          {...register('password', {
                            minLength: { value: 8, message: 'Password must be at least 8 characters' },
                          })}
                          type={showPassword ? 'text' : 'password'}
                          className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 ${
                            errors.password ? 'border-red-400' : 'border-gray-200'
                          }`}
                          placeholder="New password (leave blank to keep)"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2"
                        >
                          {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                      )}
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsProfileOpen(false)}
                        className="px-6 py-2 font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 font-medium text-white rounded-lg shadow-md ${
                          isSubmitting
                            ? 'bg-blue-300 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-500 to-purple-500'
                        }`}
                      >
                        {isSubmitting ? 'Updating...' : 'Update'}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;