import React from "react";

const LOGOS = [
  { url: "https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/cc90e8b1e_651677845_1210490084489611_9093132361968492518_n-removebg-preview.png", alt: "Inha University" },
  { url: "https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/be147e66e_650342326_3250246938486370_6450545614957446111_n-removebg-preview.png", alt: "Chung-Ang University" },
  { url: "https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/fe83dc76b_650048823_2433051990481193_1248016639329554724_n-removebg-preview.png", alt: "Kookmin University" },
  { url: "https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/713610728_648844185_2728884820843446_9488595830072943_n-removebg-preview.png", alt: "Hanyang University" },
  { url: "https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/f8d9a8c33_644223322_1277111504522198_1134560642862769065_n-removebg-preview.png", alt: "Korea University" },
  { url: "https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/ffd64b749_639738479_898731099440851_7744893834772536013_n-removebg-preview.png", alt: "Seoul National University" },

];

// Duplicate for seamless loop
const ALL_LOGOS = [...LOGOS, ...LOGOS];

export default function UniversityTicker() {
  return (
    <div className="bg-[#020d0c] py-10 overflow-hidden border-t border-b border-white/10">
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          animation: ticker 30s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Gradient masks */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #020d0c, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #020d0c, transparent)" }} />

        <div className="ticker-track">
          {ALL_LOGOS.map((logo, i) => (
            <div
              key={i}
              className="mx-8 flex items-center justify-center shrink-0 group"
              style={{ width: 120, height: 120 }}
            >
              <img
                src={logo.url}
                alt={logo.alt}
                className="w-full h-full object-contain grayscale opacity-50 transition-all duration-400 group-hover:grayscale-0 group-hover:opacity-100 group-hover:drop-shadow-[0_0_12px_rgba(0,201,167,0.6)]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}