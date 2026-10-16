import {
  BookOpenText,
  CircleCheck,
  CircleDashed,
  FileImage,
  FileSpreadsheet,
  FileText,
  FlaskConical,
  Presentation,
  ScanSearch,
  ClipboardList,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import type { Category, FileFormat, SubmissionStatus } from "@/data/types";
import { CATEGORY_META } from "@/data/assignments";
import { STATUS_META } from "@/lib/assignments";

export const CATEGORY_ICON: Record<Category, LucideIcon> = {
  isa: ClipboardList,
  ese: GraduationCap,
  "case-study": BookOpenText,
  research: FlaskConical,
};

export const FORMAT_ICON: Record<FileFormat, LucideIcon> = {
  pdf: FileText,
  docx: FileText,
  xlsx: FileSpreadsheet,
  pptx: Presentation,
  jpg: FileImage,
  png: FileImage,
};

export function StatusBadge({ status, size = "sm" }: { status: SubmissionStatus; size?: "sm" | "md" }) {
  const meta = STATUS_META[status];
  const styles: Record<SubmissionStatus, string> = {
    submitted: "border-sage-200 bg-sage-50 text-sage-800",
    pending: "border-coral-200 bg-coral-50 text-coral-700",
    review: "border-cream-400 bg-cream-100 text-terra-700",
  };
  const Icon = status === "submitted" ? CircleCheck : status === "review" ? ScanSearch : CircleDashed;
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border font-semibold ${styles[status]} ${
        size === "md" ? "px-3 py-1 text-xs" : "px-2.5 py-0.5 text-[0.7rem]"
      }`}
    >
      <Icon className={size === "md" ? "h-3.5 w-3.5" : "h-3 w-3"} strokeWidth={2} aria-hidden="true" />
      {meta.label}
    </span>
  );
}

export function CategoryBadge({ category }: { category: Category }) {
  const Icon = CATEGORY_ICON[category];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-terra-100 bg-cream-50 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-terra-600">
      <Icon className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
      {CATEGORY_META[category].short}
    </span>
  );
}

export function FormatChip({ format, size }: { format: FileFormat; size?: string | null }) {
  const Icon = FORMAT_ICON[format];
  return (
    <span className="inline-flex items-center gap-1 text-[0.75rem] font-medium text-terra-500">
      <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
      <span className="uppercase tracking-wide">{format}</span>
      {size && <span className="text-terra-300">· {size}</span>}
    </span>
  );
}
