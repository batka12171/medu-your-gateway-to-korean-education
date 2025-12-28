import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
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
import { Search, Star, GraduationCap, MessageSquare, Calendar, UserPlus } from "lucide-react";

const staticMentors = [
  {
    id: 1,
    name: "Dr. Ji-won Kim",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    university: "Seoul National University",
    degree: "Ph.D. in Computer Science",
    rating: 4.9,
    review_count: 87,
    bio: "Helped 100+ students get admitted to top Korean universities. Specializes in graduate school applications and research proposal writing.",
    expertise: ["Graduate Admissions", "Research Proposals", "STEM Programs"],
    hourly_rate: 60,
    status: "active"
  },
  {
    id: 2,
    name: "Sarah Chen",
    avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    university: "KAIST",
    degree: "M.S. in Electrical Engineering",
    rating: 4.8,
    review_count: 65,
    bio: "International student from Singapore. Successfully navigated KAIST admission process and can help with scholarship applications.",
    expertise: ["International Students", "Scholarships", "Engineering"],
    hourly_rate: 45,
    status: "active"
  },
  {
    id: 3,
    name: "Prof. Min-ho Park",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    university: "Yonsei University",
    degree: "MBA, Business Administration",
    rating: 5.0,
    review_count: 92,
    bio: "Former admissions committee member at Yonsei. Deep insights into what top Korean universities look for in applicants.",
    expertise: ["MBA Admissions", "Business Schools", "Interview Prep"],
    hourly_rate: 75,
    status: "active"
  },
  {
    id: 4,
    name: "Emily Johnson",
    avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    university: "Korea University",
    degree: "M.A. in International Studies",
    rating: 4.7,
    review_count: 54,
    bio: "American student who mastered Korean language requirements. Guides students through TOPIK preparation and cultural adjustment.",
    expertise: ["TOPIK Prep", "Language Requirements", "Cultural Adjustment"],
    hourly_rate: 40,
    status: "active"
  },
  {
    id: 5,
    name: "Tae-hyun Lee",
    avatar_url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
    university: "POSTECH",
    degree: "Ph.D. in Physics",
    rating: 4.9,
    review_count: 41,
    bio: "Research scientist at POSTECH. Helps with research-focused graduate programs and connecting with professors.",
    expertise: ["Research Programs", "Professor Connections", "Science"],
    hourly_rate: 55,
    status: "active"
  },
  {
    id: 6,
    name: "Lisa Wong",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    university: "Sungkyunkwan University",
    degree: "B.A. in Business Administration",
    rating: 4.6,
    review_count: 38,
    bio: "Current undergraduate student from Hong Kong. Fresh perspective on student life and undergraduate admissions.",
    expertise: ["Undergraduate Admissions", "Student Life", "Hong Kong Students"],
    hourly_rate: 30,
    status: "active"
  }
];

export default function Mentors() {
  const [search, setSearch] = useState("");
  const [universityFilter, setUniversityFilter] = useState("all");
  const [expertiseFilter, setExpertiseFilter] = useState("all");

  const { data: dbMentors = [] } = useQuery({
    queryKey: ['mentors'],
    queryFn: () => base44.entities.Mentor.filter({ status: 'active' }),
    initialData: [],
  });

  const mentors = dbMentors.length > 0 ? dbMentors : staticMentors;

  const filteredMentors = mentors.filter(mentor => {
    const matchSearch = mentor.name.toLowerCase().includes(search.toLowerCase()) ||
                       mentor.university.toLowerCase().includes(search.toLowerCase()) ||
                       mentor.expertise?.some(e => e.toLowerCase().includes(search.toLowerCase()));
    const matchUniversity = universityFilter === "all" || mentor.university === universityFilter;
    const matchExpertise = expertiseFilter === "all" || mentor.expertise?.includes(expertiseFilter);
    return matchSearch && matchUniversity && matchExpertise;
  });

  const universities = [...new Set(mentors.map(m => m.university))];
  const allExpertise = [...new Set(mentors.flatMap(m => m.expertise || []))];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Expert Mentors
            </h1>
            <p className="text-slate-600 max-w-2xl">
              Connect with experienced mentors who have successfully navigated Korean university admissions.
            </p>
          </div>
          <Link to={createPageUrl("BecomeMentor")} className="mt-4 md:mt-0">
            <Button className="bg-[#2D3561] hover:bg-[#1a1f3a]">
              <UserPlus className="w-4 h-4 mr-2" />
              Become a Mentor
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search mentors, universities, expertise..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-slate-50 border-0"
              />
            </div>
            <Select value={universityFilter} onValueChange={setUniversityFilter}>
              <SelectTrigger className="w-full md:w-56 bg-slate-50 border-0">
                <SelectValue placeholder="All Universities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Universities</SelectItem>
                {universities.map(uni => (
                  <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
              <SelectTrigger className="w-full md:w-48 bg-slate-50 border-0">
                <SelectValue placeholder="Expertise" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Expertise</SelectItem>
                {allExpertise.map(exp => (
                  <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor, index) => (
            <motion.div
              key={mentor.id || mentor.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:border-orange-200 transition-all duration-300 h-full flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={mentor.avatar_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80"} 
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-slate-900">{mentor.name}</h3>
                    <div className="flex items-center gap-1 text-sm mb-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="font-medium text-slate-900">{mentor.rating}</span>
                      <span className="text-slate-400">({mentor.review_count} reviews)</span>
                    </div>
                    <div className="text-lg font-semibold text-[#2D3561]">
                      ${mentor.hourly_rate}/hr
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                  <GraduationCap className="w-4 h-4 text-[#2D3561]" />
                  <span className="truncate">{mentor.university}</span>
                </div>
                <p className="text-sm text-slate-500 mb-3">{mentor.degree}</p>
                
                <p className="text-sm text-slate-600 mb-4 line-clamp-3 flex-1">{mentor.bio}</p>

                <div className="mb-4">
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {mentor.expertise?.slice(0, 3).map(exp => (
                      <Badge key={exp} variant="secondary" className="bg-[#2D3561]/10 text-[#2D3561]">
                        {exp}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-[#2D3561] hover:bg-[#1a1f3a]">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Session
                  </Button>
                  <Button variant="outline" size="icon" className="border-[#2D3561] text-[#2D3561] hover:bg-[#2D3561]/5">
                    <MessageSquare className="w-4 h-4" />
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