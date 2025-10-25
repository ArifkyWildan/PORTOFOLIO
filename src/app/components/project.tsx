import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';

// --- DATA PROYEK ---
// Menggunakan 6 proyek agar loop animasi terlihat lebih mulus
const projectData = [
  {
    id: 1,
    title: 'Website Pemesanan Hotel',
    image: '/portofolio-hotel.png',
    description: 'Sebuah platform pembelajaran interaktif untuk anak-anak usia dini, fokus pada gamifikasi dan keamanan konten.',
    fullDescription: 'Platform ini dirancang sebagai web yang aman bagi anak-anak untuk belajar dan bertumbuh, dengan kontrol orang tua yang terintegrasi. Menggunakan React dan Firebase untuk data real-time.',
    github: 'https://github.com/username/project-1',
    tags: ['Php', 'Mysql', 'TailwindCss'],
  },
  {
    id: 2,
    title: 'Aplikasi TechXperience',
    image: '/app2.png',
    description: 'Solusi toko online modern dengan manajemen inventaris dan gateway pembayaran terintegrasi.',
    fullDescription: 'Dibangun dengan Next.js dan TailwindCSS, sistem e-commerce ini menawarkan performa super cepat dan desain yang responsif. Terintegrasi dengan Stripe untuk pembayaran.',
    github: 'https://github.com/username/project-2',
    tags: ['React Native', 'Twrnc', 'Expo'],
  },
  {
    id: 3,
    title: 'Website Foodie',
    image: '/foodie1.png',
    description: 'Aplikasi web untuk visualisasi data kompleks menjadi grafik dan laporan yang mudah dipahami.',
    fullDescription: 'Menggunakan React, D3.js, dan TailwindCSS untuk membuat dashboard analitik yang interaktif dan *real-time*. Membantu bisnis mengambil keputusan berdasarkan data.',
    github: 'https://github.com/username/project-3',
    tags: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 4,
    title: 'Website PPDB Online',
    image: '/ppdb.png',
    description: 'Platform pemesanan hotel dengan fitur pencarian canggih dan perbandingan harga.',
    fullDescription: 'Aplikasi full-stack yang dibuat dengan MERN Stack (MongoDB, Express, React, Node.js). Pengguna dapat mencari, memfilter, dan memesan kamar hotel dengan mudah.',
    github: 'https://github.com/username/project-4',
    tags: ['Next Js', 'React', 'Landing Page'],
  },
  {
    id: 5,
    title: 'Website Pendaftaran Beasiswa',
    image: '/beasiswa.png',
    description: 'Landing page yang dioptimalkan untuk konversi tinggi, menampilkan produk SaaS terbaru.',
    fullDescription: 'Didesain dengan Figma dan diimplementasikan menggunakan Next.js dan Framer Motion untuk animasi yang mulus. Fokus pada A/B testing dan optimasi SEO.',
    github: 'https://github.com/username/project-5',
    tags: ['Laravel', 'TailwindCSS', 'Mysql'],
  },
  {
    id: 6,
    title: 'Website Hotel',
    image: '/hotel.png',
    description: 'Sistem Manajemen Konten (CMS) kustom untuk blogger dengan editor markdown.',
    fullDescription: 'Platform blog yang ringan dan cepat, dibangun dengan Next.js (SSG) dan MDX. Memungkinkan penulis untuk membuat postingan dengan mudah menggunakan markdown.',
    github: 'https://github.com/username/project-6',
    tags: ['Laravel', 'TailwindCSS', 'Mysql'],
  },
];

// --- KOMPONEN KARTU PROYEK ---
interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    image: string;
    description: string;
    fullDescription: string;
    github: string;
    tags: string[];
  };
  onClick: (project: any) => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => (
  <motion.div
    onClick={() => onClick(project)}
    className="relative flex-shrink-0 w-[300px] md:w-[350px] mx-4 cursor-pointer"
    // Animasi hover scale-up sesuai permintaan
    whileHover={{ y: -10, scale: 1.05 }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden border border-gray-100">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-52 object-cover" // object-cover memastikan gambar proporsional
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const img = e.currentTarget;
          img.onerror = null;
          // Menggunakan placeholder yang lebih netral
          img.src = `https://placehold.co/600x400/e2e8f0/94a3b8?text=Image+Not+Found`;
        }}
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

