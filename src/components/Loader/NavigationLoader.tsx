import React from 'react';

const NavigationLoader = () => {
  return (
    <div className="relative inset-0 flex items-center justify-center z-50">
      <svg
        width="240"
        height="120"
        viewBox="0 0 120 60"
        xmlns="http://www.w3.org/2000/svg"
        className="w-48 h-24"
      >
        <defs>
          <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B52A3" />
            <stop offset="50%" stopColor="#4A90E2" />
            <stop offset="100%" stopColor="#00B8A9" />
          </linearGradient>

          <path
            id="infinityPath"
            d="M30,30 C30,20 40,20 50,30 C60,40 70,40 70,30 C70,20 60,20 50,30 C40,40 30,40 30,30"
          />
        </defs>

        <use
          href="#infinityPath"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="3"
          opacity="0.3"
        />
        <use
          href="#infinityPath"
          fill="none"
          stroke="url(#infinityGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="180"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="360"
            to="0"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </use>
      </svg>
    </div>
  );
};

export default NavigationLoader;
