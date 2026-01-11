// PART 1 - COPY SEMUA CODE INI KE FILE ANDA
// File: page.tsx atau HeroSection.tsx

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Instagram, Github, Mail, Menu, X } from 'lucide-react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import emailjs from '@emailjs/browser';
import SkillPage from "./components/skills";
import ProjectData from "./components/project";
import DummyCertificates from "./components/sertifikat";

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

            const sections = navItems.map(item => item.href.substring(1));
            let current = 'home';
            const scrollPosition = window.scrollY + 150;

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

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 sm:py-3' : 'py-4 sm:py-6'}`}
            >
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                    <div className={`relative transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg' : 'bg-white/60 backdrop-blur-md'} rounded-full border border-gray-200/50`}>
                        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3">
                            <a href="#home" className="flex items-center space-x-2 group">
                                <span className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                                    𝓦<span className="text-[#FF3B3B]">.</span>
                                </span>
                            </a>

                            <div className="hidden lg:flex items-center space-x-1">
                                {navItems.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className={`relative px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${activeSection === item.href.substring(1) ? 'text-white' : 'text-gray-600 hover:text-black'}`}
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

                            <a
                                href="https://drive.google.com/file/d/1UElmnEU02snCgXCCTNJsgaFtL3cgxim6/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden lg:block px-5 xl:px-6 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                CV
                            </a>

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
                                        className={`block px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all duration-200 ${activeSection === item.href.substring(1) ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-100'}`}
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
// KOMPONEN UTAMA (HERO SECTION) - DENGAN PARALLAX & EMAILJS
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

    // State untuk form contact dengan EmailJS
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        service: '',
        email: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        // Validasi form
        if (!formData.firstName || !formData.email) {
            alert('Please fill in all required fields (Name and Email)');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Template parameters untuk EmailJS
            const templateParams = {
                from_name: `${formData.firstName} ${formData.lastName}`.trim(),
                from_email: formData.email,
                service: formData.service || 'Not specified',
                message: formData.description || 'No description provided',
                to_email: 'muhammadarifkywildan@gmail.com'
            };

            // ⚠️ GANTI 3 NILAI DI BAWAH INI DENGAN KREDENSIAL EMAILJS ANDA
            const result = await emailjs.send(
                'service_pbi275h',      // 👈 Ganti dengan Service ID dari EmailJS
                'template_8v0g92f',     // 👈 Ganti dengan Template ID dari EmailJS
                templateParams,
                'pb4tbaVnR7_okhHW6'       // 👈 Ganti dengan Public Key dari EmailJS
            );

            console.log('Email sent successfully:', result.text);
            setSubmitStatus('success');

            // Reset form
            setFormData({
                firstName: '',
                lastName: '',
                service: '',
                email: '',
                description: ''
            });

            // Hide success message after 5 seconds
            setTimeout(() => {
                setSubmitStatus('idle');
            }, 5000);

        } catch (error) {
            console.error('Failed to send email:', error);
            setSubmitStatus('error');

            // Hide error message after 5 seconds
            setTimeout(() => {
                setSubmitStatus('idle');
            }, 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

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

        @keyframes fade-in {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out;
        }
    `;

    return (
        <ParallaxProvider>
            <style>{customStyles}</style>

            <div id="home" className="min-h-screen flex flex-col justify-between" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', backgroundColor: '#F8F8F8', color: '#111111' }}>
                <div>
                    <ModernNavbar />

                    <div className="relative w-full h-screen overflow-hidden bg-black">
                        <Parallax speed={-10}>
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: 'url(/lobby.jpeg)',
                                    filter: 'blur(3px) brightness(0.7)',
                                    transform: 'scale(1.1)',
                                    height: '120vh'
                                }}
                            />
                        </Parallax>

                        <div className="absolute inset-0 bg-black/30" />

                        <div className="relative z-10 h-full flex items-center px-8 md:px-16 lg:px-24">
                            <div className="max-w-4xl">
                                <Parallax speed={5}>
                                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-wider leading-tight mb-2">
                                        SOFTWARE
                                    </h1>
                                </Parallax>
                                <Parallax speed={8}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-wider">&</span>
                                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-wider">
                                            DEVELOPER
                                        </h1>
                                    </div>
                                </Parallax>
                            </div>
                        </div>

                        <Parallax speed={-5}>
                            <div className="absolute bottom-8 left-8 z-20">
                                <p className="text-white text-sm sm:text-base font-light tracking-wide">
                                    Arifky Wildan
                                </p>
                            </div>
                        </Parallax>

                        <Parallax speed={-5}>
                            <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <p className="text-white text-sm sm:text-base font-light">
                                    muhammadarifkywildan@gmail.com
                                </p>
                            </div>
                        </Parallax>
                    </div>
                </div>

                <section id="about" ref={aboutRef} className="py-20 md:py-32 px-4 sm:px-8 md:px-12 overflow-hidden">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <Parallax speed={-5}>
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
                        </Parallax>

                        <Parallax speed={5} scale={[0.8, 1.1]}>
                            <div className={`relative flex justify-center items-center animated-item ${isAboutVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
                                <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                                    <svg className="absolute inset-0 w-full h-full text-[#FF3B3B] transform scale-110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M50 0V100" stroke="currentColor" strokeWidth="6" />
                                        <path d="M0 50H100" stroke="currentColor" strokeWidth="6" />
                                        <path d="M15 15L85 85" stroke="currentColor" strokeWidth="6" />
                                        <path d="M85 15L15 85" stroke="currentColor" strokeWidth="6" />
                                    </svg>
                                    <div className="absolute inset-0 flex justify-center items-center p-4">
                                        <img src="/poto.jpg" alt="A portrait of Arifky Wildan, a software engineer." className="w-full h-full object-cover rounded-full filter grayscale shadow-2xl" />
                                    </div>
                                </div>
                            </div>
                        </Parallax>
                    </div>
                </section>

                <section className="w-full py-12 md:py-20 overflow-hidden">
                    <Parallax speed={10}>
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
                    </Parallax>
                </section>

                <section id="skills" ref={skillsRef} className="py-20 md:py-32 px-4 sm:px-8 md:px-12 overflow-hidden">
                    <div className="max-w-7xl mx-auto text-center">
                        <Parallax speed={-3} opacity={[0.5, 1]}>
                            <div className={`animated-item ${isSkillsVisible ? 'visible' : ''}`}>
                                <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-black flex items-center justify-center">
                                    SKILLS
                                </h2>
                                <div className="w-48 h-1 bg-black mx-auto mt-4"></div>
                            </div>
                            <section id="skills">
                                <SkillPage />
                            </section>
                        </Parallax>
                    </div>
                </section>

                <section id="projects">
                    <Parallax speed={5}>
                        <ProjectData />
                    </Parallax>
                </section>

                <section id="certificates" ref={certificatesRef} className="py-20 md:py-32 px-4 sm:px-8 md:px-12 overflow-hidden">
                    <Parallax speed={5}>
                        <DummyCertificates />
                    </Parallax>
                </section>

                {/* CONTACT SECTION DENGAN EMAILJS - LANJUTAN DARI PART 1 */}
                <section id="contact" ref={contactRef} className="py-20 md:py-32 px-4 sm:px-8 md:px-12 overflow-hidden">
                    <div className="min-h-screen bg-gray-50">
                        <main className="max-w-7xl mx-auto px-6 py-16">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                <div>
                                    <h1 className="text-7xl font-bold mb-8">Contact me</h1>

                                    <div className="space-y-6 text-sm">
                                        <div>
                                            <p className="text-gray-600">Bogor, Indonesia</p>
                                            <p className="text-gray-600">2026</p>
                                        </div>

                                        <div>
                                            <p className="font-semibold">Office hours</p>
                                            <p className="text-gray-600">Monday - Friday</p>
                                            <p className="text-gray-600">8 AM - 7 PM</p>
                                        </div>
                                    </div>

                                    <div className="mt-32">
                                        <h2 className="text-3xl font-bold mb-4">muhammadarifkywildan@gmail.com</h2>

                                        <div className="space-y-4 text-sm">
                                            <div>
                                                <p className="text-gray-600">Bogor, Indonesia</p>
                                                <p className="text-gray-600">2026</p>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <span className="text-gray-600">Monday - Friday, 8 AM - 7 PM</span>
                                                <span className="text-gray-400">|</span>
                                                <a href="#" className="text-gray-600 hover:text-black underline">Work with me</a>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex items-center space-x-6">
                                            <a href="https://www.linkedin.com/in/arifky-wildan-02369a337/" className="text-gray-600 hover:text-black" target="_blank" rel="noopener noreferrer">
                                                <Linkedin size={20} />
                                            </a>
                                            <a href="https://www.instagram.com/arfkywldn/" className="text-gray-600 hover:text-black" target="_blank" rel="noopener noreferrer">
                                                <Instagram size={20} />
                                            </a>
                                            <a href="https://github.com/ArifkyWildan" className="text-gray-600 hover:text-black" target="_blank" rel="noopener noreferrer">
                                                <Github size={20} />
                                            </a>
                                            <a href="mailto:muhammadarifkywildan@gmail.com" className="text-gray-600 hover:text-black" target="_blank" rel="noopener noreferrer">
                                                <Mail size={20} />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">
                                                Name <span className="text-red-500">*</span>
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleChange}
                                                        placeholder="First Name"
                                                        className="w-full px-0 py-2 border-b border-gray-300 focus:border-black outline-none bg-transparent text-sm"
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleChange}
                                                        placeholder="Last Name"
                                                        className="w-full px-0 py-2 border-b border-gray-300 focus:border-black outline-none bg-transparent text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="service" className="block text-sm font-medium mb-2">
                                                Service
                                            </label>
                                            <select
                                                id="service"
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                className="w-full px-0 py-2 border-b border-gray-300 focus:border-black outline-none bg-transparent text-sm text-gray-600"
                                            >
                                                <option value="">Select a service</option>
                                                <option value="web-design">Web Design</option>
                                                <option value="web-development">Web Development</option>
                                                <option value="mobile-app">Mobile App Development</option>
                                                <option value="consultation">Consultation</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                                Email <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-0 py-2 border-b border-gray-300 focus:border-black outline-none bg-transparent text-sm"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium mb-2">
                                                Project description
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                rows={4}
                                                className="w-full px-0 py-2 border-b border-gray-300 focus:border-black outline-none bg-transparent text-sm resize-none"
                                            ></textarea>
                                        </div>

                                        {submitStatus === 'success' && (
                                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                                                <p className="text-green-800 text-sm">
                                                    ✓ Message sent successfully! I'll get back to you soon.
                                                </p>
                                            </div>
                                        )}

                                        {submitStatus === 'error' && (
                                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg animate-fade-in">
                                                <p className="text-red-800 text-sm">
                                                    ✗ Failed to send message. Please try again or email me directly at{' '}
                                                    <a
                                                        href="mailto:muhammadarifkywildan@gmail.com"
                                                        className="underline hover:text-red-900"
                                                    >
                                                        muhammadarifkywildan@gmail.com
                                                    </a>
                                                </p>
                                            </div>
                                        )}

                                        <button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className={`px-8 py-3 bg-black text-white text-sm font-medium rounded hover:bg-gray-800 transition-all duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer shadow-md hover:shadow-lg'
                                                }`}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending...
                                                </span>
                                            ) : (
                                                'Submit'
                                            )}
                                        </button>
                                    </div>

                                    <div className="mt-12 text-sm text-gray-600">
                                        <p>Say hello. <a href="mailto:muhammadarifkywildan@gmail.com" className="underline hover:text-black">Work with me</a></p>
                                    </div>
                                </div>
                            </div>
                        </main>

                        <footer className="border-t border-gray-200 mt-20">
                            <div className="max-w-7xl mx-auto px-6 py-6">
                                <p className="text-xs text-gray-500">
                                    © 2025 Arifky Wildan | Built with Next.js & EmailJS
                                </p>
                            </div>
                        </footer>
                    </div>
                </section>
            </div>
        </ParallaxProvider>
    );
};

export default HeroSection;