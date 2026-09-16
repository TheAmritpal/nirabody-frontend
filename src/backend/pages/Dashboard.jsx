// import React, { useState, useEffect, useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { motion, AnimatePresence } from 'framer-motion';
// import Sidebar from './Sidebar';
// import { User, X, Eye, EyeOff, Image, Film, Images } from 'lucide-react';
// import { apiUrl } from './https';
// import { AdminAuthContext } from '../context/AdminAuth';
// import { toast } from 'react-toastify';
// import Loading from '../../common/Loading';
// import { Link } from 'react-router-dom';

// const Dashboard = () => {
//   const { user, isAuthenticated } = useContext(AdminAuthContext);
//   const [userId, setUserId] = useState(1); // Replace with auth context
//   const [adminData, setAdminData] = useState({ name: '', email: '' });
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
  
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
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching stats:', error);
//         setIsLoading(false);
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

//   // Function to get icon based on type
//   const getIcon = (type) => {
//     switch(type) {
//       case 'slider':
//         return <Images className="w-8 h-8 text-blue-500" />;
//       case 'gallery':
//         return <Image className="w-8 h-8 text-purple-500" />;
//       case 'video':
//         return <Film className="w-8 h-8 text-pink-500" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="relative flex h-screen bg-gray-100">
//       <Sidebar />
//       {isLoading ?
//         <div className="flex-1 p-6 overflow-y-auto">
//           <Loading />
//         </div> :
//         <div className="flex-1 p-6 overflow-y-auto">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex items-center justify-between mb-6"
//           >
//             <h1 className="text-2xl font-bold text-gray-800">Welcome to Dashboard</h1>
//             <motion.button
//               whileHover={{ scale: 1.1, rotate: 360 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsProfileOpen(true)}
//               className="p-3 text-white rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500"
//             >
//               <User className="w-6 h-6" />
//             </motion.button>
//           </motion.div>

//           {/* Three Stats Cards - Slider, Gallery, Video */}
//           {/* <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-3">
            
//             <motion.div 
//               variants={cardVariants} 
//               initial="hidden" 
//               animate="visible"
//               className="p-6 transition-shadow bg-white shadow-lg rounded-xl hover:shadow-xl"
//             >
//               <div className="flex items-center space-x-4">
//                 <motion.div 
//                   whileHover={{ rotate: 360 }} 
//                   transition={{ duration: 0.5 }}
//                   className="p-3 bg-blue-100 rounded-lg"
//                 >
//                   <Images className="w-8 h-8 text-blue-600" />
//                 </motion.div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Slider Images</p>
//                   <motion.h3
//                     className="text-3xl font-bold text-gray-800"
//                     initial={{ opacity: 0, scale: 0.5 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.5, delay: 0.2 }}
//                   >
//                     {stats.slider.total}
//                   </motion.h3>
//                   <p className="text-xs text-green-600">
//                     +{stats.slider.currentMonth} this month
//                   </p>
//                 </div>
//               </div>
//             </motion.div>

           
//             <motion.div 
//               variants={cardVariants} 
//               initial="hidden" 
//               animate="visible"
//               transition={{ delay: 0.1 }}
//               className="p-6 transition-shadow bg-white shadow-lg rounded-xl hover:shadow-xl"
//             >
//               <div className="flex items-center space-x-4">
//                 <motion.div 
//                   whileHover={{ rotate: 360 }} 
//                   transition={{ duration: 0.5 }}
//                   className="p-3 bg-purple-100 rounded-lg"
//                 >
//                   <Image className="w-8 h-8 text-purple-600" />
//                 </motion.div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Gallery Photos</p>
//                   <motion.h3
//                     className="text-3xl font-bold text-gray-800"
//                     initial={{ opacity: 0, scale: 0.5 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.5, delay: 0.3 }}
//                   >
//                     {stats.gallery.total}
//                   </motion.h3>
//                   <p className="text-xs text-green-600">
//                     +{stats.gallery.currentMonth} this month
//                   </p>
//                 </div>
//               </div>
//             </motion.div>

            
//             <motion.div 
//               variants={cardVariants} 
//               initial="hidden" 
//               animate="visible"
//               transition={{ delay: 0.2 }}
//               className="p-6 transition-shadow bg-white shadow-lg rounded-xl hover:shadow-xl"
//             >
//               <div className="flex items-center space-x-4">
//                 <motion.div 
//                   whileHover={{ rotate: 360 }} 
//                   transition={{ duration: 0.5 }}
//                   className="p-3 bg-pink-100 rounded-lg"
//                 >
//                   <Film className="w-8 h-8 text-pink-600" />
//                 </motion.div>
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Videos</p>
//                   <motion.h3
//                     className="text-3xl font-bold text-gray-800"
//                     initial={{ opacity: 0, scale: 0.5 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ duration: 0.5, delay: 0.4 }}
//                   >
//                     {stats.video.total}
//                   </motion.h3>
//                   <p className="text-xs text-green-600">
//                     +{stats.video.currentMonth} this month
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           </div> */}

