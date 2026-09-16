
import React from 'react'

const ComponentLoader = ({ height = 'min-h-[200px]' }) => {
  return (
    <div className={`flex items-center justify-center ${height}`}>
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-terracotta rounded-full border-t-transparent animate-spin"></div>
        <p className="text-warm-brown-light text-sm">Loading...</p>
      </div>
    </div>
  )
}

export default ComponentLoader