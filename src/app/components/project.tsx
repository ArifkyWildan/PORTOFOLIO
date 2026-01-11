import React, { useState } from 'react';
import { X, ArrowUpRight, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  image: string;
  description: string;
  fullDescription: string;
  github: string;
  demo: string;
  tags: string[];
  year: string;
  category: string;
}

const projectData: Project[] = [
  {
    id: 1,
    title: 'Website Pemesanan Hotel',
    image: '/portofolio-hotel.png',
    description: 'Platform pembelajaran interaktif untuk anak-anak usia dini dengan fokus pada gamifikasi',
    fullDescription: 'Platform ini dirancang sebagai web yang aman bagi anak-anak untuk belajar dan bertumbuh, dengan kontrol orang tua yang terintegrasi. Menggunakan React dan Firebase untuk data real-time.',
    github: 'https://github.com/username/project-1',
    demo: 'https://demo.example.com/project-1',
    tags: ['Php', 'Mysql', 'TailwindCss'],
    year: '2024',
    category: 'Web Development'
  },
  {
    id: 2,
    title: 'Aplikasi TechXperience',
    image: '/app2.png',
    description: 'Solusi toko online modern dengan manajemen inventaris terintegrasi',
    fullDescription: 'Dibangun dengan Next.js dan TailwindCSS, sistem e-commerce ini menawarkan performa super cepat dan desain yang responsif. Terintegrasi dengan Stripe untuk pembayaran.',
    github: 'https://github.com/username/project-2',
    demo: 'https://demo.example.com/project-2',
    tags: ['React Native', 'Twrnc', 'Expo'],
    year: '2024',
    category: 'Mobile App'
  },
  {
    id: 3,
    title: 'Website Foodie',
    image: '/foodie1.png',
    description: 'Aplikasi web untuk visualisasi data kompleks menjadi grafik interaktif',
    fullDescription: 'Menggunakan React, D3.js, dan TailwindCSS untuk membuat dashboard analitik yang interaktif dan real-time. Membantu bisnis mengambil keputusan berdasarkan data.',
    github: 'https://github.com/username/project-3',
    demo: 'https://demo.example.com/project-3',
    tags: ['HTML', 'CSS', 'JavaScript'],
    year: '2023',
    category: 'Web Development'
  },
  {
    id: 4,
    title: 'Website PPDB Online',
    image: '/ppdb.png',
    description: 'Platform pemesanan hotel dengan fitur pencarian canggih',
    fullDescription: 'Aplikasi full-stack yang dibuat dengan MERN Stack (MongoDB, Express, React, Node.js). Pengguna dapat mencari, memfilter, dan memesan kamar hotel dengan mudah.',
    github: 'https://github.com/username/project-4',
    demo: 'https://demo.example.com/project-4',
    tags: ['Next Js', 'React', 'Landing Page'],
    year: '2023',
    category: 'Web Development'
  },
  {
    id: 5,
    title: 'Website Pendaftaran Beasiswa',
    image: '/beasiswa.png',
    description: 'Landing page yang dioptimalkan untuk konversi tinggi',
    fullDescription: 'Didesain dengan Figma dan diimplementasikan menggunakan Next.js dan Framer Motion untuk animasi yang mulus. Fokus pada A/B testing dan optimasi SEO.',
    github: 'https://github.com/username/project-5',
    demo: 'https://demo.example.com/project-5',
    tags: ['Laravel', 'TailwindCSS', 'Mysql'],
    year: '2024',
    category: 'Web Development'
  },
  {
    id: 6,
    title: 'Website Hotel',
    image: '/hotel.png',
    description: 'Sistem Manajemen Konten kustom untuk blogger',
    fullDescription: 'Platform blog yang ringan dan cepat, dibangun dengan Next.js (SSG) dan MDX. Memungkinkan penulis untuk membuat postingan dengan mudah menggunakan markdown.',
    github: 'https://github.com/username/project-6',
    demo: 'https://demo.example.com/project-6',
    tags: ['Laravel', 'TailwindCSS', 'Mysql'],
    year: '2023',
    category: 'Web Development'
  },
];

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = `https://placehold.co/600x400/e5e7eb/6b7280?text=${encodeURIComponent(project.title)}`;
  };

  return (
    <div
      onClick={() => onClick(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
        <div className="relative h-72 overflow-hidden bg-gray-100">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
            onError={handleImageError}
          />

          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              opacity: isHovered ? 1 : 0.6
            }}
          />

          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium rounded-full shadow-lg">
              {project.category}
            </span>
          </div>

          <div className="absolute top-4 right-4">
            <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
              <span className="text-gray-800 text-xs font-bold">{project.year}</span>
            </div>
          </div>

          <div className="absolute bottom-4 right-4">
            <div
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300"
              style={{
                transform: isHovered ? 'rotate(45deg) scale(1.1)' : 'rotate(0deg) scale(1)'
              }}
            >
              <ArrowUpRight className="text-gray-800" size={20} />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg hover:bg-gray-200 hover:text-gray-900 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-2xl border-2 pointer-events-none transition-colors duration-300"
          style={{
            borderColor: isHovered ? '#000000' : 'transparent'
          }}
        />
      </div>
    </div>
  );
};

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = `https://placehold.co/1200x600/e5e7eb/6b7280?text=${encodeURIComponent(project.title)}`;
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
      style={{
        animation: 'fadeIn 0.3s ease-out'
      }}
    >
      <div
        onClick={handleModalClick}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
        style={{
          animation: 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:rotate-90 group"
          aria-label="Close modal"
        >
          <X size={20} className="text-gray-600 group-hover:text-gray-900" />
        </button>

        <div className="relative h-96 overflow-hidden rounded-t-3xl bg-gray-100">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex gap-3">
            <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg">
              <span className="text-gray-600 text-xs">Year</span>
              <p className="text-gray-900 font-bold">{project.year}</p>
            </div>
            <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg">
              <span className="text-gray-600 text-xs">Category</span>
              <p className="text-gray-900 font-bold">{project.category}</p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {project.title}
          </h2>

          <div className="h-1 w-20 bg-gray-900 rounded-full mb-8" />

          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {project.fullDescription}
          </p>

          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag, idx) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-xl border border-gray-200 shadow-sm"
                  style={{
                    animation: `slideInLeft 0.4s ease-out ${idx * 0.05}s both`
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-black group"
            >
              <ExternalLink size={20} className="mr-2" />
              Live Demo
              <ArrowUpRight size={16} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-gray-200 hover:border-gray-300 group"
            >
              <Github size={20} className="mr-2" />
              View Code
              <ArrowUpRight size={16} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProjectsShowcase() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(projectData.map(p => p.category)))];
  const filteredProjects = filter === 'All'
    ? projectData
    : projectData.filter(p => p.category === filter);

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <section className="w-full min-h-screen py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-16 md:mb-20">
            <div
              className="inline-block mb-4"
              style={{ animation: 'fadeInUp 0.6s ease-out' }}
            >
              <div className="h-1 w-16 bg-gray-900 rounded-full" />
            </div>

            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6 leading-tight"
              style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}
            >
              Selected
              <br />
              <span className="text-gray-500">
                Projects
              </span>
            </h2>

            <p
              className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed"
              style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}
            >
              Koleksi proyek yang menampilkan keahlian saya dalam pengembangan web modern,
              dari aplikasi kompleks hingga landing page yang menawan.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-3 mb-12"
            style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${filter === category
                    ? 'bg-gray-900 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md hover:shadow-lg border border-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={setSelectedProject}
                index={index}
              />
            ))}
          </div>

          <div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ animation: 'fadeInUp 0.6s ease-out 0.5s both' }}
          >
            {[
              { label: 'Projects Completed', value: projectData.length },
              { label: 'Technologies', value: Array.from(new Set(projectData.flatMap(p => p.tags))).length },
              { label: 'Years Experience', value: '3+' },
              { label: 'Client Satisfaction', value: '100%' }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </section>
    </>
  );
}