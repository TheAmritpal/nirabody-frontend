// components/Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useCache } from '../hooks/useCache'
import FooterSkeleton from './skeletons/FooterSkeleton'

const Footer = () => {
  const { data: settings, loading } = useCache('settings', '/settings')

  // Default values if settings not loaded
  const siteName = settings?.site_name || 'NIRA BODY'
  const siteDescription = settings?.site_description || 'Conscious skincare rooted in ancient rituals. Hormone-safe, intentionally crafted.'
  const instagram = settings?.instagram || '#'
  const facebook = settings?.facebook || '#'
  const linkedin = settings?.linkedin || '#'
  const twitter = settings?.twitter || '#'
  const youtube = settings?.youtube || '#'
  const whatsapp = settings?.whatsapp || '#'
  const phone = settings?.phone || '+91 9876543210'
  const email = settings?.email || 'info@nirabody.com'
  const address = settings?.address || 'Nira Body Care, Mumbai'
  const copyrightText = settings?.copyright_text || '© 2024 NIRA BODY. All rights reserved. Conscious beauty for modern rituals.'
  const businessHours = settings?.business_hours || ''

  if (loading) {
    return <FooterSkeleton />
  }

  return (
    <footer className="bg-warm-brown text-ivory pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl mb-4">{siteName}</h3>
            <p className="text-ivory/70 text-sm">{siteDescription}</p>
            <div className="mt-4 space-y-1 text-ivory/70 text-sm">
              {address && <p><i className="fas fa-map-marker-alt mr-2 text-terracotta"></i>{address}</p>}
              {phone && <p><i className="fas fa-phone mr-2 text-terracotta"></i>{phone}</p>}
              {email && <p><i className="fas fa-envelope mr-2 text-terracotta"></i>{email}</p>}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-sans font-semibold mb-4 uppercase text-sm tracking-wide">Explore</h4>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-ivory/70 hover:text-ivory transition-colors text-sm">Shop</Link></li>
              <li><Link to="/ritual-guide" className="text-ivory/70 hover:text-ivory transition-colors text-sm">Ritual Guide</Link></li>
              <li><Link to="/about" className="text-ivory/70 hover:text-ivory transition-colors text-sm">About</Link></li>
              <li><Link to="/blog" className="text-ivory/70 hover:text-ivory transition-colors text-sm">Blog</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-sans font-semibold mb-4 uppercase text-sm tracking-wide">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-ivory/70 hover:text-ivory transition-colors text-sm">Contact</Link></li>
              <li><Link to="/faqs" className="text-ivory/70 hover:text-ivory transition-colors text-sm">FAQs</Link></li>
              <li><Link to="/shipping-policy" className="text-ivory/70 hover:text-ivory transition-colors text-sm">Shipping Policy</Link></li>
              <li><Link to="/returns-policy" className="text-ivory/70 hover:text-ivory transition-colors text-sm">Returns Policy</Link></li>
              <li><Link to="/privacy-policy" className="text-ivory/70 hover:text-ivory transition-colors text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h4 className="font-sans font-semibold mb-4 uppercase text-sm tracking-wide">Connect</h4>
            <div className="flex flex-wrap gap-4">
              {instagram && instagram !== '#' && (
                <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-ivory/70 hover:text-ivory transition-colors text-xl">
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {facebook && facebook !== '#' && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="text-ivory/70 hover:text-ivory transition-colors text-xl">
                  <i className="fab fa-facebook"></i>
                </a>
              )}
              {linkedin && linkedin !== '#' && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-ivory/70 hover:text-ivory transition-colors text-xl">
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
              {twitter && twitter !== '#' && (
                <a href={twitter} target="_blank" rel="noopener noreferrer" className="text-ivory/70 hover:text-ivory transition-colors text-xl">
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {youtube && youtube !== '#' && (
                <a href={youtube} target="_blank" rel="noopener noreferrer" className="text-ivory/70 hover:text-ivory transition-colors text-xl">
                  <i className="fab fa-youtube"></i>
                </a>
              )}
              {whatsapp && whatsapp !== '#' && (
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-ivory/70 hover:text-ivory transition-colors text-xl">
                  <i className="fab fa-whatsapp"></i>
                </a>
              )}
            </div>
            
            {/* Business Hours */}
            {businessHours && (
              <div className="mt-4 pt-4 border-t border-ivory/20">
                <p className="text-ivory/70 text-xs">
                  <i className="far fa-clock mr-2 text-terracotta"></i>
                  {businessHours}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t border-ivory/20 pt-8 text-center text-ivory/60 text-sm">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer