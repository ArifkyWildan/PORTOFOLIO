"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Github, Link as LinkIcon, X, ArrowLeft, ArrowRight, Linkedin, Instagram, Mail, Menu } from "lucide-react";
import SkillPage from "./components/skills";
import ProjectData from "./components/project";
import DummyCertificates from "./components/sertifikat";


//=================================================================
// KOMPONEN IKON SVG (Pengganti react-icons/si)
//=================================================================

// Ikon untuk Spotify
const IconSpotify = () => (
    <svg className="w-6 h-6 text-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM16.94 16.74C16.74 17.04 16.34 17.14 16.04 16.94C13.74 15.54 10.94 15.24 6.84 16.04C6.54 16.14 6.14 15.94 6.04 15.64C5.94 15.34 6.14 14.94 6.44 14.84C10.94 13.94 14.04 14.34 16.64 15.94C16.94 16.04 17.14 16.44 16.94 16.74ZM18.34 14.94C18.04 15.34 17.54 15.44 17.14 15.14C14.54 13.54 10.34 13.14 6.34 14.14C5.94 14.24 5.54 14.04 5.44 13.64C5.34 13.24 5.54 12.84 5.94 12.74C10.34 11.64 14.94 12.14 17.94 13.94C18.34 14.14 18.54 14.64 18.34 14.94ZM18.44 12.94C15.24 11.04 9.84 10.84 5.74 11.94C5.24 12.04 4.84 11.74 4.74 11.24C4.64 10.74 4.94 10.34 5.44 10.24C10.04 9.04 15.84 9.24 19.54 11.54C19.94 11.84 20.04 12.34 19.74 12.74C19.44 13.14 18.94 13.24 18.44 12.94Z" fill="currentColor" />
    </svg>
);

// Ikon untuk Medium
const IconMedium = () => (
    <svg className="w-6 h-6 text-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.54 12.01L21.75 21.19C22.11 21.52 22.08 22.08 21.72 22.39C21.36 22.7 20.8 22.67 20.47 22.31L12.3 13.18L8.1 19.22L6.61 21.41C6.31 21.87 5.76 22.04 5.3 21.74C4.84 21.44 4.67 20.89 4.97 20.43L6.96 17.47L10.06 12.01L5.91 3.01C5.6 2.55 5.77 2 6.23 1.7C6.69 1.4 7.24 1.57 7.55 2.03L13.54 12.01ZM18.44 2.81C18.44 2.81 18.5 2.81 18.5 2.81C19.3 2.81 19.94 3.44 19.94 4.25C19.94 5.03 19.33 5.69 18.56 5.69C17.79 5.69 17.18 5.03 17.18 4.25C17.18 3.44 17.81 2.81 18.44 2.81ZM22.56 2.81C22.56 2.81 22.62 2.81 22.62 2.81C23.41 2.81 24 3.44 24 4.25C24 5.03 23.39 5.69 22.62 5.69C21.85 5.69 21.24 5.03 21.24 4.25C21.24 3.44 21.88 2.81 22.56 2.81Z" fill="currentColor" />
    </svg>
);


//=================================================================
// KOMPONEN NAVBAR MODERN
//=================================================================
type NavItem = {
    label: string;
    href: string;
};

