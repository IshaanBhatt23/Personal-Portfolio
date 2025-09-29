import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download, MapPin } from "lucide-react";
import ishaanProfile from "@/assets/ishaan-profile.jpg";
import waveformBg from "@/assets/waveform-bg.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Background Waveform */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src={waveformBg} 
          alt="" 
          className="w-full h-full object-cover animate-pulse"
        />
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(75)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Contact CTA - Top Right */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="fixed top-6 right-6 z-50" 
      >
        <a href="#contact">
          <Button variant="outline" size="sm" className="glass-card flex items-center gap-2">
            Contact <ChevronRight className="w-4 h-4" />
          </Button>
        </a>
      </motion.div>

      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-12 rounded-3xl max-w-4xl mx-auto backdrop-blur-lg"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
            className="mb-8"
          >
            <img
              src={ishaanProfile}
              alt="Portrait of Ishaan Bhatt, AI/ML engineer"
              className="w-32 h-32 rounded-full mx-auto object-cover shadow-glow ring-4 ring-accent/20"
            />
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="animated-title">Ishaan Bhatt</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-3xl font-semibold text-muted-foreground mb-8"
          >
            AI / ML Developer & Audio-Tech Enthusiast
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Building AI/ML models and audio experiences that solve real problems.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <a href="#projects">
              <Button size="lg" className="bg-gradient-to-r from-accent to-purple hover:scale-105 transition-transform flex items-center gap-2">
                View Work <ChevronRight className="w-5 h-5" />
              </Button>
            </a>
            
            <a href="/resume.pdf" download="Ishaan-Bhatt-Resume.pdf">
              <Button variant="outline" size="lg" className="hover:scale-105 transition-transform flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download Resume
              </Button>
            </a>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="space-y-2 text-sm text-muted-foreground"
          >
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Ahmedabad, Gujarat, India — UTC+05:30 (Asia/Kolkata)</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:ishaanbhatt2004@gmail.com" className="hover:text-accent transition-colors">
                ishaanbhatt2004@gmail.com
              </a>
              <span className="hidden sm:inline">•</span>
              <a href="tel:+919328435711" className="hover:text-accent transition-colors">
                +91 9328435711
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
