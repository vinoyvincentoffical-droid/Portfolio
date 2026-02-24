"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import ParticleButton from "@/components/ParticleButton";

export default function Home() {
    const imgRef = useRef(null);
    const h1Ref = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [subtitleRight, setSubtitleRight] = useState(0);
    const [roleIndex, setRoleIndex] = useState(0);
    const roles = ["Product Designer", "UI Designer", "UX Designer", "HI Designer"];
    const [hoveredItem, setHoveredItem] = useState(1);

    const deliverables = [
        {
            id: 1,
            title: "Strategy & Identity",
            description: "I don't just design assets; I define the \"why\" behind them. I partner with stakeholders to translate abstract business goals into a concrete visual language. By aligning market positioning with a minimal, scalable identity systems, I ensure the brand builds trust before a user even interacts with the product.",
            tags: ["Brand Strategy", "Visual Identity", "Art Direction"],
        },
        {
            id: 2,
            title: "Product & Experience",
            description: "I design interfaces that balance beauty with usability. From wireframes to pixel-perfect UI, I craft every interaction to feel intuitive and purposeful. My process bridges user research with visual design to create products people genuinely enjoy using.",
            tags: ["UI/UX Design", "Prototyping", "Design Systems", "Product Logic"],
        },
        {
            id: 3,
            title: "Build & Launch",
            description: "I bridge the gap between design and development, ensuring what ships matches what was envisioned. From front-end implementation to quality assurance, I oversee the build process to deliver polished, production-ready digital products.",
            tags: ["Web Development", "Quality Assurance", "Creative Direction"],
        },
    ];

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            setMousePos({ x, y });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Measure h1 right edge to align subtitle
    useEffect(() => {
        const measure = () => {
            if (h1Ref.current) {
                const rect = h1Ref.current.getBoundingClientRect();
                setSubtitleRight(window.innerWidth - rect.right);
            }
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    // Rotate roles
    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const aboutText = "I'm a Product Designer who combines aesthetic flair with technical logic to build next-gen interfaces. I value clarity, consistency, and user happiness.";
    const aboutWords = aboutText.split(" ");

    // GSAP Animations
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // About Section Animations
            const aboutTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".about-section",
                    start: "top top",
                    end: "+=180%",
                    scrub: 1.5, // slightly more smoothing on scrub
                    pin: true,
                }
            });

            aboutTl.to(".reveal-word", {
                keyframes: [
                    { color: "#FF6C1C", duration: 0.3 },
                    { color: "#d4d4d4", duration: 0.7 }
                ],
                stagger: 0.1,
            });

            aboutTl.fromTo(".about-secondary",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 2, ease: "power2.out" },
                "-=1.5"
            );

            // Add a buffer at the end of the timeline so the pin doesn't release abruptly
            aboutTl.to({}, { duration: 1.5 });

            // CTA Section Animations
            gsap.fromTo(
                ".cta-content",
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".cta-section",
                        start: "top 75%",
                    }
                }
            );
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Navbar />
            <main>
                {/* ───── Hero Section ───── */}
                <section className="sticky top-0 h-screen overflow-hidden bg-[#f0f0f4]" style={{ isolation: 'isolate' }}>
                    {/* Geometric Grid Background */}
                    <div className="absolute inset-0 opacity-30">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="arcGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                                    <path d="M 0 50 A 50 50 0 0 1 50 0 M 50 100 A 50 50 0 0 0 100 50" fill="none" stroke="#d0d0d6" strokeWidth="0.5" />
                                    <path d="M 100 0 A 50 50 0 0 1 50 50 M 50 50 A 50 50 0 0 0 0 100" fill="none" stroke="#d0d0d6" strokeWidth="0.5" />
                                    <path d="M 100 100 A 50 50 0 0 1 50 50 M 50 50 A 50 50 0 0 0 0 0" fill="none" stroke="#d0d0d6" strokeWidth="0.5" />
                                    <rect width="100" height="100" fill="none" stroke="#e0e0e6" strokeWidth="0.5" strokeDasharray="2 4" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#arcGrid)" />
                        </svg>
                    </div>

                    {/* Portrait Image — offset left, follows mouse */}
                    <div
                        ref={imgRef}
                        className="absolute bottom-0 left-1/2 h-[90vh] overflow-hidden"
                        style={{
                            transform: `translateX(calc(-65% + ${mousePos.x * 15}px)) translateY(${Math.min(mousePos.y * 8, 0)}px)`,
                            transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        }}
                    >
                        <img
                            src="/assets/img.png"
                            alt="Vinoy Vincent"
                            className="h-full w-auto object-cover object-top block"
                            style={{ filter: "grayscale(100%)" }}
                        />
                    </div>

                    {/* Name — mix-blend-difference: white text inverts to black on bg, stays white on dark image */}
                    <div className="absolute bottom-[180px] sm:bottom-[220px] md:bottom-[260px] left-0 right-0 text-center pointer-events-none mix-blend-difference">
                        <h1 ref={h1Ref} className="inline-block text-[60px] sm:text-[90px] md:text-[120px] lg:text-[160px] xl:text-[190px] font-bold leading-[0.85] tracking-[-0.04em] text-white">
                            Vinoy <span>Vincent</span>
                        </h1>
                    </div>

                    {/* Subtitle — right-aligned with h1's last letter, flip animation */}
                    <div className="absolute bottom-[160px] sm:bottom-[185px] md:bottom-[220px] left-0 right-0" style={{ paddingRight: subtitleRight > 0 ? `${subtitleRight}px` : undefined }}>
                        <p className="text-xl sm:text-2xl md:text-3xl font-medium tracking-tight text-right flex items-center justify-end gap-1">
                            <span className="text-black font-bold">//</span>
                            {/* Set a fixed height matching the line-height (e.g., about 1.2em) so it never collapses, avoiding layout jumps. Flex layout naturally centers the absolutes gracefully vs top-0 baseline alignments. */}
                            <span className="relative flex items-center overflow-hidden text-left" style={{ width: '14ch', height: '1.2em', transform: 'translateY(2px)' }}>
                                {roles.map((role, i) => (
                                    <span
                                        key={role}
                                        className="absolute left-0 w-full text-burnt transition-all duration-500 ease-in-out"
                                        style={{
                                            transform: i === roleIndex
                                                ? 'translateY(0) rotateX(0)'
                                                : i === (roleIndex - 1 + roles.length) % roles.length
                                                    ? 'translateY(-100%) rotateX(90deg)'
                                                    : 'translateY(100%) rotateX(-90deg)',
                                            opacity: i === roleIndex ? 1 : 0,
                                        }}
                                    >
                                        {role}
                                    </span>
                                ))}
                            </span>
                        </p>
                    </div>

                    <div className="absolute bottom-6 sm:bottom-8 right-4 md:right-16 z-[5] flex flex-col items-end gap-3">
                        <div className="flex gap-3">
                            {[
                                {
                                    href: "https://instagram.com",
                                    label: "Instagram",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                        </svg>
                                    ),
                                },
                                {
                                    href: "mailto:hello@vinoy.design",
                                    label: "Email",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="20" height="16" x="2" y="4" rx="2" />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                    ),
                                },
                                {
                                    href: "https://wa.me/",
                                    label: "WhatsApp",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    ),
                                },
                                {
                                    href: "https://behance.net",
                                    label: "Behance",
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                                        </svg>
                                    ),
                                },
                            ].map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center hover:bg-burnt transition-all duration-300 hover:scale-110"
                                    title={s.label}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ───── About Section (Dark Mode, Full Height) ───── */}
                <section className="about-section relative z-10 h-screen bg-[#111111] flex flex-col justify-center overflow-hidden py-24">
                    {/* Background abstract arcs matching reference vibe (optional subtle touch) */}
                    <div className="absolute top-12 right-12 opacity-10 pointer-events-none">
                        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 0 A100 100 0 0 1 200 100" stroke="white" strokeWidth="1" />
                            <path d="M100 100 A100 100 0 0 0 0 200" stroke="white" strokeWidth="1" />
                            <path d="M0 100 A100 100 0 0 1 100 0" stroke="white" strokeWidth="1" />
                            <path d="M200 100 A100 100 0 0 0 100 200" stroke="white" strokeWidth="1" />
                            <path d="M100 0 V200 M0 100 H200" stroke="white" strokeWidth="1" />
                        </svg>
                    </div>
                    <div className="absolute bottom-12 left-12 opacity-10 pointer-events-none">
                        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 0 A100 100 0 0 0 0 100" stroke="white" strokeWidth="1" />
                            <path d="M100 100 A100 100 0 0 1 200 200" stroke="white" strokeWidth="1" />
                            <path d="M200 100 A100 100 0 0 0 100 0" stroke="white" strokeWidth="1" />
                            <path d="M0 100 A100 100 0 0 1 100 200" stroke="white" strokeWidth="1" />
                            <path d="M100 0 V200 M0 100 H200" stroke="white" strokeWidth="1" />
                        </svg>
                    </div>

                    <div className="container relative z-10 flex flex-col h-full justify-center">
                        {/* Main Typography */}
                        <div className="max-w-[1000px] mb-16 sm:mb-24">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-medium tracking-tight leading-[1.2] md:leading-[1.1]">
                                {aboutWords.map((word, i) => (
                                    <span key={i}>
                                        <span className="reveal-word text-[#333333] transition-colors duration-[0ms]">{word}</span>
                                        {i < aboutWords.length - 1 && " "}
                                    </span>
                                ))}
                            </h2>
                        </div>

                        {/* Secondary Text and Buttons aligned to bottom right */}
                        <div className="about-secondary opacity-0 flex justify-end w-full lg:mt-[30vh]">
                            <div className="max-w-[480px] flex flex-col gap-6">
                                <p className="text-neutral-400 text-lg md:text-xl leading-normal font-light">
                                    Bringing your digital products to life with speed and accuracy. I blend the storytelling of branding with the ergonomics of UX to deliver software experiences that feel natural, premium, and complete.
                                </p>
                                <div className="flex flex-wrap items-center gap-5 pt-6">
                                    <ParticleButton particleColor="#ffffff">
                                        <Button variant="outline" asChild className="!px-10 !py-2 !h-auto rounded-full border-neutral-500 bg-transparent text-neutral-300 hover:bg-transparent hover:border-neutral-300 hover:text-white">
                                            <Link href="/projects">Explore My Work</Link>
                                        </Button>
                                    </ParticleButton>
                                    <ParticleButton particleColor="#FF6C1C">
                                        <Button asChild className="!px-10 !py-2 !h-auto rounded-full bg-burnt text-white hover:bg-burnt hover:shadow-[0_0_20px_rgba(255,108,28,0.6)] transition-all duration-300">
                                            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">View My Resume</a>
                                        </Button>
                                    </ParticleButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ───── What I Deliver Section ───── */}
                <section className="relative z-10 bg-[#f0f0f4] min-h-screen flex items-center py-24 px-6 md:px-16 lg:px-24">
                    <div className="w-full max-w-[1200px] mx-auto">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-20">
                            <div>
                                <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-black mb-10 leading-[1.1]">
                                    What I <span className="text-burnt italic">Deliver</span>.
                                </h2>
                                <p className="text-neutral-500 text-sm md:text-base leading-relaxed max-w-md ml-20 sm:ml-32">
                                    I offer a multidisciplinary approach to digital product design. By combining strategic branding with rigorous user experience principles, I help companies build products that are scalable, intuitive, and visually distinct.
                                </p>
                            </div>
                            {/* Decorative geometric arcs */}
                            <div className="hidden md:block opacity-15 mt-2">
                                <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M70 0 A70 70 0 0 1 140 70" stroke="#999" strokeWidth="0.8" />
                                    <path d="M70 70 A70 70 0 0 0 0 140" stroke="#999" strokeWidth="0.8" />
                                    <path d="M0 70 A70 70 0 0 1 70 0" stroke="#999" strokeWidth="0.8" />
                                    <path d="M140 70 A70 70 0 0 0 70 140" stroke="#999" strokeWidth="0.8" />
                                    <line x1="70" y1="0" x2="70" y2="140" stroke="#999" strokeWidth="0.8" />
                                    <line x1="0" y1="70" x2="140" y2="70" stroke="#999" strokeWidth="0.8" />
                                    <rect x="25" y="25" width="90" height="90" fill="none" stroke="#999" strokeWidth="0.5" />
                                </svg>
                            </div>
                        </div>

                        {/* Accordion Items */}
                        <div className="flex flex-col border-t border-neutral-300/80" style={{ height: '50vh' }}>
                            {deliverables.map((item) => {
                                const isActive = hoveredItem === item.id;
                                const num = String(item.id).padStart(2, "0");
                                return (
                                    <div
                                        key={item.id}
                                        className={`border-b border-neutral-300/80 cursor-pointer overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? "bg-burnt flex-[3]" : "bg-transparent flex-[1]"
                                            }`}
                                        onMouseEnter={() => setHoveredItem(item.id)}
                                    >
                                        <div className={`h-full flex items-start gap-4 md:gap-8 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? "px-8 md:px-12 py-8 md:py-10" : "px-4 md:px-8 py-5 md:py-6"
                                            }`}>
                                            {/* Left border accent */}
                                            <div className={`hidden sm:block w-[3px] self-stretch rounded-full flex-shrink-0 transition-colors duration-500 ${isActive ? "bg-white/30" : "bg-neutral-300"
                                                }`} />

                                            {/* Title */}
                                            <h3 className={`text-2xl sm:text-3xl md:text-[40px] font-semibold tracking-tight leading-tight transition-all duration-500 flex-shrink-0 w-[180px] sm:w-[240px] md:w-[340px] ${isActive ? "text-white scale-100" : "text-black scale-[0.95]"
                                                }`}>
                                                {item.title}
                                            </h3>

                                            {/* Middle: description (on active) + tags */}
                                            <div className="flex-1 min-w-0">
                                                <div className={`transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${isActive ? "max-h-[250px] opacity-100 mb-5" : "max-h-0 opacity-0 mb-0"
                                                    }`}>
                                                    <p className="text-white/85 text-sm md:text-[15px] leading-relaxed pr-4">
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-x-0 gap-y-1">
                                                    {item.tags.map((tag, idx) => (
                                                        <span key={tag} className="flex items-center">
                                                            <span className={`text-xs sm:text-sm md:text-[15px] font-semibold transition-colors duration-500 whitespace-nowrap ${isActive ? "text-white" : "text-burnt"
                                                                }`}>
                                                                {tag}
                                                            </span>
                                                            {idx < item.tags.length - 1 && (
                                                                <span className={`mx-2 text-sm transition-colors duration-500 ${isActive ? "text-white/40" : "text-burnt/40"
                                                                    }`}>|</span>
                                                            )}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Number */}
                                            <span className={`text-5xl md:text-7xl font-bold tracking-tight transition-all duration-700 flex-shrink-0 leading-none ${isActive ? "text-white/80 scale-110" : "text-neutral-300 scale-100"
                                                }`}>
                                                {num}
                                            </span>

                                            {/* Decorative pattern (visible on active) */}
                                            <div className={`hidden lg:flex items-center flex-shrink-0 transition-all duration-500 ${isActive ? "opacity-25 scale-100" : "opacity-0 scale-75"
                                                }`}>
                                                <svg width="55" height="55" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M30 0 A30 30 0 0 1 60 30" stroke={isActive ? "white" : "#999"} strokeWidth="1" />
                                                    <path d="M30 30 A30 30 0 0 0 0 60" stroke={isActive ? "white" : "#999"} strokeWidth="1" />
                                                    <path d="M0 30 A30 30 0 0 1 30 0" stroke={isActive ? "white" : "#999"} strokeWidth="1" />
                                                    <path d="M60 30 A30 30 0 0 0 30 60" stroke={isActive ? "white" : "#999"} strokeWidth="1" />
                                                    <rect x="10" y="10" width="40" height="40" fill="none" stroke={isActive ? "white" : "#999"} strokeWidth="0.5" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ───── CTA Section ───── */}
                <section className="cta-section py-24 container relative z-10 bg-white">
                    <div className="cta-content max-w-3xl mx-auto text-center space-y-6">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-black">
                            Let's create something
                            <span className="text-burnt"> amazing</span> together.
                        </h2>
                        <p className="text-neutral-500 text-lg max-w-lg mx-auto">
                            I'm currently open to new opportunities and collaborations. Let's
                            talk about your next project.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-medium text-sm hover:bg-burnt transition-all duration-300 hover:shadow-lg hover:shadow-burnt/25 hover:-translate-y-0.5"
                        >
                            Start a Conversation
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
