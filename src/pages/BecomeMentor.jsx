import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  GraduationCap, Users, CheckCircle, Star, 
  Globe, BookOpen, ArrowRight, Loader2
} from "lucide-react";
import { toast } from "sonner";

const expertiseOptions = [
  "Graduate Admissions",
  "Undergraduate Admissions",
  "Scholarships",
  "TOPIK Preparation",
  "Research Proposals",
  "Interview Preparation",
  "Essay Writing",
  "Visa & Housing",
  "Cultural Adjustment",
  "Language Requirements",
  "STEM Programs",
  "Business Schools",
  "International Students"
];

const languageOptions = [
  "English",
  "Korean",
  "Chinese",
  "Japanese",
  "Vietnamese",
  "Spanish",
  "French",
  "Other"
];

export default function BecomeMentor() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    university: "",
    degree: "",
    student_status: "",
    years_in_korea: "",
    languages: [],
    expertise_areas: [],
    bio: ""
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
        setFormData(prev => ({
          ...prev,
          full_name: userData.full_name || "",
          email: userData.email || ""
        }));
      } catch (e) {
        setUser(null);
      }
    };
    loadUser();
  }, []);

  const submitMutation = useMutation({
    mutationFn: (data) => base44.entities.MentorApplication.create(data),
    onSuccess: () => {
      toast.success("Application submitted! We'll review it and get back to you soon.");
      setFormData({
        full_name: user?.full_name || "",
        email: user?.email || "",
        university: "",
        degree: "",
        student_status: "",
        years_in_korea: "",
        languages: [],
        expertise_areas: [],
        bio: ""
      });
    },
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      base44.auth.redirectToLogin();
      return;
    }
    submitMutation.mutate({
      ...formData,
      years_in_korea: parseInt(formData.years_in_korea) || 0
    });
  };

  const toggleExpertise = (expertise) => {
    setFormData(prev => ({
      ...prev,
      expertise_areas: prev.expertise_areas.includes(expertise)
        ? prev.expertise_areas.filter(e => e !== expertise)
        : [...prev.expertise_areas, expertise]
    }));
  };

  const toggleLanguage = (language) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 text-orange-600 font-medium mb-4">
              <Users className="w-5 h-5" />
              Join Our Mentor Community
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Become a Mentor
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Share your experience studying in Korea and help guide the next generation 
              of international students on their journey.
            </p>
          </motion.div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Star, title: "Earn Income", desc: "Set your own rates and earn by sharing your knowledge" },
            { icon: Globe, title: "Help Students", desc: "Make a real impact on students' lives and careers" },
            { icon: BookOpen, title: "Build Network", desc: "Connect with a global community of students and mentors" },
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-slate-100"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 mb-4">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-600">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Application Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Apply to Become a Mentor</h2>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            {/* Education */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="university">University *</Label>
                <Input
                  id="university"
                  value={formData.university}
                  onChange={(e) => setFormData({...formData, university: e.target.value})}
                  placeholder="e.g., Seoul National University"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degree">Degree / Program *</Label>
                <Input
                  id="degree"
                  value={formData.degree}
                  onChange={(e) => setFormData({...formData, degree: e.target.value})}
                  placeholder="e.g., M.S. in Computer Science"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Student Status *</Label>
                <Select 
                  value={formData.student_status} 
                  onValueChange={(val) => setFormData({...formData, student_status: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current_student">Current Student</SelectItem>
                    <SelectItem value="alumni">Alumni</SelectItem>
                    <SelectItem value="exchange_student">Exchange Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="years">Years in Korea</Label>
                <Input
                  id="years"
                  type="number"
                  min="0"
                  value={formData.years_in_korea}
                  onChange={(e) => setFormData({...formData, years_in_korea: e.target.value})}
                  placeholder="e.g., 3"
                />
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-3">
              <Label>Languages Spoken *</Label>
              <div className="flex flex-wrap gap-2">
                {languageOptions.map(lang => (
                  <Badge
                    key={lang}
                    variant={formData.languages.includes(lang) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      formData.languages.includes(lang) 
                        ? "bg-orange-500 hover:bg-orange-600" 
                        : "hover:bg-orange-50"
                    }`}
                    onClick={() => toggleLanguage(lang)}
                  >
                    {lang}
                    {formData.languages.includes(lang) && <CheckCircle className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Expertise */}
            <div className="space-y-3">
              <Label>Areas of Expertise *</Label>
              <p className="text-sm text-slate-500">Select all areas you can help students with</p>
              <div className="flex flex-wrap gap-2">
                {expertiseOptions.map(exp => (
                  <Badge
                    key={exp}
                    variant={formData.expertise_areas.includes(exp) ? "default" : "outline"}
                    className={`cursor-pointer transition-all ${
                      formData.expertise_areas.includes(exp) 
                        ? "bg-orange-500 hover:bg-orange-600" 
                        : "hover:bg-orange-50"
                    }`}
                    onClick={() => toggleExpertise(exp)}
                  >
                    {exp}
                    {formData.expertise_areas.includes(exp) && <CheckCircle className="w-3 h-3 ml-1" />}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Why do you want to be a mentor? *</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                placeholder="Tell us about your experience and what motivates you to help other students..."
                className="h-32"
                required
              />
            </div>

            <Button 
              type="submit" 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 w-full md:w-auto"
              disabled={submitMutation.isPending}
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}