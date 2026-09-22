import { Award, FileBadge, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { certificates } from "../data/portfolio";

/**
 * Certificates — placeholder cards (config-driven). Add real certificates
 * to `certificates` in src/data/portfolio.js. Nothing is invented.
 */
export default function Certificates() {
  return (
    <section id="certificates" className="section-anchor section-pad relative">
      <div className="container-x">
        <SectionHeading
          tag="Certificates"
          title="Certificates"
          description="I'll add official certificates here as I complete them — with issuing organization and credential links."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, idx) => (
            <Reveal key={idx} delay={idx * 90}>
              <div className="glass card-hover flex h-full flex-col rounded-3xl border-dashed p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300/15 to-accent-violet/15 text-amber-300">
                    <Award size={20} aria-hidden="true" />
                  </span>
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify certificate: ${cert.name}`}
                      className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-accent-cyan"
                    >
                      <ExternalLink size={16} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-500">
                      Pending
                    </span>
                  )}
                </div>

                <h3 className="mt-5 font-display text-base font-semibold text-white">{cert.name}</h3>
                <p className="mt-1 text-sm text-slate-400">
                  {cert.org}
                  {cert.date ? ` • ${cert.date}` : ""}
                </p>

                <div className="mt-4 flex items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-xs text-slate-500">
                  <FileBadge size={14} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {cert.note}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mt-8 text-center text-sm text-slate-500">
            This section stays honest — missing details are shown as placeholders, not filler.
          </p>
        </Reveal>
      </div>
    </section>
  );
}