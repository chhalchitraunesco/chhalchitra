import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

type ComicLoaderProps = {
  imageSrc: string
  onPrev: () => void; // This will now be prevSubtitle
  onNext: () => void; // This will now be nextSubtitle
}

function ComicLoader({ imageSrc, onPrev, onNext }: ComicLoaderProps) {
  return (
    <div
      className="max-w-6xl flex items-center justify-center mx-auto"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <div className="flex items-center justify-center w-full h-full">
        {/* Left Arrow now triggers subtitle navigation */}
        <button
          className="p-2 h-full flex items-center cursor-pointer transition-colors"
          onClick={onPrev}
        >
          <ChevronLeft
            size={32}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          />
        </button>

        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center h-full overflow-auto">
          <Image
            src={imageSrc}
            alt="Comic Panel"
            width={1200}   // intrinsic aspect ratio preserved
            height={800}
            className="object-contain min-w-[640px] min-h-[480px]"
            priority
          />
        </div>


        {/* Right Arrow now triggers subtitle navigation */}
        <button
          className="p-2 h-full flex items-center cursor-pointer transition-colors"
          onClick={onNext}
        >
          <ChevronRight
            size={32}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          />
        </button>
      </div>
    </div>
  )
}

export default ComicLoader