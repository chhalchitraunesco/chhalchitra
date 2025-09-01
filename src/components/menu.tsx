"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // hamburger + close icons

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-0 left-0 z-50 p-3">
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="p-2 border-2 border-black bg-white shadow-[3px_3px_0_0_black] hover:bg-black hover:text-white transition-all"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-3 flex flex-col gap-3 bg-white border-2 border-black shadow-[4px_4px_0_0_black] p-4"
          >
            <button
              className="px-5 py-2 text-lg font-bebas-neue tracking-widest
                border-2 border-black bg-white text-black 
                shadow-[3px_3px_0_0_black] cursor-pointer
                transition-all duration-200 
                hover:bg-black hover:text-white hover:shadow-[4px_4px_0_0_black] 
                active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              Hear From Us
            </button>

            <button
              className="px-5 py-2 text-lg font-bebas-neue tracking-widest
                border-2 border-black bg-white text-black 
                shadow-[3px_3px_0_0_black] cursor-pointer
                transition-all duration-200 
                hover:bg-black hover:text-white hover:shadow-[4px_4px_0_0_black] 
                active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              Latest
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
