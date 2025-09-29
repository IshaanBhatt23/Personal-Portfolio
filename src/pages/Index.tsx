import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Skills from "../components/Skills";
import Education from "../components/Education";
import Contact from "../components/Contact";

// SEO data for the Developer personality
const developerSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ishaan Bhatt",
  "email": "ishaanbhatt2004@gmail.com",
  "jobTitle": "AI/ML Engineer & Audio-Tech Enthusiast",
  "alumniOf": "KIIT University",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ahmedabad",
    "addressRegion": "Gujarat",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://linkedin.com/in/ishaan-bhatt-110a93256",
    "https://github.com/IshaanBhatt23"
  ],
  "knowsAbout": [
    "Machine Learning", "Computer Vision", "Natural Language Processing", 
    "Audio Processing", "Data Analytics", "Python Programming", "TensorFlow", "PyTorch"
  ]
};

// SEO data for the Music personality
const musicianSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Ishaan Bhatt",
  "email": "ishaanbhatt2004@gmail.com",
  "jobTitle": "Beatboxer & Emotional EDM Producer",
  "alumniOf": "KIIT University",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ahmedabad",
    "addressRegion": "Gujarat",
    "addressCountry": "IN"
  },
  "sameAs": [
    "https://www.youtube.com/@ishaanbhatt", // Placeholder, change to your actual music links
    "https://soundcloud.com/ishaanbhatt" // Placeholder
  ],
  "knowsAbout": [
    "Beatboxing", "Loopstation Performance", "Music Production", 
    "FL Studio", "Sound Design", "Electronic Dance Music"
  ]
};


const Index = () => {
  // State to manage which personality is active
  const [isMusicMode, setIsMusicMode] = useState(false);
  // State to manage the active SEO schema
  const [activeSchema, setActiveSchema] = useState(developerSchema);

  // Effect to update the schema when the mode changes
  useEffect(() => {
    setActiveSchema(isMusicMode ? musicianSchema : developerSchema);
  }, [isMusicMode]);

  return (
    <main className="relative">
      {/* Dynamic Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(activeSchema) }}
      />
      
      {/* Pass state and setter down to the Hero component */}
      <Hero isMusicMode={isMusicMode} setIsMusicMode={setIsMusicMode} />
      
      {/* Pass state down ONLY to the About component */}
      <About isMusicMode={isMusicMode} />

      {/* All other sections are static */}
      <Projects />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </main>
  );
};

export default Index;