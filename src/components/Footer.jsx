"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            });
            setTime(timeString);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const socialLinks = [
        { name: "Layers", href: "#" },
        { name: "Dribbble", href: "https://dribbble.com" },
        { name: "LinkedIn", href: "https://linkedin.com" },
        { name: "X", href: "https://x.com" },
        { name: "Instagram", href: "https://instagram.com" },
    ];

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Work", href: "/projects" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <footer className="relative w-full min-h-[75vh] bg-[#0a0a0a] overflow-hidden pt-[80px] pb-10 flex flex-col justify-between">
            {/* Video Background Layer (YouTube Embed — Full Coverage) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                {/*
                  YouTube Cover Technique:
                  - iframe is 100vw × 56.25vw (16:9) as a minimum
                  - We also ensure min-height is 100% and min-width is 177.77vh (100/56.25)
                  - Centred with translate to always fill the container
                */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "max(100%, 177.78vh)",
                        height: "max(100%, 56.25vw)",
                    }}
                >
                    <iframe
                        className="w-full h-full pointer-events-none opacity-90 contrast-[1.05] brightness-[0.85]"
                        src="https://www.youtube.com/embed/ij8clwh6s0Y?autoplay=1&mute=1&loop=1&playlist=ij8clwh6s0Y&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
                        title="Background Video"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        loading="eager"
                    />
                </div>
                {/* Seamless Top Blending Overlay — top 25% only */}
                <div className="absolute top-0 left-0 w-full h-[25%] z-10 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>
                <div className="absolute inset-0 z-10 bg-[#0a0a0a]/30"></div>
            </div>

            <div className="container relative z-10 px-4 md:px-8 mx-auto">
                {/* 1. Top Row: Social Links & Email (Socials Left, Email Right) */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-10 pb-8 border-b border-white/[0.05]">
                    <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[13px] font-medium text-neutral-400 hover:text-white transition-colors tracking-tight"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <a
                        href="mailto:hello@vinoy.design"
                        className="text-[13px] font-medium text-neutral-400 hover:text-white transition-colors tracking-tight"
                    >
                        hello@vinoy.design
                    </a>
                </div>

                {/* 2. Middle Row: 3-Column Layout (Logo | Nav | Description) */}
                <div className="pt-20 pb-4 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
                    {/* Far Left: Logo */}
                    <div className="md:col-span-4 flex justify-center md:justify-start">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/assets/logo.svg"
                                alt="Logo"
                                width={110}
                                height={35}
                                className="brightness-0 invert opacity-90 transition-opacity hover:opacity-100"
                            />
                        </Link>
                    </div>

                    {/* Center-Left: Nav Stack */}
                    <div className="md:col-span-4 flex flex-col items-center md:items-start">
                        <div className="flex flex-col gap-0.5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-[15px] md:text-[18px] font-medium text-[#cccccc] hover:text-white transition-colors leading-[1.2] tracking-tight"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Far Right: Studio Info */}
                    <div className="md:col-span-4 flex flex-col items-center md:items-end text-center md:text-right">
                        <p className="text-[14px] leading-relaxed text-neutral-500 max-w-[280px]">
                            Studio based in Kerala. <br />
                            We engineer obsessions.
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. Main Call-to-Action: High Impact Full-Width Typography */}
            <div className="relative z-10 w-full pt-16 pb-24 overflow-hidden border-b border-white/[0.03]">
                <h2 className="text-[20vw] font-medium tracking-[calc(-0.06em)] text-white leading-[0.8] text-center whitespace-nowrap select-none opacity-[0.98] px-2">
                    Get in <span className="text-burnt">Touch</span>
                </h2>
            </div>

            <div className="container relative z-10 px-4 md:px-8 mx-auto">
                {/* 4. Bottom Row: Copyright & Time */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] uppercase tracking-[0.1em] text-neutral-600 font-bold">
                    <div className="flex items-center gap-2">
                        <span>Vinoy Vincent © {new Date().getFullYear()}</span>
                    </div>

                    <div className="tabular-nums flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span>Kerala</span>
                            <span className="text-neutral-400 font-medium">{time}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle glow edge at the very bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-burnt/20 to-transparent"></div>
        </footer>
    );
}
