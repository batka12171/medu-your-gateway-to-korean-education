import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { base44 } from "@/api/base44Client";
import {
  CheckCircle2, Circle, ChevronDown, ChevronUp,
  Calendar, AlertCircle, Lock, Trophy, ArrowRight, Flag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

const STAGES = [
  {
    id: "research",
    title: "Research & Shortlist",
    subtitle: "Foundation Phase",
    color: "#ff7300",
    icon: "🔍",
    deadline: "3–6 months before",
    items: [
      { id: "r1", label: "Research top Korean universities (SNU, Yonsei, KAIST…)" },
      { id: "r2", label: "Compare tuition fees and scholarship options" },
      { id: "r3", label: "Identify programs taught in English" },
      { id: "r4", label: "Check language requirements (TOPIK / IELTS / TOEFL)" },
      { id: "r5", label: "Shortlist 3–5 universities" },
    ],
  },
  {
    id: "documents",
    title: "Document Preparation",
    subtitle: "Paperwork Phase",
    color: "#3b82f6",
    icon: "📄",
    deadline: "2–4 months before",
    items: [
      { id: "d1", label: "Obtain official academic transcripts" },
      { id: "d2", label: "Request letters of recommendation (2–3)" },
      { id: "d3", label: "Write Statement of Purpose / Personal Statement" },
      { id: "d4", label: "Prepare CV / Resume" },
      { id: "d5", label: "Gather passport & ID documents" },
      { id: "d6", label: "Get documents apostilled / notarized if required" },
    ],
  },
  {
    id: "language",
    title: "Language Tests",
    subtitle: "Qualification Phase",
    color: "#a855f7",
    icon: "🗣️",
    deadline: "2–3 months before",
    items: [
      { id: "l1", label: "Register for TOPIK exam (if required)" },
      { id: "l2", label: "Register for IELTS or TOEFL (if required)" },
      { id: "l3", label: "Complete language test" },
      { id: "l4", label: "Receive and save official score report" },
    ],
  },
  {
    id: "application",
    title: "Submit Applications",
    subtitle: "Action Phase",
    color: "#f59e0b",
    icon: "✉️",
    deadline: "Application window",
    items: [
      { id: "a1", label: "Create online applicant accounts on university portals" },
      { id: "a2", label: "Upload all required documents" },
      { id: "a3", label: "Pay application fees" },
      { id: "a4", label: "Double-check all submissions before deadline" },
      { id: "a5", label: "Send physical documents if required" },
      { id: "a6", label: "Note confirmation / reference numbers" },
    ],
  },
  {
    id: "financial",
    title: "Scholarships & Finances",
    subtitle: "Funding Phase",
    color: "#10b981",
    icon: "💰",
    deadline: "Ongoing",
    items: [
      { id: "f1", label: "Apply for GKS (Government Scholarship) if eligible" },
      { id: "f2", label: "Check university-specific scholarships" },
      { id: "f3", label: "Prepare proof of financial support" },
      { id: "f4", label: "Open / verify international bank account" },
    ],
  },
  {
    id: "visa",
    title: "Visa & Pre-Departure",
    subtitle: "Final Phase",
    color: "#ef4444",
    icon: "✈️",
    deadline: "After acceptance",
    items: [
      { id: "v1", label: "Receive acceptance letter from university" },
      { id: "v2", label: "Apply for D-2 Student Visa at Korean consulate" },
      { id: "v3", label: "Arrange accommodation (dorm / off-campus)" },
      { id: "v4", label: "Book flights" },
      { id: "v5", label: "Prepare health insurance" },
      { id: "v6", label: "Attend pre-departure orientation (if available)" },
    ],
  },
];

const STORAGE_KEY = "medu_roadmap_checklist";

function loadChecked() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveChecked(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export default function AdmissionRoadmap() {
  const [checked, setChecked] = useState(loadChecked);
  const [openStage, setOpenStage] = useState("research");

  useEffect(() => {
    saveChecked(checked);
  }, [checked]);

  const toggleItem = (itemId) => {
    setChecked((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const stageProgress = (stage) => {
    const done = stage.items.filter((i) => checked[i.id]).length;
    return { done, total: stage.items.length, pct: Math.round((done / stage.items.length) * 100) };
  };

  const totalDone = STAGES.reduce((acc, s) => acc + s.items.filter((i) => checked[i.id]).length, 0);
  const totalItems = STAGES.reduce((acc, s) => acc + s.items.length, 0);
  const overallPct = Math.round((totalDone / totalItems) * 100);

  // Determine which stages are "unlocked" — a stage unlocks when the previous is ≥50% done
  const isUnlocked = (idx) => {
    if (idx === 0) return true;
    const prev = STAGES[idx - 1];
    const { pct } = stageProgress(prev);
    return pct >= 50;
  };

  return (
    <div className="min-h-screen bg-[#061614] pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-block bg-[#ff7300]/10 border border-[#ff7300]/20 text-[#ff7300] text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wider uppercase">
            Admission Roadmap
          </span>
          <h1 className="text-4xl font-extrabold text-white mb-3">Your Path to Korea</h1>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Track every step of your Korean university application — from research to arrival.
          </p>
        </motion.div>

        {/* Overall Progress */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white font-semibold">Overall Progress</p>
              <p className="text-white/40 text-xs">{totalDone} of {totalItems} tasks completed</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-[#ff7300]">{overallPct}%</span>
            </div>
          </div>
          <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#cc5c00] to-[#ff7300]"
              initial={{ width: 0 }}
              animate={{ width: `${overallPct}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          {overallPct === 100 && (
            <div className="mt-4 flex items-center gap-2 text-[#ff7300] text-sm font-semibold">
              <Trophy className="w-4 h-4" /> Congratulations! You've completed all steps!
            </div>
          )}
        </motion.div>

        {/* Stage Cards */}
        <div className="space-y-3">
          {STAGES.map((stage, idx) => {
            const { done, total, pct } = stageProgress(stage);
            const unlocked = isUnlocked(idx);
            const isOpen = openStage === stage.id && unlocked;
            const allDone = done === total;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
                className={`rounded-2xl border transition-all ${
                  unlocked
                    ? "border-white/10 bg-white/5 hover:border-white/20"
                    : "border-white/5 bg-white/[0.02] opacity-50"
                }`}
              >
                {/* Stage Header */}
                <button
                  className="w-full flex items-center gap-4 p-5 text-left"
                  onClick={() => unlocked && setOpenStage(isOpen ? null : stage.id)}
                  disabled={!unlocked}
                >
                  {/* Icon / Status */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${stage.color}18`, border: `1px solid ${stage.color}30` }}
                  >
                    {allDone ? <CheckCircle2 className="w-5 h-5" style={{ color: stage.color }} /> : <span>{stage.icon}</span>}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-white font-semibold text-sm">{stage.title}</p>
                      {allDone && <Badge className="text-[10px] px-2 py-0" style={{ background: `${stage.color}20`, color: stage.color, border: `1px solid ${stage.color}30` }}>Done</Badge>}
                      {!unlocked && <Lock className="w-3 h-3 text-white/30" />}
                    </div>
                    <p className="text-white/40 text-xs mt-0.5">{stage.subtitle} · {stage.deadline}</p>
                    {/* Mini progress bar */}
                    <div className="h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, background: stage.color }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-white/40 font-mono">{done}/{total}</span>
                    {unlocked && (
                      isOpen
                        ? <ChevronUp className="w-4 h-4 text-white/30" />
                        : <ChevronDown className="w-4 h-4 text-white/30" />
                    )}
                  </div>
                </button>

                {/* Checklist */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-2 border-t border-white/5 pt-4">
                        {stage.items.map((item) => (
                          <label
                            key={item.id}
                            className="flex items-start gap-3 cursor-pointer group"
                          >
                            <button
                              onClick={() => toggleItem(item.id)}
                              className="mt-0.5 shrink-0 transition-transform group-hover:scale-110"
                            >
                              {checked[item.id]
                                ? <CheckCircle2 className="w-5 h-5" style={{ color: stage.color }} />
                                : <Circle className="w-5 h-5 text-white/25 group-hover:text-white/50 transition-colors" />
                              }
                            </button>
                            <span className={`text-sm transition-colors ${checked[item.id] ? "line-through text-white/30" : "text-white/70 group-hover:text-white/90"}`}>
                              {item.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-white/30 text-xs mb-4">Need guidance? Connect with a mentor who's been through this journey.</p>
          <Link to={createPageUrl("Mentors")}>
            <Button className="gap-2">
              Find a Mentor <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}