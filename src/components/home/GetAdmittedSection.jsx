import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function GetAdmittedSection() {
  return (
    <div className="bg-[#061614] px-4 pb-16">
      <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1"
        >
          <p className="text-[#00C9A7] text-sm font-medium mb-4">Begin Your Study Abroad Dream</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Get Admitted to<br />
            Top Universities<br />
            in South Korea
          </h2>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex-1 flex flex-col gap-6"
        >
          <p className="text-white text-lg font-semibold leading-snug">
            From major selection to visa guidance —<br />
            we're with you every step of the way.
          </p>
          <p className="text-white/50 text-sm leading-relaxed">
            Let expert mentors simplify your application journey
            and maximize your chances of acceptance.
          </p>
          <Link to="/AdmissionRoadmap">
            <button className="flex items-center gap-2 bg-[#00C9A7] hover:bg-[#00a88c] text-[#061614] font-semibold px-6 py-3 rounded-full transition-all text-sm w-fit">
              Start Your Application
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}