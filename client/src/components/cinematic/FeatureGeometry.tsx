"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { gsap, registerGsap, usePrefersReducedMotion } from "@/lib/motion";

function Rig() {
  const group = useRef<THREE.Group>(null);
  const scrollProxy = useRef({ t: 0 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    if (reduced) return;
    const tween = gsap.to(scrollProxy.current, {
      t: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "#features",
        start: "top bottom",
        end: "bottom top",
          scrub: 1.15,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  useFrame((state) => {
    if (!group.current) return;
    const t = scrollProxy.current.t;
    group.current.rotation.y = t * Math.PI * 1.2 + state.pointer.x * 0.4;
    group.current.rotation.x = 0.35 + state.pointer.y * 0.25 + t * 0.4;
  });

  return (
    <group ref={group}>
      <mesh>
        <torusKnotGeometry args={[0.85, 0.22, 128, 16]} />
        <meshBasicMaterial color="#c8f542" wireframe transparent opacity={0.4} />
      </mesh>
      <mesh scale={1.35}>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshBasicMaterial color="#6d7668" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export function FeatureGeometry() {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return (
      <div className="flex h-full items-center justify-center font-mono text-xs text-ink-subtle">
        GEO // REDUCED
      </div>
    );
  }

  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Rig />
    </Canvas>
  );
}
