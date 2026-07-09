import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  thumbnail: string;
  video?: string;
}

interface ProjectsGridProps {
  projects?: Project[];
}

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "HOME",
    thumbnail: "/thumbnails/GAURAV_MUNISH.JPEG?w=1600&h=686&fit=crop",
    video: "/videos/GAURAV_MUNISH_FINAL.m4v",
  },
  {
    id: 2,
  title: "COLOURS OF SILENCE",
    thumbnail: "/thumbnails/COLORS_OF_SILENCE.JPEG?w=1600&h=686&fit=crop",
    video: "/videos/COLOURS_OF_SILENCE.m4v",
  },
  {
    id: 3,
    title: "ROLL CALL",
    thumbnail: "/thumbnails/SHIVAM_VAIDEHI.JPEG?w=1600&h=686&fit=crop",
    video: "/videos/SHIVAM_VAIDEHI.m4v",
  },
  {
    id: 4,
    title: "DEVOTION",
    thumbnail: "/thumbnails/BAA_BAAPUJI.JPEG?w=1600&h=686&fit=crop",
    video: "/videos/BAA_BAAPUJI.m4v",
  },
  {
    id: 5,
    title: "EVERMORE",
    thumbnail: "/thumbnails/ANJANA_SLVIAN.JPEG?w=1600&h=686&fit=crop",
    video: "/videos/ANJANA_SLVIAN.m4v",
  },
  {
    id: 6,
    title: "TWO SIGNATURES",
    thumbnail: "/thumbnails/TWO_SIGNATURES.JPEG?w=1600&h=686&fit=crop",
    video: "/videos/COURT_MARRIAGE.m4v",
  },
  {
    id: 7,
    title: "THE TWO STATES",
    thumbnail: "/thumbnails/NOOR_RAMU.JPEG?w=1600&h=686&fit=crop",
    video: "/videos/NOOR_RAMU.m4v",
  },
  {
    id: 8,
    title: "LIFE",
    thumbnail: "/thumbnails/LIFE.JPEG?w=1600&h=686&fit=crop",
    video: "/videos/LIFE.M4V",
  },
  {
    id: 9,
    title: "JHOOME",
    thumbnail: "/thumbnails/JHOOME.JPEG?w=1600&h=686&fit=crop",
    video: "/videos/SHIVAM_VAIDEHI_FINAL.m4v",
  },
  {
    id: 10,
    title: "AT THE TAJ",
    thumbnail: "/thumbnails/TAJ.JPEG?w=1600&h=686&fit=crop",
    video: "/videos/TAJ.m4v",
  },
  {
    id: 11,
    title: "HITCHED",
    thumbnail: "/thumbnails/HITCHED.JPEG?w=1600&h=686&fit=crop",
    video: "/videos/HITCHED.m4v",
  },
  {
    id: 12,
    title: "BEYOND",
    thumbnail: "/thumbnails/BEYOND.JPEG?w=1600&h=686&fit=crop",
    video: "/videos/DEVOTION.M4V",
  },
  {
    id: 13,
    title: "BOUND",
    thumbnail: "/thumbnails/BOUND.JPEG?w=1600&h=686&fit=crop",
    video: "/videos/HIMANI_NIHAR.mp4",
  },
  {
    id: 14,
    title: "US",
    thumbnail: "/thumbnails/US.JPEG?w=1600&h=686&fit=crop",
    video: "/videos/JAY_MEETEXA.m4v",
  },
];

export default function ProjectsGrid({
  projects = defaultProjects,
}: ProjectsGridProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [touchHeldId, setTouchHeldId] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const touchStartTimeRef = useRef<number | null>(null);
  const touchStartIdRef = useRef<number | null>(null);
  const touchMovedRef = useRef<boolean>(false);
  const navigate = useNavigate();

  const isDesktop = () => typeof window !== 'undefined' && window.innerWidth >= 768;

  const handleMouseEnter = (projectId: number) => {
    if (!isDesktop()) return;
    setHoveredId(projectId);
  };

  const handleMouseLeave = (projectId: number) => {
    if (!isDesktop()) return;
    setHoveredId(null);
    const video = videoRefs.current[projectId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handleTouchStart = (projectId: number) => {
    if (isDesktop()) return;
    touchStartTimeRef.current = Date.now();
    touchStartIdRef.current = projectId;
    touchMovedRef.current = false;
  };

  const handleTouchMove = () => {
    if (isDesktop()) return;
    touchMovedRef.current = true;
  };

  const handleTouchEnd = (projectId: number) => {
    if (isDesktop()) return;

    const touchDuration = touchStartTimeRef.current ? Date.now() - touchStartTimeRef.current : 0;
    const isLongPress = touchDuration >= 250 && !touchMovedRef.current;

    touchStartTimeRef.current = null;
    touchStartIdRef.current = null;
    touchMovedRef.current = false;

    if (isLongPress) {
      setTouchHeldId(projectId);
    } else {
      navigate(`/project/${projectId}`);
    }
  };

  useEffect(() => {
    if (hoveredId !== null && isDesktop()) {
      const video = videoRefs.current[hoveredId];
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    }
  }, [hoveredId]);

  useEffect(() => {
    projects.forEach((project) => {
      const video = videoRefs.current[project.id];
      if (!video) return;

      const shouldPlay = isDesktop() ? hoveredId === project.id : touchHeldId === project.id;

      if (shouldPlay && video.paused) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else if (!shouldPlay && !video.paused) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [hoveredId, touchHeldId, projects]);

  const shouldShowVideo = (projectId: number) => {
    return isDesktop() ? hoveredId === projectId : touchHeldId === projectId;
  };

  return (
    <div className="w-full bg-transparent text-[#1f1714]">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) cardRefs.current[project.id] = el;
              }}
              data-project-id={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => handleMouseEnter(project.id)}
              onMouseLeave={() => handleMouseLeave(project.id)}
              onTouchStart={() => handleTouchStart(project.id)}
              onTouchMove={() => handleTouchMove()}
              onTouchEnd={() => handleTouchEnd(project.id)}
              onClick={() => {
                if (isDesktop()) {
                  navigate(`/project/${project.id}`);
                }
              }}
            >
              <div className="overflow-hidden rounded-lg">
                <div className="aspect-video w-full bg-[#1f1714]/5 relative">
                  {!shouldShowVideo(project.id) && (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover absolute inset-0 z-10"
                    />
                  )}
                  {project.video && (
                    <video
                      ref={(el) => {
                        if (el) videoRefs.current[project.id] = el;
                      }}
                      src={project.video}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                      preload="auto"
                    />
                  )}
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-thin mt-2 text-center group-hover:opacity-70 transition-opacity duration-300">
                {project.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
