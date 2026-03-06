import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticleCanvas from "@/components/ParticleCanvas";

const Index = () => {
  useEffect(() => {
    // Enforce dark mode on page load
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "hsl(222, 47%, 4%)" }}
    >
      {/* Particle canvas fixed behind everything (z-index 0) */}
      <ParticleCanvas />

      {/* All content sits above canvas (z-index 2 set per section) */}
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
