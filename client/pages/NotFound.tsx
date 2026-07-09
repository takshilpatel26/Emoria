import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h1 className="text-9xl md:text-9xl font-serif font-bold text-white mb-4">
            404
          </h1>
          <div className="w-16 h-0.5 bg-white mx-auto mb-8"></div>
          <p className="text-2xl font-serif text-white/80 mb-4">
            Page Not Found
          </p>
          <p className="text-lg font-sans text-white/60 mb-12">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-4 border border-white text-white font-sans text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
