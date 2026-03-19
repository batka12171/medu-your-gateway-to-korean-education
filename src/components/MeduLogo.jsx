import React from "react";

export default function MeduLogo({ className = "", size = 40, dark = false }) {
  const gradStart = dark ? "#ffffff" : "#00C9A7";
  const gradEnd = dark ? "#a0f0e0" : "#005F56";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="meduGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradStart} />
          <stop offset="100%" stopColor={gradEnd} />
        </linearGradient>
        <linearGradient id="meduGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={dark ? "#ccfff5" : "#00a58a"} />
          <stop offset="100%" stopColor={dark ? "#88eedd" : "#003d38"} />
        </linearGradient>
      </defs>

      {/* Head dot */}
      <circle cx="50" cy="10" r="9" fill="url(#meduGradMain)" />

      {/* Left wing of M - lighter */}
      <path
        d="M8 82 C8 55, 28 30, 50 42 C35 50, 18 62, 8 82Z"
        fill="url(#meduGradMain)"
      />

      {/* Right wing of M - darker for depth */}
      <path
        d="M92 82 C92 55, 72 30, 50 42 C65 50, 82 62, 92 82Z"
        fill="url(#meduGradDark)"
      />

      {/* Bottom bar connecting both wings */}
      <path
        d="M8 82 Q50 70 92 82 Q80 92 50 90 Q20 92 8 82Z"
        fill="url(#meduGradMain)"
        opacity="0.5"
      />
    </svg>
  );
}