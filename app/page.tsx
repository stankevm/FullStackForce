"use client";
import { useEffect, useRef, useState } from "react";
{/*import Image from 'next/image'*/}
import Typewriter from "./components/Typewriter";
import ServiceCard from './components/ServiceCard';
import GlowCard from './components/GlowCard';
import TeamCard from './components/TeamCard';
import TechBall from "./components/TechBall";
import ComputerCanvas from "./components/ComputerCanvas";
import Toolbar from "./components/Toolbar";
import GlowingLines from "./components/GlowingLines";
import Aurora from "./components/Aurora";
import Particles from "./components/Particles";
import RocketLaunchAnimation from "./components/RocketLaunchAnimation";
import CodeTypingAnimation from "./components/CodeTypingAnimation";
import Orb from "./components/GlowingCircle";
import LogoCarousel from "./components/LogoCarousel";
import FlipCard from "./components/FlipCard";

export default function Home() {
  const missionRef = useRef(null);
  const [missionIsVisible, setMissionIsVisible] = useState(false);
  const whyWorkRef = useRef(null);
  const [whyWorkIsVisible, setWhyWorkIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [flippedCardIndex, setFlippedCardIndex] = useState<number | null>(null);
  const [launchRocket, setLaunchRocket] = useState(false);
  const [showSlogan, setShowSlogan] = useState(false);
  const [codeDisappeared, setCodeDisappeared] = useState(false);
  const [rocketBuildProgress, setRocketBuildProgress] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [showRocket, setShowRocket] = useState(true);
  const [showCode, setShowCode] = useState(true);

  const phrases = [
    "End-to-End Product Development.",
    "Cloud.",
    "Backend.",
    "Frontend.",
    "Integration."
  ];

  useEffect(() => {
    const missionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setMissionIsVisible(true);
          missionObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (missionRef.current) {
      missionObserver.observe(missionRef.current);
    }

    const whyWorkObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setWhyWorkIsVisible(true);
          whyWorkObserver.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (whyWorkRef.current) {
      whyWorkObserver.observe(whyWorkRef.current);
    }

    return () => {
      missionObserver.disconnect();
      whyWorkObserver.disconnect();
    };
  }, []);

  // Show slogan after rocket launches
  useEffect(() => {
    if (launchRocket) {
      setTimeout(() => {
        setShowSlogan(true);
      }, 3500); // Show slogan 2 seconds after rocket launches
    }
  }, [launchRocket]);

  // Unmount code animation after it scrolls away
  useEffect(() => {
    if (launchRocket) {
      const timer = setTimeout(() => {
        setShowCode(false);
      }, 8000); // 3s delay + 2s animation + 1s buffer = 6s
      return () => clearTimeout(timer);
    }
  }, [launchRocket]);

  // Unmount rocket after it's off screen
  useEffect(() => {
    if (launchRocket) {
      const timer = setTimeout(() => {
        setShowRocket(false);
      }, 8000); // Rocket should be off screen by now
      return () => clearTimeout(timer);
    }
  }, [launchRocket]);

  // Cycle through phrases with fade in/out
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000); // Change phrase every 3 seconds

    return () => clearInterval(interval);
  }, [phrases.length]);

  useEffect(() => {
    if (submitStatus !== 'idle') {
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 4500);

      // remove fail/success message after 5 seconds 
      const removeTimer = setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
        setIsFadingOut(false);
      }, 5000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [submitStatus]);

  const services = [
    {
      title: "Advisory & CTO-as-a-Service",
      items: [
        "Technical Due Diligence",
        "Startup Mentorship",
        "Scaling Support"
      ],
      icon: "fa-solid fa-bullseye"
    },
    {
      title: "Full-stack Development",
      items: [
        "Web & App Development",
        "Microservices & Modular Systems",
        "Custom UI/UX Engineering"
      ],
      icon: "fa-solid fa-laptop-code"
    },
    {
      title: "API & Architecture",
      items: [
        "REST & GraphQL API Design",
        "Server-side Architecture",
        "Authentication & Role Management"
      ],
      icon: "fa-solid fa-sitemap"
    },
    {
      title: "Cloud & DevOps",
      items: [
        "Cloud Deployments (Azure, AWS, GCP)",
        "CI/CD Pipelines & Containerization",
        "Infrastructure as Code (IaC)"
      ],
      icon: "fa-solid fa-cloud"
    },
    {
      title: "Data & Integration",
      items: [
        "Databases: SQL, MongoDB, PostgreSQL",
        "System Integration (PACS, HL7)",
        "Data Warehousing & ETL"
      ],
      icon: "fa-solid fa-database"
    },
    {
      title: "Quality & Support",
      items: [
        "Automated Testing & QA",
        "Monitoring & Observability",
        "Post-Launch Support"
      ],
      icon: "fa-solid fa-shield-halved"
    }
  ];

  const techLogos = [
    { src: '/icons/React.png', alt: 'React' },
    { src: '/icons/NET.png', alt: '.NET' },
    { src: '/icons/MongoDB.png', alt: 'MongoDB' },
    { src: '/icons/sql.png', alt: 'SQL Server' },
    { src: '/icons/azure.png', alt: 'Azure' },
    { src: '/icons/AWS.png', alt: 'AWS' }
  ];

  const projects = [
    {
      title: "E-commerce Platform",
      description: "A modern e-commerce solution built with Next.js and Node.js",
      icon: "fa-solid fa-cart-shopping"
    },
    {
      title: "Healthcare Management System",
      description: "Integrated EHR system with HL7 compatibility",
      icon: "fa-solid fa-heart-pulse"
    },
    {
      title: "Financial Analytics Dashboard",
      description: "Real-time data visualization platform for financial metrics",
      icon: "fa-solid fa-chart-line"
    }
  ];

  const flipCardsData = [
    {
      title: "E-commerce Platform",
      description: "Product Management System \n Shopping Cart & Checkout \n User Authentication & Profiles \n Order Processing Engine \n Admin Dashboard \n Search & Filtering ",
      subtitle: "A modern e-commerce solution built with Next.js and Node.js for high performance and a smooth user experience.",
      image: "e-com.png"
    },
    {
      title: "Healthcare Management System",
      description: "Patient Records Management \n HL7 Integration Layer \n Appointment Scheduling \n Clinical Documentation \n Prescription Management \n Billing & Insurance \n Reporting & Analytics ",
      subtitle: "An integrated Electronic Health Record system built with HL7 standards for seamless data exchange and patient care management.",
      image: "health2.png"
    },
    {
      title: "Financial Analytics Dashboard",
      description: "Real-time Data Pipeline \n Interactive Visualizations \n Custom Report Builder \n Budget Tracking & Forecasting \n Multi-source Data Integration \n Performance Metrics Dashboard \n Alert & Notification System \n Export & Sharing",
      subtitle: "A real-time data visualization platform that turns complex financial metrics into actionable insights with interactive dashboards and reports.",
      image: "finance.png"
    }
  ];

  return (
    <>
      <Toolbar />
      {/* Rocket launch animation - positioned outside main to be above toolbar */}
      {showRocket && (
        <div className="animation-overlay">
          <RocketLaunchAnimation 
            launchTriggered={launchRocket} 
            buildProgress={rocketBuildProgress}
            width="100%" 
            height="100%" 
          />
        </div>
      )}
      <main>
        {/* Section 1: Homepage */}
        <section className="section hero">
          {/*<GlowingLines />*/}
          <Particles 
            particleCount={500}
            particleSpread={5}
            speed={0.05}
            particleColors={["#E2CBFF", "#b366ff", "#cfc3ef", "#9f67ff"]}
            moveParticlesOnHover={true}
            particleHoverFactor={0.5}
            alphaParticles={true}
            particleBaseSize={80}
            sizeRandomness={0.8}
            cameraDistance={12}
            disableRotation={false}
            className="absolute inset-0 z-0"
          />
          {/* Code animation - stays in hero section */}
          {showCode && (
            <div className="code-animation-container">
              <CodeTypingAnimation 
                autoStart={true} 
                onLaunchTrigger={() => setLaunchRocket(true)} 
                onCodeDisappeared={() => setCodeDisappeared(true)}
                onProgressUpdate={(progress) => setRocketBuildProgress(progress)}
              />
            </div>
          )}
          <div className={`hero-header ${codeDisappeared ? 'centered' : ''}`}>
            <h1 className="hero-title-wrapper">
              {showSlogan && (
                <>
                  <span className="slogan-text slogan-left">
                    may the
                  </span>
                  <span className="slogan-text slogan-right">
                    skyrocket your growth
                  </span>
                </>
              )}
              <img className="hero-logo" />FullStackForce
            </h1>
            <div className="hero-typewriter">
              <span className="typewriter-prefix" style={{ 
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 200,
                display: 'block',
                color: '#f2f1f5',
              }}>
                Elite Software Engineers for
              </span>
              <span key={currentPhraseIndex} className="neon-blink-text">
                {phrases[currentPhraseIndex]}
              </span>
            </div>
            {/*<img src="/laptop.png" alt="Laptop" className="hero-laptop" />*/}
            {/*<div className="hero-laptop" style={{ pointerEvents: 'auto'}}>
              <ComputerCanvas />
            </div>*/}
            <div>
              <a href="#page-bottom" className={`button ${codeDisappeared ? 'shine' : ''}`}>
                <span>Let&apos;s Talk</span>
              </a>
            </div>
            {/*<p className="hero-quote">May the FullStackForce skyrocket your growth.</p>*/}
          </div>
        </section>

        {/* Section 2: Delivery Flow, Services, Projects, Why Work With Us */}
        <section id="section2" className="section section2">
          <Aurora
            colorStops={["#5b02e1", "#6B1DB4", "#5b02e1"]}
            amplitude={0.5}
            blend={0.7}
            speed={1.5}
            brightness={1.4}
            contrast={1.9}
            opacity={0.3}
            edgeBrightness={0.5}
          />
          <div className="section-content">
            <div className="mission-container">
              <div
                ref={missionRef}
                className={`mission-statement-text ${missionIsVisible ? 'visible' : ''}`}
              >
                <h3 className="mission-title">Let us help <br /> you grow</h3>
                <p>We deliver high-quality software with precision and speed.</p>
                <p>Empower clients through technology and transparency.</p>
                <p>Build scalable, secure, and maintainable systems.</p>
                <p>Foster long-term partnerships based on trust and excellence.</p>
              </div>
              <div className="mission-image">
                <img src="/photo-mission.png" alt="Mission" />
              </div>
            </div>

            {/*<div className="glowing-circles-container">
              <div className="circle-wrapper circle-1">
                <Orb hue={320} hoverIntensity={0.3} forceHoverState={true} />
              </div>
              <div className="circle-wrapper circle-2">
                <Orb hue={320} hoverIntensity={0.3} forceHoverState={true} />
              </div>
              <div className="circle-wrapper circle-3">
                <Orb hue={320} hoverIntensity={0.3} forceHoverState={true} />
              </div>
              <div className="circle-wrapper circle-4">
                <Orb hue={320} hoverIntensity={0.3} forceHoverState={true} />
              </div>
              <div className="circle-wrapper circle-5">
                <Orb hue={320} hoverIntensity={0.3} forceHoverState={true} />
              </div>
              <div className="circle-wrapper circle-6">
                <Orb hue={320} hoverIntensity={0.3} forceHoverState={true} />
              </div>
            </div>*/}

            <h2>End-to-end Delivery Flow</h2>
            <div className="delivery-flow">
              <div className="flow-row">
                <div className="flow-item">Ideation</div>
                <div className="flow-arrow">→</div>
                <div className="flow-item">Advisory & Planning</div>
                <div className="flow-arrow">→</div>
                <div className="flow-item">Design & Architecture</div>
                <div className="flow-arrow">→</div>
                <div className="flow-item">Development</div>
              </div>
              <div className="flow-row">
                <div className="flow-item">Testing & QA</div>
                <div className="flow-arrow">→</div>
                <div className="flow-item">Deployment</div>
                <div className="flow-arrow">→</div>
                <div className="flow-item">Support & Scale</div>
              </div>
            </div>
            <div className="delivery-list">
              <div className="delivery-list-item">Ideation</div>
              <div className="delivery-list-item">Advisory & Planning</div>
              <div className="delivery-list-item">Design & Architecture</div>
              <div className="delivery-list-item">Development</div>
              <div className="delivery-list-item">Testing & QA</div>
              <div className="delivery-list-item">Deployment</div>
              <div className="delivery-list-item">Support & Scale</div>
            </div>

            <h2 id="services">Our Services</h2>
            <div className="services-grid">
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  items={service.items}
                  icon={service.icon}
                />
              ))}
            </div>
            {/* Logos*/}
            <div className="logo-carousel-desktop">
              <LogoCarousel logos={techLogos} />
            </div>
            <div className="logo-grid-mobile">
              {techLogos.map((logo, idx) => (
                <div key={idx} className="logo-grid-item">
                  <img src={logo.src} alt={logo.alt} />
                  <span className="logo-grid-label">{logo.alt}</span>
                </div>
              ))}
            </div>

            <h2 id="projects" className="mt-7">Projects</h2>
            {/*<div className="services-grid projects-grid">
              {projects.map((project, index) => (
                <GlowCard key={index} card={project} index={index} />
              ))}
            </div>*/}

            <div className="services-grid projects-grid mt-2">
              {flipCardsData.map((card, index) => (
                <FlipCard
                  key={index}
                  image={card.image}
                  title={card.title}
                  subtitle={card.subtitle}
                  description={card.description}
                  isFlipped={flippedCardIndex === index}
                  onFlip={() => setFlippedCardIndex(flippedCardIndex === index ? null : index)}
                />
              ))}
            </div>

            <h2 id="why-work-with-us" className="mt-7">Why work with us?</h2>
            <div
              ref={whyWorkRef}
              className={`why-work-statement ${whyWorkIsVisible ? 'visible' : ''}`}
            >
              <p>No juniors, no BS — just senior devs.</p>
              <p>We speak business and code.</p>
              <p>Fast ramp-up. Proven delivery.</p>
            </div>
            {/* Aurora at bottom - upside down */}
            <Aurora
              colorStops={["#5b02e1", "#6B1DB4", "#5b02e1"]}
              amplitude={0.5}
              blend={0.8}
              speed={1.5}
              brightness={1.4}
              contrast={1.9}
              opacity={0.3}
              edgeBrightness={0.5}
              rotation={180}
              className="aurora-container-bottom"
            />
          </div>
        </section>

        {/* Section 3: Team & Contact */}
        <section id="contact" className="section section3">
          <div className="section-content">
            <h2 id="team" className="mb-4">Meet our team</h2>
            <div className="team-cards-container">
              {[
              { name: 'Vigen Sh.', role: 'CTO – Strategy & Architecture', imageSrc: '/disney-prog-space-purple.png' },
              { name: 'Gera B.', role: 'CEO & R&D Lead', imageSrc: '/whiteboard-prog-cut.png' },
              { name: 'Stas A.', role: 'Frontend Developer', imageSrc: '/toi-prog-cartoon2.png' },
              { name: 'Stas B.', role: 'Backend Developer', imageSrc: '/disney-table4.png' },
            ].map((member, idx) => (
                <TeamCard
                  key={idx}
                  imageSrc={member.imageSrc}
                  name={member.name}
                  role={member.role}
                />
              ))}
            </div>
            <h2>Contact</h2>
            <div className="contact-card">
              <div className="contact-card-header">
                <span className="contact-subtitle">Ready to build something extraordinary?</span>
              </div>
              <form className="contact-form" onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                setSubmitStatus('idle');
                setSubmitMessage('');
                setIsFadingOut(false);

                const form = e.currentTarget as HTMLFormElement;
                const formData = new FormData(form);
                const name = String(formData.get('name') || '');
                const email = String(formData.get('email') || '');
                const message = String(formData.get('message') || '');

                try {
                  const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, email, message }),
                  });

                  const data = await response.json();

                  if (response.ok) {
                    setSubmitStatus('success');
                    setSubmitMessage('Thank you! Your message has been sent successfully.');
                    form.reset();
                  } else {
                    setSubmitStatus('error');
                    setSubmitMessage(data.error || 'Something went wrong. Please try again.');
                  }
                } catch (error) {
                  setSubmitStatus('error');
                  setSubmitMessage('Failed to send message. Please check your connection.');
                } finally {
                  setIsSubmitting(false);
                }
              }}>
                <label className="contact-label">Your Name
                  <input required name="name" className="contact-input" placeholder="What's your name?" />
                </label>
                <label className="contact-label">Your Email
                  <input required name="email" type="email" className="contact-input" placeholder="What's your email?" />
                </label>
                <label className="contact-label">Your Message
                  <textarea required name="message" rows={5} className="contact-textarea" placeholder="What do you want to say?" />
                </label>
                <button type="submit" className="contact-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send'}
                </button>
                {submitStatus !== 'idle' && (
                  <div className={`contact-message ${submitStatus === 'success' ? 'contact-success' : 'contact-error'} ${isFadingOut ? 'fading-out' : ''}`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
            <p>Email: <a href="mailto:team@fullstackforce.dev">team@fullstackforce.dev</a></p>
          </div>
        </section>

        {/* for let's talk button */}
        <div id="page-bottom" className="page-anchor" />
      </main>
    </>
  );
}
