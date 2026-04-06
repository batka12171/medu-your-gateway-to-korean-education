import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Users, Star, ArrowRight } from "lucide-react";

export default function MentorsSection() {
  const mentors = [
    { name: "Bat-Erdene", role: "Application Mentor", uni: "Seoul National Univ.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80" },
    { name: "Anu", role: "Language Mentor", uni: "Yonsei University", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80" },
    { name: "Khulan", role: "Career Mentor", uni: "Korea University", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80" },
  ];

  return (
    <section className="py-24 bg-emerald-900 text-white relative z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-800/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid sm:grid-cols-2 gap-6">
              {mentors.map((m, i) => (
                <div key={i} className={`bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 ${i === 1 ? 'sm:translate-y-8' : ''}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <img src={m.img} alt={m.name} className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400" />
                    <div>
                      <h4 className="font-bold text-lg">{m.name}</h4>
                      <div className="flex items-center gap-1 text-emerald-300 text-sm">
                        <Star className="w-3 h-3 fill-current" /> 4.9 (42)
                      </div>
                    </div>
                  </div>
                  <div className="text-emerald-100 text-sm mb-1">{m.role}</div>
                  <div className="text-white/60 text-xs mb-4">{m.uni}</div>
                  <button className="w-full py-2 bg-white text-emerald-900 rounded-xl text-sm font-semibold hover:bg-emerald-50 transition-colors">
                    Book Session
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-3">Expert Mentors</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Get guidance from those who've walked the path.
            </h2>
            <p className="text-lg text-emerald-100/80 mb-10 leading-relaxed">
              Whether you need help with your application essay, adjusting to student life, mastering Korean, or finding scholarships, our diverse network of mentors is here to help.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to={createPageUrl("Mentors")}>
                <button className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full font-medium transition-all flex items-center gap-2">
                  Browse All Mentors <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}