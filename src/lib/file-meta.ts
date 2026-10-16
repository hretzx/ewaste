import fs from "node:fs";
import path from "node:path";
import { assignments } from "@/data/assignments";
import { fileUrl, getEffectiveStatus, type ResolvedAssignment } from "./assignments";

const PUBLIC_ASSIGNMENTS = path.join(process.cwd(), "public", "assignments");

let cache: ResolvedAssignment[] | null = null;

/**
 * Runs at build time only. Checks every file listed in the data really exists
 * in /public/assignments and reads its size, so the UI never claims a
 * submission that is not there.
 */
export function getResolvedAssignments(): ResolvedAssignment[] {
  if (cache) return cache;
  cache = assignments.map((a) => {
    const files = a.files.map((f) => {
      const abs = path.join(PUBLIC_ASSIGNMENTS, f.path);
      let exists = false;
      let sizeBytes: number | null = null;
      try {
        const stat = fs.statSync(abs);
        exists = stat.isFile();
        sizeBytes = exists ? stat.size : null;
      } catch {
        console.warn(`[assignments] Missing file for "${a.title}": public/assignments/${f.path}`);
      }
      return { ...f, url: fileUrl(f.path), exists, sizeBytes };
    });
    return { ...a, files, effectiveStatus: getEffectiveStatus(a.status, files) };
  });
  return cache;
}
