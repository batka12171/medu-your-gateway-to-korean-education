import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";

export default function HeroSection() {
  return (
    <div
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{
        background: "radial-gradient(ellipse at center, #f0faf8 0%, #e8f5f2 40%, #ddf0ec 100%)",
      }}
    >
      <ParticleCanvas />

      {/* Content layer */}
      <div className="relative z-10 flex flex-1 items-center px-8 md:px-16 lg:px-24 py-24 gap-8">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 max-w-sm"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#00C9A7]/20 text-slate-500 text-xs mb-6">
            Available now
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight mb-4">
            For students<br />
            <span className="text-[#00997a]">Build your future</span>
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            Expert mentors, real guidance, and a community to support you every step of the way to Korean universities.
          </p>
          <Link to={createPageUrl("Universities")}>
            <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-full transition-all text-sm">
              Get started
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>

        {/* Center spacer — particles fill this */}
        <div className="flex-1 hidden md:block" />

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex-1 max-w-sm text-right"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#00C9A7]/20 text-slate-500 text-xs mb-6">
            MEDU Platform
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight mb-4">
            Smarter<br />
            <span className="text-[#00997a]">education guide</span>
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-8">
            Discover top Korean universities, connect with mentors, and navigate the entire admissions process with confidence.
          </p>
          <Link to={createPageUrl("Mentors")}>
            <button className="inline-flex items-center gap-2 bg-white/80 hover:bg-white text-slate-900 font-semibold px-6 py-3 rounded-full transition-all text-sm border border-slate-200 shadow-sm">
              Meet mentors
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Bottom steps bar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.5 }}
        className="relative z-10 flex justify-center gap-10 pb-10 px-8"
      >
        {[
          { num: "01", label: "Research Universities" },
          { num: "02", label: "Prepare Documents" },
          { num: "03", label: "Ace Admissions" },
          { num: "04", label: "Visa & Travel" },
        ].map((step) => (
          <div key={step.num} className="text-center">
            <p className="text-[#00997a] text-xs font-mono mb-0.5"># {step.num}</p>
            <p className="text-slate-500 text-xs">{step.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}