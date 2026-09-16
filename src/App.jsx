// import React from 'react'
// import { Routes, Route, useLocation } from 'react-router-dom'
// import { CartProvider } from './context/CartContext'
// import { AuthProvider } from './context/AuthContext'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
// import ProtectedRoute from './components/ProtectedRoute'
// import HomePage from './pages/HomePage'
// import ShopAll from './pages/ShopAll'
// import ProductPage from './pages/ProductPage'
// import AboutUs from './pages/AboutUs'
// import RitualGuide from './pages/RitualGuide'
// import Blog from './pages/Blog'
// import BlogDetail from './pages/BlogDetail'
// import Contact from './pages/Contact'
// import FAQs from './pages/FAQs'
// import ShippingPolicy from './pages/ShippingPolicy'
// import ReturnsPolicy from './pages/ReturnsPolicy'
// import PrivacyPolicy from './pages/PrivacyPolicy'
// import Checkout from './pages/Checkout'
// import OrderConfirmation from './pages/OrderConfirmation'
// import Login from './pages/Login'
// import UserProfile from './pages/UserProfile'
// import AdminLogin from './backend/pages/AdminLogin'
// import { AdminRequireAuth } from './backend/pages/AdminRequireAuth'
// import Dashboard from './backend/pages/Dashboard'
// import MessageManager from './backend/pages/websitechange/MessageManager'
// import SliderManager from './backend/pages/websitechange/SliderManager'
// import TestimonialManager from './backend/pages/websitechange/TestimonialManager'
// import SiteSettingsManager from './backend/pages/websitechange/SiteSettingsManager'
// import CategoryManager from './backend/pages/websitechange/CategoryManager'
// import ProductManager from './backend/pages/websitechange/ProductManager'
// import Signup from './pages/Signup'
// import UserManager from './backend/pages/websitechange/UserManager'
// import OrderManager from './backend/pages/websitechange/OrderManager'
// import BlogManager from './backend/pages/websitechange/BlogManager';
// import BlogCategoryManager from './backend/pages/websitechange/BlogCategoryManager';
// import NewsletterManager from './backend/pages/websitechange/NewsletterManager'

// function AppContent() {
//   const location = useLocation()

//   // Check if current path is admin route
//   const isAdminRoute = location.pathname.startsWith('/backend')

//   return (
//     <div className="min-h-screen flex flex-col bg-ivory">
//       {!isAdminRoute && <Navbar />}
//       <main className={!isAdminRoute ? "flex-grow" : "flex-grow"}>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/shop" element={<ShopAll />} />
//           <Route path="/product/:id" element={<ProductPage />} />
//           <Route path="/about" element={<AboutUs />} />
//           <Route path="/ritual-guide" element={<RitualGuide />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/blog/:slug" element={<BlogDetail />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/faqs" element={<FAQs />} />
//           <Route path="/shipping-policy" element={<ShippingPolicy />} />
//           <Route path="/returns-policy" element={<ReturnsPolicy />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
          

//           {/* Protected Routes - require login */}
//           <Route path="/checkout" element={
//             <ProtectedRoute>
//               <Checkout />
//             </ProtectedRoute>
//           } />
//           <Route path="/order-confirmation/:orderId" element={
//             <ProtectedRoute>
//               <OrderConfirmation />
//             </ProtectedRoute>
//           } />
//           <Route path="/profile" element={
//             <ProtectedRoute>
//               <UserProfile />
//             </ProtectedRoute>
//           } />

//           {/* Backend routes */}
//           <Route path="/backend/login" element={<AdminLogin />} />
//           <Route
//             path="/backend/dashboard"
//             element={
//               <AdminRequireAuth>
//                 <Dashboard />
//               </AdminRequireAuth>
//             }
//           />
//           <Route
//             path="/backend/message"
//             element={
//               <AdminRequireAuth>
//                 <MessageManager />
//               </AdminRequireAuth>
//             }
//           />
//           <Route
//             path="/backend/slider"
//             element={
//               <AdminRequireAuth>
//                 <SliderManager />
//               </AdminRequireAuth>
//             }
//           />
//           <Route
//             path="/backend/testimonial"
//             element={
//               <AdminRequireAuth>
//                 <TestimonialManager />
//               </AdminRequireAuth>
//             }
//           />

