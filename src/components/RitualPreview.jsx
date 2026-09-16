import React from 'react'
import { Link } from 'react-router-dom'

const RitualPreview = () => {
  return (
    <section className="py-20 px-4 bg-sand/20">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-warm-brown mb-4">The Art of Ritual</h2>
        <p className="text-warm-brown-light text-lg mb-8 max-w-2xl mx-auto">
          Discover the ancient practice of intentional self-care. Each product comes with guidance on how to incorporate it into your daily ritual.
        </p>
        <Link 
          to="/ritual-guide"
          className="inline-block bg-terracotta text-ivory px-8 py-3 rounded-full hover:bg-warm-brown transition-all duration-300 font-sans text-sm uppercase tracking-wide"
        >
          Explore Ritual Guide
        </Link>
      </div>
    </section>
  )
}

export default RitualPreview