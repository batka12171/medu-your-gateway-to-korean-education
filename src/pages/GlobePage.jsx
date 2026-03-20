import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import GlobeScene from "@/components/globe/GlobeScene";
import GlobeOverlay from "@/components/globe/GlobeOverlay";

export default function GlobePage() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh", background: "#020d0c" }}>
      {/* Sticky canvas wrapper */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <GlobeScene />
        <GlobeOverlay />
      </div>
    </div>
  );
}