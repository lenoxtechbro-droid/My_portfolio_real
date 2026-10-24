import { ReactNode } from 'react';
import { useMagneticButton } from '@/hooks/useMagneticButton';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    radius?: number;
}

const MagneticButton = ({ children, className = '', strength = 0.35, radius = 80 }: MagneticButtonProps) => {
    const { ref, handleMouseMove, handleMouseLeave } = useMagneticButton({ strength, radius });

    return (
        <div
            ref={ref}
            className={`inline-block ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
};

export default MagneticButton;
