import { useRef, useState, useEffect, MouseEvent } from "react";

interface MagneticOptions {
    strength?: number;
    tolerance?: number;
}

export function useMagneticEffect(options: MagneticOptions = {}) {
    const { strength = 0.3, tolerance = 50 } = options;
    const ref = useRef<HTMLElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: globalThis.MouseEvent) => {
            if (!ref.current) return;

            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;
            const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

            if (distance < tolerance) {
                setPosition({
                    x: distanceX * strength,
                    y: distanceY * strength,
                });
            } else {
                setPosition({ x: 0, y: 0 });
            }
        };

        const handleMouseLeave = () => {
            setPosition({ x: 0, y: 0 });
        };

        const element = ref.current;
        if (element) {
            element.addEventListener("mousemove", handleMouseMove as any);
            element.addEventListener("mouseleave", handleMouseLeave);

            return () => {
                element.removeEventListener("mousemove", handleMouseMove as any);
                element.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [strength, tolerance]);

    return { ref, position };
}
