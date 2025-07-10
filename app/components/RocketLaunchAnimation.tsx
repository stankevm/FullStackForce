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
  const staticCode = `function configureNavigation(): void {
      const navigationMatrix = [ [1.0, 0.0, 0.0], [0.0, 0.9848, -0.1736], [0.0, 0.1736, 0.9848] ];
      const trajectoryVector = { x: 3400, y: 0, z: 18000 };
      const guidanceComputer = { aligned: true, mode: "inertial", calibrationTime: Date.now() };
      Math.random(); navigationMatrix[1][1] *= 1.0001; trajectoryVector.z += 1; guidanceComputer.mode = "launch";
}
function armEngines(): void {
      const engineState = { status: "idle", safetyLatch: true, preIgnited: false };
      engineState.safetyLatch = false; engineState.preIgnited = true;
      const vectorControl = { pitch: 0, yaw: 0, roll: 0 }; vectorControl.pitch += 5; vectorControl.yaw += 2;
      engineState.status = "armed";
}
function checkSystems(fuel: number, engines: boolean, ready: boolean): boolean {
      return fuel >= 80 && engines && ready;
}
function configureNavigation(): void {
      const navigationMatrix = [ [1.0, 0.0, 0.0], [0.0, 0.9848, -0.1736], [0.0, 0.1736, 0.9848] ];
      const trajectoryVector = { x: 3400, y: 0, z: 18000 };
      const guidanceComputer = { aligned: true, mode: "inertial", calibrationTime: Date.now() };
      Math.random(); navigationMatrix[1][1] *= 1.0001; trajectoryVector.z += 1; guidanceComputer.mode = "launch";
}

function armEngines(): void {
      const engineState = { status: "idle", safetyLatch: true, preIgnited: false };
      engineState.safetyLatch = false; engineState.preIgnited = true;
      const vectorControl = { pitch: 0, yaw: 0, roll: 0 }; vectorControl.pitch += 5; vectorControl.yaw += 2;
      engineState.status = "armed";
}

rocket.launch = function(): void {
      if (!checkSystems(this.fuel, this.engines, this.ready)) return;
      configureNavigation(); stabilizeFuelFlow(); armEngines(); initiateSequence();
};\n`;

  //gets typed in real time
  const dynamicCode = `function start(): void {\n      rocket.launch();\n}\n\nstart();`;

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
    return 50;
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

      // Generate smoke plumes during flight
      const currentTime = performance.now();
      if (currentTime - lastPlumeTime > 40 && plumeCreationCount < maxPlumes) { // 80ms interval
        const id = smokePlumeId.current++;
        const side = (Math.random() > 0.5) ? 1 : -1;
        const style = {
            position: 'absolute',
            bottom: `${30 + position}px`, // Use current position
            left: '70%',
            width: `${100 + Math.random() * 100}px`,
            height: `${100 + Math.random() * 100}px`,
            background: 'radial-gradient(circle, rgba(228, 170, 255, 0.16) 0%, rgba(192, 144, 232, 0.15) 70%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
            transform: `translateX(-50%)`,
            animation: `smoke-fall-${side === 1 ? 'right' : 'left'} ${2 + Math.random() * 1}s ease-out forwards`,
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
          left: '23%',
          transform: 'translateX(0%)',
          width: '60%',
          height: '500px',
          background: 'transparent',
          padding: '20px',
          boxSizing: 'border-box',
          overflow: 'hidden', 
          zIndex: 10,
          pointerEvents: 'none',
          textAlign: 'left',
          perspective: '400px' // delete to remove 3D effect like in starwars
        }}
      >
        <div style={{
          color: '#ffffff',
          fontSize: '18px',
          lineHeight: '1.5',
          whiteSpace: 'pre-wrap',
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          transform: 'rotateX(25deg)', // delete to remove 3D effect like in starwars
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
          left: '70%',
          transform: `translateX(-50%) translateY(-${rocketPosition}px) rotate(${Math.sin(rocketPosition * 0.02) * 2}deg)`,
          width: '80px',
          height: '200px',
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
          width: '40px',
          height: '120px',
          background: 'linear-gradient(to right, #e8e8e8, #ffffff, #d0d0d0)',
          borderRadius: '20px 20px 8px 8px',
          boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.1)'
        }} />
        
        {/* Upper Stage */}
        <div style={{
          position: 'absolute',
          bottom: '140px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '32px',
          height: '40px',
          background: 'linear-gradient(to right, #f0f0f0, #ffffff, #e0e0e0)',
          borderRadius: '16px 16px 4px 4px',
          boxShadow: 'inset -2px 0 6px rgba(0,0,0,0.1)'
        }} />
        
        {/* Nose Cone */}
        <div style={{
          position: 'absolute',
          bottom: '171px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '16px solid transparent',
          borderRight: '16px solid transparent',
         // borderBottom: '20px solid #ff4757',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
        }} />
        
        {/* Command Module Window */}
        <div style={{
          position: 'absolute',
          bottom: '155px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '12px',
          height: '12px',
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
          width: '38px',
          height: '4px',
          background: '#57606f',
          borderRadius: '2px'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '85px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '38px',
          height: '4px',
          background: '#57606f',
          borderRadius: '2px'
        }} />
        
        {/* Side Boosters */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '-8px',
          width: '16px',
          height: '100px',
          background: 'linear-gradient(to right, #ddd, #fff, #ccc)',
          borderRadius: '8px 8px 4px 4px',
          boxShadow: 'inset -1px 0 4px rgba(0,0,0,0.1)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '30px',
          right: '-8px',
          width: '16px',
          height: '100px',
          background: 'linear-gradient(to right, #ddd, #fff, #ccc)',
          borderRadius: '8px 8px 4px 4px',
          boxShadow: 'inset -1px 0 4px rgba(0,0,0,0.1)'
        }} />
        
        {/* Landing Legs */}
        <div style={{
          position: 'absolute',
          bottom: '25px',
          left: '8px',
          width: '0',
          height: '0',
          borderTop: '25px solid #2c2c54',
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '25px',
          right: '8px',
          width: '0',
          height: '0',
          borderTop: '25px solid #2c2c54',
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent'
        }} />
        
        {/* Engine Nozzles */}
        <div style={{
          position: 'absolute',
          bottom: '15px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '18px',
          height: '15px',
          background: 'linear-gradient(to bottom, #57606f, #2c2c54)',
          borderRadius: '9px 9px 3px 3px'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '6px',
          width: '8px',
          height: '10px',
          background: 'linear-gradient(to bottom, #57606f, #2c2c54)',
          borderRadius: '4px 4px 2px 2px'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '6px',
          width: '8px',
          height: '10px',
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
              right: '6px',
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
            transform: translateX(-250%) scale(3.5) translateY(300px);
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