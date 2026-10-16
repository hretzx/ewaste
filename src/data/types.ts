/** Portfolio categories. Keep in sync with CATEGORY_META in ./assignments.ts */
export type Category = "isa" | "ese" | "case-study" | "research";

/**
 * Declared submission status.
 * - "submitted": a matching file has been added and verified.
 * - "pending":   no submission file has been added yet.
 * - "review":    a file is attached but it could not be matched to this
 *                assignment with confidence. Check it and change to
 *                "submitted" (or replace the file).
 *
 * NOTE: "submitted" is only honoured when the entry actually has files.
 * See getEffectiveStatus() in src/lib/assignments.ts.
 */
export type SubmissionStatus = "submitted" | "pending" | "review";

export type FileFormat = "pdf" | "docx" | "xlsx" | "pptx" | "jpg" | "png";

export interface AssignmentFile {
  /** Human readable label, e.g. "Activity sheet (scanned)". */
  label: string;
  /** Path relative to /public/assignments, e.g. "isa/toxic-chemicals-any-5.pdf". */
  path: string;
  format: FileFormat;
  /** Optional note shown next to the file. */
  note?: string;
}

export interface AssignmentPreview {
  /** Paths relative to /public/previews. Generated from the real file. */
  images: string[];
  caption: string;
}

export interface Assignment {
  id: string;
  slug: string;
  /** Short reference label shown on cards, e.g. "ISA 01". */
  code: string;
  title: string;
  category: Category;
  /** One- or two-sentence summary used on cards and in search. */
  description: string;
  /** Longer purpose / brief, shown on the detail page (only what is known). */
  brief?: string;
  assignmentType: string;
  status: SubmissionStatus;
  tags: string[];
  files: AssignmentFile[];
  preview?: AssignmentPreview;
  /** Short factual highlights taken from the submitted file. */
  highlights?: string[];
  /** Co-authors / team members named in the file. */
  team?: string[];
  /** Shown prominently when status is "review" or a mapping needs checking. */
  reviewNote?: string;
}
