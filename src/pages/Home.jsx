import React from "react";
import HeroSection from "../components/home/HeroSection";
import MentoringSection from "../components/home/MentoringSection";
import StatsSection from "../components/home/StatsSection";
import UniversityCarousel from "../components/home/UniversityCarousel";
import MentorsSection from "../components/home/MentorsSection";
import CommunityPreview from "../components/home/CommunityPreview";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MentoringSection />
      <UniversityCarousel />
      <StatsSection />
      <MentorsSection />
      <CommunityPreview />
    </div>
  );
}