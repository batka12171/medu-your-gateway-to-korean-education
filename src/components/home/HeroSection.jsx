import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ArrowRight, BookOpen, Users, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const paths = [
  {
    id: "application",
    label: "Application Process",
    icon: BookOpen,
    title: "Navigate Admissions with Confidence",
    description: "Step-by-step guidance through the Korean university application process, from requirements to submission.",
    cta: "View Application Guide",
    link: "ApplicationGuide",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
  },
  {
    id: "mentors",
    label: "Expert Mentors",
    icon: Users,
    title: "Learn from Those Who've Been There",
    description: "Connect with current students and alumni who can provide personalized advice for your journey.",
    cta: "Find a Mentor",
    link: "Mentors",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80"
  },
  {
    id: "events",
    label: "Community Events",
    icon: Calendar,
    title: "Join the MEDU Community",
    description: "Attend info sessions, workshops, and meetups to prepare for your life in South Korea.",
    cta: "Explore Events",
    link: "Events",
    image: "https://images.unsplash.com/photo-1523580494112-071d324728d3?w=800&q=80"
  }
];

export default function HeroSection() {
  const [activePath, setActivePath] = useState(paths[0]);

  return (
    <div
      className="relative min-h-screen pt-24 pb-16 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #fff0e6 0%, #ffebd9 40%, #ffebd9 100%)",
      }}
    >
      {/* Header */}
      <div className="text-center z-10 px-4 mb-12 relative w-full max-w-4xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl -z-10 pointer-events-none opacity-20">
          <img 
            src="https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/b149ec9c7_Gemini_Generated_Image_hzrnukhzrnukhzrn-removebg-preview.png" 
            alt="Background Logo" 
            className="w-full h-auto object-contain"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#ff7300]/20 text-slate-600 text-xs font-medium mb-6">
            Welcome to MEDU
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-4">
            Your Journey to <br />
            <span className="text-[#ff7300]">South Korea</span> Starts Here
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Choose your path below and let us guide you through the process of studying in Korea.
          </p>
        </motion.div>
      </div>

      {/* Path Selector */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="z-10 w-full max-w-5xl px-4"
      >
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {paths.map((path) => {
            const Icon = path.icon;
            const isActive = activePath.id === path.id;
            return (
              <button
                key={path.id}
                onClick={() => setActivePath(path)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                  isActive 
                    ? "bg-[#ff7300] text-white shadow-lg shadow-[#ff7300]/30" 
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 shadow-sm"
                }`}
              >
                <Icon className="w-4 h-4" />
                {path.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Content */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-xl border border-white min-h-[360px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePath.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row gap-10 items-center w-full"
            >
              <div className="flex-1 space-y-6 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  {activePath.title}
                </h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  {activePath.description}
                </p>
                <div className="pt-2 flex justify-center md:justify-start">
                  <Link to={createPageUrl(activePath.link)}>
                    <button className="flex items-center gap-2 bg-[#cc5c00] hover:bg-[#ff7300] text-white font-semibold px-8 py-4 rounded-full transition-all shadow-md hover:shadow-lg">
                      {activePath.cta}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="flex-1 w-full relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-lg">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                  <img 
                    src={activePath.image} 
                    alt={activePath.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <activePath.icon className="w-4 h-4 text-[#ff7300]" />
                    <span className="text-sm font-semibold text-slate-800">{activePath.label}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}