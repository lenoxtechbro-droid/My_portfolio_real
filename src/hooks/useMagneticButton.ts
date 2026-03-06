import { useRef, useCallback } from 'react';

interface MagneticConfig {
    strength?: number;
    radius?: number;
}

export function useMagneticButton({ strength = 0.35, radius = 80 }: MagneticConfig = {}) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
            const force = (1 - dist / radius) * strength;
            const x = dx * force * 1.6;
            const y = dy * force * 1.6;
            el.style.transform = `translate(${x}px, ${y}px)`;
            el.style.transition = 'transform 0.15s cubic-bezier(0.23, 1, 0.32, 1)';
        }
    }, [strength, radius]);

    const handleMouseLeave = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = 'translate(0px, 0px)';
        el.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    }, []);

    return { ref, handleMouseMove, handleMouseLeave };
}
