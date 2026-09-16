// // pages/BlogDetail.jsx
// import React, { useState, useEffect } from 'react'
// import { useParams, Link, useNavigate } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import axios from 'axios'
// import { apiUrl } from '../backend/pages/https'
// import { getImageUrl } from '../Helper'

// const BlogDetail = () => {
//   const { slug } = useParams()
//   const navigate = useNavigate()
//   const [post, setPost] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [relatedPosts, setRelatedPosts] = useState([])

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await axios.get(`${apiUrl}/blogs/${slug}`)
//         if (res.data.status) {
//           setPost(res.data.data)
          
//           // Fetch related posts from same category
//           if (res.data.data.category) {
//             const relatedRes = await axios.get(`${apiUrl}/blogs?category=${res.data.data.category.slug}`)
//             if (relatedRes.data.status) {
//               setRelatedPosts(relatedRes.data.data.filter(p => p.id !== res.data.data.id).slice(0, 3))
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching blog:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchPost()
//   }, [slug])

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-ivory flex items-center justify-center">
//         <div className="w-12 h-12 border-4 border-terracotta rounded-full border-t-transparent animate-spin"></div>
//       </div>
//     )
//   }

//   if (!post) {
//     return (
//       <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
//         <div className="text-center">
//           <i className="fas fa-search text-6xl text-sand mb-4"></i>
//           <h1 className="font-serif text-3xl text-warm-brown mb-2">Post Not Found</h1>
//           <p className="text-warm-brown-light mb-6">The article you're looking for doesn't exist.</p>
//           <Link to="/blog" className="bg-terracotta text-ivory px-6 py-3 rounded-full hover:bg-warm-brown transition">
//             Back to Blog
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
//       <div className="max-w-4xl mx-auto">
//         {/* Back Button */}
//         <button 
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-warm-brown-light hover:text-terracotta transition-colors mb-6"
//         >
//           <i className="fas fa-arrow-left"></i>
//           <span>Back to Blog</span>
//         </button>

//         {/* Category & Featured Badge */}
//         <div className="flex items-center gap-3 mb-4">
//           {post.category && (
//             <span className="bg-terracotta/10 text-terracotta text-sm px-3 py-1 rounded-full">
//               {post.category.name}
//             </span>
//           )}
//           {post.is_featured && (
//             <span className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full">
//               <i className="fas fa-star mr-1"></i> Featured
//             </span>
//           )}
//         </div>

//         {/* Title */}
//         <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-warm-brown mt-2 mb-4">
//           {post.title}
//         </h1>

//         {/* Meta Info */}
//         <div className="flex flex-wrap items-center gap-4 text-sm text-warm-brown-light mb-6">
//           <span className="flex items-center gap-2">
//             <i className="fas fa-user text-terracotta"></i>
//             {post.author}
//           </span>
//           {post.author_role && (
//             <span className="text-xs bg-sand/20 px-2 py-1 rounded-full">
//               {post.author_role}
//             </span>
//           )}
//           <span className="flex items-center gap-2">
//             <i className="fas fa-calendar text-terracotta"></i>
//             {new Date(post.published_at).toLocaleDateString('en-IN', {
//               day: 'numeric',
//               month: 'long',
//               year: 'numeric'
//             })}
//           </span>
//           <span className="flex items-center gap-2">
//             <i className="fas fa-clock text-terracotta"></i>
//             {post.read_time}
//           </span>
//         </div>

//         {/* Featured Image */}
//         {post.image && (
//           <div className="mb-8 rounded-2xl overflow-hidden">
//             <img 
//               src={getImageUrl(post.image)} 
//               alt={post.title}
//               className="w-full h-auto object-cover"
//             />
//           </div>
//         )}

//         {/* Content */}
//         <div className="prose prose-lg max-w-none text-warm-brown-light">
//           <div dangerouslySetInnerHTML={{ __html: post.content }} />
//         </div>

