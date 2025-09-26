import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Beatbox Sound Classifier",
      subtitle: "Classify beatbox sounds (kick, hi-hats, snare, clops) with ML",
      description: "MFCC feature extraction with neural network for real-time beatbox sound classification",
      tech: ["Python", "Librosa", "TensorFlow", "NumPy", "Jupyter"],
      category: ["Audio Tech"],
      metrics: "Multi-class audio classification",
      github: "https://github.com/IshaanBhatt23/Beatbox-Sound-Classifier",
      highlights: ["MFCC feature extraction", "Real-time classification", "Dataset included in README"]
    },
    {
      title: "Virtual Theremin",
      subtitle: "Webcam hand-tracking → WebAudio sound synthesis demo",
      description: "Interactive theremin controlled by hand gestures using computer vision",
      tech: ["OpenCV", "Python", "WebAudio", "NumPy", "Flask"],
      category: ["Audio Tech", "CV"],
      metrics: "Real-time hand tracking",
      github: "https://github.com/IshaanBhatt23/Virtual-Thermin",
      highlights: ["Hand gesture recognition", "Audio synthesis", "Interactive demo"]
    },
    {
      title: "Generative 3D Jewellery Design",
      subtitle: "2D→3D pipeline with exportable .obj outputs",
      description: "Generate 3D jewelry models from 2D designs using generative AI techniques",
      tech: ["PyTorch3D", "Point-E", "Trimesh", "Python"],
      category: ["Generative AI"],
      metrics: "Exportable .obj models",
      github: "https://github.com/IshaanBhatt23/Generative-3D-Jewellery-Design",
      highlights: ["2D to 3D conversion", "Exportable formats", "Generative modeling"]
    },
    {
      title: "Document Summarizer & Q/A",
      subtitle: "Transformer-based document processing with Q/A capabilities",
      description: "Interactive document summarization and question-answering system",
      tech: ["Transformers", "Python", "NLTK", "Jupyter"],
      category: ["LLM/NLP"],
      metrics: "Transformer-based processing",
      github: "https://github.com/IshaanBhatt23/Summarise-and-Ask",
      highlights: ["Document summarization", "Q&A interface", "Transformer architecture"]
    },
    {
      title: "Stock Price Predictor",
      subtitle: "Time-series forecasting for stock market prediction",
      description: "Machine learning models for predicting stock prices using historical data",
      tech: ["Python", "Pandas", "Scikit-learn", "Matplotlib"],
      category: ["ML Model"],
      metrics: "Time-series forecasting",
      github: "https://github.com/IshaanBhatt23/Stocks-Predictor",
      highlights: ["Time series analysis", "Market prediction", "Data visualization"]
    },
    {
      title: "Movie Recommendation System",
      subtitle: "Collaborative and content-based recommendation engine",
      description: "ML-powered movie recommendation system with multiple filtering approaches",
      tech: ["Python", "Pandas", "Scikit-learn", "NumPy"],
      category: ["ML Model"],
      metrics: "Recommendation algorithms",
      github: "https://github.com/IshaanBhatt23/Movie-Recommendation-System",
      highlights: ["Collaborative filtering", "Content-based filtering", "User preference analysis"]
    },
    {
      title: "Heart Disease Predictor",
      subtitle: "Classification model for heart disease prediction",
      description: "Machine learning model to predict heart disease risk based on medical indicators",
      tech: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
      category: ["ML Model"],
      metrics: "Medical classification",
      github: "https://github.com/IshaanBhatt23/Heart-Disease-Predictor",
      highlights: ["Medical data analysis", "Risk prediction", "Model evaluation"]
    },
    {
      title: "Coffee Shop Sales Analytics",
      subtitle: "Sales analysis with data cleaning, charts, and business insights",
      description: "Comprehensive business analytics dashboard for coffee shop sales data",
      tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
      category: ["Analytics"],
      metrics: "Business intelligence",
      github: "https://github.com/IshaanBhatt23/Coffee-Shop-Sales",
      highlights: ["Data cleaning", "Business insights", "Visualization dashboard"]
    },
    {
      title: "GeoChallenge Game",
      subtitle: "Geography quiz with fuzzy matching and multiple game modes",
      description: "Interactive geography game with intelligent answer matching",
      tech: ["JavaScript", "Python", "Fuzzy Logic"],
      category: ["Game"],
      metrics: "Interactive gaming",
      github: "https://github.com/IshaanBhatt23/GeoChallenge",
      highlights: ["Fuzzy string matching", "Multiple game modes", "Interactive gameplay"]
    },
    {
      title: "Gender Classifier",
      subtitle: "Computer vision model for gender classification",
      description: "Image classification model with saved artifacts for gender prediction",
      tech: ["Python", "OpenCV", "TensorFlow", "NumPy"],
      category: ["CV"],
      metrics: "Image classification",
      github: "https://github.com/IshaanBhatt23/Gender-Classifier",
      highlights: ["Image processing", "Classification model", "Saved model artifacts"]
    },
    {
      title: "Mine vs Rock Classifier",
      subtitle: "Binary classification for sonar data analysis",
      description: "Teaching project for binary classification using sonar data",
      tech: ["Python", "Scikit-learn", "Pandas"],
      category: ["ML Model"],
      metrics: "Binary classification",
      github: "https://github.com/IshaanBhatt23/Mine-vs-rock-classifier",
      highlights: ["Sonar data analysis", "Binary classification", "Educational project"]
    }
  ];

  const categories = ["All", "Audio Tech", "CV", "Generative AI", "LLM/NLP", "ML Model", "Analytics", "Game"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(project => project.category.includes(selectedCategory));

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
                      {project.category.join(' / ')}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="p-2" asChild>
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
                      <Button size="sm" className="flex-1" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          See Project
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