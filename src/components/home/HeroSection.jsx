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

const logos = ["SEOUL", "KOREA", "YONSEI", "KAIST"];

export default function HeroSection() {
  return (
    <div className="bg-[#061614] min-h-screen pb-6 px-4 pt-4">
      {/* Hero Card */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{ minHeight: "75vh" }}
      >
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=1400&q=90')`,
          }}
        />
        {/* Dark teal overlay — heavier on left/bottom, lighter top-right so building shows */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#061614]/95 via-[#0a2920]/80 to-[#061614]/60" />
        {/* Top-left green radial glow */}
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#00C9A7]/25 rounded-full blur-3xl pointer-events-none" />

        {/* Inner content */}
        <div className="relative z-10 p-8 md:p-10 lg:p-12 flex flex-col h-full" style={{ minHeight: "75vh" }}>

          {/* Badge */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white/70 text-sm mb-auto"
          >
            Your Journey to Korea Starts Here
          </motion.p>

          {/* Main content */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mt-12">
            {/* Left: headline + buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="max-w-lg"
            >
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-[1.05] mb-8 tracking-tight">
                Start Your<br />
                Korea University<br />
                Journey
              </h1>

              <div className="flex flex-row gap-4 flex-wrap">
                <Link to={createPageUrl("Universities")}>
                  <button className="flex items-center gap-2 bg-[#00C9A7] hover:bg-[#00a88c] text-[#061614] font-semibold px-6 py-3 rounded-full transition-all text-sm">
                    Explore Universities
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link to={createPageUrl("FindMatch")}>
                  <button className="flex items-center gap-2 text-white hover:text-[#00C9A7] font-medium px-2 py-3 transition-all text-sm">
                    Find Your Match
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Right: description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-white/60 text-sm max-w-[220px] lg:text-right leading-relaxed self-start lg:self-end"
            >
              Explore top Korean universities,
              understand admissions, and get
              guidance from expert mentors.
            </motion.p>
          </div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
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