//           {/* Optional: Add a recent activity section or keep it minimal */}
//           <motion.div
//             variants={cardVariants}
//             initial="hidden"
//             animate="visible"
//             transition={{ delay: 0.3 }}
//             className="p-6 bg-white shadow-lg rounded-xl"
//           >
//             <h2 className="mb-4 text-xl font-semibold text-gray-800">Quick Actions</h2>
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//               <button className="p-4 text-center transition-colors rounded-lg bg-blue-50 hover:bg-blue-100">
//               <Link to="/backend/slider">     
//                 <Images className="w-6 h-6 mx-auto mb-2 text-blue-600" />
//                 <span className="text-sm font-medium text-gray-700">Manage Slider</span>
//                 </Link>
//               </button>
//               <button className="p-4 text-center transition-colors rounded-lg bg-purple-50 hover:bg-purple-100">
//               <Link to="/backend/gallery">
//                 <Image className="w-6 h-6 mx-auto mb-2 text-purple-600" />
//                 <span className="text-sm font-medium text-gray-700">Manage Gallery</span>
//                 </Link>
//               </button>
//               <button className="p-4 text-center transition-colors rounded-lg bg-pink-50 hover:bg-pink-100">
//               <Link to="/backend/video">
//                 <Film className="w-6 h-6 mx-auto mb-2 text-pink-600" />
//                 <span className="text-sm font-medium text-gray-700">Manage Videos</span>
//               </Link>
//               </button>
//             </div>
//           </motion.div>

//           {/* Profile Modal */}
//           <AnimatePresence>
//             {isProfileOpen && (
//               <>
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 0.5 }}
//                   exit={{ opacity: 0 }}
//                   className="fixed inset-0 z-40 bg-black"
//                   onClick={() => setIsProfileOpen(false)}
//                 />
//                 <motion.div
//                   variants={modalVariants}
//                   initial="hidden"
//                   animate="visible"
//                   exit="exit"
//                   className="fixed z-50 w-full max-w-md overflow-hidden bg-white shadow-2xl top-1/2 left-1/2 rounded-2xl"
//                 >
//                   <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
//                     <motion.div
//                       className="flex items-center justify-between mb-6"
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: 0.2 }}
//                     >
//                       <h3 className="text-xl font-bold text-gray-800">Profile Settings</h3>
//                       <motion.button
//                         whileHover={{ rotate: 180, scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => setIsProfileOpen(false)}
//                         className="p-2 rounded-full bg-white/20"
//                       >
//                         <X className="w-5 h-5 text-gray-700" />
//                       </motion.button>
//                     </motion.div>

//                     <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-6">
//                       <motion.div
//                         initial={{ x: -20, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{ delay: 0.3 }}
//                       >
//                         <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
//                         <motion.input
//                           {...register('email', {
//                             pattern: {
//                               value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
//                               message: 'Invalid email format',
//                             },
//                           })}
//                           type="email"
//                           className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 ${errors.email ? 'border-red-400' : 'border-gray-200'
//                             }`}
//                           placeholder="Email"
//                         />
//                         {errors.email && (
//                           <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
//                         )}
//                       </motion.div>

//                       <motion.div
//                         initial={{ x: -20, opacity: 0 }}
//                         animate={{ x: 0, opacity: 1 }}
//                         transition={{ delay: 0.4 }}
//                       >
//                         <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
//                         <div className="relative">
//                           <motion.input
//                             {...register('password', {
//                               minLength: { value: 8, message: 'Password must be at least 8 characters' },
//                             })}
//                             type={showPassword ? 'text' : 'password'}
//                             className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 ${errors.password ? 'border-red-400' : 'border-gray-200'
//                               }`}
//                             placeholder="Password"
//                           />
//                           <motion.button
//                             type="button"
//                             onClick={() => setShowPassword(!showPassword)}
//                             className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2"
//                           >
//                             {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
//                           </motion.button>
//                         </div>
//                         {errors.password && (
//                           <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
//                         )}
//                       </motion.div>

