import React from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, Globe, MessageSquare } from "lucide-react";

const features = [
  { 
    icon: Users, 
    title: "Expert Mentors", 
    description: "Connect with students who've been through the process",
    color: "text-[#00C9A7]"
  },
  { 
    icon: BookOpen, 
    title: "Comprehensive Guides", 
    description: "Step-by-step application and admission resources",
    color: "text-[#F4845F]"
  },
  { 
    icon: Globe, 
    title: "University Database", 
    description: "Detailed information on top Korean universities",
    color: "text-[#D4A574]"
  },
  { 
    icon: MessageSquare, 
    title: "Active Community", 
    description: "Join discussions with current and prospective students",
    color: "text-[#00C9A7]"
  },
];

export default function StatsSection() {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Everything You Need to Study in Korea
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            From university research to visa applications, we've got you covered
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white shadow-sm ${feature.color} mb-4`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}