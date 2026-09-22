import { Presentation, Trophy, Mic } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { achievements } from "../data/portfolio";

/**
 * Achievements — what has actually happened so far (project expo),
 * with space reserved for future wins.
 */
export default function Achievements() {
  return (
    <section id="achievements" className="section-anchor section-pad relative">
      <div className="container-x">
        <SectionHeading
          tag="Achievements"
          title="Achievements & Activities"
          description="Real moments so far — and space for plenty more."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {achievements.map((item, idx) => (
            <Reveal key={item.title} delay={idx * 90}>
              <div className="glass card-hover relative h-full rounded-3xl p-7">
                <div className="absolute right-5 top-5 rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-200">
                  Achieved
                </div>

                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300/20 to-accent-violet/20 text-amber-300">
                  <Presentation size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{item.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="chip text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}

          {/* Space reserved for future achievements */}
          <Reveal delay={180}>
            <div className="glass h-full rounded-3xl border-dashed p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-cyan/15 to-accent-indigo/15 text-accent-cyan">
                <Trophy size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">More Coming</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Space is reserved here for future achievements — hackathons, competitions,
                technical conferences and workshops as I take part in them.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Hackathons", "Competitions", "Conferences", "Workshops"].map((tag) => (
                  <span key={tag} className="chip text-xs text-slate-500">
                    <Mic size={12} aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}