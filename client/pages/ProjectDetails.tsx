import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import SharedVideo from "@/components/SharedVideo";

interface Project {
  id: number;
  title: string;
  thumbnail: string;
  video?: string;
  description?: string;
}

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "HOME",
    thumbnail: "/thumbnails/GAURAV_MUNISH.JPEG?w=1600&h=686&fit=crop",
    video: "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/GAURAV_MUNISH_FINAL.m4v",
    description: "Calm in Chaos. Home was never a place. It was always the person who made the noise disappear.",
  },
  {
    id: 2,
    title: "COLOURS OF SILENCE",
    thumbnail: "/thumbnails/COLORS_OF_SILENCE.JPEG?w=1600&h=686&fit=crop",
    video: "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/COLOURS_OF_SILENCE.m4v",
    description: "Colours of Silence is about that feeling. The kind of love that doesn't need to perform to be understood. The kind where silence is never empty, because the presence of the other person fills it with every colour words could never describe.",
  },
  {
    id: 3,
    title: "ROLL CALL",
    thumbnail: "/thumbnails/SHIVAM_VAIDEHI.JPEG?w=1600&h=686&fit=crop",
    video: "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/SHIVAM_VAIDEHI.m4v",
    description: "They once answered the same classroom. Now, they’re answering life together.",
  },
  {
    id: 4,
    title: "DEVOTION",
    thumbnail: "/thumbnails/BAA_BAAPUJI.JPEG?w=1600&h=686&fit=crop",
    video: "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/BAA_BAAPUJI.m4v",
    description: "Time takes almost everything, but true love refuses to leave.",
  },
  {
    id: 5,
    title: "EVERMORE",
    thumbnail: "/thumbnails/ANJANA_SLVIAN.JPEG?w=1600&h=686&fit=crop",
    video: "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/ANJANA_SLVIAN.m4v",
    description: "Anjana and Sylvian's big day was wrapped in love. The warmth in the air felt like every puzzle piece had finally found its place. Different traditions and arrangements came together beautifully, giving both families the space to connect, express, and become one.",
  },
  {
    id: 6,
    title: "TWO SIGNATURES",
    thumbnail: "/thumbnails/TWO_SIGNATURES.JPEG?w=1600&h=686&fit=crop",
    video: "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/COURT_MARRIAGE.m4v",
    description: "A quiet courtroom morning where two hearts chose forever.",
  },
  {
    id: 7,
    title: "THE TWO STATES",
    thumbnail: "/thumbnails/NOOR_RAMU.JPEG?w=1600&h=686&fit=crop",
    video: "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/NOOR_RAMU.m4v",
    description: "A Gujarati family that got dressed in lungi to attend a South Indian wedding. On the other hand, the South Indian groom became a catalyst to gel up both the families. And in the end everything turned out to be as beautiful as their love is. Language and cultural differences were no more a barrier because both families chose the language of love.",
  },
  {
    id: 8,
    title: "LIFE",
    thumbnail: "/thumbnails/LIFE.JPEG?w=1600&h=686&fit=crop",
    video: "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/LIFE.M4V",
    description: "Life unfolds through our actions, and the choices we dare to make. A few days ago, in the middle of my work chaos, I crossed paths with a 78-year-old gentleman — a man who has been nurturing his business for 35 years. He has seen the world around him change, evolve, and revolutionize. Yet, his words carry the calm of gratitude, his nature radiates humility, and his heart rests in quiet satisfaction. Filming him felt less like work and more like sitting in a classroom of life — where every smile, every pause, was a lesson. Even at his age, his passion for work and love for family stood tall, teaching me that fulfillment isn't found in success, but in sincerity.",
  },
  {
    id: 9,
    title: "JHOOME",
    thumbnail: "/thumbnails/JHOOME.JPEG?w=1600&h=686&fit=crop",
    video: "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/SHIVAM_VAIDEHI_FINAL.m4v",
    description: "Every love has a melody. She chose to sing theirs.",
  },
  {
    id: 10,
    title: "AT THE TAJ",
    thumbnail: "/thumbnails/TAJ.JPEG?w=1600&h=686&fit=crop",
    video: "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/TAJ.m4v",
    description: "Years from now, these frames won’t remind us of the Taj Mahal. They’ll remind us of the way you looked at each other, the silence you shared, and the love that made every moment feel timeless.",
  },
  {
    id: 11,
    title: "HITCHED",
    thumbnail: "/thumbnails/HITCHED.JPEG?w=1600&h=686&fit=crop",
    video: "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/HITCHED.m4v",
    description: "A lifetime, hand in hand.",
  },
  {
    id: 12,
    title: "BEYOND",
    thumbnail: "/thumbnails/BEYOND.JPEG?w=1600&h=686&fit=crop",
    video: "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/DEVOTION.M4V",
    description: "Connected where words cannot reach.",
  },
  {
    id: 13,
    title: "BOUND",
    thumbnail: "/thumbnails/BOUND.JPEG?w=1600&h=686&fit=crop",
    video: "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/HIMANI_NIHAR.mp4",
    description: "Bound in laughter, in silence, in chaos, and in peace.",
  },
  {
    id: 14,
    title: "US",
    thumbnail: "/thumbnails/US.JPEG?w=1600&h=686&fit=crop",
    video: "https://pub-0bd7bc901d3e426cbd77e347452c6dbd.r2.dev/videos/JAY_MEETEXA.m4v",
    description: "Where forever found its meaning.",
  },
];

