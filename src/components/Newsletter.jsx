// // components/Newsletter.jsx
// import React, { useState } from 'react'
// import axios from 'axios'
// import { apiUrl } from '../backend/pages/https'

// const Newsletter = () => {
//   const [email, setEmail] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [message, setMessage] = useState('')
//   const [isSuccess, setIsSuccess] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     if (!email.trim()) {
//       setMessage('Please enter your email')
//       setIsSuccess(false)
//       return
//     }

//     setLoading(true)
//     setMessage('')

//     try {
//       const response = await axios.post(`${apiUrl}/newsletter/subscribe`, {
//         email: email
//       })

//       if (response.data.status) {
//         setMessage(response.data.message)
//         setIsSuccess(true)
//         setEmail('')
//       } else {
//         setMessage(response.data.message || 'Something went wrong')
//         setIsSuccess(false)
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || 'Failed to subscribe')
//       setIsSuccess(false)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <section className="py-20 px-4 bg-terracotta/10">
//       <div className="max-w-3xl mx-auto text-center">
//         <h2 className="font-serif text-4xl text-warm-brown mb-3">Join the Ritual Circle</h2>
//         <p className="text-warm-brown-light mb-6">
//           Get early access, skincare education, and exclusive offers delivered to your inbox.
//         </p>
        
//         <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
//           <input 
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Your email address"
//             className="flex-1 px-4 py-3 border border-sand rounded-full focus:outline-none focus:border-terracotta bg-ivory text-warm-brown"
//             required
//             disabled={loading}
//           />
//           <button 
//             type="submit"
//             disabled={loading}
//             className="bg-terracotta text-ivory px-6 py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide disabled:opacity-50"
//           >
//             {loading ? 'Subscribing...' : 'Join Ritual'}
//           </button>
//         </form>

//         {message && (
//           <div className={`mt-4 text-sm ${
//             isSuccess ? 'text-green-600' : 'text-red-600'
//           }`}>
//             {message}
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }

// export default Newsletter

// components/Newsletter.jsx
import React, { useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../backend/pages/https'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setMessage('Please enter your email')
      setIsSuccess(false)
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await axios.post(`${apiUrl}/newsletter/subscribe`, {
        email: email
      })

      if (response.data.status) {
        setMessage(response.data.message)
        setIsSuccess(true)
        setEmail('')
      } else {
        setMessage(response.data.message || 'Something went wrong')
        setIsSuccess(false)
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to subscribe')
      setIsSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 px-4 bg-terracotta/10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl text-warm-brown mb-3">Join the Ritual Circle</h2>
        <p className="text-warm-brown-light mb-6">
          Get early access, skincare education, and exclusive offers delivered to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-3 border border-sand rounded-full focus:outline-none focus:border-terracotta bg-ivory text-warm-brown"
            required
            disabled={loading}
          />
          <button 
            type="submit"
            disabled={loading}
            className="bg-terracotta text-ivory px-6 py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide disabled:opacity-50"
          >
            {loading ? 'Subscribing...' : 'Join Ritual'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 text-sm ${
            isSuccess ? 'text-green-600' : 'text-red-600'
          }`}>
            {message}
          </div>
        )}
      </div>
    </section>
  )
}

export default Newsletter