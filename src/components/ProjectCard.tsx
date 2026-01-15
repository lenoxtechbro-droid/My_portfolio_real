import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tools: string[];
  link?: string;
  delay?: number;
}

const ProjectCard = ({
  title,
  description,
  image,
  tools,
  link = "#",
  delay = 0,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <Card className="overflow-hidden group hover:shadow-glow transition-all duration-300 bg-card border-border">
        <div className="relative h-48 overflow-hidden bg-gradient-secondary">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground line-clamp-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full"
              >
                {tool}
              </span>
            ))}
          </div>
          <Button
            className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90"
            asChild
          >
            <a href={link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Project
            </a>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
