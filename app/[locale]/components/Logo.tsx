import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

function Logo3D() {
  const texture = useLoader(THREE.TextureLoader, "/images/Logo-16.svg");
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ mouse }) => {
    if (meshRef.current) {
      // Hace que el logo gire ligeramente basado en la posición del mouse
      meshRef.current.rotation.y = mouse.x * 0.3;
      meshRef.current.rotation.x = mouse.y * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.2}>
      <planeGeometry args={[4, 4]} />
      <meshStandardMaterial map={texture} transparent />
    </mesh>
  );
}

export default function Logo() {
  return (
    <div className="hover:scale-105 transition-transform duration-300">
      <Canvas
        style={{ width: "320px", height: "320px" }}
        camera={{ position: [0, 0, 5] }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <Logo3D />
      </Canvas>
    </div>
  );
}
