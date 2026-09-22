import { Target, Rocket } from "lucide-react";
import Reveal from "./Reveal";
import { gate } from "../data/portfolio";

/**
 * GATE 2027 — small, focused academic-goal strip.
 */
export default function Gate() {
  return (
    <section className="section-pad relative !py-16">
      <div className="container-x">
        <Reveal>
          <div className="glass card-hover relative overflow-hidden rounded-3xl p-8 text-center sm:p-10">
            {/* Ambient accents */}
            <div
              className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-accent-cyan/15 blur-[70px]"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-accent-violet/15 blur-[70px]"
              aria-hidden="true"
            />

            <span className="chip font-mono text-accent-cyan relative">
              <Rocket size={13} aria-hidden="true" />
              {gate.badge}
            </span>

            <h2 className="relative mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
              {gate.title}
            </h2>

            <p className="relative mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              {gate.description}
            </p>

            <div className="relative mt-7 flex flex-wrap items-center justify-center gap-2">
              {gate.focus.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-slate-200"
                >
                  <Target size={13} className="text-accent-cyan" aria-hidden="true" />
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}