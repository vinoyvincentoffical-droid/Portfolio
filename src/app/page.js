"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import ParticleButton from "@/components/ParticleButton";

// Moved outside component to avoid re-creation on every render
const ROLES = ["Product Designer", "UI Designer", "UX Designer", "HI Designer"];

const DELIVERABLES = [
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
    {
        id: 4,
        title: "Optimize & Evolve",
        description: "Great products don't freeze in time. They learn, adapt, and sharpen themselves. I help teams move beyond launch by turning data into direction and feedback into refinement. Through performance analysis, user insights, and iterative design improvements, I ensure your product grows smarter, faster, and more aligned with real user needs.",
        tags: ["Analytics & Insights", "User Testing", "Performance Optimization", "Continuous Improvement"],
    },
];

const PROJECTS = [
    {
        id: 1,
        category: "Web Design",
        title: "Synctric Capital",
        subtitle: "Experience Architecture & Digital Ecosystem",
        image: "/assets/card_synctric.png",
        description: "We architected a comprehensive suite of digital tools designed to help financial businesses optimize growth by providing deep insights into user behavior and streamlining complex campaign logic.",
    },
    {
        id: 2,
        category: "Mobile Design",
        title: "Health Wellness App",
        subtitle: "Mobile Application UI Design",
        image: "/assets/card_health.png",
        description: "An intuitive, highly accessible mobile interface designed to help users track nutritional intake and physical wellness effectively. Utilizes stark contrasts and spacious typography for ultimate readability.",
    },
    {
        id: 3,
        category: "UX/UI",
        title: "Omni Dashboard",
        subtitle: "B2B User Experience Architecture",
        image: "/assets/card_omni.png",
        description: "Restructuring a legacy SaaS product. We conducted extensive user testing to streamline a confusing 14-step onboarding process into a seamless 3-step wizard, resulting in a 40% reduction in bounce rate.",
    },
    {
        id: 4,
        category: "Print Design",
        title: "Exhibition '25",
        subtitle: "Typography & Print Visuals",
        image: "/assets/card_poster.png",
        description: "A high-contrast, brutalist poster series for an upcoming modern art exhibition. Utilizing strict grid systems pushed to their limits to explore the boundaries of legibility and visual tension.",
    },
    {
        id: 5,
        category: "Brand Strategy",
        title: "Nexus Group",
        subtitle: "Brand Strategy & Guidelines",
        image: "/assets/card_nexus.png",
        description: "Developed a comprehensive visual identity that resonates with their core audience. Delivered scalable logo systems, strict typographic hierarchy, and a 100-page brand playbook ensuring omni-channel consistency.",
    },
    {
        id: 6,
        category: "Packaging",
        title: "Aura Skincare",
        subtitle: "Sustainable Structural Packaging",
        image: "/assets/card_aura.png",
        description: "Engineering a bespoke, highly sustainable unboxing experience. We designed structural cardboard replacements for legacy plastic inserts that speak volumes about their commitment to the planet.",
    },
];


