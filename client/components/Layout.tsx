import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-transparent text-[#1f1714] flex flex-col">
      <header className="border-b border-[#6b5548]/12 sticky top-0 z-40 bg-transparent backdrop-blur-sm">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-8">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-serif font-bold tracking-wider text-[#1f1714] hover:opacity-70 transition-opacity">
              EMORIA
            </Link>
            <nav className="flex gap-8 md:gap-12 text-sm font-sans tracking-wide text-[#1f1714]">
              <Link
                to="/"
                className="hover:opacity-70 transition-opacity uppercase letter-spacing"
              >
                Home
              </Link>
              <Link
                to="/"
                className="hover:opacity-70 transition-opacity uppercase"
              >
                Projects
              </Link>
              <Link
                to="/about"
                className="hover:opacity-70 transition-opacity uppercase"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="hover:opacity-70 transition-opacity uppercase"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-[#6b5548]/12 mt-20">
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
