import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Sparkles, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <div className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background with Purple Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8D5FF] via-[#F0E5FF] to-[#FFE5F5]">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-pink-400/10" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-sm opacity-60"
        />
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-sm opacity-50"
        />
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full blur-sm opacity-60"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200 text-purple-700 text-sm mb-8">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span>Your Guide to Korean Universities</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6">
            Comprehensive information
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899]">
              about top universities
            </span>
            <br />
            in South Korea.
          </h1>

          <p className="text-lg sm:text-xl text-slate-700 max-w-2xl mx-auto mb-10">
            Research programs, admission requirements, and connect with 
            institutions directly through our platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={createPageUrl("Universities")}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:from-[#6D28D9] hover:to-[#9333EA] text-white px-8 py-6 text-lg rounded-xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/40 transition-all"
              >
                Explore Universities
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to={createPageUrl("Mentors")}>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white px-8 py-6 text-lg rounded-xl"
              >
                <Users className="mr-2 w-5 h-5" />
                Explore Mentors
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-purple-300 flex justify-center pt-2">
          <div className="w-1 h-2 bg-purple-400 rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}