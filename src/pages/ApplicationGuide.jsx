import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Home,
  FileText,
  GraduationCap,
  Search,
  Calendar,
  Users,
  Settings,
  LogOut,
  ChevronDown,
  HelpCircle,
  Sun,
  ExternalLink,
  CheckCircle,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Plus,
  X
} from "lucide-react";
import { toast } from "sonner";
import MeduLogo from "@/components/MeduLogo";

const steps = [
  { id: "profile", label: "Profile" },
  { id: "family", label: "Family" },
  { id: "education", label: "Education" },
  { id: "testing", label: "Testing" },
  { id: "activities", label: "Activities" },
  { id: "writing", label: "Writing" }
];

const faqs = [
  {
    question: "What are the typical application deadlines?",
    answer: "Most Korean universities have two intake periods: Spring (March) and Fall (September). Spring admission applications are typically due in September-November, while Fall admission applications are due in March-May. Check each university's specific deadlines as they may vary."
  },
  {
    question: "Do I need to know Korean to study in Korea?",
    answer: "It depends on your program. Many graduate programs and some undergraduate programs are offered in English. However, for Korean-taught programs, you'll typically need TOPIK Level 3-4 minimum. Even for English programs, basic Korean is helpful for daily life."
  },
  {
    question: "What scholarships are available for international students?",
    answer: "Popular scholarships include: Korean Government Scholarship (GKS/KGSP), university-specific scholarships, NIIED scholarships, and foundation scholarships. Many cover tuition, living expenses, and even flight tickets."
  },
  {
    question: "What documents do I need for application?",
    answer: "Common requirements include: academic transcripts, graduation certificate, passport copy, personal statement, study plan, recommendation letters (1-3), language proficiency scores, and financial documents. Some programs may require portfolio or research proposals."
  },
  {
    question: "How much does it cost to study in Korea?",
    answer: "Tuition varies widely: National universities cost $2,000-5,000/semester, while private universities range from $4,000-8,000/semester. Living expenses in Seoul are approximately $800-1,200/month. Many students offset costs through scholarships and part-time work."
  },
  {
    question: "Can international students work in Korea?",
    answer: "Yes! D-2 visa holders can work part-time up to 20 hours/week during semesters and unlimited hours during breaks, after obtaining work permission from immigration. Common jobs include tutoring, cafe work, and campus positions."
  }
];

const savedUniversities = [
  { id: 1, name: "Seoul National University", email: "admission@snu.ac.kr", phone: "+82 2-880-5114", address: "1 Gwanak-ro, Gwanak-gu, Seoul, 08826, South Korea", deadline: "July 28, 2026", website: "https://en.snu.ac.kr", fee: 50 },
  { id: 2, name: "KAIST", email: "admission@kaist.ac.kr", phone: "+82 42-350-2114", address: "291 Daehak-ro, Yuseong-gu, Daejeon, 34141, South Korea", deadline: "August 15, 2026", website: "https://kaist.ac.kr", fee: 60 }
];