//           <Route
//             path="/backend/settings"
//             element={
//               <AdminRequireAuth>
//                 <SiteSettingsManager />
//               </AdminRequireAuth>
//             }
//           />

       
// <Route
//   path="/backend/categories"
//   element={
//     <AdminRequireAuth>
//       <CategoryManager />
//     </AdminRequireAuth>
//   }
// />

// <Route
//   path="/backend/products"
//   element={
//     <AdminRequireAuth>
//       <ProductManager />
//     </AdminRequireAuth>
//   }
// />

// <Route
//   path="/backend/users"
//   element={
//     <AdminRequireAuth>
//       <UserManager />
//     </AdminRequireAuth>
//   }
// />

// <Route
//   path="/backend/orders"
//   element={
//     <AdminRequireAuth>
//       <OrderManager/>
//     </AdminRequireAuth>
//   }
// />

// <Route
//   path="/backend/blog"
//   element={
//     <AdminRequireAuth>
//       <BlogManager />
//     </AdminRequireAuth>
//   }
// />

// <Route
//   path="/backend/blog-categories"
//   element={
//     <AdminRequireAuth>
//       <BlogCategoryManager />
//     </AdminRequireAuth>
//   }
// />

// <Route
//   path="/backend/newsletter"
//   element={
//     <AdminRequireAuth>
//       <NewsletterManager />
//     </AdminRequireAuth>
//   }
// />

//         </Routes>
//       </main>
//       {!isAdminRoute && <Footer />}
//     </div>
//   )
// }

// function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <AppContent />
//       </CartProvider>
//     </AuthProvider>
//   )
// }

// export default App

