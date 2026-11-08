"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { colors } from "@/config/theme";
import { heroState, LAYERS } from "./progress";

const W = 3.2;
const D = 2.2;
const T = 0.09;
const GAP_CLOSED = 0.34;
const GAP_OPEN = 0.82;

const smooth = (a: number, b: number, t: number) => {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return x * x * (3 - 2 * x);
};

/** Deterministic pseudo-random so server/client and reloads match. */
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function Plate({ index, lite }: { index: number; lite: boolean }) {
  const group = useRef<THREE.Group>(null);
  const isAccent = index === 1; // API layer gets the accent tint

  const nodes = useMemo(() => {
    const n = lite ? 4 : 7;
    return Array.from({ length: n }, (_, i) => [
      (rand(index * 13 + i) - 0.5) * (W - 0.6),
      T / 2 + 0.035,
      (rand(index * 31 + i * 7) - 0.5) * (D - 0.6),
    ] as [number, number, number]);
  }, [index, lite]);

  // Thin "module" blocks on each plate — the components living in that layer.
  const modules = useMemo(() => {
    const n = lite ? 2 : 4;
    return Array.from({ length: n }, (_, i) => ({
      pos: [(rand(index * 7 + i * 3) - 0.5) * (W - 1.1), T / 2 + 0.06, (rand(index * 5 + i * 11) - 0.5) * (D - 0.9)] as [number, number, number],
      size: [0.45 + rand(i + index) * 0.5, 0.08, 0.3 + rand(i * 2 + index) * 0.35] as [number, number, number],
    }));
  }, [index, lite]);

  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(W, T, D)), []);
  const frame = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(W + 0.24, 0.001, D + 0.24)), []);
  useEffect(() => () => { edges.dispose(); frame.dispose(); }, [edges, frame]);

  useFrame(() => {
    const g = group.current;
    if (!g) return;
    const p = heroState.progress;
    const open = smooth(0.05, 0.55, p);
    const gap = GAP_CLOSED + (GAP_OPEN - GAP_CLOSED) * open;
    const centre = (LAYERS.length - 1) / 2;
    const targetY = (centre - index) * gap;
    g.position.y += (targetY - g.position.y) * 0.12;
    // Layers fan out slightly in x/z as they separate — reveals internal composition
    const fan = (index - centre) * 0.18 * open;
    g.position.x += (fan - g.position.x) * 0.12;
    g.rotation.y += ((index - centre) * 0.06 * open - g.rotation.y) * 0.1;
  });

  return (
    <group ref={group}>
      <mesh castShadow={!lite} receiveShadow={!lite}>
        <boxGeometry args={[W, T, D]} />
        <meshPhysicalMaterial
          color={isAccent ? colors.accentSoft : colors.surface}
          emissive={isAccent ? colors.accentSoft : colors.paper}
          emissiveIntensity={0.55}
          roughness={0.4}
          metalness={0}
          clearcoat={lite ? 0 : 0.5}
          transparent
          opacity={0.82}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={isAccent ? colors.accent : colors.ink} transparent opacity={isAccent ? 0.9 : 0.35} />
      </lineSegments>
      <lineSegments geometry={frame} position={[0, -T / 2 - 0.02, 0]}>
        <lineBasicMaterial color={colors.muted} transparent opacity={0.25} />
      </lineSegments>
      {modules.map((m, i) => (
        <mesh key={i} position={m.pos}>
          <boxGeometry args={m.size} />
          <meshStandardMaterial color={i === 0 && isAccent ? colors.accent : colors.surface} emissive={colors.paper} emissiveIntensity={i === 0 && isAccent ? 0 : 0.35} roughness={0.6} />
        </mesh>
      ))}
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color={i % 3 === 0 ? colors.accent : colors.ink} />
        </mesh>
      ))}
    </group>
  );
}

