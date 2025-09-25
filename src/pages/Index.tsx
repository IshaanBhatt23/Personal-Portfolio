import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <main className="relative">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Ishaan Bhatt",
            "email": "ishaanbhatt2004@gmail.com",
            "telephone": "+919328435711",
            "jobTitle": "AI/ML Engineer",
            "alumniOf": "KIIT University",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Ahmedabad",
              "addressRegion": "Gujarat",
              "addressCountry": "India"
            },
            "sameAs": [
              "https://linkedin.com/in/ishaan-bhatt-110a93256",
              "https://github.com/IshaanBhatt23"
            ],
            "knowsAbout": [
              "Machine Learning",
              "Computer Vision",
              "Natural Language Processing",
              "Audio Processing",
              "Data Analytics",
              "Python Programming",
              "AWS Cloud Architecture"
            ]
          })
        }}
      />
      
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Education />
      <Contact />
    </main>
  );
};

export default Index;