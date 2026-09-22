import { useEffect, useState } from "react";
import { navLinks } from "../data/portfolio";

/**
 * Vertical dot navigation fixed to the right side (desktop only).
 * Highlights the section currently in view.
 */
export default function SideNav() {
  const [activeId, setActiveId] = useState("home");

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

  const goTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-7 top-1/2 z-[900] hidden -translate-y-1/2 flex-col gap-6 md:flex group"
    >
      {navLinks.map((link) => (
        <button
          key={link.id}
          onClick={() => goTo(link.id)}
          className={`relative flex h-3 w-3 items-center justify-center rounded-full border-2 transition-all duration-300 ${
            activeId === link.id
              ? "border-accent-cyan scale-110"
              : "border-white/20 hover:border-accent-purple hover:scale-125"
          }`}
          aria-label={`Go to ${link.label}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              activeId === link.id ? "bg-accent-cyan shadow-[0_0_8px_#06b6d4]" : "bg-transparent"
            }`}
          />
          <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap font-heading text-[11px] font-semibold uppercase tracking-widest text-slate-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:opacity-100">
            {link.label}
          </span>
        </button>
      ))}
    </nav>
  );
}