//         {/* Tags */}
//         {post.tags && post.tags.length > 0 && (
//           <div className="mt-8 pt-8 border-t border-sand/50">
//             <h4 className="text-sm font-medium text-warm-brown mb-3">Tags</h4>
//             <div className="flex flex-wrap gap-2">
//               {post.tags.map((tag, i) => (
//                 <span key={i} className="bg-sand/20 px-3 py-1 rounded-full text-sm text-warm-brown-light">
//                   #{tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Author Bio */}
//         <div className="mt-8 p-6 bg-sand/20 rounded-2xl border border-sand/50">
//           <div className="flex items-center gap-4">
//             <div className="w-12 h-12 bg-terracotta/20 rounded-full flex items-center justify-center">
//               <i className="fas fa-user text-terracotta text-xl"></i>
//             </div>
//             <div>
//               <p className="font-medium text-warm-brown">{post.author}</p>
//               {post.author_role && (
//                 <p className="text-sm text-warm-brown-light">{post.author_role}</p>
//               )}
//               <p className="text-xs text-warm-brown-light mt-1">
//                 Writer at NIRA BODY
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Related Posts */}
//         {relatedPosts.length > 0 && (
//           <div className="mt-12 pt-8 border-t border-sand/50">
//             <h3 className="font-serif text-2xl text-warm-brown mb-6">Related Articles</h3>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {relatedPosts.map((related) => (
//                 <Link 
//                   key={related.id} 
//                   to={`/blog/${related.slug}`}
//                   className="group bg-ivory rounded-xl overflow-hidden border border-sand/50 hover:shadow-lg transition-all duration-300"
//                 >
//                   {related.image && (
//                     <img 
//                       src={getImageUrl(related.image)} 
//                       alt={related.title}
//                       className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
//                     />
//                   )}
//                   <div className="p-4">
//                     <h4 className="font-serif text-warm-brown group-hover:text-terracotta transition-colors line-clamp-2">
//                       {related.title}
//                     </h4>
//                     <p className="text-warm-brown-light text-xs mt-2">
//                       {new Date(related.published_at).toLocaleDateString('en-IN')}
//                     </p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Share Section */}
//         <div className="mt-8 pt-8 border-t border-sand/50 text-center">
//           <p className="text-warm-brown-light text-sm mb-3">Share this article</p>
//           <div className="flex justify-center gap-4">
//             <a 
//               href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-warm-brown-light hover:text-terracotta transition text-xl"
//             >
//               <i className="fab fa-twitter"></i>
//             </a>
//             <a 
//               href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-warm-brown-light hover:text-terracotta transition text-xl"
//             >
//               <i className="fab fa-facebook"></i>
//             </a>
//             <a 
//               href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-warm-brown-light hover:text-terracotta transition text-xl"
//             >
//               <i className="fab fa-linkedin"></i>
//             </a>
//             <a 
//               href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-warm-brown-light hover:text-terracotta transition text-xl"
//             >
//               <i className="fab fa-whatsapp"></i>
//             </a>
//           </div>
//         </div>

//         {/* Decorative Elements */}
//         <div className="flex justify-center gap-2 mt-8">
//           <div className="w-2 h-2 rounded-full bg-terracotta"></div>
//           <div className="w-2 h-2 rounded-full bg-terracotta/50"></div>
//           <div className="w-2 h-2 rounded-full bg-terracotta/20"></div>
//         </div>
//       </div>
//     </motion.div>
//   )
// }

// export default BlogDetail

// pages/BlogDetail.jsx
import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { apiUrl } from '../backend/pages/https'
import { getImageUrl } from '../Helper'
import { useCache } from '../hooks/useCache'

const BlogDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState([])
  const { data: blogsData } = useCache('blogs', '/blogs')

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`${apiUrl}/blogs/${slug}`)
        if (res.data.status) {
          setPost(res.data.data)
          
          // Fetch related posts from same category using cached data
          if (res.data.data.category && blogsData) {
            const related = blogsData.filter(p => 
              p.category?.slug === res.data.data.category.slug && 
              p.id !== res.data.data.id
            ).slice(0, 3)
            setRelatedPosts(related)
          }
        }
      } catch (error) {
        console.error('Error fetching blog:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [slug, blogsData])

  if (loading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-terracotta rounded-full border-t-transparent animate-spin"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
        <div className="text-center">
          <i className="fas fa-search text-6xl text-sand mb-4"></i>
          <h1 className="font-serif text-3xl text-warm-brown mb-2">Post Not Found</h1>
          <p className="text-warm-brown-light mb-6">The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="bg-terracotta text-ivory px-6 py-3 rounded-full hover:bg-warm-brown transition">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-ivory py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-warm-brown-light hover:text-terracotta transition-colors mb-6"
        >
          <i className="fas fa-arrow-left"></i>
          <span>Back to Blog</span>
        </button>

        {/* Category & Featured Badge */}
        <div className="flex items-center gap-3 mb-4">
          {post.category && (
            <span className="bg-terracotta/10 text-terracotta text-sm px-3 py-1 rounded-full">
              {post.category.name}
            </span>
          )}
          {post.is_featured && (
            <span className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full">
              <i className="fas fa-star mr-1"></i> Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-warm-brown mt-2 mb-4">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-warm-brown-light mb-6">
          <span className="flex items-center gap-2">
            <i className="fas fa-user text-terracotta"></i>
            {post.author}
          </span>
          {post.author_role && (
            <span className="text-xs bg-sand/20 px-2 py-1 rounded-full">
              {post.author_role}
            </span>
          )}
          <span className="flex items-center gap-2">
            <i className="fas fa-calendar text-terracotta"></i>
            {new Date(post.published_at).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </span>
          <span className="flex items-center gap-2">
            <i className="fas fa-clock text-terracotta"></i>
            {post.read_time}
          </span>
        </div>

        {/* Featured Image */}
        {post.image && (
          <div className="mb-8 rounded-2xl overflow-hidden">
            <img 
              src={getImageUrl(post.image)} 
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none text-warm-brown-light">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-sand/50">
            <h4 className="text-sm font-medium text-warm-brown mb-3">Tags</h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <span key={i} className="bg-sand/20 px-3 py-1 rounded-full text-sm text-warm-brown-light">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div className="mt-8 p-6 bg-sand/20 rounded-2xl border border-sand/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-terracotta/20 rounded-full flex items-center justify-center">
              <i className="fas fa-user text-terracotta text-xl"></i>
            </div>
            <div>
              <p className="font-medium text-warm-brown">{post.author}</p>
              {post.author_role && (
                <p className="text-sm text-warm-brown-light">{post.author_role}</p>
              )}
              <p className="text-xs text-warm-brown-light mt-1">
                Writer at NIRA BODY
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-sand/50">
            <h3 className="font-serif text-2xl text-warm-brown mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link 
                  key={related.id} 
                  to={`/blog/${related.slug}`}
                  className="group bg-ivory rounded-xl overflow-hidden border border-sand/50 hover:shadow-lg transition-all duration-300"
                >
                  {related.image && (
                    <img 
                      src={getImageUrl(related.image)} 
                      alt={related.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="p-4">
                    <h4 className="font-serif text-warm-brown group-hover:text-terracotta transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                    <p className="text-warm-brown-light text-xs mt-2">
                      {new Date(related.published_at).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Share Section */}
        <div className="mt-8 pt-8 border-t border-sand/50 text-center">
          <p className="text-warm-brown-light text-sm mb-3">Share this article</p>
          <div className="flex justify-center gap-4">
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-brown-light hover:text-terracotta transition text-xl"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-brown-light hover:text-terracotta transition text-xl"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a 
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-brown-light hover:text-terracotta transition text-xl"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a 
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-brown-light hover:text-terracotta transition text-xl"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-terracotta"></div>
          <div className="w-2 h-2 rounded-full bg-terracotta/50"></div>
          <div className="w-2 h-2 rounded-full bg-terracotta/20"></div>
        </div>
      </div>
    </motion.div>
  )
}

export default BlogDetail