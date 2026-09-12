"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import * as THREE from "three";

function createEye(x: number) {
  const eye = new THREE.Group();
  eye.position.set(x, 0.25, 0.82);
  const white = new THREE.Mesh(
    new THREE.SphereGeometry(0.17, 24, 24),
    new THREE.MeshStandardMaterial({ color: 0xf4f0da, roughness: 0.25 }),
  );
  white.scale.set(0.86, 1.12, 0.5);
  const pupil = new THREE.Mesh(
    new THREE.SphereGeometry(0.075, 20, 20),
    new THREE.MeshStandardMaterial({ color: 0x07130f, roughness: 0.1 }),
  );
  pupil.position.z = 0.115;
  pupil.name = "pupil";
  eye.add(white, pupil);
  return eye;
}

function ForestWorld(canvas: HTMLCanvasElement) {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x06110e, 0.13);
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0.2, 5.5);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.18;

  scene.add(new THREE.HemisphereLight(0xc6ff7e, 0x07120f, 2.5));
  const rim = new THREE.PointLight(0x91ff58, 28, 12, 1.5);
  rim.position.set(-2.7, 2.6, 2.4);
  scene.add(rim);
  const fill = new THREE.PointLight(0x77a8ff, 18, 10, 1.7);
  fill.position.set(3, -1.2, 2);
  scene.add(fill);

  const creature = new THREE.Group();
  const skin = new THREE.MeshPhysicalMaterial({
    color: 0x8ef15a,
    roughness: 0.42,
    metalness: 0.02,
    clearcoat: 0.45,
    clearcoatRoughness: 0.48,
  });
  const darkSkin = new THREE.MeshStandardMaterial({ color: 0x193b28, roughness: 0.68 });
  const body = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 6), skin);
  body.scale.set(0.96, 1.14, 0.84);
  body.rotation.z = -0.04;
  creature.add(body);

  const earGeometry = new THREE.ConeGeometry(0.3, 1.12, 5, 2);
  const leftEar = new THREE.Mesh(earGeometry, skin);
  leftEar.position.set(-0.74, 0.85, -0.06);
  leftEar.rotation.set(0.08, 0.08, 0.66);
  const rightEar = leftEar.clone();
  rightEar.position.x = 0.74;
  rightEar.rotation.z = -0.66;
  creature.add(leftEar, rightEar);

  const leftEye = createEye(-0.29);
  const rightEye = createEye(0.29);
  creature.add(leftEye, rightEye);
  const smile = new THREE.Mesh(
    new THREE.TubeGeometry(
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(-0.2, -0.17, 0.83),
        new THREE.Vector3(0, -0.31, 0.9),
        new THREE.Vector3(0.2, -0.17, 0.83),
      ),
      18, 0.018, 8, false,
    ),
    darkSkin,
  );
  creature.add(smile);

  const footGeometry = new THREE.SphereGeometry(0.27, 24, 20);
  const leftFoot = new THREE.Mesh(footGeometry, darkSkin);
  leftFoot.scale.set(1.3, 0.48, 1.6);
  leftFoot.position.set(-0.43, -1.05, 0.18);
  const rightFoot = leftFoot.clone();
  rightFoot.position.x = 0.43;
  creature.add(leftFoot, rightFoot);

  const crownMaterial = new THREE.MeshStandardMaterial({
    color: 0xd8ff8a,
    emissive: 0x315f1f,
    emissiveIntensity: 0.4,
    roughness: 0.45,
  });
  [-0.28, 0, 0.29].forEach((x, index) => {
    const sprout = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.48 + index * 0.07, 5), crownMaterial);
    sprout.position.set(x, 1.03 + index * 0.05, 0.1);
    sprout.rotation.z = x * -0.7;
    creature.add(sprout);
  });

  const halo = new THREE.Mesh(
    new THREE.TorusGeometry(1.55, 0.015, 8, 96),
    new THREE.MeshBasicMaterial({ color: 0xb7ff70, transparent: true, opacity: 0.5 }),
  );
  halo.rotation.x = Math.PI / 2.65;
  halo.position.z = -0.35;
  creature.add(halo);
  scene.add(creature);

  const particleCount = 900;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    const radius = 2.1 + Math.random() * 8;
    const angle = Math.random() * Math.PI * 2;
    particlePositions[i * 3] = Math.cos(angle) * radius;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    particlePositions[i * 3 + 2] = Math.sin(angle) * radius - 1.8;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
      color: 0xb8ff75,
      size: 0.018,
      transparent: true,
      opacity: 0.68,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  scene.add(particles);

  const rings = new THREE.Group();
  [1.6, 2.05, 2.6].forEach((radius, index) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.008, 6, 128),
      new THREE.MeshBasicMaterial({ color: 0x79bd55, transparent: true, opacity: 0.2 - index * 0.04 }),
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.3;
    rings.add(ring);
  });
  scene.add(rings);
  return { scene, camera, renderer, creature, halo, particles, rings, leftEye, rightEye };
}

