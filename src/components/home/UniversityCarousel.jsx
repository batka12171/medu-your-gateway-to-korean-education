import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, MapPin, Users, Trophy, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";

const universities = [
  {
    name: "Seoul National University",
    korean: "서울대학교",
    location: "Seoul",
    ranking: "#29 QS World",
    students: "28,000+",
    type: "National",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    description: "South Korea's most prestigious national university",
    programs: ["Medicine", "Liberal Arts", "Science"]
  },
  {
    name: "KAIST",
    korean: "한국과학기술원",
    location: "Daejeon",
    ranking: "#41 QS World",
    students: "10,000+",
    type: "Public Research",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    description: "Leading science and technology research university",
    programs: ["Computer Science", "AI", "Robotics"]
  },
  {
    name: "Yonsei University",
    korean: "연세대학교",
    location: "Seoul",
    ranking: "#73 QS World",
    students: "39,000+",
    type: "Private",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80",
    description: "One of Korea's oldest and most prestigious universities",
    programs: ["International Studies", "Business", "Medicine"]
  },
  {
    name: "Korea University",
    korean: "고려대학교",
    location: "Seoul",
    ranking: "#79 QS World",
    students: "37,000+",
    type: "Private",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&q=80",
    description: "Elite private research university in Seoul",
    programs: ["Law", "Business", "Political Science"]
  }
];

export default function UniversityCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % universities.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + universities.length) % universities.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#E8D5FF] via-[#F0E5FF] to-[#FFE5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-slate-900 lg:col-span-2"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899] bg-clip-text text-transparent">Discover</span><br />Universities
            </h2>
            <p className="text-lg text-slate-700 mb-8 leading-relaxed">
              Explore top Korean universities and find the perfect match for your academic journey.
            </p>
            
            {/* University Quick Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Location</p>
                  <p className="font-semibold">{universities[currentIndex].location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-900">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Ranking</p>
                  <p className="font-semibold">{universities[currentIndex].ranking}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-900">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Students</p>
                  <p className="font-semibold">{universities[currentIndex].students}</p>
                </div>
              </div>
            </div>

            <Link to={createPageUrl("Universities")}>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:from-[#6D28D9] hover:to-[#9333EA] text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                Explore All Universities
              </Button>
            </Link>
          </motion.div>

          {/* Right Side - Carousel */}
          <div className="relative lg:col-span-3">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl"
                >
                  <img 
                    src={universities[currentIndex].image}
                    alt={universities[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-6 right-6 bg-white/95 text-slate-800 backdrop-blur-sm px-4 py-2 text-sm font-semibold">
                    {universities[currentIndex].type}
                  </Badge>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-4xl font-bold mb-2">{universities[currentIndex].name}</h3>
                    <p className="text-lg text-white/70 mb-6">{universities[currentIndex].korean}</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-5 h-5" />
                      <span className="text-sm font-medium">Top Programs</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {universities[currentIndex].programs.map(program => (
                        <Badge key={program} className="bg-white/20 backdrop-blur-md text-white border-0 px-3 py-1">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                onMouseEnter={() => {}}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-900 hover:bg-white hover:scale-110 transition-all shadow-xl z-10 group"
              >
                <ChevronLeft className="w-7 h-7 group-hover:-translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={nextSlide}
                onMouseEnter={() => {}}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-900 hover:bg-white hover:scale-110 transition-all shadow-xl z-10 group"
              >
                <ChevronRight className="w-7 h-7 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Thumbnail Navigation */}
              <div className="flex justify-center gap-3 mt-8">
                {universities.map((uni, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    onMouseEnter={() => goToSlide(index)}
                    className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                      index === currentIndex 
                        ? 'w-20 h-20 ring-4 ring-white shadow-xl scale-110' 
                        : 'w-16 h-16 opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <img 
                      src={uni.image}
                      alt={uni.name}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-black/40 ${index === currentIndex ? 'opacity-0' : ''}`} />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}