export default function Home() {
    const imgRef = useRef(null);
    const h1Ref = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [subtitleRight, setSubtitleRight] = useState(0);
    const [roleIndex, setRoleIndex] = useState(0);
    const [hoveredItem, setHoveredItem] = useState(1);



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
            setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, 2500);
        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    trigger: ".about-wrapper",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
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

            // Accordion Scroll Animation
            ScrollTrigger.create({
                trigger: ".deliver-wrapper",
                start: "top top",
                end: "bottom bottom",
                onUpdate: (self) => {
                    const progress = self.progress;
                    // Map progress 0-1 to item index 0-3
                    const activeIndex = Math.min(
                        3,
                        Math.max(0, Math.floor(progress * 4))
                    );
                    setHoveredItem(activeIndex + 1);
                }
            });

            // 2. What I Deliver -> Works Transition
            // Overlap is handled via static marginTop: -100vh in the JSX and z-index.
            // This ensures ScrollTrigger calculations remain stable for pinning.


            // 3. Works Section Horizontal Scroll & Flip Animation
            const worksWrapper = document.querySelector(".works-wrapper");
            const scrollContainer = document.querySelector(".works-scroll-container");
            const cards = gsap.utils.toArray(".work-card-container");

            if (worksWrapper && scrollContainer && cards.length > 0) {
                // Main Timeline for pinning and horizontal scroll
                const worksTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: worksWrapper,
                        // Start pinning once it has fully slid up over the previous section
                        start: "top top",
                        end: () => `+=${scrollContainer.scrollWidth + window.innerWidth}`,
                        pin: true,
                        scrub: 1.2,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    }
                });

                const sectionEase = "power2.inOut";

                const getScrollAmount = () => {
                    let containerWidth = scrollContainer.scrollWidth;
                    let viewportWidth = window.innerWidth;
                    return -(containerWidth - viewportWidth);
                };

                // Entry Slide: Ensure it starts from off-screen relative to the current container position
                worksTl.fromTo(scrollContainer,
                    { x: "100vw" },
                    { x: 0, duration: 1.5, ease: sectionEase }
                );

                // Horizontal movement
                worksTl.to(scrollContainer, {
                    x: getScrollAmount,
                    ease: "none",
                    duration: 4
                });

                // Card Flip Logic — flip when card center crosses viewport center
                cards.forEach((card, i) => {
                    const innerCard = card.querySelector(".work-card-inner");
                    gsap.fromTo(innerCard,
                        { rotateY: 0 },
                        {
                            rotateY: 180,
                            transformOrigin: "50% 50%",
                            ease: "power2.inOut",
                            scrollTrigger: {
                                trigger: card,
                                containerAnimation: worksTl,
                                start: "center 60%",
                                end: "center 40%",
                                scrub: 1.5,
                            }
                        }
                    );
                });
            }
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Navbar />
            <main>
                {/* ───── Hero Section ───── */}
                <section data-theme="light" className="sticky top-0 h-screen overflow-hidden bg-[#f0f0f4]" style={{ isolation: 'isolate' }}>
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
                                {ROLES.map((role, i) => (
                                    <span
                                        key={role}
                                        className="absolute left-0 w-full text-burnt transition-all duration-500 ease-in-out"
                                        style={{
                                            transform: i === roleIndex
                                                ? 'translateY(0) rotateX(0)'
                                                : i === (roleIndex - 1 + ROLES.length) % ROLES.length
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

                {/* ───── About Section Wrapper (provides scroll distance) ───── */}
                <div data-theme="dark" className="about-wrapper relative z-10" style={{ height: '300vh' }}>
                    <section className="about-section sticky top-0 h-screen bg-[#111111] flex flex-col justify-center overflow-hidden py-24">
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
                </div>

                {/* ───── What I Deliver Section ───── */}
                <div data-theme="light" className="deliver-wrapper relative z-20" style={{ marginTop: '-100vh', height: '300vh' }}>
                    <section className="deliver-section sticky top-0 bg-[#f0f0f4] min-h-screen flex flex-col justify-between pb-0" style={{ paddingTop: '25vh' }}>
                        {/* Header — constrained width */}
                        <div className="deliver-header container mb-32">
                            <div className="flex justify-between items-start">
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
                        </div>

                        {/* Accordion — full width container */}
                        <div className="deliver-accordion w-full flex flex-col border-t border-neutral-300/80" style={{ height: '50vh' }}>
                            {DELIVERABLES.map((item) => {
                                const isActive = hoveredItem === item.id;
                                const num = String(item.id).padStart(2, "0");
                                return (
                                    <div
                                        key={item.id}
                                        className={`border-b border-neutral-300/80 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? "bg-burnt flex-[3]" : "bg-transparent flex-[1]"
                                            }`}
                                    >
                                        <div className={`h-full container flex items-center gap-4 md:gap-8 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${isActive ? "py-8" : "py-5"
                                            }`}>

                                            {/* Title — 50% */}
                                            <h3 className={`text-2xl sm:text-3xl md:text-[40px] font-semibold tracking-tight leading-tight transition-all duration-500 flex-shrink-0 w-[50%] ${isActive ? "text-white" : "text-black"
                                                }`}>
                                                {item.title}
                                            </h3>

                                            {/* Middle: description + tags — 30% */}
                                            <div className="w-[30%] flex-shrink-0">
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

                                            {/* Number — 10% */}
                                            <span className={`text-5xl md:text-7xl font-bold tracking-tight transition-all duration-700 flex-shrink-0 leading-none w-[10%] text-right ${isActive ? "text-white/80" : "text-neutral-300"
                                                }`}>
                                                {num}
                                            </span>


                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* ───── Works Section (Horizontal Scroll & Flip Reveal) ───── */}
                <div data-theme="dark" className="works-wrapper relative z-40 bg-[#111111]" style={{ marginTop: '-100vh' }}>
                    <section className="h-screen w-full flex flex-col justify-center overflow-hidden py-10 md:py-20" style={{ perspective: "1500px" }}>
                        <div className="container max-w-[1400px] w-full mx-auto px-4 md:px-8 mb-8 md:mb-12 flex flex-col md:flex-row justify-between items-end gap-6 flex-shrink-0">
                            <div>
                                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white flex items-center gap-4">
                                    What We Do
                                    <svg className="w-8 h-8 md:w-12 md:h-12 text-white stroke-[2px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </h2>
                            </div>
                            <Button className="rounded-full !h-auto bg-transparent border border-white text-white hover:bg-white hover:text-black !px-8 !py-3 text-sm flex items-center gap-3 transition-colors">
                                About Us
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19L19 5m0 0v10m0-10H9" />
                                </svg>
                            </Button>
                        </div>

                        {/* Scrolling Track */}
                        <div className="w-full overflow-visible">
                            <div className="works-scroll-container flex gap-6 w-max h-[60vh] max-h-[600px] min-h-[450px] pl-[calc(50vw-175px)] md:pl-[calc(50vw-210px)] pr-[calc(50vw-175px)] md:pr-[calc(50vw-210px)]">

                                {PROJECTS.map((project) => (
                                    <div key={project.id} className="work-card-container group relative w-[350px] md:w-[420px] h-full shrink-0" style={{ perspective: "1200px" }}>
                                        <div className="work-card-inner relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                                            {/* Front */}
                                            <div className="absolute inset-0 bg-white rounded-[2rem] p-4 flex flex-col gap-4" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                                                <div className="w-full flex-1 rounded-2xl overflow-hidden">
                                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="px-4 pb-2">
                                                    <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400 mb-1">{project.category}</p>
                                                    <h3 className="text-xl font-bold text-black leading-tight">{project.title}</h3>
                                                    <p className="text-neutral-500 text-xs font-medium mt-0.5">{project.subtitle}</p>
                                                </div>
                                            </div>
                                            {/* Back */}
                                            <div className="absolute inset-0 bg-[#111] rounded-[2rem] border border-neutral-800 p-7 flex flex-col justify-between" style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                                                <div>
                                                    <p className="text-[11px] font-semibold uppercase tracking-widest text-neutral-500 mb-3">{project.category}</p>
                                                    <h3 className="text-white text-2xl font-bold mb-3 leading-tight">{project.title}</h3>
                                                    <div className="w-8 h-[2px] bg-[#FF6C1C] mb-4"></div>
                                                    <p className="text-neutral-400 text-sm leading-relaxed">{project.description}</p>
                                                </div>
                                                <button className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2">
                                                    View Project <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}


                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <div className="relative z-[60]">
                <Footer />
            </div>
        </>
    );
}
