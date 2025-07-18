"use client";
{/*import Image from 'next/image'*/}
import Typewriter from "./components/Typewriter";
import ServiceCard from './components/ServiceCard';
import GlowCard from './components/GlowCard';
import TeamCard from './components/TeamCard';
import TechBall from "./components/TechBall";
import ComputerCanvas from "./components/ComputerCanvas";
import Toolbar from "./components/Toolbar";
import GlowingLines from "./components/GlowingLines";

export default function Home() {
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
          <GlowingLines />
          <div className="hero-header">
            <h1>FullStackForce</h1>
            <div className="hero-typewriter">
              Elite Software Engineers for<br />
              <Typewriter
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
              <a href="#page-bottom" className="button" data-text="Let's Talk">Let&apos;s Talk</a>
            </div>
          </div>
        </section>

        {/* Section 2: Delivery Flow, Services, Projects, Why Work With Us */}
        <section className="section section2">
          <div className="section-content">
            <div className="mission-statement">
              <p>We deliver high-quality software with precision and speed.</p>
              <p>Empower clients through technology and transparency.</p>
              <p>Build scalable, secure, and maintainable systems.</p>
              <p>Foster long-term partnerships based on trust and excellence.</p>
            </div>

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
            <div style={{
              display:'flex',
              flexWrap:'wrap',
              justifyContent:'center',
              gap:'2.5rem',
              margin:'3rem 0',
              position: 'relative',
              zIndex: 20
            }}>
              {[
                {img:'/icons/React.png', label:'React'},
                {img:'/icons/NET.png', label:'.NET'},
                {img:'/icons/MongoDB.png', label:'MongoDB'},
                {img:'/icons/sql.png', label:'SQL Server'},
                {img:'/icons/azure.png', label:'Azure'},
                {img:'/icons/AWS.png', label:'AWS'}
              ].map((tech, i)=>(
                <div key={i} style={{
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  position: 'relative',
                  zIndex: 20
                }}>
                  <TechBall imgUrl={tech.img} color="#ead5ff" size={100} multiSide/>
                  <p style={{marginTop:'0.5rem',fontWeight:500}}>{tech.label}</p>
                </div>
              ))}
            </div>

            <h2 id="projects" style={{marginTop: '7rem'}}>Projects</h2>
            <div className="services-grid">
              {projects.map((project, index) => (
                <GlowCard key={index} card={project} index={index} />
              ))}
            </div>

            <h2 style={{marginTop: '7rem'}}>Why work with us?</h2>
            <div className="why-work-statement">
              <p>No juniors, no BS — just senior devs.</p>
              <p>We speak business and code.</p>
              <p>Fast ramp-up. Proven delivery.</p>
            </div>
            {/*lines image */}
            <img
              src="/lines_light_back.png"
              alt="Decorative lines"
              className="full-width-img big-lines mt-8 select-none pointer-events-none"
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
