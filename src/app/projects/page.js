"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

const projects = [
    {
        id: 1,
        title: "Finance Dashboard",
        category: "Web App Design",
        description:
            "A clean, data-rich dashboard for a fintech startup helping users manage investments and track portfolio performance.",
        tags: ["UI Design", "Dashboard", "Fintech"],
        color: "#FF6C1C",
    },
    {
        id: 2,
        title: "Health & Wellness App",
        category: "Mobile App Design",
        description:
            "An intuitive wellness companion app featuring habit tracking, mindfulness exercises, and personalized health insights.",
        tags: ["Mobile", "Health", "UX Research"],
        color: "#0a0a0a",
    },
    {
        id: 3,
        title: "E-Commerce Redesign",
        category: "Web Design",
        description:
            "Complete redesign of a luxury fashion e-commerce platform focusing on elevated browsing and seamless checkout experiences.",
        tags: ["E-Commerce", "Redesign", "Luxury"],
        color: "#FF6C1C",
    },
    {
        id: 4,
        title: "SaaS Design System",
        category: "Design System",
        description:
            "Built a scalable design system with 200+ components, comprehensive documentation, and Figma tokens for a B2B SaaS product.",
        tags: ["Design System", "Components", "Figma"],
        color: "#0a0a0a",
    },
    {
        id: 5,
        title: "Travel Booking Platform",
        category: "Web App Design",
        description:
            "Designed an end-to-end travel booking experience with smart recommendations, interactive maps, and frictionless payments.",
        tags: ["Travel", "Booking", "UX"],
        color: "#FF6C1C",
    },
    {
        id: 6,
        title: "Social Media App",
        category: "Mobile App Design",
        description:
            "A next-gen social platform designed for creators, featuring content monetization, live streaming, and collaborative tools.",
        tags: ["Social", "Mobile", "Creators"],
        color: "#0a0a0a",
    },
];

const categories = [
    "All",
    "Web App Design",
    "Mobile App Design",
    "Web Design",
    "Design System",
];

export default function Projects() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects =
        activeCategory === "All"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    return (
        <>
            <Navbar />
            <main className="pt-[72px]">
                {/* ───── Header ───── */}
                <section className="py-20 container">
                    <p className="text-burnt font-semibold tracking-wide text-sm uppercase mb-4">
                        Selected Work
                    </p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-tight">
                        Projects that{" "}
                        <span className="text-burnt">speak</span>
                        <br />
                        for themselves.
                    </h1>
                    <p className="text-neutral-500 text-lg mt-6 max-w-xl">
                        A curated selection of product design work spanning mobile apps, web
                        platforms, and design systems.
                    </p>
                </section>

                {/* ───── Filters ───── */}
                <section className="pb-12 container">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${activeCategory === cat
                                    ? "bg-burnt text-white shadow-md shadow-burnt/20"
                                    : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-black"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </section>

                {/* ───── Project Grid ───── */}
                <section className="pb-24 container">
                    <div className="grid md:grid-cols-2 gap-6">
                        {filteredProjects.map((project, i) => (
                            <div
                                key={project.id}
                                className="group relative rounded-2xl border border-neutral-100 overflow-hidden hover:border-burnt/30 transition-all duration-500 hover:shadow-xl hover:shadow-burnt/5 hover:-translate-y-1"
                                style={{
                                    animationDelay: `${i * 100}ms`,
                                    animation: "fadeUp 0.6s ease-out both",
                                }}
                            >
                                {/* Project Thumbnail Area */}
                                <div
                                    className="h-56 sm:h-64 flex items-center justify-center relative overflow-hidden"
                                    style={{
                                        background:
                                            project.color === "#FF6C1C"
                                                ? "linear-gradient(135deg, #FFF5EE, #FFE8D6)"
                                                : "linear-gradient(135deg, #f5f5f5, #e8e8e8)",
                                    }}
                                >
                                    <div className="text-center z-10">
                                        <div
                                            className="w-16 h-16 rounded-2xl mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                                            style={{ backgroundColor: project.color }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="28"
                                                height="28"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <rect x="3" y="3" width="18" height="18" rx="2" />
                                                <path d="M3 9h18" />
                                                <path d="M9 21V9" />
                                            </svg>
                                        </div>
                                    </div>
                                    {/* Decorative circles */}
                                    <div
                                        className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"
                                        style={{ backgroundColor: project.color }}
                                    />
                                    <div
                                        className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700"
                                        style={{ backgroundColor: project.color }}
                                    />
                                </div>

                                {/* Project Info */}
                                <div className="p-6 bg-white">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-semibold uppercase tracking-widest text-burnt">
                                            {project.category}
                                        </span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-neutral-300 group-hover:text-burnt group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                                        >
                                            <path d="M7 17 17 7" />
                                            <path d="M7 7h10v10" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-black mb-2 group-hover:text-burnt transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs px-3 py-1 rounded-full bg-neutral-50 text-neutral-500 border border-neutral-100"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />

            <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </>
    );
}
