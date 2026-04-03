import React from "react";
import HeroSection from "../components/home/HeroSection";
import ExploreSection from "../components/home/ExploreSection";
import EventsPreview from "../components/home/EventsPreview";
import MentorsSection from "../components/home/MentorsSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ExploreSection />
      <EventsPreview />
      <MentorsSection />
    </div>
  );
}