import React from "react";
import HeroSection from "../components/home/HeroSection";
import GetAdmittedSection from "../components/home/GetAdmittedSection";
import StatsSection from "../components/home/StatsSection";
import UniversityCarousel from "../components/home/UniversityCarousel";
import UniversitiesPreview from "../components/home/UniversitiesPreview";
import MentorsSection from "../components/home/MentorsSection";
import CommunityPreview from "../components/home/CommunityPreview";
import UniversityTicker from "../components/home/UniversityTicker";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <UniversityTicker />
      <GetAdmittedSection />
      <UniversityCarousel />
      <StatsSection />
      <UniversitiesPreview />
      <MentorsSection />
      <CommunityPreview />
    </div>
  );
}