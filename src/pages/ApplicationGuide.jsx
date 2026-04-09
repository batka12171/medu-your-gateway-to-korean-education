import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger } from
"@/components/ui/accordion";
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
  X,
  Upload,
  Check,
  Clock } from
"lucide-react";
import { toast } from "sonner";
import MeduLogo from "@/components/MeduLogo";

const steps = [
{ id: "profile", label: "Profile" },
{ id: "family", label: "Family" },
{ id: "education", label: "Education" },
{ id: "testing", label: "Testing" },
{ id: "activities", label: "Activities" },
{ id: "writing", label: "Writing" }];


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
}];


const savedUniversitiesData = [
{ id: 1, name: "Seoul National University", email: "admission@snu.ac.kr", phone: "+82 2-880-5114", address: "1 Gwanak-ro, Gwanak-gu, Seoul, 08826, South Korea", deadline: "July 28, 2026", website: "https://en.snu.ac.kr", fee: 50 },
{ id: 2, name: "KAIST", email: "admission@kaist.ac.kr", phone: "+82 42-350-2114", address: "291 Daehak-ro, Yuseong-gu, Daejeon, 34141, South Korea", deadline: "August 15, 2026", website: "https://kaist.ac.kr", fee: 60 }];


const checklistItemsTemplate = [
{ id: "transcript", label: "Official Transcript", status: "pending", file: null },
{ id: "recommendation1", label: "Recommendation Letter 1", status: "pending", file: null },
{ id: "recommendation2", label: "Recommendation Letter 2", status: "pending", file: null },
{ id: "personal_statement", label: "Personal Statement", status: "pending", file: null },
{ id: "portfolio", label: "Portfolio (Optional)", status: "pending", file: null }];


