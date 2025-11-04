import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

interface CustomCursorProps {
  isMusicMode: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ isMusicMode }) => {
  // --- Environment flags (mobile & accessibility) ---
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isWindowActive, setIsWindowActive] = useState(true);

  useEffect(() => {
    const touch = "ontouchstart" in window || (navigator as any).maxTouchPoints > 0;
    setIsTouch(touch);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setRM = () => setPrefersReducedMotion(mq.matches);
    setRM();
    mq.addEventListener?.("change", setRM);

    const onVisibility = () => setIsWindowActive(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      mq.removeEventListener?.("change", setRM);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // Disable entire cursor on touch devices or for reduced-motion users
  if (isTouch || prefersReducedMotion) return null;

  // --- Cursor state ---
  const [cursorVariant, setCursorVariant] = useState<
    "default" | "hover" | "click" | "musicPulse"
  >("default");
  const [isHoveringWindow, setIsHoveringWindow] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  // --- Motion values (no React re-renders for pointer tracking) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth outer ring trailing
  const smoothMouseX = useSpring(mouseX, { damping: 20, stiffness: 300, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { damping: 20, stiffness: 300, mass: 0.5 });

  // rAF throttle for mousemove
  const rafId = useRef<number | null>(null);
  const lastCoords = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      lastCoords.current = { x: e.clientX, y: e.clientY };
      if (rafId.current == null) {
        rafId.current = requestAnimationFrame(() => {
          if (lastCoords.current) {
            mouseX.set(lastCoords.current.x);
            mouseY.set(lastCoords.current.y);
          }
          rafId.current = null;
        });
      }
    };

    const onEnter = () => setIsHoveringWindow(true);
    const onLeave = () => setIsHoveringWindow(false);
    const onDown = () => setIsClicked(true);
    const onUp = () => setIsClicked(false);

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseenter", onEnter);
    document.body.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseenter", onEnter);
      document.body.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [mouseX, mouseY]);

  // Hover variant toggling for interactive elements
  useEffect(() => {
    const onEnter = () => setCursorVariant("hover");
    const onLeave = () => setCursorVariant("default");

    const interactive = document.querySelectorAll<HTMLElement>(
      'a, button, [role="button"], .cursor-pointer, input, textarea, select, label'
    );
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  // Compute current variant with priorities
  const effectiveVariant = useMemo<"default" | "hover" | "click" | "musicPulse">(() => {
    if (isClicked) return "click";
    if (cursorVariant === "hover") return "hover";
    // Idle pulsing when in music mode
    return isMusicMode ? "musicPulse" : "default";
  }, [cursorVariant, isClicked, isMusicMode]);

  // Hide entirely if tab is inactive or pointer left the window
  const visible = isHoveringWindow && isWindowActive;

  // Variants
  const ringVariants = {
    default: {
      height: 24,
      width: 24,
      borderWidth: "2px",
      borderColor: isMusicMode ? "hsl(33, 100%, 50%)" : "hsl(var(--music-accent))",
      backgroundColor: "transparent",
      scale: 1,
    },
    hover: {
      height: 64,
      width: 64,
      borderWidth: "2px",
      borderColor: isMusicMode ? "hsl(33, 100%, 50%)" : "hsl(var(--music-accent))",
      backgroundColor: isMusicMode
        ? "hsla(33, 100%, 50%, 0.1)"
        : "hsla(var(--music-accent) / 0.1)",
      scale: 1,
    },
    click: {
      height: 40,
      width: 40,
      borderWidth: "2px",
      borderColor: isMusicMode ? "hsl(33, 100%, 50%)" : "hsl(var(--music-accent))",
      backgroundColor: "transparent",
      scale: 1.35,
    },
    musicPulse: {
      height: 32,
      width: 32,
      borderWidth: "2px",
      borderColor: "hsl(33, 100%, 50%)",
      backgroundColor: "transparent",
      scale: [1, 1.3, 1],
      transition: {
        scale: { repeat: Infinity, repeatType: "mirror", duration: 1, ease: "easeInOut" },
      },
    },
  } as const;

  const dotVariants = {
    default: {
      backgroundColor: isMusicMode ? "hsl(33, 100%, 50%)" : "hsl(var(--music-accent))",
      scale: 1,
    },
    hover: {
      backgroundColor: isMusicMode ? "hsl(33, 100%, 50%)" : "hsl(var(--music-accent))",
      scale: 0.5,
    },
    click: {
      backgroundColor: isMusicMode ? "hsl(33, 100%, 50%)" : "hsl(var(--music-accent))",
      scale: 0.2,
    },
    musicPulse: {
      backgroundColor: isMusicMode ? "hsl(33, 100%, 50%)" : "hsl(var(--music-accent))",
      scale: 1,
    },
  } as const;

  const exitAnim = { opacity: 0, scale: 0.5, transition: { duration: 0.2 } };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Outer ring */}
          <motion.div
            key="cursor-ring"
            aria-hidden="true"
            className="custom-cursor fixed top-0 left-0 rounded-full border-2 pointer-events-none z-[9999]"
            style={{
              left: smoothMouseX,
              top: smoothMouseY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            variants={ringVariants}
            animate={effectiveVariant}
            exit={exitAnim}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          {/* Inner dot */}
          <motion.div
            key="cursor-dot"
            aria-hidden="true"
            className="custom-cursor fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
            style={{
              left: mouseX,
              top: mouseY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            variants={dotVariants}
            animate={effectiveVariant}
            exit={exitAnim}
            transition={{ type: "spring", stiffness: 800, damping: 20 }}
          />
        </>
      )}
    </AnimatePresence>
  );
};
