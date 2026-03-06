import { motion } from "framer-motion";
import { Heart, Code2 } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-10 px-4" style={{ zIndex: 2 }}>
      {/* Gradient divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(96,165,250,0.4), rgba(139,92,246,0.4), transparent)",
        }}
      />
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <p
            className="font-syne font-black text-lg gradient-text-animated"
          >
            LenoxTech_bro
          </p>
          <p
            className="text-xs font-inter flex items-center gap-1.5 flex-wrap justify-center"
            style={{ color: "rgba(148,163,184,0.45)" }}
          >
            <span>© {currentYear} LenoxTech. All rights reserved.</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-pink-400 inline" /> and <Code2 className="w-3 h-3 text-blue-400 inline" />
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
