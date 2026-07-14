import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SharedVideo from "@/components/SharedVideo";
import { HOME_PREVIEW_VIDEO_URLS } from "@/lib/projectVideoUrls";
import { prioritizeSharedVideo } from "@/lib/sharedVideoRegistry";

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
    video: HOME_PREVIEW_VIDEO_URLS[0],
  },
  {
    id: 2,
  title: "COLOURS OF SILENCE",
    thumbnail: "/thumbnails/COLORS_OF_SILENCE.JPEG?w=1600&h=686&fit=crop",
    video: HOME_PREVIEW_VIDEO_URLS[1],
  },
  {
    id: 3,
    title: "ROLL CALL",
    thumbnail: "/thumbnails/SHIVAM_VAIDEHI.JPEG?w=1600&h=686&fit=crop",
    video: HOME_PREVIEW_VIDEO_URLS[2],
  },
  {
    id: 4,
    title: "DEVOTION",
    thumbnail: "/thumbnails/BAA_BAAPUJI.JPEG?w=1600&h=686&fit=crop",
    video: HOME_PREVIEW_VIDEO_URLS[3],
  },
  {
    id: 5,
    title: "EVERMORE",
    thumbnail: "/thumbnails/ANJANA_SLVIAN.JPEG?w=1600&h=686&fit=crop",
    video: HOME_PREVIEW_VIDEO_URLS[4],
  },
  {
    id: 6,
    title: "TWO SIGNATURES",
    thumbnail: "/thumbnails/TWO_SIGNATURES.JPEG?w=1600&h=686&fit=crop",
    video: HOME_PREVIEW_VIDEO_URLS[5],
  },
  {
    id: 7,
    title: "THE TWO STATES",
    thumbnail: "/thumbnails/NOOR_RAMU.JPEG?w=1600&h=686&fit=crop",
    video: HOME_PREVIEW_VIDEO_URLS[6],
  },
  {
    id: 8,
    title: "LIFE",
    thumbnail: "/thumbnails/LIFE.JPEG?w=1600&h=686&fit=crop",
    video: HOME_PREVIEW_VIDEO_URLS[7],
  },
  {
    id: 9,
    title: "JHOOME",
    thumbnail: "/thumbnails/JHOOME.JPEG?w=1600&h=686&fit=crop",
    video: HOME_PREVIEW_VIDEO_URLS[8],
  },
  {
    id: 10,
    title: "AT THE TAJ",
    thumbnail: "/thumbnails/TAJ.JPEG?w=1600&h=686&fit=crop",
    video: HOME_PREVIEW_VIDEO_URLS[9],
  },
  {
    id: 11,
    title: "HITCHED",
    thumbnail: "/thumbnails/HITCHED.JPEG?w=1600&h=686&fit=crop",
    video: HOME_PREVIEW_VIDEO_URLS[10],
  },
  {
    id: 12,
    title: "BEYOND",
    thumbnail: "/thumbnails/BEYOND.JPEG?w=1600&h=686&fit=crop",
    video: HOME_PREVIEW_VIDEO_URLS[11],
  },
  {
    id: 13,
    title: "BOUND",
    thumbnail: "/thumbnails/BOUND.JPEG?w=1600&h=686&fit=crop",
    video: HOME_PREVIEW_VIDEO_URLS[12],
  },
  {
    id: 14,
    title: "US",
    thumbnail: "/thumbnails/US.JPEG?w=1600&h=686&fit=crop",
    video: HOME_PREVIEW_VIDEO_URLS[13],
  },
];

export default function ProjectsGrid({
  projects = defaultProjects,
}: ProjectsGridProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [touchHeldId, setTouchHeldId] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const touchStartTimeRef = useRef<number>(0);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartProjectIdRef = useRef<number | null>(null);
  const isScrollingRef = useRef<boolean>(false);
  const navigate = useNavigate();

  const handleMouseEnter = (projectId: number) => {
    setHoveredId(projectId);
  };

  const handleMouseLeave = (projectId: number) => {
    setHoveredId(null);
    const video = videoRefs.current[projectId];
    if (video) {
      video.pause();
    }
  };

  const handleTouchStart = (projectId: number) => {
    touchStartTimeRef.current = Date.now();
    touchStartProjectIdRef.current = projectId;

    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);

    const holdDuration = isScrollingRef.current ? 10 : 100;
    touchTimerRef.current = setTimeout(() => {
      setTouchHeldId(projectId);
    }, holdDuration);
  };

  const handleTouchEnd = (projectId: number) => {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current);

    const touchDuration = Date.now() - touchStartTimeRef.current;
    const isQuickTap = touchDuration < 100;
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

    // On mobile: only navigate on quick tap if not scrolling
    if (!isDesktop && isQuickTap && !isScrollingRef.current && touchHeldId === null) {
      navigate(`/project/${projectId}`);
    }

    setTouchHeldId(null);
    touchStartProjectIdRef.current = null;
    isScrollingRef.current = false;
    const video = videoRefs.current[projectId];
    if (video) {
      video.pause();
    }
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (!touchStartProjectIdRef.current) return;

    isScrollingRef.current = true;

    const touch = event.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    const cardElement = element?.closest('[data-project-id]') as HTMLElement | null;
    const currentProjectId = cardElement ? parseInt(cardElement.getAttribute('data-project-id') || '0') : null;

    if (currentProjectId !== touchStartProjectIdRef.current) {
      if (touchTimerRef.current) clearTimeout(touchTimerRef.current);
      setTouchHeldId(null);
    }
  };

  useEffect(() => {
    if (hoveredId !== null) {
      const video = videoRefs.current[hoveredId];
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    }
  }, [hoveredId]);

  useEffect(() => {
    if (touchHeldId !== null) {
      const project = projects.find((item) => item.id === touchHeldId);
      const video = videoRefs.current[touchHeldId];
      if (project?.video) prioritizeSharedVideo(project.video);
      if (video) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    }
  }, [touchHeldId]);

  useEffect(() => {
    projects.forEach((project) => {
      const video = videoRefs.current[project.id];
      if (!video) return;

      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
      const shouldPlay = isDesktop ? hoveredId === project.id : touchHeldId === project.id;

      if (shouldPlay && video.paused) {
        video.play().catch(() => {});
      } else if (!shouldPlay && !video.paused) {
        video.pause();
      }
    });
  }, [hoveredId, touchHeldId, projects]);

  useEffect(() => {
    projects.forEach((project) => {
      const video = videoRefs.current[project.id];
      if (video && video.networkState === HTMLMediaElement.NETWORK_EMPTY) {
        video.load();
      }
    });
  }, [projects]);

  const shouldShowVideo = (projectId: number) => {
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
    return isDesktop ? hoveredId === projectId : touchHeldId === projectId;
  };

  const handleVideoContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="w-full bg-transparent text-[#1f1714]">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              data-project-id={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => handleMouseEnter(project.id)}
              onMouseLeave={() => handleMouseLeave(project.id)}
              onTouchStart={() => handleTouchStart(project.id)}
              onTouchEnd={() => handleTouchEnd(project.id)}
              onTouchMove={handleTouchMove}
              onClick={() => {
                const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
                if (isDesktop) navigate(`/project/${project.id}`);
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
                    <SharedVideo
                      src={project.video}
                      className="w-full h-full object-cover"
                      muted
                      mobilePreview={typeof window !== "undefined" && window.innerWidth < 768}
                      onVideoReady={(video) => {
                        videoRefs.current[project.id] = video;
                      }}
                      onContextMenu={handleVideoContextMenu}
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
