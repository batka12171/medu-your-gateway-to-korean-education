import React from "react";
import { motion } from "framer-motion";

const universities = [
  { abbr: "SNU", name: "Seoul National" },
  { abbr: "KAIST", name: "KAIST" },
  { abbr: "YONSEI", name: "Yonsei Univ." },
  { abbr: "KOREA", name: "Korea Univ." },
  { abbr: "POSTECH", name: "POSTECH" },
  { abbr: "SKKU", name: "Sungkyunkwan" },
];

export default function UniversityLogos() {
  return (
    <div className="bg-[#020d0c] px-4 pb-8">
      <div className="max-w-6xl mx-auto px-6 py-8 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <p className="text-white/40 text-xs leading-tight min-w-[90px]">
            Top Universities<br />in Korea
          </p>
          <div className="flex flex-wrap gap-6 md:gap-10 items-center">
            {universities.map((u) => (
              <motion.div
                key={u.abbr}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2 group cursor-default"
              >
                <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#00C9A7]/60" />
                </div>
                <span className="text-white/60 text-sm font-medium group-hover:text-white/90 transition-colors">
                  {u.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}