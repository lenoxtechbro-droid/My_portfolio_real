import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2, Database, Globe, Cpu, GitBranch, Layers, Terminal, Zap
} from "lucide-react";
import { InfiniteSlider } from "@/components/ui/infinite-slider-horizontal";

interface SkillData {
  name: string;
  icon: React.ElementType;
  color: string;
  category: string;
}

const skills: SkillData[] = [
  { name: "Python", icon: Terminal, color: "#3b82f6", category: "Backend" },
  { name: "React", icon: Layers, color: "#818cf8", category: "Frontend" },
  { name: "Tailwind", icon: Globe, color: "#38bdf8", category: "Frontend" },
  { name: "JavaScript", icon: Zap, color: "#facc15", category: "Frontend" },
  { name: "TypeScript", icon: Code2, color: "#60a5fa", category: "Frontend" },
  { name: "Supabase", icon: Database, color: "#34d399", category: "Database" },
  { name: "Django", icon: Cpu, color: "#fb7185", category: "Backend" },
  { name: "FastAPI", icon: Terminal, color: "#10b981", category: "Backend" },
  { name: "n8n", icon: GitBranch, color: "#f472b6", category: "Automation" },
  { name: "Automation", icon: Zap, color: "#f59e0b", category: "Automation" },
];

const SkillItem = ({ skill }: { skill: SkillData }) => {
  const Icon = skill.icon;
  return (
    <div 
      className="glass-card flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all duration-300 hover:scale-105 group"
      style={{ 
        background: "rgba(255,255,255,0.03)",
        borderColor: "rgba(255,255,255,0.08)"
      }}
    >
      <div 
        className="p-3 rounded-xl transition-all duration-300 group-hover:bg-opacity-20"
        style={{ 
          background: `${skill.color}15`,
          border: `1px solid ${skill.color}30`
        }}
      >
        <Icon className="w-6 h-6" style={{ color: skill.color }} />
      </div>
      <div>
        <p className="text-sm font-syne font-bold" style={{ color: "rgba(226,232,240,0.95)" }}>
          {skill.name}
        </p>
        <p className="text-[10px] uppercase tracking-widest font-inter font-medium" style={{ color: "rgba(148,163,184,0.6)" }}>
          {skill.category}
        </p>
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section id="skills" className="py-24 px-4 overflow-hidden" ref={sectionRef}>
      <div className="container mx-auto mb-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-center"
        >
          <span
            className="inline-block mb-4 text-xs font-inter font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(96,165,250,0.08)",
              border: "1px solid rgba(96,165,250,0.2)",
              color: "#93c5fd",
            }}
          >
            My Arsenal
          </span>
          <h2 className="text-4xl md:text-6xl font-syne font-black mb-4">
            <span className="gradient-text-animated">Skills & Expertise</span>
          </h2>
          <p
            className="text-base font-inter max-w-xl mx-auto"
            style={{ color: "rgba(148,163,184,0.65)" }}
          >
            Technologies and tools I wield to craft world-class digital experiences
          </p>
        </motion.div>
      </div>

      {/* Infinite Sliders */}
      <div className="space-y-8 py-4">
        <InfiniteSlider duration={40} gap={24} durationOnHover={80}>
          {skills.map((skill, index) => (
            <SkillItem key={`row1-${index}`} skill={skill} />
          ))}
        </InfiniteSlider>

        <InfiniteSlider duration={35} gap={24} reverse durationOnHover={70}>
          {skills.slice().reverse().map((skill, index) => (
            <SkillItem key={`row2-${index}`} skill={skill} />
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
};

export default Skills;
