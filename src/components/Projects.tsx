import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useRef } from "react";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const projects = [
    {
      title: "Portfolio Website Generator",
      description:
        "A modern, full-featured portfolio builder with customizable templates, drag-and-drop interface, and fully responsive design for developers and creatives. Built live and showcased on TikTok.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
      tools: ["React", "Django", "SQL"],
      link: "https://vm.tiktok.com/ZMHo8VgDyNwpA-U93p8/",
      featured: true,
    },
    {
      title: "E-Commerce Dashboard",
      description:
        "Full-stack analytics dashboard with real-time data visualization, inventory management, and advanced sales tracking across multiple storefronts.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      tools: ["React", "Django", "Supabase"],
      link: "#",
      featured: false,
    },
    {
      title: "Task Automation Suite",
      description:
        "Python-based automation toolkit for eliminating repetitive workflows: web scraping, data processing, report generation, and n8n orchestration pipelines.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
      tools: ["Python", "n8n","zappier"],
      link: "#",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-24 px-4" style={{ position: "relative", zIndex: 2 }}>
      <div className="container mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16"
        >
          <span
            className="inline-block mb-4 text-xs font-inter font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.2)",
              color: "#c4b5fd",
            }}
          >
            Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-syne font-black mb-4">
            <span className="gradient-text-animated">Featured Projects</span>
          </h2>
          <p
            className="text-base font-inter max-w-xl mx-auto"
            style={{ color: "rgba(148,163,184,0.65)" }}
          >
            A curated showcase of my work in web development, AI, and automation
          </p>
        </motion.div>

        {/* Bento grid: first project spans 2 cols on desktop */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              {...project}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
