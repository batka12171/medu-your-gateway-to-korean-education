import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { createPageUrl } from "../../utils";
import { Users, Star, ArrowRight } from "lucide-react";

export default function MentorsSection() {
  const mentorsLeft = [
  { name: "Bat-Erdene", role: "Application Mentor", uni: "Seoul National Univ.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80" },
  { name: "Khulan", role: "Career Mentor", uni: "Korea University", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80" },
  { name: "Tuguldur", role: "Engineering Mentor", uni: "KAIST", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80" },
  { name: "Sarnai", role: "Design Mentor", uni: "Hongik University", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" }];


  const mentorsRight = [
  { name: "Anu", role: "Language Mentor", uni: "Yonsei University", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80" },
  { name: "Temuulen", role: "Business Mentor", uni: "Sungkyunkwan Univ.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" },
  { name: "Maral", role: "Life in Korea Mentor", uni: "Ewha Womans Univ.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80" },
  { name: "Bat", role: "Science Mentor", uni: "POSTECH", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" }];


  // Duplicate the arrays to create seamless infinite scroll
  const scrollLeft = [...mentorsLeft, ...mentorsLeft];
  const scrollRight = [...mentorsRight, ...mentorsRight];

  return (
    <section className="bg-[hsl(var(--brand-teal))] text-white py-24 relative z-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-800/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative h-[600px] overflow-hidden mask-image-vertical-fade">
            <div className="grid sm:grid-cols-2 gap-6 h-full absolute inset-0">
              
              {/* Left Column - Scrolling Up */}
              <div className="relative h-full overflow-hidden">
                <motion.div
                  className="flex flex-col gap-6 w-full"
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{
                    y: { repeat: Infinity, ease: "linear", duration: 25 }
                  }}>
                  
                  {scrollLeft.map((m, i) =>
                  <div key={`left-${i}`} className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl flex-shrink-0">
                      <div className="flex items-center gap-4 mb-4">
                        <img src={m.img} alt={m.name} className="w-16 h-16 rounded-full object-cover border-2 border-orange-400" />
                        <div>
                          <h4 className="font-bold text-lg text-white">{m.name}</h4>
                          <div className="flex items-center gap-1 text-orange-300 text-sm">
                            <Star className="w-3 h-3 fill-current" /> 4.9 (42)
                          </div>
                        </div>
                      </div>
                      <div className="text-orange-100 text-sm mb-1">{m.role}</div>
                      <div className="text-white/60 text-xs mb-4">{m.uni}</div>
                      <button className="w-full py-2 bg-white text-orange-900 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-colors shadow-sm">
                        Book Session
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Right Column - Scrolling Down */}
              <div className="relative h-full overflow-hidden mt-8 hidden sm:block">
                <motion.div
                  className="flex flex-col gap-6 w-full"
                  animate={{ y: ["-50%", "0%"] }}
                  transition={{
                    y: { repeat: Infinity, ease: "linear", duration: 25 }
                  }}>
                  
                  {scrollRight.map((m, i) =>
                  <div key={`right-${i}`} className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 shadow-xl flex-shrink-0">
                      <div className="flex items-center gap-4 mb-4">
                        <img src={m.img} alt={m.name} className="w-16 h-16 rounded-full object-cover border-2 border-orange-400" />
                        <div>
                          <h4 className="font-bold text-lg text-white">{m.name}</h4>
                          <div className="flex items-center gap-1 text-orange-300 text-sm">
                            <Star className="w-3 h-3 fill-current" /> 4.9 (42)
                          </div>
                        </div>
                      </div>
                      <div className="text-orange-100 text-sm mb-1">{m.role}</div>
                      <div className="text-white/60 text-xs mb-4">{m.uni}</div>
                      <button className="w-full py-2 bg-white text-orange-900 rounded-xl text-sm font-semibold hover:bg-orange-50 transition-colors shadow-sm">
                        Book Session
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>

            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="text-orange-400 font-semibold tracking-wide uppercase text-sm mb-3">Expert Mentors</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Get guidance from those who've walked the path.
            </h2>
            <p className="text-lg text-orange-100/80 mb-10 leading-relaxed">
              Whether you need help with your application essay, adjusting to student life, mastering Korean, or finding scholarships, our diverse network of mentors is here to help.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to={createPageUrl("Mentors")}>
                <button className="px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white rounded-full font-medium transition-all flex items-center gap-2">
                  Browse All Mentors <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>);

}