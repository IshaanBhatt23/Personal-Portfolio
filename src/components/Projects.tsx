import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Globe } from "lucide-react"; 

const Projects = () => {
  const projects = [
    {
      title: "SAP-Chatflow",
      subtitle: "SAP Chatbot using Llama 3 and RAG",
      description: "SAP Chatbot made to automate logistics and HR tasks",
      tech: ["Python", "TypeScript", "React", "Node.js", "SAP", "LLaMA 3", "RAG"],
      category: ["Deployed", "FullStack"],
      metrics: "Automation and Chatbot",
      // ADDED: Demo link
      demo: "https://sap-chatflow.vercel.app/",
      github: "https://github.com/IshaanBhatt23/sap-chatflow",
      highlights: ["SAP Chatbot", "RAG", "LLM", "FullStack", "Automation"],
    },
    {
      title: "Beatbox Sound Classifier",
      subtitle: "Classify beatbox sounds (kick, hi-hats, snare, clops) with ML",
      description:
        "MFCC feature extraction with neural network for real-time beatbox sound classification",
      tech: ["Python", "Librosa", "TensorFlow", "NumPy", "Jupyter"],
      category: ["Audio Tech"],
      metrics: "Multi-class audio classification",
      github: "https://github.com/IshaanBhatt23/Beatbox-Sound-Classifier",
      highlights: [
        "MFCC feature extraction",
        "Real-time classification",
        "Dataset included in README",
        "Audio Tech",
      ],
    },
    {
      title: "Generative 3D Jewellery Design",
      subtitle: "2D → 3D pipeline with exportable .obj outputs",
      description:
        "Generate 3D jewelry models from 2D designs using generative AI techniques",
      tech: ["PyTorch3D", "Point-E", "Trimesh", "Python"],
      category: ["Generative AI"],
      metrics: "Exportable .obj models",
      github: "https://github.com/IshaanBhatt23/Generative-3D-Jewellery-Design",
      highlights: ["2D to 3D conversion", "Exportable formats", "Generative modeling"],
    },
    {
      title: "Smart Product Pricing ",
      subtitle: "LightGBM-based multimodal model for e-commerce price prediction",
      description:
        "Developed an ensemble model using LightGBM regression model and HistGradientBoosting Regressor, combining text (TF-IDF) and image embeddings to predict product prices.",
      tech: ["LightGBM", "Optuna", "TF-IDF", "Python"],
      category: ["ML Model"],
      metrics: "Multimodal regression and feature fusion",
      github: "https://github.com/IshaanBhatt23/Smart-Product-Pricing",
      highlights: ["Text and image feature fusion", "LightGBM regression", "Top 2.73% global rank"],
    },
    {
      title: "Document Summarizer & Q/A",
      subtitle: "Transformer-based document processing with Q/A capabilities",
      description: "Interactive document summarization and question-answering system",
      tech: ["Transformers", "Python", "NLTK", "Jupyter"],
      category: ["LLM/NLP"],
      metrics: "Transformer-based processing",
      github: "https://github.com/IshaanBhatt23/Summarise-and-Ask",
      highlights: ["Document summarization", "Q&A interface", "Transformer architecture"],
    },
    {
      title: "Stock Price Predictor",
      subtitle: "Time-series forecasting for stock market prediction",
      description:
        "Machine learning models for predicting stock prices using historical data",
      tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
      category: ["ML Model"],
      metrics: "Time-series forecasting",
      github: "https://github.com/IshaanBhatt23/Stocks-Predictor",
      highlights: ["Time series analysis", "Market prediction", "Data visualization"],
    },
    {
      title: "Virtual Theremin",
      subtitle: "Webcam hand-tracking → WebAudio sound synthesis demo",
      description: "Interactive theremin controlled by hand gestures using computer vision",
      tech: ["OpenCV", "Python", "WebAudio", "NumPy", "Flask"],
      category: ["Audio Tech", "CV"],
      metrics: "Real-time hand tracking",
      github: "https://github.com/IshaanBhatt23/Virtual-Thermin",
      highlights: ["Hand gesture recognition", "Audio synthesis", "Interactive demo"],
    },
    {
      title: "Movie Recommendation System",
      subtitle: "Collaborative and content-based recommendation engine",
      description:
        "ML-powered movie recommendation system with multiple filtering approaches",
      tech: ["Python", "Pandas", "Scikit-learn", "NumPy"],
      category: ["ML Model"],
      metrics: "Recommendation algorithms",
      github: "https://github.com/IshaanBhatt23/Movie-Recommendation-System",
      highlights: [
        "Collaborative filtering",
        "Content-based filtering",
        "User preference analysis",
      ],
    },
    {
      title: "Heart Disease Predictor",
      subtitle: "Classification model for heart disease prediction",
      description:
        "Machine learning model to predict heart disease risk based on medical indicators",
      tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
      category: ["ML Model"],
      metrics: "Medical classification",
      github: "https://github.com/IshaanBhatt23/Heart-Disease-Predictor",
      highlights: ["Medical data analysis", "Risk prediction", "Model evaluation"],
    },
    {
      title: "Coffee Shop Sales Analytics",
      subtitle: "Sales analysis with data cleaning, charts and business insights",
      description:
        "Comprehensive business analytics dashboard for coffee shop sales data",
      tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
      category: ["Analytics"],
      metrics: "Business intelligence",
      github: "https://github.com/IshaanBhatt23/Coffee-Shop-Sales",
      highlights: ["Data cleaning", "Business insights", "Visualization dashboard"],
    },
    {
      title: "GeoChallenge Game",
      subtitle: "Geography quiz with fuzzy matching and multiple game modes",
      description: "Interactive geography game with intelligent answer matching",
      tech: ["JavaScript", "Python", "Fuzzy Logic"],
      category: ["Game"],
      metrics: "Interactive gaming",
      github: "https://github.com/IshaanBhatt23/GeoChallenge",
      highlights: ["Fuzzy string matching", "Multiple game modes", "Interactive gameplay"],
    },
    {
      title: "Gender Classifier",
      subtitle: "Computer vision model for gender classification",
      description:
        "Image classification model with saved artifacts for gender prediction",
      tech: ["Python", "OpenCV", "TensorFlow", "NumPy"],
      category: ["CV"],
      metrics: "Image classification",
      github: "https://github.com/IshaanBhatt23/Gender-Classifier",
      highlights: ["Image processing", "Classification model", "Saved model artifacts"],
    },
    {
      title: "Mine vs Rock Classifier",
      subtitle: "Binary classification for sonar data analysis",
      description:
        "Project for understanding the concept of binary classification using sonar data",
      tech: ["Python", "Scikit-learn", "Pandas"],
      category: ["ML Model"],
      metrics: "Binary classification",
      github: "https://github.com/IshaanBhatt23/Mine-vs-rock-classifier",
      highlights: ["Sonar data analysis", "Binary classification", "Educational project"],
    },
  ];

  const categories = ["All", "Deployed", "FullStack", "Audio Tech", "CV", "Generative AI", "LLM/NLP", "ML Model", "Analytics", "Game"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = useMemo(
    () =>
      selectedCategory === "All"
        ? projects
        : projects.filter((p) => p.category.includes(selectedCategory)),
    [projects, selectedCategory]
  );

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

  const tiltEnabled = !isTouch && !prefersReducedMotion;

  return (
    <section id="projects" className="py-10 md:py-24 scroll-mt-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Featured <span className="animated-title">Projects</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Filter by category and tap a card to open the repo/demo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              size="sm"
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="hover:scale-105 transition-transform tap-target"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <motion.div
          layout
          transition={{ layout: { duration: 0.4, type: "spring" } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredProjects.map((project, index) => {
            const CardInner = (
              <motion.div
                layout
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.03, duration: 0.35, type: "spring" }}
                whileHover={!isTouch ? { y: -6 } : undefined}
                className="h-full w-full"
              >
                {/* FIXED BORDER ISSUE:
                   The Card is now transparent. The visual border and background
                   are handled by the TILT wrapper (if enabled) or a wrapper div below.
                   This ensures the border isn't clipped by the rounded corners.
                */}
                <Card className="h-full w-full flex flex-col bg-transparent border-0 shadow-none">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4 gap-3">
                      <Badge variant="secondary" className="bg-accent/10 text-accent">
                        {project.category.join(" / ")}
                      </Badge>
                      <div className="flex gap-2">
                        {/* Top-right Icon Logic */}
                        <Button size="sm" variant="ghost" className="p-2" asChild>
                          <a href={project.demo || project.github} target="_blank" rel="noopener noreferrer">
                            {project.demo ? <Globe className="w-4 h-4" /> : <Github className="w-4 h-4" />}
                          </a>
                        </Button>
                      </div>
                    </div>

                    <CardTitle className="project-title text-lg sm:text-xl mb-2 transition-colors">
                      {project.title}
                    </CardTitle>

                    <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                      {project.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-purple font-semibold">{project.metrics}</p>
                  </CardHeader>

                  <CardContent className="pt-0 flex-grow flex flex-col">
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="space-y-4 flex-grow">
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-[10px] sm:text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-2">
                        {project.highlights.map((highlight, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
                          >
                            <div className="w-1 h-1 bg-accent rounded-full" />
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* DUAL BUTTON LOGIC */}
                    <div className="flex flex-col gap-3 pt-4 mt-auto">
                      {project.demo ? (
                        <>
                          {/* 1. View Live App (Cyan) */}
                          <Button 
                            asChild
                            className="w-full py-5 rounded-xl font-bold text-black 
                              bg-cyan-400 hover:bg-cyan-300 
                              hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] 
                              transition-all duration-300 active:scale-95 tap-target"
                          >
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <Globe className="w-5 h-5 mr-2" />
                              View Live App
                            </a>
                          </Button>
                          
                          {/* 2. View Code (Outline) */}
                          <Button 
                            asChild
                            variant="outline"
                            className="w-full py-5 rounded-xl font-bold 
                              border-white/20 bg-transparent hover:bg-white/10
                              text-white transition-all duration-300 active:scale-95 tap-target"
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="w-5 h-5 mr-2" />
                              View Repository
                            </a>
                          </Button>
                        </>
                      ) : (
                        // Standard Single Button
                        <Button 
                          asChild
                          className="w-full py-5 rounded-xl font-bold text-black 
                            bg-cyan-400 hover:bg-cyan-300 
                            hover:shadow-[0_0_20px_rgba(34,211,238,0.6)] 
                            transition-all duration-300 active:scale-95 tap-target"
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="w-5 h-5 mr-2" />
                            See Project
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );

            // COMMON STYLES moved to variable to reuse for Tilt and Non-Tilt
            const glassClasses = `
              rounded-2xl overflow-hidden h-full flex flex-col
              bg-white/5 backdrop-blur-md border border-white/10
              transition-colors duration-300 group
              hover:border-cyan-500/30 hover:bg-white/10 
              hover:shadow-lg hover:shadow-cyan-500/10
            `;

            return tiltEnabled ? (
              <Tilt
                key={project.title}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                perspective={1000}
                glareEnable
                glareMaxOpacity={0.15}
                glarePosition="all"
                glareColor="rgba(255,255,255,0.3)"
                gyroscope={false}
                scale={1.02}
                transitionSpeed={1200}
                // Border and BG are applied here to avoid clipping
                className={glassClasses}
              >
                {CardInner}
              </Tilt>
            ) : (
              <div key={project.title} className={glassClasses}>
                {CardInner}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;