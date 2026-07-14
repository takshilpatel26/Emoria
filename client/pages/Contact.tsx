import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function Contact() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Failed to send message. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className="max-w-2xl mx-auto px-6 md:px-12">
            <div className="mb-16">
              <h1 className="text-6xl md:text-7xl font-serif font-bold mb-4 text-[#1f1714]">
                Get in Touch
              </h1>
              <div className="w-16 h-0.5 bg-[#1f1714] mb-8"></div>
              <p className="text-lg font-sans text-[#1f1714]/80">
                Have a project in mind? Let's create something extraordinary
                together.
              </p>
            </div>

            {submitStatus.type && (
              <div
                className={`p-4 rounded-lg mb-8 ${
                  submitStatus.type === "success"
                    ? "bg-green-100 text-green-800 border border-green-300"
                    : "bg-red-100 text-red-800 border border-red-300"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-sm uppercase tracking-widest mb-3 text-[#1f1714]" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-[#1f1714]/30 text-[#1f1714] px-6 py-3 focus:outline-none focus:border-[#1f1714] transition-colors placeholder:text-[#1f1714]/40"
                  style={{ fontFamily: 'Ubuntu, sans-serif' }}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm uppercase tracking-widest mb-3 text-[#1f1714]" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-[#1f1714]/30 text-[#1f1714] px-6 py-3 focus:outline-none focus:border-[#1f1714] transition-colors placeholder:text-[#1f1714]/40"
                  style={{ fontFamily: 'Ubuntu, sans-serif' }}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm uppercase tracking-widest mb-3 text-[#1f1714]" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border border-[#1f1714]/30 text-[#1f1714] px-6 py-3 focus:outline-none focus:border-[#1f1714] transition-colors placeholder:text-[#1f1714]/40"
                  style={{ fontFamily: 'Ubuntu, sans-serif' }}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm uppercase tracking-widest mb-3 text-[#1f1714]" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-transparent border border-[#1f1714]/30 text-[#1f1714] px-6 py-3 focus:outline-none focus:border-[#1f1714] transition-colors resize-none placeholder:text-[#1f1714]/40"
                  style={{ fontFamily: 'Ubuntu, sans-serif' }}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1f1714] text-[#e8d4c8] text-sm tracking-widest uppercase py-4 hover:opacity-80 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Ubuntu, sans-serif' }}
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="mt-20 pt-12 border-t border-[#1f1714]/20">
              <h3 className="text-2xl font-serif font-bold mb-8 text-[#1f1714]">Other Ways to Reach Us</h3>
              <div className="space-y-4 text-[#1f1714]/80" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                <p><a href="mailto:emoriafilms@gmail.com" className="hover:text-[#1f1714] transition-colors">Mail: emoriafilms@gmail.com</a></p>
                <p><a href="https://www.instagram.com/emoria.films" className="hover:text-[#1f1714] transition-colors" target="_blank" rel="noopener noreferrer">
                Instagram Profile: emoria.films
                </a></p>
                <p><a href="tel:+917778081672" className="hover:text-[#1f1714] transition-colors">Phone: +91 7778081672</a></p>
                <p>Location: Ahmedabad, India</p>
              </div>
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
