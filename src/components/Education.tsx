import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Award, ChevronDown } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "B.Tech Computer Science",
      institution: "KIIT University",
      period: "2022 – 2026",
      status: "Final Year",
      location: "Bhubaneswar, India"
    }
  ];

  const previousEducation = [
    {
      institution: "Puna International School",
      type: "High School",
      period: "2020-2022",
      location: "Ahmedabad, India"
    },
    {
      institution: "Nirman High School",
      type: "Secondary School",
      period: "2012-2020",
      location: "Ahmedabad, India"
    }
  ];

  const certifications = [
    // These 6 will be shown by default
    {
      title: "IBM AI Product Manager Specialization",
      issuer: "IBM",
      date: "Aug 2025",
      credentialId: "BVB7HW12W969",
      skills: ["Innovation", "Prompt engineering", "Product Strategy", "Prompt Patterns", "Product Roadmaps", "Generative AI", "Product Planning", "New Product Development", "Artificial Intelligence", "Usability Testing", "Project Management Life Cycle", "OpenAI"]
    },
    {
      title: "Machine Learning",
      issuer: "Columbia University",
      date: "Aug 2025",
      credentialId: "402b927e-11ef-4c78-a6cc-9d4252a56bb7",
      skills: ["Linear Regression", "Data Classification", "Clustering", "Dimensionality Reduction", "Data Analysis", "Data Manipulation"]
    },
    {
      title: "Strategy and Game Theory for Management",
      issuer: "IIMA - IIM Ahmedabad",
      date: "Jan 2025",
      credentialId: "ESC05PTBJZCQ",
      skills: ["Innovation", "Risk Management", "Business Strategy", "Game Theory", "Business Analysis", "Behavioral Economics", "Problem Solving", "Mergers & Acquisitions", "Organizational Change", "Economics", "Critical Thinking", "Strategic Thinking"]
    },
    {
      title: "Statistics and Clustering in Python",
      issuer: "IBM",
      date: "Aug 2025",
      credentialId: "KI5V6S599AVD",
      skills: ["Data Manipulation", "Data Science", "Data Analysis", "Descriptive Statistics", "Probability & Statistics"]
    },
    {
      title: "Problems, Algorithms and Flowcharts",
      issuer: "IBM",
      date: "Aug 2025",
      credentialId: "8FQ2F596AQ4I",
      skills: ["Computational Thinking", "Program Development", "Algorithms", "Computer Science", "Pseudocode", "Data Structures"]
    },
    {
      title: "Python for Data Science, AI & Development",
      issuer: "IBM",
      date: "Aug 2025",
      credentialId: "NLVRTTHJTTMZ",
      skills: ["Web Scraping", "Data Analysis", "Computer Programming", "Data Manipulation", "Data Processing", "Programming Principles", "Numpy", "Data Import/Export", "Scripting", "Jupyter", "Automation", "Pandas (Python Package)"]
    },
    // --- Certifications below this line will be hidden initially ---
    {
        title: "Data Science Orientation",
        issuer: "IBM",
        date: "Aug 2025",
        credentialId: "0427bb1e-0941-4285-b5d2-f539e6a2bc04",
        skills: ["Data Analysis", "Machine Learning", "AI", "Digital Transformation", "Deep Learning", "Cloud Computing", "Data Literacy", "Big Data", "Data Mining", "Data-driven Decision Making"]
    },
    {
        title: "Data Science Project Capstone: Predicting Bicycle Rental",
        issuer: "University of London",
        date: "Aug 2025",
        credentialId: "4WY8MZ5CYBQ2",
        skills: ["Correlation Analysis", "Exploratory Data Analysis", "Data Analysis", "Data Science", "Time Series Analysis and Forecasting", "Forecasting", "Predictive Modeling", "Regression Analysis", "Statistical Modeling", "Data-Driven Decision-Making", "Data Collection"]
    },
    {
        title: "Discover the Art of Prompting",
        issuer: "Google",
        date: "Aug 2025",
        credentialId: "RQVX6EIKVHD9",
        skills: ["Prompt Engineering", "Prompt Patterns", "LLM Application", "Large Language Modeling", "Content Creation"]
    },
    {
        title: "Generative AI: Foundation Models and Platforms",
        issuer: "IBM",
        date: "Aug 2025",
        credentialId: "SPB2XRO1FC4Z",
        skills: ["Prompt Engineering", "OpenAI", "Deep Learning", "Responsible AI", "Generative Model Architectures", "Natural Language Processing", "Generative AI", "LLM Application", "Large Language Modeling"]
    },
    {
        title: "Generative AI: Introduction and Applications",
        issuer: "IBM",
        date: "Aug 2025",
        credentialId: "E1NDILD2UGSI",
        skills: ["Artificial Intelligence and Machine Learning (AI/ML)", "Responsible AI", "Generative AI", "Machine Learning", "ChatGPT"]
    },
    {
        title: "Generative AI: Prompt Engineering Basics",
        issuer: "IBM",
        date: "Aug 2025",
        credentialId: "PDWMLVPVHPAN",
        skills: ["Prompt Engineering", "Prompt Patterns", "Generative AI", "ChatGPT"]
    },
    {
        title: "Generative AI: Supercharge Your Product Management Career",
        issuer: "SkillUp Online",
        date: "Aug 2025",
        credentialId: "71C0T7YIFC3L",
        skills: ["Prompt Engineering", "Product Lifecycle Management", "Responsible AI", "Product Management", "Generative AI", "Customer experience improvement", "Google Gemini", "AI Product Strategy", "ChatGPT", "Digital Transformation", "Microsoft Copilot"]
    },
    {
        title: "Google AI Essentials Specialization",
        issuer: "Google",
        date: "Aug 2025",
        credentialId: "QYZX68S1RFBK",
        skills: ["Innovation", "Prompt Engineering", "Emerging Technologies", "Prompt Patterns", "Generative AI", "Data Security", "Productivity Software", "Sociology", "Process Optimization", "Analysis", "Organizational Strategy", "Large Language Modeling"]
    },
    {
        title: "Introduction to AI",
        issuer: "Google",
        date: "Aug 2025",
        credentialId: "T6NGOQ8YURTU",
        skills: ["Innovation", "Critical Thinking", "Responsible AI", "Generative AI", "AI Product Strategy", "Machine Learning"]
    },
    {
        title: "Introduction to Applied Business Analytics",
        issuer: "University of Illinois Urbana-Champaign",
        date: "Aug 2025",
        credentialId: "FQJMLC4CJ0GM",
        skills: ["Analytics", "Data Presentation", "Data Analysis", "Business Analysis", "Data-Driven Decision-Making", "Python Programming"]
    },
    {
        title: "Introduction to Artificial Intelligence (AI)",
        issuer: "IBM",
        date: "Aug 2025",
        credentialId: "IU893O8FXIXT",
        skills: ["Responsible AI", "Natural Language Processing", "Generative AI", "Business Intelligence", "Risk Mitigation", "Content Creation"]
    },
    {
        title: "Introduction to Business Analytics: Communicating with Data",
        issuer: "University of Illinois Urbana-Champaign",
        date: "Aug 2025",
        credentialId: "C18W7E2YTEC6",
        skills: ["Digital Marketing", "Data Analysis", "Data Storytelling", "Infographics", "Data-Driven Decision-Making", "Business Analytics", "Analytical Skills", "Data Collection", "Analytics", "Data Quality", "Data Presentation", "Data Visualization"]
    },
    {
        title: "Maximize Productivity With AI Tools",
        issuer: "Google",
        date: "Aug 2025",
        credentialId: "PTC43U9N3SJN",
        skills: ["Prompt Engineering", "Responsible AI", "Generative AI", "Business Workflow Analysis", "Productivity Software", "Process Optimization", "Human Computer Interaction", "Complex Problem Solving"]
    },
    {
        title: "Product Management: An Introduction",
        issuer: "IBM",
        date: "Aug 2025",
        credentialId: "Z9G0EYCSJ33I",
        skills: ["Cross-Functional Collaboration", "Product Strategy", "Product Lifecycle Management", "Project Management", "Product Management", "Stakeholder Management", "Product Development", "Value Propositions", "Portfolio Management", "Market Research", "Business Acumen"]
    },
    {
        title: "Product Management: Building AI-Powered Products",
        issuer: "SkillUp Online",
        date: "Aug 2025",
        credentialId: "5BEZ1K3M6C7K",
        skills: ["Product Lifecycle Management", "Product Management", "Return On Investment", "Technical Product Management", "Product Development", "Commercialization", "AI Product Strategy", "Stakeholder Communications", "Team Building", "Artificial Intelligence", "New Product Development"]
    },
    {
        title: "Product Management: Developing and Delivering a New Product",
        issuer: "SkillUp Online",
        date: "Aug 2025",
        credentialId: "7MXWNRHGCM92",
        skills: ["Product Requirements", "Product Roadmaps", "Market Research", "Product Planning", "New Product Development", "Market Analysis", "Usability Testing", "Product Lifecycle Management", "Product Management", "Stakeholder Management", "Stakeholder Analysis", "Product Development"]
    },
    {
        title: "Product Management: Foundations & Stakeholder Collaboration",
        issuer: "SkillUp Online",
        date: "Aug 2025",
        credentialId: "6KITH8Q67TI6",
        skills: ["Innovation", "Product Strategy", "Strategic Communication", "Business Development", "Product Planning", "New Product Development", "Market Analysis", "Product Lifecycle Management", "Product Management", "Stakeholder Management", "Stakeholder Engagement", "Leadership"]
    },
    {
        title: "Product Management: Initial Product Strategy and Plan",
        issuer: "SkillUp Online",
        date: "Aug 2025",
        credentialId: "IUE0J94LV8NL",
        skills: ["Financial Analysis", "Risk Management", "Product Strategy", "Product Roadmaps", "Marketing Strategies", "User Requirements Documents", "Agile Product Development", "Market Research", "Business Planning", "Product Planning", "Market Analysis", "New Product Development"]
    },
    {
        title: "Python Project for Data Science",
        issuer: "IBM",
        date: "Aug 2025",
        credentialId: "XQLXYJTNH1TO",
        skills: ["Web Scraping", "Jupyter", "Data Analysis", "Pandas (Python Package)", "Data Science", "Data Manipulation", "Data Processing", "Matplotlib", "Data Collection", "Dashboard", "Python Programming"]
    },
    {
        title: "Stay Ahead of the AI Curve",
        issuer: "Google",
        date: "Aug 2025",
        credentialId: "JEYERYDFSG9X",
        skills: ["Digital Transformation", "Innovation", "Emerging Technologies", "Responsible AI", "Workforce Development", "Strategic Thinking", "AI Product Strategy", "Organizational Strategy"]
    },
    {
        title: "The Data Science Profession – Student View",
        issuer: "IBM",
        date: "Aug 2025",
        credentialId: "LK62LWV0YAQX",
        skills: ["Data Analysis", "Data Science", "Applied Machine Learning", "Machine Learning Algorithms", "Machine Learning", "Unsupervised Learning"]
    },
    {
        title: "Tools for Data Science",
        issuer: "IBM",
        date: "Aug 2025",
        credentialId: "8ZXUMH724FGQ",
        skills: ["Machine Learning", "Data Science", "Github", "IBM Cloud", "Version Control"]
    },
    {
        title: "Use AI Responsibly",
        issuer: "Google",
        date: "Aug 2025",
        credentialId: "JSJT5DC99ZI0",
        skills: ["Critical Thinking", "Generative AI", "Data Security", "Sociology", "Analysis"]
    },
    {
        title: "Business Analytics for Decision Making",
        issuer: "University of Colorado Boulder",
        date: "Jan 2025",
        credentialId: "04CK75JNYU15",
        skills: ["Microsoft Excel", "Simulation and Simulation Software", "Data Analysis", "Business Modeling", "Predictive Analytics", "Decision Making", "Process Optimization", "Business Analytics", "Market Analysis", "Unsupervised Learning", "Risk Analysis"]
    },
    {
        title: "AWS Academy Cloud Architecting",
        issuer: "Amazon Web Services (AWS)",
        date: "Dec 2024",
        credentialId: "369e7279-74bd-44aa-add1-caf93eec8d15",
        skills: ["Amazon S3", "Amazon EC2", "Amazon RDS", "Amazon VPC", "Amazon CloudFront", "AWS Lambda", "AWS IAM"]
    },
    {
        title: "AWS Academy Cloud Foundations",
        issuer: "Amazon Web Services (AWS)",
        date: "Dec 2024",
        credentialId: "3a2c7d06-c042-4a3f-913b-f0bab659b1e9",
        skills: ["Cloud Computing"]
    },
  ];

  // State to manage whether the full list is shown
  const [isExpanded, setIsExpanded] = useState(false);

  // Determine which certifications to display
  const displayedCertifications = isExpanded ? certifications : certifications.slice(0, 6);

  return (
    // CHANGE: Reduced vertical padding (py-10 for mobile)
    <section id="education" className="py-10 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.1 }}
          transition={{ duration: 0.8 }}
          // CHANGE: Reduced margin bottom (mb-8 for mobile)
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Education & <span className="animated-title">Certifications</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Continuous learning in AI/ML, data science, and business analytics
          </p>
        </motion.div>

        {/* CHANGE: Reduced vertical spacing between sections (space-y-8 for mobile) */}
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          {/* Primary Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* CHANGE: Reduced margin bottom (mb-4 for mobile) */}
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 flex items-center gap-3">
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              Current Education
            </h3>
            
            {education.map((edu, index) => (
              <Card key={index} className="glass-card hover:shadow-glow transition-all duration-300">
                <CardContent className="p-5 md:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-lg md:text-xl font-semibold mb-2">{edu.degree}</h4>
                      <p className="text-base md:text-lg text-accent font-medium mb-2">{edu.institution}</p>
                      <p className="text-sm md:text-base text-muted-foreground">{edu.location}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant="outline" className="w-fit">{edu.period}</Badge>
                      <Badge variant="secondary" className="w-fit">{edu.status}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4">Previous Education</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {previousEducation.map((school, index) => (
                  <Card key={index} className="glass-card h-full">
                    <CardContent className="p-4 flex flex-col justify-between h-full">
                      <div>
                        <h5 className="font-medium">{school.institution}</h5>
                        <p className="text-sm text-muted-foreground">{school.type}</p>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        <span>{school.period} • {school.location}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* CHANGE: Reduced margin bottom (mb-4 for mobile) */}
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 flex items-center gap-3">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-purple" />
              Professional Certifications
            </h3>
            
            {/* CHANGE: Reduced grid gap (gap-4 for mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {displayedCertifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="glass-card h-full flex flex-col justify-between hover:shadow-glow transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <CardTitle className="text-base md:text-lg mb-2 leading-tight">{cert.title}</CardTitle>
                          <p className="text-sm text-accent font-medium">{cert.issuer}</p>
                        </div>
                        <Badge variant="outline" className="whitespace-nowrap text-xs">{cert.date}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-accent to-purple rounded-lg flex items-center justify-center">
                          <Award className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <div className="text-[10px] md:text-xs text-muted-foreground">
                          ID: {cert.credentialId}
                        </div>
                      </div>
                      {cert.skills && cert.skills.length > 0 && (
                        <div className="border-t border-white/10 pt-3">
                          <h4 className="text-xs font-semibold mb-2 text-muted-foreground">Skills:</h4>
                          <div className="flex flex-wrap gap-1.5 md:gap-2">
                            {cert.skills.slice(0, 5).map((skill, i) => (
                              <Badge key={i} variant="secondary" className="text-[10px] md:text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {cert.skills.length > 5 && (
                              <Badge variant="outline" className="text-[10px] md:text-xs">+{cert.skills.length - 5}</Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* "See More" Button */}
            {!isExpanded && certifications.length > 6 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                
                className="text-center mt-8"
              >
                <Button variant="outline" onClick={() => setIsExpanded(true)} className="hover:scale-105 transition-transform">
                  See All Certifications
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;