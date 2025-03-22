"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-sm z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/">
                            <Image 
                                src="/Parawild-Edu.svg"
                                alt="Parawild Edu Logo"
                                width={119}
                                height={15}
                                className="w-auto h-auto"
                            />
                        </Link>
                    </div>

                    {/* Hamburger Menu Button */}
                    <button 
                        className="md:hidden p-2 text-white hover:bg-black/60 rounded-md"
                        onClick={handleMenuToggle}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link 
                            href="/blogs"
                            className="text-white uppercase text-sm font-medium hover:bg-black/60 px-4 py-2 rounded-md transition-colors"
                            tabIndex={0}
                            aria-label="Blog"
                        >
                            Blogs
                        </Link>
                        <Link
                            href="/workshops" 
                            className="text-white uppercase text-sm font-medium hover:bg-black/60 px-4 py-2 rounded-md transition-colors"
                            tabIndex={0}
                            aria-label="Workshops"
                        >
                            Workshops
                        </Link>
                        <Link
                            href="/contact"
                            className="text-white uppercase text-sm font-medium hover:bg-black/60 px-4 py-2 rounded-md transition-colors"
                            tabIndex={0}
                            aria-label="Contact Us"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
                    <div className="flex flex-col gap-2">
                        <Link 
                            href="/blogs"
                            className="text-white uppercase text-sm font-medium hover:bg-black/60 px-4 py-2 rounded-md transition-colors text-center"
                            tabIndex={0}
                            aria-label="Blogs"
                        >
                            Blog
                        </Link>
                        <Link
                            href="/workshops" 
                            className="text-white uppercase text-sm font-medium hover:bg-black/60 px-4 py-2 rounded-md transition-colors text-center"
                            tabIndex={0}
                            aria-label="Workshops"
                        >
                            Workshops
                        </Link>
                        <Link
                            href="/contact"
                            className="text-white uppercase text-sm font-medium hover:bg-black/60 px-4 py-2 rounded-md transition-colors text-center"
                            tabIndex={0}
                            aria-label="Contact Us"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
