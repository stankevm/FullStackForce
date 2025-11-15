import React, { useEffect, useState } from "react";

const Toolbar: React.FC = () => {
  const [showLogo, setShowLogo] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`toolbar ${showLogo ? "show-logo" : ""} ${isMenuOpen ? "menu-open" : ""}`}> 
      <a
        href="#"
        className="logo"
        style={{ opacity: showLogo ? 1 : 0, transition: "opacity 0.5s ease" }}
      >
        <img src="/logo.png" alt="FullStackForce Logo" className="logo-image" />
        FullStackForce
      </a>
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

      <button
        className="mobile-menu-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className={`hamburger-icon ${isMenuOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {isMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><a href="#services" onClick={handleLinkClick}>Services</a></li>
            <li><a href="#projects" onClick={handleLinkClick}>Projects</a></li>
            <li><a href="#team" onClick={handleLinkClick}>Team</a></li>
            <li><a href="#page-bottom" onClick={handleLinkClick}>Contact</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Toolbar; 