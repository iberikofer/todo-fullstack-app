import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: number;
}

export function BrandLogo({ className = 'w-9 h-9', size }: BrandLogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      aria-label="TODO App Logo"
    >
      {/* Background square with subtly rounded corners */}
      <rect width="32" height="32" rx="3.5" fill="#5E8B7E" />

      {/* Long line on top */}
      <rect
        x="7"
        y="6"
        width="18"
        height="2.75"
        rx="1.375"
        fill="#FFFFFF"
        opacity="0.9"
      />

      {/* Short line below */}
      <rect
        x="7"
        y="11"
        width="11"
        height="2.75"
        rx="1.375"
        fill="#FFFFFF"
        opacity="0.65"
      />

      {/* Checkmark beneath lines */}
      <path
        d="M10 22.5L14 26.5L22 18.5"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default BrandLogo;
