import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface SkillCardProps {
  name: string;
  percentage: number;
  icon?: string;
  delay?: number;
}

const SkillCard = ({ name, percentage, delay = 0 }: SkillCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate circle properties
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 1;
          setCurrentPercentage(progress);
          if (progress >= percentage) {
            clearInterval(interval);
          }
        }, 15);
        return () => clearInterval(interval);
      }, delay * 100);
      return () => clearTimeout(timer);
    }
  }, [isInView, percentage, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col items-center space-y-4 p-6 cursor-pointer"
    >
      {/* Circular Progress */}
      <motion.div 
        className="relative w-40 h-40"
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="hsl(var(--secondary))"
            strokeWidth="12"
            fill="none"
            className="opacity-30"
          />
          {/* Progress circle */}
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={
              isInView
                ? {
                    strokeDashoffset: circumference - (currentPercentage / 100) * circumference,
                  }
                : {}
            }
            transition={{ duration: 1, delay: delay * 0.1, ease: "easeOut" }}
            className="drop-shadow-glow"
            style={{
              filter: isHovered ? "drop-shadow(0 0 12px hsl(var(--primary)))" : "none",
            }}
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--primary-light))" />
            </linearGradient>
          </defs>
        </svg>
        {/* Percentage text in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className="text-3xl font-bold text-primary"
            animate={isHovered ? { scale: 1.15 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {currentPercentage}%
          </motion.span>
        </div>
      </motion.div>
      {/* Skill name */}
      <h3 className="text-xl font-semibold text-foreground text-center">{name}</h3>
    </motion.div>
  );
};

export default SkillCard;
