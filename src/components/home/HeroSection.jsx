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

const universities = [
  { name: "SEOUL", sub: "NATIONAL UNIVERSITY" },
  { name: "KOREA", sub: "UNIVERSITY" },
  { name: "YONSEI", sub: "UNIVERSITY" },
  { name: "KAIST", sub: "" },
];

export default function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#041f1e]">
      {/* Background: deep teal radial glow */}
      <div className="absolute inset-0 bg-gradient-radial pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 60% 30%, rgba(0,120,100,0.45) 0%, rgba(4,31,30,0.0) 70%), #041f1e"
        }}
      />

      {/* University building image — right side */}
      <div
        className="absolute top-0 right-0 h-full w-[55%] pointer-events-none"
        style={{
          backgroundImage: `url('https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/eee7164f4_ChatGPTImageMar20202604_14_52AM.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          maskImage: "linear-gradient(to left, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0) 100%)",
        }}
      />
      {/* Extra dark overlay on the building image for mood */}
      <div
        className="absolute top-0 right-0 h-full w-[55%] pointer-events-none"
        style={{
          background: "linear-gradient(to left, rgba(4,31,30,0.35) 0%, rgba(4,31,30,0.0) 60%)"
        }}
      />

      {/* Inner card frame */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-36 pb-12 min-h-screen flex flex-col justify-between">

        {/* Hero Content */}
        <div className="max-w-xl">
          {/* Badge */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#38d9c0] text-sm font-medium mb-4 tracking-wide"
          >
            Your Journey to Korea Starts Here
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6"
          >
            Start Your<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38d9c0] to-[#00C9A7]">
              Korea University
            </span><br />
            Journey
          </motion.h1>

          {/* Sub-description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-base sm:text-lg max-w-xs mb-10 leading-relaxed"
          >
            Explore top Korean universities, understand admissions, and get guidance from expert mentors.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 flex-wrap"
          >
            <Link to={createPageUrl("Universities")}>
              <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#005F56] to-[#00C9A7] text-white font-semibold text-sm hover:from-[#004d47] hover:to-[#00a88c] transition-all shadow-lg shadow-[#00C9A7]/25">
                Explore Universities <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link to={createPageUrl("FindMatch")}>
              <button className="px-6 py-3 rounded-full border border-white/25 text-white/80 text-sm font-medium hover:bg-white/10 transition-all">
                Find Your Match
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div>
          {/* Numbered Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="border-t border-white/10 pt-6 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {steps.map((step) => (
              <div key={step.num}>
                <p className="text-[#38d9c0] text-xs font-mono mb-1">#{step.num}</p>
                <p className="text-white/70 text-sm font-medium">{step.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap items-center gap-6"
          >
            <p className="text-white/40 text-xs leading-tight">
              Trusted by students<br />from 30+ countries
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              {universities.map((u) => (
                <div key={u.name} className="flex flex-col leading-none">
                  <span className="text-white/70 font-bold text-sm tracking-widest">{u.name}</span>
                  {u.sub && <span className="text-white/35 text-[9px] tracking-wider">{u.sub}</span>}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}