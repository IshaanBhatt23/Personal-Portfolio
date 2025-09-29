import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Heart, Cpu, Music } from "lucide-react";

interface AboutProps {
  isMusicMode: boolean;
}

const About: React.FC<AboutProps> = ({ isMusicMode }) => {
  const devFacts = [
    {
      icon: <Cpu className="w-6 h-6" />,
      label: "Favorite tool",
      value: "Tensorflow / PyTorch",
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      label: "Coffee status",
      value: "Brewing if notebook > 90% CPU",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      label: "Background hobby",
      value: "Beatbox → ML projects",
    },
  ];

  const musicFacts = [
    {
      icon: <Music className="w-6 h-6" />,
      label: "Fun fact",
      value: "Can recreate drum & bass grooves using only vocals",
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      label: "Coffee status",
      value: "Fuelled by cappuccinos before jam sessions",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      label: "Background hobby",
      value: "Reimagining classic tracks as cinematic compositions",
    },
  ];

  // A ref to attach to the section. The useInView hook will monitor this element.
  const ref = useRef(null);
  // isInView will be true when the element is in the viewport, and false when it's not.
  // The `once: false` option ensures the animation runs every time you scroll up or down.
  // Lowered `amount` to make the animation trigger earlier.
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  // Animation variants define the states for elements (e.g., hidden and visible).
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Sped up from 0.2
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Sped up from 0.8
  };

  const descriptionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }, // Sped up from 0.8
  };

  const factsContainerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5, // Sped up from 0.8
        delay: 0.4,
        staggerChildren: 0.1, // Sped up from 0.2
      },
    },
  };

  const factItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  const summaryVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.6 } }, // Sped up from 0.8
  };

  return (
    // Attach the ref to the main section element.
    <section id="about" className="py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          // Animate to "visible" when isInView is true, and back to "hidden" when false.
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          {/* Heading */}
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-center mb-16">
            About <span className="animated-title">Me</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Long Description */}
            <motion.div
              variants={descriptionVariants}
              className="space-y-6"
            >
              {isMusicMode ? (
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I'm an{" "}
                  <strong className="text-foreground">experienced beatboxer</strong>, performing for{" "}
                  <strong className="text-foreground">8+ years</strong> and specializing in{" "}
                  <strong className="text-foreground">loopstation artistry</strong> and{" "}
                  <strong className="text-foreground">FL Studio production</strong>. I love crafting{" "}
                  <em>emotional electronic music</em> that blends human vocals with cinematic soundscapes. Along the way,
                  I've had the privilege of working with names like <strong>Illenium</strong>,{" "}
                  <strong>Abandoned</strong> and <strong>Lama</strong>.
                </p>
              ) : (
                <p className="text-lg leading-relaxed text-muted-foreground">
                  I'm a <strong className="text-foreground">B.Tech (CSE) student (2026)</strong> passionate about
                  applying AI/ML to real-world problems, especially at the intersection of audio and vision. I enjoy
                  turning messy data into production-ready models and interactive demos that people can experience.
                </p>
              )}
            </motion.div>

            {/* Fun Facts */}
            <motion.div
              variants={factsContainerVariants}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold mb-6">Fun Facts</h3>
              {(isMusicMode ? musicFacts : devFacts).map((fact, index) => (
                <motion.div
                  key={index}
                  variants={factItemVariants}
                >
                  <Card className="glass-card hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-accent flex-shrink-0 mt-1">{fact.icon}</div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{fact.label}</h4>
                          <p className="text-muted-foreground">{fact.value}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Quick Summary */}
          <motion.div
            variants={summaryVariants}
            className="mt-16 text-center"
          >
            <Card className="glass-card p-8">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4">Quick Summary</h3>
                {isMusicMode ? (
                  <p className="text-muted-foreground leading-relaxed">
                    Loopstation artist and emotional Electronic Music producer blending beatboxing with electronic layers. 8+ years
                    of experience and collaborations with artists like Illenium, Abandoned and Lama.
                  </p>
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    Final-year Computer Science student at KIIT with a focus on machine learning, data analytics, and
                    audio-tech. Currently building AI/ML models at Katch GO and leading community outreach for the Global
                    AI Community.
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

