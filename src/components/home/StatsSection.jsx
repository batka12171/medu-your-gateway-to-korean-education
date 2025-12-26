import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin, BookOpen, Trophy } from "lucide-react";

const stats = [
  { icon: GraduationCap, value: "8", label: "UNIVERSITIES", color: "text-orange-500" },
  { icon: MapPin, value: "5+", label: "CITIES", color: "text-blue-500" },
  { icon: BookOpen, value: "100+", label: "PROGRAMS", color: "text-emerald-500" },
  { icon: Trophy, value: "5", label: "TOP 100 QS RANKINGS", color: "text-purple-500" },
];

export default function StatsSection() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 ${stat.color} mb-4`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}