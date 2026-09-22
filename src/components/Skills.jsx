import { Code2, ChartLine, Database, Globe, Workflow, Layers, Laptop } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { skills } from "../data/portfolio";

const iconMap = {
  code: Code2,
  chart: ChartLine,
  database: Database,
  globe: Globe,
  workflow: Workflow,
  layers: Layers,
};

/**
 * Skills — grouped into categories as clean badge cards.
 * No fake percentages — just honest tools & concepts.
 */
export default function Skills() {
  return (
    <section id="skills" className="section-anchor section-pad relative">
      <div className="container-x">
        <SectionHeading
          tag="Skills"
          title="What I Work With"
          description="The languages, tools and concepts I'm practicing as I grow. Clean badges, no inflated numbers."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((category, idx) => {
            const Icon = iconMap[category.icon] || Laptop;
            return (
              <Reveal key={category.title} delay={idx * 90}>
                <div className="glass card-hover flex h-full flex-col rounded-3xl p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan/20 to-accent-indigo/20 text-accent-cyan">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-base font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-accent-cyan/50 hover:text-white"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}