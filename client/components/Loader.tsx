import { useEffect, useState } from "react";

interface LoaderProps {
  onExit?: (isExiting: boolean) => void;
  isExiting?: boolean;
}

export default function Loader({ onExit, isExiting = false }: LoaderProps) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setShowButton(true);
    }, 1500);

    return () => clearTimeout(revealTimer);
  }, []);

  const handleEnter = () => {
    onExit?.(true);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden text-[#1f1714] transition-opacity duration-1800 ${
      isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}
    style={{ height: '100vh', width: '100vw' }}>
      <style>{`
        @keyframes slowFadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes buttonFadeInSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes logoMoveToNavbar {
          0% {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          100% {
            position: fixed;
            top: 24px;
            left: 50%;
            transform: translate(-50%, 0) scale(1);
            opacity: 1;
          }
        }

        .emoria-text {
          animation: slowFadeIn 3.5s ease-in-out forwards;
          font-family: 'Carlton Std', serif;
          font-weight: 400;
          letter-spacing: 0.08em;
        }

        .logo-container {
          position: relative;
          width: fit-content;
          height: fit-content;
        }

        .logo-container.animate-to-navbar {
          animation: logoMoveToNavbar 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .enter-button {
          animation: buttonFadeInSlideUp 1s ease-out forwards;
          border-color: rgba(31, 23, 20, 0.75);
          color: #1f1714;
        }
      `}</style>

      <div className="relative z-10 flex flex-col items-center justify-center gap-0">
        {/* Logo group - animates to navbar on exit */}
        <div className={`logo-container ${isExiting ? 'animate-to-navbar' : ''}`}>
          {/* Logo - fades in and animates to navbar position on exit */}
          <h1 className="emoria-text text-6xl md:text-7xl leading-none">
            <img
              src="/client/images/logo.PNG"
              alt="Emoria Films Logo"
              className="h-12 md:h-48 w-auto transition-opacity duration-300 hover:opacity-80 brightness-0"
            />
          </h1>
        </div>

        {/* Enter button - appears after initial animation completes */}
        {showButton && !isExiting && (
          <button
            onClick={handleEnter}
            className="enter-button px-6 md:px-12 py-2 md:py-4 border text-xs tracking-widest uppercase hover:bg-[#1f1714] hover:text-[#ead3c5] transition-all duration-300 mt-8 md:mt-12"
            style={{ fontFamily: 'Ubuntu, sans-serif', fontWeight: 500 }}
          >
            Enter
          </button>
        )}
      </div>
    </div>
  );
}
