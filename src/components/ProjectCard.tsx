import { motion, useInView } from "framer-motion";
import { Images, Sparkles, FolderOpen } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import ProjectGallery from "@/components/ProjectGallery";
import GlassFolder, { ArtPreset } from "@/components/ui/glass-folder-cards";
import { useRef, useState } from "react";

export interface GalleryImage {
  src: string;
  label: string;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tools: string[];
  link?: string;
  github?: string;
  delay?: number;
  featured?: boolean;
  gallery?: GalleryImage[];
  artPreset?: ArtPreset;
  seed?: number;
}

const toolColors: Record<string, string> = {
  React: "#61dafb",
  TailwindCSS: "#38bdf8",
  "Framer Motion": "#a78bfa",
  Django: "#34d399",
  FastAPI: "#059669",
  Supabase: "#3ecf8e",
  MySQL: "#60a5fa",
  Python: "#818cf8",
  Pandas: "#fb923c",
  n8n: "#f472b6",
  TypeScript: "#60a5fa",
  "Node.js": "#4ade80",
  SQL: "#60a5fa",
  zappier: "#ff4a00",
  HTML: "#e34c26",
  CSS: "#264de4",
  JavaScript: "#f7df1e",
  PHP: "#777bb4",
  Flask: "#000000",
};

const ProjectCard = ({
  title,
  description,
  image,
  tools,
  delay = 0,
  featured = false,
  gallery = [],
  artPreset = "aurora",
  seed = 3,
}: ProjectCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const hasGallery = gallery.length > 0;

  // Map project screenshots into GlassFolder files
  const folderFiles = hasGallery
    ? gallery.map((img) => ({
        name: img.label,
        meta: "Screenshot",
        image: img.src,
      }))
    : [{ name: title, meta: "Overview", image }];

  const handleFileSelect = (_: unknown, index: number) => {
    setSelectedIndex(index);
    setGalleryOpen(true);
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.7,
          delay: delay * 0.15,
          ease: [0.23, 1, 0.32, 1],
        }}
        className={`glass-card rounded-3xl p-6 flex flex-col justify-between relative group transition-all duration-500 hover:border-purple-500/40 ${
          featured ? "lg:col-span-1" : ""
        }`}
        style={{
          background: "rgba(15, 23, 42, 0.65)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(139, 92, 246, 0.2)",
          boxShadow:
            "0 10px 40px -10px rgba(0, 0, 0, 0.5), 0 0 20px rgba(139, 92, 246, 0.05)",
        }}
      >
        {/* Featured Pill */}
        {featured && (
          <div
            className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-[11px] font-inter font-bold tracking-wider uppercase flex items-center gap-1.5"
            style={{
              background: "rgba(139, 92, 246, 0.2)",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              color: "#c4b5fd",
            }}
          >
            <Sparkles className="h-3 w-3" />
            Featured
          </div>
        )}

        {/* 3D Glass Folder Container */}
        <div className="w-full flex flex-col items-center justify-center pt-2 pb-4 overflow-visible">
          <GlassFolder
            label={title}
            meta={`${gallery.length} screenshots`}
            tone="dark"
            art={artPreset}
            seed={seed}
            image={image}
            action="more"
            files={folderFiles}
            onFileSelect={handleFileSelect}
            menu={[
              {
                label: "Open Full Gallery",
                onSelect: () => {
                  setSelectedIndex(0);
                  setGalleryOpen(true);
                },
              },
            ]}
            width={310}
            appearDelay={delay * 120}
          />
          <span
            className="mt-3 text-[11px] font-inter tracking-wider uppercase flex items-center gap-1.5 transition-colors duration-200"
            style={{ color: "rgba(148, 163, 184, 0.55)" }}
          >
            <FolderOpen className="h-3 w-3" />
            Click folder to fan screenshots
          </span>
        </div>

        {/* Project Details */}
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <h3
              className="text-xl font-syne font-bold transition-colors duration-300 group-hover:text-purple-300"
              style={{ color: "rgba(241, 245, 249, 0.95)" }}
            >
              {title}
            </h3>
            <p
              className="text-sm font-inter leading-relaxed line-clamp-3"
              style={{ color: "rgba(148, 163, 184, 0.75)" }}
            >
              {description}
            </p>
          </div>

          {/* Tool Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 text-[11px] font-inter font-bold uppercase tracking-wider rounded-full transition-transform duration-200 hover:scale-105"
                style={{
                  background: `${toolColors[tool] ?? "#94a3b8"}18`,
                  border: `1px solid ${toolColors[tool] ?? "#94a3b8"}40`,
                  color: toolColors[tool] ?? "#94a3b8",
                }}
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Action Trigger */}
          <div className="pt-2">
            <MagneticButton className="w-full">
              <button
                onClick={() => {
                  setSelectedIndex(0);
                  setGalleryOpen(true);
                }}
                className="w-full h-11 px-4 rounded-xl text-sm font-inter font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(124, 58, 237, 0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 6px 28px rgba(139, 92, 246, 0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 4px 20px rgba(124, 58, 237, 0.35)";
                }}
              >
                <Images className="h-4 w-4" />
                View {gallery.length > 0 ? `${gallery.length} Screenshots` : "Images"}
              </button>
            </MagneticButton>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Lightbox Gallery */}
      {hasGallery && (
        <ProjectGallery
          open={galleryOpen}
          onOpenChange={setGalleryOpen}
          title={title}
          images={gallery}
          initialIndex={selectedIndex}
        />
      )}
    </>
  );
};

export default ProjectCard;
