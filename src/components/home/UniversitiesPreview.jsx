import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion } from "framer-motion";
import { MapPin, Trophy, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const universities = [
  {
    name: "Seoul National University",
    name_korean: "서울대학교",
    location: "Seoul",
    type: "National",
    qs_ranking: 29,
    student_count: "28,000+",
    top_programs: ["Medicine", "Liberal Arts", "Science"],
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80"
  },
  {
    name: "KAIST",
    name_korean: "한국과학기술원",
    location: "Daejeon",
    type: "Public Research",
    qs_ranking: 41,
    student_count: "10,000+",
    top_programs: ["Computer Science", "AI", "Robotics"],
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80"
  },
  {
    name: "Yonsei University",
    name_korean: "연세대학교",
    location: "Seoul",
    type: "Private",
    qs_ranking: 73,
    student_count: "39,000+",
    top_programs: ["International Studies", "Business", "Medicine"],
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&q=80"
  }
];

export default function UniversitiesPreview() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Explore Universities
            </h2>
            <p className="text-slate-600 max-w-xl">
              Browse detailed information about Korean universities including rankings, 
              programs, tuition, and admission requirements.
            </p>
          </div>
          <Link to={createPageUrl("Universities")} className="mt-4 md:mt-0">
            <Button variant="ghost" className="text-[#00C9A7] hover:text-[#1a1f3a] hover:bg-[#00C9A7]/5">
              View all universities <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((uni, index) => (
            <motion.div
              key={uni.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={uni.image} 
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-slate-700 backdrop-blur-sm">
                    {uni.type}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-[#00C9A7] transition-colors">
                    {uni.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">{uni.name_korean}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {uni.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-orange-500" />
                      #{uni.qs_ranking} QS World
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-slate-400" />
                      {uni.student_count}
                    </span>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Top Programs</p>
                    <div className="flex flex-wrap gap-2">
                      {uni.top_programs.map(program => (
                        <Badge key={program} variant="secondary" className="bg-slate-100 text-slate-600">
                          {program}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Button className="w-full bg-gradient-to-r from-[#005F56] to-[#00C9A7] hover:from-[#004d47] hover:to-[#00a88c]">
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}