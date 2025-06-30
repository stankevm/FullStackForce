"use client";

import { useEffect, useRef } from 'react';

interface ServiceCardProps {
  title: string;
  items: string[];
  icon: string;
  className?: string;
  minHeight?: string;
}

const ServiceCard = ({ title, items, icon, className, minHeight }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      },
      { threshold: 0.8 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`service-card ${className}`} 
      ref={cardRef}
      style={{ minHeight }}
    >
      <div className="icon">
        <i className={icon}></i>
      </div>
      <h3>{title}</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceCard; 