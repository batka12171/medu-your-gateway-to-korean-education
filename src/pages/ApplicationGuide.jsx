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
  Sun
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

export default function ApplicationGuide() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
    <div className="min-h-screen bg-slate-50 pt-6 pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden lg:sticky lg:top-24">
              <div className="p-2">
                <div className="bg-slate-100 rounded-lg p-3 flex items-center gap-3 font-semibold text-slate-800 mb-4">
                  <Home className="w-5 h-5" />
                  Dashboard
                </div>
                
                <div className="px-3 mb-2 text-xs font-bold text-slate-400 tracking-wider uppercase">
                  Apply
                </div>
                <div className="space-y-1 mb-6">
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors">
                    <FileText className="w-5 h-5" />
                    My Application
                  </button>
                  <Link to={createPageUrl("SavedUniversities")} className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md transition-colors">
                    <GraduationCap className="w-5 h-5" />
                    My Universities
                  </Link>
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

          {/* Main Content */}
          <div className="flex-1">
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
                          <div className="w-8 h-8 rounded-full border-2 border-dashed border-[#ff7300]/40 flex items-center justify-center text-[#ff7300]">
                            <div className="w-2 h-2 rounded-full bg-transparent" />
                          </div>
                          <span className="text-xs font-medium text-[#ff7300] hover:underline cursor-pointer">
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
                        <span>0 universities on my list</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div className="h-full bg-slate-200 w-0" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                      <div className="w-3 h-3 rounded-full border-2 border-dashed border-[#ff7300]/40" />
                      0 in progress
                    </div>
                    <Link to={createPageUrl("SavedUniversities")} className="text-sm font-medium text-[#ff7300] hover:underline flex items-center gap-1">
                      <ChevronDown className="w-4 h-4" />
                      Show universities
                    </Link>

                    <div className="mt-8">
                      <h4 className="font-bold text-slate-800 mb-2">Deadlines</h4>
                      <p className="text-sm text-slate-500">0/0 deadlines added</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

              </Accordion>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 lg:sticky lg:top-24">
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

              <div className="space-y-4 max-h-[calc(100vh-320px)] overflow-y-auto pr-2">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <div key={index} className="pt-4 border-t border-slate-100 first:border-0 first:pt-0">
                      <h4 className="font-bold text-sm text-slate-800 mb-1">{faq.question}</h4>
                      <Accordion type="single" collapsible className="w-full border-none">
                        <AccordionItem value={`faq-${index}`} className="border-none">
                          <AccordionTrigger className="py-1 hover:no-underline text-sm font-medium text-[#ff7300] flex gap-1 justify-start">
                            Read answer
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
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}