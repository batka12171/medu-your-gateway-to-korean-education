import React from "react";
import HeroSection from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import UniversityCarousel from "../components/home/UniversityCarousel";
import UniversitiesPreview from "../components/home/UniversitiesPreview";
import MentorsSection from "../components/home/MentorsSection";
import CommunityPreview from "../components/home/CommunityPreview";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <UniversityCarousel />
      <StatsSection />
      <UniversitiesPreview />
      <MentorsSection />
      <CommunityPreview />
    </div>
  );
}