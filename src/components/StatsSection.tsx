import { CircleCheck, CircleDashed, FolderOpen, Layers } from "lucide-react";
import type { PortfolioStats } from "@/lib/assignments";
import { Sparkle } from "./decor";

export function StatsSection({ stats }: { stats: PortfolioStats }) {
  const cards = [
    {
      label: "Total Assignments",
      value: stats.total,
      note: `${stats.byCategory.isa} ISA · ${stats.byCategory.ese} ESE · ${
        stats.byCategory["case-study"] + stats.byCategory.research
      } additional`,
      Icon: Layers,
      tone: "bg-sage-50 text-sage-700 border-sage-100",
    },
    {
      label: "Submitted",
      value: stats.submitted,
      note: "Files added and matched",
      Icon: CircleCheck,
      tone: "bg-sage-50 text-sage-700 border-sage-100",
    },
    {
      label: "Pending / Missing",
      value: stats.pending + stats.review,
      note:
        stats.pending + stats.review === 0
          ? "Nothing outstanding"
          : [
              stats.pending ? `${stats.pending} without a file` : null,
              stats.review ? `${stats.review} needing review` : null,
            ]
              .filter(Boolean)
              .join(" · "),
      Icon: CircleDashed,
      tone: "bg-coral-50 text-coral-700 border-coral-100",
    },
    {
      label: "Portfolio Categories",
      value: stats.categories,
      note: "ISA · ESE · Case Studies · Research",
      Icon: FolderOpen,
      tone: "bg-cream-100 text-terra-600 border-cream-200",
    },
  ];

  return (
    <section aria-label="Portfolio summary" className="relative -mt-4 pb-6 sm:-mt-8">
      <div className="container-page">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {cards.map(({ label, value, note, Icon, tone }, i) => (
            <li key={label} className="card relative flex flex-col p-4 sm:p-5">
              {i === 1 && (
                <span aria-hidden="true" className="absolute -right-1.5 -top-1.5">
                  <Sparkle size={14} twinkle delay={1} className="text-coral-300" />
                </span>
              )}
              <div className="flex items-start justify-between gap-2">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-terra-500">{label}</p>
                <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border ${tone}`}>
                  <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
              </div>
              <p className="mt-3 font-serif text-[2.4rem] leading-none text-sage-800 sm:text-[2.8rem]">{value}</p>
              <p className="mt-2 text-[0.8rem] leading-snug text-muted">{note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
