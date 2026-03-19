import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { num: "01", label: "Research Universities" },
  { num: "02", label: "Prepare Documents" },
  { num: "03", label: "Ace Admissions" },
  { num: "04", label: "Visa & Travel" },
];

export default function HeroSection() {
  return (
    <div className="bg-[#020d0c] min-h-screen pb-6 px-4 pt-4">
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{ minHeight: "88vh" }}
      >
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 0%, #00C9A7 -40%, #005F56 10%, #020d0c 55%)",
          }}
        />

        {/* Secondary glow blobs */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(0,201,167,0.35) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(0,201,167,0.15) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 flex flex-col" style={{ minHeight: "88vh" }}>
          {/* Top badge */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#00C9A7] text-sm font-medium tracking-widest uppercase p-8 md:p-12 lg:p-16 pb-0"
          >
            Your Journey to Korea Starts Here
          </motion.p>

          {/* University Building Image — centered hero visual */}
          <div className="flex-1 flex items-center justify-center relative px-4" style={{ minHeight: 300 }}>
            {/* Bottom green glow under the building */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% 100%, rgba(0,201,167,0.45) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
              className="relative z-10 w-full max-w-2xl"
              style={{
                filter: "drop-shadow(0 40px 80px rgba(0,201,167,0.4)) drop-shadow(0 0px 40px rgba(0,201,167,0.2))",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=1200&q=90"
                alt="Korean University Building"
                className="w-full object-cover rounded-2xl"
                style={{
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)",
                  maxHeight: 420,
                }}
              />
              {/* Green light reflection overlay on image */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0,201,167,0.25) 0%, transparent 50%)",
                }}
              />
            </motion.div>
          </div>

          {/* Bottom content */}
          <div className="px-8 md:px-12 lg:px-16 pb-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
              {/* Left: headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.3 }}
                className="max-w-xl"
              >
                <p className="text-white/60 text-lg mb-2">Start Your</p>
                <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-[1.0] mb-10 tracking-tight">
                  Korea<br />
                  University<br />
                  Journey
                </h1>
                <Link to={createPageUrl("Universities")}>
                  <button className="flex items-center gap-2 bg-[#00C9A7] hover:bg-[#00a88c] text-[#020d0c] font-bold px-7 py-3.5 rounded-full transition-all text-sm">
                    Explore Universities
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </motion.div>

              {/* Right: tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.4 }}
                className="max-w-xs lg:text-right self-start lg:self-end"
              >
                <p className="text-white text-xl font-bold leading-snug mb-3">
                  Your dream campus<br />is within reach.
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Expert mentors, real guidance, and a community to support you every step of the way.
                </p>
              </motion.div>
            </div>

            {/* Steps */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 border-t border-white/10"
            >
              {steps.map((step) => (
                <div key={step.num}>
                  <p className="text-[#00C9A7] text-xs font-mono mb-1"># {step.num}</p>
                  <p className="text-white/75 text-sm">{step.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}