import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Download, Calendar, FileText, GraduationCap, 
  Globe, CheckCircle, BookOpen, MessageSquare,
  Clock, DollarSign, Plane
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

const steps = [
  {
    number: "01",
    title: "Research Universities",
    description: "Explore programs, requirements, and rankings to find the best fit for your goals.",
    icon: BookOpen,
    color: "bg-blue-500"
  },
  {
    number: "02",
    title: "Check Requirements",
    description: "Review admission requirements, including GPA, language tests (TOPIK/TOEFL), and documents.",
    icon: FileText,
    color: "bg-emerald-500"
  },
  {
    number: "03",
    title: "Prepare Documents",
    description: "Gather transcripts, recommendation letters, personal statement, and other required materials.",
    icon: CheckCircle,
    color: "bg-purple-500"
  },
  {
    number: "04",
    title: "Apply Online",
    description: "Submit your application through the university's online portal before the deadline.",
    icon: Globe,
    color: "bg-orange-500"
  },
  {
    number: "05",
    title: "Track & Interview",
    description: "Monitor your application status and prepare for potential interviews.",
    icon: MessageSquare,
    color: "bg-rose-500"
  },
  {
    number: "06",
    title: "Visa & Preparation",
    description: "Upon acceptance, apply for your student visa and prepare for your journey.",
    icon: Plane,
    color: "bg-cyan-500"
  }
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

const timeline = [
  { month: "12-18 months before", task: "Start researching universities and programs" },
  { month: "12 months before", task: "Take required language tests (TOPIK/TOEFL)" },
  { month: "6-8 months before", task: "Contact professors (for graduate programs)" },
  { month: "4-6 months before", task: "Prepare application documents" },
  { month: "3-4 months before", task: "Submit applications" },
  { month: "1-2 months before", task: "Receive admission results" },
  { month: "After acceptance", task: "Apply for visa and prepare for departure" },
];

export default function ApplicationGuide() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-[#4A90C5]/10 text-[#4A90C5]">Complete Guide</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Application Guide
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Everything you need to know about applying to Korean universities, 
            from requirements to visa application.
          </p>
          <Button className="bg-[#4A90C5] hover:bg-[#357AB8]">
            <Download className="w-4 h-4 mr-2" />
            Download PDF Guide
          </Button>
        </motion.div>

        {/* Steps */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Application Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-white rounded-2xl p-6 border border-slate-100 hover:shadow-lg hover:border-[#4A90C5]/30 transition-all h-full">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center text-white flex-shrink-0`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-sm text-slate-400 font-medium">Step {step.number}</span>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600 text-sm">{step.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 border border-slate-100 mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#4A90C5]/10 flex items-center justify-center text-[#4A90C5]">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Application Timeline</h2>
          </div>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-40 flex-shrink-0">
                  <Badge variant="outline" className="text-xs">
                    {item.month}
                  </Badge>
                </div>
                <div className="flex-1 pb-4 border-b border-slate-100 last:border-0">
                  <p className="text-slate-700">{item.task}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Key Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white"
          >
            <DollarSign className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-2">Average Costs</h3>
            <p className="text-blue-100 text-sm mb-4">Tuition + Living Expenses</p>
            <div className="text-3xl font-bold">$8,000 - $15,000</div>
            <p className="text-blue-200 text-sm mt-1">per year</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white"
          >
            <GraduationCap className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-2">Scholarships</h3>
            <p className="text-emerald-100 text-sm mb-4">Available for international students</p>
            <div className="text-3xl font-bold">50+</div>
            <p className="text-emerald-200 text-sm mt-1">scholarship programs</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white"
          >
            <Calendar className="w-8 h-8 mb-4 opacity-80" />
            <h3 className="text-xl font-bold mb-2">Intake Periods</h3>
            <p className="text-purple-100 text-sm mb-4">Two main admission cycles</p>
            <div className="text-xl font-bold">March & September</div>
            <p className="text-purple-200 text-sm mt-1">Spring & Fall semesters</p>
          </motion.div>
        </div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 border border-slate-100 mb-16"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-[#4A90C5]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-gradient-to-r from-[#4A90C5] to-[#357AB8] rounded-2xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Need Personalized Guidance?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Connect with mentors who have successfully navigated the Korean university 
            admission process and can help you every step of the way.
          </p>
          <Link to={createPageUrl("Mentors")}>
            <Button size="lg" className="bg-white text-[#4A90C5] hover:bg-blue-50">
              Find a Mentor
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}