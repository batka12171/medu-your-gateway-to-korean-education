import React from "react";

export default function MeduLogo({ className = "", size = 40 }) {
  return (
    <img
      src="https://media.base44.com/images/public/694e6255f87f952ccf7b0ebb/eb5cbd32e_661594714_1998376537721428_2420286214571376039_n-removebg-preview.png"
      alt="MEDU Logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}