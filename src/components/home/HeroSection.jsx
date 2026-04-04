import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ArrowRight, BookOpen, Users, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const paths = [
  {
    id: "application",
    label: "Application Process",
    icon: BookOpen,
    title: "Navigate Admissions",
    description: "Step-by-step guidance through the Korean university application process.",
    cta: "View Guide",
    link: "ApplicationGuide",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
  },
  {
    id: "mentors",
    label: "Expert Mentors",
    icon: Users,
    title: "Learn from Alumni",
    description: "Connect with current students who can provide personalized advice.",
    cta: "Find a Mentor",
    link: "Mentors",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&q=80"
  },
  {
    id: "events",
    label: "Community Events",
    icon: Calendar,
    title: "Join the Community",
    description: "Attend info sessions, workshops, and meetups to prepare for your life in South Korea.",
    cta: "Explore Events",
    link: "Events",
    image: "https://images.unsplash.com/photo-1523580494112-071d324728d3?w=800&q=80"
  }
];

export default function HeroSection() {
  return (
    <div
      className="relative min-h-screen pt-24 pb-16 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at center, #fff0e6 0%, #ffebd9 40%, #ffebd9 100%)",
      }}
    >
      {/* Header */}
      <div className="text-center z-10 px-4 mb-16 relative w-full max-w-4xl mx-auto">
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
            Explore our core features below and let us guide you through the process of studying in Korea.
          </p>
        </motion.div>
      </div>

      {/* Cards Section */}
      <div className="z-10 w-full max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paths.map((path, index) => {
            const Icon = path.icon;
            return (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group relative bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  <img 
                    src={path.image} 
                    alt={path.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 z-20 flex items-center justify-center w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full shadow-sm text-[#ff7300]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-xl font-bold text-white mb-1">{path.label}</h3>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col h-[200px] justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800 mb-2">{path.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {path.description}
                    </p>
                  </div>
                  
                  <Link to={createPageUrl(path.link)} className="mt-4">
                    <button className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-[#ff7300] text-slate-700 hover:text-white font-medium px-4 py-2.5 rounded-xl transition-all border border-slate-200 hover:border-transparent">
                      {path.cta}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}