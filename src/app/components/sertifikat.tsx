import React, { useState, useRef, useEffect, useCallback } from 'react';

const dummyCertificates = [
  { id: 1, title: "Fullstack Mobile App", issuer: "GINVO Studio", year: "2025", imageUrl: "/serti1.jpg" },
  { id: 2, title: "Website Library Management", issuer: "Kreasi Media", year: "2024", imageUrl: "/serti2.jpg" },
  { id: 3, title: "Aplikasi Pemesanan Hotel Berbasis Web", issuer: "DIMENSI KREASI Nusantara", year: "2024", imageUrl: "/serti3.jpg" },
  { id: 4, title: "Landing Page Dengan HTML Dan CSS", issuer: "PT Wan Teknologi Internasional", year: "2023", imageUrl: "/serti4.jpg" },
];

export default function CertificatesSection({ certificates = dummyCertificates }) {
  const [selectedCert, setSelectedCert] = useState<typeof dummyCertificates[0] | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const startScaleRef = useRef(1);
  const isDraggingRef = useRef(false);

  const closeModal = useCallback(() => {
    setSelectedCert(null);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  }, [closeModal]);

  useEffect(() => {
    if (selectedCert) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedCert, handleKeyDown]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggedIndex(index);
    isDraggingRef.current = false;
    startXRef.current = e.clientX;
    startScaleRef.current = scale;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (draggedIndex !== null) {
      const deltaX = e.clientX - startXRef.current;

      if (Math.abs(deltaX) > 5) {
        isDraggingRef.current = true;
      }

      const scaleChange = deltaX / 200;
      const newScale = Math.max(0.8, Math.min(1.5, startScaleRef.current + scaleChange));
      setScale(newScale);
    }
  };

  const handleMouseUp = () => {
    setDraggedIndex(null);
    setTimeout(() => {
      isDraggingRef.current = false;
    }, 50);
  };

  const openModal = (cert: typeof dummyCertificates[0]) => {
    setSelectedCert(cert);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, cert: typeof dummyCertificates[0]) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isDraggingRef.current) {
      openModal(cert);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext fill="%236b7280" font-family="Arial" font-size="20" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ECertificate%3C/text%3E%3C/svg%3E';
  };

  const handleModalImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23e5e7eb" width="800" height="600"/%3E%3Ctext fill="%236b7280" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ECertificate Image%3C/text%3E%3C/svg%3E';
  };

  return (
    <div
      className="w-full min-h-screen bg-gray-50 py-16 px-4"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-600 via-gray-900 to-gray-600 mb-6">
            CERTIFICATES
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gray-300"></div>
            <div className="w-3 h-3 rounded-full bg-gray-800"></div>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
        </div>

        {/* Certificate Gallery */}
        <div
          ref={containerRef}
          className="flex justify-center items-center gap-8 flex-wrap"
        >
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              className="relative group cursor-pointer select-none"
              style={{
                transform: draggedIndex === index ? `scale(${scale})` : 'scale(1)',
                transition: draggedIndex === index ? 'none' : 'transform 0.3s ease',
              }}
              onMouseDown={(e) => handleMouseDown(e, index)}
              onClick={(e) => handleCardClick(e, cert)}
            >
              {/* Card Container */}
              <div className="bg-white rounded-xl overflow-hidden shadow-xl border border-gray-300 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative bg-gray-100 flex items-center justify-center p-6">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-auto max-w-md object-contain blur-md group-hover:blur-none transition-all duration-500 rounded-lg"
                    draggable="false"
                    onError={handleImageError}
                  />
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                </div>
              </div>

              {/* Drag Indicator */}
              {draggedIndex === index && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 text-xs font-mono whitespace-nowrap pointer-events-none">
                  Scale: {scale.toFixed(2)}x
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Instruction */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p className="font-mono">Drag horizontally to scale • Click to view details</p>
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white bg-opacity-30"
          style={{ backdropFilter: 'blur(20px)' }}
          onClick={closeModal}
        >
          <div
            className="relative max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center text-2xl font-light transition-all hover:scale-110"
              aria-label="Close modal"
            >
              ×
            </button>

            {/* Modal Content */}
            <div className="grid md:grid-cols-5 gap-0">
              {/* Image Side */}
              <div className="md:col-span-3 relative bg-gray-100 flex items-center justify-center p-8">
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-lg"
                  onError={handleModalImageError}
                />
              </div>

              {/* Details Side */}
              <div className="md:col-span-2 p-10 md:p-12 flex flex-col justify-center bg-white">
                <div className="mb-6">
                  <div className="inline-block px-4 py-1 bg-gray-200 rounded-full text-gray-700 text-xs font-mono mb-4">
                    CERTIFICATE #{selectedCert.id.toString().padStart(2, '0')}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                    {selectedCert.title}
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="border-l-4 border-gray-800 pl-4">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Issuer</p>
                    <p className="text-gray-900 text-lg font-semibold">{selectedCert.issuer}</p>
                  </div>

                  <div className="border-l-4 border-gray-800 pl-4">
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Year</p>
                    <p className="text-gray-900 text-lg font-semibold">{selectedCert.year}</p>
                  </div>

                  <div className="pt-6 border-t border-gray-300">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      This certificate validates the successful completion of the program and demonstrates
                      proficiency in the specified skills and competencies.
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeModal}
                  className="mt-8 w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all transform hover:scale-105"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}