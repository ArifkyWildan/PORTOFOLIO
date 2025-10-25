"use client";

import React, { useState, useEffect, useRef } from 'react';
// PERBAIKAN: Menambahkan import untuk motion dan AnimatePresence
import { motion, AnimatePresence } from "framer-motion";
import { Github, Link as LinkIcon, X, ArrowLeft, ArrowRight, Linkedin, Instagram, Mail } from "lucide-react"; 
import SkillPage from "./components/skills";
import ProjectData from "./components/project";
import DummyCertificates from "./components/sertifikat";


//=================================================================
// KOMPONEN IKON SVG (Pengganti react-icons/si)
//=================================================================

// Ikon untuk Spotify
const IconSpotify = () => (
// ... (Kode IconSpotify tidak berubah) ...
  <svg className="w-6 h-6 text-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM16.94 16.74C16.74 17.04 16.34 17.14 16.04 16.94C13.74 15.54 10.94 15.24 6.84 16.04C6.54 16.14 6.14 15.94 6.04 15.64C5.94 15.34 6.14 14.94 6.44 14.84C10.94 13.94 14.04 14.34 16.64 15.94C16.94 16.04 17.14 16.44 16.94 16.74ZM18.34 14.94C18.04 15.34 17.54 15.44 17.14 15.14C14.54 13.54 10.34 13.14 6.34 14.14C5.94 14.24 5.54 14.04 5.44 13.64C5.34 13.24 5.54 12.84 5.94 12.74C10.34 11.64 14.94 12.14 17.94 13.94C18.34 14.14 18.54 14.64 18.34 14.94ZM18.44 12.94C15.24 11.04 9.84 10.84 5.74 11.94C5.24 12.04 4.84 11.74 4.74 11.24C4.64 10.74 4.94 10.34 5.44 10.24C10.04 9.04 15.84 9.24 19.54 11.54C19.94 11.84 20.04 12.34 19.74 12.74C19.44 13.14 18.94 13.24 18.44 12.94Z" fill="currentColor"/>
  </svg>
);

// Ikon untuk Medium
const IconMedium = () => (
// ... (Kode IconMedium tidak berubah) ...
  <svg className="w-6 h-6 text-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.54 12.01L21.75 21.19C22.11 21.52 22.08 22.08 21.72 22.39C21.36 22.7 20.8 22.67 20.47 22.31L12.3 13.18L8.1 19.22L6.61 21.41C6.31 21.87 5.76 22.04 5.3 21.74C4.84 21.44 4.67 20.89 4.97 20.43L6.96 17.47L10.06 12.01L5.91 3.01C5.6 2.55 5.77 2 6.23 1.7C6.69 1.4 7.24 1.57 7.55 2.03L13.54 12.01ZM18.44 2.81C18.44 2.81 18.5 2.81 18.5 2.81C19.3 2.81 19.94 3.44 19.94 4.25C19.94 5.03 19.33 5.69 18.56 5.69C17.79 5.69 17.18 5.03 17.18 4.25C17.18 3.44 17.81 2.81 18.44 2.81ZM22.56 2.81C22.56 2.81 22.62 2.81 22.62 2.81C23.41 2.81 24 3.44 24 4.25C24 5.03 23.39 5.69 22.62 5.69C21.85 5.69 21.24 5.03 21.24 4.25C21.24 3.44 21.88 2.81 22.56 2.81Z" fill="currentColor"/>
  </svg>
);


//=================================================================
// KOMPONEN UTAMA (HERO SECTION)
//=================================================================
type PillNavItem = {
// ... (Kode PillNavItem tidak berubah) ...
  label: string;
  href: string;
};

type PillNavProps = {
// ... (Kode PillNavProps tidak berubah) ...
  items: PillNavItem[];
  baseColor: string;
  pillColor: string;
  pillTextColor: string;
};

