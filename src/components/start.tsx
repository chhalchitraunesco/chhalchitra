"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Define a proper type for stars
interface Star {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

function Start() {
  const router = useRouter();
  const [stars, setStars] = useState<Star[]>([]); // use Star[] instead of any[]
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const generateStars = (): Star[] =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
        size: 2 + Math.random() * 4,
      }));

    setStars(generateStars());
  }, []);

  const goToPage = (): void => {
    router.push("/story");
  };

  const createStory = (): void => {
    if (!name.trim()) {
      alert("Please enter your name first!");
      return;
    }
    router.push(`/story?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-white text-black relative overflow-hidden">
      {/* Shooting Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-black"
            style={{
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: "100vh", opacity: [0, 1, 1, 0] }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Floating Logo */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <Image src="/logo.png" alt="start" width={200} height={200} />
      </motion.div>

      {/* Buttons */}
      <div className="flex flex-col gap-6 mt-6 relative z-10">
        <button
          onClick={goToPage}
          className="px-8 py-3 text-2xl font-bebas-neue tracking-widest
            border-4 border-black bg-white text-black 
            shadow-[4px_4px_0_0_black] cursor-pointer
            transition-all duration-200 
            hover:bg-black hover:text-white hover:shadow-[6px_6px_0_0_black] 
            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          START STORY
        </button>

        <button
          // onClick={createStory}
          className="px-8 py-3 text-2xl font-bebas-neue tracking-widest
            border-4 border-black bg-white text-black 
            shadow-[4px_4px_0_0_black] cursor-pointer
            transition-all duration-200 
            hover:bg-black hover:text-white hover:shadow-[6px_6px_0_0_black] 
            active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          CREATE STORY
        </button>
      </div>
    </div>
  );
}

export default Start;
