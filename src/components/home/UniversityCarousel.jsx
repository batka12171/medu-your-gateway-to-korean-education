import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";

const universities = [
  {
    name: "Seoul National University",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    description: "South Korea's most prestigious national university"
  },
  {
    name: "KAIST",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    description: "Leading science and technology research university"
  },
  {
    name: "Yonsei University",
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80",
    description: "One of Korea's oldest and most prestigious universities"
  },
  {
    name: "Korea University",
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800&q=80",
    description: "Elite private research university in Seoul"
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
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#005F56] via-[#007a6e] to-[#00C9A7]">
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
                className="bg-white hover:bg-slate-100 text-[#005F56] px-8 py-6 text-lg rounded-xl shadow-lg font-bold"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-1">{universities[currentIndex].name}</h3>
                      <p className="text-sm text-white/80">{universities[currentIndex].description}</p>
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