import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// Define the props, including the isMusicMode to change themes
interface CustomCursorProps {
  isMusicMode: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ isMusicMode }) => {
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover">(
    "default"
  );
  const [isHoveringWindow, setIsHoveringWindow] = useState(true);
  // ✨ NEW: State to track the click action
  const [isClicked, setIsClicked] = useState(false);

  // ✨ --- START: Performance Optimization --- ✨
  // Use MotionValues to track mouse position without re-rendering the component
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  // Use Spring to create a smooth, trailing effect for the outer ring
  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };
  // ✨ --- END: Performance Optimization --- ✨

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      // ✨ Update motion values instead of state
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };

    const handleMouseEnter = () => setIsHoveringWindow(true);
    const handleMouseLeave = () => setIsHoveringWindow(false);
    
    // ✨ --- START: Click Animation --- ✨
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    // ✨ --- END: Click Animation --- ✨

    window.addEventListener("mousemove", mouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    // ✨ Add event listeners for click
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);


    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      // ✨ Clean up click listeners
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouse.x, mouse.y]);

  useEffect(() => {
    const handleMouseEnter = () => setCursorVariant("hover");
    const handleMouseLeave = () => setCursorVariant("default");

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], .cursor-pointer'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  // ✨ Define the animation variants for the cursor elements
  // Note: 'x' and 'y' are removed as they are now handled by the style prop with motion values
  const variants = {
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
    // ✨ NEW: Click animation variant
    click: {
      height: 40,
      width: 40,
      scale: 1.4,
      borderColor: isMusicMode ? "hsl(33, 100%, 50%)" : "hsl(var(--music-accent))",
    },
    // ✨ NEW: Rhythmic pulse for Music Mode
    musicPulse: {
      height: 32,
      width: 32,
      borderWidth: "2px",
      borderColor: "hsl(33, 100%, 50%)",
      // Define the repeating animation within the transition property
      transition: {
        scale: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1, // Corresponds to a 60 BPM beat
          ease: "easeInOut",
        },
      },
      // The scale values to animate between
      scale: [1, 1.3, 1],
    },
  };

  const dotVariants = {
    default: {
      backgroundColor: isMusicMode ? "hsl(33, 100%, 50%)" : "hsl(var(--music-accent))",
      scale: 1,
    },
    hover: {
      backgroundColor: isMusicMode ? "hsl(33, 100%, 50%)" : "hsl(var(--music-accent))",
      scale: 0.5,
    },
    // ✨ NEW: Click animation for the central dot
    click: {
      scale: 0.2,
      backgroundColor: isMusicMode ? "hsl(33, 100%, 50%)" : "hsl(var(--music-accent))",
    }
  };
  
  const exitAnimation = { opacity: 0, scale: 0.5, transition: { duration: 0.2 } };

  // ✨ Determine the current animation state based on priority
  let currentVariant = cursorVariant;
  if (isMusicMode && cursorVariant === "default") {
    currentVariant = "musicPulse";
  }
  if (isClicked) {
    currentVariant = "click";
  }

  return (
    <AnimatePresence>
      {isHoveringWindow && (
        <>
          {/* Outer Ring */}
          <motion.div
            key="outer"
            className="custom-cursor fixed top-0 left-0 rounded-full border-2 pointer-events-none z-[9999]"
            // ✨ Use motion values in the style prop for positioning
            style={{
              left: smoothMouse.x,
              top: smoothMouse.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            variants={variants}
            animate={currentVariant}
            exit={exitAnimation}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          {/* Inner Dot */}
          <motion.div
            key="dot"
            className="custom-cursor fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
             // ✨ Use direct motion values for a snappier dot
            style={{
              left: mouse.x,
              top: mouse.y,
              translateX: "-50%",
              translateY: "-50%",
            }}
            variants={dotVariants}
            animate={isClicked ? 'click' : cursorVariant}
            exit={exitAnimation}
            transition={{ type: "spring", stiffness: 800, damping: 20 }}
          />
        </>
      )}
    </AnimatePresence>
  );
};