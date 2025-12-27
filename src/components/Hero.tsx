import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

interface HeroProps {
  isMusicMode?: boolean; // Made optional to prevent strict type errors if not passed immediately
  setIsMusicMode?: (isMusicMode: boolean) => void;
}

/* =========================================================
   useMagnetic — disabled automatically on touch/reduced-motion
   ========================================================= */
const useMagnetic = (intensity = 0.15, enabled = true) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;

      const magneticX = distanceX * intensity;
      const magneticY = distanceY * intensity;

      const maxDistance = 100;
      if (Math.abs(distanceX) < maxDistance && Math.abs(distanceY) < maxDistance) {
        setPosition({ x: magneticX, y: magneticY });
      } else {
        setPosition((prev) => ({ x: prev.x * 0.9, y: prev.y * 0.9 }));
      }
    };

    const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

    window.addEventListener("mousemove", handleMouseMove);
    ref.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (ref.current) ref.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [enabled, intensity]);

  return {
    ref,
    style: enabled ? { transform: `translate(${position.x}px, ${position.y}px)` } : undefined,
  };
};

/* =========================================================
   Inline icons
   ========================================================= */
const ChevronRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const Download = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const MapPin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

/* =========================================================
   Typing animation
   ========================================================= */
const useTypingAnimation = (text: string, speed = 150, delay = 2000) => {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const tick = () => {
      if (isDeleting) {
        if (displayText.length > 0) setDisplayText((prev) => prev.slice(0, -1));
        else setIsDeleting(false);
      } else {
        if (displayText.length < text.length) setDisplayText(text.slice(0, displayText.length + 1));
        else setTimeout(() => setIsDeleting(true), delay);
      }
    };

    const t = setTimeout(tick, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [displayText, isDeleting, text, speed, delay]);

  return displayText;
};

