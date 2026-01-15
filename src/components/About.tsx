import { motion } from "framer-motion";
import { Code2, Brain, Rocket, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Full-Stack Developer",
      description: "Building responsive web applications with modern technologies",
    },
    {
      icon: Brain,
      title: "AI Enthusiast",
      description: "Passionate about intelligent systems",
    },
    {
      icon: Rocket,
      title: "Problem Solver",
      description: "Creating efficient solutions for complex challenges",
    },
    {
      icon: Award,
      title: "Continuous Learner",
      description: "Always exploring new technologies and methodologies",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get to know more about my journey and aspirations
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 bg-card border-border shadow-lg">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I'm a passionate Computer Science student with a deep interest in
                artificial intelligence and automation engineering. My journey in
                tech began with a curiosity about how things work, which quickly
                evolved into a love for building innovative solutions that make a
                difference.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Currently, I'm focused on mastering AI technologies and automation
                systems while building practical projects that solve real-world
                problems. My goal is to become a leading AI engineer who creates
                intelligent systems that enhance human capabilities and streamline
                complex processes. I believe in continuous learning and staying at
                the forefront of technological innovation.
              </p>
            </Card>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="p-6 bg-card border-border hover:shadow-glow transition-all duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-gradient-primary rounded-lg group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
