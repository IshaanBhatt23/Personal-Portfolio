import React, { useRef, useEffect, useState } from "react";

export const NeuralNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  // Disable on touch / reduced-motion for perf & accessibility
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const isTouch = "ontouchstart" in window || (navigator as any).maxTouchPoints > 0;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!isTouch && !mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // DPI-aware sizing
    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap DPR for perf
      const { innerWidth: w, innerHeight: h } = window;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels
    };

    setCanvasSize();

    // Mouse tracking
    const mouse = { x: -100, y: -100, radius: 140 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Particles
    class Particle {
      x: number;
      y: number;
      size: number;
      constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
      }
      draw() {
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const area = window.innerWidth * window.innerHeight;

      // Density tuned for devices (fewer on phones)
      const base = area / 15000;
      const count = Math.max(40, Math.min(base, window.innerWidth < 640 ? 80 : 200));
      for (let i = 0; i < Math.floor(count); i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 1.5 + 1;
        particles.push(new Particle(x, y, size));
      }
    };

    // Connect nearby particles
    const connectParticles = () => {
      const maxDist = 120;
      for (let a = 0; a < particles.length; a++) {
        const pa = particles[a];
        for (let b = a + 1; b < particles.length; b++) {
          const pb = particles[b];
          const dx = pa.x - pb.x;
          const dy = pa.y - pb.y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            ctx.strokeStyle = `rgba(0,200,255,${1 - dist / maxDist})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(pa.x, pa.y);
            ctx.lineTo(pb.x, pb.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const p of particles) {
        p.draw();

        // Orange line from mouse to nearby particles
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius) {
          ctx.strokeStyle = `rgba(255,136,0,${1 - dist / mouse.radius})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      connectParticles();
      rafRef.current = requestAnimationFrame(animate);
    };

    const onResize = () => {
      setCanvasSize();
      initParticles();
    };
    window.addEventListener("resize", onResize);

    initParticles();
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
};
