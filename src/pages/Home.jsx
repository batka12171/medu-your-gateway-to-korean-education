import React from "react";
import HomeHero from "../components/home/HomeHero";
import UniversitySection from "../components/home/UniversitySection";
import EventsSection from "../components/home/EventsSection";
import MentorsSection from "../components/home/MentorsSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import BecomeMentorCTA from "../components/home/BecomeMentorCTA";

export default function Home() {
  return (
    <div className="bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden min-h-screen font-sans">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      <HomeHero />
      <UniversitySection />
      <EventsSection />
      <MentorsSection />
      <HowItWorksSection />
      <BecomeMentorCTA />
    </div>
  );
}