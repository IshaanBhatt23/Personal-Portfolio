"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Python", level: 95, definition: "High-level programming language widely used for AI/ML and backend." },
      { name: "Java", level: 75, definition: "Object-oriented programming language used for enterprise and Android apps." },
      { name: "C", level: 65, definition: "Low-level language known for performance and system programming." },
      { name: "SQL", level: 85, definition: "Standard language for managing and querying relational databases." },
      { name: "HTML/CSS", level: 90, definition: "Core web technologies for structuring and styling web pages." }
    ]
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "PyTorch", level: 95, definition: "Deep learning framework with dynamic computation graphs." },
      { name: "TensorFlow", level: 90, definition: "Google's open-source library for machine learning & deep learning." },
      { name: "Hugging Face", level: 92, definition: "NLP hub with pre-trained models and transformers." },
      { name: "NumPy/Pandas", level: 95, definition: "Python libraries for numerical computing and data analysis." },
      { name: "scikit-learn", level: 90, definition: "Machine learning toolkit for classical ML models." },
      { name: "OpenCV", level: 88, definition: "Computer vision library for image and video processing." },
      { name: "Librosa", level: 85, definition: "Python library for audio/music analysis and feature extraction." }
    ]
  },
  {
    title: "Tools & Cloud",
    skills: [
      { name: "AWS", level: 70, definition: "Amazon Web Services cloud computing platform." },
      { name: "Jupyter/Colab", level: 95, definition: "Interactive environments for Python and ML experiments." },
      { name: "Power BI", level: 80, definition: "Microsoft’s business analytics and data visualization tool." },
      { name: "Gradio", level: 88, definition: "Python library to build ML-powered web apps easily." },
      { name: "FL Studio", level: 75, definition: "Digital audio workstation for music production." }
    ]
  },
  {
    title: "Domains",
    skills: [
      { name: "Machine Learning", level: 95, definition: "Field of AI where systems learn patterns from data." },
      { name: "Computer Vision", level: 90, definition: "AI field that enables machines to understand images & videos." },
      { name: "NLP", level: 85, definition: "Natural Language Processing for text and speech understanding." },
      { name: "Audio Processing", level: 88, definition: "Techniques to analyze and transform audio signals." },
      { name: "Data Analytics", level: 92, definition: "Extracting insights and trends from raw data." }
    ]
  }
];

const allSkills = skillCategories.flatMap((c) => c.skills);

const Skills = () => {
  // Environment flags for better mobile UX
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

  const badgeHover = !isTouch && !prefersReducedMotion ? { scale: 1.1 } : undefined;

  const badgeClass =
    "px-3 py-1.5 text-[11px] sm:text-sm hover:bg-accent/10 hover:border-accent transition-all cursor-default tap-target";

  return (
    <section id="skills" className="py-20 sm:py-24 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Skills & <span className="animated-title">Expertise</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto">
            From machine learning frameworks to cloud platforms, here&apos;s my technical toolkit
          </p>
        </motion.div>

        {/* Tag Cloud — tooltips disabled on touch/reduced motion (uses title=...) */}
        {isTouch || prefersReducedMotion ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16"
          >
            {allSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
              >
                <Badge variant="outline" className={badgeClass} title={skill.definition}>
                  {skill.name}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <TooltipProvider delayDuration={200} skipDelayDuration={150}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16"
            >
              {allSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={badgeHover}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="outline" className={badgeClass}>
                        {skill.name}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs text-center p-2">
                      {skill.definition}
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              ))}
            </motion.div>
          </TooltipProvider>
        )}

        {/* Detailed Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <Card className="glass-card h-full">
                <CardContent className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-5 sm:mb-6 text-center">
                    {category.title}
                  </h3>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm sm:text-base">{skill.name}</span>
                          <span className="text-xs sm:text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <Progress value={skill.level} className="h-2" />
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
