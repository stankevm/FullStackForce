"use client";

import React, { useState, useEffect, useRef } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  opacity: number;
}

type MotionParams = {
  initialVelocity: number;
  baseAcceleration: number;
  accelerationGrowthRate: number;
  timeStep: number;
};

interface RocketLaunchAnimationProps {
  launchTriggered?: boolean;
  onLaunchComplete?: () => void;
  buildProgress?: number; // 0 to 1, controls how much of the rocket is built
  width?: string;
  height?: string;
}

const RocketLaunchAnimation: React.FC<RocketLaunchAnimationProps> = ({ 
  launchTriggered = false, 
  onLaunchComplete = () => {},
  buildProgress = 1,
  width = "100%",
  height = "100vh",
}) => {
  const [mounted, setMounted] = useState(false);
  const [launchInitiated, setLaunchInitiated] = useState(false);
  const [rocketPosition, setRocketPosition] = useState(0);
  const [showFlame, setShowFlame] = useState(false);
  const [smokePlumes, setSmokePlumes] = useState<any[]>([]);
  // responsive rocket base transform and start position
  const [rocketBaseScale, setRocketBaseScale] = useState(0.7);
  const [rocketStartBottomPct, setRocketStartBottomPct] = useState(-11.5);
  const [rocketStartRightPct, setRocketStartRightPct] = useState(5);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [motionParams, setMotionParams] = useState<MotionParams>({
    initialVelocity: 0,
    baseAcceleration: 0.0007,
    accelerationGrowthRate: 0.0055,
    timeStep: 0.016,
  });

  // horizontal factor for trajectory; 0 on small screens for straight-up flight
  const horizontalFactor = isSmallScreen ? 0 : 0.35;
  
  const animationRef = useRef<number | null>(null);
  const rocketRef = useRef<HTMLDivElement | null>(null);
  const rocketInnerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainNozzleRef = useRef<HTMLDivElement | null>(null);
  const smokePlumeId = useRef(0);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && launchTriggered && !launchInitiated) {
      setLaunchInitiated(true);
      // Add a small delay to sync with the code typing "start()" completion if needed, 
      // or just start immediately. The previous code had a 500ms delay.
      setTimeout(() => {
        startLaunchSequence();
      }, 500);
    }
  }, [mounted, launchTriggered, launchInitiated]);

  // Update rocket base scale and starting position based on viewport width
  useEffect(() => {
    if (!mounted) return;
    
    const applyResponsiveRocket = () => {
      const width = window.innerWidth;
      setIsSmallScreen(width <= 480);
      if (width <= 480) {
        setRocketBaseScale(0.4);
        setRocketStartBottomPct(32);
        setRocketStartRightPct(4);
        setMotionParams({
          initialVelocity: 0,
          baseAcceleration: 0.0002,
          accelerationGrowthRate: 0.0052,
          timeStep: 0.001,
        });
      } else if (width <= 768) {
        setRocketBaseScale(0.6);
        setRocketStartBottomPct(38);
        setRocketStartRightPct(4);
        setMotionParams({
          initialVelocity: 0,
          baseAcceleration: 0.0005,
          accelerationGrowthRate: 0.0052,
          timeStep: 0.016,
        });
      } else {
        setRocketBaseScale(0.7);
        setRocketStartBottomPct(35);
        setRocketStartRightPct(5);
        setMotionParams({
          initialVelocity: 0,
          baseAcceleration: 0.0007,
          accelerationGrowthRate: 0.0055,
          timeStep: 0.016,
        });
      }
    };
    applyResponsiveRocket();
    window.addEventListener('resize', applyResponsiveRocket);
    return () => window.removeEventListener('resize', applyResponsiveRocket);
  }, []);

  const startLaunchSequence = () => {
    setShowFlame(true);
    // Wait 1 second with flames on before rocket starts moving
    setTimeout(() => {
      animateRocket();
    }, 200);
  };

  const animateRocket = () => {
    let position = 0;
    let velocity = motionParams.initialVelocity;
    let time = 0;
    let plumeCreationCount = 0;
    const maxPlumes = window.innerWidth > 768 ? 80 : 100;
    let lastPlumeTime = 0;
    let previousXPos = 0;

    const animate = () => {
      time += motionParams.timeStep; // Approximate frame time at 60fps
      
      // Gradual acceleration that starts slow and increases over time
      const acceleration = motionParams.baseAcceleration + (time * motionParams.accelerationGrowthRate); // Starts smaller, increases gradually
      
      velocity += acceleration;
      position += velocity;

      // Calculate turn progress
      const rotationStart = isSmallScreen ? 0 : 150; // Start turning earlier
      const rotationRamp = isSmallScreen ? 400 : 2000; // Much longer ramp - keep turning
      const turnEnd = rotationStart + rotationRamp;
      
      // Phase 1: Before turn (vertical flight)
      // Phase 2: During turn (accelerating horizontally with smoothstep)  
      // Phase 3: After turn (constant horizontal velocity)
      
      let xPos = 0;
      if (position <= rotationStart) {
        xPos = 0; // No horizontal movement yet
      } else if (position <= turnEnd) {
        const rawTilt = (position - rotationStart) / rotationRamp;
        const smoothTurn = rawTilt * rawTilt * (3 - 2 * rawTilt);
        xPos = -position * horizontalFactor * smoothTurn;
      } else {
        // After turn: constant horizontal velocity
        const turnEndXPos = -turnEnd * horizontalFactor * 1; // smoothTurn(1) = 1
        const distanceAfterTurn = position - turnEnd;
        xPos = turnEndXPos - distanceAfterTurn * horizontalFactor;
      }
      
      // Same for future position
      const futurePosition = position + 30;
      let futureXPos = 0;
      if (futurePosition <= rotationStart) {
        futureXPos = 0;
      } else if (futurePosition <= turnEnd) {
        const rawFutureTilt = (futurePosition - rotationStart) / rotationRamp;
        const futureSmoothTurn = rawFutureTilt * rawFutureTilt * (3 - 2 * rawFutureTilt);
        futureXPos = -futurePosition * horizontalFactor * futureSmoothTurn;
      } else {
        const turnEndXPos = -turnEnd * horizontalFactor * 1;
        const distanceAfterTurn = futurePosition - turnEnd;
        futureXPos = turnEndXPos - distanceAfterTurn * horizontalFactor;
      }
      
      const deltaX = futureXPos - xPos;
      const deltaY = -30; // lookAhead distance
      const dynamicAngle = isSmallScreen ? 0 : Math.atan2(deltaX, -deltaY) * 180 / Math.PI;
      
      previousXPos = xPos;

      // Directly update DOM instead of React state for better performance
      // Separate positioning from rotation for natural movement
      if (rocketRef.current) {
        rocketRef.current.style.transform = `translateX(-50%) translateX(${xPos}px) translateY(-${position}px)`;
      }
      if (rocketInnerRef.current) {
        rocketInnerRef.current.style.transform = `rotate(${dynamicAngle}deg) scale(${rocketBaseScale})`;
      }

      const currentTime = performance.now();
      
      if (currentTime - lastPlumeTime > 80 && plumeCreationCount < maxPlumes) { // 80ms interval (less frequent)
        const id = smokePlumeId.current++;
        const side = (Math.random() > 0.5) ? 1 : -1;
        const containerRect = containerRef.current?.getBoundingClientRect();
        const rocketRect = rocketRef.current?.getBoundingClientRect();
        const nozzleRect = mainNozzleRef.current?.getBoundingClientRect();

        let nozzleX = 0;
        let nozzleY = 0;
        if (containerRect) {
          if (nozzleRect) {
            nozzleX = nozzleRect.left + nozzleRect.width / 2 - containerRect.left;
            nozzleY = nozzleRect.bottom - containerRect.top;
          } else if (rocketRect) {
            nozzleX = rocketRect.left + rocketRect.width / 2 - containerRect.left;
            nozzleY = rocketRect.bottom - containerRect.top;
          }
        }

        const wrapperStyle = {
          position: 'absolute' as const,
          left: `${nozzleX}px`,
          top: `${nozzleY}px`,
          transform: `rotate(${dynamicAngle}deg)`,
          transformOrigin: 'top center',
          zIndex: 145
        };

        const childStyle = {
          width: `${(isSmallScreen ? 40 : 100) + Math.random() * (isSmallScreen ? 40 : 100)}px`,
          height: `${(isSmallScreen ? 40 : 100) + Math.random() * (isSmallScreen ? 40 : 100)}px`,
          background: isSmallScreen
            ? 'radial-gradient(circle, rgba(124, 58, 237, 0.43) 0%, rgba(187, 155, 227, 0.31) 70%)'
            : 'radial-gradient(circle, rgba(124, 58, 237, 0.14) 0%, rgba(187, 155, 227, 0.13) 70%)',
          borderRadius: '50%',
          filter: isSmallScreen ? 'blur(12px)' : 'blur(20px)',
          animation: `smoke-drift-${side === 1 ? 'right' : 'left'} ${3 + Math.random() * 1}s ease-out forwards`
        } as React.CSSProperties;

        setSmokePlumes((prev: any[]) => [...prev, { id, wrapperStyle, childStyle }]);

        setTimeout(() => {
            setSmokePlumes((prev: any[]) => prev.filter(p => p.id !== id));
        }, 6000);

        lastPlumeTime = currentTime;
        plumeCreationCount++;
      }

      if (position < window.innerHeight + 250) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onLaunchComplete();
      }
    };

    animate();
  };

  // Calculate opacity for each rocket part based on build progress
  const getPartOpacity = (startProgress: number, endProgress: number) => {
    if (buildProgress < startProgress) return 0;
    if (buildProgress >= endProgress) return 1;
    return (buildProgress - startProgress) / (endProgress - startProgress);
  };

  return (
    <div 
      ref={containerRef}
      style={{ 
        width, 
        height, 
        position: 'relative',
        background: 'transparent',
        fontFamily: 'Courier New, monospace',
        overflow: 'visible',
      }}
    >
      {mounted && (
        <>
          {/* Rocket */}
          <div
            ref={rocketRef}
            style={{
              position: 'absolute',
              bottom: `${rocketStartBottomPct}%`,
              left: isSmallScreen ? '50%' : undefined,
              right: isSmallScreen ? undefined : `${rocketStartRightPct}%`,
              transform: `translateX(-50%) translateX(0px) translateY(0px)`,
              width: '60px',
              height: '350px',
              willChange: 'transform',
              zIndex: 150
            }}
          >
        <div
          ref={rocketInnerRef}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transform: `rotate(0deg) scale(${rocketBaseScale})`,
            transformOrigin: 'center center',
            willChange: 'transform'
          }}
        >
        {/* Main Rocket Body */}
        <div style={{
          position: 'absolute',
          bottom: '95px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '30px',
          height: '180px',
          background: 'linear-gradient(to right, #909090, #b0b0b0, #808080)',
          borderRadius: '15px 15px 6px 6px',
          boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.1)',
          opacity: getPartOpacity(0, 0.2),
          transition: 'opacity 0.3s ease-out'
        }} />
        
        {/* Upper Stage */}
        <div style={{
          position: 'absolute',
          bottom: '265px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '24px',
          height: '45px',
          background: 'linear-gradient(to right, #a0a0a0, #b8b8b8, #989898)',
          borderRadius: '12px 12px 4px 4px',
          boxShadow: 'inset -2px 0 6px rgba(0,0,0,0.1)',
          opacity: getPartOpacity(0.5, 0.7),
          transition: 'opacity 0.3s ease-out'
        }} />
        
        {/* Command Module Window */}
        <div style={{
          position: 'absolute',
          bottom: '280px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '10px',
          height: '10px',
          background: 'radial-gradient(circle,rgb(183, 112, 255),rgb(74, 28, 138))',
          borderRadius: '50%',
          border: '1px solid #2f3542',
          boxShadow: 'inset 1px 1px 3px rgba(255,255,255,0.5)',
          opacity: getPartOpacity(0.7, 0.85),
          transition: 'opacity 0.3s ease-out'
        }} />
        
        {/* Service Module Details */}
        <div style={{
          position: 'absolute',
          bottom: '165px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '28px',
          height: '4px',
          background: '#57606f',
          borderRadius: '2px',
          opacity: getPartOpacity(0.35, 0.5),
          transition: 'opacity 0.3s ease-out'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '150px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '28px',
          height: '4px',
          background: '#57606f',
          borderRadius: '2px',
          opacity: getPartOpacity(0.35, 0.5),
          transition: 'opacity 0.3s ease-out'
        }} />
        
        {/* Side Boosters */}
        <div style={{
          position: 'absolute',
          bottom: '95px',
          left: '1px',
          width: '12px',
          height: '140px',
          background: 'linear-gradient(to right, #888888, #a0a0a0, #787878)',
          borderRadius: '6px 6px 3px 3px',
          boxShadow: 'inset -1px 0 4px rgba(0,0,0,0.1)',
          opacity: getPartOpacity(0.2, 0.35),
          transition: 'opacity 0.3s ease-out'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '95px',
          right: '1px',
          width: '12px',
          height: '140px',
          background: 'linear-gradient(to right, #888888, #a0a0a0, #787878)',
          borderRadius: '6px 6px 3px 3px',
          boxShadow: 'inset -1px 0 4px rgba(0,0,0,0.1)',
          opacity: getPartOpacity(0.2, 0.35),
          transition: 'opacity 0.3s ease-out'
        }} />
        
        {/* Engine Nozzles */}
        <div ref={mainNozzleRef} style={{
          position: 'absolute',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '14px',
          height: '12px',
          background: 'linear-gradient(to bottom, #57606f, #2c2c54)',
          borderRadius: '9px 9px 3px 3px',
          opacity: getPartOpacity(0.85, 1),
          transition: 'opacity 0.3s ease-out'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '85px',
          left: '3px',
          width: '6px',
          height: '8px',
          background: 'linear-gradient(to bottom, #57606f, #2c2c54)',
          borderRadius: '4px 4px 2px 2px',
          opacity: getPartOpacity(0.85, 1),
          transition: 'opacity 0.3s ease-out'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '85px',
          right: '3px',
          width: '6px',
          height: '8px',
          background: 'linear-gradient(to bottom, #57606f, #2c2c54)',
          borderRadius: '4px 4px 2px 2px',
          opacity: getPartOpacity(0.85, 1),
          transition: 'opacity 0.3s ease-out'
        }} />
        
        {/* Main Engine Flame */}
        {showFlame && (
          <div style={{
            position: 'absolute',
            bottom: '68px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '16px',
            height: '25px',
            background: 'linear-gradient(to bottom,rgb(136, 66, 174),rgb(164, 105, 196),rgb(198, 171, 215))',
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
              bottom: '73px',
              left: '6px',
              width: '8px',
              height: '15px',
              background: 'linear-gradient(to bottom,rgb(136, 66, 174),rgb(164, 105, 196),rgb(198, 171, 215))',
              borderRadius: '0 0 50% 50%',
              animation: 'flicker 0.1s infinite alternate',
              filter: 'blur(0.3px)'
            }} />
            <div style={{
              position: 'absolute',
              bottom: '73px',
              right: '-2px',
              width: '8px',
              height: '15px',
              background: 'linear-gradient(to bottom,rgb(136, 66, 174),rgb(164, 105, 196),rgb(198, 171, 215))',
              borderRadius: '0 0 50% 50%',
              animation: 'flicker 0.09s infinite alternate',
              filter: 'blur(0.3px)'
            }} />
          </>
        )}
        </div>
      </div>
      </>
    )}
      
      {mounted && smokePlumes.map(plume => (
        <div key={plume.id} style={plume.wrapperStyle}>
          <div style={plume.childStyle} />
        </div>
      ))}

      <style jsx>{`
        @keyframes flicker {
          0% { transform: translateX(-50%) scaleY(1); }
          100% { transform: translateX(-50%) scaleY(1.2); }
        }
        
        @keyframes smoke-drift-left {
          from { transform: translate(-50%, 0) scale(0.2); opacity: 1; }
          to { transform: translate(-200%, 250px) scale(3.2); opacity: 0; }
        }
        @keyframes smoke-drift-right {
          from { transform: translate(-50%, 0) scale(0.2); opacity: 1; }
          to { transform: translate(80%, 250px) scale(3.2); opacity: 0; }
        }
      `}</style>
      
    </div>
  );
};

export default RocketLaunchAnimation;