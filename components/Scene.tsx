"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { motionState } from "@/lib/motion";

// Random yang sama setiap kali load, supaya susunan blok tak berubah.
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const GAP = 1.06;
const DARK = new Set([2, 4, 9, 13, 17, 21, 24]); // blok mana yang hitam

function Blocks() {
  const group = useRef<THREE.Group>(null!);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const blocks = useMemo(() => {
    const rand = seeded(7);
    const list = [];
    let i = 0;
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          const home = new THREE.Vector3(x, y, z).multiplyScalar(GAP);
          const dir = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5).normalize();
          list.push({
            home,
            from: dir.multiplyScalar(7 + rand() * 6),
            spin: new THREE.Vector3(rand() * 6 - 3, rand() * 6 - 3, rand() * 6 - 3),
            delay: rand(),
            dark: DARK.has(i),
          });
          i++;
        }
    return list;
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const { assemble, explode } = motionState;

    blocks.forEach((b, i) => {
      const mesh = meshes.current[i];
      if (!mesh) return;
      // setiap blok mula lewat sikit daripada yang lain
      const local = THREE.MathUtils.clamp(assemble * 1.7 - b.delay * 0.7, 0, 1);
      const e = 1 - Math.pow(1 - local, 3);
      target.copy(b.home).multiplyScalar(1 + explode * 0.9);
      mesh.position.lerpVectors(b.from, target, e);
      const loose = 1 - e + explode * 0.12;
      mesh.rotation.set(b.spin.x * loose, b.spin.y * loose, b.spin.z * loose);
    });

    const g = group.current;
    const wide = viewport.width > 9;
    g.position.x = wide ? viewport.width * 0.22 : 0;
    g.position.y = wide ? viewport.height * 0.08 : viewport.height * 0.17;
    // saiz kiub ikut saiz skrin supaya tak pernah terkeluar
    g.scale.setScalar(Math.min(viewport.height * 0.52, viewport.width * (wide ? 0.4 : 0.78)) / 5.2);

    const t = state.clock.elapsedTime;
    const ry = 0.7 + t * 0.07 + explode * Math.PI * 0.6 + pointer.current.x * 0.3;
    const rx = 0.5 + pointer.current.y * 0.18;
    const k = 1 - Math.exp(-delta * 4);
    g.rotation.y += (ry - g.rotation.y) * k;
    g.rotation.x += (rx - g.rotation.x) * k;
  });

  return (
    <group ref={group}>
      {blocks.map((b, i) => (
        <RoundedBox
          key={i}
          ref={(m) => {
            meshes.current[i] = m;
          }}
          args={[1, 1, 1]}
          radius={0.07}
          smoothness={4}
          castShadow
          receiveShadow
          position={b.from}
        >
          <meshStandardMaterial
            color={b.dark ? "#000000" : "#ffffff"}
            roughness={b.dark ? 0.5 : 0.6}
            metalness={0}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      shadows
      flat
      dpr={[1, 2]}
      camera={{ position: [0, 0, 11], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={2.0} />
      <directionalLight
        position={[5, 8, 6]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-6, -2, 4]} intensity={0.4} />
      <Blocks />
    </Canvas>
  );
}
