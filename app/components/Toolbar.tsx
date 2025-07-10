import React, { useEffect, useState } from "react";

const Toolbar: React.FC = () => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const heroSection = document.querySelector<HTMLElement>(".hero");
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowLogo(!entry.isIntersecting);
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  return (
    <nav className={`toolbar ${showLogo ? "show-logo" : ""}`}> {/* add class for CSS */}
      <div
        className="logo"
        style={{ opacity: showLogo ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        FullStackForce
      </div>
      <ul
        className={`toolbar-links ${showLogo ? "toolbar-links-right" : "toolbar-links-center"}`}
      >
        <li>
          <a href="#services">Services</a>
        </li>
        <li>
          <a href="#projects">Projects</a>
        </li>
        <li>
          <a href="#team">Team</a>
        </li>
        <li>
          <a href="#page-bottom">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Toolbar; 