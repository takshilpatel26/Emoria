import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SharedVideo from "@/components/SharedVideo";
import { HOME_PREVIEW_VIDEO_URLS } from "@/lib/projectVideoUrls";
import { prioritizeSharedVideo, stopSharedVideo } from "@/lib/sharedVideoRegistry";

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
  const [activeMobileProjectId, setActiveMobileProjectId] = useState<number | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
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

  useEffect(() => {
    const updateActiveProject = () => {
      if (window.innerWidth >= 768) {
        setActiveMobileProjectId(null);
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      let closestProjectId: number | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;

      projects.forEach((project) => {
        const card = cardRefs.current[project.id];
        if (!card) return;

        const bounds = card.getBoundingClientRect();
        const distance = Math.abs(bounds.top + bounds.height / 2 - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestProjectId = project.id;
        }
      });

      setActiveMobileProjectId((currentId) =>
        currentId === closestProjectId ? currentId : closestProjectId,
      );
    };

    let frameId = requestAnimationFrame(updateActiveProject);
    const handleViewportChange = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateActiveProject);
    };

    window.addEventListener("scroll", handleViewportChange, { passive: true });
    window.addEventListener("resize", handleViewportChange);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
    };
  }, [projects]);

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
    if (activeMobileProjectId === null) return;

    const project = projects.find((item) => item.id === activeMobileProjectId);
    if (!project?.video) return;

    prioritizeSharedVideo(project.video);
    const video = videoRefs.current[activeMobileProjectId];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }

    return () => {
      video?.pause();
      stopSharedVideo(project.video!);
    };
  }, [activeMobileProjectId, projects]);

  useEffect(() => {
    projects.forEach((project) => {
      const video = videoRefs.current[project.id];
      if (!video || window.innerWidth < 768) return;

      const shouldPlay = hoveredId === project.id;
      if (shouldPlay && video.paused) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else if (!shouldPlay && !video.paused) {
        video.pause();
      }
    });
  }, [hoveredId, projects]);

  useEffect(() => {
    projects.forEach((project) => {
      const video = videoRefs.current[project.id];
      if (video && video.networkState === HTMLMediaElement.NETWORK_EMPTY) {
        video.load();
      }
    });
  }, [projects]);

  const shouldShowVideo = (projectId: number) => {
    const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
    return isDesktop ? hoveredId === projectId : activeMobileProjectId === projectId;
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
              ref={(element) => {
                cardRefs.current[project.id] = element;
              }}
              onClick={() => navigate(`/project/${project.id}`)}
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
                  {project.video &&
                    (typeof window === "undefined" ||
                      window.innerWidth >= 768 ||
                      activeMobileProjectId === project.id) && (
                      <SharedVideo
                        src={project.video}
                        className="w-full h-full object-cover"
                        muted
                        mobilePreview={typeof window !== "undefined" && window.innerWidth < 768}
                        onVideoReady={(video) => {
                          videoRefs.current[project.id] = video;
                          if (activeMobileProjectId === project.id) {
                            prioritizeSharedVideo(project.video!);
                            video.currentTime = 0;
                            video.play().catch(() => {});
                          }
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
