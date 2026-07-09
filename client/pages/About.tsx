import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function About() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen text-[#1f1714] flex flex-col"
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

      <main className="flex-1 pt-20">
        <section className="py-20">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex md:items-center md:justify-center">
            <div className="mb-16 text-left md:text-center">
              <h1 className="text-4xl md:text-7xl font-serif font-bold mb-4 text-[#1f1714]">
                About Emoria
              </h1>
              <div className="w-16 h-0.5 bg-[#1f1714] mb-8 md:mx-auto"></div>
              <p className="text-lg md:text-2xl text-[#1f1714]/80 max-w-3xl md:mx-auto" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Emoria is the art of preserving emotions that time quietly turns into memories.</p>
              <p className="text-lg md:text-2xl text-[#1f1714]/80 max-w-3xl md:mx-auto" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Every story begins long before a camera is lifted.</p>
              <p className="text-lg md:text-2xl text-[#1f1714]/80 max-w-3xl md:mx-auto" style={{ fontFamily: 'Ubuntu, sans-serif' }}>It begins in the silence between two people. In a glance that lasts a little longer than expected. In the comfort of familiar hands. In the spaces where words become unnecessary.</p>
              <p className="text-lg md:text-2xl text-[#1f1714]/80 max-w-3xl md:mx-auto" style={{ fontFamily: 'Ubuntu, sans-serif' }}>We don't chase moments.</p>
              <p className="text-lg md:text-2xl text-[#1f1714]/80 max-w-3xl md:mx-auto" style={{ fontFamily: 'Ubuntu, sans-serif' }}>We wait for them to reveal themselves.</p>
              <p className="text-lg md:text-2xl text-[#1f1714]/80 max-w-3xl md:mx-auto" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Because the most beautiful stories are never performed—they simply exist, unnoticed by everyone except the people living them.</p>
              <p className="text-lg md:text-2xl text-[#1f1714]/80 max-w-3xl md:mx-auto" style={{ fontFamily: 'Ubuntu, sans-serif' }}>To us, cinema has never been about recording reality. It's about preserving the feeling of being there. The kind of feeling that returns years later through a single frame, a familiar smile, or the sound of a voice you thought you'd forgotten.</p>
              <p className="text-lg md:text-2xl text-[#1f1714]/80 max-w-3xl md:mx-auto" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Over the years, we've come to believe that people don't revisit films to remember what happened. They return to remember how they once felt. Love changes, people grow, time moves quietly forward—but emotions have a strange way of surviving inside images.</p>
              <p className="text-lg md:text-2xl text-[#1f1714]/80 max-w-3xl md:mx-auto" style={{ fontFamily: 'Ubuntu, sans-serif' }}>That's what we create.</p>
              <p className="text-lg md:text-2xl text-[#1f1714]/80 max-w-3xl md:mx-auto" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Not films to watch.</p>
              <p className="text-lg md:text-2xl text-[#1f1714]/80 max-w-3xl md:mx-auto" style={{ fontFamily: 'Ubuntu, sans-serif' }}>But feelings to return to.</p>
              <p className="text-lg md:text-2xl text-[#1f1714]/80 max-w-3xl md:mx-auto" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Because memories fade.</p>
              <p className="text-lg md:text-2xl text-[#1f1714]/80 max-w-3xl md:mx-auto" style={{ fontFamily: 'Ubuntu, sans-serif' }}>Emotions don't.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1f1714]/20 mt-20">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-[#1f1714]/70" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
              © {new Date().getFullYear()} Emoria Films. All rights reserved.
            </p>
            <div className="flex gap-6 mt-6 md:mt-0 text-sm text-[#1f1714]/70" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
              <a href="https://www.instagram.com/emoria.films" className="hover:text-[#1f1714] transition-colors" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="tel:+917778081672" className="hover:text-[#1f1714] transition-colors">
                7778081672
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
