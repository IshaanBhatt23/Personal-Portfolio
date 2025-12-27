import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Award } from "lucide-react";

const Experience = () => {
  const prefersReducedMotion = useReducedMotion();

  const experiences = [
    {
      title: "AI/ML Intern",
      company: "Katch GO",
      period: "June 2025 – December 2025",
      location: "On-Site",
      type: "Internship",
      achievements: [
        "Trained XGBoost models to forecast daily ridership and revenue with <3% average error",
        "Provided data-driven recommendations on trip frequency, passenger movement and fuel economy for route planning",
        "Built a CV model to track boarding/deboarding, reducing discrepancies and improving ticket collection by 14%",
      ],
      skills: ["XGBoost", "Python", "Computer Vision", "Data Analytics", "AWS"],
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
        "Gained expertise in serverless computing and cloud-native application development",
      ],
      skills: ["AWS", "EC2", "S3", "Lambda", "CloudWatch", "Aurora"],
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
        "Recognized among Top 3 global ambassadors for outstanding performance",
      ],
      skills: ["Community Building", "Leadership", "Technical Mentoring", "Event Management"],
    },
  ];

  const hackathonAchievements = [
    {
      title: "MIT Global AI Hackathon",
      achievement: "Special Mention",
      description:
        "Received a special mention for 'Relevant Approach' for building an innovative pipeline that generates exportable 3D models from 2D images using Hugging Face Diffusers, PyTorch3D and Trimesh",
      year: "2025",
    },
    {
      title: "Amazon ML Challenge 2025",
      achievement: "Top 2.73% Global Rank",
      description:
        "Engineered a high-performing regression model using ensembel modelling including LightGBM and HistGradientBoosting Regressor to forecast product prices from text (TF-IDF) and image features, placing 629th out of 23,000 competitors globally.",
      year: "2025",
    },
  ];

  // ---- Motion variants (re-trigger on scroll both directions) ----
  const sectionFade = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const cardSlide = {
    hidden: { opacity: 0, x: -24 },
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.12, duration: 0.45 },
    }),
  };

  const listParent = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const listItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  const achvCard = {
    hidden: { opacity: 0, y: 20 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.1, duration: 0.45 },
    }),
  };

  // If user prefers reduced motion, disable transforms but keep content visible quickly.
  const viewportCfg = { once: false, amount: 0.2 };

  return (
    // CHANGE: Reduced vertical padding (py-10 instead of py-20 on mobile)
    <section id="experience" className="py-10 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          variants={sectionFade}
          initial="hidden"
          whileInView="show"
          viewport={viewportCfg}
          // CHANGE: Reduced margin bottom (mb-8 instead of mb-12 on mobile)
          className="text-center mb-8 sm:mb-16"
          style={prefersReducedMotion ? { opacity: 1, transform: "none" } : undefined}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 sm:mb-6">
            Experience & <span className="animated-title">Achievements</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Building ML systems, leading communities and solving real-world problems
          </p>
        </motion.div>

        {/* Professional Experience */}
        {/* CHANGE: Reduced margin bottom (mb-10 instead of mb-14 on mobile) */}
        <div className="max-w-5xl mx-auto mb-10 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Professional Experience</h3>

          <div className="space-y-6 sm:space-y-8">
            {experiences.map((exp, idx) => (
              <motion.div
                key={`${exp.company}-${exp.title}`}
                custom={idx}
                variants={cardSlide}
                initial="hidden"
                whileInView="show"
                viewport={viewportCfg}
                style={prefersReducedMotion ? { opacity: 1, transform: "none" } : undefined}
              >
                <Card className="glass-card hover:shadow-glow transition-all duration-300">
                  {/* CHANGE: Reduced padding-bottom (pb-3 on mobile) */}
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
                      <div>
                        <CardTitle className="text-lg sm:text-xl mb-1 sm:mb-2">{exp.title}</CardTitle>
                        <div className="flex flex-wrap items-center gap-x-2">
                          <h4 className="text-base sm:text-lg font-semibold text-accent">{exp.company}</h4>
                          {exp.collaboration && (
                            <span className="text-sm sm:text-base text-muted-foreground">{exp.collaboration}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
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

                  <CardContent className="pt-0">
                    <motion.ul
                      variants={listParent}
                      initial="hidden"
                      whileInView="show"
                      viewport={viewportCfg}
                      // CHANGE: Tighter spacing for list items on mobile (space-y-2)
                      className="space-y-2 sm:space-y-3.5"
                    >
                      {exp.achievements.map((achievement) => (
                        <motion.li
                          key={achievement}
                          variants={listItem}
                          className="flex items-start gap-3"
                          style={prefersReducedMotion ? { opacity: 1, transform: "none" } : undefined}
                        >
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {achievement}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-4">
                      {exp.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hackathon Achievements */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Hackathon Achievement</h3>

          <div className="grid gap-6">
            {hackathonAchievements.map((achievement, idx) => (
              <motion.div
                key={`${achievement.title}-${achievement.year}`}
                custom={idx}
                variants={achvCard}
                initial="hidden"
                whileInView="show"
                viewport={viewportCfg}
                style={prefersReducedMotion ? { opacity: 1, transform: "none" } : undefined}
              >
                <Card className="glass-card hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-5 sm:p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-accent to-purple p-2.5 sm:p-3 rounded-lg shrink-0">
                        <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                          <h4 className="text-base sm:text-lg font-semibold">{achievement.title}</h4>
                          <Badge variant="secondary" className="bg-purple/10 text-purple">
                            {achievement.achievement}
                          </Badge>
                          <Badge variant="outline">{achievement.year}</Badge>
                        </div>

                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
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