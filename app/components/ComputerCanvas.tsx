"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

interface ComputerModelProps {
  isMobile: boolean;
}

const ComputerModel: React.FC<ComputerModelProps> = ({ isMobile }) => {
  const computer = useGLTF("/desktop_pc/scene.gltf") as any;

  return (
    <mesh>
      {/* Global ambient light for the whole model */}
      <ambientLight intensity={0.8} />
      {/* Soft sky-ground light */}
      <hemisphereLight intensity={0.5} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -1.5, -2.2] : [0, -1, -1.5]}
        rotation={[-0.005, -0.7, -0.13]}
      />
    </mesh>
  );
};

const ComputerCanvas: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 28 }}
      gl={{ preserveDrawingBuffer: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ComputerModel isMobile={isMobile} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default ComputerCanvas; 