export default function ApplicationGuide() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("dashboard"); // "dashboard" or "universities"
  const [selectedUni, setSelectedUni] = useState("overview");
  const [activeAppSection, setActiveAppSection] = useState("profile");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (e) {
        setUser(null);
      }
    };
    loadUser();
  }, []);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen bg-gradient-to-br from-orange-50 via-amber-50/50 to-orange-100/40 py-6 lg:overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch h-full">
          
          {/* Left Sidebar Layout */}
          {activeView === "dashboard" ? (
            <div className="w-full lg:w-64 flex-shrink-0 flex flex-col h-full">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-y-auto flex-1">
                <div className="p-4 flex items-center gap-3">
                  <MeduLogo size={32} dark={true} className="drop-shadow-sm" />
                  <div className="flex flex-col">
                    <span className="text-lg font-extrabold tracking-widest leading-none text-slate-800">MEDU</span>
                    <span className="text-[9px] font-medium tracking-wider mt-0.5 text-[#ff7300]">한국 유학 가이드</span>
                  </div>
                </div>
                <div className="px-2 pb-2">
                  <button 
                    onClick={() => setActiveView("dashboard")}
                    className="w-full bg-slate-100 rounded-lg p-3 flex items-center gap-3 font-semibold text-slate-800 mb-4"
                  >
                    <Home className="w-5 h-5" />
                    Dashboard
                  </button>
                  
                  <div className="px-3 mb-2 text-xs font-bold text-slate-400 tracking-wider uppercase">
                    Apply
                  </div>
                  <div className="space-y-1 mb-6">
                    <button 
                      onClick={() => setActiveView("application")}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
                    >
                      <FileText className="w-5 h-5" />
                      My Application
                    </button>
                    <button 
                      onClick={() => setActiveView("universities")}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
                    >
                      <GraduationCap className="w-5 h-5" />
                      My Universities
                    </button>
                  </div>

                  <div className="px-3 mb-2 text-xs font-bold text-slate-400 tracking-wider uppercase">
                    Explore
                  </div>
                  <div className="space-y-1 mb-6">
                    <Link to={createPageUrl("Universities")} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors">
                      <Search className="w-5 h-5" />
                      University search
                    </Link>
                    <Link to={createPageUrl("Events")} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors">
                      <Calendar className="w-5 h-5" />
                      Events
                    </Link>
                    <Link to={createPageUrl("Mentors")} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors">
                      <Users className="w-5 h-5" />
                      Mentors
                    </Link>
                  </div>
                </div>
                
                <div className="border-t border-slate-100 p-2">
                  <Link to={createPageUrl("Profile")} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors">
                    <Settings className="w-5 h-5" />
                    Settings
                  </Link>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors" onClick={() => base44.auth.logout()}>
                    <LogOut className="w-5 h-5" />
                    Sign out
                  </button>
                </div>

                {user && (
                  <div className="border-t border-slate-100 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ff7300] flex items-center justify-center text-white font-bold flex-shrink-0">
                      {user.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-slate-900 truncate">{user.full_name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full lg:w-[340px] flex-shrink-0 flex bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full">
              {/* Narrow Sidebar */}
              <div className="w-16 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col items-center py-4 h-full">
                <div className="mb-2">
                  <MeduLogo size={28} dark={true} className="drop-shadow-sm" />
                </div>
                <div className="flex flex-col items-center space-y-4 flex-1 mt-4 w-full">
                  <button onClick={() => setActiveView("dashboard")} className={`p-3 rounded-lg transition-colors ${activeView === "dashboard" ? "bg-slate-100 text-slate-900" : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"}`} title="Dashboard">
                    <Home className="w-5 h-5" />
                  </button>
                  <button onClick={() => setActiveView("application")} className={`p-3 rounded-lg transition-colors ${activeView === "application" ? "bg-slate-100 text-slate-900" : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"}`} title="My Application">
                    <FileText className="w-5 h-5" />
                  </button>
                  <button onClick={() => setActiveView("universities")} className={`p-3 rounded-lg transition-colors ${activeView === "universities" ? "bg-slate-100 text-slate-900" : "hover:bg-slate-100 text-slate-500 hover:text-slate-900"}`} title="My Universities">
                    <GraduationCap className="w-5 h-5" />
                  </button>
                  <Link to={createPageUrl("Universities")} className="p-3 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors" title="University Search">
                    <Search className="w-5 h-5" />
                  </Link>
                </div>

                <div className="flex flex-col items-center space-y-4 mt-auto pt-4 w-full">
                  <Link to={createPageUrl("Profile")} className="text-slate-500 hover:text-slate-900 transition-colors" title="Settings">
                    <Settings className="w-5 h-5" />
                  </Link>
                  <button onClick={() => base44.auth.logout()} className="text-slate-500 hover:text-slate-900 transition-colors" title="Sign out">
                    <LogOut className="w-5 h-5" />
                  </button>
                  {user ? (
                    <div className="w-8 h-8 rounded-full bg-[#0077b6] flex items-center justify-center text-white font-bold text-xs" title={user.full_name}>
                      {user.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                      ?
                    </div>
                  )}
                </div>
              </div>

              {/* Secondary Sidebar */}
              {activeView === "universities" ? (
                <div className="flex-1 bg-white overflow-y-auto h-full">
                <div className="p-4 border-b border-slate-100">
                  <h2 className="font-bold text-lg text-slate-800">My Universities</h2>
                </div>
                <div className="p-2 border-b border-slate-100">
                  <button 
                    onClick={() => setSelectedUni("overview")}
                    className={`w-full text-left px-3 py-2 text-sm font-medium rounded ${selectedUni === "overview" ? "bg-slate-200/50 text-slate-800" : "text-slate-700 hover:bg-slate-50"}`}
                  >
                    Overview
                  </button>
                </div>
                <Accordion type="single" collapsible defaultValue={`uni-${selectedUni.id}`} className="w-full">
                  {savedUniversities.map(uni => (
                    <AccordionItem value={`uni-${uni.id}`} key={uni.id} className="border-b-0 border-t border-slate-100">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-50 text-sm font-bold text-slate-800 text-left">
                        {uni.name}
                      </AccordionTrigger>
                      <AccordionContent className="pb-2 pt-0 px-0">
                        <div 
                          className={`px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${selectedUni.id === uni.id ? 'bg-slate-200/50 text-slate-800 border-l-4 border-slate-400' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
                          onClick={() => setSelectedUni(uni)}
                        >
                          College information
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Application</p>
                          <div className="space-y-3 pl-2">
                            <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                              <CheckCircle className="w-4 h-4 text-green-600" /> General
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                              <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#4A90C5]/40 flex-shrink-0" /> Academics
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                              <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#4A90C5]/40 flex-shrink-0" /> Writing
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                              <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#4A90C5]/40 flex-shrink-0" /> Recommenders and FERPA
                            </div>
                            <div className="flex items-center gap-3 text-sm text-slate-600">
                              <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#4A90C5]/40 flex-shrink-0" /> Review and submit application
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <div className="p-4 border-t border-slate-100">
                  <button 
                    onClick={() => {
                      if (savedUniversities.length >= 2) {
                        toast.error("You have reached the maximum limit of 2 universities.");
                      } else {
                        window.location.href = createPageUrl("Universities");
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add university
                  </button>
                </div>
              </div>
              ) : (
              <div className="flex-1 bg-white overflow-y-auto h-full">
                <div className="p-4 border-b border-slate-100">
                  <h2 className="font-bold text-lg text-slate-800">My Application</h2>
                </div>
                <Accordion type="single" collapsible defaultValue="profile" className="w-full">
                  <AccordionItem value="profile" className="border-b border-slate-100">
                    <AccordionTrigger onClick={() => setActiveAppSection("profile")} className="px-4 py-3 hover:no-underline hover:bg-slate-50 text-sm font-bold text-slate-800 text-left">
                      Profile
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pt-0 px-0">
                      <div onClick={() => setActiveAppSection("profile")} className={`px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${activeAppSection === "profile" ? "bg-slate-200/50 text-slate-800 border-l-4 border-slate-400" : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`}>
                        Personal Information
                      </div>
                      <div className="px-4 py-2 text-sm font-medium cursor-pointer transition-colors text-slate-600 hover:bg-slate-50 border-l-4 border-transparent">
                        Address
                      </div>
                      <div className="px-4 py-2 text-sm font-medium cursor-pointer transition-colors text-slate-600 hover:bg-slate-50 border-l-4 border-transparent">
                        Contact Details
                      </div>
                      <div className="px-4 py-2 text-sm font-medium cursor-pointer transition-colors text-slate-600 hover:bg-slate-50 border-l-4 border-transparent">
                        Demographics
                      </div>
                      <div className="px-4 py-2 text-sm font-medium cursor-pointer transition-colors text-slate-600 hover:bg-slate-50 border-l-4 border-transparent">
                        Language
                      </div>
                      <div className="px-4 py-2 text-sm font-medium cursor-pointer transition-colors text-slate-600 hover:bg-slate-50 border-l-4 border-transparent">
                        Geography and Nationality
                      </div>
                      <div className="px-4 py-2 text-sm font-medium cursor-pointer transition-colors text-slate-600 hover:bg-slate-50 border-l-4 border-transparent">
                        Common App Fee Waiver
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="family" className="border-b border-slate-100">
                    <AccordionTrigger onClick={() => setActiveAppSection("family")} className="px-4 py-3 hover:no-underline hover:bg-slate-50 text-sm font-bold text-slate-800 text-left">
                      Family
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pt-0 px-0">
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="education" className="border-b border-slate-100">
                    <AccordionTrigger onClick={() => setActiveAppSection("education")} className="px-4 py-3 hover:no-underline hover:bg-slate-50 text-sm font-bold text-slate-800 text-left">
                      Education
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pt-0 px-0">
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="testing" className="border-b border-slate-100">
                    <AccordionTrigger onClick={() => setActiveAppSection("testing")} className="px-4 py-3 hover:no-underline hover:bg-slate-50 text-sm font-bold text-slate-800 text-left">
                      Testing
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pt-0 px-0">
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="activities" className="border-b border-slate-100">
                    <AccordionTrigger onClick={() => setActiveAppSection("activities")} className="px-4 py-3 hover:no-underline hover:bg-slate-50 text-sm font-bold text-slate-800 text-left">
                      Activities
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pt-0 px-0">
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="writing" className="border-b border-slate-100">
                    <AccordionTrigger onClick={() => setActiveAppSection("writing")} className="px-4 py-3 hover:no-underline hover:bg-slate-50 text-sm font-bold text-slate-800 text-left">
                      Writing
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pt-0 px-0">
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
              )}
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full">
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
            {activeView === "dashboard" ? (
              <>
                {/* Banner */}
                <div className="bg-[#fff0e6] rounded-2xl p-8 mb-8 flex items-center justify-between relative overflow-hidden">
                  <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#cc5c00] flex items-center gap-3">
                      <Sun className="w-8 h-8 text-[#ff7300]" />
                      Good morning{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ""}!
                    </h1>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-slate-900 mb-6">Dashboard</h2>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <Accordion type="multiple" defaultValue={["app", "colleges"]} className="w-full">
                    
                    {/* Application Section */}
                    <AccordionItem value="app" className="border-b border-slate-100">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50">
                        <span className="text-xl font-bold text-slate-800">My Application</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2">
                        <div className="mb-6">
                          <div className="flex justify-between text-xs text-slate-500 mb-2">
                            <span>0/6 sections complete</span>
                          </div>
                          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div className="h-full bg-slate-200 w-0" />
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap sm:flex-nowrap justify-between gap-4">
                          {steps.map((step) => (
                            <div key={step.id} className="flex flex-col items-center gap-2 flex-1 min-w-[60px]">
                              <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#4A90C5]/40 flex items-center justify-center text-[#4A90C5]">
                                <div className="w-2 h-2 rounded-full bg-transparent" />
                              </div>
                              <span className="text-xs font-medium text-[#4A90C5] hover:underline cursor-pointer">
                                {step.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Colleges Section */}
                    <AccordionItem value="colleges" className="border-b-0">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50">
                        <span className="text-xl font-bold text-slate-800">My Universities</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2">
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-slate-500 mb-2">
                            <span>{savedUniversities.length} universities on my list</span>
                          </div>
                          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div className="h-full bg-slate-200 w-0" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                          <div className="w-3 h-3 rounded-full border-2 border-dashed border-[#4A90C5]/40" />
                          {savedUniversities.length} in progress
                        </div>
                        <button onClick={() => setActiveView("universities")} className="text-sm font-medium text-[#0077b6] hover:underline flex items-center gap-1">
                          <ChevronDown className="w-4 h-4" />
                          Show universities
                        </button>

                        <div className="mt-8">
                          <h4 className="font-bold text-slate-800 mb-2">Deadlines</h4>
                          <p className="text-sm text-slate-500">1/4 deadlines added</p>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-100">
                          <button 
                            onClick={() => {
                              if (savedUniversities.length >= 2) {
                                toast.error("You have reached the maximum limit of 2 universities.");
                              } else {
                                window.location.href = createPageUrl("Universities");
                              }
                            }}
                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            Add university
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                  </Accordion>
                </div>
              </>
            ) : activeView === "application" ? (
              <div className="min-h-full">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm text-slate-500 mb-1 font-medium">Complete your Application</p>
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                      {activeAppSection === "profile" && "Personal Information"}
                      {activeAppSection === "family" && "Family Details"}
                      {activeAppSection === "education" && "Education History"}
                      {activeAppSection === "testing" && "Standardized Testing"}
                      {activeAppSection === "activities" && "Activities"}
                      {activeAppSection === "writing" && "Personal Essay"}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-[#0077b6]">
                      <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#0077b6]/40 flex-shrink-0" />
                      In progress
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-slate-300 rounded-full font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                    Preview
                  </button>
                </div>

                <div className="max-w-2xl mt-8">
                  {activeAppSection === "profile" && (
                    <>
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Legal first/given name<span className="text-red-500">*</span>
                        </label>
                        <Input defaultValue="Bat" className="w-full" />
                      </div>

                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Would you like to share a different first name that people call you?
                        </label>
                        <div className="space-y-3 mb-5">
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="diffName" className="w-4 h-4 border-slate-300 text-[#0077b6]" />
                            Yes
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="diffName" defaultChecked className="w-4 h-4 border-slate-300 text-[#0077b6]" />
                            No
                          </label>
                        </div>
                        <button className="px-4 py-1.5 border border-slate-300 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                          Clear answer
                        </button>
                      </div>

                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Middle name
                        </label>
                        <Input className="w-full" />
                      </div>

                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Last/family/surname<span className="text-red-500">*</span>
                        </label>
                        <Input defaultValue="Bold" className="w-full" />
                      </div>
                      
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Suffix
                        </label>
                        <Input className="w-full" />
                      </div>
                    </>
                  )}

                  {activeAppSection === "family" && (
                    <>
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Parents' marital status
                        </label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                          <option value="">Select status...</option>
                          <option value="married">Married</option>
                          <option value="separated">Separated</option>
                          <option value="divorced">Divorced</option>
                          <option value="never_married">Never married</option>
                          <option value="widowed">Widowed</option>
                        </select>
                      </div>
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          With whom do you make your permanent home?
                        </label>
                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                          <option value="">Select...</option>
                          <option value="both_parents">Both parents</option>
                          <option value="parent_1">Parent 1</option>
                          <option value="parent_2">Parent 2</option>
                          <option value="legal_guardian">Legal Guardian</option>
                          <option value="ward_of_court">Ward of the Court/State</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Do you have any children?
                        </label>
                        <div className="space-y-3 mb-5">
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="hasChildren" className="w-4 h-4 border-slate-300 text-[#0077b6]" />
                            Yes
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="hasChildren" defaultChecked className="w-4 h-4 border-slate-300 text-[#0077b6]" />
                            No
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  {activeAppSection === "education" && (
                    <>
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Current or most recent secondary/high school
                        </label>
                        <Input placeholder="Find school..." className="w-full" />
                        <p className="text-xs text-slate-500 mt-2">Search by school name, city, state, or CEEB code</p>
                      </div>
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Date of entry
                        </label>
                        <Input type="month" className="w-full" />
                      </div>
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Is this a boarding school?
                        </label>
                        <div className="space-y-3 mb-5">
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="isBoarding" className="w-4 h-4 border-slate-300 text-[#0077b6]" />
                            Yes
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="isBoarding" defaultChecked className="w-4 h-4 border-slate-300 text-[#0077b6]" />
                            No
                          </label>
                        </div>
                      </div>
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Did or will you graduate from this school?
                        </label>
                        <div className="space-y-3 mb-5">
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="willGraduate" defaultChecked className="w-4 h-4 border-slate-300 text-[#0077b6]" />
                            Yes
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="willGraduate" className="w-4 h-4 border-slate-300 text-[#0077b6]" />
                            No
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  {activeAppSection === "testing" && (
                    <>
                      <div className="mb-8">
                        <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                          In addition to sending official score reports as required by colleges, you have the option to self-report scores or future test dates for any of the following standardized tests: ACT, SAT/SAT Subject Tests, AP, IB, TOEFL, PTE Academic, and IELTS.
                        </p>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Do you wish to self-report scores or future test dates for any of these standardized tests?
                        </label>
                        <div className="space-y-3 mb-5">
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="reportTests" className="w-4 h-4 border-slate-300 text-[#0077b6]" />
                            Yes
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="reportTests" defaultChecked className="w-4 h-4 border-slate-300 text-[#0077b6]" />
                            No
                          </label>
                        </div>
                      </div>

                      <div className="mb-8 border-t border-slate-200 pt-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          International Applicants
                        </label>
                        <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                          Is promotion within your educational system based upon standard leaving examinations given at the end of lower and/or senior secondary school by a state or national leaving examinations board? (Students studying in the US typically answer no to this question.)
                        </p>
                        <div className="space-y-3 mb-5">
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="intlTests" className="w-4 h-4 border-slate-300 text-[#0077b6]" />
                            Yes
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="intlTests" defaultChecked className="w-4 h-4 border-slate-300 text-[#0077b6]" />
                            No
                          </label>
                        </div>
                      </div>
                    </>
                  )}

                  {activeAppSection === "activities" && (
                    <>
                      <div className="mb-8">
                        <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                          Reporting activities can help a college better understand your life outside of the classroom. Your activities may include arts, athletics, clubs, employment, personal commitments, and other pursuits.
                        </p>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                          Do you have any activities that you wish to report?
                        </label>
                        <div className="space-y-3 mb-5">
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="reportActivities" defaultChecked className="w-4 h-4 border-slate-300 text-[#0077b6]" />
                            Yes
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="reportActivities" className="w-4 h-4 border-slate-300 text-[#0077b6]" />
                            No
                          </label>
                        </div>
                      </div>

                      <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
                        <div className="mb-6">
                          <label className="block text-sm font-bold text-slate-700 mb-2">Activity type</label>
                          <select className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="">Select type...</option>
                            <option value="art">Art</option>
                            <option value="athletics">Athletics</option>
                            <option value="club">Club/Organization</option>
                            <option value="community">Community Service</option>
                            <option value="work">Work/Employment</option>
                          </select>
                        </div>
                        <div className="mb-6">
                          <label className="block text-sm font-bold text-slate-700 mb-2">Position/Leadership description</label>
                          <Input placeholder="e.g., President, Captain, Founder" className="w-full bg-white" />
                        </div>
                        <div className="mb-6">
                          <label className="block text-sm font-bold text-slate-700 mb-2">Organization name</label>
                          <Input className="w-full bg-white" />
                        </div>
                        <div className="mb-2">
                          <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                          <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Please describe this activity, including what you accomplished and any recognition you received, etc."></textarea>
                        </div>
                      </div>
                      
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors">
                        <Plus className="w-4 h-4" />
                        Add another activity
                      </button>
                    </>
                  )}

                  {activeAppSection === "writing" && (
                    <>
                      <div className="mb-8">
                        <p className="text-sm text-slate-700 mb-6 leading-relaxed">
                          The essay demonstrates your ability to write clearly and concisely on a selected topic and helps you distinguish yourself in your own voice. What do you want the readers of your application to know about you apart from courses, grades, and test scores?
                        </p>
                        
                        <label className="block text-sm font-bold text-slate-700 mb-4">
                          Please select an essay prompt:
                        </label>
                        <div className="space-y-4 mb-8">
                          <label className="flex items-start gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="essayPrompt" className="mt-1 w-4 h-4 border-slate-300 text-[#0077b6] flex-shrink-0" />
                            <span>Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.</span>
                          </label>
                          <label className="flex items-start gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="essayPrompt" className="mt-1 w-4 h-4 border-slate-300 text-[#0077b6] flex-shrink-0" />
                            <span>The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?</span>
                          </label>
                          <label className="flex items-start gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="essayPrompt" className="mt-1 w-4 h-4 border-slate-300 text-[#0077b6] flex-shrink-0" />
                            <span>Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?</span>
                          </label>
                        </div>

                        <div className="mb-2">
                          <div className="flex justify-between items-end mb-2">
                            <label className="block text-sm font-bold text-slate-700">Essay text</label>
                            <span className="text-xs text-slate-500">250 - 650 words</span>
                          </div>
                          <textarea className="flex min-h-[300px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Type or paste your essay here..."></textarea>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="min-h-full">
                {selectedUni === "overview" ? (
                  <div>
                    <p className="text-sm text-slate-500 mb-1 font-medium">My Colleges</p>
                    <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-200 border-dashed">
                      <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">Overview</h1>
                      <button className="px-4 py-2 border border-slate-300 rounded-full text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add a college
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4 text-sm">
                      <a href="#" className="text-[#0077b6] hover:underline flex items-center gap-1 font-medium">Compare application requirements <ExternalLink className="w-3.5 h-3.5" /></a>
                      <span className="text-slate-500">Sort by: College name <ChevronDown className="w-4 h-4 inline" /></span>
                    </div>

                    <div className="space-y-4">
                      {savedUniversities.map((uni) => (
                        <div key={uni.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                          <div className="p-5 flex gap-4 relative">
                            <div className="w-20 h-14 bg-amber-400 rounded flex items-center justify-center text-white text-[10px] font-bold px-2 text-center leading-tight shadow-sm border border-amber-500">
                              {uni.name}
                            </div>
                            <div className="flex-1 pt-1">
                              <h3 
                                className="text-[#0077b6] font-medium text-lg hover:underline cursor-pointer pr-16"
                                onClick={() => setSelectedUni(uni)}
                              >
                                {uni.name}
                              </h3>
                              <p className="text-slate-800 font-bold text-sm mb-1.5">{uni.deadline}</p>
                              <p className="text-sm text-slate-600 flex items-center gap-1.5 font-medium"><FileText className="w-4 h-4 text-purple-600" /> Application – <span className="italic font-normal">In progress</span></p>
                            </div>
                            <div className="absolute top-5 right-5 flex gap-3">
                              <button className="text-slate-500 hover:text-slate-700"><HelpCircle className="w-5 h-5 fill-slate-500 text-white" /></button>
                              <button className="text-slate-500 hover:text-slate-700"><X className="w-5 h-5" /></button>
                            </div>
                          </div>
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value={`details-${uni.id}`} className="border-none">
                              <AccordionTrigger className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 hover:no-underline text-xs font-medium text-slate-500 justify-center gap-1 border-t border-slate-200">
                                Show more details
                              </AccordionTrigger>
                              <AccordionContent className="p-6 pt-5">
                                <div className="space-y-6">
                                  <div>
                                    <h4 className="text-[13px] text-slate-500 font-bold mb-3 uppercase tracking-wider">Application Status</h4>
                                    <ul className="space-y-2.5 text-sm text-slate-600 font-medium">
                                      <li className="flex gap-2.5"><FileText className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" /> <span><a href="#" className="text-[#0077b6] hover:underline">My Application</a> – <span className="italic font-normal">In progress</span></span></li>
                                      <li className="flex gap-2.5"><FileText className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" /> <span><a href="#" className="text-[#0077b6] hover:underline">Questions</a> – <span className="italic font-normal">In progress</span></span></li>
                                      <li className="flex gap-2.5"><FileText className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" /> <span><a href="#" className="text-[#0077b6] hover:underline">Recommenders and FERPA</a> – <span className="italic font-normal">In progress</span></span></li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="text-[13px] text-slate-500 font-bold mb-3 uppercase tracking-wider">Writing Requirements</h4>
                                    <div className="mb-4">
                                      <a href="#" className="text-sm font-medium text-[#0077b6] hover:underline block mb-1">Common App personal essay</a>
                                      <div className="flex items-center gap-1.5 text-sm font-bold text-red-600"><span className="w-4 h-4 bg-red-600 text-white rounded flex items-center justify-center text-[10px] font-bold">!</span> Required</div>
                                    </div>
                                    <div className="mb-4">
                                      <a href="#" className="text-sm font-medium text-[#0077b6] hover:underline block mb-1">College Questions</a>
                                      <div className="flex items-center gap-1.5 text-sm font-bold text-red-600"><span className="w-4 h-4 bg-red-600 text-white rounded flex items-center justify-center text-[10px] font-bold">!</span> 1 Required Question</div>
                                    </div>
                                    <div>
                                      <h5 className="text-sm font-medium text-slate-700 mb-1">Writing Supplement</h5>
                                      <p className="text-sm text-slate-600">This college does not use a writing supplement for any additional writing requirements.</p>
                                    </div>
                                  </div>
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : selectedUni ? (
                  <div>
                    <p className="text-sm text-slate-500 mb-1 font-medium">Apply to {selectedUni.name}</p>
                    <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-200 border-dashed">
                      <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">{selectedUni.name}</h1>
                      <div className="w-24 h-12 bg-amber-400 rounded flex items-center justify-center text-white text-xs font-bold px-2 text-center border border-amber-500 shadow-sm">
                        {selectedUni.name}
                      </div>
                    </div>
                    
                    <div className="text-sm text-slate-600 mb-10 space-y-1 font-medium">
                      <p>
                        <a href={`mailto:${selectedUni.email}`} className="text-[#0077b6] hover:underline">{selectedUni.email}</a> 
                        {' '}• Phone{' '} 
                        <a href={`tel:${selectedUni.phone}`} className="text-[#0077b6] hover:underline">{selectedUni.phone}</a>
                      </p>
                      <p className="max-w-xs text-slate-500 italic mt-2">{selectedUni.address}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8 mb-10">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 mb-4">Application deadlines</h3>
                        <p className="font-bold text-slate-800 mb-1">Fall 2026</p>
                        <p className="text-sm text-slate-600 font-medium">Rolling Admission • {selectedUni.deadline}</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 mb-4">Links</h3>
                        <ul className="space-y-3 text-sm font-medium">
                          <li><a href={selectedUni.website} target="_blank" rel="noopener noreferrer" className="text-[#0077b6] hover:underline flex items-center gap-1.5">College website <ExternalLink className="w-3.5 h-3.5" /></a></li>
                          <li><a href="#" className="text-[#0077b6] hover:underline flex items-center gap-1.5">Admissions office <ExternalLink className="w-3.5 h-3.5" /></a></li>
                          <li><a href="#" className="text-[#0077b6] hover:underline flex items-center gap-1.5">Financial aid <ExternalLink className="w-3.5 h-3.5" /></a></li>
                          <li><a href="#" className="text-[#0077b6] hover:underline flex items-center gap-1.5">Virtual tour <ExternalLink className="w-3.5 h-3.5" /></a></li>
                        </ul>
                        
                        <div className="flex items-center gap-3 mt-6">
                          <button className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"><Facebook className="w-4 h-4" /></button>
                          <button className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"><Instagram className="w-4 h-4" /></button>
                          <button className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"><Twitter className="w-4 h-4" /></button>
                          <button className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"><Youtube className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>

                    <Accordion type="multiple" defaultValue={["info"]} className="w-full">
                      <AccordionItem value="info" className="border border-slate-200 bg-slate-200/50 rounded-none overflow-hidden">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline font-bold text-slate-800 text-sm">
                          Application information
                        </AccordionTrigger>
                        <AccordionContent className="p-5 bg-white border-t border-slate-200">
                          <h4 className="font-bold text-slate-900 mb-2">Application Fees:</h4>
                          <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1 mb-6 font-medium">
                            <li>First Year International Fee - ${selectedUni.fee}</li>
                            <li>First Year Domestic Fee - $0</li>
                          </ul>
                          
                          <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                            Standardized test policy: 
                            <div className="w-3.5 h-3.5 rounded-full bg-[#0077b6] text-white flex items-center justify-center text-[9px] font-bold">?</div>
                          </h4>
                          <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1 font-medium">
                            <li>Flexible</li>
                            <li>See website</li>
                            <li>Test Policy Information</li>
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ) : (
                  <div className="text-center py-20 text-slate-500">
                    Please select a university to view details.
                  </div>
                )}
              </div>
            )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0 flex flex-col h-full">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center gap-2 font-bold text-slate-800 text-lg mb-6">
                <HelpCircle className="w-5 h-5" />
                Help & support
              </div>

              <div className="mb-6">
                <label className="text-sm font-medium text-slate-700 mb-2 block">Search FAQs</label>
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="Search..." 
                    className="pr-10 bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute right-0 top-0 h-full w-10 flex items-center justify-center border-l border-slate-200 bg-slate-50 rounded-r-md">
                    <Search className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Search takes you to the student solution center</p>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <div key={index} className="pt-4 border-t border-slate-100 first:border-0 first:pt-0">
                      <h4 className="font-bold text-sm text-slate-800 mb-1">{faq.question}</h4>
                      <p className="text-sm text-slate-600 line-clamp-2">{faq.answer}</p>
                      <Accordion type="single" collapsible className="w-full border-none">
                        <AccordionItem value={`faq-${index}`} className="border-none">
                          <AccordionTrigger className="py-1 hover:no-underline text-sm font-medium text-[#0077b6] flex gap-1 justify-start">
                            Read full answer
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-slate-600 pt-2 pb-0 leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No FAQs found matching your search.</p>
                )}
                <div className="pt-4 border-t border-slate-100">
                  <a href="#" className="text-sm font-medium text-[#0077b6] hover:underline flex items-center gap-1.5">
                    All help topics <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}