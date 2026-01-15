import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projects = [
    {
      title: "Portfolio Website Generator",
      description:
        "Modern portfolio builder with customizable templates, drag-and-drop interface, and responsive design for developers and creatives.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
      tools: ["React", "TailwindCSS", "Framer Motion"],
      link: "https://vm.tiktok.com/ZMHo8VgDyNwpA-U93p8/",
    },
    {
      title: "E-Commerce Dashboard",
      description:
        "Full-stack e-commerce analytics dashboard with real-time data visualization, inventory management, and sales tracking features.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      tools: ["React", "Django", "MySQL"],
      link: "#",
    },
    {
      title: "Task Automation Suite",
      description:
        "Python-based automation toolkit for streamlining repetitive tasks, including web scraping, data processing, and report generation.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80",
      tools: ["Python", "Pandas","n8n"],
      link: "#",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my recent work in web development, AI, and automation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} {...project} delay={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