/** Vertical "request" lines with a pulse travelling down the stack. */
function DataFlow({ lite }: { lite: boolean }) {
  const pulses = useRef<THREE.Mesh[]>([]);
  const lines = useRef<THREE.Group>(null);
  const columns = useMemo(() => (lite ? [[-0.9, 0.4], [1.0, -0.5]] : [[-0.9, 0.4], [1.0, -0.5], [0.1, 0.7], [-0.3, -0.6]]) as [number, number][], [lite]);

  useFrame(({ clock }) => {
    const p = heroState.progress;
    const open = smooth(0.05, 0.55, p);
    const span = (LAYERS.length - 1) * (GAP_CLOSED + (GAP_OPEN - GAP_CLOSED) * open);
    if (lines.current) lines.current.scale.y = span / 2 + 0.2;
    pulses.current.forEach((m, i) => {
      if (!m) return;
      const t = (clock.elapsedTime * 0.35 + i * 0.27) % 1;
      m.position.y = span / 2 - t * span;
    });
  });

  return (
    <group>
      <group ref={lines}>
        {columns.map(([x, z], i) => (
          <mesh key={i} position={[x, 0, z]}>
            <cylinderGeometry args={[0.006, 0.006, 2, 4]} />
            <meshBasicMaterial color={colors.accent} transparent opacity={0.45} />
          </mesh>
        ))}
      </group>
      {columns.map(([x, z], i) => (
        <mesh key={i} position={[x, 0, z]} ref={(el) => { if (el) pulses.current[i] = el; }}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={colors.accent} />
        </mesh>
      ))}
    </group>
  );
}

function Rig() {
  const { camera, size } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);
  const cam = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ pointer }) => {
    const p = heroState.progress;
    const portrait = size.width < size.height;
    const dist = portrait ? 12.5 : 9.4;
    // Camera swings from a high isometric view to eye level, passing between the
    // separated layers, then settles low as the section hands over to the next.
    const swing = smooth(0.1, 0.7, p);
    const settle = smooth(0.7, 1, p);
    cam.set(
      5.2 - swing * 2.2 + pointer.x * 0.35,
      3.6 - swing * 3.4 - settle * 0.8 + pointer.y * 0.25,
      dist - swing * 1.4 + settle * 0.6,
    );
    camera.position.lerp(cam, 0.08);
    target.set(0, -swing * 0.3, 0);
    camera.lookAt(target);
  });

  return null;
}

function Stack({ lite }: { lite: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const p = heroState.progress;
    ref.current.rotation.y += (-0.55 + p * 1.1 + Math.sin(clock.elapsedTime * 0.2) * 0.03 - ref.current.rotation.y) * 0.06;
  });
  return (
    <group ref={ref}>
      {LAYERS.map((l, i) => <Plate key={l.id} index={i} lite={lite} />)}
      <DataFlow lite={lite} />
    </group>
  );
}

export default function StackScene({ lite, onContextLost }: { lite: boolean; onContextLost: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const frameloop = useFrameloop(wrap);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        frameloop={frameloop}
        dpr={lite ? [1, 1.25] : [1, 1.75]}
        shadows={!lite}
        camera={{ position: [5.2, 3.6, 8.6], fov: 32, near: 0.1, far: 60 }}
        gl={{ antialias: !lite, alpha: true, powerPreference: lite ? "low-power" : "high-performance" }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (e) => { e.preventDefault(); onContextLost(); }, { once: true });
        }}
        aria-hidden
      >
        <ambientLight intensity={1.15} />
        <directionalLight position={[4, 8, 5]} intensity={1.4} castShadow={!lite} shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-5, 2, -3]} intensity={0.4} color={colors.accentSoft} />
        <Rig />
        <Stack lite={lite} />
        {!lite && (
          <mesh rotation-x={-Math.PI / 2} position={[0, -3.4, 0]} receiveShadow>
            <planeGeometry args={[30, 30]} />
            <shadowMaterial opacity={0.05} />
          </mesh>
        )}
      </Canvas>
    </div>
  );
}

/** Pause rendering entirely when the canvas is off-screen or the tab is hidden. */
function useFrameloop(ref: React.RefObject<HTMLDivElement | null>) {
  const [loop, setLoop] = useState<"always" | "never">("always");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let visible = true;
    const update = () => setLoop(visible && !document.hidden ? "always" : "never");
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; update(); }, { rootMargin: "100px" });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, [ref]);
  return loop;
}
