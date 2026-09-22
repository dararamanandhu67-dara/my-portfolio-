import Reveal from "./Reveal";

/**
 * Consistent section heading: mono tag + gradient title. Uses the
 * 3D perspective reveal for a premium entrance.
 */
export default function SectionHeading({ tag, title, description }) {
  return (
    <Reveal className="mb-14 text-center">
      <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-cyan sm:text-sm">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent-cyan/60" />
        // {tag}
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent-cyan/60" />
      </span>
      <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
        <span className="text-gradient-accent">{title}</span>
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {description}
        </p>
      )}
    </Reveal>
  );
}