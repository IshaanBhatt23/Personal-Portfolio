import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Award, ExternalLink } from "lucide-react";

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
      type: "High School"
    },
    {
      institution: "Nirman High School",
      type: "Secondary School"
    }
  ];

  const certifications = [
    {
      title: "Google AI Essentials",
      issuer: "Google",
      date: "Aug 2025",
      badge: "google-ai"
    },
    {
      title: "IBM AI Product Manager",
      issuer: "IBM",
      date: "Aug 2025",
      badge: "ibm-ai"
    },
    {
      title: "Machine Learning",
      issuer: "Columbia University",
      date: "Aug 2025",
      badge: "columbia-ml"
    },
    {
      title: "Data Science Professional",
      issuer: "IBM",
      date: "Aug 2025",
      badge: "ibm-ds"
    },
    {
      title: "Business Analytics",
      issuer: "University of Colorado Boulder",
      date: "Jan 2025",
      badge: "cu-analytics"
    },
    {
      title: "Strategy & Game Theory",
      issuer: "IIM Ahmedabad",
      date: "Jan 2025",
      badge: "iim-strategy"
    }
  ];

  return (
    <section id="education" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Continuous learning in AI/ML, data science, and business analytics
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Primary Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-accent" />
              Current Education
            </h3>
            
            {education.map((edu, index) => (
              <Card key={index} className="glass-card hover:shadow-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2">{edu.degree}</h4>
                      <p className="text-lg text-accent font-medium mb-2">{edu.institution}</p>
                      <p className="text-muted-foreground">{edu.location}</p>
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
              <div className="grid sm:grid-cols-2 gap-4">
                {previousEducation.map((school, index) => (
                  <Card key={index} className="glass-card">
                    <CardContent className="p-4">
                      <h5 className="font-medium">{school.institution}</h5>
                      <p className="text-sm text-muted-foreground">{school.type}</p>
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
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Award className="w-6 h-6 text-purple" />
              Professional Certifications
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="glass-card h-full hover:shadow-glow transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{cert.title}</CardTitle>
                          <p className="text-accent font-medium">{cert.issuer}</p>
                        </div>
                        <Badge variant="outline">{cert.date}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="w-12 h-12 bg-gradient-to-r from-accent to-purple rounded-lg flex items-center justify-center">
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-center mt-8"
            >
              <Card className="glass-card p-6">
                <h4 className="text-lg font-semibold mb-4">Certificate Viewer</h4>
                <p className="text-muted-foreground mb-4">
                  View all certificates and credentials in detail
                </p>
                <Button variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View All Certificates
                </Button>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Education;