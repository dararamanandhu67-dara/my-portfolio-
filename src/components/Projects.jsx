import { ExternalLink, CheckCircle2, Github, Utensils, Clock } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { featuredProject, upcomingProjects, socials } from "../data/portfolio";

/**
 * Featured project (Feed Bridge) shown large and prominent,
 * followed by clearly-labelled "Coming Soon" placeholders.
 * Reusable: add projects to featuredProject/upcomingProjects in the data file.
 */
export default function Projects() {
  return (
    <section id="projects" className="section-anchor section-pad relative">
      <div className="container-x">
        <SectionHeading
          tag="Projects"
          title="Things I've Built"
          description="Real work, honestly presented. Feed Bridge is my main completed project so far."
        />

        {/* Featured project */}
        <Reveal>
          <article className="glass overflow-hidden rounded-[2rem] lg:grid lg:grid-cols-[0.95fr_1.05fr]">
            {/* Visual side */}
            <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden border-b border-white/[0.06] bg-gradient-to-br from-accent-cyan/10 via-accent-indigo/10 to-accent-violet/10 p-10 lg:border-b-0 lg:border-r">
              {/* decorative ring */}
              <div
                className="absolute h-56 w-56 rounded-full border border-white/10 opacity-60"
                aria-hidden="true"
              />
              <div
                className="absolute h-40 w-40 rounded-full bg-gradient-to-tr from-accent-cyan/20 to-accent-indigo/20 blur-2xl"
                aria-hidden="true"
              />

              <div className="relative flex items-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-indigo text-night-950 shadow-lg shadow-accent-cyan/30">
                  <Utensils size={30} aria-hidden="true" />
                </span>
                <div>
                  <span className="chip mb-2 font-mono text-accent-cyan">Featured</span>
                  <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
                    {featuredProject.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Content side */}
            <div className="p-7 sm:p-10">
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                <span className="text-gradient font-semibold">{featuredProject.tagline}</span> —{" "}
                {featuredProject.description}
              </p>

              <h4 className="mt-7 font-display text-sm font-semibold uppercase tracking-wider text-slate-500">
                Key Features
              </h4>
              <ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {featuredProject.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent-cyan" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>

              <h4 className="mt-6 font-display text-sm font-semibold uppercase tracking-wider text-slate-500">
                Technologies
              </h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {featuredProject.tech.map((tech) => (
                  <span key={tech} className="chip text-xs font-mono">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {featuredProject.demo && (
                  <a
                    href={featuredProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <ExternalLink size={16} aria-hidden="true" />
                    Live Demo
                  </a>
                )}
                {featuredProject.repo && (
                  <a
                    href={featuredProject.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <Github size={16} aria-hidden="true" />
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </article>
        </Reveal>

        {/* Upcoming / placeholder projects */}
        <h3 className="mb-6 mt-16 font-display text-xl font-semibold text-slate-200">
          Up Next
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingProjects.map((project, idx) => (
            <Reveal key={project.title} delay={idx * 90}>
              <div className="glass card-hover flex h-full flex-col rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-violet/20 to-accent-indigo/20 text-accent-violet">
                    <Clock size={18} aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-400">
                    Coming Soon
                  </span>
                </div>
                <h4 className="mt-4 font-display text-base font-semibold text-white">
                  {project.title}
                </h4>
                <p className="mt-2 text-sm text-slate-400">{project.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-10 text-center text-sm text-slate-500">
            More of my work is on{" "}
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-cyan underline-offset-4 hover:underline"
            >
              GitHub
            </a>{" "}
            — new projects get added here as I complete them.
          </p>
        </Reveal>
      </div>
    </section>
  );
}