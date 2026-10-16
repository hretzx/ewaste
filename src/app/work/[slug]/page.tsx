import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, ArrowRight, CircleDashed, Users } from "lucide-react";
import { assignments, CATEGORY_META, COURSE } from "@/data/assignments";
import { getResolvedAssignments } from "@/lib/file-meta";
import { FORMAT_META, formatBytes, getRelated, STATUS_META } from "@/lib/assignments";
import { AssignmentCard } from "@/components/AssignmentCard";
import { CategoryBadge, FORMAT_ICON, StatusBadge } from "@/components/badges";
import { FileActions, FilePreview } from "@/components/FilePreview";
import { LeafSprig, Sparkle, SparkleDivider } from "@/components/decor";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return assignments.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = assignments.find((x) => x.slug === slug);
  if (!a) return { title: "Assignment not found" };
  return { title: a.title, description: a.description };
}

export default async function AssignmentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const all = getResolvedAssignments();
  const item = all.find((a) => a.slug === slug);
  if (!item) notFound();

  const files = item.files;
  const primary = files.find((f) => f.exists) ?? files[0];
  const related = getRelated(item, all);
  const categoryItems = all.filter((a) => a.category === item.category);
  const pos = categoryItems.findIndex((a) => a.id === item.id);
  const prev = categoryItems[pos - 1];
  const next = categoryItems[pos + 1];
  const sectionId = CATEGORY_META[item.category].sectionId;

  return (
    <article aria-labelledby="assignment-title">
      {/* Header */}
      <header className="grain relative overflow-hidden border-b border-terra-100">
        <LeafSprig className="absolute -right-4 top-6 hidden h-56 w-40 rotate-12 text-sage-200 md:block" />
        <div className="container-page relative py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <Link href="/#portfolio" className="inline-flex items-center gap-1.5 font-semibold text-sage-700 hover:underline">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to portfolio
            </Link>
            <span className="text-terra-200" aria-hidden="true">/</span>
            <Link href={`/#${sectionId}`} className="text-terra-500 hover:text-terra-700 hover:underline">
              {CATEGORY_META[item.category].label}
            </Link>
          </nav>

          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <CategoryBadge category={item.category} />
            <span className="font-serif text-sm italic text-terra-400">{item.code}</span>
            <StatusBadge status={item.effectiveStatus} size="md" />
          </div>
          <h1 id="assignment-title" className="mt-4 max-w-4xl font-serif text-[2.1rem] leading-[1.12] text-sage-800 sm:text-[3rem]">
            {item.title}
            <Sparkle size={18} twinkle className="ml-2 inline-block -translate-y-4 text-coral-300" />
          </h1>
          <p className="mt-3 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-terra-500">{item.assignmentType}</p>
          <p className="mt-4 max-w-3xl text-[1.05rem] leading-relaxed text-muted">{item.description}</p>
        </div>
      </header>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-12">
        {/* Main column: preview */}
        <div className="min-w-0 lg:col-span-8">
          {item.reviewNote && (
            <div
              role="note"
              className="mb-6 flex gap-3 rounded-card border border-cream-400 bg-cream-100 p-4 text-[0.92rem] leading-relaxed text-terra-700"
            >
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-semibold">
                  {item.effectiveStatus === "review" ? "Flagged for review" : "Mapping note"}
                </p>
                <p className="mt-0.5">{item.reviewNote}</p>
              </div>
            </div>
          )}

          <h2 className="sr-only">Document</h2>
          {primary ? (
            <FilePreview file={primary} title={item.title} preview={item.preview} />
          ) : (
            <div className="flex flex-col items-center rounded-card border border-dashed border-coral-200 bg-coral-50/40 px-6 py-16 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-paper text-coral-600">
                <CircleDashed className="h-6 w-6" aria-hidden="true" />
              </span>
              <p className="mt-4 font-serif text-xl text-sage-800">Pending File</p>
              <p className="mt-2 max-w-md text-sm text-muted">
                The submission file for this assignment has not been added yet. Once it is uploaded to the portfolio,
                it will appear here with open and download options.
              </p>
            </div>
          )}

          {files.length > 1 && (
            <div className="mt-6 grid gap-4">
              {files.slice(1).map((f) => (
                <FilePreview key={f.path} file={f} title={item.title} />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar: metadata */}
        <aside className="lg:col-span-4" aria-label="Assignment details">
          <div className="card divide-y divide-terra-100 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <section className="p-5">
              <h2 className="eyebrow">Submission status</h2>
              <div className="mt-3">
                <StatusBadge status={item.effectiveStatus} size="md" />
              </div>
              <p className="mt-2 text-sm text-muted">{STATUS_META[item.effectiveStatus].description}</p>
            </section>

            <section className="p-5">
              <h2 className="eyebrow">Attached documents</h2>
              {files.length === 0 ? (
                <p className="mt-3 text-sm text-coral-700">No files have been added yet.</p>
              ) : (
                <ul className="mt-3 grid gap-4">
                  {files.map((f) => {
                    const Icon = FORMAT_ICON[f.format];
                    return (
                      <li key={f.path}>
                        <div className="flex items-start gap-2.5">
                          <Icon className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" aria-hidden="true" />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-ink">{f.label}</p>
                            <p className="text-xs text-terra-500">
                              {FORMAT_META[f.format].label}
                              {f.sizeBytes != null && ` · ${formatBytes(f.sizeBytes)}`}
                              {!f.exists && " · file missing"}
                            </p>
                            {f.note && <p className="mt-1 text-xs text-terra-600">{f.note}</p>}
                          </div>
                        </div>
                        {f.exists && (
                          <div className="mt-3">
                            <FileActions file={f} title={item.title} />
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            {(item.brief || item.highlights) && (
              <section className="p-5">
                <h2 className="eyebrow">Purpose & highlights</h2>
                {item.brief && <p className="mt-3 text-sm leading-relaxed text-ink">{item.brief}</p>}
                {item.highlights && (
                  <ul className="mt-3 grid gap-2">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm leading-relaxed text-muted">
                        <Sparkle size={9} className="mt-1.5 text-coral-300" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {item.team && (
              <section className="p-5">
                <h2 className="eyebrow">Team</h2>
                <p className="mt-3 flex items-start gap-2 text-sm text-ink">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-sage-600" aria-hidden="true" />
                  Hritvi Narvekar, {item.team.join(", ")}
                </p>
              </section>
            )}

            <section className="p-5">
              <h2 className="eyebrow">Tags</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <li key={t} className="rounded-full bg-cream-100 px-2.5 py-0.5 text-xs text-terra-600">
                    #{t}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-terra-500">
                {COURSE.name} · {COURSE.code}
              </p>
            </section>
          </div>
        </aside>
      </div>

      {/* Prev / next within category */}
      {(prev || next) && (
        <nav aria-label={`More ${CATEGORY_META[item.category].label}`} className="container-page">
          <div className="grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link href={`/work/${prev.slug}/`} className="card group p-4 transition-colors hover:border-sage-200">
                <span className="flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-terra-500">
                  <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" /> Previous
                </span>
                <span className="mt-1 block font-serif text-lg text-sage-800">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/work/${next.slug}/`} className="card group p-4 text-right transition-colors hover:border-sage-200">
                <span className="flex items-center justify-end gap-1.5 text-xs uppercase tracking-[0.14em] text-terra-500">
                  Next <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                <span className="mt-1 block font-serif text-lg text-sage-800">{next.title}</span>
              </Link>
            )}
          </div>
        </nav>
      )}

      {/* Related */}
      <section aria-labelledby="related-title" className="container-page py-16">
        <SparkleDivider className="mb-12" />
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="related-title" className="font-serif text-[2rem] text-sage-800">
            Related <em className="italic text-coral-600">assignments</em>
          </h2>
          <Link href="/#portfolio" className="btn-secondary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All assignments
          </Link>
        </div>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => (
            <li key={r.id}>
              <AssignmentCard item={r} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
