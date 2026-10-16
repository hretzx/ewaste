import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/data/types";
import { CATEGORY_META } from "@/data/assignments";
import { formatBytes, type ResolvedAssignment } from "@/lib/assignments";
import { CATEGORY_ICON, FormatChip, StatusBadge } from "./badges";
import { LeafSprig, Sparkle } from "./decor";

/**
 * Editorial, numbered index of one category — an asymmetric layout with a
 * sticky intro column. Each entry is its own card linking to the detail page.
 */
export function CategoryIndex({
  category,
  items,
  title,
  accent,
  reverse = false,
}: {
  category: Category;
  items: ResolvedAssignment[];
  title: string;
  accent: string;
  reverse?: boolean;
}) {
  const meta = CATEGORY_META[category];
  const Icon = CATEGORY_ICON[category];
  const submitted = items.filter((i) => i.effectiveStatus === "submitted").length;

  return (
    <section
      id={meta.sectionId}
      aria-labelledby={`${meta.sectionId}-title`}
      className="relative py-20 sm:py-24"
    >
      <div className={`container-page grid gap-10 lg:grid-cols-12 lg:gap-12`}>
        <div className={`lg:col-span-4 ${reverse ? "lg:order-2" : ""}`}>
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-sage-200 bg-sage-50 text-sage-600">
              <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <p className="eyebrow mt-5 flex items-center gap-2">
              <Sparkle size={10} className="text-coral-300" /> {meta.label}
            </p>
            <h2 id={`${meta.sectionId}-title`} className="mt-3 font-serif text-[2.1rem] leading-[1.1] text-sage-800 sm:text-[2.5rem]">
              {title} <em className="italic text-coral-600">{accent}</em>
            </h2>
            <p className="mt-3 max-w-sm text-[0.98rem] leading-relaxed text-muted">{meta.blurb}</p>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-terra-100 bg-paper px-3.5 py-1.5 text-[0.8rem] text-terra-600">
              <span className="font-serif text-base text-sage-700">{submitted}</span> of {items.length} submitted
            </p>
            <a
              href={`?cat=${category}#portfolio`}
              className="mt-4 flex w-fit items-center gap-1.5 text-sm font-semibold text-sage-700 underline-offset-4 hover:underline"
            >
              Filter the library to {meta.short}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <LeafSprig className="mt-8 hidden h-40 w-28 text-sage-200 lg:block" />
          </div>
        </div>

        <ol className={`grid gap-4 lg:col-span-8 ${reverse ? "lg:order-1" : ""}`}>
          {items.map((item, i) => {
            const file = item.files.find((f) => f.exists);
            return (
              <li key={item.id}>
                <article className="group relative grid grid-cols-[auto_1fr] gap-x-4 rounded-card border border-terra-100 bg-paper p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-sage-200 hover:shadow-lift sm:gap-x-6 sm:p-6">
                  <span
                    aria-hidden="true"
                    className="font-serif text-[2.2rem] italic leading-none text-coral-300 transition-colors group-hover:text-coral-400 sm:text-[2.8rem]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-terra-500">
                        {item.assignmentType}
                      </p>
                      <StatusBadge status={item.effectiveStatus} />
                    </div>
                    <h3 className="mt-2 font-serif text-[1.25rem] leading-snug text-sage-800 sm:text-[1.4rem]">
                      <Link
                        href={`/work/${item.slug}/`}
                        className="after:absolute after:inset-0 after:rounded-card after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-sage-600"
                      >
                        {item.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[0.93rem] leading-relaxed text-muted">{item.description}</p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      {file ? (
                        <FormatChip format={file.format} size={formatBytes(file.sizeBytes)} />
                      ) : (
                        <span className="text-[0.78rem] font-medium text-coral-700">Submission file not added yet</span>
                      )}
                      <span aria-hidden="true" className="inline-flex items-center gap-1 text-[0.82rem] font-semibold text-sage-700">
                        Open entry
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
