import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Skills = () => {
  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "Python", level: 95 },
        { name: "Java", level: 85 },
        { name: "C", level: 80 },
        { name: "SQL", level: 85 },
        { name: "HTML/CSS", level: 90 }
      ]
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "PyTorch", level: 95 },
        { name: "TensorFlow", level: 90 },
        { name: "Hugging Face", level: 92 },
        { name: "NumPy/Pandas", level: 95 },
        { name: "scikit-learn", level: 90 },
        { name: "OpenCV", level: 88 },
        { name: "Librosa", level: 85 }
      ]
    },
    {
      title: "Tools & Cloud",
      skills: [
        { name: "AWS", level: 85 },
        { name: "Jupyter/Colab", level: 95 },
        { name: "Power BI", level: 80 },
        { name: "Gradio", level: 88 },
        { name: "FL Studio", level: 75 }
      ]
    },
    {
      title: "Domains",
      skills: [
        { name: "Machine Learning", level: 95 },
        { name: "Computer Vision", level: 90 },
        { name: "NLP", level: 85 },
        { name: "Audio Processing", level: 88 },
        { name: "Data Analytics", level: 92 }
      ]
    }
  ];

  const allSkills = skillCategories.flatMap(category => 
    category.skills.map(skill => skill.name)
  );

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From machine learning frameworks to cloud platforms, here's my technical toolkit
          </p>
        </motion.div>

        {/* Tag Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {allSkills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.1 }}
            >
              <Badge 
                variant="outline" 
                className="px-4 py-2 text-sm hover:bg-accent/10 hover:border-accent transition-all cursor-default"
              >
                {skill}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Skills */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                        viewport={{ once: true }}
                        transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                        className="space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <Progress 
                          value={skill.level} 
                          className="h-2"
                        />
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