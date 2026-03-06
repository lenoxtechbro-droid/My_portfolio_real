import { motion, type Variants } from "framer-motion";
import { Download, Mail, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile.png";
import { useState, useEffect } from "react";
import MagneticButton from "@/components/MagneticButton";

const CV = "/LENOX_IRUNGU_CV.docx";

const roles = [
  "Future AI Engineer",
  "UI/UX Lead Developer",
  "Full-Stack Builder",
  "Automation Architect",
];

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleTyped, setRoleTyped] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const fullText = "Lenox";

  // Name typing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < fullText.length) {
          const newIndex = prev + 1;
          setTypedText(fullText.slice(0, newIndex));
          return newIndex;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 140);
    return () => clearInterval(interval);
  }, []);

  // Role typewriter loop
  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && roleTyped.length < currentRole.length) {
      timeout = setTimeout(() => setRoleTyped(currentRole.slice(0, roleTyped.length + 1)), 70);
    } else if (!isDeleting && roleTyped.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && roleTyped.length > 0) {
      timeout = setTimeout(() => setRoleTyped(currentRole.slice(0, roleTyped.length - 1)), 40);
    } else if (isDeleting && roleTyped.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [roleTyped, isDeleting, roleIndex]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-4"
      style={{ zIndex: 2 }}
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-7"
          >
            {/* Greeting badge */}
            <motion.div variants={itemVariants}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-inter font-semibold uppercase tracking-widest"
                style={{
                  background: "rgba(96, 165, 250, 0.1)",
                  border: "1px solid rgba(96, 165, 250, 0.25)",
                  color: "#93c5fd",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
                />
                Available for Work
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <p
                className="text-sm font-inter font-medium mb-2"
                style={{ color: "rgba(148, 163, 184, 0.7)" }}
              >
                Hello, I'm
              </p>
              <h1
                className="font-syne font-black mb-3 leading-[1.05] gradient-text-animated"
                style={{ fontSize: "clamp(1.8rem, 13vw, 4.5rem)" }}
              >
                <span className="block md:hidden">
                  {typedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                    className="ml-0.5"
                    style={{ color: "#60a5fa" }}
                  >
                    |
                  </motion.span>
                </span>
                <span
                  className="hidden md:inline"
                  style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
                >
                  {typedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                    className="ml-0.5"
                    style={{ color: "#60a5fa" }}
                  >
                    |
                  </motion.span>
                </span>
              </h1>
              <h2
                className="text-xl md:text-2xl font-syne font-semibold"
                style={{ color: "rgba(148, 163, 184, 0.85)" }}
              >
                Computer Science Student &{" "}
                <span style={{ color: "#93c5fd" }}>
                  {roleTyped}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                  >
                    _
                  </motion.span>
                </span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg font-inter leading-relaxed max-w-lg"
              style={{ color: "rgba(148, 163, 184, 0.7)" }}
            >
              Passionate about building intelligent systems and creating innovative solutions through code.
              Specializing in AI, web development, system designing, and automation—crafting digital experiences that feel{" "}
              <em className="italic" style={{ color: "#93c5fd" }}>alive</em>.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 items-center"
            >
              <MagneticButton>
                <a href={CV} download="LENOX_IRUNGU_CV.docx">
                  <Button
                    size="lg"
                    className="font-inter font-semibold btn-glow px-7 h-12"
                    style={{
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                      border: "none",
                      color: "white",
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </Button>
                </a>
              </MagneticButton>

              <MagneticButton>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToContact}
                  className="font-inter font-semibold h-12 px-7"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(203, 213, 225, 0.9)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button
                  size="lg"
                  variant="ghost"
                  onClick={scrollToProjects}
                  className="font-inter font-medium h-12 px-6"
                  style={{ color: "rgba(148, 163, 184, 0.7)" }}
                >
                  <ArrowDown className="mr-2 h-4 w-4" />
                  View Work
                </Button>
              </MagneticButton>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={itemVariants} className="flex gap-8 pt-2">
              {[
                { value: "3+", label: "Projects Built" },
                { value: "5+", label: "Tech Stacks" },
                { value: "100%", label: "Dedication" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-syne font-black gradient-text">{stat.value}</p>
                  <p className="text-xs font-inter mt-0.5" style={{ color: "rgba(148,163,184,0.55)" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="flex justify-center mt-8 md:mt-0"
          >
            <div
              className="relative"
              style={{
                /* Fluid size: 220px on tiny phones → 300px mid → 380px large desktop */
                width: "clamp(200px, 42vw, 380px)",
                height: "clamp(200px, 42vw, 380px)",
              }}
            >
              {/* Spinning gradient ring */}
              <div
                className="absolute inset-0 rounded-full animate-spin-slow"
                style={{
                  background: "conic-gradient(from 0deg, #60a5fa, #818cf8, #a78bfa, #38bdf8, #60a5fa)",
                  padding: "3px",
                  borderRadius: "9999px",
                }}
              />
              {/* Glow blob behind */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute rounded-full"
                style={{
                  inset: "-20px",
                  background: "radial-gradient(circle, rgba(96,165,250,0.3) 0%, rgba(139,92,246,0.15) 50%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              {/* Image frame — fills the fluid parent */}
              <div
                className="relative w-full h-full rounded-full overflow-hidden animate-pulse-glow"
                style={{
                  border: "2px solid rgba(96, 165, 250, 0.5)",
                  boxShadow: "0 0 40px rgba(96,165,250,0.35), 0 0 80px rgba(139,92,246,0.15), inset 0 0 40px rgba(0,0,0,0.3)",
                }}
              >
                <img
                  src={profileImage}
                  alt="lenoxTech Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating badge */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3 -right-3 md:-bottom-4 md:-right-4 px-3 py-1.5 md:px-4 md:py-2 rounded-2xl font-inter font-semibold text-xs md:text-sm whitespace-nowrap"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(96,165,250,0.3)",
                  backdropFilter: "blur(12px)",
                  color: "#93c5fd",
                }}
              >
                💻 Code · Coffee · Bugs
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
