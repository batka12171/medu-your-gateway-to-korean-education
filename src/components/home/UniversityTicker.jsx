import React from "react";

const universities = [
  { name: "Seoul National University", abbr: "SNU", color: "#003478" },
  { name: "Yonsei University", abbr: "YONSEI", color: "#00205B" },
  { name: "Korea University", abbr: "KOREA", color: "#8B0029" },
  { name: "KAIST", abbr: "KAIST", color: "#E31837" },
  { name: "POSTECH", abbr: "POSTECH", color: "#003087" },
  { name: "Sungkyunkwan University", abbr: "SKKU", color: "#003478" },
  { name: "Hanyang University", abbr: "HANYANG", color: "#003478" },
  { name: "Kyung Hee University", abbr: "KHU", color: "#002D6D" },
  { name: "Ewha Womans University", abbr: "EWHA", color: "#00573F" },
  { name: "Sogang University", abbr: "SOGANG", color: "#990000" },
];

const TickerItem = ({ university }) => (
  <div
    className="ticker-item flex flex-col items-center justify-center px-10 gap-1 cursor-default shrink-0"
  >
    <div
      className="ticker-logo w-16 h-16 rounded-full flex items-center justify-center font-black text-xs tracking-wider transition-all duration-300"
      style={{ background: `${university.color}33`, border: `1.5px solid ${university.color}55` }}
    >
      <span className="text-[10px] font-bold text-center leading-tight px-1">
        {university.abbr}
      </span>
    </div>
    <span className="text-[10px] text-white/30 whitespace-nowrap font-medium tracking-wide transition-colors duration-300 ticker-name">
      {university.name}
    </span>
  </div>
);

export default function UniversityTicker() {
  const doubled = [...universities, ...universities];

  return (
    <div className="bg-[#061614] py-6 overflow-hidden">
      <div className="flex items-center gap-4 mb-4 px-8">
        <div className="h-px flex-1 bg-white/5" />
        <p className="text-white/25 text-[11px] uppercase tracking-[0.2em] font-medium shrink-0">
          Trusted by students accepted to
        </p>
        <div className="h-px flex-1 bg-white/5" />
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#061614] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#061614] to-transparent z-10 pointer-events-none" />

        <div className="ticker-track flex">
          {doubled.map((uni, i) => (
            <TickerItem key={i} university={uni} />
          ))}
        </div>
      </div>

      <style>{`
        .ticker-track {
          animation: ticker-scroll 30s linear infinite;
          width: max-content;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-item:hover .ticker-logo {
          filter: brightness(1.4);
          transform: scale(1.1);
          border-color: rgba(255,255,255,0.3) !important;
        }
        .ticker-item:hover .ticker-name {
          color: rgba(255,255,255,0.7);
        }
      `}</style>
    </div>
  );
}