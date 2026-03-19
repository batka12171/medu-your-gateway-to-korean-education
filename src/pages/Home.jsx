import React from "react";
import HeroSection from "../components/home/HeroSection";
import UniversityLogos from "../components/home/UniversityLogos";
import ExploreSection from "../components/home/ExploreSection";
import StatsSection from "../components/home/StatsSection";
import UniversitiesPreview from "../components/home/UniversitiesPreview";
import MentorsSection from "../components/home/MentorsSection";
import CommunityPreview from "../components/home/CommunityPreview";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <UniversityLogos />
      <ExploreSection />
      <StatsSection />
      <UniversitiesPreview />
      <MentorsSection />
      <CommunityPreview />
    </div>
  );
}