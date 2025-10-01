import { motion } from "framer-motion";
import React from "react";

interface EphemeralHighlightProps {
  children: React.ReactNode;
  isMusicMode: boolean;
  className?: string;
  onClick?: () => void;
}

export const EphemeralHighlight: React.FC<EphemeralHighlightProps> = ({
  children,
  isMusicMode,
  className,
  onClick,
}) => {
  // Choose highlight colors based on mode
  const highlightColor = isMusicMode
    ? `hsl(var(--music-accent))`
    : `hsl(var(--dev-accent))`;

  return (
    <motion.span
      className={`relative inline-block cursor-pointer font-semibold ${className}`}
      onClick={onClick}
      // 🔥 Inline animate style — always wins over Tailwind
      animate={{
        color: highlightColor,
      }}
      whileHover={{
        scale: 1.05,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.5,
      }}
      style={{
        display: "inline-block",
      }}
    >
      {children}
    </motion.span>
  );
};
