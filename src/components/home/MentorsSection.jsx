import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion } from "framer-motion";
import { Star, GraduationCap, Users, ArrowRight } from "lucide-react";
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#00C9A7] font-medium mb-4">
            <Users className="w-5 h-5" />
            Connect with Expert Mentors
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Get personalized guidance from
            <br />
            experienced mentors
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Who have successfully navigated Korean university admissions. Book one-on-one 
            sessions for application strategy, essay reviews, and interview preparation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:border-orange-200 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <img 
                  src={mentor.avatar} 
                  alt={mentor.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 truncate">{mentor.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-medium text-slate-900">{mentor.rating}</span>
                    <span className="text-slate-400">({mentor.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                <Badge className={`${
                  mentor.type === 'Application Guide' ? 'bg-[#00C9A7] text-white' :
                  mentor.type === 'Language' ? 'bg-[#D4A574] text-white' :
                  'bg-[#F4845F] text-white'
                }`}>
                  {mentor.type}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                <GraduationCap className="w-4 h-4 text-[#00C9A7]" />
                <span className="truncate">{mentor.university}</span>
              </div>
              <p className="text-sm text-slate-500 mb-3">{mentor.degree}</p>
              <p className="text-sm text-slate-600 line-clamp-2">{mentor.bio}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={createPageUrl("Mentors")}>
            <Button size="lg" className="bg-[#00C9A7] hover:bg-[#1a1f3a]">
              Find a Mentor <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to={createPageUrl("BecomeMentor")}>
            <Button size="lg" variant="outline" className="border-[#00C9A7] text-[#00C9A7] hover:bg-[#00C9A7]/5">
              Become a Mentor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}