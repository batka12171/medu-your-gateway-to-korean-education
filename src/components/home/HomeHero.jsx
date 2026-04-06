import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { GraduationCap, Calendar, Users, ArrowRight } from "lucide-react";

export default function HomeHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 z-10">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium mb-8">
            <span className="flex w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            The All-in-One Platform for Mongolia to Korea
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
            Study, Connect, and Grow in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-400">South Korea</span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Navigate the Korean university application process, attend local events, and find expert mentors to guide your journey.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link to={createPageUrl("Universities")}>
              <button className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 group">
                <GraduationCap className="w-5 h-5" />
                Start Application
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to={createPageUrl("Events")}>
              <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 text-slate-700 rounded-full font-semibold transition-all flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                Explore Events
              </button>
            </Link>
            <Link to={createPageUrl("Mentors")}>
              <button className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50 text-slate-700 rounded-full font-semibold transition-all flex items-center justify-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                Find a Mentor
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Abstract Center Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative max-w-5xl mx-auto rounded-[2.5rem] p-8 md:p-16 flex items-center justify-center overflow-hidden border border-slate-100 bg-white/50 backdrop-blur-3xl shadow-2xl shadow-emerald-900/5"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-50 z-0" />
          <img 
            src="https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/b149ec9c7_Gemini_Generated_Image_hzrnukhzrnukhzrn-removebg-preview.png"
            alt="Abstract visual"
            className="relative z-10 w-full max-w-2xl h-auto object-contain drop-shadow-2xl"
            style={{ filter: "hue-rotate(120deg) saturate(1.5)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}