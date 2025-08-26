import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function ComicLoader() {
  return (
    <div className="w-3/4 flex items-center justify-center mx-auto" style={{ height: 'calc(100vh - 2rem)' }}>
      <div className="flex items-center justify-center w-full h-full">
        {/* Left Arrow */}
        <button className="p-2  h-full flex items-center pointer-cursor">
          <ChevronLeft size={32} className="text-gray-600" />
        </button>
        
        {/* Image Container */}
        <div className="flex-1 bg-gray-200 flex items-center justify-center h-full">
          <div className="text-gray-500 text-lg">Image Placeholder</div>
        </div>
        
        {/* Right Arrow */}
        <button className="p-2 h-full flex items-center pointer-cursor">
          <ChevronRight size={32} className="text-gray-600" />
        </button>
      </div>
    </div>
  )
}

export default ComicLoader