"use client";

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

const allSkills = skillCategories.flatMap(category =>
  category.skills.map(skill => skill)
);

const Skills = () => {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Skills & <span className="animated-title">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From machine learning frameworks to cloud platforms, here's my technical toolkit
          </p>
        </motion.div>

        {/* Tag Cloud with Tooltips */}
        <TooltipProvider delayDuration={200} skipDelayDuration={150}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-16"
          >
            {allSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      variant="outline"
                      className="px-4 py-2 text-sm hover:bg-accent/10 hover:border-accent transition-all cursor-default"
                    >
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

        {/* Detailed Skills */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <Card className="glass-card h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6 text-center">
                    {category.title}
                  </h3>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                        }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">
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
