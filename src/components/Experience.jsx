import { Briefcase, Handshake, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { experience } from "../data/portfolio";

/**
 * Experience — honestly framed: it's learning & internship preparation,
 * NOT a made-up job at a made-up company.
 */
export default function Experience() {
  return (
    <section id="experience" className="section-anchor section-pad relative">
      <div className="container-x">
        <SectionHeading
          tag="Experience"
          title="Experience & Preparation"
          description="An honest look at where I am right now in my journey."
        />

        <Reveal>
          <div className="glass card-hover relative mx-auto max-w-3xl rounded-3xl p-7 sm:p-9">
            {/* Accent line */}
            <div className="absolute left-0 top-0 h-1 w-24 rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet" />

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-indigo/20 to-accent-cyan/20 text-accent-cyan">
                  <Briefcase size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{experience.title}</h3>
                  <span className="chip mt-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
                    {experience.subtitle}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-slate-400 sm:text-base">
              {experience.description}
            </p>

            <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {experience.focus.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent-cyan" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-accent-cyan/20 bg-accent-cyan/[0.06] p-4">
              <Handshake size={20} className="shrink-0 text-accent-cyan" aria-hidden="true" />
              <p className="text-sm font-medium text-slate-200">
                Open to Internship Opportunities
              </p>
            </div>

            <p className="mt-4 text-xs text-slate-500">{experience.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}