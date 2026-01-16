import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile.png";
import { useState, useEffect, useRef } from "react";


const CV = "/LENOX_IRUNGU_CV.docx";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = "lenoxTech";

  // Auto-typing effect on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev < fullText.length) {
          const newIndex = prev + 1;
          setTypedText(fullText.slice(0, newIndex));
          return newIndex;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 px-4"
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-medium text-primary mb-2">
                Hello, I'm
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4">
                {typedText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                  className="text-primary"
                >
                  |
                </motion.span>
              </h1>
              <h3 className="text-2xl md:text-3xl text-muted-foreground font-light">
                Computer Science Student &{" "}
                <span className="text-primary font-semibold">
                  Future AI Engineer
                </span>
              </h3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-lg"
            >
              Passionate about building intelligent systems and creating
              innovative solutions through code. Specializing in AI, web
              development, and automation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a href={CV} download="LENOX_IRUNGU_CV.docx">
                <Button
                  size="lg"
                  className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download CV
                </Button>
              </a>
              <Button
                size="lg"
                variant="outline"
                onClick={scrollToContact}
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 blur-3xl"
              />
              <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary shadow-glow">
                <img
                  src={profileImage}
                  alt="lenoxTech Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
