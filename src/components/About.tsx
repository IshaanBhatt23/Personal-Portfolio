import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Cpu, Music } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import StatusGauge from "./StatusGauge";
import { EphemeralHighlight } from "./EphemeralHighlight";

interface AboutProps {
  isMusicMode: boolean;
}

const About: React.FC<AboutProps> = ({ isMusicMode }) => {
  // Environment flags (for mobile/perf-friendly behavior)
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

  // ⭐️ DEV FACTS
  const devFacts = [
    {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      label: "Favorite Architecture",
      value: "Transformer Networks / Force-Directed Graphs",
      tooltip:
        "Architecture choice reflects my mindset: transformers for attention, graphs for structure.",
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-400" />,
      label: "Background Focus",
      value: "MLOps pipelines and Model Deployment (Kubernetes/Docker)",
      tooltip:
        "Like Kubernetes orchestrating services, I balance multiple tracks while ensuring scalability.",
    },
  ];

  // ⭐️ MUSIC FACTS
  const musicFacts = [
    {
      icon: <Music className="w-6 h-6 text-cyan-400" />,
      label: "Fun fact",
      value: "Can recreate drum & bass grooves using only vocals on a loopstation",
      tooltip:
        "Every loop is like a microservice — independent yet synchronized in harmony.",
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-400" />,
      label: "Production Goal",
      value:
        "Producing cinematic, emotional EDM with a focus on sound design synthesis",
      tooltip:
        "My synth design workflow mirrors AI training — iteration, tuning, and fine adjustments until harmony emerges.",
    },
  ];

  // Section-level inView (not 'once') to allow re-trigger
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
    margin: "-10% 0px -10% 0px",
  });

  // Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.2 : 0.5 },
    },
  };

  const facts = isMusicMode ? musicFacts : devFacts;
  const tooltipsEnabled = !isTouch && !prefersReducedMotion;

  return (
    <TooltipProvider>
      <section
        id="about"
        // CHANGE: Reduced padding (py-10 instead of py-20 on mobile)
        className="py-10 md:py-24 bg-secondary/30 scroll-mt-24"
        ref={sectionRef}
      >
        <div className="container mx-auto px-4 sm:px-6">
          {/* Container fades in/out as section enters/leaves viewport */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={sectionInView ? "visible" : "hidden"}
            className="max-w-5xl mx-auto"
          >
            {/* Heading — re-triggers each time it enters view */}
            <motion.h2
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              // CHANGE: Reduced margin bottom (mb-6 instead of mb-10 on mobile)
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-16"
            >
              About <span className="animated-title">Me</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 items-start">
              {/* Long Description — slide-from-left each time it enters view */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 0.5 }}
                // CHANGE: Slightly tighter space-y-4 on mobile
                className="space-y-4 sm:space-y-6"
              >
                {isMusicMode ? (
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    I&apos;m an{" "}
                    <strong className="text-foreground">
                      <EphemeralHighlight isMusicMode={isMusicMode}>
                        experienced beatboxer
                      </EphemeralHighlight>
                    </strong>
                    , performing for <strong className="text-foreground">8+ years</strong> and
                    specializing in{" "}
                    <strong className="text-foreground">
                      <EphemeralHighlight isMusicMode={isMusicMode}>
                        loopstation artistry
                      </EphemeralHighlight>
                    </strong>{" "}
                    and{" "}
                    <strong className="text-foreground">
                      <EphemeralHighlight isMusicMode={isMusicMode}>
                        FL Studio production
                      </EphemeralHighlight>
                    </strong>
                    . I love crafting <em>emotional electronic music</em> that blends human
                    vocals with cinematic soundscapes. Along the way, I&apos;ve had the privilege
                    of working with names like{" "}
                    <strong className="text-foreground">
                      <EphemeralHighlight isMusicMode={isMusicMode}>
                        Illenium
                      </EphemeralHighlight>
                    </strong>
                    ,{" "}
                    <strong className="text-foreground">
                      <EphemeralHighlight isMusicMode={isMusicMode}>
                        Abandoned
                      </EphemeralHighlight>
                    </strong>{" "}
                    and{" "}
                    <strong className="text-foreground">
                      <EphemeralHighlight isMusicMode={isMusicMode}>Lama</EphemeralHighlight>
                    </strong>
                    .
                  </p>
                ) : (
                  <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                    I&apos;m a{" "}
                    <strong className="text-foreground">
                      <EphemeralHighlight isMusicMode={isMusicMode}>
                        B.Tech (CSE) student (2026)
                      </EphemeralHighlight>
                    </strong>{" "}
                    passionate about applying AI/ML to real-world problems, especially at the
                    intersection of{" "}
                    <strong className="text-foreground">
                      <EphemeralHighlight isMusicMode={isMusicMode}>
                        audio and vision
                      </EphemeralHighlight>
                    </strong>
                    . I enjoy turning messy data into production-ready models and interactive
                    demos that people can experience.
                  </p>
                )}
              </motion.div>

              {/* Fun Facts — slide-from-right; each child re-triggers */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 0.5 }}
                className="space-y-4"
              >
                {/* CHANGE: Reduced margin bottom for header */}
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-6">Fun Facts</h3>

                {/* Status Gauge */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: prefersReducedMotion ? 0.2 : 0.45 }}
                >
                  <StatusGauge
                    isMusicMode={isMusicMode}
                    funFact={
                      isMusicMode
                        ? "The core of my emotional electronic music is a custom-trained RNN that helps generate harmonic progressions."
                        : "My dev workflow is like a distributed system — scaling across tasks while optimizing efficiency."
                    }
                  />
                </motion.div>

                {(facts).map((fact, index) => {
                  const FactInner = (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: false, amount: 0.35 }}
                      transition={{
                        duration: prefersReducedMotion ? 0.18 : 0.4,
                        delay: index * (prefersReducedMotion ? 0.02 : 0.05),
                      }}
                      className={`flex flex-col items-start p-4 border border-neutral-700 rounded-lg bg-black/50 backdrop-blur-sm transition-all duration-300 ${
                        tooltipsEnabled ? "hover:shadow-glow cursor-help" : ""
                      }`}
                      title={!tooltipsEnabled ? fact.tooltip : undefined}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {fact.icon}
                        <h4 className="text-sm font-semibold text-white">{fact.label}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">{fact.value}</p>
                    </motion.div>
                  );

                  return tooltipsEnabled ? (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.35 }}
                      transition={{ duration: prefersReducedMotion ? 0.18 : 0.35 }}
                    >
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>{FactInner}</TooltipTrigger>
                        <TooltipContent className="max-w-xs p-4 bg-neutral-900 border-purple-500 text-white shadow-lg">
                          <p className="font-bold mb-1 text-purple-400">System Insight:</p>
                          {fact.tooltip}
                        </TooltipContent>
                      </Tooltip>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.35 }}
                      transition={{ duration: prefersReducedMotion ? 0.18 : 0.35 }}
                    >
                      {FactInner}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Quick Summary — re-triggers when it enters view */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: prefersReducedMotion ? 0.2 : 0.5 }}
              // CHANGE: Reduced top margin (mt-8 instead of mt-12 on mobile)
              className="mt-8 sm:mt-16 text-center space-y-6 sm:space-y-8"
            >
              <Card className="glass-card p-6 sm:p-8">
                <CardContent className="p-0">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Quick Summary</h3>
                  {isMusicMode ? (
                    <p className="text-muted-foreground leading-relaxed">
                      Loopstation artist and emotional Electronic Music producer blending beatboxing
                      with electronic layers. 8+ years of experience and collaborations with artists
                      like Illenium, Abandoned and Lama.
                    </p>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      Final-year Computer Science student at KIIT with a focus on machine learning,
                      data analytics, and audio-tech. Currently building AI/ML models at Katch GO
                      and leading community outreach for the Global AI Community.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Personal System Insight Card */}
              <motion.div
                whileHover={!isTouch && !prefersReducedMotion ? { scale: 1.03 } : undefined}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <Card className="glass-card border border-accent/40 shadow-glow transition-all duration-300">
                  <CardContent className="p-5 sm:p-6 text-center">
                    <h4 className="text-base sm:text-lg font-semibold text-accent mb-2">
                      Personal System Insight
                    </h4>
                    <p className="text-muted-foreground">
                      {isMusicMode
                        ? "Creative system optimized for rhythm generation, loop layering, and sonic storytelling."
                        : "Analytical system optimized for problem-solving, distributed learning, and real-time adaptation."}
                    </p>
                  </CardContent>
                </Card>
                <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-lg opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default About;