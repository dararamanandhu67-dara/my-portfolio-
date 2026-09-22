import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { personal, navLinks } from "../data/portfolio";

/**
 * Sticky navbar: glass background on scroll, active section highlight,
 * mobile hamburger menu, and a gradient Resume button.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const goTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[76px] transition-all duration-300 ${
        scrolled
          ? "bg-cosmic/70 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <nav className="container-x flex h-[76px] items-center justify-between" aria-label="Main navigation">
        <button
          onClick={() => goTo("home")}
          className="group flex items-center gap-2 font-heading text-xl font-extrabold text-white"
          aria-label="Go to top"
        >
          <span className="text-accent-cyan">&lt;</span>
          <span className="text-gradient-accent transition-transform duration-300 group-hover:-translate-y-0.5">
            DR
          </span>
          <span className="text-accent-cyan">/&gt;</span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => goTo(link.id)}
                className={`rounded-lg px-4 py-2 font-heading text-[0.95rem] font-medium transition-all duration-200 ${
                  activeId === link.id
                    ? "bg-accent-purple/15 text-white border border-accent-purple/25"
                    : "text-slate-400 border border-transparent hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a href={personal.resumeUrl} className="btn-resume !px-5 !py-2 text-sm" download>
            <Download size={15} aria-hidden="true" />
            Resume
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-200 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out border-b border-white/[0.06] bg-deep-space/95 backdrop-blur-2xl ${
          menuOpen ? "max-h-[560px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-x flex flex-col gap-2 py-5">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => goTo(link.id)}
                className={`block w-full rounded-xl px-4 py-3 text-left font-heading text-base font-medium transition-colors ${
                  activeId === link.id ? "bg-accent-purple/15 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="mt-2">
            <a href={personal.resumeUrl} className="btn-resume w-full justify-center" download>
              <Download size={16} aria-hidden="true" />
              Resume
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}