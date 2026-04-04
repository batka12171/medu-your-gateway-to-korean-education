import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "./utils";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { 
  Menu, X, GraduationCap, Users, BookOpen, 
  MessageSquare, ChevronDown, LogOut, User, Bookmark, Mail, Calendar
} from "lucide-react";
import MeduLogo from "@/components/MeduLogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Application Process", href: createPageUrl("ApplicationGuide"), icon: BookOpen },
    { name: "Events", href: createPageUrl("Events"), icon: Calendar },
    { name: "Mentors", href: createPageUrl("Mentors"), icon: Users },
  ];

  const isHomePage = currentPageName === "Home";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePage 
          ? 'bg-white/95 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center gap-2">
              <div className={`flex items-center gap-3 ${isScrolled || !isHomePage ? 'text-slate-900' : 'text-white'}`}>
                <MeduLogo size={48} dark={!(isScrolled || !isHomePage)} className="drop-shadow-sm" />
                <div className="flex flex-col">
                  <span className={`text-xl font-extrabold tracking-widest leading-none ${isScrolled || !isHomePage ? 'text-slate-800' : 'text-white'}`}>MEDU</span>
                  <span className={`text-[10px] font-medium tracking-wider mt-0.5 ${isScrolled || !isHomePage ? 'text-[#ff7300]' : 'text-white/70'}`}>
                    한국 유학 가이드
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isScrolled || !isHomePage
                      ? 'text-slate-600 hover:text-[#ff7300] hover:bg-[#ff7300]/5'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className={`gap-2 ${isScrolled || !isHomePage ? 'text-slate-700' : 'text-white'}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff7300] to-[#cc5c00] flex items-center justify-center text-white text-sm font-medium">
                        {user.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("Profile")} className="flex items-center gap-2">
                        <User className="w-4 h-4" /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("SavedUniversities")} className="flex items-center gap-2">
                        <Bookmark className="w-4 h-4" /> Saved Universities
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={createPageUrl("Messages")} className="flex items-center gap-2">
                        <Mail className="w-4 h-4" /> Messages
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => base44.auth.logout()}
                      className="text-red-600"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  onClick={() => base44.auth.redirectToLogin()}
                  className="bg-[#ff7300] hover:bg-[#ff851a] text-white shadow-lg shadow-[#ff7300]/25"
                >
                  Get Started
                </Button>
              )}

              {/* Mobile Menu Button */}
              <button
                className={`lg:hidden p-2 rounded-lg ${
                  isScrolled || !isHomePage ? 'text-slate-700' : 'text-white'
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t shadow-lg">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-[#ff7300]/5 hover:text-[#ff7300] transition-all"
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className={isHomePage ? '' : 'pt-20'}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <MeduLogo size={44} dark={true} className="drop-shadow-sm" />
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-widest leading-none text-white">MEDU</span>
                  <span className="text-[10px] font-medium tracking-wider mt-0.5 text-[#ff9933]">한국 유학 가이드</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Your comprehensive guide to studying in South Korea.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to={createPageUrl("Universities")} className="hover:text-[#ff7300] transition">Universities</Link></li>
                <li><Link to={createPageUrl("Rankings")} className="hover:text-[#ff7300] transition">Rankings</Link></li>
                <li><Link to={createPageUrl("ApplicationGuide")} className="hover:text-[#ff7300] transition">Application Guide</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to={createPageUrl("Mentors")} className="hover:text-[#ff7300] transition">Find Mentors</Link></li>
                <li><Link to={createPageUrl("BecomeMentor")} className="hover:text-[#ff7300] transition">Become a Mentor</Link></li>
                <li><Link to={createPageUrl("Community")} className="hover:text-[#ff7300] transition">Discussion Forum</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-orange-400 transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">FAQ</a></li>
                <li><a href="#" className="hover:text-orange-400 transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
            © 2024 MEDU. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}