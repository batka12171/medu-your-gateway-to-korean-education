import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const images = [
  {
    url: "https://images.unsplash.com/photo-1590012314607-cda9d9b699ae?w=800&q=80",
    alt: "Seoul National University campus",
  },
  {
    url: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=800&q=80",
    alt: "Yonsei University iconic campus building",
  },
  {
    url: "https://images.unsplash.com/photo-1583249598754-b7a2f59651fb?w=800&q=80",
    alt: "KAIST campus architecture",
  },
];

export default function ExploreSection() {
  return (
    <div className="bg-[#020d0c] px-4 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Text block */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start mb-14">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <p className="text-[#00C9A7] text-sm font-medium mb-4 tracking-wide">Your Study Abroad Path</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Shaping<br />
              Experiences That<br />
              Open New Doors
            </h2>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-1 flex flex-col gap-6 justify-between"
          >
            <p className="text-white text-lg font-semibold leading-snug">
              We connect you with top Korean universities, expert mentors, and a global student community.
            </p>
            <div>
              <p className="text-white/40 text-xs mb-1">Let's Build Your Future</p>
              <p className="text-white/40 text-xs mb-5">Meaningful Together</p>
              <Link to="/AdmissionRoadmap">
                <button className="flex items-center gap-2 bg-[#00C9A7] hover:bg-[#00a88c] text-[#020d0c] font-bold px-6 py-3 rounded-full transition-all text-sm">
                  Start Your Application
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Image grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-3 gap-4"
        >
          {images.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl ${i === 1 ? "row-span-1 scale-105 z-10" : ""}`}
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              {/* Teal tint overlay on hover */}
              <div className="absolute inset-0 bg-[#00C9A7]/0 hover:bg-[#00C9A7]/10 transition-all duration-500" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}