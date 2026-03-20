import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function GlobeOverlay() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min(window.scrollY / maxScroll, 1));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fade out intro text after scrolling begins
  const introOpacity = Math.max(0, 1 - scrollProgress * 5);
  // Fade in SK arrival text after 80% scroll
  const arrivalOpacity = Math.max(0, (scrollProgress - 0.75) * 6);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col">
      
      {/* Top brand bar */}
      <div className="flex items-center justify-between px-8 md:px-14 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <span className="text-2xl font-extrabold tracking-widest text-white">MEDU</span>
          <span className="text-[#00C9A7] text-xs tracking-wider font-medium">한국 유학 가이드</span>
        </motion.div>
      </div>

      {/* Intro text — fades out on scroll */}
      <div
        className="flex-1 flex flex-col items-center justify-center text-center px-6"
        style={{ opacity: introOpacity, transition: "opacity 0.1s" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[#00C9A7] text-sm font-medium tracking-widest uppercase mb-4"
        >
          Your Journey Begins
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6"
        >
          Study in<br />
          <span style={{ color: "#00C9A7" }}>South Korea</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/50 text-lg max-w-md"
        >
          Scroll to fly toward Korea and discover your future university
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className="w-5 h-5 text-[#00C9A7]" />
          </motion.div>
        </motion.div>
      </div>

      {/* Arrival text — fades in near end of scroll */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{ opacity: arrivalOpacity, transition: "opacity 0.1s" }}
      >
        <p className="text-[#00C9A7] text-sm font-medium tracking-widest uppercase mb-3">
          You've arrived
        </p>
        <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
          대한민국
        </h2>
        <p className="text-white/60 text-lg mb-8">South Korea</p>

        {/* CTA button — pointer-events re-enabled */}
        <div style={{ pointerEvents: arrivalOpacity > 0.5 ? "auto" : "none" }}>
          <Link to="/Home">
            <button className="flex items-center gap-3 bg-[#00C9A7] hover:bg-[#00a88c] text-[#020d0c] font-bold px-8 py-4 rounded-full transition-all text-base shadow-lg shadow-[#00C9A7]/30">
              Explore the Platform
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
        <div
          className="h-full bg-[#00C9A7] transition-all duration-100"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
    </div>
  );
}