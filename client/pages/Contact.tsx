import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function Contact() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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

  useEffect(() => {
    if (submitStatus.type) {
      const statusElement = document.getElementById("contact-status");
      statusElement?.scrollIntoView({ behavior: "smooth", block: "center" });
      statusElement?.focus();
    }
  }, [submitStatus.type]);

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

      const contentType = response.headers.get("content-type") ?? "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : null;

      if (!response.ok) {
        throw new Error(
          data?.message ||
            `Unable to send message (server returned ${response.status}). Please try again later.`,
        );
      }

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
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
                <label htmlFor="phone" className="block text-sm uppercase tracking-widest mb-3 text-[#1f1714]" style={{ fontFamily: 'Ubuntu, sans-serif' }}>
                  Contact Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  autoComplete="tel"
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

            {submitStatus.type && (
              <div
                id="contact-status"
                className="p-5 rounded-lg mt-6"
                role="alert"
                aria-live="assertive"
                tabIndex={-1}
                style={{
                  fontFamily: "Ubuntu, sans-serif",
                  fontSize: "1.05rem",
                  fontWeight: 500,
                  backgroundColor:
                    submitStatus.type === "success" ? "#dcfce7" : "#fee2e2",
                  color: submitStatus.type === "success" ? "#166534" : "#991b1b",
                  border: `1px solid ${
                    submitStatus.type === "success" ? "#86efac" : "#fca5a5"
                  }`,
                  boxShadow: "0 8px 24px rgba(31, 23, 20, 0.12)",
                }}
              >
                {submitStatus.message}
              </div>
            )}

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
