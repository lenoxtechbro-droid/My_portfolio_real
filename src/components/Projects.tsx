import { motion, useInView } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useRef } from "react";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const projects = [
    {
      title: "Community Page",
      description:
        "A community platform with user authentication, admin dashboards, and interactive features. Built with a modern UI to connect and manage community members effectively.",
      image: "/projects/community-page/login page.png",
      tools: ["React", "FastAPI", "Supabase"],
      featured: true,
      gallery: [
        { src: "/projects/community-page/login page.png", label: "Login Page" },
        { src: "/projects/community-page/Admin Home dashbord.png", label: "Admin Home Dashboard" },
      ],
    },
    {
      title: "School Dashboard",
      description:
        "Comprehensive school management system with role-based dashboards for administrators, teachers, and students. Features include fee tracking, authentication, and password management.",
      image: "/projects/school-dashboard/HomeAdmin dashbord.png",
      tools: ["React", "FastAPI", "MySQL"],
      featured: false,
      gallery: [
        { src: "/projects/school-dashboard/HomeAdmin dashbord.png", label: "Home Admin Dashboard" },
        { src: "/projects/school-dashboard/Admin authentication.png", label: "Admin Authentication" },
        { src: "/projects/school-dashboard/Admin dashboard.png", label: "Admin Dashboard" },
        { src: "/projects/school-dashboard/teacher dasboard.png", label: "Teacher Dashboard" },
        { src: "/projects/school-dashboard/student dashboard.png", label: "Student Dashboard" },
        { src: "/projects/school-dashboard/student fees.png", label: "Student Fees" },
        { src: "/projects/school-dashboard/change password.png", label: "Change Password" },
      ],
    },
    {
      title: "AI Project — LNX Assistant",
      description:
        "An intelligent AI assistant with voice interaction capabilities and machine learning data analysis. Features EDA visualizations, real-time listening, processing, and response generation.",
      image: "/projects/ai-project/LNX listening.png",
      tools: ["React", "FastAPI", "Supabase"],
      featured: false,
      gallery: [
        { src: "/projects/ai-project/LNX listening.png", label: "LNX Listening" },
        { src: "/projects/ai-project/LNX processing.png", label: "LNX Processing" },
        { src: "/projects/ai-project/LNX response.png", label: "LNX Response" },
        { src: "/projects/ai-project/EDA charts.png", label: "EDA Charts" },
        { src: "/projects/ai-project/EDA for ML data.png", label: "EDA for ML Data" },
      ],
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