const Hero: React.FC<HeroProps> = ({ isMusicMode = false, setIsMusicMode = () => {} }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const scrollPos = useRef(0);
  const animatedName = useTypingAnimation("Ishaan Bhatt");

  // Environment flags
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const touch = "ontouchstart" in window || (navigator as any).maxTouchPoints > 0;
    setIsTouch(touch);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Magnetic buttons: only enable on non-touch + motion allowed
  const magneticEnabled = !isTouch && !prefersReducedMotion;
  const magneticViewWork = useMagnetic(0.12, magneticEnabled);
  const magneticDownload = useMagnetic(0.08, magneticEnabled);

  /* =========================================================
     Three.js background — muted on touch/reduced motion
     ========================================================= */
  useEffect(() => {
    if (!mountRef.current) return;
    if (isTouch || prefersReducedMotion) return;

    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    
    // Zoom out on mobile
    const isMobile = window.innerWidth < 768;
    camera.position.z = isMobile ? 24 : 15;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    currentMount.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(isMusicMode ? 0xff4500 : 0x9933ff, 4.0, 40);
    pointLight.position.set(0, 0, 8);
    scene.add(pointLight);

    const group = new THREE.Group();
    const devGeometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.OctahedronGeometry(0.8),
      new THREE.ConeGeometry(0.7, 1.2, 4),
      new THREE.CylinderGeometry(0.5, 0.5, 1, 6),
      new THREE.IcosahedronGeometry(0.8, 0),
    ];
    const musicGeometries = [
      new THREE.TorusGeometry(0.7, 0.2, 16, 100),
      new THREE.TorusKnotGeometry(0.6, 0.2, 100, 16),
      new THREE.CylinderGeometry(0.1, 0.1, 1.5, 32),
      new THREE.SphereGeometry(0.7, 32, 16),
    ];
    const geometries = isMusicMode ? musicGeometries : devGeometries;
    const nodeMaterial = new THREE.MeshPhongMaterial({
      color: isMusicMode ? 0xff6347 : 0x8a2be2,
      shininess: 100,
      specular: 0xffffff,
      emissive: isMusicMode ? 0x8b0000 : 0x3d0a6b,
      emissiveIntensity: 0.5,
    });

    const smallScreen = window.innerWidth < 640;
    const radius = 12;
    const nodeCount = smallScreen ? 20 : 40;
    for (let i = 0; i < nodeCount; i++) {
      const nodeGeometry = geometries[Math.floor(Math.random() * geometries.length)];
      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      mesh.position.set(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      group.add(mesh);
    }
    scene.add(group);

    const handleMouseMove = (event: MouseEvent) => {
      const { clientWidth, clientHeight } = currentMount;
      mousePos.current = {
        x: (event.clientX / clientWidth) * 2 - 1,
        y: -(event.clientY / clientHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleScroll = () => {
      scrollPos.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const baseRotation = elapsedTime * 0.1;
      const scrollRotation = scrollPos.current * 0.001;
      const targetRotationX = mousePos.current.y * 0.3;
      const targetRotationY = mousePos.current.x * 0.3;
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;
      group.rotation.y += (targetRotationY + baseRotation + scrollRotation - group.rotation.y) * 0.05;
      pointLight.position.x = mousePos.current.x * 10;
      pointLight.position.y = mousePos.current.y * 10;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      const isMobile = width < 768;
      camera.position.z = isMobile ? 24 : 15;
      
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      if (currentMount && renderer.domElement) currentMount.removeChild(renderer.domElement);

      group.traverse((obj: THREE.Object3D) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if ((mesh.material as THREE.Material)?.dispose) (mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, [isMusicMode, isTouch, prefersReducedMotion]);

  /* =========================================================
     InteractiveDots
     ========================================================= */
  const InteractiveDots = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement | null>(null);
    const rows = 16;
    const cols = 16;

    useEffect(() => {
      const updateMousePosition = (ev: MouseEvent) =>
        setMousePosition({ x: ev.clientX, y: ev.clientY });
      window.addEventListener("mousemove", updateMousePosition);
      return () => window.removeEventListener("mousemove", updateMousePosition);
    }, []);

    const cells = Array.from({ length: rows * cols }, (_, idx) => ({
      i: Math.floor(idx / cols),
      j: idx % cols,
    }));

    if (isTouch || prefersReducedMotion) return null;

    return (
      <div
        ref={containerRef}
        className="absolute inset-0 z-10 pointer-events-none" // Added pointer-events-none so it doesn't block clicks
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {cells.map(({ i, j }) => {
          let distance = 1000;
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            const dotX = rect.left + (j + 0.5) * (rect.width / cols);
            const dotY = rect.top + (i + 0.5) * (rect.height / rows);
            distance = Math.hypot(dotX - mousePosition.x, dotY - mousePosition.y);
          }
          const opacity = Math.max(0.1, 1 - distance / 300);
          return (
            <div key={`${i}-${j}`} className="flex items-center justify-center">
              <div
                className="w-1 h-1 rounded-full transition-all duration-200"
                style={{
                  opacity,
                  background: isMusicMode ? "#ff4500" : "#9933ff",
                }}
              />
            </div>
          );
        })}
      </div>
    );
  };

  const imageVariants = {
    center: { x: "0%", scale: 1, opacity: 1, zIndex: 10 },
    right: { x: "60%", scale: 0.6, opacity: 0.4, zIndex: 5 },
  };

  return (
    // ✅ Main Change: Used 'bg-black' to match index.tsx and prevent gray blocks. 
    // 'relative' and 'overflow-hidden' ensure the purple background stays INSIDE this component.
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white py-12">
      
      {/* Three.js canvas mount - z-0 puts it behind content */}
      <div ref={mountRef} className="absolute inset-0 z-0 opacity-60" />

      {/* Subtle dots */}
      <InteractiveDots />

      {/* Quick contact button - Fixed position (will float on scroll) */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed top-4 right-4 z-50"
      >
        <a href="#contact">
          <button className="px-4 py-2 text-sm font-medium border border-white/20 bg-black/30 backdrop-blur-md rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 tap-target">
            Contact <ChevronRight className="w-4 h-4" />
          </button>
        </a>
      </motion.div>

      <div className="container mx-auto px-6 md:px-6 text-center z-20 flex flex-col items-center justify-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`w-full max-w-[90%] sm:max-w-4xl p-6 sm:p-10 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl transition-shadow duration-500 ${
            isMusicMode ? "shadow-orange-500/20" : "shadow-purple-500/20"
          }`}
        >
          {/* Profile Images */}
          <motion.div className="mb-6 relative w-48 h-32 sm:w-64 sm:h-40 mx-auto flex items-center justify-center">
            {/* Developer */}
            <motion.img
              src="/ishaan-profile.jpg"
              alt="Portrait of Ishaan Bhatt"
              loading="eager"
              width={160}
              height={160}
              className={`absolute w-28 h-28 sm:w-40 sm:h-40 rounded-full object-cover cursor-pointer shadow-lg ring-4 transition-all duration-500 ${
                isMusicMode ? "shadow-purple-500/30 ring-purple-500/40" : "shadow-purple-500/30 ring-purple-500/40"
              }`}
              variants={imageVariants}
              animate={isMusicMode ? "right" : "center"}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsMusicMode(false)}
              title="Switch to Developer Profile"
            />
            {/* Music */}
            <motion.img
              src="/ishaan-performing.jpg"
              alt="Ishaan Bhatt performing music"
              loading="lazy"
              width={160}
              height={160}
              className={`absolute w-28 h-28 sm:w-40 sm:h-40 rounded-full object-cover cursor-pointer shadow-lg ring-4 transition-all duration-500 ${
                isMusicMode ? "shadow-orange-500/30 ring-orange-500/40" : "shadow-orange-500/30 ring-orange-500/40"
              }`}
              variants={imageVariants}
              animate={isMusicMode ? "center" : "right"}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsMusicMode(true)}
              title="Switch to Music Profile"
            />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 min-h-[48px] sm:min-h-[84px]"
          >
            <span
              className={`text-transparent bg-clip-text bg-gradient-to-r transition-all duration-500 ${
                isMusicMode ? "from-orange-400 to-red-500" : "from-purple-400 to-pink-500"
              }`}
            >
              {animatedName}
            </span>
            <span
              className={`inline-block align-middle w-1 h-8 sm:h-12 ml-1 animate-ping transition-colors duration-500 ${
                isMusicMode ? "bg-orange-400" : "bg-purple-400"
              }`}
            />
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-2xl font-semibold text-gray-300 mb-4 px-2"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isMusicMode ? "music" : "dev"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {isMusicMode
                  ? "Beatboxer & Electronic Music Producer"
                  : "AI / ML Developer & Audio-Tech Enthusiast"}
              </motion.span>
            </AnimatePresence>
          </motion.h2>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={isMusicMode ? "music-desc" : "dev-desc"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-sm sm:text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed px-2"
            >
              {isMusicMode
                ? "Crafting beats and melodies as a loopstation artist, blending human vocals with electronic soundscapes."
                : "Building intelligent systems and immersive audio experiences that solve real-world problems."}
            </motion.p>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-row flex-wrap sm:flex-nowrap gap-3 justify-center mb-6"
          >
            <a href="#projects" className="flex-1 sm:flex-none">
              <button
                ref={magneticViewWork.ref}
                style={magneticViewWork.style}
                className={`w-full sm:w-auto px-4 sm:px-8 py-3 text-sm sm:text-lg font-semibold bg-gradient-to-r rounded-lg hover:scale-105 transition-all transform-gpu flex items-center justify-center gap-2 tap-target ${
                  isMusicMode ? "from-orange-600 to-red-600" : "from-purple-600 to-pink-600"
                }`}
              >
                View Work <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </a>

            <a href="/Ishaan-Bhatt_Resume.pdf" download="Ishaan-Bhatt-Resume.pdf" className="flex-1 sm:flex-none">
              <button
                ref={magneticDownload.ref}
                style={magneticDownload.style}
                className="w-full sm:w-auto px-4 sm:px-8 py-3 text-sm sm:text-lg font-semibold bg-white/5 border border-white/20 rounded-lg hover:bg-white/10 hover:scale-105 transition-all transform-gpu flex items-center justify-center gap-2 tap-target"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Resume</span>
                <span className="xs:hidden">Resume</span>
              </button>
            </a>
          </motion.div>

          {/* Contact snippet */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="space-y-2 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Ahmedabad, Gujarat, India</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;