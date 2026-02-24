"use client";
import { useState, useCallback, useRef } from "react";

export default function ParticleButton({ children, particleColor = "#ffffff", className = "" }) {
    const [particles, setParticles] = useState([]);
    const containerRef = useRef(null);
    const intervalRef = useRef(null);
    const idCounter = useRef(0);

    const spawnParticle = useCallback(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const halfW = rect.width / 2;
        const halfH = rect.height / 2;

        const id = idCounter.current++;
        const size = 3 + Math.random() * 4;
        const duration = 600 + Math.random() * 500;

        // Spawn from a random point along the button's outer edge
        const side = Math.floor(Math.random() * 4);
        let startX, startY;
        switch (side) {
            case 0: // top edge
                startX = (Math.random() - 0.5) * rect.width;
                startY = -halfH;
                break;
            case 1: // bottom edge
                startX = (Math.random() - 0.5) * rect.width;
                startY = halfH;
                break;
            case 2: // left edge
                startX = -halfW;
                startY = (Math.random() - 0.5) * rect.height;
                break;
            default: // right edge
                startX = halfW;
                startY = (Math.random() - 0.5) * rect.height;
                break;
        }

        // Radiate outward from the edge
        const angle = Math.atan2(startY, startX) + (Math.random() - 0.5) * 0.6;
        const distance = 30 + Math.random() * 50;

        const particle = {
            id,
            x: startX,
            y: startY,
            tx: startX + Math.cos(angle) * distance,
            ty: startY + Math.sin(angle) * distance,
            size,
            duration,
        };

        setParticles((prev) => [...prev, particle]);

        setTimeout(() => {
            setParticles((prev) => prev.filter((p) => p.id !== id));
        }, duration);
    }, []);

    const handleMouseEnter = useCallback(() => {
        for (let i = 0; i < 6; i++) {
            setTimeout(() => spawnParticle(), i * 40);
        }
        intervalRef.current = setInterval(spawnParticle, 100);
    }, [spawnParticle]);

    const handleMouseLeave = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {/* Particle layer */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
                {particles.map((p) => (
                    <span
                        key={p.id}
                        className="absolute rounded-full left-1/2 top-1/2"
                        style={{
                            width: p.size,
                            height: p.size,
                            backgroundColor: particleColor,
                            boxShadow: `0 0 ${p.size + 4}px ${p.size / 2}px ${particleColor}80`,
                            opacity: 0,
                            transform: `translate(${p.x}px, ${p.y}px)`,
                            animation: `particle-radiate ${p.duration}ms ease-out forwards`,
                            "--tx": `${p.tx}px`,
                            "--ty": `${p.ty}px`,
                            "--sx": `${p.x}px`,
                            "--sy": `${p.y}px`,
                        }}
                    />
                ))}
            </div>

            <style jsx>{`
                @keyframes particle-radiate {
                    0% {
                        opacity: 0.9;
                        transform: translate(var(--sx), var(--sy)) scale(1);
                    }
                    40% {
                        opacity: 0.7;
                    }
                    100% {
                        opacity: 0;
                        transform: translate(var(--tx), var(--ty)) scale(0.2);
                    }
                }
            `}</style>
        </div>
    );
}
