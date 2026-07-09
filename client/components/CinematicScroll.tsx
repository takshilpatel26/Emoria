import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  number: string;
  title: string;
  description: string;
  thumbnail: string;
  video?: string;
  duration: string;
}

interface CinematicScrollProps {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    id: 1,
    number: "01",
    title: "Monsoon Chronicles",
    description: "A visual journey through India's rainy season",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=1600&h=686&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    duration: "3:42",
  },
  {
    id: 2,
    number: "02",
    title: "Urban Pulse",
    description: "The heartbeat of modern Indian cities",
    thumbnail: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&h=686&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    duration: "4:15",
  },
  {
    id: 3,
    number: "03",
    title: "Heritage & Light",
    description: "Exploring India's architectural wonders",
    thumbnail: "https://images.unsplash.com/photo-1519338377840-dcaf128d09e1?w=1600&h=686&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    duration: "3:58",
  },
  {
    id: 4,
    number: "04",
    title: "Spice of Life",
    description: "Cultural celebrations in motion",
    thumbnail: "https://images.unsplash.com/photo-1516537763649-eb7e522b02d7?w=1600&h=686&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    duration: "5:20",
  },
  {
    id: 5,
    number: "05",
    title: "Golden Hour",
    description: "Nature's most magical moments",
    thumbnail: "https://images.unsplash.com/photo-1495575621362-d1d2e5f0ef1f?w=1600&h=686&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    duration: "4:00",
  },
  {
    id: 6,
    number: "06",
    title: "Neon Dreams",
    description: "Night city landscapes and vibes",
    thumbnail: "https://images.unsplash.com/photo-1514306688772-b74b64f1d6e9?w=1600&h=686&fit=crop",
    video: "https://commondatastorage.googleapis.com/gtv-videos-library/sample/BigBuckBunny.mp4",
    duration: "3:35",
  },
];

export default function CinematicScroll({
  projects = defaultProjects,
}: CinematicScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const navigate = useNavigate();

  const handleMouseEnter = (projectId: number) => {
    setHoveredId(projectId);
    const video = videoRefs.current[projectId];
    if (video) {
      video.play();
    }
  };

  const handleMouseLeave = (projectId: number) => {
    setHoveredId(null);
    const video = videoRefs.current[projectId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  return (
    <div className="w-full bg-transparent text-[#1f1714]">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-0">
        <div
          className="flex flex-col gap-12"
        >
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="flex-shrink-0 group cursor-pointer"
              onMouseEnter={() => handleMouseEnter(project.id)}
              onMouseLeave={() => handleMouseLeave(project.id)}
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Project Number & Info */}
                <div className="flex-shrink-0 min-w-max pt-4">
                  <p className="text-8xl md:text-9xl font-serif font-bold text-[#1f1714]/10 tracking-tight">
                    {project.number}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mt-4 group-hover:opacity-70 transition-opacity">
                    {project.title}
                  </h3>
                  <p className="text-sm font-sans opacity-60 mt-2 max-w-xs text-[#1f1714]">
                    {project.description}
                  </p>
                  <p className="text-xs font-sans opacity-40 mt-3 tracking-widest uppercase text-[#1f1714]">
                    {project.duration}
                  </p>
                </div>

                {/* Image/Video Card */}
                <div className="flex-1 w-full">
                  <div
                    className={`relative overflow-hidden rounded-lg transition-all duration-1000 ease-in-out ${
                      hoveredId === project.id ? "opacity-100" : "opacity-80"
                    }`}
                  >
                    <div className="aspect-cinema w-full bg-[#1f1714]/5">
                      {hoveredId === project.id && project.video ? (
                        <video
                          ref={(el) => {
                            if (el) videoRefs.current[project.id] = el;
                          }}
                          src={project.video}
                          className="w-full h-full object-cover"
                          muted
                          loop
                        />
                      ) : (
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                        />
                      )}
                    </div>

                    {/* Overlay on hover */}
                    {hoveredId !== project.id && (
                      <div className="absolute inset-0 bg-[#1f1714]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out flex items-center justify-center">
                        <div className="text-[#ead3c5] text-center">
                          <svg
                            className="w-16 h-16 mx-auto mb-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <p className="text-sm font-sans tracking-widest uppercase">
                            Watch
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Divider */}
              {index < projects.length - 1 && (
                <div className="mt-12 h-px bg-[#1f1714]/15"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
