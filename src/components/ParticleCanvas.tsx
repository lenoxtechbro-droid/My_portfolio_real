import { useRef } from 'react';
import { useParticleCanvas } from '@/hooks/useParticleCanvas';

const ParticleCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useParticleCanvas(canvasRef);

    return (
        <>
            {/* Particle canvas — fixed behind all content */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />
            {/* Subtle dark vignette overlay for readability */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    pointerEvents: 'none',
                    background: `
            radial-gradient(ellipse at 20% 50%, rgba(96, 165, 250, 0.04) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.04) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 100%, rgba(56, 189, 248, 0.03) 0%, transparent 60%)
          `,
                }}
            />
        </>
    );
};

export default ParticleCanvas;