//                       <motion.div
//                         className="flex justify-end space-x-3"
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.5 }}
//                       >
//                         <motion.button
//                           whileHover={{ scale: 1.05, y: -2 }}
//                           whileTap={{ scale: 0.95 }}
//                           type="button"
//                           onClick={() => setIsProfileOpen(false)}
//                           className="px-6 py-2 font-medium text-gray-700 bg-gray-200 rounded-lg"
//                         >
//                           Cancel
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.05, y: -2 }}
//                           whileTap={{ scale: 0.95 }}
//                           type="submit"
//                           disabled={isSubmitting}
//                           className={`px-6 py-2 font-medium text-white rounded-lg shadow-md ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-500'
//                             }`}
//                         >
//                           {isSubmitting ? 'Updating...' : 'Update'}
//                         </motion.button>
//                       </motion.div>
//                     </form>
//                   </div>
//                 </motion.div>
//               </>
//             )}
//           </AnimatePresence>
//         </div>
//       }
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import { User, X, Eye, EyeOff, Image, Film, Images } from 'lucide-react';
import { apiUrl } from './https';
import { AdminAuthContext } from '../context/AdminAuth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, isAuthenticated } = useContext(AdminAuthContext);
  const [userId, setUserId] = useState(1); // Replace with auth context
  const [adminData, setAdminData] = useState({ name: '', email: '' });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Stats for new boxes
  const [stats, setStats] = useState({
    slider: { total: 0, currentMonth: 0 },
    gallery: { total: 0, currentMonth: 0 },
    video: { total: 0, currentMonth: 0 }
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  // Fetch admin details and stats
  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/memeber/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        const { name, email } = response.data.user;
        setAdminData({ name, email });
      } catch (error) {
        console.error('Error fetching admin details:', error);
        setAdminData({ name: 'Problem', email: 'Problem' });
      }
    };

    const fetchStats = async () => {
      try {
        // You can replace these with actual API endpoints for your data
        // For now using mock data
        setStats({
          slider: { total: 124, currentMonth: 18 },
          gallery: { total: 356, currentMonth: 42 },
          video: { total: 89, currentMonth: 12 }
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchAdminDetails();
    fetchStats();
  }, [userId, user?.token]);

  // Profile update submission
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
        toast.success('Profile updated successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
          draggable: true,
          theme: 'dark',
        });
        setAdminData({ name: data.name || adminData.name, email: data.email || adminData.email });
        setTimeout(() => {
          setIsProfileOpen(false);
          reset();
        }, 1000);
      } else {
        toast.error(response.data.message || 'Failed to update profile', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: true,
          draggable: true,
          theme: 'dark',
        });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update profile';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeButton: true,
        draggable: true,
        theme: 'dark',
      });
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: '-50%', x: '-50%' },
    visible: {
      opacity: 1,
      scale: 1,
      y: '-50%',
      x: '-50%',
      transition: { duration: 0.4, type: 'spring', damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-800">Welcome to Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 360 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsProfileOpen(true)}
            className="p-3 text-white rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500"
          >
            <User className="w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="p-6 bg-white shadow-lg rounded-xl"
        >
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <button className="p-4 text-center transition-colors rounded-lg bg-blue-50 hover:bg-blue-100">
              <Link to="/backend/slider">     
                <Images className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Manage Slider</span>
              </Link>
            </button>
            <button className="p-4 text-center transition-colors rounded-lg bg-purple-50 hover:bg-purple-100">
              <Link to="/backend/gallery">
                <Image className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Manage Gallery</span>
              </Link>
            </button>
            <button className="p-4 text-center transition-colors rounded-lg bg-pink-50 hover:bg-pink-100">
              <Link to="/backend/video">
                <Film className="w-6 h-6 mx-auto mb-2 text-pink-600" />
                <span className="text-sm font-medium text-gray-700">Manage Videos</span>
              </Link>
            </button>
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
                  <motion.div
                    className="flex items-center justify-between mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-xl font-bold text-gray-800">Profile Settings</h3>
                    <motion.button
                      whileHover={{ rotate: 180, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsProfileOpen(false)}
                      className="p-2 rounded-full bg-white/20"
                    >
                      <X className="w-5 h-5 text-gray-700" />
                    </motion.button>
                  </motion.div>

                  <form onSubmit={handleSubmit(onProfileSubmit)} className="space-y-6">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                      <motion.input
                        {...register('email', {
                          pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                            message: 'Invalid email format',
                          },
                        })}
                        type="email"
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 ${errors.email ? 'border-red-400' : 'border-gray-200'
                          }`}
                        placeholder="Email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
                      <div className="relative">
                        <motion.input
                          {...register('password', {
                            minLength: { value: 8, message: 'Password must be at least 8 characters' },
                          })}
                          type={showPassword ? 'text' : 'password'}
                          className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 ${errors.password ? 'border-red-400' : 'border-gray-200'
                            }`}
                          placeholder="Password"
                        />
                        <motion.button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute text-gray-500 transform -translate-y-1/2 right-3 top-1/2"
                        >
                          {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </motion.button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                      )}
                    </motion.div>

                    <motion.div
                      className="flex justify-end space-x-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => setIsProfileOpen(false)}
                        className="px-6 py-2 font-medium text-gray-700 bg-gray-200 rounded-lg"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-6 py-2 font-medium text-white rounded-lg shadow-md ${isSubmitting ? 'bg-blue-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                          }`}
                      >
                        {isSubmitting ? 'Updating...' : 'Update'}
                      </motion.button>
                    </motion.div>
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