import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-neutral-100 bg-white">
            <div className="container py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="text-xl font-bold tracking-tight text-black"
                        >
                            Vinoy<span className="text-burnt">.</span>
                        </Link>
                        <p className="text-neutral-400 text-sm mt-2 max-w-xs">
                            Crafting meaningful digital experiences through thoughtful design.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex gap-8">
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-300">
                                Navigate
                            </span>
                            <Link
                                href="/"
                                className="text-sm text-neutral-500 hover:text-burnt transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="/projects"
                                className="text-sm text-neutral-500 hover:text-burnt transition-colors"
                            >
                                Projects
                            </Link>
                            <Link
                                href="/contact"
                                className="text-sm text-neutral-500 hover:text-burnt transition-colors"
                            >
                                Contact
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-300">
                                Social
                            </span>
                            <a
                                href="https://dribbble.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-neutral-500 hover:text-burnt transition-colors"
                            >
                                Dribbble
                            </a>
                            <a
                                href="https://behance.net"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-neutral-500 hover:text-burnt transition-colors"
                            >
                                Behance
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-neutral-500 hover:text-burnt transition-colors"
                            >
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-6 border-t border-neutral-100 flex flex-col md:flex-row justify-between items-center gap-2">
                    <p className="text-xs text-neutral-400">
                        © {currentYear} Vinoy. All rights reserved.
                    </p>
                    <p className="text-xs text-neutral-300">
                        Designed & built with passion.
                    </p>
                </div>
            </div>
        </footer>
    );
}
