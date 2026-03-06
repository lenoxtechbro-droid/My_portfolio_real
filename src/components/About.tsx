import { motion, useInView } from "framer-motion";
import { Code2, Brain, Rocket, Award } from "lucide-react";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const highlights = [
    {
      icon: Code2,
      title: "Full-Stack Developer",
      description: "Building performant, responsive web apps with modern stacks end-to-end.",
      color: "#60a5fa",
    },
    {
      icon: Brain,
      title: "AI Enthusiast",
      description: "Exploring intelligent systems, automation, and machine learning pipelines.",
      color: "#818cf8",
    },
    {
      icon: Rocket,
      title: "Problem Solver",
      description: "Tackling complex challenges with creative, efficient engineering solutions.",
      color: "#a78bfa",
    },
    {
      icon: Award,
      title: "Continuous Learner",
      description: "Always at the frontier—exploring new technologies and methodologies daily.",
      color: "#34d399",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
  };

  return (
    <section id="about" className="py-24 px-4" style={{ position: "relative", zIndex: 2 }}>
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
              background: "rgba(52,211,153,0.08)",
              border: "1px solid rgba(52,211,153,0.2)",
              color: "#6ee7b7",
            }}
          >
            Who I Am
          </span>
          <h2 className="text-4xl md:text-6xl font-syne font-black mb-4">
            <span className="gradient-text-animated">About Me</span>
          </h2>
          <p
            className="text-base font-inter max-w-xl mx-auto"
            style={{ color: "rgba(148,163,184,0.65)" }}
          >
            My journey, motivations, and what drives me to build the future
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {/* Bio card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            <div
              className="glass-card rounded-2xl p-8 relative overflow-hidden"
            >
              {/* Decorative gradient spot */}
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-20"
                style={{
                  background: "radial-gradient(circle, #60a5fa, transparent 70%)",
                  filter: "blur(30px)",
                }}
              />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-1 h-10 rounded-full"
                    style={{ background: "linear-gradient(180deg, #60a5fa, #818cf8)" }}
                  />
                  <h3 className="text-xl font-syne font-bold" style={{ color: "rgba(226,232,240,0.95)" }}>
                    My Story
                  </h3>
                </div>
                <p
                  className="text-base font-inter leading-relaxed mb-5"
                  style={{ color: "rgba(148,163,184,0.8)" }}
                >
                  I'm a passionate Computer Science student with a deep interest in artificial intelligence and
                  automation engineering. My journey in tech began with a curiosity about how things work, which
                  quickly evolved into a love for building innovative solutions that make a real difference.
                </p>
                <p
                  className="text-base font-inter leading-relaxed"
                  style={{ color: "rgba(148,163,184,0.8)" }}
                >
                  Currently, I'm focused on mastering AI technologies and automation systems while building
                  practical projects that solve real-world problems. My goal is to become a leading AI engineer
                  who creates intelligent systems that enhance human capabilities and streamline complex processes.
                  I believe in continuous learning and staying at the forefront of technological innovation.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Highlights Bento grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-4"
          >
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="glass-card rounded-2xl p-6 group relative overflow-hidden cursor-default"
                  style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 0% 0%, ${item.color}14, transparent 70%)`,
                    }}
                  />
                  <div className="relative z-10 flex items-start gap-4">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}30`,
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3
                        className="text-base font-syne font-bold mb-1.5"
                        style={{ color: "rgba(226,232,240,0.95)" }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm font-inter leading-relaxed"
                        style={{ color: "rgba(148,163,184,0.7)" }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
