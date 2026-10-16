"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { Search, SearchX, X } from "lucide-react";
import type { Category, SubmissionStatus } from "@/data/types";
import { CATEGORY_META } from "@/data/assignments";
import { searchText, STATUS_META, type ResolvedAssignment } from "@/lib/assignments";
import { AssignmentCard } from "./AssignmentCard";
import { CATEGORY_ICON } from "./badges";

type CategoryFilter = "all" | Category;
type StatusFilter = "any" | SubmissionStatus;

const CATEGORY_FILTERS: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "isa", label: CATEGORY_META.isa.label },
  { value: "ese", label: CATEGORY_META.ese.label },
  { value: "case-study", label: CATEGORY_META["case-study"].label },
  { value: "research", label: CATEGORY_META.research.label },
];

const isCategory = (v: string | null): v is CategoryFilter =>
  !!v && CATEGORY_FILTERS.some((f) => f.value === v);
const isStatus = (v: string | null): v is StatusFilter =>
  v === "any" || v === "submitted" || v === "pending" || v === "review";

export function PortfolioLibrary({ items }: { items: ResolvedAssignment[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("any");
  const [hydrated, setHydrated] = useState(false);
  const searchId = useId();

  // Restore filters from the URL (?q=&cat=&status=) so views are shareable.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const q = p.get("q");
    const c = p.get("cat");
    const s = p.get("status");
    if (q) setQuery(q);
    if (isCategory(c)) setCategory(c);
    if (isStatus(s)) setStatus(s);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const p = new URLSearchParams(window.location.search);
    query ? p.set("q", query) : p.delete("q");
    category !== "all" ? p.set("cat", category) : p.delete("cat");
    status !== "any" ? p.set("status", status) : p.delete("status");
    const qs = p.toString();
    const url = `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`;
    window.history.replaceState(window.history.state, "", url);
  }, [query, category, status, hydrated]);

  const index = useMemo(() => items.map((a) => ({ a, text: searchText(a) })), [items]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return index
      .filter(({ a }) => category === "all" || a.category === category)
      .filter(({ a }) => status === "any" || a.effectiveStatus === status)
      .filter(({ text }) => terms.every((t) => text.includes(t)))
      .map(({ a }) => a);
  }, [index, query, category, status]);

  const countFor = (c: CategoryFilter) =>
    items.filter((a) => (c === "all" || a.category === c) && (status === "any" || a.effectiveStatus === status)).length;
  const statusCount = (s: SubmissionStatus) =>
    items.filter((a) => a.effectiveStatus === s && (category === "all" || a.category === category)).length;

  const reviewExists = items.some((a) => a.effectiveStatus === "review");
  const statusFilters: { value: StatusFilter; label: string }[] = [
    { value: "submitted", label: STATUS_META.submitted.label },
    { value: "pending", label: STATUS_META.pending.label },
    ...(reviewExists ? [{ value: "review" as const, label: STATUS_META.review.label }] : []),
  ];

  const filtersActive = query !== "" || category !== "all" || status !== "any";
  const reset = () => {
    setQuery("");
    setCategory("all");
    setStatus("any");
  };

  const chip = (active: boolean) =>
    `inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[0.82rem] font-medium transition-all duration-200 ${
      active
        ? "border-sage-700 bg-sage-700 text-white shadow-soft"
        : "border-terra-100 bg-paper text-terra-600 hover:border-sage-300 hover:text-sage-800"
    }`;

  return (
    <div>
      {/* Controls */}
      <div className="card p-4 sm:p-5">
        <div className="relative">
          <label htmlFor={searchId} className="sr-only">
            Search assignments
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-terra-300" aria-hidden="true" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, categories, descriptions or tags — e.g. “Mizoram”, “EPR”, “LEED”"
            className="w-full rounded-full border border-terra-100 bg-canvas py-3 pl-11 pr-11 text-[0.95rem] text-ink placeholder:text-terra-300 focus:border-sage-400 focus:bg-paper focus:outline-none focus:ring-4 focus:ring-sage-100 [&::-webkit-search-cancel-button]:hidden"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-terra-400 hover:bg-cream-100 hover:text-terra-600"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map((f) => {
              const Icon = f.value === "all" ? null : CATEGORY_ICON[f.value];
              return (
                <button
                  key={f.value}
                  type="button"
                  aria-pressed={category === f.value}
                  onClick={() => setCategory(f.value)}
                  className={chip(category === f.value)}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden="true" />}
                  {f.label}
                  <span className={`text-[0.72rem] ${category === f.value ? "text-sage-100" : "text-terra-300"}`}>
                    {countFor(f.value)}
                  </span>
                </button>
              );
            })}
          </div>

          <div role="group" aria-label="Filter by submission status" className="flex flex-wrap items-center gap-2 border-t border-dashed border-terra-100 pt-3">
            {statusFilters.map((f) => (
              <button
                key={f.value}
                type="button"
                aria-pressed={status === f.value}
                onClick={() => setStatus(status === f.value ? "any" : f.value)}
                className={chip(status === f.value)}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${
                    f.value === "submitted" ? "bg-sage-400" : f.value === "pending" ? "bg-coral-300" : "bg-cream-400"
                  }`}
                />
                {f.label}
                <span className={`text-[0.72rem] ${status === f.value ? "text-sage-100" : "text-terra-300"}`}>
                  {statusCount(f.value as SubmissionStatus)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result summary — announced to screen readers */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2">
        <p role="status" aria-live="polite" className="text-sm text-muted">
          Showing <strong className="font-semibold text-ink">{results.length}</strong> of {items.length} entries
          {category !== "all" && <> in <span className="text-terra-600">{CATEGORY_META[category].label}</span></>}
          {status !== "any" && <> · <span className="text-terra-600">{STATUS_META[status].label}</span></>}
          {query && <> matching “<span className="text-terra-600">{query}</span>”</>}
        </p>
        {filtersActive && (
          <button type="button" onClick={reset} className="text-sm font-semibold text-sage-700 underline-offset-4 hover:underline">
            Clear all filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((a, i) => (
            <li key={a.id} className="animate-fade-up" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
              <AssignmentCard item={a} sparkle={i % 4 === 0} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-5 flex flex-col items-center rounded-card border border-dashed border-terra-200 bg-paper/60 px-6 py-14 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-cream-100 text-terra-500">
            <SearchX className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-4 font-serif text-xl text-sage-800">No assignments match these filters</h3>
          <p className="mt-2 max-w-md text-sm text-muted">
            Try a broader word, a different category, or remove the status filter. Search looks through titles,
            categories, descriptions and tags.
          </p>
          <button type="button" onClick={reset} className="btn-primary mt-6">
            Show all {items.length} entries
          </button>
        </div>
      )}
    </div>
  );
}
