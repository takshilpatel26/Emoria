import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Loader from "@/components/Loader";
import ProjectsGrid from "@/components/ProjectsGrid";
import { useLoader } from "@/context/LoaderContext";

export default function Index() {
  const { loaderComplete, setLoaderComplete, homePreviewsReady } = useLoader();
  const [isExiting, setIsExiting] = useState(loaderComplete);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setIsScrolled(false);
  }, []);

  useEffect(() => {
    if (!loaderComplete) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loaderComplete]);

  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        setShowQuote(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isExiting]);

  const handleLoaderExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      setLoaderComplete(true);
    }, 1800);
  };

  return (
    <>
      {!loaderComplete && (
        <Loader
          onExit={handleLoaderExit}
          isExiting={isExiting}
          previewsReady={homePreviewsReady}
        />
      )}
      
      {/* Home page - fades in during loader transition */}
      <div className={`min-h-screen bg-transparent text-[#1f1714] flex flex-col transition-opacity duration-1800 ${
        isExiting ? 'opacity-100' : 'opacity-0'
      }`}>
        <Navbar isScrolled={isScrolled} />

        <main className="flex-1">
          <style>{`
            @keyframes slowFadeIn {
              0% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }

            .quote-fade-in {
              animation: slowFadeIn 3.5s ease-in-out forwards;
            }
          `}</style>

          {/* Hero Section with Quote */}
          <section className="w-full pt-24 pb-16 md:pt-32 md:pb-24 px-8 md:px-12">
            <div className="max-w-4xl mx-auto">
              <p className={`text-3xl md:text-6xl font-serif font-thin text-[#1f1714] text-center leading-tight ${showQuote ? 'quote-fade-in' : 'opacity-0'}`}>
                A lifetime later,<br className="block md:hidden" />
                our films and photographs<br className="block md:hidden" />
                will still whisper the same love.
              </p>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="bg-transparent">
            <div className="max-w-screen-2xl mx-auto px-6 md:px-12 mb-12">
              <h2 className="text-4xl md:text-5xl font-serif font-thin text-[#1f1714]">
                Films
              </h2>
            </div>
            <ProjectsGrid />
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-[#6b5548]/12 bg-transparent mt-20">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm opacity-70 text-[#1f1714]" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                © {new Date().getFullYear()} Emoria Films. All rights reserved.
              </p>
              <div className="flex gap-6 mt-6 md:mt-0 text-sm opacity-70 text-[#1f1714]" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                <a href="https://www.instagram.com/emoria.films" className="hover:opacity-100 transition-opacity" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
                <a href="tel:+917778081672" className="hover:opacity-100 transition-opacity">
                  7778081672
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
