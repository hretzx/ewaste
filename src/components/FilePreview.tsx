import { Download, ExternalLink, FileQuestion, MonitorSmartphone } from "lucide-react";
import type { AssignmentPreview } from "@/data/types";
import { FORMAT_META, formatBytes, previewUrl, type ResolvedFile } from "@/lib/assignments";
import { FORMAT_ICON } from "./badges";

export function FileActions({ file, title }: { file: ResolvedFile; title: string }) {
  const kind = FORMAT_META[file.format].kind;
  return (
    <div className="flex flex-wrap gap-2">
      {kind !== "office" && (
        <a href={file.url} target="_blank" rel="noopener noreferrer" className="btn-primary px-5 py-2.5">
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Open {file.format.toUpperCase()}
          <span className="sr-only"> of {title} (opens in a new tab)</span>
        </a>
      )}
      <a href={file.url} download className={kind === "office" ? "btn-primary px-5 py-2.5" : "btn-secondary"}>
        <Download className="h-4 w-4" aria-hidden="true" />
        Download {file.format.toUpperCase()}
        <span className="sr-only"> of {title}</span>
      </a>
    </div>
  );
}

/**
 * Honest preview: PDFs are embedded (with an open/download fallback), images
 * are shown directly. Word/Excel/PowerPoint cannot be rendered natively by a
 * browser, so we show page/slide snapshots generated from the real file (if
 * available) and clear download actions.
 */
export function FilePreview({
  file,
  title,
  preview,
}: {
  file: ResolvedFile;
  title: string;
  preview?: AssignmentPreview;
}) {
  const meta = FORMAT_META[file.format];
  const Icon = FORMAT_ICON[file.format];

  if (!file.exists) {
    return (
      <div className="grid place-items-center rounded-card border border-dashed border-coral-200 bg-coral-50/40 p-10 text-center">
        <FileQuestion className="h-8 w-8 text-coral-600" aria-hidden="true" />
        <p className="mt-3 font-medium text-ink">This file is listed but could not be found.</p>
        <p className="mt-1 text-sm text-muted">Expected at /public/assignments/{file.path}</p>
      </div>
    );
  }

  if (meta.kind === "pdf") {
    return (
      <div className="overflow-hidden rounded-card border border-terra-100 bg-paper shadow-soft">
        <object
          data={`${file.url}#view=FitH`}
          type="application/pdf"
          aria-label={`PDF preview: ${file.label}`}
          className="block h-[70vh] min-h-[460px] w-full bg-cream-50"
        >
          {/* Fallback for browsers without an inline PDF viewer (most phones) */}
          <div className="flex flex-col items-center justify-center gap-4 px-6 py-14 text-center">
            {preview?.images[0] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl(preview.images[0])}
                alt={`First page of ${title}`}
                className="w-full max-w-xs rounded-md border border-terra-100 shadow-soft"
              />
            )}
            <p className="flex items-center gap-2 text-sm text-muted">
              <MonitorSmartphone className="h-4 w-4" aria-hidden="true" />
              Your browser can&apos;t display PDFs inline. Open or download the file instead.
            </p>
            <FileActions file={file} title={title} />
          </div>
        </object>
      </div>
    );
  }

  if (meta.kind === "image") {
    return (
      <figure className="overflow-hidden rounded-card border border-terra-100 bg-cream-50 p-3 shadow-soft sm:p-5">
        <a href={file.url} target="_blank" rel="noopener noreferrer" className="block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={file.url} alt={`${file.label} — ${title}`} className="mx-auto h-auto max-h-[80vh] w-auto rounded-lg" />
        </a>
        <figcaption className="mt-3 text-center text-xs text-terra-500">
          Original {meta.label} · {formatBytes(file.sizeBytes)} · select the image to open it full size
        </figcaption>
      </figure>
    );
  }

  // Office documents
  return (
    <div className="rounded-card border border-terra-100 bg-paper p-5 shadow-soft sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-sage-100 bg-sage-50 text-sage-700">
            <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
          </span>
          <div>
            <p className="font-medium text-ink">{file.label}</p>
            <p className="mt-0.5 text-sm text-terra-500">
              {meta.label} · {formatBytes(file.sizeBytes)}
            </p>
          </div>
        </div>
        <FileActions file={file} title={title} />
      </div>
      <p className="mt-4 rounded-xl bg-cream-50 px-4 py-3 text-[0.85rem] leading-relaxed text-muted">
        {meta.label}s can&apos;t be previewed natively in the browser. Download the original file and open it in{" "}
        {meta.app}.
        {preview && " The snapshots below were rendered from the submitted file for quick reference."}
      </p>

      {preview && preview.images.length > 0 && (
        <figure className="mt-5">
          <ul className={`grid gap-3 ${preview.images.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {preview.images.map((img, i) => (
              <li key={img}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl(img)}
                  alt={`${title} — ${preview.images.length > 1 ? `page ${i + 1}` : "preview"}`}
                  loading="lazy"
                  className="w-full rounded-lg border border-terra-100 bg-white"
                />
              </li>
            ))}
          </ul>
          <figcaption className="mt-2 text-xs text-terra-500">{preview.caption}</figcaption>
        </figure>
      )}
    </div>
  );
}
