import { Github, Linkedin } from "lucide-react";
import { personal, socials, navLinks } from "../data/portfolio";

/**
 * Footer — name, role, quick links and socials.
 */
export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-night-950/60 backdrop-blur-xl">
      <div className="container-x py-12">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
          {/* Brand */}
          <div>
            <p className="font-display text-xl font-bold text-white">{personal.name}</p>
            <p className="mt-1 text-sm text-slate-400">
              B.Tech Data Science Student {personal.college && `• ${personal.college}`}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              {navLinks.slice(0, 6).map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="text-sm text-slate-400 transition-colors hover:text-accent-cyan"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="btn-ghost !p-2.5"
            >
              <Github size={18} aria-hidden="true" />
            </a>
            <a
              href={socials.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="btn-ghost !p-2.5"
            >
              <Linkedin size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/[0.06] pt-6 text-center">
          <p className="text-xs text-slate-500">
            © 2026 {personal.name}. All rights reserved.
          </p>
          <p className="mt-1 font-mono text-xs text-slate-600">
            Built with React, Vite & Tailwind — data, code & technology.
          </p>
        </div>
      </div>
    </footer>
  );
}