import { assignments, CATEGORY_META } from "@/data/assignments";
import type {
  Assignment,
  AssignmentFile,
  Category,
  FileFormat,
  SubmissionStatus,
} from "@/data/types";

/** File metadata resolved at build time (see ./file-meta.ts). */
export interface ResolvedFile extends AssignmentFile {
  url: string;
  exists: boolean;
  sizeBytes: number | null;
}

export interface ResolvedAssignment extends Omit<Assignment, "files"> {
  files: ResolvedFile[];
  /** Status after honesty checks — use this everywhere in the UI. */
  effectiveStatus: SubmissionStatus;
}

/** Encode each path segment so names with spaces/special chars stay safe. */
export function fileUrl(path: string): string {
  return "/assignments/" + path.split("/").map(encodeURIComponent).join("/");
}

export function previewUrl(path: string): string {
  return "/previews/" + path.split("/").map(encodeURIComponent).join("/");
}

/**
 * An item is only "submitted" if it is declared submitted AND at least one of
 * its files actually exists. Anything without a real file is "pending".
 */
export function getEffectiveStatus(
  declared: SubmissionStatus,
  files: { exists: boolean }[],
): SubmissionStatus {
  const hasFile = files.some((f) => f.exists);
  if (!hasFile) return "pending";
  if (declared === "pending") return "review"; // file present but not confirmed
  return declared;
}

export const STATUS_META: Record<
  SubmissionStatus,
  { label: string; description: string }
> = {
  submitted: {
    label: "Submitted",
    description: "The submission file has been added.",
  },
  pending: {
    label: "Pending File",
    description: "The submission file for this assignment has not been added yet.",
  },
  review: {
    label: "Needs Review",
    description: "A file is attached but its match to this assignment still needs to be confirmed.",
  },
};

export const FORMAT_META: Record<
  FileFormat,
  { label: string; kind: "pdf" | "image" | "office"; app?: string }
> = {
  pdf: { label: "PDF", kind: "pdf" },
  jpg: { label: "JPG image", kind: "image" },
  png: { label: "PNG image", kind: "image" },
  docx: { label: "Word document", kind: "office", app: "Microsoft Word / Google Docs" },
  xlsx: { label: "Excel workbook", kind: "office", app: "Microsoft Excel / Google Sheets" },
  pptx: { label: "PowerPoint deck", kind: "office", app: "Microsoft PowerPoint / Google Slides" },
};

export function formatBytes(bytes: number | null): string | null {
  if (bytes == null) return null;
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function categoryLabel(c: Category) {
  return CATEGORY_META[c].label;
}

export function getAssignmentBySlug(slug: string): Assignment | undefined {
  return assignments.find((a) => a.slug === slug);
}

export interface PortfolioStats {
  total: number;
  submitted: number;
  pending: number;
  review: number;
  categories: number;
  byCategory: Record<Category, number>;
}

export function computeStats(items: ResolvedAssignment[]): PortfolioStats {
  const byCategory = { isa: 0, ese: 0, "case-study": 0, research: 0 } as Record<Category, number>;
  for (const a of items) byCategory[a.category]++;
  return {
    total: items.length,
    submitted: items.filter((a) => a.effectiveStatus === "submitted").length,
    pending: items.filter((a) => a.effectiveStatus === "pending").length,
    review: items.filter((a) => a.effectiveStatus === "review").length,
    categories: Object.values(byCategory).filter((n) => n > 0).length,
    byCategory,
  };
}

/** Related = same category first, then shared tags. */
export function getRelated(
  current: ResolvedAssignment,
  all: ResolvedAssignment[],
  limit = 3,
): ResolvedAssignment[] {
  const tags = new Set(current.tags.map((t) => t.toLowerCase()));
  return all
    .filter((a) => a.id !== current.id)
    .map((a) => {
      const shared = a.tags.filter((t) => tags.has(t.toLowerCase())).length;
      const score = shared * 2 + (a.category === current.category ? 3 : 0);
      return { a, score };
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a);
}

/** Text used by the client-side search. */
export function searchText(a: ResolvedAssignment): string {
  return [
    a.title,
    a.code,
    CATEGORY_META[a.category].label,
    CATEGORY_META[a.category].short,
    a.description,
    a.assignmentType,
    ...a.tags,
  ]
    .join(" ")
    .toLowerCase();
}
