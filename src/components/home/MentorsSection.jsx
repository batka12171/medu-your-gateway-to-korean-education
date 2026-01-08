import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion } from "framer-motion";
import { Star, GraduationCap, Users, ArrowRight, BookOpen, MessageCircle, Award, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mentors = [
  {
    name: "Dr. Ji-won Kim",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    university: "Seoul National University",
    degree: "Application Guide Mentor",
    rating: 4.9,
    reviews: 87,
    bio: "Specializes in graduate school applications, personal statements, and admissions strategy...",
    type: "Application Guide"
  },
  {
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    university: "KAIST",
    degree: "Korean Language Mentor",
    rating: 4.8,
    reviews: 65,
    bio: "Expert in TOPIK preparation and Korean language learning strategies for international...",
    type: "Language"
  },
  {
    name: "Min-ho Park",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    university: "Yonsei University",
    degree: "Lifestyle & Culture Mentor",
    rating: 5.0,
    reviews: 92,
    bio: "Helps students adjust to Korean culture, find housing, and navigate daily life in Korea...",
    type: "Lifestyle"
  },
  {
    name: "Emily Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    university: "Korea University",
    degree: "Application Guide Mentor",
    rating: 4.7,
    reviews: 54,
    bio: "Guides international students through visa applications and scholarship processes...",
    type: "Application Guide"
  }
];

export default function MentorsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D3561] via-[#3d4a7a] to-[#4A90C5]"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-white/10 blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#F4845F]/20 blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Connect with Expert Mentors
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Mentoring can be both simple
              <br />
              <span className="text-[#F4845F]">and life-changing.</span>
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Get personalized guidance from experienced mentors who have successfully navigated Korean university admissions.
            </p>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { icon: Users, value: "500+", label: "Expert Mentors" },
            { icon: BookOpen, value: "10,000+", label: "Success Stories" },
            { icon: MessageCircle, value: "24/7", label: "Support Available" },
            { icon: Award, value: "98%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10"
            >
              <stat.icon className="w-8 h-8 text-[#F4845F] mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mentor Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl p-6 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={mentor.avatar} 
                  alt={mentor.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[#2D3561]/20 group-hover:ring-[#F4845F]/50 transition-all"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 truncate">{mentor.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-medium text-slate-900">{mentor.rating}</span>
                    <span className="text-slate-400">({mentor.reviews})</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <Badge className={`${
                  mentor.type === 'Application Guide' ? 'bg-[#2D3561] text-white' :
                  mentor.type === 'Language' ? 'bg-[#D4A574] text-white' :
                  'bg-[#F4845F] text-white'
                }`}>
                  {mentor.type}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                <GraduationCap className="w-4 h-4 text-[#2D3561]" />
                <span className="truncate">{mentor.university}</span>
              </div>
              <p className="text-sm text-slate-500 mb-3">{mentor.degree}</p>
              <p className="text-sm text-slate-600 line-clamp-2">{mentor.bio}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to={createPageUrl("Mentors")}>
            <Button size="lg" className="bg-white text-[#2D3561] hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all px-8">
              Find a Mentor <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to={createPageUrl("BecomeMentor")}>
            <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 px-8">
              Become a Mentor
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}