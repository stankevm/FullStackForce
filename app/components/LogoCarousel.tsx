import React from 'react';

interface LogoCarouselProps {
  logos: { src: string; alt: string }[];
}

const LogoCarousel: React.FC<LogoCarouselProps> = ({ logos }) => {
  return (
    <div className="logo-carousel-container">
      <div className="logo-carousel-track">
        {logos.map((logo, index) => (
          <div className="logo-item" key={`logo-a-${index}`}>
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
        {logos.map((logo, index) => (
          <div className="logo-item" key={`logo-b-${index}`}>
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel; 