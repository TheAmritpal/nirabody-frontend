import React from 'react'

const BrandStory = () => {
  return (
    <section className="py-24 px-4 bg-sand/30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <img 
            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80"
            alt="NIRA BODY Ritual"
            className="rounded-lg shadow-xl w-full"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="font-serif text-4xl md:text-5xl text-warm-brown mb-6">
            Why NIRA BODY Exists
          </h2>
          <p className="text-warm-brown-light text-lg leading-relaxed mb-6">
            We're bringing back timeless self-care with modern convenience. Ancient beauty wisdom reimagined for conscious women who seek skincare that doesn't interfere with their hormones.
          </p>
          <p className="text-warm-brown-light text-lg leading-relaxed">
            Every product is a ritual—intentional, nurturing, and deeply restorative. Because true beauty glows from within.
          </p>
        </div>
      </div>
    </section>
  )
}

export default BrandStory