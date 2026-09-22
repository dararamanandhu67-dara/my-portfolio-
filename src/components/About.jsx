import { GraduationCap, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { personal, about } from "../data/portfolio";

/**
 * About — honest student narrative with a "Currently Learning" side card.
 */
export default function About() {
  return (
    <section id="about" className="section-anchor section-pad relative">
      <div className="container-x">
        <SectionHeading tag="About Me" title="A Learner Building the Basics, Right" />

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          {/* Narrative */}
          <Reveal>
            <div className="space-y-5 text-sm leading-relaxed text-slate-400 sm:text-base">
              {about.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <span className="chip">
                  <GraduationCap size={14} aria-hidden="true" />
                  {personal.education}
                </span>
                <span className="chip">{personal.college}</span>
              </div>
            </div>
          </Reveal>

          {/* Currently learning card */}
          <Reveal delay={150}>
            <div className="glass card-hover rounded-3xl p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-violet to-accent-indigo text-night-950">
                  <Sparkles size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    Currently Learning / Exploring
                  </h3>
                  <p className="text-xs text-slate-400">Always adding something new</p>
                </div>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2">
                {about.currentlyLearning.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-slate-200 transition-colors hover:border-accent-cyan/50 hover:bg-white/[0.08]"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-4 text-xs leading-relaxed text-slate-500">
                This list grows with every new topic I pick up — check back often.
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}