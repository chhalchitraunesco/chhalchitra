import React from "react";
import Image from "next/image";

function Start() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-white text-black my-auto">
      <Image src="/logo.png" alt="start" width={300} height={300} />

      <button
        className="
          mt-4 px-10 py-4 text-4xl font-bebas-neue tracking-widest mb-18
          border-4 border-black bg-white text-black 
          shadow-[4px_4px_0_0_black] cursor-pointer
          transition-all duration-200 
          hover:bg-black hover:text-white hover:shadow-[6px_6px_0_0_black] 
          active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
        "
      >
        START GAME
      </button>
    </div>
  );
}

export default Start;
