"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/motion";

function Lattice() {
  const group = useRef<THREE.Group>(null);
  const reduced = usePrefersReducedMotion();

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.35, 1);
    return geo;
  }, []);

  useFrame((state) => {
    if (!group.current || reduced) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.x = t * 0.08;
    group.current.rotation.y = t * 0.12;
    group.current.position.x = state.pointer.x * 0.35;
    group.current.position.y = state.pointer.y * 0.2;
  });

  return (
    <group ref={group}>
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#c8f542" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh scale={0.55}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#a8b0a0" wireframe transparent opacity={0.25} />
      </mesh>
      <points>
        <icosahedronGeometry args={[1.8, 2]} />
        <pointsMaterial color="#c8f542" size={0.018} sizeAttenuation transparent opacity={0.55} />
      </points>
    </group>
  );
}

export function HeroGeometry() {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;

  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Lattice />
    </Canvas>
  );
}
