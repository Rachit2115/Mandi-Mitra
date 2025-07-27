import React from "react";

const SuccessAnimation: React.FC = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-bounce">
    <circle cx="48" cy="48" r="46" stroke="url(#paint0_linear)" strokeWidth="4" fill="#fff" />
    <path d="M32 49L44 61L68 37" stroke="url(#paint1_linear)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="paint0_linear" x1="0" y1="0" x2="96" y2="96" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34d399" />
        <stop offset="0.5" stopColor="#fbbf24" />
        <stop offset="1" stopColor="#f87171" />
      </linearGradient>
      <linearGradient id="paint1_linear" x1="32" y1="49" x2="68" y2="37" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34d399" />
        <stop offset="1" stopColor="#fbbf24" />
      </linearGradient>
    </defs>
  </svg>
);

export default SuccessAnimation;
