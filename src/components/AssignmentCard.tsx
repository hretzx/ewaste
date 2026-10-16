import Link from "next/link";
import { ArrowUpRight, Download, ExternalLink, FileQuestion } from "lucide-react";
import type { ResolvedAssignment } from "@/lib/assignments";
import { FORMAT_META, formatBytes } from "@/lib/assignments";
import { CategoryBadge, FormatChip, StatusBadge } from "./badges";
import { Sparkle } from "./decor";

export function AssignmentCard({
  item,
  sparkle = false,
  headingLevel = "h3",
}: {
  item: ResolvedAssignment;
  sparkle?: boolean;
  headingLevel?: "h3" | "h4";
}) {
  const Heading = headingLevel;
  const files = item.files.filter((f) => f.exists);
  const primary = files[0];
  const detailHref = `/work/${item.slug}/`;
  const opensInline = primary && FORMAT_META[primary.format].kind !== "office";

  return (
    <article
      className="group relative flex h-full flex-col rounded-card border border-terra-100 bg-paper p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-sage-200 hover:shadow-lift sm:p-6"
      aria-labelledby={`card-${item.id}`}
    >
      {sparkle && (
        <span aria-hidden="true" className="absolute -right-1.5 -top-1.5">
          <Sparkle size={16} className="text-coral-300" twinkle delay={(item.id.length % 5) as 0 | 1 | 2 | 3 | 4} />
        </span>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <CategoryBadge category={item.category} />
          {/^(ISA|ESE)\s/.test(item.code) && (
            <span className="font-serif text-sm italic text-terra-400">No. {item.code.split(" ")[1]}</span>
          )}
        </div>
        <StatusBadge status={item.effectiveStatus} />
      </div>

      <Heading id={`card-${item.id}`} className="mt-4 font-serif text-[1.3rem] leading-snug text-sage-800">
        <Link
          href={detailHref}
          className="outline-none after:absolute after:inset-0 after:rounded-card after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-sage-600"
        >
          {item.title}
        </Link>
      </Heading>

      <p className="mt-1.5 text-[0.78rem] font-medium uppercase tracking-[0.12em] text-terra-500">
        {item.assignmentType}
      </p>

      <p className="mt-3 line-clamp-3 text-[0.94rem] leading-relaxed text-muted">{item.description}</p>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
        {item.tags.slice(0, 4).map((t) => (
          <li key={t} className="rounded-full bg-cream-100 px-2.5 py-0.5 text-[0.72rem] text-terra-600">
            #{t}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        <div className="hairline mb-4" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          {primary ? (
            <FormatChip format={primary.format} size={formatBytes(primary.sizeBytes)} />
          ) : (
            <span className="inline-flex items-center gap-1 text-[0.75rem] font-medium text-coral-700">
              <FileQuestion className="h-3.5 w-3.5" aria-hidden="true" /> No file added yet
            </span>
          )}

          <div className="relative z-10 flex items-center gap-1">
            {primary && (
              <a
                href={primary.url}
                {...(opensInline ? { target: "_blank", rel: "noopener noreferrer" } : { download: "" })}
                className="grid h-9 w-9 place-items-center rounded-full text-terra-500 transition-colors hover:bg-cream-100 hover:text-terra-700"
                aria-label={`${opensInline ? "Open" : "Download"} ${item.title} (${primary.format.toUpperCase()}${
                  opensInline ? ", opens in a new tab" : ""
                })`}
              >
                {opensInline ? (
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Download className="h-4 w-4" aria-hidden="true" />
                )}
              </a>
            )}
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[0.8rem] font-semibold text-sage-700"
            >
              View details
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
