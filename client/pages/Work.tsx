import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import CinematicScroll from "@/components/CinematicScroll";

export default function Work() {
  const [isScrolled, setIsScrolled] = useState(false);

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
        {/* Projects Gallery - No Hero Section */}
        <section>
          <CinematicScroll />
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-[#1f1714]">
              Ready to create something extraordinary?
            </h2>
            <p className="text-lg font-sans text-[#1f1714]/80 mb-8">
              Let's bring your vision to life with premium cinematography.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-[#1f1714] text-[#ead3c5] font-sans text-sm tracking-widest uppercase hover:opacity-80 transition-all duration-300 font-semibold"
            >
              Start Your Project
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1f1714]/20 mt-20">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm font-sans opacity-70 text-[#1f1714]">
              © {new Date().getFullYear()} Emoria Films. All rights reserved.
            </p>
            <div className="flex gap-6 mt-6 md:mt-0 text-sm font-sans opacity-70 text-[#1f1714]">
              <a href="https://www.instagram.com/emoria.films" className="hover:opacity-100 transition-opacity" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity">
                Vimeo
              </a>
              <a href="#" className="hover:opacity-100 transition-opacity">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
