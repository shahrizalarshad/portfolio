"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { motionState } from "@/lib/motion";
import { screens, SCREEN_FONT, type Screen } from "./screens";

const DEPTH = 0.07; // tebal setiap panel
const INSET = 0.06; // jarak skrin dari tepi panel, supaya bucu bulat tak terpotong

function Panel({ screen }: { screen: Screen }) {
  const [w, h] = screen.size;

  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = screen.px[0];
    canvas.height = screen.px[1];
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    return t;
  }, [screen]);

  useEffect(() => {
    const canvas = texture.image as HTMLCanvasElement;
    const paint = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      screen.draw(ctx, canvas.width, canvas.height);
      texture.needsUpdate = true;
    };
    paint();
    // lukis semula bila font dah siap load, kalau tak teks guna font default
    document.fonts.load(SCREEN_FONT).then(paint).catch(() => {});
    return () => texture.dispose();
  }, [screen, texture]);

  return (
    <>
      <RoundedBox args={[w, h, DEPTH]} radius={0.035} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color={screen.dark ? "#000000" : "#ffffff"} roughness={0.6} />
      </RoundedBox>
      <mesh position={[0, 0, DEPTH / 2 + 0.002]} receiveShadow>
        <planeGeometry args={[w - INSET * 2, h - INSET * 2]} />
        <meshStandardMaterial map={texture} roughness={0.6} />
      </mesh>
    </>
  );
}

function Layers() {
  const group = useRef<THREE.Group>(null!);
  const panels = useRef<(THREE.Group | null)[]>([]);
  const pointer = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const { assemble, explode } = motionState;
    const t = state.clock.elapsedTime;

    screens.forEach((s, i) => {
      const p = panels.current[i];
      if (!p) return;
      const [x, y, z] = s.pos;
      // setiap panel masuk lewat sikit daripada yang sebelum
      const local = THREE.MathUtils.clamp(assemble * 1.75 - i * 0.25, 0, 1);
      const e = 1 - Math.pow(1 - local, 3);
      const float = Math.sin(t * 0.7 + i * 1.7) * 0.035;
      // masa scroll: lapisan terpisah ke depan dan ke belakang
      const tx = x * (1 + explode * 0.3);
      const ty = y * (1 + explode * 0.3) + float;
      const tz = z * (1 + explode * 3.2);
      p.position.set(tx, ty - (1 - e) * (5 + i), tz - (1 - e) * 3);
      p.rotation.x = (1 - e) * -1.1;
    });

    const g = group.current;
    const wide = viewport.width > 9;
    g.position.x = wide ? viewport.width * 0.22 : -viewport.width * 0.06;
    g.position.y = wide ? viewport.height * 0.15 : viewport.height * 0.2;
    // saiz ikut skrin supaya susunan tak pernah terkeluar
    g.scale.setScalar(Math.min(viewport.height * (wide ? 0.66 : 0.8), viewport.width * (wide ? 0.42 : 0.74)) / 5.6);

    const ry = -0.5 + explode * 0.3 + pointer.current.x * 0.16;
    const rx = 0.14 + pointer.current.y * 0.1;
    const k = 1 - Math.exp(-delta * 4);
    g.rotation.y += (ry - g.rotation.y) * k;
    g.rotation.x += (rx - g.rotation.x) * k;
  });

  return (
    <group ref={group} rotation={[0.14, -0.5, 0]}>
      {screens.map((s, i) => (
        <group
          key={s.key}
          ref={(el) => {
            panels.current[i] = el;
          }}
          position={[s.pos[0], s.pos[1] - 8, s.pos[2]]}
        >
          <Panel screen={s} />
        </group>
      ))}
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas shadows flat dpr={[1, 2]} camera={{ position: [0, 0, 11], fov: 32 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={2.0} />
      <directionalLight
        position={[4, 7, 8]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-radius={8}
        shadow-intensity={0.28}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-6, -2, 4]} intensity={0.4} />
      <Layers />
    </Canvas>
  );
}