const PillNav: React.FC<PillNavProps> = ({ items, baseColor, pillColor, pillTextColor }) => {
// ... (Kode Komponen PillNav tidak berubah) ...
  return (
    <nav className="flex items-center space-x-2 border border-gray-300 rounded-full p-2 bg-white shadow-sm" style={{ color: baseColor }}>
        <div className="text-xl font-bold pl-2 pr-4">ArifkyWildan<span className="text-[#FF3B3B]">.</span></div>
        <div className="flex items-center space-x-2">
            {items.map((item, index) => (
                <a 
                    key={index} 
                    href={item.href} 
                    className="px-4 py-1 rounded-full transition-colors duration-300"
                    style={{
                        backgroundColor: index === 0 ? pillTextColor : 'transparent',
                        color: index === 0 ? pillColor : baseColor
                    }}
                >
                    {item.label}
                </a>
            ))}
        </div>
    </nav>
  );
};


const HeroSection = () => {
// ... (Kode State dan Refs tidak berubah) ...
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
    const [isContactVisible, setIsContactVisible] = useState(false); // State BARU
    
    // State untuk carousel dan modal sertifikat
    const [currentCert, setCurrentCert] = useState(0); 
    

    // State BARU untuk form kontak
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const services = ['Design', 'Development', 'Animation', 'Other'];

    useEffect(() => {
// ... (Kode useEffect tidak berubah) ...
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        // Helper untuk membuat observer
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

        // Inisialisasi semua observer
        const aboutObserver = createObserver(aboutRef, setIsAboutVisible);
        const skillsObserver = createObserver(skillsRef, setIsSkillsVisible);
        const projectsObserver = createObserver(projectsRef, setIsProjectsVisible);
        const certificatesObserver = createObserver(certificatesRef, setIsCertificatesVisible);
        const contactObserver = createObserver(contactRef, setIsContactVisible); // Observer BARU

        return () => {
            clearTimeout(timer);
            aboutObserver?.disconnect();
            skillsObserver?.disconnect();
            projectsObserver?.disconnect();
            certificatesObserver?.disconnect();
            contactObserver?.disconnect(); // Cleanup BARU
        };
    }, []);

    // Handler untuk navigasi carousel sertifikat

    // Handler BARU untuk memilih layanan di form kontak
    const toggleService = (service: string) => {
// ... (Kode toggleService tidak berubah) ...
        setSelectedServices((prev) =>
            prev.includes(service)
                ? prev.filter((s) => s !== service)
                : [...prev, service]
        );
    };

    const customStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        
        /* --- CSS untuk smooth scroll --- */
        html { 
            scroll-behavior: smooth; 
        }

        .font-playfair { font-family: 'Playfair Display', serif; }
// ... (Keyframes dan style lain tidak berubah) ...
        @keyframes scroll-text { from { transform: translateX(0%); } to { transform: translateX(-50%); } }
        .scrolling-text-container { overflow: hidden; white-space: nowrap; width: 100%; }
        .scrolling-text { display: inline-block; animation: scroll-text 30s linear infinite; }
        .fade-in-element { opacity: 0; transform: translateY(20px); transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
        .fade-in-element.visible { opacity: 1; transform: translateY(0); }
        .animated-item { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
        .animated-item.visible { opacity: 1; transform: translateY(0); }
        .btn-gradient { background-image: linear-gradient(to right, #e2e8f0, #dbeafe); transition: all 0.3s ease; }
        .btn-gradient:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(199, 210, 254, 0.6); }

        /* --- Style BARU untuk input form kontak --- */
        .contact-input {
            background-color: transparent;
            /* PERUBAHAN: Warna border dan teks diubah untuk latar belakang cerah */
            border-bottom: 1px solid #9ca3af; /* border-gray-400 */
            color: #111111; /* Warna teks hitam */
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
            transition: border-color 0.3s ease;
        }
        .contact-input:focus {
            outline: none;
            border-color: #111111; /* Warna border hitam saat fokus */
        }
    `;

    return (
        <>
            <style>{customStyles}</style>
            
            <div id="home" className="min-h-screen flex flex-col justify-between" style={{fontFamily: "'Space Grotesk', sans-serif", backgroundColor: '#F8F8F8', color: '#111111'}}>
                <div>
                    <header className="py-6 px-4 sm:px-8 md:px-12 flex justify-center items-center sticky top-4 z-40">
                       {/* ... (Kode PillNav tidak berubah) ... */}
                       <PillNav 
                         items={[
                            { label: 'Home', href: '#home' }, 
                            { label: 'About', href: '#about' }, 
                            { label: 'Skills', href: '#skills' }, // SEKARANG AKAN SCROLL
                            { label: 'Project', href: '#projects' }, 
                            { label: 'Certificates', href: '#certificates' }, 
                            { label: 'Contact', href: '#contact' } // SEKARANG AKAN SCROLL
                         ]}
                         baseColor="#000000"
                         pillColor="#ffffff"
                         pillTextColor="#000000"
                       />
                    </header>
                      <main className="px-4 sm:px-8 md:px-12 my-20">
    {/* ... (Kode Main/Hero tidak berubah) ... */}
    <div className="max-w-4xl mx-auto text-center">
        <div className={`fade-in-element ${isVisible ? 'visible' : ''}`}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal leading-tight text-black">
                I'm <span className="font-playfair italic text-gray-500">Arifky Wildan</span>
                , a <span className="font-playfair italic text-gray-500">Software Developer</span>
                <div className="inline-block w-32 h-16 rounded-full mx-2 align-middle bg-cover bg-center shadow-md" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1550439062-609e1531270e?q=80&w=200&auto=format&fit=crop)'}}></div>
                based in <span className="font-playfair italic text-gray-500">Indonesia</span>
            </h1> 
            <div className="mt-8 flex justify-center gap-4">
                <a href="#" className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors duration-300 shadow-lg">Got a project?</a>
                <a href="#" className="px-8 py-3 border border-gray-300 rounded-full font-medium hover:border-black transition-colors duration-300">Resume CV</a>
            </div>
        </div>
    </div>
</main>
                </div>

                <section className="w-full py-12 md:py-20 overflow-hidden">
                    {/* ... (Kode Scrolling Text tidak berubah) ... */}
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
                
                <section id="about" ref={aboutRef} className="py-20 md:py-32 px-4 sm:px-8 md:px-12 overflow-hidden">
                    {/* ... (Kode Section About tidak berubah) ... */}
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="text-center md:text-left">
                            <div className={`animated-item ${isAboutVisible ? 'visible' : ''} inline-flex items-center justify-center md:justify-start`}>
                                <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-black flex items-center">
                                    AB<span className="w-12 h-12 md:w-16 md:h-16 bg-[#FF3B3B] rounded-full mx-2"></span>UT
                                </h2>
                            </div>
                            <div className={`animated-item ${isAboutVisible ? 'visible' : ''} w-48 h-1 bg-black mx-auto md:mx-0 mt-4`} style={{transitionDelay: '100ms'}}></div>
                            <p className={`animated-item ${isAboutVisible ? 'visible' : ''} mt-8 text-gray-600 text-lg`} style={{transitionDelay: '200ms'}}>
                                Hello! My name Wildan.
I am a passionate Software Developer and Fullstack Web Developer, currently studying at SMK Informatika Pesat. With a strong interest in technology and innovation, I’ve been developing my skills in various programming languages such as JavaScript, Laravel, and other modern web technologies. <br />

<br /> I strive to continuously improve my technical expertise and problem-solving abilities to create efficient, scalable, and user-friendly software solutions. My vision is to become a Software Engineer who contributes to meaningful projects, helping people and companies achieve their goals through technology. <br /><br />

I believe that great software can make a real impact — not only improving business operations but also making life easier for others. I’m committed to growing both personally and professionally to be a developer who builds solutions that matter.
                            </p>

                        </div>
                        <div className={`relative flex justify-center items-center animated-item ${isAboutVisible ? 'visible' : ''}`} style={{ transitionDelay: '400ms' }}>
                            <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                                <svg className="absolute inset-0 w-full h-full text-[#FF3B3B] transform scale-110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M50 0V100" stroke="currentColor" strokeWidth="6"/><path d="M0 50H100" stroke="currentColor" strokeWidth="6"/><path d="M15 15L85 85" stroke="currentColor" strokeWidth="6"/><path d="M85 15L15 85" stroke="currentColor" strokeWidth="6"/>
                                </svg>
                                <div className="absolute inset-0 flex justify-center items-center p-4">
                                    <img src="/poto.jpg" alt="A portrait of Arifky Wildan, a software engineer." className="w-full h-full object-cover rounded-full filter grayscale shadow-2xl"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section id="skills" ref={skillsRef} className="py-20 md:py-32 px-4 sm:px-8 md:px-12 overflow-hidden">
                    {/* ... (Kode Section Skills tidak berubah) ... */}
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
                    {/* ... (Kode Section Contact tidak berubah) ... */}
                    <div className="max-w-7xl mx-auto">
                        {/* --- Judul Section --- */}
                        <div className={`animated-item ${isContactVisible ? 'visible' : ''}`}>
                            <h2 className="font-playfair text-6xl md:text-8xl font-normal text-black">Contact us</h2>
                        </div>
                        
                        <div className={`animated-item ${isContactVisible ? 'visible' : ''} mt-4 md:mt-0`} style={{transitionDelay: '100ms'}}>
                            <h3 className="font-playfair text-5xl md:text-7xl text-gray-500">— Have a project?</h3>
                        </div>

                        {/* --- Form & Layout Grid --- */}
                        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-16">
                            
                            {/* --- Kolom Kiri (Form) --- */}
                            <form className="md:col-span-2 space-y-10" onSubmit={(e) => e.preventDefault()}>
                                {/* Layanan */}
                                <div className={`animated-item ${isContactVisible ? 'visible' : ''}`} style={{transitionDelay: '200ms'}}>
                                    <label className="text-lg text-gray-800">What can we do for you?</label>    
                                </div>

                                {/* Input Fields */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className={`animated-item ${isContactVisible ? 'visible' : ''} flex flex-col`} style={{transitionDelay: '300ms'}}>
                                        <label htmlFor="name" className="text-lg text-gray-800">Your name</label>
                                        <input type="text" id="name" className="mt-2 contact-input" />
                                    </div>
                                    <div className={`animated-item ${isContactVisible ? 'visible' : ''} flex flex-col`} style={{transitionDelay: '400ms'}}>
                                        <label htmlFor="email" className="text-lg text-gray-800">Your email</label>
                                        <input type="email" id="email" className="mt-2 contact-input" />
                                    </div>
                                </div>

                                {/* Text Area */}
                                <div className={`animated-item ${isContactVisible ? 'visible' : ''} flex flex-col`} style={{transitionDelay: '500ms'}}>
                                    <label htmlFor="details" className="text-lg text-gray-800">Project details</label>
                                    <textarea id="details" rows={4} className="mt-2 contact-input resize-none"></textarea>
                                </div>

                                {/* Tombol Submit */}
                                <div className={`animated-item ${isContactVisible ? 'visible' : ''}`} style={{transitionDelay: '600ms'}}>
                                    <button type="submit" className="inline-block px-10 py-4 border-2 border-black rounded-full font-bold text-black tracking-widest hover:bg-black hover:text-white transition-all duration-300">
                                        Send
                                    </button>
                                </div>
                            </form>

                            {/* --- Kolom Kanan (Info & Social) --- */}
                            <div className="md:col-span-1">
                                <div className={`animated-item ${isContactVisible ? 'visible' : ''}`} style={{transitionDelay: '300ms'}}>
                                    <h4 className="text-lg text-black">Tell us about your vision:</h4>
                                    <p className="mt-4 text-gray-600 leading-relaxed">
                                        which challenges are you facing? What are your goals and expectations? What would success look like and how much are you planning to spend to get there?
                                    </p>
                                </div>
                                
                                <div className={`animated-item ${isContactVisible ? 'visible' : ''} mt-12`} style={{transitionDelay: '500ms'}}>
                                    <h4 className="text-lg text-black mb-4">Find me on:</h4>
                                     <div className="flex space-x-6 text-gray-500">
      {/* LinkedIn Icon */}
      <a 
        href="https://www.linkedin.com/in/arifky-wildan-02369a337/" 
        className="hover:text-black transition-colors" 
        aria-label="LinkedIn"
      >
        <Linkedin size={24} />
      </a>
      
      {/* Instagram Icon */}
      <a 
        href="https://www.instagram.com/arfkywldn/" 
        className="hover:text-black transition-colors" 
        aria-label="Instagram"
      >
        <Instagram size={24} />
      </a>
      
      {/* Github Icon */}
      <a 
        href="https://github.com/ArifkyWildan" 
        className="hover:text-black transition-colors" 
        aria-label="Github"
      >
        <Github size={24} />
      </a>
      
      {/* Email (Mail) Icon */}
      <a 
        href="muhammadarifkywildan@gmail.com" 
        className="hover:text-black transition-colors" 
        aria-label="Email"
      >
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

