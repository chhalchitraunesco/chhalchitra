import React from 'react'

interface SubtitlesProps {
  subtitle: string
}

function Subtitles({ subtitle }: SubtitlesProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full h-[4rem] bg-black bg-opacity-25 flex items-center justify-center p-4">
      <p className="text-white text-center text-lg font-light">
        {subtitle}
      </p>
    </div>
  )
}

export default Subtitles