"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <>
            <Navbar />
            <main className="pt-[72px]">
                <section className="py-20 container">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* ───── Left: Info ───── */}
                        <div className="space-y-8">
                            <div>
                                <p className="text-burnt font-semibold tracking-wide text-sm uppercase mb-4">
                                    Get in Touch
                                </p>
                                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black leading-tight">
                                    Let's work
                                    <br />
                                    <span className="text-burnt">together.</span>
                                </h1>
                                <p className="text-neutral-500 text-lg mt-6 leading-relaxed max-w-md">
                                    Have a project in mind or just want to say hi? I'd love to
                                    hear from you. Drop me a message and I'll get back to you as
                                    soon as possible.
                                </p>
                            </div>

                            {/* Contact details */}
                            <div className="space-y-5">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-burnt/10 flex items-center justify-center group-hover:bg-burnt group-hover:scale-105 transition-all duration-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-burnt group-hover:text-white transition-colors duration-300"
                                        >
                                            <rect width="20" height="16" x="2" y="4" rx="2" />
                                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">
                                            Email
                                        </p>
                                        <a
                                            href="mailto:hello@vinoy.design"
                                            className="text-black font-medium hover:text-burnt transition-colors"
                                        >
                                            hello@vinoy.design
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 group">
                                    <div className="w-12 h-12 rounded-xl bg-burnt/10 flex items-center justify-center group-hover:bg-burnt group-hover:scale-105 transition-all duration-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-burnt group-hover:text-white transition-colors duration-300"
                                        >
                                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold">
                                            Location
                                        </p>
                                        <p className="text-black font-medium">India</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social */}
                            <div>
                                <p className="text-xs text-neutral-400 uppercase tracking-widest font-semibold mb-4">
                                    Follow Me
                                </p>
                                <div className="flex gap-3">
                                    {[
                                        {
                                            name: "Dribbble",
                                            href: "https://dribbble.com",
                                            icon: (
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
                                                >
                                                    <circle cx="12" cy="12" r="10" />
                                                    <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
                                                    <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
                                                    <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
                                                </svg>
                                            ),
                                        },
                                        {
                                            name: "Behance",
                                            href: "https://behance.net",
                                            icon: (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                >
                                                    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
                                                </svg>
                                            ),
                                        },
                                        {
                                            name: "LinkedIn",
                                            href: "https://linkedin.com",
                                            icon: (
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
                                                >
                                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                                    <rect width="4" height="12" x="2" y="9" />
                                                    <circle cx="4" cy="4" r="2" />
                                                </svg>
                                            ),
                                        },
                                    ].map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 rounded-xl border border-neutral-100 flex items-center justify-center text-neutral-400 hover:text-burnt hover:border-burnt/30 hover:bg-burnt/5 transition-all duration-300 hover:-translate-y-0.5"
                                            title={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ───── Right: Form ───── */}
                        <div className="relative">
                            {/* Decorative gradient */}
                            <div className="absolute -top-12 -right-12 w-48 h-48 bg-burnt/5 rounded-full blur-3xl pointer-events-none" />

                            <form
                                onSubmit={handleSubmit}
                                className="relative space-y-5 p-8 rounded-2xl border border-neutral-100 bg-white"
                            >
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-black mb-2"
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-black placeholder:text-neutral-400 focus:outline-none focus:border-burnt focus:ring-2 focus:ring-burnt/10 transition-all duration-300 text-sm"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-black mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-black placeholder:text-neutral-400 focus:outline-none focus:border-burnt focus:ring-2 focus:ring-burnt/10 transition-all duration-300 text-sm"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-black mb-2"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({ ...formData, message: e.target.value })
                                        }
                                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 bg-neutral-50 text-black placeholder:text-neutral-400 focus:outline-none focus:border-burnt focus:ring-2 focus:ring-burnt/10 transition-all duration-300 text-sm resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-burnt text-white py-4 rounded-xl font-medium text-sm hover:bg-burnt-dark transition-all duration-300 hover:shadow-lg hover:shadow-burnt/25 cursor-pointer"
                                >
                                    {submitted ? (
                                        <span className="flex items-center justify-center gap-2">
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
                                            >
                                                <path d="M20 6 9 17l-5-5" />
                                            </svg>
                                            Message Sent!
                                        </span>
                                    ) : (
                                        "Send Message"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
