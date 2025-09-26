import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Heart, Cpu } from "lucide-react";

const About = () => {
  const funFacts = [
    {
      icon: <Cpu className="w-6 h-6" />,
      label: "Favorite tool",
      value: "Tensorflow/PyTorch"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      label: "Coffee status",
      value: "Brewing if notebook > 90% CPU"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      label: "Background hobby",
      value: "Beatbox → ML projects"
    }
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            About <span className="gradient-text">Me</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Long Description */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed text-muted-foreground">
                I'm a <strong className="text-foreground">B.Tech (CSE) student (2026)</strong> passionate about applying ML to real-world problems, especially at the intersection of audio and vision. I enjoy turning messy data into production-ready models and interactive demos that people can experience.
              </p>
            </motion.div>

            {/* Fun Facts */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-semibold mb-6">Fun Facts</h3>
              {funFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="glass-card hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="text-accent flex-shrink-0 mt-1">
                          {fact.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {fact.label}
                          </h4>
                          <p className="text-muted-foreground">
                            {fact.value}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Short Bio for Header/Meta */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <Card className="glass-card p-8">
              <CardContent className="p-0">
                <h3 className="text-xl font-semibold mb-4">Quick Summary</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Final-year Computer Science student at KIIT with a focus on machine learning, data analytics and audio-tech. Currently building ML systems at Katch GO and leading community outreach for the Global AI Hackathon.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;