// App.jsx
import React, { lazy, Suspense, useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { AppDataProvider, useAppData } from './context/AppDataContext'
import FullPageLoader from './components/FullPageLoader'
import ComponentLoader from './components/ComponentLoader'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

// Lazy load all pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'))
const ShopAll = lazy(() => import('./pages/ShopAll'))
const ProductPage = lazy(() => import('./pages/ProductPage'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const RitualGuide = lazy(() => import('./pages/RitualGuide'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogDetail = lazy(() => import('./pages/BlogDetail'))
const Contact = lazy(() => import('./pages/Contact'))
const FAQs = lazy(() => import('./pages/FAQs'))
const ShippingPolicy = lazy(() => import('./pages/ShippingPolicy'))
const ReturnsPolicy = lazy(() => import('./pages/ReturnsPolicy'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const UserProfile = lazy(() => import('./pages/UserProfile'))

// Lazy load admin components
const AdminLogin = lazy(() => import('./backend/pages/AdminLogin'))
const Dashboard = lazy(() => import('./backend/pages/Dashboard'))
const MessageManager = lazy(() => import('./backend/pages/websitechange/MessageManager'))
const SliderManager = lazy(() => import('./backend/pages/websitechange/SliderManager'))
const TestimonialManager = lazy(() => import('./backend/pages/websitechange/TestimonialManager'))
const SiteSettingsManager = lazy(() => import('./backend/pages/websitechange/SiteSettingsManager'))
const CategoryManager = lazy(() => import('./backend/pages/websitechange/CategoryManager'))
const ProductManager = lazy(() => import('./backend/pages/websitechange/ProductManager'))
const UserManager = lazy(() => import('./backend/pages/websitechange/UserManager'))
const OrderManager = lazy(() => import('./backend/pages/websitechange/OrderManager'))
const BlogManager = lazy(() => import('./backend/pages/websitechange/BlogManager'))
const BlogCategoryManager = lazy(() => import('./backend/pages/websitechange/BlogCategoryManager'))
const NewsletterManager = lazy(() => import('./backend/pages/websitechange/NewsletterManager'))

// Lazy load AdminRequireAuth
const AdminRequireAuth = lazy(() => import('./backend/pages/AdminRequireAuth'))

// App Content with Data Loading
function AppContentWithLoader() {
  const { isLoadingComplete, progress, loadingText } = useAppData()
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (isLoadingComplete) {
      const timer = setTimeout(() => {
        setShowLoader(false)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isLoadingComplete])

  if (showLoader) {
    return <FullPageLoader progress={progress} loadingText={loadingText} />
  }

  return <AppContent />
}

// Main App Content
function AppContent() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/backend')

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Suspense fallback={<ComponentLoader />}>
          <Routes>
            {/* Frontend Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopAll />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/ritual-guide" element={<RitualGuide />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/returns-policy" element={<ReturnsPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route path="/checkout" element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/order-confirmation/:orderId" element={
              <ProtectedRoute>
                <OrderConfirmation />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />

            {/* Backend Routes */}
            <Route path="/backend/login" element={
              <Suspense fallback={<ComponentLoader />}>
                <AdminLogin />
              </Suspense>
            } />
            
            <Route path="/backend/dashboard" element={
              <Suspense fallback={<ComponentLoader />}>
                <AdminRequireAuth>
                  <Dashboard />
                </AdminRequireAuth>
              </Suspense>
            } />
            
            <Route path="/backend/message" element={
              <Suspense fallback={<ComponentLoader />}>
                <AdminRequireAuth>
                  <MessageManager />
                </AdminRequireAuth>
              </Suspense>
            } />
            
            <Route path="/backend/slider" element={
              <Suspense fallback={<ComponentLoader />}>
                <AdminRequireAuth>
                  <SliderManager />
                </AdminRequireAuth>
              </Suspense>
            } />
            
            <Route path="/backend/testimonial" element={
              <Suspense fallback={<ComponentLoader />}>
                <AdminRequireAuth>
                  <TestimonialManager />
                </AdminRequireAuth>
              </Suspense>
            } />
            
            <Route path="/backend/settings" element={
              <Suspense fallback={<ComponentLoader />}>
                <AdminRequireAuth>
                  <SiteSettingsManager />
                </AdminRequireAuth>
              </Suspense>
            } />
            
            <Route path="/backend/categories" element={
              <Suspense fallback={<ComponentLoader />}>
                <AdminRequireAuth>
                  <CategoryManager />
                </AdminRequireAuth>
              </Suspense>
            } />
            
            <Route path="/backend/products" element={
              <Suspense fallback={<ComponentLoader />}>
                <AdminRequireAuth>
                  <ProductManager />
                </AdminRequireAuth>
              </Suspense>
            } />
            
            <Route path="/backend/users" element={
              <Suspense fallback={<ComponentLoader />}>
                <AdminRequireAuth>
                  <UserManager />
                </AdminRequireAuth>
              </Suspense>
            } />
            
            <Route path="/backend/orders" element={
              <Suspense fallback={<ComponentLoader />}>
                <AdminRequireAuth>
                  <OrderManager />
                </AdminRequireAuth>
              </Suspense>
            } />
            
            <Route path="/backend/blog" element={
              <Suspense fallback={<ComponentLoader />}>
                <AdminRequireAuth>
                  <BlogManager />
                </AdminRequireAuth>
              </Suspense>
            } />
            
            <Route path="/backend/blog-categories" element={
              <Suspense fallback={<ComponentLoader />}>
                <AdminRequireAuth>
                  <BlogCategoryManager />
                </AdminRequireAuth>
              </Suspense>
            } />
            
            <Route path="/backend/newsletter" element={
              <Suspense fallback={<ComponentLoader />}>
                <AdminRequireAuth>
                  <NewsletterManager />
                </AdminRequireAuth>
              </Suspense>
            } />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  )
}

// Main App Component
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppDataProvider>
          <AppContentWithLoader />
        </AppDataProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App