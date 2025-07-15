"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture, Decal } from "@react-three/drei";
import * as THREE from "three";

interface TechBallProps {
  imgUrl: string;
  color?: string;
  size?: number;
  multiSide?: boolean;
}

const BallMesh: React.FC<TechBallProps> = ({ imgUrl, color = "#ffffff", multiSide }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const texture = useTexture(imgUrl);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.000;
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <icosahedronGeometry args={[1, 20]} />
      <meshStandardMaterial
        color={color}
        flatShading
        polygonOffset
        polygonOffsetFactor={-5}
      />
      {texture && (
        multiSide
          ? (
              [
                { pos: [0, 0, 1], rot: [0, 0, 0] },   // front
                { pos: [0, 0, -1], rot: [0, Math.PI, 0] }, // back
                { pos: [1, 0, 0], rot: [0, -Math.PI / 2, 0] }, // right
                { pos: [-1, 0, 0], rot: [0, Math.PI / 2, 0] }, // left
                { pos: [0, 1, 0], rot: [-Math.PI / 2, 0, 0] }, // top
                { pos: [0, -1, 0], rot: [Math.PI / 2, 0, 0] }  // bottom
              ].map((cfg, idx) => (
                <Decal
                  key={idx}
                  position={cfg.pos as [number, number, number]}
                  rotation={cfg.rot as [number, number, number]}
                  scale={1.2}
                  map={texture}
                  depthTest={false}
                />
              ))
            )
          : (
              <Decal
                position={[0, 0, 1]}
                rotation={[0, 0, 0]}
                scale={1.2}
                map={texture}
                depthTest={false}
              />
            )
      )}
    </mesh>
  );
};

const TechBall: React.FC<TechBallProps> = ({ size = 140, ...rest }) => {
  return (
    <div style={{ width: size, height: size }}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 3], fov: 45 }}
        shadows
      >
        <ambientLight intensity={0.7} />
        <directionalLight intensity={1} position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <BallMesh {...rest} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default TechBall; 