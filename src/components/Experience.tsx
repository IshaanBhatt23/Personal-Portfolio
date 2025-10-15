import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Award } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "AI/ML Intern",
      company: "Katch GO",
      period: "June 2025 – Present",
      location: "On-Site",
      type: "Internship",
      achievements: [
        "Trained XGBoost models to forecast daily ridership and revenue with <3% average error",
        "Provided data-driven recommendations on trip frequency, passenger movement and fuel economy for route planning",
        "Built a CV model to track boarding/deboarding, reducing discrepancies and improving ticket collection by 14%"
      ],
      skills: ["XGBoost", "Python", "Computer Vision", "Data Analytics", "AWS"]
    },
    {
      title: "AWS Cloud Architecture Intern",
      company: "AICTE Virtual Internship",
      period: "Oct 2024 – Dec 2024",
      location: "Virtual",
      type: "Certification",
      achievements: [
        "Completed a 10-week AWS program (Grade A) with hands-on work in EC2, S3, Lambda, VPC, Aurora, CloudWatch",
        "Built scalable cloud architectures and deployed ML models on AWS infrastructure",
        "Gained expertise in serverless computing and cloud-native application development"
      ],
      skills: ["AWS", "EC2", "S3", "Lambda", "CloudWatch", "Aurora"]
    },
    {
      title: "Country Ambassador",
      company: "Global AI Hackathon",
      collaboration: "(in collaboration with MIT Sloan AI Club)",
      period: "July 2025 – Present",
      location: "India",
      type: "Leadership",
      achievements: [
        "Drove outreach across India, targeting Gujarat (across 7 engineering colleges)",
        "Led technical onboarding and community growth initiatives",
        "Recognized among Top 3 global ambassadors for outstanding performance"
      ],
      skills: ["Community Building", "Leadership", "Technical Mentoring", "Event Management"]
    }
  ];

  const hackathonAchievements = [
    {
      title: "MIT Global AI Hackathon",
      achievement: "Special Mention",
      description: "Built a pipeline with Hugging Face Diffusers, PyTorch3D and Trimesh to convert 2D images to 3D exportable models. Got a special mention for “Relevant Approach” for innovative solution and export ready .obj output.",
      year: "2025"
    },
    {
      title: "Amazon ML Challenge 2025",
      achievement: "Top 2.73% Global Rank",
      description: "Developed a LightGBM regression model combining text (TF-IDF) and image embeddings to predict product prices. Got a rank of 629 out of 23,000 (Top 2.73%) in Amazon ML Challenge 2025 for building Smart Product Pricing Model.",
      year: "2025"
    }
  ];

  return (
    <section id="experience" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Experience & <span className="animated-title">Achievements</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building ML systems, leading communities and solving real-world problems
          </p>
        </motion.div>

        {/* Professional Experience */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-2xl font-semibold mb-8">Professional Experience</h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="glass-card hover:shadow-glow transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-2">{exp.title}</CardTitle>
                        <div className="flex flex-wrap items-center gap-x-2">
                          <h4 className="text-lg font-semibold text-accent">{exp.company}</h4>
                          {exp.collaboration && (
                            <span className="text-md text-muted-foreground">{exp.collaboration}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </Badge>
                        <Badge variant="secondary">{exp.type}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex flex-wrap gap-2 pt-4">
                        {exp.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hackathon Achievements */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-8">Hackathon Achievement</h3>
          <div className="grid gap-6">
            {hackathonAchievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="glass-card hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-accent to-purple p-3 rounded-lg">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold">{achievement.title}</h4>
                          <Badge variant="secondary" className="bg-purple/10 text-purple">
                            {achievement.achievement}
                          </Badge>
                          <Badge variant="outline">{achievement.year}</Badge>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;