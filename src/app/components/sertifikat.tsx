import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
// import Image from 'next/image'; // Dihapus untuk memperbaiki error kompilasi

// --- Tipe Data (jika menggunakan TypeScript) ---
// type Certificate = {
//   id: number;
//   title: string;
//   issuer: string;
//   year: string;
//   imageUrl: string;
// };
//
// type CertificatesSectionProps = {
//   certificates: Certificate[];
// };
//
// type CertificateCardProps = {
//   certificate: Certificate;
//   onClick: () => void;
// };
//
// type ModalProps = {
//   imageUrl: string;
//   onClose: () => void;
// };

// --- Data Contoh (Dummy Data) ---
// Ganti ini dengan data asli yang Anda lewatkan sebagai props
const dummyCertificates = [
  { id: 1, title: "Fullstack Mobile App", issuer: "GINVO Studio", year: "2025", imageUrl: "/serti1.jpg" },
  { id: 2, title: "Website Library Management", issuer: "Kreasi Media", year: "2024", imageUrl: "/serti2.jpg" },
  { id: 3, title: "Aplikasi Pemesanan Hotel Berbasis Web", issuer: "DIMENSI KREASI Nusantara", year: "2024", imageUrl: "/serti3.jpg" },
  // --- Sertifikat ke-4 ditambahkan di sini ---
  { id: 4, title: "Landing Page Dengan HTML Dan CSS", issuer: "PT Wan Teknologi Internasional", year: "2023", imageUrl: "/serti4.jpg" },
];
  // --- Akhir tambahan ---

// --- Varian Animasi untuk Framer Motion ---

// Varian untuk detail card (slide-up)
const cardDetailVariants: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
  },
};

// Varian untuk backdrop modal (fade-in/out)
const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Varian untuk konten modal (pop-in/out)
const modalContentVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
    },
  },
  exit: { scale: 0.9, opacity: 0 },
};

// --- Komponen Modal ---
// (Menerima 'imageUrl' dan 'onClose')
type ModalProps = {
  imageUrl: string;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ imageUrl, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      variants={modalBackdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose} // Menutup modal saat mengklik backdrop
    >
      <motion.div
        className="relative max-w-3xl w-11/12 max-h-[80vh]"
        variants={modalContentVariants}
        // 'onClick' di sini mencegah modal tertutup saat mengklik gambar
        onClick={(e) => e.stopPropagation()}
      >
        {/* Konten Gambar Modal */}
        <div className="overflow-hidden rounded-xl border border-gray-700">
          {/* Mengganti Next/Image dengan tag <img> standar untuk kompatibilitas */}
          <img
            src={imageUrl}
            alt="Sertifikat (Tampilan Penuh)"
            className="w-full h-auto max-h-[80vh] object-contain"
            // Properti 'width', 'height', dan 'priority' dihapus
          />
        </div>

        {/* Tombol Tutup (✕) */}
        <motion.button
          className="absolute -top-4 -right-4 md:top-2 md:right-2 w-10 h-10 bg-white/10 text-white backdrop-blur-md rounded-full flex items-center justify-center text-2xl font-light leading-none z-10 border border-white/20 hover:bg-white/30 transition-colors"
          onClick={onClose}
          aria-label="Tutup modal"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          &times;
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// --- Komponen Card Sertifikat ---
// (Menerima 'certificate' dan 'onClick')
type Certificate = {
  id: number;
  title: string;
  issuer: string;
  year: string;
  imageUrl: string;
};

type CertificateCardProps = {
  certificate: Certificate;
  onClick: () => void;
};

const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onClick }) => {
  const { title, issuer, year, imageUrl } = certificate;

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden rounded-xl border border-gray-200/50 dark:border-gray-800 shadow-lg cursor-pointer"
      // 'whileHover' akan memicu animasi pada children yang memiliki 'variants'
      whileHover="visible"
      initial="hidden"
      // Desain 'Apple Card' style
      style={{
        backgroundColor: '#fefefe', // Latar belakang putih bersih
      }}
      // Menggunakan layoutId untuk potensi animasi antar halaman (opsional)
      // layoutId={`card-container-${certificate.id}`}
      onClick={onClick}
    >
      {/* Gambar Sertifikat */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {/* Mengganti Next/Image dengan tag <img> standar untuk kompatibilitas */}
        <img
          src={imageUrl}
          alt={`Sertifikat ${title} dari ${issuer}`}
          // 'absolute inset-0 w-full h-full object-cover' meniru fungsionalitas 'fill'
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          // Properti 'fill' dan 'sizes' dihapus
        />
      </div>

      {/* Detail (Slide-up saat hover) */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 md:p-5 
                   bg-white/70 dark:bg-black/70 
                   backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50"
        variants={cardDetailVariants}
        // 'initial' dan 'animate' akan dikontrol oleh 'whileHover' parent
      >
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
          {title}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">{issuer}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{year}</p>
      </motion.div>
    </motion.div>
  );
};

// --- Komponen Utama (Section) ---
// (Menerima 'certificates' sebagai props)
export default function CertificatesSection({
  certificates = dummyCertificates,
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  // Duplikasi data sertifikat untuk loop tak terbatas
  const duplicatedCertificates = [...certificates, ...certificates];
  const scrollDuration = certificates.length * 10; // Durasi scroll (misal: 10 detik per kartu)

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    // Pastikan font 'Inter' sudah di-load di file CSS global Anda
    // (Tailwind biasanya menyertakannya sebagai font-sans default)
    <section className="font-inter w-full py-16 md:py-24 bg-gray-20 text-gray-900 dark:text-white">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Judul Section */}
        <div className="mb-12 text-center md:text-left">
            <h2 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-black flex items-center justify-center">
                                CERTIFI<span className="w-12 h-12 md:w-16 md:h-16 bg-[#FF3B3B] rounded-full mx-2"></span>CATES
                </h2>
            <div className="w-48 h-1 bg-black mx-auto mt-4"></div>
        </div>

        {/* --- Certificate Scroller (Marquee) --- */}
        {/* Wrapper untuk fading di tepi */}
        <div className="w-full overflow-x-hidden relative" 
             style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
        >
          <motion.div
            className="flex"
            animate={{ x: [0, '-50%'] }} // Bergerak ke kiri sejauh setengah total lebar (karena diduplikasi)
            transition={{ 
              duration: scrollDuration, 
              repeat: Infinity, 
              ease: 'linear' 
            }}
            whileHover={{ animationPlayState: 'paused' }} // Jeda saat di-hover
            whileTap={{ animationPlayState: 'paused' }} // Jeda saat diklik/tap
          >
            {duplicatedCertificates.map((cert, index) => (
              // Beri lebar tetap pada setiap kartu di dalam scroller
              <div key={index} className="flex-shrink-0 w-80 md:w-96 px-4"> 
                <CertificateCard
                  certificate={cert}
                  onClick={() => openModal(cert.imageUrl)}
                />
              </div>
            ))}
          </motion.div>
        </div>
        {/* --- Akhir Certificate Scroller --- */}
      </div>

      {/* Modal (Fullscreen) */}
      {/* 'AnimatePresence' penting untuk animasi 'exit' */}
      <AnimatePresence>
        {selectedImage && (
          <Modal imageUrl={selectedImage} onClose={closeModal} />
        )}
      </AnimatePresence>
    </section>
  );
}