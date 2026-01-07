import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { Users, BookOpen, MessageCircle, Award } from "lucide-react";

export default function MentoringSection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#A855F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square">
              {/* Illustrated Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Central Connection Nodes */}
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  {/* Connection Lines */}
                  <motion.path
                    d="M 80 100 Q 200 150 320 100"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M 80 300 Q 200 250 320 300"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.2, ease: "easeInOut" }}
                  />
                  <motion.path
                    d="M 80 100 L 200 200 L 320 300"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.4, ease: "easeInOut" }}
                  />
                </svg>

                {/* Animated People Icons */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-16 left-12 w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center shadow-xl"
                >
                  <Users className="w-10 h-10 text-white" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="absolute top-16 right-12 w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center shadow-xl"
                >
                  <BookOpen className="w-10 h-10 text-white" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.9 }}
                  className="absolute bottom-16 left-12 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center shadow-xl"
                >
                  <MessageCircle className="w-10 h-10 text-white" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 1.1 }}
                  className="absolute bottom-16 right-12 w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center shadow-xl"
                >
                  <Award className="w-10 h-10 text-white" />
                </motion.div>
                
                {/* Center Node */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-2xl"
                >
                  <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                  <span className="ml-1 text-xl font-bold text-slate-900">MEDU</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Mentoring can be both simple
              <br />
              and life-changing.
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              We empower learners to engage, connect, and succeed through personalized guidance from experienced mentors who understand your journey.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-sm text-white/80">Expert Mentors</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold mb-2">10,000+</div>
                <div className="text-sm text-white/80">Success Stories</div>
              </div>
            </div>

            <Link to={createPageUrl("Mentors")}>
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90 px-8 py-6 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all"
              >
                Find Your Mentor
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}