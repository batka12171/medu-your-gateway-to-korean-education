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
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#8B1538] via-[#2D3561] to-[#1a1f3a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Discover<br />Universities
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-md">
              Explore top Korean universities and find the perfect match for your academic journey. 
              From cutting-edge research facilities to vibrant campus life.
            </p>
            <Link to={createPageUrl("Universities")}>
              <Button 
                size="lg"
                className="bg-[#F4845F] hover:bg-[#e06e46] text-white px-8 py-6 text-lg rounded-xl shadow-lg"
              >
                Explore Now
              </Button>
            </Link>
          </motion.div>

          {/* Right Side - Carousel */}
          <div className="relative">
            <div className="flex items-center gap-4">
              {/* Main Image */}
              <motion.div
                className="relative flex-1"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="relative aspect-square rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl"
                  >
                    <img 
                      src={universities[currentIndex].image}
                      alt={universities[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-6 right-6 bg-white/90 text-slate-700 backdrop-blur-sm">
                      {universities[currentIndex].type}
                    </Badge>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white space-y-4">
                      <div>
                        <h3 className="text-3xl font-bold mb-1">{universities[currentIndex].name}</h3>
                        <p className="text-sm text-white/70 mb-3">{universities[currentIndex].korean}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          {universities[currentIndex].location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 text-[#F4845F]" />
                          {universities[currentIndex].ranking}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="w-4 h-4" />
                          {universities[currentIndex].students}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="w-4 h-4" />
                          <span className="text-xs uppercase tracking-wider">Top Programs</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {universities[currentIndex].programs.map(program => (
                            <Badge key={program} variant="secondary" className="bg-white/20 backdrop-blur-sm text-white border-0">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </motion.div>

              {/* Preview Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="hidden md:block"
              >
                <div className="w-48 h-64 rounded-2xl overflow-hidden border-4 border-white/20 shadow-xl">
                  <img 
                    src={universities[(currentIndex + 1) % universities.length].image}
                    alt={universities[(currentIndex + 1) % universities.length].name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {universities.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-white w-8' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}