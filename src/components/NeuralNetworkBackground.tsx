import React, { useRef, useEffect } from 'react';

// This component will render a canvas that fills the background
// and draws an interactive particle network.
export const NeuralNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to fill the viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let mouse = {
      x: -100,
      y: -100,
      radius: 150, // Area of effect around the mouse
    };

    // Update mouse coordinates on move
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number;
      y: number;
      size: number;
      // Store original position to return to
      baseX: number;
      baseY: number;
      // Random value to make movement feel more organic
      density: number;

      constructor(x: number, y: number, size: number) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 30 + 1;
      }

      // Draw the particle on the canvas
      draw() {
        if (!ctx) return;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
    }

    let particlesArray: Particle[] = [];
    const initParticles = () => {
      particlesArray = [];
      // Adjust particle count based on screen size for better density.
      // Increased the divisor for fewer particles and better performance.
      const particleCount = (canvas.height * canvas.width) / 12000;
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5 + 1;
        particlesArray.push(new Particle(x, y, size));
      }
    };

    // REMOVED the entire `connectParticles` function as it was the source of the lag.

    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // We will now loop through the particles just once per frame.
      particlesArray.forEach(particle => {
        // 1. Draw the particle
        particle.draw();

        // 2. Check its distance from the mouse
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 3. If it's close enough, draw a single line TO the mouse
        if (distance < mouse.radius) {
            ctx.strokeStyle = `rgba(255, 136, 0, ${1 - distance / mouse.radius})`; // Orange line to mouse
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y); // Start line at the particle
            ctx.lineTo(mouse.x, mouse.y);      // End line at the mouse
            ctx.stroke();
        }
      });

      requestAnimationFrame(animate);
    };
    
    // Resize handler to make the canvas responsive
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    window.addEventListener('resize', handleResize);
    
    initParticles();
    animate();

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <canvas
      ref={canvasRef}
      // This styling is crucial:
      // `fixed` positions it relative to the viewport.
      // `top-0 left-0` pins it to the top-left corner.
      // `-z-10` places it behind all your other page content.
      className="fixed top-0 left-0 -z-10"
    />
  );
};
