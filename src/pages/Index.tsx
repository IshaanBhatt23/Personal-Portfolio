import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Contact from "../components/Contact";
import { NeuralNetworkBackground } from "@/components/NeuralNetworkBackground";
import { CustomCursor } from "@/components/CustomCursor";
import Chatbot from "@/components/Chatbot";
import FloatingTerminal from "@/components/FloatingTerminal"; // <--- IMPORT THIS

// SEO data for the Developer personality
const developerSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ishaan Bhatt",
  email: "ishaanbhatt2004@gmail.com",
  jobTitle: "AI/ML Engineer & Audio-Tech Enthusiast",
  alumniOf: "KIIT University",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: [
    "https://linkedin.com/in/ishaan-bhatt-110a93256",
    "https://github.com/IshaanBhatt23",
  ],
  knowsAbout: [
    "Machine Learning",
    "Computer Vision",
    "Natural Language Processing",
    "Audio Processing",
    "Data Analytics",
    "Python Programming",
    "TensorFlow",
    "PyTorch",
  ],
} as const;

// SEO data for the Music personality
const musicianSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ishaan Bhatt",
  email: "ishaanbhatt2004@gmail.com",
  jobTitle: "Beatboxer & Emotional EDM Producer",
  alumniOf: "KIIT University",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.youtube.com/@ishaanbhatt", 
    "https://soundcloud.com/ishaanbhatt",
  ],
  knowsAbout: [
    "Beatboxing",
    "Loopstation Performance",
    "Music Production",
    "FL Studio",
    "Sound Design",
    "Electronic Dance Music",
  ],
} as const;

const Index = () => {
  // Persona toggle
  const [isMusicMode, setIsMusicMode] = useState(false);
  const [activeSchema, setActiveSchema] = useState(developerSchema);

  // Environment flags for mobile & motion
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Update schema when persona changes
  useEffect(() => {
    setActiveSchema(isMusicMode ? musicianSchema : developerSchema);
  }, [isMusicMode]);

  // Detect touch + reduced motion (mirrors classes set in index.html)
  useEffect(() => {
    const touch =
      "ontouchstart" in window || (navigator as any).maxTouchPoints > 0;
    setIsTouch(touch);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return (
    // CHANGE 1: Reduced padding on mobile (px-3) to give content more width
    <div className="relative container mx-auto px-3 sm:px-6 lg:px-8">
      {/* Dynamic Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(activeSchema) }}
      />

      {/* Background (disable on touch / reduced motion for mobile perf) */}
      {!isTouch && !prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10"
        >
          <NeuralNetworkBackground />
        </div>
      )}

      {/* Page sections */}
      {/* CHANGE 2: Changed space-y-20 to space-y-10. 
          This reduces the gap between sections from 80px to 40px on mobile. 
          Desktop spacing (sm and lg) remains untouched. */}
      <div className="relative z-0 space-y-10 sm:space-y-24 lg:space-y-32">
        {/* Pass persona controls to Hero; About reads persona only */}
        <Hero isMusicMode={isMusicMode} setIsMusicMode={setIsMusicMode} />
        <About isMusicMode={isMusicMode} />

        {/* Static sections */}
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <Contact />
        
        {/* Floating Widgets */}
        <Chatbot />
        <FloatingTerminal /> {/* <--- ADDED HERE */}
      </div>

      {/* Fancy cursor only on non-touch and when motion is allowed */}
      {!isTouch && !prefersReducedMotion && (
        <CustomCursor isMusicMode={isMusicMode} />
      )}
    </div>
  );
};

export default Index;