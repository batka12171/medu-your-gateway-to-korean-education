import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Trophy, ArrowLeft, Check, Plus, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UniversityDetails({ uni, onBack, onSave, savedUnis, isSaving }) {
  const isSaved = savedUnis.some(su => su.university_name === uni.name);
  const [activeTab, setActiveTab] = useState("About");

  const sidebarLinks = [
    "About",
    "Will you get in?",
    "Student demographics",
    "Admitted profiles",
    "Cost of education",
    "Employment figure",
    "Financial awards",
    "Connect with us",
    "Reviews"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white min-h-screen pb-20"
    >
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-[#ff7300] transition-colors font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Universities
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-[#fff9f0] border-y border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            
            {/* Left Content */}
            <div className="flex-1 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-8 h-8 text-[#ff7300]" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold text-slate-900">{uni.name}</h1>
                    {uni.qs_ranking && (
                      <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 text-white rounded-full font-bold shadow-md border-2 border-amber-200">
                        {uni.qs_ranking}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>{uni.location}, South Korea</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-orange-200/50">
                <div>
                  <p className="text-2xl font-bold text-slate-900">{uni.type}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">University</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{uni.student_count}</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Total Students</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">34%</p>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-1">Intl Students</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white border-0 shadow-md flex-1 lg:flex-none">
                  RateMyChances
                </Button>
                <Button className="bg-gradient-to-b from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white border-0 shadow-md flex-1 lg:flex-none">
                  Visa Approval Chances
                </Button>
              </div>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-[500px] h-[300px] rounded-xl overflow-hidden shadow-xl border-4 border-white flex-shrink-0">
              <img 
                src={uni.image_url || "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80"} 
                alt={uni.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Program Tabs */}
      <div className="border-b border-slate-200 bg-white sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar py-2">
            <div className="flex bg-slate-50 rounded-lg p-1 border border-slate-200">
              {["Engineering", "Business", "Law", "Medicine", "Undergrad"].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-2.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                    tab === "Engineering" 
                      ? "bg-amber-400 text-slate-900 shadow-sm" 
                      : "text-slate-600 hover:bg-slate-200/50 hover:text-slate-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0 space-y-1">
            {sidebarLinks.map((link) => (
              <button
                key={link}
                onClick={() => setActiveTab(link)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === link
                    ? "bg-slate-100 text-[#ff7300] font-bold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-[#ff7300]"
                }`}
              >
                {link}
                {link === "Will you get in?" && <Trophy className={`w-4 h-4 ${activeTab === link ? "text-[#ff7300]" : "text-amber-500"}`} />}
              </button>
            ))}
          </div>

          {/* Middle Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">{activeTab}</h2>
              
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-600 leading-relaxed mb-6">
                  Situated in {uni.location}, {uni.name} is a prestigious {uni.type.toLowerCase()} university known for its pioneering research and comprehensive academic programs. It offers a plethora of opportunities for international students to lead innovation in technology, business, and humanities, preparing them to enter a global workforce by providing international exposure.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Apart from its strong academic curriculum, the university constitutes academic divisions that are concentrated on domains like applied science, engineering, management, and public health. Intellectual figures, prominent researchers, and successful alumni have been affiliated with the university.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  The {uni.top_programs?.[0] || "Engineering"} department has a high graduate enrollment with a significant percentage of international students. The tuition fees for {uni.name} vary by program, but scholarships and financial aid are available to support international students throughout their studies.
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
            
            {/* Get Help Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Get help getting into {uni.name}</h3>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex flex-col xl:flex-row items-start xl:items-center justify-between mb-4 gap-3">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">Complete Application Help</span>
                </div>
                <Button className="bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs px-3 h-8 w-full xl:w-auto">
                  Check Now
                </Button>
              </div>
              <Button 
                onClick={() => onSave(uni.name)}
                disabled={isSaving || isSaved}
                className={`w-full font-bold shadow-sm py-6 ${
                  isSaved 
                    ? "bg-green-500 hover:bg-green-600 text-white" 
                    : "bg-[#ff7300] hover:bg-[#cc5c00] text-white"
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-5 h-5 mr-2" /> Added to Apply List
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" /> Add to Apply List
                  </>
                )}
              </Button>
            </div>

            {/* Similar Universities */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Similar Universities</h3>
              <div className="space-y-4">
                {[
                  { name: "KAIST", location: "Daejeon, South Korea" },
                  { name: "Yonsei University", location: "Seoul, South Korea" },
                  { name: "Korea University", location: "Seoul, South Korea" }
                ].map((similar) => (
                  <div key={similar.name} className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                      <GraduationCap className="w-5 h-5 text-slate-500 group-hover:text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 group-hover:text-[#ff7300] transition-colors">{similar.name}</p>
                      <p className="text-xs text-slate-500">{similar.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </motion.div>
  );
}