const getRandomOtherProjects = (currentProjectId: number, count: number = 3) => {
  const otherProjectsList = defaultProjects.filter((p) => p.id !== currentProjectId);
  const shuffled = [...otherProjectsList].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map((p) => ({
    id: p.id,
    title: p.title,
    image: p.thumbnail,
  }));
};

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const currentProjectId = parseInt(id || "0");
  const project = defaultProjects.find((p) => p.id === currentProjectId);
  const otherProjects = project ? getRandomOtherProjects(currentProjectId, 3) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleVideoContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  useEffect(() => {
    setIsLoading(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current && isVideoPlaying) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsLoading(false);
          })
          .catch(() => {
            setIsLoading(false);
          });
      }
    }
  }, [isVideoPlaying, id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#e8d4c8] text-[#1f1714] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="text-lg underline hover:opacity-70 transition-opacity"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-[#1f1714]"
      style={{
        backgroundColor: '#e8d4c8',
        backgroundImage: 'url(/client/images/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navbar isScrolled={isScrolled} />

      {/* Hero Video Section */}
      <section className="w-full pt-32 pb-0 px-4 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          {/* Video Container with Play Button */}
          <div
            className="relative w-full aspect-video bg-[#1f1714]/5 rounded-2xl overflow-hidden group cursor-pointer"
            onClick={() => setIsVideoPlaying(true)}
          >
            {!isVideoPlaying ? (
              <>
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1f1714] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-8 h-8 md:w-10 md:h-10 text-[#e8d4c8] ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1f1714]/10 z-20">
                    <div className="w-12 h-12 border-4 border-[#1f1714]/20 border-t-[#1f1714] rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${
                    isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                />
                <SharedVideo
                  src={project.video!}
                  className="w-full h-full object-cover"
                  controls
                  loop
                  muted={false}
                  onVideoReady={(video) => {
                    videoRef.current = video;
                    video.currentTime = 0;
                  }}
                  onLoadedData={() => setIsLoading(false)}
                  onCanPlay={() => setIsLoading(false)}
                  onEnded={() => setIsVideoPlaying(false)}
                  onContextMenu={handleVideoContextMenu}
                />
              </div>
            )}
          </div>

          {/* Title Below Video */}
          <h1 className="text-3xl md:text-5xl font-bold text-[#1f1714] leading-tight mt-8">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Description Section */}
      <section className="w-full py-12 px-4 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="md:w-2/3">
            <p className="text-2xl md:text-2xl leading-relaxed text-[#1f1714]/80">
              {project?.description}
            </p>
          </div>
        </div>
      </section>

      {/* Other Projects Section */}
      <section className="w-full py-16 px-4 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1f1714] mb-12 uppercase tracking-wide">
            Other Projects
          </h2>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((proj) => (
              <div
                key={proj.id}
                className="group cursor-pointer"
                onClick={() => navigate(`/project/${proj.id}`)}
              >
                <div className="aspect-square bg-[#1f1714]/10 rounded-lg overflow-hidden mb-4">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-sm md:text-base font-bold text-[#1f1714] group-hover:opacity-70 transition-opacity">
                  {proj.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-[#1f1714]/20 py-8 px-4 md:px-12">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between text-xs md:text-sm text-[#1f1714]/70" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
          <p>© {new Date().getFullYear()} Emoria Films. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://www.instagram.com/emoria.films" className="hover:text-[#1f1714] transition-colors" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="tel:+917778081672" className="hover:text-[#1f1714] transition-colors">
              7778081672
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
