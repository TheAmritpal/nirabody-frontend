// // pages/Blog.jsx
// import React, { useState, useEffect } from 'react'
// import { motion } from 'framer-motion'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import { apiUrl } from '../backend/pages/https'
// import { getImageUrl } from '../Helper'
// import Newsletter from '../components/Newsletter'

// const Blog = () => {
//   const [blogs, setBlogs] = useState([])
//   const [categories, setCategories] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [selectedCategory, setSelectedCategory] = useState('all')
//   const [searchTerm, setSearchTerm] = useState('')

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [blogsRes, categoriesRes] = await Promise.all([
//           axios.get(`${apiUrl}/blogs`),
//           axios.get(`${apiUrl}/blog-categories/active`)
//         ])

//         if (blogsRes.data.status) setBlogs(blogsRes.data.data || [])
//         if (categoriesRes.data.status) setCategories(categoriesRes.data.data || [])
//       } catch (error) {
//         console.error('Error fetching blog data:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchData()
//   }, [])

//   const filteredPosts = blogs.filter(post => {
//     const matchesCategory = selectedCategory === 'all' || post.category?.slug === selectedCategory
//     const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                           (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
//     return matchesCategory && matchesSearch
//   })

//   const featuredPost = blogs.find(post => post.is_featured) || blogs[0]

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-ivory flex items-center justify-center">
//         <div className="w-12 h-12 border-4 border-terracotta rounded-full border-t-transparent animate-spin"></div>
//       </div>
//     )
//   }

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-ivory"
//     >
//       {/* Hero Section */}
//       <div className="relative bg-gradient-to-r from-warm-brown to-terracotta py-16 md:py-20">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
//         </div>
//         <div className="relative z-10 text-center px-4">
//           <motion.h1 
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             className="font-serif text-4xl md:text-5xl text-ivory mb-4"
//           >
//             The NIRA Journal
//           </motion.h1>
//           <motion.p 
//             initial={{ y: 30, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="text-ivory/90 text-base md:text-lg max-w-2xl mx-auto"
//           >
//             Wellness insights, skincare wisdom, and ritual inspiration
//           </motion.p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        
//         {/* Search and Filter Bar */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-12"
//         >
//           <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
//             {/* Search */}
//             <div className="relative w-full md:w-80">
//               <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-brown-light"></i>
//               <input
//                 type="text"
//                 placeholder="Search articles..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-12 pr-4 py-3 border border-sand rounded-full focus:outline-none focus:border-terracotta bg-ivory text-warm-brown"
//               />
//             </div>
            
//             {/* Category Filters */}
//             <div className="flex flex-wrap gap-2 justify-center">
//               <button
//                 onClick={() => setSelectedCategory('all')}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm ${
//                   selectedCategory === 'all'
//                     ? 'bg-terracotta text-ivory'
//                     : 'bg-sand/20 text-warm-brown hover:bg-sand/40'
//                 }`}
//               >
//                 <i className="fas fa-newspaper"></i>
//                 <span>All Posts</span>
//               </button>
//               {categories.map((category) => (
//                 <button
//                   key={category.id}
//                   onClick={() => setSelectedCategory(category.slug)}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm ${
//                     selectedCategory === category.slug
//                       ? 'bg-terracotta text-ivory'
//                       : 'bg-sand/20 text-warm-brown hover:bg-sand/40'
//                   }`}
//                 >
//                   <i className={category.icon || 'fas fa-tag'}></i>
//                   <span>{category.name}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </motion.div>

//         {/* Featured Post */}
//         {selectedCategory === 'all' && searchTerm === '' && featuredPost && (
//           <motion.div 
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="mb-16"
//           >
//             <div className="bg-gradient-to-r from-sand/30 to-sand/10 rounded-2xl overflow-hidden border border-sand/50">
//               <div className="flex flex-col md:flex-row">
//                 <div className="md:w-1/2 h-64 md:h-auto">
//                   <img 
//                     src={getImageUrl(featuredPost.image)} 
//                     alt={featuredPost.title}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="flex-1 p-6 md:p-8">
//                   <div className="flex items-center gap-3 mb-3">
//                     <span className="bg-terracotta/10 text-terracotta text-xs px-3 py-1 rounded-full">
//                       Featured
//                     </span>
//                     <span className="text-warm-brown-light text-sm">{new Date(featuredPost.published_at).toLocaleDateString('en-IN')}</span>
//                     <span className="text-warm-brown-light text-sm">•</span>
//                     <span className="text-warm-brown-light text-sm">{featuredPost.read_time}</span>
//                   </div>
//                   <h2 className="font-serif text-2xl md:text-3xl text-warm-brown mb-3">
//                     {featuredPost.title}
//                   </h2>
//                   <p className="text-warm-brown-light mb-4">
//                     {featuredPost.excerpt}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-warm-brown font-medium">{featuredPost.author}</p>
//                       <p className="text-warm-brown-light text-sm">{featuredPost.author_role}</p>
//                     </div>
//                     <Link 
//                       to={`/blog/${featuredPost.slug}`}
//                       className="text-terracotta hover:text-warm-brown transition-colors"
//                     >
//                       Read More →
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* Blog Posts Grid */}
//         {filteredPosts.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredPosts.map((post, index) => (
//               <motion.article
//                 key={post.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.05 }}
//                 className="bg-ivory rounded-xl overflow-hidden border border-sand/50 hover:shadow-xl transition-all duration-300 group"
//               >
//                 {/* Image */}
//                 <div className="relative h-56 overflow-hidden">
//                   <img 
//                     src={getImageUrl(post.image)} 
//                     alt={post.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute top-4 left-4">
//                     <span className="bg-terracotta text-ivory text-xs px-3 py-1 rounded-full">
//                       {post.category?.name}
//                     </span>
//                   </div>
//                 </div>
                
//                 {/* Content */}
//                 <div className="p-6">
//                   <div className="flex items-center gap-2 text-xs text-warm-brown-light mb-3">
//                     <span>{new Date(post.published_at).toLocaleDateString('en-IN')}</span>
//                     <span>•</span>
//                     <span>{post.read_time}</span>
//                   </div>
//                   <h3 className="font-serif text-xl text-warm-brown mb-2 line-clamp-2">
//                     {post.title}
//                   </h3>
//                   <p className="text-warm-brown-light text-sm mb-4 line-clamp-3">
//                     {post.excerpt}
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <div className="flex flex-wrap gap-1">
//                       {post.tags && post.tags.slice(0, 2).map((tag, i) => (
//                         <span key={i} className="text-terracotta text-xs">#{tag}</span>
//                       ))}
//                     </div>
//                     <Link 
//                       to={`/blog/${post.slug}`}
//                       className="text-terracotta hover:text-warm-brown transition-colors text-sm"
//                     >
//                       Read →
//                     </Link>
//                   </div>
//                 </div>
//               </motion.article>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <i className="fas fa-search text-5xl text-sand mb-4"></i>
//             <p className="text-warm-brown-light text-lg">No articles found matching your search.</p>
//             <button 
//               onClick={() => {
//                 setSelectedCategory('all')
//                 setSearchTerm('')
//               }}
//               className="mt-4 text-terracotta hover:text-warm-brown transition-colors"
//             >
//               Clear filters
//             </button>
//           </div>
//         )}

//         {/* Newsletter Section - Using Newsletter Component */}
//         <Newsletter />
//       </div>
//     </motion.div>
//   )
// }

// export default Blog

// pages/Blog.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCache } from '../hooks/useCache'
import { getImageUrl } from '../Helper'
import Newsletter from '../components/Newsletter'
import BlogCardSkeleton from '../components/skeletons/BlogCardSkeleton'

const Blog = () => {
  const { data: blogsData, loading: blogsLoading } = useCache('blogs', '/blogs')
  const { data: categoriesData, loading: categoriesLoading } = useCache('blog-categories', '/blog-categories/active')
  
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const blogs = blogsData || []
  const categories = categoriesData || []
  const loading = blogsLoading || categoriesLoading

  const filteredPosts = blogs.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category?.slug === selectedCategory
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    return matchesCategory && matchesSearch
  })

  const featuredPost = blogs.find(post => post.is_featured) || blogs[0]

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-ivory"
    >
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-warm-brown to-terracotta py-16 md:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl md:text-5xl text-ivory mb-4"
          >
            The NIRA Journal
          </motion.h1>
          <motion.p 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-ivory/90 text-base md:text-lg max-w-2xl mx-auto"
          >
            Wellness insights, skincare wisdom, and ritual inspiration
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        
        {/* Search and Filter Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-brown-light"></i>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-sand rounded-full focus:outline-none focus:border-terracotta bg-ivory text-warm-brown"
              />
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm ${
                  selectedCategory === 'all'
                    ? 'bg-terracotta text-ivory'
                    : 'bg-sand/20 text-warm-brown hover:bg-sand/40'
                }`}
              >
                <i className="fas fa-newspaper"></i>
                <span>All Posts</span>
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm ${
                    selectedCategory === category.slug
                      ? 'bg-terracotta text-ivory'
                      : 'bg-sand/20 text-warm-brown hover:bg-sand/40'
                  }`}
                >
                  <i className={category.icon || 'fas fa-tag'}></i>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Post */}
        {selectedCategory === 'all' && searchTerm === '' && featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-r from-sand/30 to-sand/10 rounded-2xl overflow-hidden border border-sand/50">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 h-64 md:h-auto">
                  <img 
                    src={getImageUrl(featuredPost.image)} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-terracotta/10 text-terracotta text-xs px-3 py-1 rounded-full">
                      Featured
                    </span>
                    <span className="text-warm-brown-light text-sm">{new Date(featuredPost.published_at).toLocaleDateString('en-IN')}</span>
                    <span className="text-warm-brown-light text-sm">•</span>
                    <span className="text-warm-brown-light text-sm">{featuredPost.read_time}</span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl text-warm-brown mb-3">
                    {featuredPost.title}
                  </h2>
                  <p className="text-warm-brown-light mb-4">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-warm-brown font-medium">{featuredPost.author}</p>
                      <p className="text-warm-brown-light text-sm">{featuredPost.author_role}</p>
                    </div>
                    <Link 
                      to={`/blog/${featuredPost.slug}`}
                      className="text-terracotta hover:text-warm-brown transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-ivory rounded-xl overflow-hidden border border-sand/50 hover:shadow-xl transition-all duration-300 group"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={getImageUrl(post.image)} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-terracotta text-ivory text-xs px-3 py-1 rounded-full">
                      {post.category?.name}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-warm-brown-light mb-3">
                    <span>{new Date(post.published_at).toLocaleDateString('en-IN')}</span>
                    <span>•</span>
                    <span>{post.read_time}</span>
                  </div>
                  <h3 className="font-serif text-xl text-warm-brown mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-warm-brown-light text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags && post.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-terracotta text-xs">#{tag}</span>
                      ))}
                    </div>
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="text-terracotta hover:text-warm-brown transition-colors text-sm"
                    >
                      Read →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <i className="fas fa-search text-5xl text-sand mb-4"></i>
            <p className="text-warm-brown-light text-lg">No articles found matching your search.</p>
            <button 
              onClick={() => {
                setSelectedCategory('all')
                setSearchTerm('')
              }}
              className="mt-4 text-terracotta hover:text-warm-brown transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Newsletter Section */}
        <Newsletter />
      </div>
    </motion.div>
  )
}

export default Blog