// Verifies every file referenced in src/data/assignments.ts exists in /public/assignments,
// and lists any files in /public/assignments that no assignment references.
// Usage: npm run check:files
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const data = fs.readFileSync(path.join(root, "src/data/assignments.ts"), "utf8");
const referenced = [...data.matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]);
const base = path.join(root, "public/assignments");

let ok = true;
for (const rel of referenced) {
  const exists = fs.existsSync(path.join(base, rel));
  if (!exists) ok = false;
  console.log(`${exists ? "OK     " : "MISSING"}  ${rel}`);
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(path.join(dir, d.name)) : [path.relative(base, path.join(dir, d.name)).split(path.sep).join("/")],
  );
const unreferenced = walk(base).filter((f) => !referenced.includes(f) && !f.endsWith(".gitkeep"));
if (unreferenced.length) {
  console.log("\nFiles in public/assignments not used by any assignment:");
  unreferenced.forEach((f) => console.log("  - " + f));
}
console.log(ok ? "\nAll referenced files found." : "\nSome referenced files are missing.");
process.exit(ok ? 0 : 1);
