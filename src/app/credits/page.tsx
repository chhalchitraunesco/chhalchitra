"use client";

import React, { useEffect, useState, useRef } from "react";

type Credit = {
  name: string;
  role: string;
};

export default function Credits() {
  const [credits, setCredits] = useState<Credit[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch("/credits.json")
      .then((res) => res.json())
      .then((data: Credit[]) => setCredits(data));
  }, []);

  // Play background music on mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.6; // optional: set softer volume
      audioRef.current.play().catch(() => {
        console.log("Autoplay blocked — user interaction required.");
      });
    }
  }, []);

  if (credits.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-white bg-black">
        Loading credits...
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white flex justify-center items-center font-montserrat">
      {/* Background music */}
      <audio ref={audioRef} src="/music/music1.mp3" autoPlay loop hidden />

      {/* Scrolling content */}
      <div className="animate-scroll-credits text-center space-y-8">
        {/* Project Title */}
        <h1 className="text-4xl font-extrabold mb-8">Project Credits</h1>

        {/* Names from JSON */}
        {credits.map((person, idx) => (
          <div key={idx}>
            <div className="text-2xl font-bold">{person.name}</div>
            <div className="text-lg italic opacity-80">{person.role}</div>
          </div>
        ))}

        {/* Thank You Message */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold">Thank You</h2>
          <p className="text-lg opacity-80">
            To everyone who supported, contributed, and believed in this vision.
          </p>
        </div>

        {/* Final Awareness Statement */}
        <div className="mt-20 max-w-2xl mx-auto">
          <p className="text-xl font-semibold">
            This project is about spreading awareness regarding misinformation.
          </p>
          <p className="text-md mt-4 opacity-80 leading-relaxed">
            In a world where false information spreads faster than truth, 
            it becomes crucial to question what we see, read, and share.  
            This project seeks to highlight the dangers of unchecked narratives, 
            remind us of the value of critical thinking, and encourage everyone 
            to pause before believing or forwarding information.  
            Together, we can build a culture of truth and responsibility.  
          </p>
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        .animate-scroll-credits {
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: scrollUp 45s linear forwards;
        }

        @keyframes scrollUp {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }
      `}</style>
    </div>
  );
}
