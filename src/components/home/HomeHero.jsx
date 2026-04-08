import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { GraduationCap, Calendar, Users, ArrowRight, Search } from "lucide-react";
import ParticleLogo from "./ParticleLogo";

export default function HomeHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 z-10 min-h-[90vh] flex flex-col justify-center items-center overflow-hidden">
      {/* Absolute Background Animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 w-full h-full z-0"
      >
        <ParticleLogo />
      </motion.div>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-white/70 dark:bg-black/70 z-0 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-sm font-medium mb-8 backdrop-blur-sm">
              <span className="flex w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              The All-in-One Platform for Mongolia to Korea
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-8">
              Study, Connect, and Grow in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400">South Korea</span>
            </h1>
            <p className="text-xl text-slate-800 dark:text-slate-300 mb-12 max-w-2xl leading-relaxed mx-auto font-medium drop-shadow-sm">
              Navigate the Korean university application process, attend local events, and find expert mentors to guide your journey.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <Link to={createPageUrl("Universities")}>
                <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold shadow-lg shadow-orange-600/30 shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center gap-2 group">
                  <GraduationCap className="w-5 h-5" />
                  Start Application
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to={createPageUrl("Events")}>
                <button className="w-full sm:w-auto px-8 py-4 bg-white/50 dark:bg-black/50 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 hover:border-orange-500/50 hover:bg-orange-500/10 text-slate-800 dark:text-slate-100 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-sm">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  Explore Events
                </button>
              </Link>
              <Link to={createPageUrl("Mentors")}>
                <button className="w-full sm:w-auto px-8 py-4 bg-white/50 dark:bg-black/50 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 hover:border-orange-500/50 hover:bg-orange-500/10 text-slate-800 dark:text-slate-100 rounded-full font-semibold transition-all flex items-center justify-center gap-2 shadow-sm">
                  <Users className="w-5 h-5 text-orange-500" />
                  Find a Mentor
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 max-w-4xl mx-auto relative z-20"
        >
          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 p-2 sm:p-4 rounded-2xl sm:rounded-full shadow-2xl shadow-slate-200/50 dark:shadow-none flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 flex items-center px-4 w-full">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search University, Major, or City..." 
                className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 py-2 sm:py-0"
              />
            </div>
            <Link to={createPageUrl("Universities")} className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl sm:rounded-full font-semibold shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)] transition-all flex items-center justify-center">
                Search
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}