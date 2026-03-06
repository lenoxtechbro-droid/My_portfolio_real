import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { useRef } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tools: string[];
  link?: string;
  github?: string;
  delay?: number;
  featured?: boolean;
}

const toolColors: Record<string, string> = {
  React: "#61dafb",
  TailwindCSS: "#38bdf8",
  "Framer Motion": "#a78bfa",
  Django: "#34d399",
  MySQL: "#60a5fa",
  Python: "#818cf8",
  Pandas: "#fb923c",
  n8n: "#f472b6",
  TypeScript: "#60a5fa",
  "Node.js": "#4ade80",
};

const ProjectCard = ({
  title,
  description,
  image,
  tools,
  link = "#",
  delay = 0,
  featured = false,
}: ProjectCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: delay * 0.12, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -6 }}
      className={`glass-card rounded-2xl overflow-hidden group relative ${featured ? "md:col-span-2" : ""}`}
      style={{ transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease" }}
    >
      {/* Image section */}
      <div className={`relative overflow-hidden ${featured ? "h-64" : "h-48"}`}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to top, rgba(10,14,26,0.95) 0%, rgba(10,14,26,0.3) 60%, transparent 100%)",
          }}
        />
        {/* Featured badge */}
        {featured && (
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-inter font-bold uppercase tracking-wider"
            style={{
              background: "rgba(96,165,250,0.15)",
              border: "1px solid rgba(96,165,250,0.35)",
              color: "#93c5fd",
              backdropFilter: "blur(8px)",
            }}
          >
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3
          className="text-xl font-syne font-bold group-hover:text-blue-300 transition-colors duration-300"
          style={{ color: "rgba(226,232,240,0.95)" }}
        >
          {title}
        </h3>
        <p
          className="text-sm font-inter leading-relaxed line-clamp-3"
          style={{ color: "rgba(148,163,184,0.7)" }}
        >
          {description}
        </p>

        {/* Tool badges */}
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className="px-2.5 py-1 text-[10px] font-inter font-bold uppercase tracking-wide rounded-full"
              style={{
                background: `${toolColors[tool] ?? "#94a3b8"}15`,
                border: `1px solid ${toolColors[tool] ?? "#94a3b8"}30`,
                color: toolColors[tool] ?? "#94a3b8",
              }}
            >
              {tool}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <MagneticButton className="flex-1">
            <a href={link} target="_blank" rel="noopener noreferrer" className="w-full">
              <button
                className="w-full h-10 px-4 rounded-xl text-sm font-inter font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  color: "white",
                  boxShadow: "0 0 20px rgba(96,165,250,0.3)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 32px rgba(96,165,250,0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(96,165,250,0.3)";
                }}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View Project
              </button>
            </a>
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
