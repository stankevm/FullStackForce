import React from "react";

const GlowingLines: React.FC = () => {
  const lineCount = 5; 
  const lines = Array.from({ length: lineCount }).map((_, i) => ({
    y: 220 + i * 45, 
    delay: i * 0.2,
  }));

  const pathD = (y: number) => {
    const startX = 1200;
    const endX = -100;
    const ctrl1X = 550;
    const ctrl2X = 550;
    const ctrl1Y = y - 900; 
    const ctrl2Y = y + 250;
    return `M ${startX} ${y} C ${ctrl1X} ${ctrl1Y} ${ctrl2X} ${ctrl2Y} ${endX} ${y}`;
  };

  return (
    <div className="glowing-svg-wrapper">
      <svg
        className="glowing-svg"
        viewBox="-100 -600 1200 1400"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient
            id="neonGradient"
            x1="-100"
            y1="0"
            x2="1000"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#cfc3ef" />
            <stop offset="10%" stopColor="#ff8cff" />
            <stop offset="50%" stopColor="#b366ff" />
            <stop offset="80%" stopColor="#cfc3ee" />
            <stop offset="100%" stopColor="#5933c7" />

          </linearGradient>
        </defs>
        {lines.map((l, idx) => (
          <path
            key={idx}
            d={pathD(l.y)}
            className="glowing-svg-path"
            style={{ animationDelay: `${l.delay}s` }}
            stroke="url(#neonGradient)"
          />
        ))}
      </svg>
    </div>
  );
};

export default GlowingLines; 