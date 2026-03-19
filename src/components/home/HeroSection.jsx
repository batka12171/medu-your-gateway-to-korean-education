import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { num: "01", label: "Find Universities" },
  { num: "02", label: "Check Admissions" },
  { num: "03", label: "Get Mentorship" },
  { num: "04", label: "Apply with Confidence" },
];

const logos = [
  { name: "SEOUL NATIONAL UNIVERSITY", short: "SEOUL" },
  { name: "KOREA UNIVERSITY", short: "KOREA" },
  { name: "YONSEI UNIVERSITY", short: "YONSEI" },
  { name: "KAIST", short: "KAIST" },
];

export default function HeroSection() {
  return (
    <div className="bg-[#071a17] min-h-screen flex flex-col">
      {/* Hero Card */}
      <div className="flex-1 mx-4 mt-4 mb-0 rounded-3xl overflow-hidden relative min-h-[90vh] flex flex-col">
        {/* Background: Korean university building */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&q=80')`,
          }}
        />
        {/* Dark teal overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#071a17]/90 via-[#0a2e26]/80 to-[#0d3d30]/70" />
        {/* Extra green glow top-center */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00C9A7]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-between p-8 md:p-12 lg:p-16">
          {/* Top: Badge */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#00C9A7] text-sm font-medium tracking-wide"
          >
            Your Journey to Korea Starts Here
          </motion.p>

          {/* Main content row */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mt-8">
            {/* Left: Headline + Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-xl"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-8">
                Start Your<br />
                Korea University<br />
                Journey
              </h1>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={createPageUrl("Universities")}>
                  <button className="flex items-center gap-2 bg-[#00C9A7] hover:bg-[#00a88c] text-[#071a17] font-semibold px-6 py-3 rounded-full transition-all text-sm">
                    Explore Universities
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link to={createPageUrl("FindMatch")}>
                  <button className="flex items-center gap-2 border border-white/30 text-white hover:bg-white/10 font-semibold px-6 py-3 rounded-full transition-all text-sm backdrop-blur-sm">
                    Find Your Match
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right: Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-white/70 text-sm md:text-base max-w-xs lg:text-right leading-relaxed"
            >
              Explore top Korean universities,
              understand admissions, and get
              guidance from expert mentors.
            </motion.p>
          </div>

          {/* Steps row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/10"
          >
            {steps.map((step) => (
              <div key={step.num}>
                <p className="text-[#00C9A7] text-xs font-mono mb-1"># {step.num}</p>
                <p className="text-white/80 text-sm font-medium">{step.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* University logos strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mx-4 mb-4 mt-2 bg-[#0d2b24] rounded-2xl px-8 py-5 flex flex-col sm:flex-row items-center gap-6"
      >
        <p className="text-white/50 text-xs leading-tight whitespace-nowrap">
          Trusted by students<br />from 30+ countries
        </p>
        <div className="flex-1 h-px bg-white/10 hidden sm:block" />
        <div className="flex flex-wrap items-center justify-center gap-8">
          {logos.map((logo) => (
            <span key={logo.name} className="text-white/60 font-bold text-sm tracking-widest uppercase hover:text-white/90 transition-colors">
              {logo.short}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}