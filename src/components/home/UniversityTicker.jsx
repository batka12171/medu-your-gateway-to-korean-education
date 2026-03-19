import React, { useEffect, useRef } from "react";

const universities = [
  { name: "KAIST", logo: "https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/b6d7d380a_images.png" },
  { name: "Inha University", logo: "https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/8755960da_651677845_1210490084489611_9093132361968492518_n.jpg" },
  { name: "Gachon University", logo: "https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/3ed6bd80e_636769399_1666522894784343_5374186016198489079_n.jpg" },
  { name: "Chung-Ang University", logo: "https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/268e3960c_650342326_3250246938486370_6450545614957446111_n.jpg" },
  { name: "Kookmin University", logo: "https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/9af89e6c0_650048823_2433051990481193_1248016639329554724_n.jpg" },
  { name: "Hanyang University", logo: "https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/217438b58_648844185_2728884820843446_9488595830072943_n.jpg" },
  { name: "Korea University (Sejong)", logo: "https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/84383a4d9_639738479_898731099440851_7744893834772536013_n.jpg" },
  { name: "Yonsei University", logo: "https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/3b2f8b656_650354619_1498725804918011_1250986844806115673_n.jpg" },
  { name: "Korea University", logo: "https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/ef334b61b_644223322_1277111504522198_1134560642862769065_n.jpg" },
];

const TickerItem = ({ uni }) => (
  <div className="flex items-center px-10 py-4 group cursor-default flex-shrink-0">
    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-[#00C9A7]/40 transition-colors">
      <img
        src={uni.logo}
        alt={uni.name}
        className="w-14 h-14 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
      />
    </div>
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