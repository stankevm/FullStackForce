"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

interface RocketLaunchAnimationProps {
  autoStart?: boolean;
  onLaunchComplete?: () => void;
  width?: string;
  height?: string;
  showInfo?: boolean;
}

const RocketLaunchAnimation: React.FC<RocketLaunchAnimationProps> = ({ 
  autoStart = true, 
  onLaunchComplete = () => {},
  width = "100%",
  height = "100vh",
  showInfo = true 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [launchInitiated, setLaunchInitiated] = useState(false);
  const [rocketPosition, setRocketPosition] = useState(0);
  const [showFlame, setShowFlame] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [smokePlumes, setSmokePlumes] = useState<any[]>([]);
  
  const animationRef = useRef<number | null>(null);
  const rocketRef = useRef<HTMLDivElement | null>(null);
  const particleIdRef = useRef(0);
  const smokePlumeId = useRef(0);

  // Static part of the code (always visible)
  const staticCode = `const business = {
    growth: 100,
    profitable: true,
    engines: true,
    ready: true
};

function setStrategy() {
    let marketVector = [ [1, 0, 0], [0, 0.98, -0.17], [0, 0.17, 0.98] ];
    let expansionPath = { reach: 3400, stability: 0, scale: 18000 };
    let system = { aligned: true, mode: "planning", timestamp: now() };
    random(); marketVector[1][1] *= 1.0001; expansionPath.scale += 1;
    system.mode = "execution";
}

function verifyReadiness(growth, engines, ready) {
    return growth >= 80 && engines && ready;
}

function activateEngines() {
    let core = { status: "idle", locked: true, warmedUp: false };
    core.locked = false; core.warmedUp = true;
    let vectorControl = { focus: 5, agility: 2, momentum: 0 };
    core.status = "engaged";
}

business.launch = function() {
    if (!verifyReadiness(this.growth, this.engines, this.ready)) return;
    setStrategy(); optimizeResources(); activateEngines(); deploy();
}\n`;

  //gets typed in real time
  const dynamicCode = `function start() {\n      business.launch();\n}\n\n//may Fullstackforce skyrocket your growth ⇧; \nstart();`;

  useEffect(() => {
    if (!autoStart || !isTyping) return;

    const timer = setTimeout(() => {
      if (currentIndex < dynamicCode.length) {
        setCurrentIndex(prev => prev + 1);

        const currentText = dynamicCode.substring(0, currentIndex + 1);
        if (currentText.includes('start();') && !launchInitiated) {
          setLaunchInitiated(true);
          setTimeout(() => {
            startLaunchSequence();
          }, 500);
        }
      } else {
        setIsTyping(false);
        if (!launchInitiated) {
          setLaunchInitiated(true);
          setTimeout(() => {
            startLaunchSequence();
          }, 500);
        }
      }
    }, getTypingDelay());

    return () => clearTimeout(timer);
  }, [currentIndex, isTyping, launchInitiated, autoStart]);

  const getTypingDelay = () => {
    const char = dynamicCode[currentIndex];
    if (char === '\n') return 200;
    if (char === ' ') return 30;
    if (char === ';' || char === '{' || char === '}') return 150;
    return 20;
  };

  const startLaunchSequence = () => {
    setShowFlame(true);
    animateRocket();
  };




  const animateRocket = () => {
    let position = 0;
    let velocity = 1;
    const acceleration = 0.3;
    let plumeCreationCount = 0;
    const maxPlumes = 50;
    let lastPlumeTime = 0;

    const animate = () => {
      velocity += acceleration;
      position += velocity;
      setRocketPosition(position);

      const currentTime = performance.now();
      if (currentTime - lastPlumeTime > 40 && plumeCreationCount < maxPlumes) { // 40ms interval
        const id = smokePlumeId.current++;
        const side = (Math.random() > 0.5) ? 1 : -1;
        const style = {
            position: 'absolute',
            bottom: `${-40 + position}px`,  
            left: '66%',
            width: `${100 + Math.random() * 100}px`,
            height: `${100 + Math.random() * 100}px`,
            background: 'radial-gradient(circle, rgba(231, 188, 250, 0.16) 0%, rgba(195, 155, 227, 0.15) 70%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
            transform: `translateX(-50%)`,
            animation: `smoke-fall-${side === 1 ? 'right' : 'left'} ${3 + Math.random() * 1}s ease-out forwards`,
            zIndex: 19
        };

        setSmokePlumes((prev: any[]) => [...prev, { id, style }]);

        setTimeout(() => {
            setSmokePlumes((prev: any[]) => prev.filter(p => p.id !== id));
        }, 6000);

        lastPlumeTime = currentTime;
        plumeCreationCount++;
      }

      if (position < window.innerHeight + 200) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onLaunchComplete();
        //setTimeout(resetAnimation, 2000); for loop animation
      }
    };

    animate();
  };

  const resetAnimation = () => {
    setCurrentIndex(0);
    setIsTyping(true);
    setLaunchInitiated(false);
    setRocketPosition(0);
    setShowFlame(false);
    setParticles([]);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const manualStart = () => {
    if (!launchInitiated) {
      setLaunchInitiated(true);
      startLaunchSequence();
    }
  };

  return (
    <div 
      style={{ 
        width, 
        height, 
        position: 'relative',
        background: 'transparent',
        fontFamily: 'Courier New, monospace',
        overflow: 'hidden',
      }}
    >
      {/* Code */}
      <div
        className="codeContainer"
        style={{
          position: 'absolute',
          bottom: '15px', 
          left: '22%',
          transform: 'translateX(0%)',
          width: '60%',
          height: '800px',
          background: 'transparent',
          padding: '20px',
          boxSizing: 'border-box',
          overflow: 'hidden', 
          zIndex: 10,
          pointerEvents: 'none',
          textAlign: 'left',
          perspective: '550px' // delete to remove 3D effect like in starwars
        }}
      >
        <div style={{
          color: '#FFFFFFBA',
          fontSize: '25px',
          lineHeight: '1.5',
          whiteSpace: 'pre-wrap',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          transform: 'rotateX(55deg)', // delete to remove 3D effect like in starwars
          transformOrigin: 'bottom center' // delete to remove 3D effect like in starwars
        }}>
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0
          }}>
            {staticCode + dynamicCode.substring(0, currentIndex)}
            {isTyping && <span style={{ animation: 'blink 1s infinite' }}>█</span>}
          </div>
        </div>
      </div>

      {/* Rocket */}
      <div
        ref={rocketRef}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '66%',
          transform: `translateX(-50%) translateY(-${rocketPosition}px) scale(0.7)`,
          transformOrigin: 'bottom center',
          width: '60px',
          height: '250px',
          transition: 'transform 0.1s ease',
          zIndex: 20
        }}
      >
        {/* Main Rocket Body */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '30px',
          height: '180px',
          background: 'linear-gradient(to right, #909090, #b0b0b0, #808080)',
          borderRadius: '15px 15px 6px 6px',
          boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.1)'
        }} />
        
        {/* Upper Stage */}
        <div style={{
          position: 'absolute',
          bottom: '200px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '24px',
          height: '45px',
          background: 'linear-gradient(to right, #a0a0a0, #b8b8b8, #989898)',
          borderRadius: '12px 12px 4px 4px',
          boxShadow: 'inset -2px 0 6px rgba(0,0,0,0.1)'
        }} />
        
        {/* Command Module Window */}
        <div style={{
          position: 'absolute',
          bottom: '215px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '10px',
          height: '10px',
          background: 'radial-gradient(circle, #70a1ff, #3742fa)',
          borderRadius: '50%',
          border: '1px solid #2f3542',
          boxShadow: 'inset 1px 1px 3px rgba(255,255,255,0.5)'
        }} />
        
        {/* Service Module Details */}
        <div style={{
          position: 'absolute',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '28px',
          height: '4px',
          background: '#57606f',
          borderRadius: '2px'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '85px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '28px',
          height: '4px',
          background: '#57606f',
          borderRadius: '2px'
        }} />
        
        {/* Side Boosters */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '1px',
          width: '12px',
          height: '140px',
          background: 'linear-gradient(to right, #888888, #a0a0a0, #787878)',
          borderRadius: '6px 6px 3px 3px',
          boxShadow: 'inset -1px 0 4px rgba(0,0,0,0.1)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '30px',
          right: '1px',
          width: '12px',
          height: '140px',
          background: 'linear-gradient(to right, #888888, #a0a0a0, #787878)',
          borderRadius: '6px 6px 3px 3px',
          boxShadow: 'inset -1px 0 4px rgba(0,0,0,0.1)'
        }} />
        
        {/* Engine Nozzles */}
        <div style={{
          position: 'absolute',
          bottom: '15px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '14px',
          height: '12px',
          background: 'linear-gradient(to bottom, #57606f, #2c2c54)',
          borderRadius: '9px 9px 3px 3px'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '3px',
          width: '6px',
          height: '8px',
          background: 'linear-gradient(to bottom, #57606f, #2c2c54)',
          borderRadius: '4px 4px 2px 2px'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '3px',
          width: '6px',
          height: '8px',
          background: 'linear-gradient(to bottom, #57606f, #2c2c54)',
          borderRadius: '4px 4px 2px 2px'
        }} />
        
        {/* Main Engine Flame */}
        {showFlame && (
          <div style={{
            position: 'absolute',
            bottom: '-25px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '16px',
            height: '25px',
            background: 'linear-gradient(to bottom, #ff3838, #ff6b35, #f9ca24)',
            borderRadius: '0 0 50% 50%',
            animation: 'flicker 0.08s infinite alternate',
            filter: 'blur(0.5px)'
          }} />
        )}
        
        {/* Side Engine Flames */}
        {showFlame && (
          <>
            <div style={{
              position: 'absolute',
              bottom: '-15px',
              left: '6px',
              width: '8px',
              height: '15px',
              background: 'linear-gradient(to bottom, #ff3838, #ff6b35, #f9ca24)',
              borderRadius: '0 0 50% 50%',
              animation: 'flicker 0.1s infinite alternate',
              filter: 'blur(0.3px)'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '-15px',
              right: '-2px',
              width: '8px',
              height: '15px',
              background: 'linear-gradient(to bottom, #ff3838, #ff6b35, #f9ca24)',
              borderRadius: '0 0 50% 50%',
              animation: 'flicker 0.09s infinite alternate',
              filter: 'blur(0.3px)'
            }} />
          </>
        )}
      </div>
      
      {smokePlumes.map(plume => <div key={plume.id} style={plume.style} />)}

      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes flicker {
          0% { transform: translateX(-50%) scaleY(1); }
          100% { transform: translateX(-50%) scaleY(1.2); }
        }
        @keyframes particleFloat {
          0% {
            transform: translate(0, 0);
            opacity: 1;
          }
          100% {
            transform: translate(0, 60px);
            opacity: 0;
          }
        }
        
        @keyframes smoke-fall-left {
          from {
            transform: translateX(-50%) scale(0.1);
            opacity: 1;
          }
          to {
            transform: translateX(-300%) scale(3.5) translateY(300px);
            opacity: 0;
          }
        }
        @keyframes smoke-fall-right {
          from {
            transform: translateX(-50%) scale(0.1);
            opacity: 1;
          }
          to {
            transform: translateX(150%) scale(3.5) translateY(300px);
            opacity: 0;
          }
        }

        /* Fade effect for the upper part of the code block */
        .codeContainer {
          -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,1) 90%);
          mask-image: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,1) 90%);
        }
        /* vignette pseudo-elements removed as per user's request */
      `}</style>
    </div>
  );
};

export default RocketLaunchAnimation;