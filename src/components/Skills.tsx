import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2, Database, Globe, Cpu, GitBranch, Layers, Terminal, Zap
} from "lucide-react";

interface SkillData {
  name: string;
  percentage: number;
  icon: React.ElementType;
  color: string;
  category: string;
  featured?: boolean;
}

const skills: SkillData[] = [
  { name: "Python", percentage: 85, icon: Terminal, color: "#3b82f6", category: "Backend", featured: true },
  { name: "React", percentage: 72, icon: Layers, color: "#818cf8", category: "Frontend", featured: true },
  { name: "HTML/CSS/Tailwind", percentage: 92, icon: Globe, color: "#38bdf8", category: "Frontend" },
  { name: "JavaScript", percentage: 70, icon: Zap, color: "#facc15", category: "Frontend" },
  { name: "TypeScript", percentage: 60, icon: Code2, color: "#60a5fa", category: "Frontend" },
  { name: "Supabase", percentage: 75, icon: Database, color: "#34d399", category: "Database" },
  { name: "Django / FastAPI", percentage: 67, icon: Cpu, color: "#fb7185", category: "Backend" },
  { name: "n8n / Automation", percentage: 80, icon: GitBranch, color: "#f472b6", category: "Automation", featured: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const SkillBentoCard = ({ skill, index }: { skill: SkillData; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = skill.icon;
  
  // Calculate circle properties
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = isInView ? circumference - (skill.percentage / 100) * circumference : circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={`glass-card rounded-2xl p-5 group relative overflow-hidden cursor-default ${skill.featured ? "md:col-span-1 row-span-1" : ""}`}
      style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
    >
      {/* Subtle ambient glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${skill.color}18, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon + Category */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="p-2.5 rounded-xl"
            style={{
              background: `${skill.color}18`,
              border: `1px solid ${skill.color}30`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color: skill.color }} />
          </div>
          <span
            className="text-[10px] font-inter font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
            style={{
              background: `${skill.color}12`,
              color: `${skill.color}cc`,
              border: `1px solid ${skill.color}22`,
            }}
          >
            {skill.category}
          </span>
        </div>

        {/* Skill name */}
        <h3
          className="text-base font-syne font-bold mb-3"
          style={{ color: "rgba(226,232,240,0.95)" }}
        >
          {skill.name}
        </h3>

        {/* Circular Progress Ring */}
        <div className="flex items-center justify-center">
          <div className="relative w-14 h-14">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 44 44">
              {/* Background circle */}
              <circle
                cx="22"
                cy="22"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="4"
              />
              {/* Progress circle */}
              <motion.circle
                cx="22"
                cy="22"
                r={radius}
                fill="none"
                stroke={skill.color}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={isInView ? { strokeDashoffset: offset } : {}}
                transition={{ duration: 1.2, delay: 0.3 + index * 0.07, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  filter: `drop-shadow(0 0 6px ${skill.color}60)`,
                }}
              />
            </svg>
            {/* Percentage text in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.07 }}
                className="text-xs font-syne font-bold"
                style={{ color: skill.color }}
              >
                {skill.percentage}%
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="skills" className="py-24 px-4" style={{ position: "relative", zIndex: 2 }}>
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

        {/* Bento grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
        >
          {skills.map((skill, index) => (
            <SkillBentoCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
