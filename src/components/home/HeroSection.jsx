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
        style={{ minHeight: "80vh" }}
      >
        {/* Background image — Seoul National University */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=90')`,
          }}
        />
        {/* Dark teal overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020d0c]/95 via-[#00C9A7]/10 to-[#020d0c]/80" />
        {/* Teal glow top-left */}
        <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-[#00C9A7]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col" style={{ minHeight: "80vh" }}>
          {/* Badge */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#00C9A7] text-sm font-medium tracking-widest uppercase mb-auto"
          >
            Your Journey to Korea Starts Here
          </motion.p>

          {/* Main content */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 mt-12">
            {/* Left: headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
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
              transition={{ duration: 0.65, delay: 0.25 }}
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
            transition={{ duration: 0.65, delay: 0.35 }}
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
  );
}