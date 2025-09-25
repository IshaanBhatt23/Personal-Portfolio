import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Play } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Route Forecasting & CV for Bus Fleet",
      subtitle: "Forecast ridership & revenue + assign optimal trips to increase utilization",
      description: "XGBoost forecasting with <3% error and CV model that improved ticket collection by 14%",
      tech: ["Python", "XGBoost", "OpenCV", "AWS", "NumPy"],
      category: "ML",
      metrics: "<3% forecast error, 14% revenue improvement",
      github: "https://github.com/IshaanBhatt23",
      demo: null,
      highlights: ["Feature engineering with holiday flags", "GA optimization for trip assignment", "Real-time CV tracking system"]
    },
    {
      title: "Virtual Theremin",
      subtitle: "A webcam-based virtual theremin controlled by hand gestures",
      description: "Real-time hand tracking mapped to sine wave frequency/amplitude using OpenCV",
      tech: ["OpenCV", "Python", "WebAudio", "NumPy", "Flask"],
      category: "Audio",
      metrics: "~72% gesture accuracy",
      github: "https://github.com/IshaanBhatt23/Virtual-Thermin",
      demo: "/demos/theremin",
      highlights: ["Low-latency hand tracking", "Real-time audio synthesis", "Browser-based demo"]
    },
    {
      title: "Beatbox Sound Classifier",
      subtitle: "Classify beatbox sounds into categories with a small neural network",
      description: "MFCC feature extraction with sequential NN for real-time beatbox sound classification",
      tech: ["Librosa", "TensorFlow", "NumPy", "Gradio", "Python"],
      category: "Audio",
      metrics: "~72% accuracy on 250+ samples",
      github: "https://github.com/IshaanBhatt23/Beatbox-Sound-Classifier",
      demo: "/demos/beatbox",
      highlights: ["MFCC feature extraction", "Real-time classification", "Interactive demo interface"]
    },
    {
      title: "2D→3D Pipeline",
      subtitle: "Convert 2D images to exportable 3D .obj models using diffusion + PyTorch3D",
      description: "MIT Hackathon special mention project using Hugging Face Diffusers and PyTorch3D",
      tech: ["PyTorch3D", "Hugging Face", "Trimesh", "Diffusers", "Python"],
      category: "CV",
      metrics: "Special mention award",
      github: "https://github.com/IshaanBhatt23",
      demo: "/demos/3d-pipeline",
      highlights: ["Diffusion-based 3D generation", "Exportable .obj format", "3D model viewer integration"]
    },
    {
      title: "Text Summarizer & Q/A Bot",
      subtitle: "Document summarization + Q/A using transformer stacks and a Gradio interface",
      description: "Interactive document processing with transformer-based summarization and Q&A",
      tech: ["Transformers", "Gradio", "PyTorch", "NLTK", "Python"],
      category: "NLP",
      metrics: "High ROUGE scores",
      github: "https://github.com/IshaanBhatt23/Summarise-and-Ask",
      demo: "/demos/summarizer",
      highlights: ["Multi-document support", "Interactive Q&A interface", "Transformer-based architecture"]
    },
    {
      title: "GeoChallenge Game",
      subtitle: "Geography quiz game with fuzzy matching and multiple game modes",
      description: "Interactive geography game with intelligent fuzzy matching for user answers",
      tech: ["JavaScript", "Python", "Fuzzy Logic", "Game Design"],
      category: "Game",
      metrics: "Multiple game modes",
      github: "https://github.com/IshaanBhatt23/GeoChallenge",
      demo: "/demos/geochallenge",
      highlights: ["Fuzzy string matching", "Multiple difficulty levels", "Interactive game mechanics"]
    }
  ];

  const categories = ["All", "ML", "Audio", "CV", "NLP", "Game"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From ridership forecasting to audio classification, here are some of my favorite projects that solve real problems
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="hover:scale-105 transition-transform"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="h-full"
            >
              <Card className="glass-card h-full hover:shadow-glow transition-all duration-300 group">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <Badge variant="secondary" className="bg-accent/10 text-accent">
                      {project.category}
                    </Badge>
                    <div className="flex gap-2">
                      {project.demo && (
                        <Button size="sm" variant="ghost" className="p-2">
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="p-2">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </CardTitle>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {project.subtitle}
                  </p>
                  
                  <p className="text-sm text-purple font-semibold">
                    {project.metrics}
                  </p>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-2">
                      {project.highlights.map((highlight, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-1 h-1 bg-accent rounded-full"></div>
                          {highlight}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 pt-4">
                      {project.demo && (
                        <Button size="sm" className="flex-1">
                          <Play className="w-4 h-4 mr-2" />
                          Try Demo
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="flex-1">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Code
                        </a>
                      </Button>
                    </div>
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

export default Projects;