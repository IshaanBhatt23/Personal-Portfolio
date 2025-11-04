import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Zap, Clock, Disc3 } from "lucide-react";

interface StatusGaugeProps {
  isMusicMode: boolean;
  funFact: string;
}

// Timezone for Ahmedabad, India: Asia/Kolkata (IST)
const TIMEZONE = "Asia/Kolkata";

// Get IST hour safely, fallback to local if needed
const getIstHour = (): number => {
  try {
    const ist = new Date().toLocaleString("en-US", {
      hour: "2-digit",
      hourCycle: "h23",
      timeZone: TIMEZONE,
    });
    const h = parseInt(ist.split(":")[0]?.trim() || "");
    return Number.isFinite(h) ? h : new Date().getHours();
  } catch {
    return new Date().getHours();
  }
};

const getStatusData = (hours: number, isMusicMode: boolean) => {
  if (hours >= 1 && hours < 3) {
    return {
      level: 95,
      color: "bg-green-500",
      status: isMusicMode
        ? "In The Loop (Beat Creation Mode)"
        : "Deep Work Session (Optimizing Loss Function)",
      icon: <Disc3 className="w-4 h-4 text-green-500" />,
    };
  } else if (hours >= 7 && hours < 10) {
    return {
      level: 40,
      color: "bg-yellow-500",
      status: isMusicMode
        ? "Awaiting First Beat (Coffee Required)"
        : "System Initializing (Awaiting Input)",
      icon: <Clock className="w-4 h-4 text-yellow-500" />,
    };
  } else if (hours >= 11 && hours < 13) {
    return {
      level: 80,
      color: "bg-green-500",
      status: isMusicMode
        ? "VSTs Loaded (Ready to Mix)"
        : "80% Efficiency (Feature Extraction Complete)",
      icon: <Zap className="w-4 h-4 text-green-500" />,
    };
  } else if (hours >= 15 && hours < 17) {
    return {
      level: 30,
      color: "bg-orange-500",
      status: isMusicMode
        ? "Decaying Sustain (Needs Re-Charge)"
        : "Refactor Needed (Low Power Mode)",
      icon: <Zap className="w-4 h-4 text-orange-500" />,
    };
  } else if (hours >= 20 || hours < 1) {
    return {
      level: 100,
      color: "bg-purple-500",
      status: isMusicMode
        ? "On The Grid (Peak Flow State)"
        : "Training Cycle Active (Max Performance)",
      icon: <Zap className="w-4 h-4 text-purple-500" />,
    };
  }
  return {
    level: 60,
    color: "bg-gray-400",
    status: "System Idle (Monitoring Data Feed)",
    icon: <Clock className="w-4 h-4 text-gray-400" />,
  };
};

const StatusGauge: React.FC<StatusGaugeProps> = ({ isMusicMode, funFact }) => {
  const [currentStatus, setCurrentStatus] = useState(getStatusData(getIstHour(), isMusicMode));
  const [currentTime, setCurrentTime] = useState("");
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Env flags for mobile / accessibility
  useEffect(() => {
    const touch = "ontouchstart" in window || (navigator as any).maxTouchPoints > 0;
    setIsTouch(touch);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setRM = () => setPrefersReducedMotion(mq.matches);
    setRM();
    mq.addEventListener?.("change", setRM);
    return () => mq.removeEventListener?.("change", setRM);
  }, []);

  useEffect(() => {
    const updateStatus = () => {
      const hour = getIstHour();
      setCurrentStatus(getStatusData(hour, isMusicMode));
      try {
        setCurrentTime(
          new Date().toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: TIMEZONE,
          })
        );
      } catch {
        setCurrentTime(
          new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
      }
    };

    updateStatus();
    const id = setInterval(updateStatus, 60_000);
    return () => clearInterval(id);
  }, [isMusicMode]);

  const { level, color, status, icon } = currentStatus;
  const tooltipsEnabled = !isTouch && !prefersReducedMotion;

  // Motion config: gentler on low-power devices
  const transition = useMemo(
    () => ({ duration: prefersReducedMotion ? 0.2 : 0.8, ease: "easeOut" as const }),
    [prefersReducedMotion]
  );

  const Content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
      className="flex flex-col items-start p-4 sm:p-5 border border-neutral-700 rounded-lg bg-black/50 backdrop-blur-sm cursor-default sm:cursor-help tap-target"
      title={!tooltipsEnabled ? funFact : undefined}
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <h4 className="text-sm font-semibold text-white">
          System Energy ({currentTime || "--:--"} IST)
        </h4>
      </div>

      {/* Energy Bar */}
      <div className="w-full bg-gray-800 rounded-full h-3 sm:h-3.5">
        <motion.div
          key={level} // restart animation when level changes
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={transition}
          className={`h-3 sm:h-3.5 rounded-full ${color} shadow-md`}
        />
      </div>

      {/* Status Text */}
      <p className="text-xs sm:text-sm text-muted-foreground mt-2">{status}</p>
    </motion.div>
  );

  return tooltipsEnabled ? (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>{Content}</TooltipTrigger>
      <TooltipContent className="max-w-xs p-4 bg-neutral-900 border-purple-500 text-white shadow-lg">
        <p className="font-bold mb-1 text-purple-400">Personal System Insight:</p>
        {funFact}
      </TooltipContent>
    </Tooltip>
  ) : (
    Content
  );
};

export default StatusGauge;
