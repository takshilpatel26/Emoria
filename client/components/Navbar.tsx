import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  isScrolled?: boolean;
}

export default function Navbar({ isScrolled = false }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: '#e8d4c8',
        backgroundImage: 'url(/client/images/background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        opacity: isScrolled ? 0.95 : 0.85,
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-6 w-full">
        <div className="flex items-center justify-between">
          {/* Logo - Centered */}
          <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
            <Link to="/" className="flex items-center cursor-pointer hover:opacity-70 transition-opacity">
              <img
                src="/client/images/logo.PNG"
                alt="Emoria Films Logo"
                className="h-10 md:h-12 w-auto brightness-0"
              />
            </Link>
          </div>

          {/* Hamburger Menu Button - Always on Right */}
          <button
            className="ml-auto"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-black" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Full-Screen Side Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <nav className="fixed right-0 top-0 h-screen w-full md:w-96 bg-[#ead3c5] z-50 flex flex-col p-6 md:p-12 animate-in slide-in-from-right duration-300">
            {/* Close Button */}
            <button
              className="self-end mb-12"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-black" />
            </button>

            {/* Menu Items */}
            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-2xl md:text-3xl font-serif font-bold text-black transition-opacity hover:opacity-70"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Social Links at Bottom */}
            <div className="mt-auto pt-8 border-t border-black/10">
              <div className="flex flex-col gap-4 text-sm tracking-wide uppercase text-black" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                <a href="https://www.instagram.com/emoria.films" className="hover:opacity-70 transition-opacity" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
                <a href="tel:+917778081672" className="hover:opacity-70 transition-opacity">
                  7778081672
                </a>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