export function Experience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const cursorX = useSpring(mouseX, { stiffness: 320, damping: 28, mass: 0.28 });
  const cursorY = useSpring(mouseY, { stiffness: 320, damping: 28, mass: 0.28 });
  const ringX = useSpring(mouseX, { stiffness: 95, damping: 18, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 95, damping: 18, mass: 0.5 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let world: ReturnType<typeof ForestWorld>;
    try {
      world = ForestWorld(canvas);
    } catch {
      canvas.dataset.failed = "true";
      return;
    }
    const { scene, camera, renderer, creature, halo, particles, rings, leftEye, rightEye } = world;
    const pointer = new THREE.Vector2();
    const targetPointer = new THREE.Vector2();
    const startTime = performance.now();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scroll = 0;
    let frame = 0;

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const onPointerMove = (event: PointerEvent) => {
      targetPointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scroll = max > 0 ? window.scrollY / max : 0;
      setProgress(scroll);
      document.documentElement.style.setProperty("--journey", scroll.toFixed(4));
    };
    const animate = () => {
      const time = (performance.now() - startTime) / 1000;
      pointer.lerp(targetPointer, reducedMotion ? 0 : 0.055);
      creature.rotation.y += (pointer.x * 0.42 + scroll * Math.PI * 1.55 - creature.rotation.y) * 0.035;
      creature.rotation.x += (pointer.y * -0.12 + Math.sin(scroll * Math.PI) * 0.08 - creature.rotation.x) * 0.04;
      creature.position.y = (reducedMotion ? 0 : Math.sin(time * 1.2) * 0.075) - scroll * 0.2;
      creature.position.x = Math.sin(scroll * Math.PI * 3) * 0.35;
      creature.scale.setScalar(0.9 + Math.sin(scroll * Math.PI) * 0.23);
      [leftEye, rightEye].forEach((eye) => {
        const pupil = eye.getObjectByName("pupil");
        if (pupil) { pupil.position.x = pointer.x * 0.035; pupil.position.y = pointer.y * 0.035; }
      });
      halo.rotation.z = time * 0.13 + scroll * Math.PI;
      particles.rotation.y = time * 0.012 + scroll * 0.5;
      particles.position.y = scroll * 1.6;
      rings.rotation.z = time * -0.02;
      camera.position.x += (pointer.x * 0.28 - camera.position.x) * 0.025;
      camera.position.y += (0.18 + pointer.y * 0.12 - camera.position.y) * 0.025;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    resize(); onScroll(); animate();
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry?.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((item) => item.dispose());
          else material?.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const button = document.querySelector<HTMLButtonElement>(".restart");
    const restart = () => window.scrollTo({ top: 0, behavior: "smooth" });
    button?.addEventListener("click", restart);
    return () => button?.removeEventListener("click", restart);
  }, []);

  return (
    <>
      <div className="world" aria-hidden="true">
        <canvas ref={canvasRef} />
        <div className="world-glow" />
        <div className="grain" />
      </div>
      <div className="journey-meter" aria-hidden="true">
        <span>{String(Math.max(1, Math.ceil(progress * 4))).padStart(2, "0")}</span>
        <div><i style={{ transform: `scaleY(${progress})` }} /></div>
        <span>04</span>
      </div>
      <motion.div className="cursor-ring" style={{ x: ringX, y: ringY }} />
      <motion.div className="cursor-dot" style={{ x: cursorX, y: cursorY }} />
      <div className="a11y-status" aria-live="polite">Interactive forest loaded</div>
    </>
  );
}
