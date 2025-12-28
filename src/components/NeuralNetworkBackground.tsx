import React, { useRef, useEffect, useState } from "react";

export const NeuralNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isTouch = "ontouchstart" in window || (navigator as any).maxTouchPoints > 0;

    const setCanvasSize = () => {
      const dpr = 1; 
      const { innerWidth: w, innerHeight: h } = window;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); 
    };

    setCanvasSize();

    // Mouse interaction radius
    const mouse = { x: -9999, y: -9999, radius: 220 };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    if (!isTouch) {
      window.addEventListener("mousemove", onMove, { passive: true });
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = size;
      }
      draw() {
        ctx!.fillStyle = "rgba(255,255,255,0.7)";
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fill();
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
      }
    }

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const area = window.innerWidth * window.innerHeight;

      // --- ULTRA DENSITY ---
      // area / 7000 = Very high density
      const base = area / 7000;
      
      // Increased Max Limit significantly for PC
      const maxParticles = isTouch ? 110 : 400;
      
      const count = Math.max(80, Math.min(base, maxParticles));

      for (let i = 0; i < Math.floor(count); i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const size = Math.random() * 1.5 + 1;
        particles.push(new Particle(x, y, size));
      }
    };

    const connectParticles = () => {
      // 150 = Good reach to prevent solo nodes
      const maxDist = 150; 

      for (let a = 0; a < particles.length; a++) {
        const pa = particles[a];
        for (let b = a + 1; b < particles.length; b++) {
          const pb = particles[b];
          const dx = pa.x - pb.x;
          const dy = pa.y - pb.y;
          const dist = Math.hypot(dx, dy);
          
          if (dist < maxDist) {
            // Very thin lines (0.3) to handle the high density cleanly
            ctx!.strokeStyle = `rgba(0,200,255,${1 - dist / maxDist})`; 
            ctx!.lineWidth = 0.3; 
            ctx!.beginPath();
            ctx!.moveTo(pa.x, pa.y);
            ctx!.lineTo(pb.x, pb.y);
            ctx!.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const p of particles) {
        p.update();
        p.draw();

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < mouse.radius) {
          ctx!.strokeStyle = `rgba(255,136,0,${1 - dist / mouse.radius})`;
          ctx!.lineWidth = 1.2;
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
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
      if (!isTouch) {
        window.removeEventListener("mousemove", onMove);
      }
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