const ModernNavbar: React.FC = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems: NavItem[] = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Skills', href: '#skills' },
        { label: 'Project', href: '#projects' },
        { label: 'Certificates', href: '#certificates' },
        { label: 'Contact', href: '#contact' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Detect active section with better accuracy
            const sections = navItems.map(item => item.href.substring(1));

            // Find the current section based on scroll position
            let current = 'home';
            const scrollPosition = window.scrollY + 150; // Offset for navbar height

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        current = section;
                    }
                }
            }

            setActiveSection(current);
        };

        // Initial check
        handleScroll();

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 sm:py-3' : 'py-4 sm:py-6'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                    <div
                        className={`relative transition-all duration-300 ${isScrolled
                            ? 'bg-white/80 backdrop-blur-xl shadow-lg'
                            : 'bg-white/60 backdrop-blur-md'
                            } rounded-full border border-gray-200/50`}
                    >
                        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3">
                            {/* Logo */}
                            <a href="#home" className="flex items-center space-x-2 group">
                                <span className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                    𝓦<span className="text-[#FF3B3B]">.</span>
                                </span>
                            </a>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex items-center space-x-1">
                                {navItems.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className={`relative px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${activeSection === item.href.substring(1)
                                            ? 'text-white'
                                            : 'text-gray-600 hover:text-black'
                                            }`}
                                    >
                                        {activeSection === item.href.substring(1) && (
                                            <motion.span
                                                layoutId="navbar-indicator"
                                                className="absolute inset-0 bg-black rounded-full"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10">{item.label}</span>
                                    </a>
                                ))}
                            </div>

                            {/* CTA Button - Desktop */}
                            <a
                                href="https://drive.google.com/file/d/1UElmnEU02snCgXCCTNJsgaFtL3cgxim6/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                download="Arifky_Wildan_CV.pdf"
                                className="hidden lg:block px-5 xl:px-6 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                CV
                            </a>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 text-gray-600 hover:text-black transition-colors"
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-16 sm:top-20 left-3 right-3 sm:left-4 sm:right-4 z-40 lg:hidden"
                    >
                        <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                            <div className="p-4 sm:p-6 space-y-1.5 sm:space-y-2">
                                {navItems.map((item, index) => (
                                    <motion.a
                                        key={item.label}
                                        href={item.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`block px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all duration-200 ${activeSection === item.href.substring(1)
                                            ? 'bg-black text-white'
                                            : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                    >
                                        {item.label}
                                    </motion.a>
                                ))}
                                <motion.a
                                    href="https://drive.google.com/file/d/1UElmnEU02snCgXCCTNJsgaFtL3cgxim6/view?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navItems.length * 0.05 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block px-3 sm:px-4 py-2.5 sm:py-3 mt-3 sm:mt-4 bg-[#FF3B3B] text-white text-center rounded-lg sm:rounded-xl text-sm sm:text-base font-medium hover:bg-[#ff2020] transition-colors"
                                >
                                    Download CV
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};


//=================================================================
// KOMPONEN UTAMA (HERO SECTION) - PART 1
//=================================================================
const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const aboutRef = useRef<HTMLElement>(null);
    const skillsRef = useRef<HTMLElement>(null);
    const projectsRef = useRef<HTMLElement>(null);
    const certificatesRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);

    const [isAboutVisible, setIsAboutVisible] = useState(false);
    const [isSkillsVisible, setIsSkillsVisible] = useState(false);
    const [isProjectsVisible, setIsProjectsVisible] = useState(false);
    const [isCertificatesVisible, setIsCertificatesVisible] = useState(false);
    const [isContactVisible, setIsContactVisible] = useState(false);

    const [currentCert, setCurrentCert] = useState(0);

    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const services = ['Design', 'Development', 'Animation', 'Other'];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const createObserver = (ref: React.RefObject<HTMLElement | null>, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
            if (!ref.current) return;
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    setState(true);
                    observer.unobserve(entry.target);
                }
            }, observerOptions);
            observer.observe(ref.current);
            return observer;
        };

        const aboutObserver = createObserver(aboutRef, setIsAboutVisible);
        const skillsObserver = createObserver(skillsRef, setIsSkillsVisible);
        const projectsObserver = createObserver(projectsRef, setIsProjectsVisible);
        const certificatesObserver = createObserver(certificatesRef, setIsCertificatesVisible);
        const contactObserver = createObserver(contactRef, setIsContactVisible);

        return () => {
            clearTimeout(timer);
            aboutObserver?.disconnect();
            skillsObserver?.disconnect();
            projectsObserver?.disconnect();
            certificatesObserver?.disconnect();
            contactObserver?.disconnect();
        };
    }, []);

    const toggleService = (service: string) => {
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };

    const customStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        
        html { 
            scroll-behavior: smooth; 
        }

        .font-playfair { font-family: 'Playfair Display', serif; }
        @keyframes scroll-text { from { transform: translateX(0%); } to { transform: translateX(-50%); } }
        .scrolling-text-container { overflow: hidden; white-space: nowrap; width: 100%; }
        .scrolling-text { display: inline-block; animation: scroll-text 30s linear infinite; }
        .fade-in-element { opacity: 0; transform: translateY(20px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
        .fade-in-element.visible { opacity: 1; transform: translateY(0); }
        .animated-item { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .animated-item.visible { opacity: 1; transform: translateY(0); }
        .btn-gradient { background-image: linear-gradient(to right, #e2e8f0, #dbeafe); transition: all 0.3s ease; }
        .btn-gradient:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(199, 210, 254, 0.6); }

        .contact-input {
            background-color: transparent;
            border-bottom: 1px solid #9ca3af;
            color: #111111;
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            transition: border-color 0.3s ease;
        }
        .contact-input:focus {
            outline: none;
            border-color: #111111;
        }
    `;

    return (
        <>
            <style>{customStyles}</style>

            <div id="home" className="min-h-screen flex flex-col justify-between" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', backgroundColor: '#F8F8F8', color: '#111111' }}>
                <div>
                    <ModernNavbar />

                    <div className="relative w-full h-screen overflow-hidden bg-black">
                        {/* Background Image with Blur */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: 'url(/lobby.jpeg)',
                                filter: 'blur(3px) brightness(0.7)',
                                transform: 'scale(1.1)'
                            }}
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/30" />

                        {/* Content */}
                        <div className="relative z-10 h-full flex items-center px-8 md:px-16 lg:px-24">
                            <div className="max-w-4xl">
                                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-wider leading-tight mb-2">
                                    SOFTWARE
                                </h1>
                                <div className="flex items-center gap-3">
                                    <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-wider">&</span>
                                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-wider">
                                        DEVELOPER
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Left - Name */}
                        <div className="absolute bottom-8 left-8 z-20">
                            <p className="text-white text-sm sm:text-base font-light tracking-wide">
                                Arifky Wildan
                            </p>
                        </div>

                        {/* Bottom Right - Email with Icon */}
                        <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <p className="text-white text-sm sm:text-base font-light">
                                muhammadarifkywildan@gmail.com
                            </p>
                        </div>
                    </div>
                </div>

                <section id="about" ref={aboutRef} className="py-20 md:py-32 px-4 sm:px-8 md:px-12 overflow-hidden">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="text-center md:text-left">
                            <div className={`animated-item ${isAboutVisible ? 'visible' : ''} inline-flex items-center justify-center md:justify-start`}>
                                <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-black flex items-center">
                                    AB<span className="w-12 h-12 md:w-16 md:h-16 bg-[#FF3B3B] rounded-full mx-2"></span>UT
                                </h2>
                            </div>
                            <div className={`animated-item ${isAboutVisible ? 'visible' : ''} w-48 h-1 bg-black mx-auto md:mx-0 mt-4`} style={{ transitionDelay: '100ms' }}></div>
                            <p className={`animated-item ${isAboutVisible ? 'visible' : ''} mt-8 text-gray-600 text-lg`} style={{ transitionDelay: '200ms' }}>
                                Hello! My name Wildan.
                                I am a passionate Software Developer and Fullstack Web Developer, currently studying at SMK Informatika Pesat. With a strong interest in technology and innovation, I've been developing my skills in various programming languages such as JavaScript, Laravel, and other modern web technologies. <br />

                                <br /> I strive to continuously improve my technical expertise and problem-solving abilities to create efficient, scalable, and user-friendly software solutions. My vision is to become a Software Engineer who contributes to meaningful projects, helping people and companies achieve their goals through technology. <br /><br />

                                I believe that great software can make a real impact — not only improving business operations but also making life easier for others. I'm committed to growing both personally and professionally to be a developer who builds solutions that matter.
                            </p>

                        </div>
                        <div className={`relative flex justify-center items-center animated-item ${isAboutVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
                            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                                <svg className="absolute inset-0 w-full h-full text-[#FF3B3B] transform scale-110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M50 0V100" stroke="currentColor" strokeWidth="6" /><path d="M0 50H100" stroke="currentColor" strokeWidth="6" /><path d="M15 15L85 85" stroke="currentColor" strokeWidth="6" /><path d="M85 15L15 85" stroke="currentColor" strokeWidth="6" />
                                </svg>
                                <div className="absolute inset-0 flex justify-center items-center p-4">
                                    <img src="/poto.jpg" alt="A portrait of Arifky Wildan, a software engineer." className="w-full h-full object-cover rounded-full filter grayscale shadow-2xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-20 overflow-hidden">
                    <div className="transform -rotate-3 scale-110 bg-black text-white py-4">
                        <div className="scrolling-text-container">
                            <div className="scrolling-text text-lg font-medium tracking-widest italic">
                                <span className="mx-4">UI/UX</span><span className="text-[#FF3B3B] mx-2">✺</span>
                                <span className="mx-4">MOBILE APP</span><span className="text-[#FF3B3B] mx-2">✺</span>
                                <span className="mx-4">WEBSITE DEV</span><span className="text-[#FF3B3B] mx-2">✺</span>
                                <span className="mx-4">FRONTEND</span><span className="text-[#FF3B3B] mx-2">✺</span>
                                <span className="mx-4">BACKEND</span><span className="text-[#FF3B3B] mx-2">✺</span>
                                <span className="mx-4">ENGINEER</span><span className="text-[#FF3B3B] mx-2">✺</span>
                                <span className="mx-4">DESIGN</span><span className="text-[#FF3B3B] mx-2">✺</span>
                                <span className="mx-4">UI/UX</span><span className="text-[#FF3B3B] mx-2">✺</span>
                                <span className="mx-4">MOBILE APP</span><span className="text-[#FF3B3B] mx-2">✺</span>
                                <span className="mx-4">WEBSITE DEV</span><span className="text-[#FF3B3B] mx-2">✺</span>
                                <span className="mx-4">FRONTEND</span><span className="text-[#FF3B3B] mx-2">✺</span>
                                <span className="mx-4">BACKEND</span><span className="text-[#FF3B3B] mx-2">✺</span>
                                <span className="mx-4">ENGINEER</span><span className="text-[#FF3B3B] mx-2">✺</span>
                                <span className="mx-4">DESIGN</span><span className="text-[#FF3B3B] mx-2">✺</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="skills" ref={skillsRef} className="py-20 md:py-32 px-4 sm:px-8 md:px-12 overflow-hidden">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className={`animated-item ${isSkillsVisible ? 'visible' : ''}`}>
                            <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-black flex items-center justify-center">
                                SK<span className="w-12 h-12 md:w-16 md:h-16 bg-[#FF3B3B] rounded-full mx-2"></span>LLS
                            </h2>
                            <div className="w-48 h-1 bg-black mx-auto mt-4"></div>
                            <section id="skills">
                                <SkillPage />
                            </section>
                        </div>
                    </div>
                </section>

                <section id="projects">
                    <ProjectData />
                </section>

                <section id="certificates" ref={certificatesRef} className="py-20 md:py-32 px-4 sm:px-8 md:px-12 overflow-hidden">
                    <DummyCertificates />
                </section>

                <section id="contact" ref={contactRef} className="py-20 md:py-32 px-4 sm:px-8 md:px-12 overflow-hidden">
                    <div className="max-w-7xl mx-auto">
                        <div className={`animated-item ${isContactVisible ? 'visible' : ''}`}>
                            <h2 className="font-playfair text-6xl md:text-8xl font-normal text-black">Contact us</h2>
                        </div>

                        <div className={`animated-item ${isContactVisible ? 'visible' : ''} mt-4 md:mt-0`} style={{ transitionDelay: '100ms' }}>
                            <h3 className="font-playfair text-5xl md:text-7xl text-gray-500">— Have a project?</h3>
                        </div>

                        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-16">

                            <form className="md:col-span-2 space-y-10" onSubmit={(e) => e.preventDefault()}>
                                <div className={`animated-item ${isContactVisible ? 'visible' : ''}`} style={{ transitionDelay: '200ms' }}>
                                    <label className="text-lg text-gray-800">What can we do for you?</label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className={`animated-item ${isContactVisible ? 'visible' : ''} flex flex-col`} style={{ transitionDelay: '300ms' }}>
                                        <label htmlFor="name" className="text-lg text-gray-800">Your name</label>
                                        <input type="text" id="name" className="mt-2 contact-input" />
                                    </div>
                                    <div className={`animated-item ${isContactVisible ? 'visible' : ''} flex flex-col`} style={{ transitionDelay: '400ms' }}>
                                        <label htmlFor="email" className="text-lg text-gray-800">Your email</label>
                                        <input type="email" id="email" className="mt-2 contact-input" />
                                    </div>
                                </div>

                                <div className={`animated-item ${isContactVisible ? 'visible' : ''} flex flex-col`} style={{ transitionDelay: '500ms' }}>
                                    <label htmlFor="details" className="text-lg text-gray-800">Project details</label>
                                    <textarea id="details" rows={4} className="mt-2 contact-input resize-none"></textarea>
                                </div>

                                <div className={`animated-item ${isContactVisible ? 'visible' : ''}`} style={{ transitionDelay: '600ms' }}>
                                    <button type="submit" className="inline-block px-10 py-4 border-2 border-black rounded-full font-bold text-black tracking-widest hover:bg-black hover:text-white transition-all duration-300">
                                        Send
                                    </button>
                                </div>
                            </form>

                            <div className="md:col-span-1">
                                <div className={`animated-item ${isContactVisible ? 'visible' : ''}`} style={{ transitionDelay: '300ms' }}>
                                    <h4 className="text-lg text-black">Tell us about your vision:</h4>
                                    <p className="mt-4 text-gray-600 leading-relaxed">
                                        which challenges are you facing? What are your goals and expectations? What would success look like and how much are you planning to spend to get there?
                                    </p>
                                </div>

                                <div className={`animated-item ${isContactVisible ? 'visible' : ''} mt-12`} style={{ transitionDelay: '500ms' }}>
                                    <h4 className="text-lg text-black mb-4">Find me on:</h4>
                                    <div className="flex space-x-6 text-gray-500">
                                        <a href="https://www.linkedin.com/in/arifky-wildan-02369a337/" className="hover:text-black transition-colors" aria-label="LinkedIn">
                                            <Linkedin size={24} />
                                        </a>
                                        <a href="https://www.instagram.com/arfkywldn/" className="hover:text-black transition-colors" aria-label="Instagram">
                                            <Instagram size={24} />
                                        </a>
                                        <a href="https://github.com/ArifkyWildan" className="hover:text-black transition-colors" aria-label="Github">
                                            <Github size={24} />
                                        </a>
                                        <a href="mailto:muhammadarifkywildan@gmail.com" className="hover:text-black transition-colors" aria-label="Email">
                                            <Mail size={24} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default HeroSection;