import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface GalleryImage {
  src: string;
  label: string;
}

interface ProjectGalleryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  images: GalleryImage[];
  initialIndex?: number;
}

const ProjectGallery = ({
  open,
  onOpenChange,
  title,
  images,
  initialIndex = 0,
}: ProjectGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);

  // Reset when dialog opens
  useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex);
      setZoomed(false);
    }
  }, [open, initialIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setZoomed(false);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setZoomed(false);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, goNext, goPrev, onOpenChange]);

  if (images.length === 0) return null;

  const current = images[currentIndex];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[95vw] md:max-w-[85vw] lg:max-w-[75vw] w-full p-0 border-0 overflow-hidden [&>button:last-child]:hidden"
        style={{
          background: "rgba(10, 14, 26, 0.97)",
          backdropFilter: "blur(24px)",
          borderRadius: "16px",
          border: "1px solid rgba(139, 92, 246, 0.15)",
          boxShadow:
            "0 0 60px rgba(96, 165, 250, 0.1), 0 0 120px rgba(139, 92, 246, 0.05)",
        }}
      >
        {/* Accessible title */}
        <DialogTitle className="sr-only">{title} — Image Gallery</DialogTitle>

        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid rgba(139, 92, 246, 0.1)" }}
        >
          <div>
            <h3
              className="text-lg font-syne font-bold"
              style={{ color: "rgba(226, 232, 240, 0.95)" }}
            >
              {title}
            </h3>
            <p
              className="text-xs font-inter mt-0.5"
              style={{ color: "rgba(148, 163, 184, 0.6)" }}
            >
              {currentIndex + 1} / {images.length} — {current.label}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoomed((z) => !z)}
              className="p-2 rounded-lg transition-colors duration-200"
              style={{
                background: "rgba(139, 92, 246, 0.1)",
                color: "#c4b5fd",
              }}
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
            >
              {zoomed ? (
                <ZoomOut className="h-4 w-4" />
              ) : (
                <ZoomIn className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 rounded-lg transition-colors duration-200"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                color: "#fca5a5",
              }}
              aria-label="Close gallery"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main image area */}
        <div
          className="relative flex items-center justify-center"
          style={{
            minHeight: "50vh",
            maxHeight: "70vh",
          }}
        >
          {/* Left arrow */}
          {images.length > 1 && (
            <button
              onClick={goPrev}
              className="absolute left-3 z-10 p-2 rounded-full transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(139, 92, 246, 0.2)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                color: "#c4b5fd",
              }}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="flex items-center justify-center w-full h-full px-14 py-4"
              style={{
                cursor: zoomed ? "zoom-out" : "zoom-in",
              }}
              onClick={() => setZoomed((z) => !z)}
            >
              <img
                src={current.src}
                alt={current.label}
                className="rounded-lg shadow-2xl transition-transform duration-500"
                style={{
                  maxHeight: zoomed ? "none" : "65vh",
                  maxWidth: zoomed ? "none" : "100%",
                  width: zoomed ? "auto" : undefined,
                  transform: zoomed ? "scale(1.5)" : "scale(1)",
                  objectFit: "contain",
                  boxShadow: "0 8px 40px rgba(0, 0, 0, 0.4)",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Right arrow */}
          {images.length > 1 && (
            <button
              onClick={goNext}
              className="absolute right-3 z-10 p-2 rounded-full transition-all duration-200 hover:scale-110"
              style={{
                background: "rgba(139, 92, 246, 0.2)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                color: "#c4b5fd",
              }}
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div
            className="px-6 py-4 flex gap-2 overflow-x-auto"
            style={{ borderTop: "1px solid rgba(139, 92, 246, 0.1)" }}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx);
                  setZoomed(false);
                }}
                className="flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200"
                style={{
                  width: "72px",
                  height: "48px",
                  border:
                    idx === currentIndex
                      ? "2px solid #8b5cf6"
                      : "2px solid rgba(148, 163, 184, 0.15)",
                  opacity: idx === currentIndex ? 1 : 0.5,
                  transform: idx === currentIndex ? "scale(1.08)" : "scale(1)",
                }}
                aria-label={`View ${img.label}`}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectGallery;
