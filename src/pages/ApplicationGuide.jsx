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
  Youtube
} from "lucide-react";

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
  const [selectedUni, setSelectedUni] = useState(savedUniversities[0]);

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
    <div className="h-[calc(100vh-80px)] bg-slate-50 py-6 lg:overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch h-full">
          
          {/* Left Sidebar Layout */}
          {activeView === "dashboard" ? (
            <div className="w-full lg:w-64 flex-shrink-0 flex flex-col h-full">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-y-auto flex-1">
                <div className="p-2">
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
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors">
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
              <div className="w-16 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col items-center py-4 space-y-4 h-full">
                <button onClick={() => setActiveView("dashboard")} className="p-3 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors" title="Dashboard">
                  <Home className="w-5 h-5" />
                </button>
                <button className="p-3 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors" title="My Application">
                  <FileText className="w-5 h-5" />
                </button>
                <button onClick={() => setActiveView("universities")} className="p-3 bg-slate-100 rounded-lg text-slate-900 transition-colors" title="My Universities">
                  <GraduationCap className="w-5 h-5" />
                </button>
                <Link to={createPageUrl("Universities")} className="p-3 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors" title="University Search">
                  <Search className="w-5 h-5" />
                </Link>
              </div>

              {/* Secondary Sidebar (Universities List) */}
              <div className="flex-1 bg-white overflow-y-auto h-full">
                <div className="p-4 border-b border-slate-100">
                  <h2 className="font-bold text-lg text-slate-800">My Universities</h2>
                </div>
                <div className="p-2 border-b border-slate-100">
                  <button className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded">
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
              </div>
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
                      </AccordionContent>
                    </AccordionItem>

                  </Accordion>
                </div>
              </>
            ) : (
              <div className="min-h-full">
                {selectedUni ? (
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