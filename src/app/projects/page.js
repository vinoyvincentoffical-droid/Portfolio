"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const projects = [
    {
        id: 1,
        title: "Synctric Capital Website",
        category: "Web Design",
        iframeSrc: "https://www.behance.net/embed/project/231739003?ilo0=1",
    },
    {
        id: 2,
        title: "Health & Wellness UI",
        category: "Mobile Design",
        iframeSrc: "https://www.behance.net/embed/project/214003077?ilo0=1",
    },
];

export default function Projects() {

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


                {/* ───── Project Grid ───── */}
                <section className="pb-24 container">
                    <div className="grid md:grid-cols-2 gap-6">
                        {projects.map((project, i) => (
                            <div
                                key={project.id}
                                className="group relative rounded-3xl border border-neutral-200/60 bg-white overflow-hidden hover:border-burnt/40 transition-all duration-500 hover:shadow-2xl hover:shadow-burnt/10 hover:-translate-y-2 flex flex-col"
                                style={{
                                    animationDelay: `${i * 150}ms`,
                                    animation: "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
                                }}
                            >
                                {/* Behance iFrame Embed */}
                                <div className="w-full relative pt-[78%] bg-[#f8f8f8]">
                                    <iframe
                                        src={project.iframeSrc}
                                        allowFullScreen
                                        loading="lazy"
                                        frameBorder="0"
                                        allow="clipboard-write"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>

                                {/* Project Info */}
                                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between border-t border-neutral-100">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-burnt bg-burnt/5 px-3 py-1.5 rounded-full">
                                                {project.category}
                                            </span>
                                            <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-burnt group-hover:border-burnt group-hover:text-white transition-colors duration-300 text-neutral-400">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="14"
                                                    height="14"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
                                                >
                                                    <path d="M7 17 17 7" />
                                                    <path d="M7 7h10v10" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-black mb-2 group-hover:text-burnt transition-colors duration-300 line-clamp-2">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <a
                                        href={project.iframeSrc.replace('/embed/project/', '/gallery/').split('?')[0]}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="absolute inset-0 z-10"
                                        aria-label={`View ${project.title} on Behance`}
                                    >
                                        <span className="sr-only">View Project</span>
                                    </a>
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
