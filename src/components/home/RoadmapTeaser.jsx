import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";

const PREVIEW_STEPS = [
  { label: "Research & Shortlist Universities", done: true, color: "#00C9A7" },
  { label: "Prepare Application Documents", done: true, color: "#3b82f6" },
  { label: "Take Language Tests (TOPIK / IELTS)", done: false, color: "#a855f7" },
  { label: "Submit Applications", done: false, color: "#f59e0b" },
  { label: "Apply for Visa & Depart", done: false, color: "#ef4444" },
];

export default function RoadmapTeaser() {
  return (
    <section className="bg-[#061614] py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block bg-[#00C9A7]/10 border border-[#00C9A7]/20 text-[#00C9A7] text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wider uppercase">
              Admission Roadmap
            </span>
            <h2 className="text-4xl font-extrabold text-white leading-tight mb-4">
              Never Miss a Step<br />on Your Journey
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              Our interactive roadmap guides you through every stage — from choosing universities
              to landing in Korea. Check off tasks, track deadlines, and stay on top of your application.
            </p>
            <Link to={createPageUrl("AdmissionRoadmap")}>
              <button className="flex items-center gap-2 bg-[#00C9A7] hover:bg-[#00a88c] text-[#061614] font-semibold px-6 py-3 rounded-full transition-all text-sm">
                Open My Roadmap
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>

          {/* Right: preview checklist card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            {/* Progress bar */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-white/60 text-xs">Overall Progress</p>
              <p className="text-[#00C9A7] text-xs font-bold">40%</p>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full mb-6 overflow-hidden">
              <div className="h-full w-[40%] rounded-full bg-gradient-to-r from-[#005F56] to-[#00C9A7]" />
            </div>

            <div className="space-y-3">
              {PREVIEW_STEPS.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-center gap-3"
                >
                  {step.done
                    ? <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: step.color }} />
                    : <Circle className="w-5 h-5 text-white/20 shrink-0" />
                  }
                  <span className={`text-sm ${step.done ? "line-through text-white/30" : "text-white/70"}`}>
                    {step.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 text-center">
              <p className="text-white/30 text-xs">Progress is saved automatically in your browser</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}