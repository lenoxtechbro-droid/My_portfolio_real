import { motion } from "framer-motion";
import SkillCard from "./SkillCard";

const Skills = () => {
  const skills = [
    { name: "Python", percentage: 85 },
    { name: "JavaScript", percentage: 70 },
    { name: "HTML/CSS/Tailwind", percentage: 90 },
    { name: "React", percentage: 60 },
    { name: "MySQL", percentage: 75 },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            My Skills
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Here are the technologies and tools I work with to build amazing
            projects
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {skills.map((skill, index) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              percentage={skill.percentage}
              delay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
