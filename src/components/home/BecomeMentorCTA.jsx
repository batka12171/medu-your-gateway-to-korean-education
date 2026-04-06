import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Sparkles, ArrowRight } from "lucide-react";

export default function BecomeMentorCTA() {
  return (
    <section className="py-24 bg-slate-50 relative z-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-[3rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-orange-600/20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Are you already studying in Korea?</h2>
            <p className="text-lg md:text-xl text-orange-50 mb-10 max-w-2xl mx-auto">
              Share your experience, help prospective students from Mongolia, and earn by becoming an official mentor on our platform.
            </p>
            <Link to={createPageUrl("BecomeMentor")}>
              <button className="px-8 py-4 bg-white text-orange-700 hover:bg-slate-50 rounded-full font-bold text-lg transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2 mx-auto">
                Apply to be a Mentor <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}