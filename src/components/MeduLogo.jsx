import React from "react";

// MEDU brand logo - M shape with person (head = circle, two legs = M shape)
export default function MeduLogo({ className = "", size = 40, dark = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="meduGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={dark ? "#ffffff" : "#00C9A7"} />
          <stop offset="100%" stopColor={dark ? "#ccfff7" : "#005F56"} />
        </linearGradient>
      </defs>
      {/* Head - circle */}
      <circle cx="50" cy="18" r="12" fill="url(#meduGrad)" />
      {/* M / body shape - person with two legs spreading out */}
      <path
        d="M15 90 Q25 45 50 55 Q75 45 85 90"
        stroke="url(#meduGrad)"
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}