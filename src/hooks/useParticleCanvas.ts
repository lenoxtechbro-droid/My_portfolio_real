import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseX: number;
    baseY: number;
    size: number;
    color: string;
    floatOffset: number;
    floatSpeed: number;
    opacity: number;
}

const COLORS = ['#60a5fa', '#818cf8', '#a78bfa', '#38bdf8', '#34d399'];
const CONNECTION_DISTANCE = 110;
const MOUSE_RADIUS = 130;
const MOUSE_FORCE = 0.06;
const RETURN_FORCE = 0.04;

export function useParticleCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
    const mouseRef = useRef({ x: -9999, y: -9999 });
    const particlesRef = useRef<Particle[]>([]);
    const rafRef = useRef<number>(0);
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const isMobile = window.innerWidth < 768;
        const PARTICLE_COUNT = isMobile ? 45 : 85;

        function resize() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function initParticles() {
            if (!canvas) return;
            particlesRef.current = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particlesRef.current.push({
                    x,
                    y,
                    vx: (Math.random() - 0.5) * 0.25,
                    vy: (Math.random() - 0.5) * 0.25,
                    baseX: x,
                    baseY: y,
                    size: Math.random() * 2.2 + 1,
                    color: COLORS[Math.floor(Math.random() * COLORS.length)],
                    floatOffset: Math.random() * Math.PI * 2,
                    floatSpeed: Math.random() * 0.012 + 0.006,
                    opacity: Math.random() * 0.5 + 0.3,
                });
            }
        }

        function drawParticle(p: Particle) {
            if (!ctx) return;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, '0');
            ctx.fill();

            // Subtle outer glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
            const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
            grad.addColorStop(0, p.color + '33');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.fill();
        }

        function drawConnections(particles: Particle[]) {
            if (!ctx) return;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DISTANCE) {
                        const alpha = (1 - dist / CONNECTION_DISTANCE) * 0.25;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        // Use a gradient line between two particle colors
                        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
                        grad.addColorStop(0, a.color + Math.round(alpha * 255).toString(16).padStart(2, '0'));
                        grad.addColorStop(1, b.color + Math.round(alpha * 255).toString(16).padStart(2, '0'));
                        ctx.strokeStyle = grad;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            if (!canvas || !ctx) return;
            timeRef.current += 1;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mouse = mouseRef.current;
            const particles = particlesRef.current;

            for (const p of particles) {
                // Float animation (independent sine-wave)
                const floatY = Math.sin(timeRef.current * p.floatSpeed + p.floatOffset) * 8;
                const floatX = Math.cos(timeRef.current * p.floatSpeed * 0.7 + p.floatOffset) * 4;

                const targetX = p.baseX + floatX;
                const targetY = p.baseY + floatY;

                // Mouse repulsion/wave
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MOUSE_RADIUS && dist > 0) {
                    const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
                    p.vx -= (dx / dist) * force * 8;
                    p.vy -= (dy / dist) * force * 8;
                    p.opacity = Math.min(1, p.opacity + 0.05);
                } else {
                    p.opacity = Math.max(0.25, p.opacity - 0.01);
                }

                // Return toward float target
                p.vx += (targetX - p.x) * RETURN_FORCE;
                p.vy += (targetY - p.y) * RETURN_FORCE;

                // Dampen velocity
                p.vx *= 0.88;
                p.vy *= 0.88;

                p.x += p.vx;
                p.y += p.vy;

                // Wrap edges
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
                if (p.y < -10) p.y = canvas.height + 10;
                if (p.y > canvas.height + 10) p.y = -10;

                drawParticle(p);
            }

            drawConnections(particles);

            rafRef.current = requestAnimationFrame(animate);
        }

        function handleMouseMove(e: MouseEvent) {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        }

        function handleTouchMove(e: TouchEvent) {
            if (e.touches[0]) {
                mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        }

        function handleMouseLeave() {
            mouseRef.current = { x: -9999, y: -9999 };
        }

        resize();
        initParticles();
        animate();

        window.addEventListener('resize', () => { resize(); initParticles(); });
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [canvasRef]);
}
