import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define the props, including the isMusicMode to change themes
interface CustomCursorProps {
  isMusicMode: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ isMusicMode }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover">(
    "default"
  );
  // ✨ NEW: State to track if the mouse is inside the window
  const [isHoveringWindow, setIsHoveringWindow] = useState(true);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // ✨ NEW: Handlers to show/hide cursor when leaving/entering the window
    const handleMouseEnter = () => setIsHoveringWindow(true);
    const handleMouseLeave = () => setIsHoveringWindow(false);

    window.addEventListener("mousemove", mouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter); // ✨ Listen on the body
    document.body.addEventListener("mouseleave", handleMouseLeave); // ✨ Listen on the body

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

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

  // Define the animation variants for the cursor elements
  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      borderWidth: "2px",
      borderColor: isMusicMode ? "#ff8c00" : "#9933ff",
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      borderWidth: "2px",
      borderColor: isMusicMode ? "#ff8c00" : "#9933ff",
      backgroundColor: isMusicMode
        ? "rgba(255, 140, 0, 0.1)"
        : "rgba(153, 51, 255, 0.1)",
    },
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      backgroundColor: isMusicMode ? "#ff8c00" : "#9933ff",
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      backgroundColor: isMusicMode ? "#ff8c00" : "#9933ff",
      scale: 0.5,
    },
  };
  
  // ✨ NEW: Framer Motion exit animations
  const exitAnimation = { opacity: 0, scale: 0.5, transition: { duration: 0.2 } };

  return (
    // ✨ NEW: AnimatePresence wrapper for graceful exit animations
    <AnimatePresence>
      {isHoveringWindow && (
        <>
          <motion.div
            key="outer"
            // ✨ NEW: Added 'custom-cursor' class for CSS targeting
            className="custom-cursor fixed top-0 left-0 rounded-full border-2 pointer-events-none z-[9999]"
            variants={variants}
            animate={cursorVariant}
            exit={exitAnimation} // ✨ Use exit animation
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
          <motion.div
            key="dot"
            // ✨ NEW: Added 'custom-cursor' class
            className="custom-cursor fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
            variants={dotVariants}
            animate={cursorVariant}
            exit={exitAnimation} // ✨ Use exit animation
            transition={{ type: "spring", stiffness: 800, damping: 20 }}
          />
        </>
      )}
    </AnimatePresence>
  );
};