export default function ApplicationGuide() {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("dashboard"); // "dashboard" or "universities"
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedUni, setSelectedUni] = useState("overview");
  const [selectedUniSection, setSelectedUniSection] = useState("college_info");
  const [activeAppSection, setActiveAppSection] = useState("profile");
  const [appForms, setAppForms] = useState({});
  const [appSectionStatus, setAppSectionStatus] = useState({});
  const [uniForms, setUniForms] = useState({});
  const [uniSectionStatus, setUniSectionStatus] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [uniToDelete, setUniToDelete] = useState(null);

  const handleUniFormChange = (uniId, field, value) => {
    setUniForms((prev) => ({ ...prev, [uniId]: { ...(prev[uniId] || {}), [field]: value } }));
  };

  const handleUniSectionContinue = (uniId, currentSection, nextSection) => {
    setUniSectionStatus((prev) => ({ ...prev, [uniId]: { ...(prev[uniId] || {}), [currentSection]: true } }));
    if (nextSection) {
      setSelectedUniSection(nextSection);
    }
  };
  const isProfileComplete = appSectionStatus['profile'] && appSectionStatus['profile_address'] && appSectionStatus['profile_contact'] && appSectionStatus['profile_demographics'] && appSectionStatus['profile_language'] && appSectionStatus['profile_geography'] && appSectionStatus['profile_fee_waiver'];

  const handleAppFormChange = (field, value) => {
    setAppForms((prev) => ({ ...prev, [field]: value }));
  };

  const handleAppContinue = (currentSection, nextSection, requiredFields) => {
    const isFilled = requiredFields.every((field) => {
      const val = appForms[field];
      return val !== undefined && val !== null && val !== false && String(val).trim() !== '';
    });

    if (isFilled && currentSection) {
      setAppSectionStatus((prev) => ({ ...prev, [currentSection]: true }));
    }

    if (nextSection === 'dashboard') {
      setActiveView('dashboard');
    } else {
      setActiveAppSection(nextSection);
    }
  };

  const [savedUniversities, setSavedUniversities] = useState(
    savedUniversitiesData.map((uni) => ({
      ...uni,
      checklist: JSON.parse(JSON.stringify(checklistItemsTemplate))
    }))
  );

  const handleFileUpload = (uniId, itemId, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSavedUniversities((prev) => prev.map((uni) => {
      if (uni.id === uniId) {
        return {
          ...uni,
          checklist: uni.checklist.map((item) => {
            if (item.id === itemId) {
              return { ...item, status: "uploaded", file: file.name };
            }
            return item;
          })
        };
      }
      return uni;
    }));
    toast.success(`${file.name} uploaded successfully!`);
  };

  const handleStatusChange = (uniId, itemId, newStatus) => {
    setSavedUniversities((prev) => prev.map((uni) => {
      if (uni.id === uniId) {
        return {
          ...uni,
          checklist: uni.checklist.map((item) => {
            if (item.id === itemId) {
              return { ...item, status: newStatus };
            }
            return item;
          })
        };
      }
      return uni;
    }));
  };

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

  const filteredFaqs = faqs.filter((faq) =>
  faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
  faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const NavItem = ({ active, onClick, icon: Icon, label, narrow }) =>
  <button
    onClick={onClick}
    className={`relative w-full flex items-center ${narrow ? 'justify-center p-3' : 'gap-3 px-3 py-2.5'} text-sm font-medium rounded-lg transition-all duration-200 group ${active ? "text-slate-900 bg-slate-50" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
    title={narrow ? label : undefined}>
    
      {active &&
    <motion.div
      layoutId="activeTab"
      className={`absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#ff7300] rounded-r-md`}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }} />

    }
      <motion.div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
        <Icon className={`w-5 h-5 ${active ? "text-[#ff7300]" : ""}`} />
      </motion.div>
      {!narrow && label && <span>{label}</span>}
    </button>;


  const NavLinkItem = ({ to, icon: Icon, label, narrow }) =>
  <Link
    to={to}
    className={`relative w-full flex items-center ${narrow ? 'justify-center p-3' : 'gap-3 px-3 py-2.5'} text-sm font-medium rounded-lg transition-all duration-200 group text-slate-500 hover:bg-slate-50 hover:text-slate-900`}
    title={narrow ? label : undefined}>
    
      <motion.div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
        <Icon className="w-5 h-5 group-hover:text-[#ff7300] transition-colors" />
      </motion.div>
      {!narrow && label && <span>{label}</span>}
    </Link>;


  return (
    <div className="bg-[hsl(var(--brand-teal))] text-[hsl(var(--brand-teal))] py-6 h-screen from-orange-50 via-amber-50/50 to-orange-100/40 lg:overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col lg:flex-row gap-6 items-stretch h-full">
          
          {/* Left Sidebar Layout */}
          <motion.div
            layout
            initial={false}
            className={`hidden lg:flex flex-shrink-0 flex-col h-full transition-all duration-300 ease-in-out ${activeView === "dashboard" ? "w-64" : "w-[340px]"}`}>
            
            <AnimatePresence mode="wait">
              {activeView === "dashboard" ?
              <motion.div
                key="dashboard-sidebar"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex flex-col">
                
                  <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-y-auto flex-1">
                    <Link to={createPageUrl("Home")} className="p-4 flex items-center gap-3 hover:opacity-80 transition-opacity">
                  <MeduLogo size={32} dark={true} className="drop-shadow-sm" />
                  <div className="flex flex-col">
                    <span className="text-lg font-extrabold tracking-widest leading-none text-slate-800">MEDU</span>
                    <span className="text-[9px] font-medium tracking-wider mt-0.5 text-[#ff7300]">한국 유학 가이드</span>
                  </div>
                </Link>
                <div className="px-2 pb-2">
                  <div className="space-y-0.5 mb-6 mt-2">
                    <NavItem active={activeView === "dashboard"} onClick={() => setActiveView("dashboard")} icon={Home} label="Dashboard" />
                  </div>
                  
                  <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                    Apply
                  </div>
                  <div className="space-y-0.5 mb-6">
                    <NavItem active={activeView === "application"} onClick={() => setActiveView("application")} icon={FileText} label="My Application" />
                    <NavItem active={activeView === "universities"} onClick={() => setActiveView("universities")} icon={GraduationCap} label="My Universities" />
                  </div>

                  <div className="px-3 mb-2 text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                    Explore
                  </div>
                  <div className="space-y-0.5 mb-6">
                    <NavLinkItem to={createPageUrl("Universities")} icon={Search} label="University search" />
                    <NavLinkItem to={createPageUrl("Events")} icon={Calendar} label="Events" />
                    <NavLinkItem to={createPageUrl("Mentors")} icon={Users} label="Mentors" />
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

                {user &&
                  <Link to={createPageUrl("Profile")} className="border-t border-slate-100 p-4 flex items-center gap-3 hover:bg-slate-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[#ff7300] flex items-center justify-center text-white font-bold flex-shrink-0">
                      {user.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-slate-900 truncate">{user.full_name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                  </Link>
                  }
              </div>
            </motion.div> :

              <motion.div
                key="secondary-sidebar"
                initial={{ opacity: 0, x: 10, width: 340 }}
                animate={{ opacity: 1, x: 0, width: isSidebarOpen ? 340 : 64 }}
                exit={{ opacity: 0, x: 10, width: 340 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="hidden lg:flex flex-shrink-0 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full">
                
              {/* Narrow Sidebar */}
              <div className="w-16 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col items-center py-4 h-full">
                <Link to={createPageUrl("Home")} className="mb-2 hover:opacity-80 transition-opacity">
                  <MeduLogo size={28} dark={true} className="drop-shadow-sm" />
                </Link>
                <div className="flex flex-col items-center space-y-1.5 flex-1 mt-4 w-full px-2">
                  <NavItem active={activeView === "dashboard"} onClick={() => {setActiveView("dashboard");setIsSidebarOpen(true);}} icon={Home} label="Dashboard" narrow={true} />
                  <NavItem active={activeView === "application"} onClick={() => {if (activeView === "application") setIsSidebarOpen(!isSidebarOpen);else {setActiveView("application");setIsSidebarOpen(true);}}} icon={FileText} label="My Application" narrow={true} />
                  <NavItem active={activeView === "universities"} onClick={() => {if (activeView === "universities") setIsSidebarOpen(!isSidebarOpen);else {setActiveView("universities");setIsSidebarOpen(true);}}} icon={GraduationCap} label="My Universities" narrow={true} />
                  <NavLinkItem to={createPageUrl("Universities")} icon={Search} label="University search" narrow={true} />
                </div>

                <div className="flex flex-col items-center space-y-4 mt-auto pt-4 w-full">
                  <Link to={createPageUrl("Profile")} className="text-slate-500 hover:text-slate-900 transition-colors" title="Settings">
                    <Settings className="w-5 h-5" />
                  </Link>
                  <button onClick={() => base44.auth.logout()} className="text-slate-500 hover:text-slate-900 transition-colors" title="Sign out">
                    <LogOut className="w-5 h-5" />
                  </button>
                  <Link to={createPageUrl("Profile")} className="hover:opacity-80 transition-opacity">
                    {user ?
                      <div className="w-8 h-8 rounded-full bg-[#ff7300] flex items-center justify-center text-white font-bold text-xs" title={user.full_name}>
                        {user.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                      </div> :

                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs">
                        ?
                      </div>
                      }
                  </Link>
                </div>
              </div>

              {/* Secondary Sidebar */}
              {activeView === "universities" ?
                <div className="w-[276px] flex-shrink-0 bg-white overflow-y-auto h-full">
                <div className="p-4 border-b border-slate-100">
                  <h2 className="font-bold text-lg text-slate-800">My Universities</h2>
                </div>
                <div className="p-2 border-b border-slate-100">
                  <button
                      onClick={() => setSelectedUni("overview")}
                      className={`w-full text-left px-3 py-2 text-sm font-medium rounded ${selectedUni === "overview" ? "bg-slate-200/50 text-slate-800" : "text-slate-700 hover:bg-slate-50"}`}>
                      
                    Overview
                  </button>
                </div>
                <Accordion type="single" collapsible defaultValue={`uni-${selectedUni.id}`} className="w-full">
                  {savedUniversities.map((uni) =>
                    <AccordionItem value={`uni-${uni.id}`} key={uni.id} className="border-b-0 border-t border-slate-100">
                      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-50 text-sm font-bold text-slate-800 text-left">
                        {uni.name}
                      </AccordionTrigger>
                      <AccordionContent className="pb-2 pt-0 px-0">
                        <div
                          className={`px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${selectedUni.id === uni.id && selectedUniSection === 'college_info' ? 'bg-slate-200/50 text-slate-800 border-l-4 border-slate-400' : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent'}`}
                          onClick={() => {setSelectedUni(uni);setSelectedUniSection('college_info');}}>
                          
                          College information
                        </div>
                        <div className="px-4 py-3">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Application</p>
                          <div className="space-y-1 pl-2">
                            <div
                              onClick={() => {setSelectedUni(uni);setSelectedUniSection('general');}}
                              className={`flex items-center gap-3 text-sm px-2 py-1.5 rounded cursor-pointer ${selectedUni.id === uni.id && selectedUniSection === 'general' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
                              {uniSectionStatus[uni.id]?.general ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#ff9933]/40 flex-shrink-0" />} General
                            </div>
                            <div
                              onClick={() => {setSelectedUni(uni);setSelectedUniSection('academics');}}
                              className={`flex items-center gap-3 text-sm px-2 py-1.5 rounded cursor-pointer ${selectedUni.id === uni.id && selectedUniSection === 'academics' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
                              {uniSectionStatus[uni.id]?.academics ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#ff9933]/40 flex-shrink-0" />} Academics
                            </div>
                            <div
                              onClick={() => {setSelectedUni(uni);setSelectedUniSection('additional_documents');}}
                              className={`flex items-center gap-3 text-sm px-2 py-1.5 rounded cursor-pointer ${selectedUni.id === uni.id && selectedUniSection === 'additional_documents' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
                              {uniSectionStatus[uni.id]?.additional_documents ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#ff9933]/40 flex-shrink-0" />} Additional documents
                            </div>
                            <div
                              onClick={() => {setSelectedUni(uni);setSelectedUniSection('recommenders');}}
                              className={`flex items-center gap-3 text-sm px-2 py-1.5 rounded cursor-pointer ${selectedUni.id === uni.id && selectedUniSection === 'recommenders' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
                              {uniSectionStatus[uni.id]?.recommenders ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#ff9933]/40 flex-shrink-0" />} Recommenders and FERPA
                            </div>
                            <div
                              onClick={() => {setSelectedUni(uni);setSelectedUniSection('review');}}
                              className={`flex items-center gap-3 text-sm px-2 py-1.5 rounded cursor-pointer ${selectedUni.id === uni.id && selectedUniSection === 'review' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
                              {uniSectionStatus[uni.id]?.review ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#ff9933]/40 flex-shrink-0" />} Review and submit application
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    )}
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
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors">
                      
                    <Plus className="w-4 h-4" />
                    Add university
                  </button>
                </div>
              </div> :

                <div className="w-[276px] flex-shrink-0 bg-white overflow-y-auto h-full">
                <div className="p-4 border-b border-slate-100">
                  <h2 className="font-bold text-lg text-slate-800">My Application</h2>
                </div>
                <Accordion type="single" collapsible value={activeAppSection.split('_')[0]} onValueChange={(val) => {if (val) setActiveAppSection(val);}} className="w-full">
                  <AccordionItem value="profile" className="border-b border-slate-100">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-50 text-sm font-bold text-slate-800 text-left">
                      <div className="flex items-center gap-2">
                        {isProfileComplete ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#ff9933]/40" />} Profile
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pt-0 px-0">
                      <div onClick={() => setActiveAppSection("profile")} className={`px-4 py-2 text-sm font-medium flex justify-between items-center cursor-pointer transition-colors ${activeAppSection === "profile" ? "bg-slate-200/50 text-slate-800 border-l-4 border-slate-400" : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`}>
                        <span>Personal Information</span>
                        {appSectionStatus["profile"] && <Check className="w-4 h-4 text-green-600" />}
                      </div>
                      <div onClick={() => setActiveAppSection("profile_address")} className={`px-4 py-2 text-sm font-medium flex justify-between items-center cursor-pointer transition-colors ${activeAppSection === "profile_address" ? "bg-slate-200/50 text-slate-800 border-l-4 border-slate-400" : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`}>
                        <span>Address</span>
                        {appSectionStatus["profile_address"] && <Check className="w-4 h-4 text-green-600" />}
                      </div>
                      <div onClick={() => setActiveAppSection("profile_contact")} className={`px-4 py-2 text-sm font-medium flex justify-between items-center cursor-pointer transition-colors ${activeAppSection === "profile_contact" ? "bg-slate-200/50 text-slate-800 border-l-4 border-slate-400" : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`}>
                        <span>Contact Details</span>
                        {appSectionStatus["profile_contact"] && <Check className="w-4 h-4 text-green-600" />}
                      </div>
                      <div onClick={() => setActiveAppSection("profile_demographics")} className={`px-4 py-2 text-sm font-medium flex justify-between items-center cursor-pointer transition-colors ${activeAppSection === "profile_demographics" ? "bg-slate-200/50 text-slate-800 border-l-4 border-slate-400" : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`}>
                        <span>Demographics</span>
                        {appSectionStatus["profile_demographics"] && <Check className="w-4 h-4 text-green-600" />}
                      </div>
                      <div onClick={() => setActiveAppSection("profile_language")} className={`px-4 py-2 text-sm font-medium flex justify-between items-center cursor-pointer transition-colors ${activeAppSection === "profile_language" ? "bg-slate-200/50 text-slate-800 border-l-4 border-slate-400" : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`}>
                        <span>Language</span>
                        {appSectionStatus["profile_language"] && <Check className="w-4 h-4 text-green-600" />}
                      </div>
                      <div onClick={() => setActiveAppSection("profile_geography")} className={`px-4 py-2 text-sm font-medium flex justify-between items-center cursor-pointer transition-colors ${activeAppSection === "profile_geography" ? "bg-slate-200/50 text-slate-800 border-l-4 border-slate-400" : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`}>
                        <span>Geography and Nationality</span>
                        {appSectionStatus["profile_geography"] && <Check className="w-4 h-4 text-green-600" />}
                      </div>
                      <div onClick={() => setActiveAppSection("profile_fee_waiver")} className={`px-4 py-2 text-sm font-medium flex justify-between items-center cursor-pointer transition-colors ${activeAppSection === "profile_fee_waiver" ? "bg-slate-200/50 text-slate-800 border-l-4 border-slate-400" : "text-slate-600 hover:bg-slate-50 border-l-4 border-transparent"}`}>
                        <span>Common App Fee Waiver</span>
                        {appSectionStatus["profile_fee_waiver"] && <Check className="w-4 h-4 text-green-600" />}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="family" className="border-b border-slate-100">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-50 text-sm font-bold text-slate-800 text-left">
                      <div className="flex items-center gap-2">
                        {appSectionStatus['family'] ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#ff9933]/40" />} Family
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pt-0 px-0">
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="education" className="border-b border-slate-100">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-50 text-sm font-bold text-slate-800 text-left">
                      <div className="flex items-center gap-2">
                        {appSectionStatus['education'] ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#ff9933]/40" />} Education
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pt-0 px-0">
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="testing" className="border-b border-slate-100">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-50 text-sm font-bold text-slate-800 text-left">
                      <div className="flex items-center gap-2">
                        {appSectionStatus['testing'] ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#ff9933]/40" />} Testing
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pt-0 px-0">
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="activities" className="border-b border-slate-100">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-50 text-sm font-bold text-slate-800 text-left">
                      <div className="flex items-center gap-2">
                        {appSectionStatus['activities'] ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#ff9933]/40" />} Activities
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pt-0 px-0">
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="writing" className="border-b border-slate-100">
                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-slate-50 text-sm font-bold text-slate-800 text-left">
                      <div className="flex items-center gap-2">
                        {appSectionStatus['writing'] ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#ff9933]/40" />} Writing
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-2 pt-0 px-0">
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
                }
            </motion.div>
              }
            </AnimatePresence>
          </motion.div>

          {/* Mobile Sidebar Layout */}
          <div className="flex lg:hidden w-full mb-4 flex-shrink-0">
             {/* We can just put a simple mobile switcher here or rely on the same structure */}
             {activeView === "dashboard" ?
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-y-auto w-full p-4 flex gap-2">
                 <NavItem active={activeView === "dashboard"} onClick={() => setActiveView("dashboard")} icon={Home} label="Dashboard" narrow={true} />
                 <NavItem active={activeView === "application"} onClick={() => setActiveView("application")} icon={FileText} label="App" narrow={true} />
                 <NavItem active={activeView === "universities"} onClick={() => setActiveView("universities")} icon={GraduationCap} label="Uni" narrow={true} />
               </div> :

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-y-auto w-full p-4 flex gap-2">
                 <NavItem active={activeView === "dashboard"} onClick={() => setActiveView("dashboard")} icon={Home} label="Dashboard" narrow={true} />
                 <NavItem active={activeView === "application"} onClick={() => setActiveView("application")} icon={FileText} label="App" narrow={true} />
                 <NavItem active={activeView === "universities"} onClick={() => setActiveView("universities")} icon={GraduationCap} label="Uni" narrow={true} />
               </div>
            }
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full relative">
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, y: 12, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="min-h-full">
                  
            {activeView === "dashboard" ?
                  <>
                {/* Banner */}
                <motion.div
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-[#fff0e6] rounded-2xl p-8 mb-8 flex items-center justify-between relative overflow-hidden">
                      
                  <div className="relative z-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#cc5c00] flex items-center gap-3">
                      <motion.div
                            initial={{ rotate: -45, scale: 0.8 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}>
                            
                        <Sun className="w-8 h-8 text-[#ff7300]" />
                      </motion.div>
                      Good morning{user?.full_name ? `, ${user.full_name.split(' ')[0]}` : ""}!
                    </h1>
                  </div>
                </motion.div>

                <h2 className="text-3xl font-bold text-slate-900 mb-6">Dashboard</h2>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <Accordion type="multiple" defaultValue={["app", "colleges"]} className="w-full">
                    
                    {/* Application Section */}
                    <AccordionItem value="app" className="border-b border-slate-100">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50">
                        <span className="text-xl font-bold text-slate-800">My Application</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-6 pt-2">
                        <div className="mb-6 relative">
                          <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                            <span>{['profile', 'family', 'education', 'testing', 'activities', 'writing'].filter((k) => appSectionStatus[k]).length}/6 sections complete</span>
                          </div>
                          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${['profile', 'family', 'education', 'testing', 'activities', 'writing'].filter((k) => appSectionStatus[k]).length / 6 * 100}%` }}
                                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                                  className="h-full bg-[#ff7300]" />
                                
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap sm:flex-nowrap justify-between gap-4 relative z-10">
                          {steps.map((step, idx) => {
                                const isCompleted = step.id === 'profile' ? isProfileComplete : !!appSectionStatus[step.id];
                                const isActive = activeAppSection.startsWith(step.id);
                                return (
                                  <motion.div
                                    key={step.id}
                                    className="flex flex-col items-center gap-2 flex-1 min-w-[60px] group cursor-pointer"
                                    whileHover={{ y: -2 }}
                                    transition={{ duration: 0.15 }}>
                                    
                              <motion.div
                                      initial={{ scale: 0.95 }}
                                      animate={{ scale: 1 }}
                                      transition={{ duration: 0.24, delay: idx * 0.05 }}
                                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                                      isCompleted ? 'bg-[#ff7300] border-[#ff7300] text-white shadow-sm' :
                                      isActive ? 'border-[#ff7300] text-[#ff7300]' :
                                      'border-dashed border-slate-300 text-slate-400 group-hover:border-[#ff7300]/50'}`
                                      }>
                                      
                                {isCompleted ?
                                      <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}>
                                    <CheckCircle className="w-4 h-4" />
                                  </motion.div> :
                                      isActive ?
                                      <div className="w-2 h-2 rounded-full bg-[#ff7300]" /> :

                                      <div className="w-2 h-2 rounded-full bg-transparent" />
                                      }
                              </motion.div>
                              <span className={`text-xs font-medium transition-colors duration-200 ${
                                    isCompleted || isActive ? 'text-slate-800' : 'text-slate-500 group-hover:text-slate-700'}`
                                    }>
                                {step.label}
                              </span>
                            </motion.div>);
                              })}
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
                          <div className="w-3 h-3 rounded-full border-2 border-dashed border-[#ff9933]/40" />
                          {savedUniversities.length} in progress
                        </div>
                        <button onClick={() => setActiveView("universities")} className="text-sm font-medium text-[#ff7300] hover:underline flex items-center gap-1">
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
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors">
                                
                            <Plus className="w-4 h-4" />
                            Add university
                          </button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                  </Accordion>
                </div>
              </> :
                  activeView === "application" ?
                  <div className="min-h-full">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm text-slate-500 mb-1 font-medium">Complete your Application</p>
                    <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                      {activeAppSection === "profile" && "Personal Information"}
                      {activeAppSection === "profile_address" && "Address"}
                      {activeAppSection === "profile_contact" && "Contact Details"}
                      {activeAppSection === "profile_demographics" && "Demographics"}
                      {activeAppSection === "profile_language" && "Language"}
                      {activeAppSection === "profile_geography" && "Geography and Nationality"}
                      {activeAppSection === "profile_fee_waiver" && "Common App Fee Waiver"}
                      {activeAppSection === "family" && "Family Details"}
                      {activeAppSection === "education" && "Education History"}
                      {activeAppSection === "testing" && "Standardized Testing"}
                      {activeAppSection === "activities" && "Activities"}
                      {activeAppSection === "writing" && "Personal Essay"}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-[#ff7300]">
                      <div className="w-4 h-4 rounded-full border-2 border-dashed border-[#ff7300]/40 flex-shrink-0" />
                      In progress
                    </div>
                  </div>
                  

                      
                </div>

                <div className="max-w-2xl mt-8">
                  {activeAppSection === "profile" &&
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
                            <input type="radio" name="diffName" className="w-4 h-4 border-slate-300 text-[#ff7300]" />
                            Yes
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="diffName" defaultChecked className="w-4 h-4 border-slate-300 text-[#ff7300]" />
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
                        <Input
                            value={appForms.suffix || ''}
                            onChange={(e) => handleAppFormChange('suffix', e.target.value)}
                            className="w-full" />
                          
                      </div>
                      <button onClick={() => handleAppContinue('profile', 'profile_address', [])} className="bg-[#0066cc] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0052a3] transition-colors">Continue</button>
                    </>
                      }

                  {activeAppSection === "profile_address" &&
                      <>
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Permanent home address<span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={appForms.address || ''}
                            onChange={(e) => handleAppFormChange('address', e.target.value)}
                            className="w-full mb-2"
                            placeholder="Street address" />
                          
                        <Input
                            value={appForms.city || ''}
                            onChange={(e) => handleAppFormChange('city', e.target.value)}
                            className="w-full mb-2"
                            placeholder="City" />
                          
                        <div className="flex gap-2">
                          <Input
                              value={appForms.state || ''}
                              onChange={(e) => handleAppFormChange('state', e.target.value)}
                              className="w-1/2"
                              placeholder="State/Province" />
                            
                          <Input
                              value={appForms.zip || ''}
                              onChange={(e) => handleAppFormChange('zip', e.target.value)}
                              className="w-1/2"
                              placeholder="Postal code" />
                            
                        </div>
                      </div>
                      <button onClick={() => handleAppContinue('profile_address', 'profile_contact', [])} className="bg-[#0066cc] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0052a3] transition-colors">Continue</button>
                    </>
                      }

                  {activeAppSection === "profile_contact" &&
                      <>
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Preferred phone number<span className="text-red-500">*</span>
                        </label>
                        <Input
                            value={appForms.phone || ''}
                            onChange={(e) => handleAppFormChange('phone', e.target.value)}
                            className="w-full"
                            placeholder="+82 10-0000-0000" />
                          
                      </div>
                      <button onClick={() => handleAppContinue('profile_contact', 'profile_demographics', [])} className="bg-[#0066cc] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0052a3] transition-colors">Continue</button>
                    </>
                      }

                  {activeAppSection === "profile_demographics" &&
                      <>
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Gender
                        </label>
                        <select
                            value={appForms.gender || ''}
                            onChange={(e) => handleAppFormChange('gender', e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            
                          <option value="">Select gender...</option>
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                          <option value="other">Other</option>
                          <option value="prefer_not_to_say">Prefer not to say</option>
                        </select>
                      </div>
                      <button onClick={() => handleAppContinue('profile_demographics', 'profile_language', [])} className="bg-[#0066cc] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0052a3] transition-colors">Continue</button>
                    </>
                      }

                  {activeAppSection === "profile_language" &&
                      <>
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Number of languages you are proficient in
                        </label>
                        <select
                            value={appForms.languageCount || ''}
                            onChange={(e) => handleAppFormChange('languageCount', e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            
                          <option value="">Select number...</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4+">4 or more</option>
                        </select>
                      </div>
                      <button onClick={() => handleAppContinue('profile_language', 'profile_geography', [])} className="bg-[#0066cc] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0052a3] transition-colors">Continue</button>
                    </>
                      }

                  {activeAppSection === "profile_geography" &&
                      <>
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Citizenship status<span className="text-red-500">*</span>
                        </label>
                        <select
                            value={appForms.citizenship || ''}
                            onChange={(e) => handleAppFormChange('citizenship', e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            
                          <option value="">Select citizenship status...</option>
                          <option value="us">US Citizen or US National</option>
                          <option value="dual">US Dual Citizen</option>
                          <option value="pr">US Permanent Resident</option>
                          <option value="refugee">US Refugee or Asylee</option>
                          <option value="international">Other (Non-US)</option>
                        </select>
                      </div>
                      <button onClick={() => handleAppContinue('profile_geography', 'profile_fee_waiver', [])} className="bg-[#0066cc] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0052a3] transition-colors">Continue</button>
                    </>
                      }

                  {activeAppSection === "profile_fee_waiver" &&
                      <>
                      <div className="mb-8">
                        <label className="block text-sm font-bold text-slate-700 mb-2">
                          Do you qualify for a Common App fee waiver?
                        </label>
                        <p className="text-sm text-slate-500 mb-4">
                          You may qualify if you meet certain economic indicators.
                        </p>
                        <div className="space-y-3 mb-5">
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input
                                type="radio"
                                name="feeWaiver"
                                checked={appForms.feeWaiver === 'yes'}
                                onChange={() => handleAppFormChange('feeWaiver', 'yes')}
                                className="w-4 h-4 border-slate-300 text-[#ff7300]" />
                              
                            Yes
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input
                                type="radio"
                                name="feeWaiver"
                                checked={appForms.feeWaiver !== 'yes'}
                                onChange={() => handleAppFormChange('feeWaiver', 'no')}
                                className="w-4 h-4 border-slate-300 text-[#ff7300]" />
                              
                            No
                          </label>
                        </div>
                      </div>
                      <button onClick={() => handleAppContinue('profile_fee_waiver', 'family', [])} className="bg-[#0066cc] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0052a3] transition-colors">Continue</button>
                    </>
                      }

                  {activeAppSection === "family" &&
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
                            <input type="radio" name="hasChildren" className="w-4 h-4 border-slate-300 text-[#ff7300]" />
                            Yes
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="hasChildren" defaultChecked className="w-4 h-4 border-slate-300 text-[#ff7300]" />
                            No
                          </label>
                        </div>
                      </div>
                      <button onClick={() => handleAppContinue('family', 'education', [])} className="bg-[#0066cc] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0052a3] transition-colors">Continue</button>
                    </>
                      }

                  {activeAppSection === "education" &&
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
                            <input type="radio" name="isBoarding" className="w-4 h-4 border-slate-300 text-[#ff7300]" />
                            Yes
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="isBoarding" defaultChecked className="w-4 h-4 border-slate-300 text-[#ff7300]" />
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
                            <input type="radio" name="willGraduate" defaultChecked className="w-4 h-4 border-slate-300 text-[#ff7300]" />
                            Yes
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="willGraduate" className="w-4 h-4 border-slate-300 text-[#ff7300]" />
                            No
                          </label>
                        </div>
                      </div>
                      <button onClick={() => handleAppContinue('education', 'testing', [])} className="bg-[#0066cc] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0052a3] transition-colors">Continue</button>
                    </>
                      }

                  {activeAppSection === "testing" &&
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
                            <input type="radio" name="reportTests" className="w-4 h-4 border-slate-300 text-[#ff7300]" />
                            Yes
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="reportTests" defaultChecked className="w-4 h-4 border-slate-300 text-[#ff7300]" />
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
                            <input type="radio" name="intlTests" className="w-4 h-4 border-slate-300 text-[#ff7300]" />
                            Yes
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="intlTests" defaultChecked className="w-4 h-4 border-slate-300 text-[#ff7300]" />
                            No
                          </label>
                        </div>
                      </div>
                      <button onClick={() => handleAppContinue('testing', 'activities', [])} className="bg-[#0066cc] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0052a3] transition-colors">Continue</button>
                    </>
                      }

                  {activeAppSection === "activities" &&
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
                            <input type="radio" name="reportActivities" defaultChecked className="w-4 h-4 border-slate-300 text-[#ff7300]" />
                            Yes
                          </label>
                          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="reportActivities" className="w-4 h-4 border-slate-300 text-[#ff7300]" />
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
                      
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors mb-8">
                        <Plus className="w-4 h-4" />
                        Add another activity
                      </button>
                      <button onClick={() => handleAppContinue('activities', 'writing', [])} className="bg-[#0066cc] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0052a3] transition-colors">Continue</button>
                    </>
                      }

                  {activeAppSection === "writing" &&
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
                            <input type="radio" name="essayPrompt" className="mt-1 w-4 h-4 border-slate-300 text-[#ff7300] flex-shrink-0" />
                            <span>Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.</span>
                          </label>
                          <label className="flex items-start gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="essayPrompt" className="mt-1 w-4 h-4 border-slate-300 text-[#ff7300] flex-shrink-0" />
                            <span>The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?</span>
                          </label>
                          <label className="flex items-start gap-3 text-sm text-slate-700 cursor-pointer">
                            <input type="radio" name="essayPrompt" className="mt-1 w-4 h-4 border-slate-300 text-[#ff7300] flex-shrink-0" />
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
                      <button onClick={() => handleAppContinue('writing', 'dashboard', [])} className="bg-[#0066cc] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0052a3] transition-colors">Continue to Dashboard</button>
                    </>
                      }
                </div>
              </div> :

                  <div className="min-h-full">
                {selectedUni === "overview" ?
                    <div>
                    <p className="text-sm text-slate-500 mb-1 font-medium">My Colleges</p>
                    <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-200 border-dashed">
                      <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">Overview</h1>
                      <button onClick={() => {
                          if (savedUniversities.length >= 2) {
                            toast.error("You have reached the maximum limit of 2 universities.");
                          } else {
                            window.location.href = createPageUrl("Universities");
                          }
                        }} className="px-4 py-2 border border-slate-300 rounded-full text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:-translate-y-0.5 hover:shadow-sm active:scale-[0.98] transition-all duration-150 flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add a college
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4 text-sm">
                      <a href="#" className="text-[#ff7300] hover:underline flex items-center gap-1 font-medium">Compare application requirements <ExternalLink className="w-3.5 h-3.5" /></a>
                      <span className="text-slate-500">Sort by: College name <ChevronDown className="w-4 h-4 inline" /></span>
                    </div>

                    <div className="space-y-4">
                      {savedUniversities.map((uni) =>
                        <div key={uni.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                          <div className="p-5 flex gap-4 relative">
                            <div className="w-20 h-14 bg-amber-400 rounded flex items-center justify-center text-white text-[10px] font-bold px-2 text-center leading-tight shadow-sm border border-amber-500">
                              {uni.name}
                            </div>
                            <div className="flex-1 pt-1">
                              <h3
                                className="text-[#ff7300] font-medium text-lg hover:underline cursor-pointer pr-16"
                                onClick={() => {setSelectedUni(uni);setSelectedUniSection('college_info');}}>
                                
                                {uni.name}
                              </h3>
                              <p className="text-slate-800 font-bold text-sm mb-1.5">{uni.deadline}</p>
                              <p className="text-sm text-slate-600 flex items-center gap-1.5 font-medium"><FileText className="w-4 h-4 text-[#ff7300]" /> Application – <span className="italic font-normal">In progress</span></p>
                            </div>
                            <div className="absolute top-5 right-5 flex gap-3">
                              <button className="text-slate-500 hover:text-slate-700"><HelpCircle className="w-5 h-5 fill-slate-500 text-white" /></button>
                              <button onClick={() => setUniToDelete(uni)} className="text-slate-500 hover:text-slate-700"><X className="w-5 h-5" /></button>
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
                                      <li className="flex gap-2.5"><FileText className="w-4 h-4 text-[#ff7300] flex-shrink-0 mt-0.5" /> <span><a href="#" className="text-[#ff7300] hover:underline">My Application</a> – <span className="italic font-normal">In progress</span></span></li>
                                      <li className="flex gap-2.5"><FileText className="w-4 h-4 text-[#ff7300] flex-shrink-0 mt-0.5" /> <span><a href="#" className="text-[#ff7300] hover:underline">Questions</a> – <span className="italic font-normal">In progress</span></span></li>
                                      <li className="flex gap-2.5"><FileText className="w-4 h-4 text-[#ff7300] flex-shrink-0 mt-0.5" /> <span><a href="#" className="text-[#ff7300] hover:underline">Recommenders and FERPA</a> – <span className="italic font-normal">In progress</span></span></li>
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="text-[13px] text-slate-500 font-bold mb-3 uppercase tracking-wider">Writing Requirements</h4>
                                    <div className="mb-4">
                                      <a href="#" className="text-sm font-medium text-[#ff7300] hover:underline block mb-1">Common App personal essay</a>
                                      <div className="flex items-center gap-1.5 text-sm font-bold text-red-600"><span className="w-4 h-4 bg-red-600 text-white rounded flex items-center justify-center text-[10px] font-bold">!</span> Required</div>
                                    </div>
                                    <div className="mb-4">
                                      <a href="#" className="text-sm font-medium text-[#ff7300] hover:underline block mb-1">College Questions</a>
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
                        )}
                    </div>
                  </div> :
                    selectedUni ?
                    <div>
                    <p className="text-sm text-slate-500 mb-1 font-medium">Apply to {selectedUni.name}</p>
                    <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-200 border-dashed">
                      <h1 className="text-3xl lg:text-4xl font-bold text-slate-900">
                        {selectedUniSection === 'college_info' && selectedUni.name}
                        {selectedUniSection === 'general' && "General"}
                        {selectedUniSection === 'academics' && "Academics"}
                        {selectedUniSection === 'additional_documents' && "Additional documents"}
                        {selectedUniSection === 'recommenders' && "Recommenders and FERPA"}
                        {selectedUniSection === 'review' && "Review and Submit"}
                      </h1>
                      <div className="w-24 h-12 bg-amber-400 rounded flex items-center justify-center text-white text-xs font-bold px-2 text-center border border-amber-500 shadow-sm">
                        {selectedUni.name}
                      </div>
                    </div>
                    
                    {selectedUniSection === 'college_info' &&
                      <>
                        <div className="text-sm text-slate-600 mb-10 space-y-1 font-medium">
                          <p>
                            <a href={`mailto:${selectedUni.email}`} className="text-[#ff7300] hover:underline">{selectedUni.email}</a> 
                            {' '}• Phone{' '} 
                            <a href={`tel:${selectedUni.phone}`} className="text-[#ff7300] hover:underline">{selectedUni.phone}</a>
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
                              <li><a href={selectedUni.website} target="_blank" rel="noopener noreferrer" className="text-[#ff7300] hover:underline flex items-center gap-1.5">College website <ExternalLink className="w-3.5 h-3.5" /></a></li>
                              <li><a href="#" className="text-[#ff7300] hover:underline flex items-center gap-1.5">Admissions office <ExternalLink className="w-3.5 h-3.5" /></a></li>
                              <li><a href="#" className="text-[#ff7300] hover:underline flex items-center gap-1.5">Financial aid <ExternalLink className="w-3.5 h-3.5" /></a></li>
                              <li><a href="#" className="text-[#ff7300] hover:underline flex items-center gap-1.5">Virtual tour <ExternalLink className="w-3.5 h-3.5" /></a></li>
                            </ul>
                            
                            <div className="flex items-center gap-3 mt-6">
                              <button className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"><Facebook className="w-4 h-4" /></button>
                              <button className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"><Instagram className="w-4 h-4" /></button>
                              <button className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"><Twitter className="w-4 h-4" /></button>
                              <button className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"><Youtube className="w-4 h-4" /></button>
                            </div>
                          </div>
                        </div>

                        <Accordion type="multiple" defaultValue={["checklist", "info"]} className="w-full space-y-4">
                          
                          <AccordionItem value="checklist" className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                            <AccordionTrigger className="px-5 py-4 hover:no-underline font-bold text-slate-800 text-base border-b border-slate-100">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-[#ff7300]" />
                                Document Checklist
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="p-0">
                              <div className="divide-y divide-slate-100">
                                {selectedUni.checklist?.map((item) =>
                                <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center gap-3">
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    item.status === 'verified' ? 'bg-green-100 text-green-600' :
                                    item.status === 'uploaded' ? 'bg-blue-100 text-blue-600' :
                                    'bg-slate-100 text-slate-400'}`
                                    }>
                                        {item.status === 'verified' ? <Check className="w-4 h-4" /> :
                                      item.status === 'uploaded' ? <Clock className="w-4 h-4" /> :
                                      <div className="w-2 h-2 rounded-full bg-slate-300" />}
                                      </div>
                                      <div>
                                        <p className="font-medium text-slate-800 text-sm">{item.label}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                          <span className={`text-xs font-bold uppercase tracking-wider ${
                                        item.status === 'verified' ? 'text-green-600' :
                                        item.status === 'uploaded' ? 'text-blue-600' :
                                        'text-slate-400'}`
                                        }>
                                            {item.status === 'verified' ? 'Verified' :
                                          item.status === 'uploaded' ? 'In Review' :
                                          'Pending'}
                                          </span>
                                          {item.file && <span className="text-xs text-slate-500 truncate max-w-[150px]">• {item.file}</span>}
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                      {item.status === 'pending' ?
                                    <>
                                          <input
                                        type="file"
                                        id={`file-${selectedUni.id}-${item.id}`}
                                        className="hidden"
                                        onChange={(e) => handleFileUpload(selectedUni.id, item.id, e)} />
                                        
                                          <label
                                        htmlFor={`file-${selectedUni.id}-${item.id}`}
                                        className="cursor-pointer flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900 text-xs font-bold rounded-lg transition-colors shadow-sm">
                                          
                                            <Upload className="w-3.5 h-3.5" /> Upload
                                          </label>
                                        </> :
                                    item.status === 'uploaded' ?
                                    <button
                                      onClick={() => handleStatusChange(selectedUni.id, item.id, 'verified')}
                                      className="px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 text-xs font-bold rounded-lg transition-colors border border-green-200">
                                        
                                          Mark Verified
                                        </button> :

                                    <button
                                      onClick={() => handleStatusChange(selectedUni.id, item.id, 'pending')}
                                      className="px-3 py-1.5 text-slate-400 hover:text-slate-600 text-xs font-medium underline">
                                        
                                          Reset
                                        </button>
                                    }
                                    </div>
                                  </div>
                                )}
                              </div>
                            </AccordionContent>
                          </AccordionItem>

                          <AccordionItem value="info" className="border border-slate-200 bg-slate-200/50 rounded-xl overflow-hidden">
                            <AccordionTrigger className="px-5 py-4 hover:no-underline font-bold text-slate-800 text-base">
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
                                <div className="w-3.5 h-3.5 rounded-full bg-[#ff7300] text-white flex items-center justify-center text-[9px] font-bold">?</div>
                              </h4>
                              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1 font-medium">
                                <li>Flexible</li>
                                <li>See website</li>
                                <li>Test Policy Information</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </>
                      }

                    {selectedUniSection === 'general' &&
                      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">General Information</h3>
                        <p className="text-slate-600">Please provide your general application details for {selectedUni.name}.</p>
                        <div className="mt-8 text-left max-w-md mx-auto space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Program Type</label>
                                <select
                              value={uniForms[selectedUni.id]?.programType || ''}
                              onChange={(e) => handleUniFormChange(selectedUni.id, 'programType', e.target.value)}
                              className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background">
                              
                                    <option value="">Select program...</option>
                                    <option value="language">Language Program</option>
                                    <option value="bachelor">Bachelor</option>
                                    <option value="master">Master</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Preferred Admission Season</label>
                                <select
                              value={uniForms[selectedUni.id]?.admissionSeason || ''}
                              onChange={(e) => handleUniFormChange(selectedUni.id, 'admissionSeason', e.target.value)}
                              className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background">
                              
                                    <option value="">Select season...</option>
                                    {uniForms[selectedUni.id]?.programType === 'language' ?
                              <>
                                        <option value="spring">Spring (March)</option>
                                        <option value="summer">Summer (June)</option>
                                        <option value="fall">Fall (September)</option>
                                        <option value="winter">Winter (December)</option>
                                      </> :

                              <>
                                        <option value="spring">Spring 2027</option>
                                        <option value="fall">Fall 2026</option>
                                      </>
                              }
                                </select>
                            </div>
                            <button onClick={() => handleUniSectionContinue(selectedUni.id, 'general', 'academics')} className="bg-[#1d2530] text-white mt-4 px-6 py-2 font-medium rounded-full hover:bg-[#0052a3] transition-colors w-full">Continue</button>
                        </div>
                      </div>
                      }

                    {selectedUniSection === 'academics' &&
                      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Academics</h3>
                        <p className="text-slate-600">Academic history and requirements specific to {selectedUni.name}.</p>
                        <div className="mt-8 text-left max-w-md mx-auto space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Intended Major</label>
                                <Input
                              value={uniForms[selectedUni.id]?.intendedMajor || ''}
                              onChange={(e) => handleUniFormChange(selectedUni.id, 'intendedMajor', e.target.value)}
                              placeholder="e.g. Computer Science, Fine Arts"
                              className="bg-white" />
                            
                            </div>
                             <button onClick={() => handleUniSectionContinue(selectedUni.id, 'academics', 'additional_documents')} className="bg-[#0066cc] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0052a3] transition-colors w-full mt-4">Continue</button>
                        </div>
                      </div>
                      }

                    {selectedUniSection === 'additional_documents' &&
                      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Additional Documents</h3>
                        <p className="text-slate-600">Documents required by {selectedUni.name}.</p>
                        <div className="mt-8 text-left w-full mx-auto space-y-4">
                            <div className="space-y-2 border border-slate-200 p-4 rounded-xl bg-white">
                                <div className="flex justify-between items-center">
                                  <label className="text-sm font-bold text-slate-700">Statement of Purpose</label>
                                  <span className="text-xs font-bold text-red-600">Required</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-2">Please explain your interest in studying at this institution.</p>
                                <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#ff7300] hover:file:bg-orange-100" />
                            </div>
                            
                            {(uniForms[selectedUni.id]?.intendedMajor?.toLowerCase().includes('art') || uniForms[selectedUni.id]?.intendedMajor?.toLowerCase().includes('design')) &&
                          <div className="space-y-2 border border-slate-200 p-4 rounded-xl bg-white">
                                  <div className="flex justify-between items-center">
                                    <label className="text-sm font-bold text-slate-700">Art Portfolio</label>
                                    <span className="text-xs font-bold text-red-600">Required for Art Majors</span>
                                  </div>
                                  <p className="text-xs text-slate-500 mb-2">Please upload your portfolio (PDF format, max 50MB).</p>
                                  <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-[#ff7300] hover:file:bg-orange-100" />
                              </div>
                          }

                            <button onClick={() => handleUniSectionContinue(selectedUni.id, 'additional_documents', 'recommenders')} className="bg-[#0066cc] text-white px-6 py-2 rounded-full font-medium hover:bg-[#0052a3] transition-colors mt-4 w-full">Continue</button>
                        </div>
                      </div>
                      }

                    {selectedUniSection === 'recommenders' &&
                      <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Recommenders and FERPA</h3>
                        <p className="text-slate-600">Manage your recommenders for {selectedUni.name}.</p>
                        <div className="mt-8 text-left max-w-md mx-auto space-y-4">
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 font-bold rounded-xl transition-colors hover:bg-white bg-slate-100">
                                <Plus className="w-4 h-4" /> Add Recommender
                            </button>
                            <button onClick={() => handleUniSectionContinue(selectedUni.id, 'recommenders', 'review')} className="bg-[#f8cc2a] text-yellow mt-4 px-6 py-2 font-medium rounded-full hover:bg-[#0052a3] transition-colors w-full">Continue</button>
                        </div>
                      </div>
                      }

                    {selectedUniSection === 'review' && (() => {
                        const isReady = uniSectionStatus[selectedUni.id]?.general && uniSectionStatus[selectedUni.id]?.academics && uniSectionStatus[selectedUni.id]?.additional_documents && uniSectionStatus[selectedUni.id]?.recommenders;
                        return (
                          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Review and Submit</h3>
                        <p className="text-slate-600">Review your application to {selectedUni.name} before final submission.</p>
                        <div className="mt-8 text-left max-w-md mx-auto space-y-4">
                             {!isReady ?
                              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                  <p className="text-sm text-orange-800 font-medium text-center">Please complete all required sections before submitting.</p>
                               </div> :

                              <div className="space-y-4">
                                 <button onClick={() => setShowReviewModal(true)} className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#0066cc] text-[#0066cc] font-bold rounded-full transition-colors hover:bg-blue-50">
                                   <FileText className="w-5 h-5" /> Review Application PDF
                                 </button>
                                 <Link to={createPageUrl("Payment")} className="block w-full">
                                   <button className="bg-[#0066cc] text-white px-6 py-3 rounded-full font-bold hover:bg-[#0052a3] transition-colors w-full shadow-md shadow-blue-500/20">
                                     Apply Now
                                   </button>
                                 </Link>
                               </div>
                              }
                        </div>
                      </div>);
                      })()}
                  </div> :

                    <div className="text-center py-20 text-slate-500">
                    Please select a university to view details.
                  </div>
                    }
              </div>
                  }
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="w-full lg:w-80 flex-shrink-0 flex flex-col h-full">
            
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
                    onChange={(e) => setSearchQuery(e.target.value)} />
                  
                  <div className="absolute right-0 top-0 h-full w-10 flex items-center justify-center border-l border-slate-200 bg-slate-50 rounded-r-md">
                    <Search className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2">Search takes you to the student solution center</p>
              </div>

              <div className="space-y-4 flex-1 overflow-y-auto pr-2">
                {filteredFaqs.length > 0 ?
                filteredFaqs.map((faq, index) =>
                <div key={index} className="pt-4 border-t border-slate-100 first:border-0 first:pt-0">
                      <h4 className="font-bold text-sm text-slate-800 mb-1">{faq.question}</h4>
                      <p className="text-sm text-slate-600 line-clamp-2">{faq.answer}</p>
                      <Accordion type="single" collapsible className="w-full border-none">
                        <AccordionItem value={`faq-${index}`} className="border-none">
                          <AccordionTrigger className="py-1 hover:no-underline text-sm font-medium text-[#ff7300] flex gap-1 justify-start">
                            Read full answer
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-slate-600 pt-2 pb-0 leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                ) :

                <p className="text-sm text-slate-500">No FAQs found matching your search.</p>
                }
                <div className="pt-4 border-t border-slate-100">
                  <a href="#" className="text-sm font-medium text-[#ff7300] hover:underline flex items-center gap-1.5">
                    All help topics <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <AnimatePresence>
        {showReviewModal &&
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            
              <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h2 className="text-lg font-bold text-slate-800">Application Preview (PDF Format)</h2>
                <button onClick={() => setShowReviewModal(false)} className="text-slate-500 hover:text-slate-800 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-200/50">
                <div className="bg-white shadow-sm border border-slate-200 min-h-[800px] w-full p-6 sm:p-10 max-w-2xl mx-auto rounded shadow-xl relative">
                  
                  <div className="border-b-2 border-slate-800 pb-4 mb-8 flex justify-between items-end flex-wrap gap-4">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">{selectedUni?.name}</h1>
                      <p className="text-slate-600 mt-1 font-serif">International Student Application</p>
                    </div>
                    <div className="text-left sm:text-right font-serif text-sm text-slate-500">
                      <div>Applicant: {user?.full_name || 'Student Name'}</div>
                      <div>Date: {new Date().toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-8 font-serif">
                    <section>
                      <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-4">1. General Information</h2>
                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-bold text-slate-700">Program Type:</span>
                          <p className="mt-1">{uniForms[selectedUni?.id]?.programType || 'N/A'}</p>
                        </div>
                        <div>
                          <span className="font-bold text-slate-700">Admission Season:</span>
                          <p className="mt-1">{uniForms[selectedUni?.id]?.admissionSeason || 'N/A'}</p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-4">2. Academics</h2>
                      <div className="text-sm">
                        <span className="font-bold text-slate-700">Intended Major:</span>
                        <p className="mt-1">{uniForms[selectedUni?.id]?.intendedMajor || 'N/A'}</p>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-bold text-slate-800 border-b border-slate-300 pb-2 mb-4">3. Documents & Recommenders</h2>
                      <div className="text-sm space-y-3">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Statement of Purpose (Uploaded)</span>
                        </div>
                        {(uniForms[selectedUni?.id]?.intendedMajor?.toLowerCase().includes('art') || uniForms[selectedUni?.id]?.intendedMajor?.toLowerCase().includes('design')) &&
                      <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-600" />
                            <span>Art Portfolio (Uploaded)</span>
                          </div>
                      }
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-600" />
                          <span>Recommenders Added</span>
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10 border-t border-slate-300 pt-4 text-center text-xs text-slate-400 font-serif">
                    This document is a preview of your application generated on {new Date().toLocaleDateString()}.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>

      <AnimatePresence>
        {uniToDelete &&
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">
            
              <h2 className="text-xl font-bold text-slate-900 mb-2">Remove University?</h2>
              <p className="text-slate-600 mb-6">Are you sure you want to remove {uniToDelete.name} from your list? All application progress for this university will be lost.</p>
              <div className="flex justify-end gap-3">
                <button
                onClick={() => setUniToDelete(null)}
                className="px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                
                  Cancel
                </button>
                <button
                onClick={() => {
                  setSavedUniversities((prev) => prev.filter((u) => u.id !== uniToDelete.id));
                  if (selectedUni?.id === uniToDelete.id) {
                    setSelectedUni("overview");
                  }
                  toast.success("University removed from your list");
                  setUniToDelete(null);
                }}
                className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-full transition-colors shadow-md shadow-red-500/20">
                
                  Yes, Remove
                </button>
              </div>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </div>);

}