// --- KOMPONEN MODAL ---
interface ProjectModalProps {
  project: {
    id: number;
    title: string;
    image: string;
    description: string;
    fullDescription: string;
    github: string;
    tags: string[];
  };
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => (
  <motion.div
    // Backdrop
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
  >
    <motion.div
      // Konten Modal
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat klik di dalam konten
      className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
    >
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-400 hover:text-gray-800 transition-colors z-10"
      >
        <X size={24} />
      </button>
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-64 md:h-80 object-cover rounded-t-lg"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          const img = e.currentTarget;
          img.onerror = null;
          img.src = `https://placehold.co/600x400/e2e8f0/94a3b8?text=Image+Not+Found`;
        }}
      />
      
      <div className="p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{project.title}</h2>
        <p className="text-gray-700 mb-6 leading-relaxed">{project.fullDescription}</p>
        
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Lihat Detail
          <ArrowUpRight size={20} className="ml-2" />
        </a>
      </div>
    </motion.div>
  </motion.div>
);

// --- KOMPONEN UTAMA ---
export default function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState<any>(null); // Menggunakan any agar null bisa diterima

  // Duplikasi data untuk animasi loop tak terbatas
  const doubledProjects = [...projectData, ...projectData];

  // Variabel untuk durasi animasi (sesuaikan jika perlu)
  const animationDuration = 60; // dalam detik

  return (
    <section className="w-full py-20 md:py-28 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        {/* Judul dan Subjudul */}
        <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-black flex items-center justify-center">
            PR<span className="w-12 h-12 md:w-16 md:h-16 bg-[#FF3B3B] rounded-full mx-2"></span>JECTS
        </h2>
        <div className="w-48 h-1 bg-black mx-auto mt-4"></div>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-16 mt-4">
          Beberapa proyek pilihan yang pernah saya kerjakan, dari aplikasi web hingga dashboard analitik.
        </p>
      </div>

      {/* [PERBAIKAN] 
        1. Menambahkan div 'relative' sebagai pembungkus untuk menampung gradient overlay.
        2. Menambahkan div 'absolute' untuk gradient di kiri dan kanan (efek fade/blur).
           Ini penting untuk menyembunyikan "sambungan" loop.
      */}
      <div className="relative w-full">
        
        {/* Gradient Fade Kiri */}
        <div 
          className="absolute top-0 left-0 bottom-0 w-24 md:w-48 z-10"
          style={{ background: 'linear-gradient(to right, #f9fafb, transparent)' }} // #f9fafb = bg-gray-50
        />
        {/* Gradient Fade Kanan */}
        <div 
          className="absolute top-0 right-0 bottom-0 w-24 md:w-48 z-10"
          style={{ background: 'linear-gradient(to left, #f9fafb, transparent)' }} // #f9fafb = bg-gray-50
        />
        
        {/* [PERBAIKAN]
          1. Animasi diubah menjadi 'x: [0, "-50%"]'. 
             Ini menggeser sejauh 50% (lebar satu set data), sehingga set data kedua 
             akan berada di posisi awal, menciptakan loop yang seamless.
          2. 'whileHover={{ animationPlayState: 'paused' }}' ditambahkan di sini 
             (di elemen yang beranimasi) agar animasi berhenti saat di-hover.
          3. 'repeatType: 'loop'' dihapus karena 'repeat: Infinity' sudah cukup.
        */}
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [0, '-50%'], // Menggeser sejauh 50% (lebar 1 set data)
          }}
          transition={{
            ease: 'linear',
            duration: animationDuration,
            repeat: Infinity,
          }}
          // Animasi berhenti saat di-hover
          whileHover={{ animationPlayState: 'paused' }}
        >
          {/* Render kartu proyek (2x untuk loop) */}
          {doubledProjects.map((project, index) => (
            <ProjectCard
              key={`${project.id}-${index}`}
              project={project}
              onClick={setSelectedProject}
            />
          ))}
        </motion.div>
      </div>

      {/* Render Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
