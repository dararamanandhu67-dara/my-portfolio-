import { Download, FolderOpen, Github, Linkedin, ArrowRight } from "lucide-react";
import { personal, socials } from "../data/portfolio";
import ParticleCanvas from "./ParticleCanvas";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

const floatingChips = [
  { label: "Python", className: "top-8 -left-3 sm:-left-8 animate-float" },
  { label: "Pandas", className: "top-28 -right-3 sm:-right-10 animate-float", delay: "-1.2s" },
  { label: "SQL", className: "bottom-28 -left-3 sm:-left-10 animate-float", delay: "-2.4s" },
  { label: "React", className: "bottom-6 -right-3 sm:-right-8 animate-float", delay: "-3.6s" },
];

/**
 * Hero — profile photo wrapped in a rotating conic glow ring,
 * floating tech chips and the data-network canvas behind.
 *
 * NOTE: place your photo at `public/photo.jpg` (or update `photoUrl`).
 * A nice, clear headshot works best for the round-ish framed look.
 */
export default function Hero() {
  const photoUrl = "/photo.jpg";

  return (
    <section id="home" className="section-anchor relative flex min-h-screen items-center overflow-hidden">
      <div className="container-x relative z-10 grid items-center gap-16 pt-32 pb-24 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Text */}
        <div className="order-2 lg:order-1 max-w-xl">
          <Reveal>
            <span className="chip font-mono text-accent-cyan border-accent-cyan/30">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              B.Tech Data Science Student
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.6rem]">
              <span className="text-gradient">{personal.firstName}</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-5 font-heading text-lg font-extrabold tracking-tight text-slate-100 sm:text-2xl">
              {personal.headline}
            </p>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-400 sm:text-base">
              {personal.description}
            </p>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a href="#projects" className="btn-primary">
                <FolderOpen size={16} aria-hidden="true" />
                View My Projects
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href={personal.resumeUrl} className="btn-resume" download>
                <Download size={16} aria-hidden="true" />
                Resume
              </a>
            </div>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-8 flex items-center gap-3">
              <span className="font-heading text-xs font-semibold uppercase tracking-widest text-slate-500">
                Find me on
              </span>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="icon-btn"
              >
                <Github size={18} />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="icon-btn"
                onClick={(e) => {
                  if (!socials.linkedin) {
                    e.preventDefault();
                    alert("LinkedIn link coming soon — add your profile in src/data/portfolio.js");
                  }
                }}
              >
                <Linkedin size={18} />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Photo + visual */}
        <Reveal delay={220} className="order-1 lg:order-2">
          <TiltCard max={9}>
            <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
              {/* para-glow behind photo */}
              <div
                className="absolute inset-6 rounded-[2rem] bg-gradient-to-tr from-accent-purple/40 via-accent-cyan/30 to-accent-pink/30 blur-[70px] animate-pulse"
                aria-hidden="true"
              />

              {/* Photo with rotating conic border */}
              <div className="photo-ring relative overflow-hidden rounded-3xl bg-deep-space shadow-2xl shadow-black/60">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={`Portrait of ${personal.name}`}
                    className="aspect-[4/5] w-full object-cover"
                    loading="eager"
                  />
                ) : (
                  <div className="flex aspect-[4/5] w-full items-center justify-center bg-gradient-to-br from-deep-space to-ink-800 text-slate-600">
                    <span className="font-heading text-6xl font-extrabold text-gradient">
                      {personal.firstName.charAt(0)}
                    </span>
                  </div>
                )}

                {/* bottom name plate */}
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl border border-white/10 bg-cosmic/70 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="font-heading text-sm font-bold text-white">{personal.name}</p>
                    <p className="font-mono text-[11px] text-slate-400">
                      {personal.education}
                    </p>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#06b6d4] animate-pulse" aria-hidden="true" />
                </div>
              </div>

              {/* Floating tech chips */}
              {floatingChips.map((chip) => (
                <span
                  key={chip.label}
                  className={`glass absolute z-10 rounded-xl px-3.5 py-1.5 font-mono text-xs text-slate-200 shadow-lg shadow-black/30 ${chip.className}`}
                  style={{ animationDelay: chip.delay }}
                >
                  {chip.label}
                </span>
              ))}

              </div>
          </TiltCard>
        </Reveal>
      </div>
    </section>
  );
}