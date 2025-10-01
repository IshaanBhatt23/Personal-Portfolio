import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Cpu, Music } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import StatusGauge from "./StatusGauge";
import { EphemeralHighlight } from "./EphemeralHighlight";

interface AboutProps {
  isMusicMode: boolean;
}

const About: React.FC<AboutProps> = ({ isMusicMode }) => {
  // ⭐️ FINAL ENERGETIC DEV FACTS ⭐️
  const devFacts = [
    {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      label: "Favorite Architecture",
      value: "Transformer Networks / Force-Directed Graphs",
      tooltip: "Architecture choice reflects my mindset: transformers for attention, graphs for structure.",
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-400" />,
      label: "Background Focus",
      value: "MLOps pipelines and Model Deployment (Kubernetes/Docker)",
      tooltip: "Like Kubernetes orchestrating services, I balance multiple tracks while ensuring scalability.",
    },
  ];

  // ⭐️ FINAL ENERGETIC MUSIC FACTS ⭐️
  const musicFacts = [
    {
      icon: <Music className="w-6 h-6 text-cyan-400" />,
      label: "Fun fact",
      value: "Can recreate drum & bass grooves using only vocals on a loopstation",
      tooltip: "Every loop is like a microservice — independent yet synchronized in harmony.",
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-400" />,
      label: "Production Goal",
      value: "Producing cinematic, emotional EDM with a focus on sound design synthesis",
      tooltip: "My synth design workflow mirrors AI training — iteration, tuning, and fine adjustments until harmony emerges.",
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const factsContainerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: 0.4, staggerChildren: 0.1 },
    },
  };

  const factItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const summaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 } },
  };

  return (
    <TooltipProvider>
      <section id="about" className="py-24 bg-secondary/30" ref={ref}>
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="max-w-4xl mx-auto"
          >
            {/* Heading */}
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-center mb-16">
              About <span className="animated-title">Me</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Long Description */}
              <motion.div variants={descriptionVariants} className="space-y-6">
                {isMusicMode ? (
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    I'm an{" "}
                    <strong className="text-foreground">
                      <EphemeralHighlight isMusicMode={isMusicMode}>experienced beatboxer</EphemeralHighlight>
                    </strong>
                    , performing for{" "}
                    <strong className="text-foreground">8+ years</strong> and specializing in{" "}
                    <strong className="text-foreground">
                      <EphemeralHighlight isMusicMode={isMusicMode}>loopstation artistry</EphemeralHighlight>
                    </strong>{" "}
                    and{" "}
                    <strong className="text-foreground">
                      <EphemeralHighlight isMusicMode={isMusicMode}>FL Studio production</EphemeralHighlight>
                    </strong>
                    . I love crafting <em>emotional electronic music</em> that blends human vocals with cinematic
                    soundscapes. Along the way, I've had the privilege of working with names like{" "}
                    <strong className="text-foreground">
                      <EphemeralHighlight isMusicMode={isMusicMode}>Illenium</EphemeralHighlight>
                    </strong>
                    ,{" "}
                    <strong className="text-foreground">
                      <EphemeralHighlight isMusicMode={isMusicMode}>Abandoned</EphemeralHighlight>
                    </strong>{" "}
                    and{" "}
                    <strong className="text-foreground">
                      <EphemeralHighlight isMusicMode={isMusicMode}>Lama</EphemeralHighlight>
                    </strong>
                    .
                  </p>
                ) : (
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    I'm a{" "}
                    <strong className="text-foreground">
                      <EphemeralHighlight isMusicMode={isMusicMode}>B.Tech (CSE) student (2026)</EphemeralHighlight>
                    </strong>{" "}
                    passionate about applying AI/ML to real-world problems, especially at the intersection of{" "}
                    <strong className="text-foreground">
                      <EphemeralHighlight isMusicMode={isMusicMode}>audio and vision</EphemeralHighlight>
                    </strong>
                    . I enjoy turning messy data into production-ready models and interactive demos that people can
                    experience.
                  </p>
                )}
              </motion.div>

              {/* Fun Facts */}
              <motion.div variants={factsContainerVariants} className="space-y-4">
                <h3 className="text-2xl font-semibold mb-6">Fun Facts</h3>

                {/* Status Gauge Placement */}
                <motion.div variants={factItemVariants}>
                  <StatusGauge
                    isMusicMode={isMusicMode}
                    funFact={
                      isMusicMode
                        ? "The core of my emotional electronic music is a custom-trained RNN that helps generate harmonic progressions."
                        : "My dev workflow is like a distributed system — scaling across tasks while optimizing efficiency."
                    }
                  />
                </motion.div>

                {(isMusicMode ? musicFacts : devFacts).map((fact, index) => (
                  <motion.div key={index} variants={factItemVariants}>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="flex flex-col items-start p-4 border border-neutral-700 rounded-lg bg-black/50 backdrop-blur-sm hover:shadow-glow cursor-help transition-all duration-300"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            {fact.icon}
                            <h4 className="text-sm font-semibold text-white">{fact.label}</h4>
                          </div>
                          <p className="text-xs text-muted-foreground">{fact.value}</p>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs p-4 bg-neutral-900 border-purple-500 text-white shadow-lg">
                        <p className="font-bold mb-1 text-purple-400">System Insight:</p>
                        {fact.tooltip}
                      </TooltipContent>
                    </Tooltip>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Quick Summary */}
            <motion.div variants={summaryVariants} className="mt-16 text-center space-y-8">
              <Card className="glass-card p-8">
                <CardContent className="p-0">
                  <h3 className="text-xl font-semibold mb-4">Quick Summary</h3>
                  {isMusicMode ? (
                    <p className="text-muted-foreground leading-relaxed">
                      Loopstation artist and emotional Electronic Music producer blending beatboxing with electronic
                      layers. 8+ years of experience and collaborations with artists like Illenium, Abandoned and Lama.
                    </p>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      Final-year Computer Science student at KIIT with a focus on machine learning, data analytics, and
                      audio-tech. Currently building AI/ML models at Katch GO and leading community outreach for the
                      Global AI Community.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* 🚀 Personal System Insight Card */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="relative group">
                <Card className="glass-card border border-accent/40 shadow-glow transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <h4 className="text-lg font-semibold text-accent mb-2">Personal System Insight</h4>
                    <p className="text-muted-foreground">
                      {isMusicMode
                        ? "Creative system optimized for rhythm generation, loop layering, and sonic storytelling."
                        : "Analytical system optimized for problem-solving, distributed learning, and real-time adaptation."}
                    </p>
                  </CardContent>
                </Card>
                <div className="absolute inset-0 rounded-2xl bg-accent/20 blur-lg opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default About;
