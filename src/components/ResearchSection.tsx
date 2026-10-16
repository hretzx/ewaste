import Link from "next/link";
import { ArrowUpRight, FileQuestion } from "lucide-react";
import { CATEGORY_META } from "@/data/assignments";
import { formatBytes, previewUrl, type ResolvedAssignment } from "@/lib/assignments";
import { CategoryBadge, FormatChip, StatusBadge } from "./badges";
import { Sparkle } from "./decor";
import { SectionHeading } from "./SectionHeading";

export function ResearchSection({ items }: { items: ResolvedAssignment[] }) {
  return (
    <section id="research" aria-labelledby="research-title" className="relative bg-cream-100/50 py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading
          id="research-title"
          eyebrow="Additional academic work"
          title="Case studies &"
          accent="research."
          description={`${CATEGORY_META["case-study"].blurb} ${CATEGORY_META.research.blurb}`}
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((item, i) => {
            const file = item.files.find((f) => f.exists);
            const cover = item.preview?.images[0];
            return (
              <article
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-card border border-terra-100 bg-paper shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:flex-row"
              >
                {i === 0 && (
                  <span aria-hidden="true" className="absolute right-3 top-3 z-10">
                    <Sparkle size={16} twinkle className="text-coral-300" />
                  </span>
                )}
                <div className="relative flex items-end justify-center bg-gradient-to-br from-cream-200 via-cream-100 to-coral-100 px-8 pt-8 sm:w-[42%] sm:shrink-0">
                  {cover && file ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewUrl(cover)}
                      alt={`First page of ${item.title}`}
                      className="w-full max-w-[220px] rounded-t-md border border-b-0 border-terra-100 shadow-lift transition-transform duration-500 group-hover:-translate-y-1"
                    />
                  ) : (
                    <div className="mb-8 grid h-40 w-full max-w-[200px] place-items-center rounded-md border border-dashed border-terra-200 text-terra-400">
                      <FileQuestion className="h-8 w-8" aria-hidden="true" />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <CategoryBadge category={item.category} />
                    <StatusBadge status={item.effectiveStatus} />
                  </div>
                  <h3 className="mt-4 font-serif text-[1.35rem] leading-snug text-sage-800">
                    <Link
                      href={`/work/${item.slug}/`}
                      className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-sage-600"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-1.5 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-terra-500">
                    {item.assignmentType}
                  </p>
                  <p className="mt-3 text-[0.93rem] leading-relaxed text-muted">{item.description}</p>
                  {item.team && (
                    <p className="mt-3 text-[0.8rem] text-terra-600">
                      With {item.team.join(" & ")}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    {file ? (
                      <FormatChip format={file.format} size={formatBytes(file.sizeBytes)} />
                    ) : (
                      <span className="text-[0.78rem] font-medium text-coral-700">
                        Pending File — the submission file has not been added yet
                      </span>
                    )}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-5 w-5 text-sage-700 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
