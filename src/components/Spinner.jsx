import React from "react";

const Spinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <svg
      className="animate-spin"
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="gold-gradient" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD700" />
          <stop offset="0.5" stopColor="#FFF8DC" />
          <stop offset="1" stopColor="#B8860B" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <circle
        cx="28"
        cy="28"
        r="22"
        stroke="url(#gold-gradient)"
        strokeWidth="5"
        opacity="0.25"
        fill="none"
      />
      <path
        d="M50 28c0-12.15-9.85-22-22-22"
        stroke="url(#gold-gradient)"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#glow)"
      />
      <circle
        cx="50"
        cy="28"
        r="2.5"
        fill="url(#gold-gradient)"
        filter="url(#glow)"
      />
    </svg>
  </div>
);

export default Spinner;