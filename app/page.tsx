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
import Orb from "./components/GlowingCircle";
import LogoCarousel from "./components/LogoCarousel";

export default function Home() {
  const missionRef = useRef(null);
  const [missionIsVisible, setMissionIsVisible] = useState(false);
  const whyWorkRef = useRef(null);
  const [whyWorkIsVisible, setWhyWorkIsVisible] = useState(false);

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
      description: "A modern e-commerce solution built with Next.js and Node.js"
    },
    {
      title: "Healthcare Management System",
      description: "Integrated EHR system with HL7 compatibility"
    },
    {
      title: "Financial Analytics Dashboard",
      description: "Real-time data visualization platform for financial metrics"
    }
  ];

  return (
    <>
      <Toolbar />
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
          {/* Rocket launch animation */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 30 }}>
            <RocketLaunchAnimation autoStart={true} showInfo={false} width="100%" height="110vh" />
          </div>
          <div className="hero-header">
            <h1><img className="hero-logo" />FullStackForce</h1>
            <div className="hero-typewriter">
              <Typewriter
                staticPrefix="Elite Software Engineers for"
                staticPrefixStyle={{ 
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 200,
                  display: 'block',
                  color: '#f2f1f5',
                }}
                staticPrefixClassName="typewriter-prefix"
                phrases={[
                  "End-to-End Product Development.",
                  "Cloud.",
                  "Backend.",
                  "Frontend.",
                  "Integration."
                ]}
              />
            </div>
            {/*<img src="/laptop.png" alt="Laptop" className="hero-laptop" />*/}
            {/*<div className="hero-laptop" style={{ pointerEvents: 'auto'}}>
              <ComputerCanvas />
            </div>*/}
            <div>
              <a href="#page-bottom" className="button">
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
            {/*balls */}
            <LogoCarousel logos={techLogos} />

            <h2 id="projects" style={{marginTop: '7rem'}}>Projects</h2>
            <div className="services-grid">
              {projects.map((project, index) => (
                <GlowCard key={index} card={project} index={index} />
              ))}
            </div>

            <h2 style={{marginTop: '7rem'}}>Why work with us?</h2>
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
            <h2 id="team" style={{ marginBottom: '4rem' }}>Meet our team</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', marginBottom: '2.5rem'}}>
              {[
                { name: 'Vigen Sh.', role: 'CTO – Strategy & Architecture', imageSrc: '/CTO.png' },
                { name: 'Gera B.', role: 'CEO & R&D Lead', imageSrc: '/CEO.png' },
                { name: 'Stas A.', role: 'Frontend Developer', imageSrc: '/person_on_toi.png' },
                { name: 'Stas B.', role: 'Backend Developer', imageSrc: '/person_on_toi.png' },
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
            <p>Ready to build something extraordinary?</p>
            <p>Email: <a href="mailto:team@fullstackforce.dev">team@fullstackforce.dev</a></p>
          </div>
        </section>

        {/* for let's talk button */}
        <div id="page-bottom" style={{ height: '1px' }} />
      </main>
    </>
  );
}
