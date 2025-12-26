import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Trophy, Users, Filter } from "lucide-react";

const staticUniversities = [
  {
    id: 1,
    name: "Seoul National University",
    name_korean: "서울대학교",
    location: "Seoul",
    type: "National",
    qs_ranking: 29,
    student_count: "28,000+",
    top_programs: ["Medicine", "Liberal Arts", "Science", "Engineering", "Law", "Business"],
    image_url: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80"
  },
  {
    id: 2,
    name: "KAIST",
    name_korean: "한국과학기술원",
    location: "Daejeon",
    type: "Public Research",
    qs_ranking: 41,
    student_count: "10,000+",
    top_programs: ["Computer Science", "AI", "Robotics", "Electrical Engineering", "Physics"],
    image_url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80"
  },
  {
    id: 3,
    name: "Yonsei University",
    name_korean: "연세대학교",
    location: "Seoul",
    type: "Private",
    qs_ranking: 73,
    student_count: "39,000+",
    top_programs: ["International Studies", "Business", "Medicine", "Economics"],
    image_url: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=600&q=80"
  },
  {
    id: 4,
    name: "Korea University",
    name_korean: "고려대학교",
    location: "Seoul",
    type: "Private",
    qs_ranking: 79,
    student_count: "37,000+",
    top_programs: ["Law", "Business", "Political Science", "Media Studies"],
    image_url: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=600&q=80"
  },
  {
    id: 5,
    name: "POSTECH",
    name_korean: "포항공과대학교",
    location: "Pohang",
    type: "Private Research",
    qs_ranking: 100,
    student_count: "3,500+",
    top_programs: ["Materials Science", "Chemical Engineering", "Physics"],
    image_url: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&q=80"
  },
  {
    id: 6,
    name: "Hanyang University",
    name_korean: "한양대학교",
    location: "Seoul & Ansan",
    type: "Private",
    qs_ranking: 164,
    student_count: "35,000+",
    top_programs: ["Engineering", "Architecture", "Business", "Medicine"],
    image_url: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=600&q=80"
  },
  {
    id: 7,
    name: "Sungkyunkwan University",
    name_korean: "성균관대학교",
    location: "Seoul & Suwon",
    type: "Private",
    qs_ranking: 145,
    student_count: "34,000+",
    top_programs: ["Business", "Engineering", "Natural Sciences"],
    image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80"
  },
  {
    id: 8,
    name: "EWHA Womans University",
    name_korean: "이화여자대학교",
    location: "Seoul",
    type: "Private",
    qs_ranking: 346,
    student_count: "20,000+",
    top_programs: ["Liberal Arts", "Medicine", "Business"],
    image_url: "https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=600&q=80"
  }
];

export default function Universities() {
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const { data: dbUniversities = [] } = useQuery({
    queryKey: ['universities'],
    queryFn: () => base44.entities.University.list(),
    initialData: [],
  });

  const universities = dbUniversities.length > 0 ? dbUniversities : staticUniversities;

  const filteredUniversities = universities.filter(uni => {
    const matchSearch = uni.name.toLowerCase().includes(search.toLowerCase()) ||
                       uni.name_korean?.includes(search) ||
                       uni.top_programs?.some(p => p.toLowerCase().includes(search.toLowerCase()));
    const matchLocation = locationFilter === "all" || uni.location.includes(locationFilter);
    const matchType = typeFilter === "all" || uni.type === typeFilter;
    return matchSearch && matchLocation && matchType;
  });

  const locations = [...new Set(universities.map(u => u.location.split(' & ')[0]))];
  const types = [...new Set(universities.map(u => u.type))];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Explore Universities
          </h1>
          <p className="text-slate-600 max-w-2xl">
            Browse detailed information about Korean universities including rankings, 
            programs, tuition, and admission requirements.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search universities, programs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-slate-50 border-0"
              />
            </div>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-48 bg-slate-50 border-0">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map(loc => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48 bg-slate-50 border-0">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-6">
          Showing {filteredUniversities.length} of {universities.length} universities
        </p>

        {/* University Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map((uni, index) => (
            <motion.div
              key={uni.id || uni.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={uni.image_url || "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80"} 
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4 bg-white/90 text-slate-700 backdrop-blur-sm">
                    {uni.type}
                  </Badge>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-[#4A90C5] transition-colors">
                    {uni.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">{uni.name_korean}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      {uni.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Trophy className="w-4 h-4 text-orange-500" />
                      #{uni.qs_ranking} QS World
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-slate-400" />
                      {uni.student_count}
                    </span>
                  </div>

                  <div className="flex-1">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Top Programs</p>
                    <div className="flex flex-wrap gap-2">
                      {uni.top_programs?.slice(0, 3).map(program => (
                        <Badge key={program} variant="secondary" className="bg-slate-100 text-slate-600">
                          {program}
                        </Badge>
                      ))}
                      {uni.top_programs?.length > 3 && (
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                          +{uni.top_programs.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <Button className="w-full bg-[#4A90C5] hover:bg-[#357AB8]">
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}