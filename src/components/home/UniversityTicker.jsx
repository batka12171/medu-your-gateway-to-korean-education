import React, { useEffect, useRef } from "react";

const universities = [
  {
    name: "Seoul National University",
    abbr: "SNU",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Seoul_National_University_emblem.svg/150px-Seoul_National_University_emblem.svg.png",
    color: "#003478",
  },
  {
    name: "Yonsei University",
    abbr: "YONSEI",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/Seal_of_Yonsei_University.svg/150px-Seal_of_Yonsei_University.svg.png",
    color: "#00205B",
  },
  {
    name: "Korea University",
    abbr: "KU",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/Korea_University_seal.svg/150px-Korea_University_seal.svg.png",
    color: "#820000",
  },
  {
    name: "KAIST",
    abbr: "KAIST",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/KAIST_logo.svg/200px-KAIST_logo.svg.png",
    color: "#003087",
  },
  {
    name: "POSTECH",
    abbr: "POSTECH",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8b/POSTECH_logo.svg/200px-POSTECH_logo.svg.png",
    color: "#003087",
  },
  {
    name: "Sungkyunkwan University",
    abbr: "SKKU",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Sungkyunkwan_University_seal.svg/150px-Sungkyunkwan_University_seal.svg.png",
    color: "#005EB8",
  },
  {
    name: "Hanyang University",
    abbr: "HYU",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Hanyang_University_logo.svg/200px-Hanyang_University_logo.svg.png",
    color: "#005CAB",
  },
  {
    name: "EWHA",
    abbr: "EWHA",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/54/Ewha_Womans_University_seal.svg/150px-Ewha_Womans_University_seal.svg.png",
    color: "#5B2D8E",
  },
];

const TickerItem = ({ uni }) => (
  <div className="flex items-center gap-3 px-8 py-4 group cursor-default flex-shrink-0">
    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-[#00C9A7]/40 transition-colors">
      <img
        src={uni.logo}
        alt={uni.name}
        className="w-7 h-7 object-contain filter brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.parentElement.innerHTML = `<span style="font-size:9px;color:#00C9A7;font-weight:700;">${uni.abbr}</span>`;
        }}
      />
    </div>
    <span className="text-white/50 text-sm font-medium whitespace-nowrap group-hover:text-white/90 transition-colors">
      {uni.name}
    </span>
  </div>
);

export default function UniversityTicker() {
  const tickerRef = useRef(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes ticker-scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .ticker-track {
        display: flex;
        animation: ticker-scroll 30s linear infinite;
        width: max-content;
      }
      .ticker-track:hover {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const doubled = [...universities, ...universities];

  return (
    <div className="bg-[#020d0c] border-t border-b border-white/10 overflow-hidden py-2">
      {/* Gradient edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#020d0c] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#020d0c] to-transparent z-10 pointer-events-none" />
        <div ref={tickerRef} className="ticker-track">
          {doubled.map((uni, i) => (
            <TickerItem key={i} uni={uni} />
          ))}
        </div>
      </div>
    </div>
  );
}