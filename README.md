# EWEM Portfolio — Hritvi Narvekar

A student portfolio for **E-waste and Environment Management (VEC02)**, built with Next.js (App Router), TypeScript, Tailwind CSS, and Lucide icons.

- **Student:** Hritvi Prasad Narvekar · 24102C0073 · TE CMPN C
- **Faculty:** Prof. Aniket Kundu · Vertical: HSSM_VEC

The site is a fully static export, so it has no database, login, or server. Every page, including each of the 15 assignment detail pages, is pre-rendered at build time into `out/`.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Requirements: Node.js 18.18 or newer (Node 22 recommended).

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the local development server |
| `npm run build` | Runs a production build and writes the static site to `out/` |
| `npm start` | Serves the built `out/` folder locally (run `npm run build` first) |
| `npm run typecheck` | Runs the TypeScript checks |
| `npm run check:files` | Checks that every file listed in the data exists, and lists unused files |

Fonts (Playfair Display and DM Sans) are self-hosted through `@fontsource`, so builds work without access to Google Fonts.

---

## Project structure

```
public/
  assignments/
    isa/            ← ISA submission files
    ese/            ← ESE submission files
    case-studies/   ← case study files
    research/       ← IEEE / research files
  previews/         ← page/slide snapshots rendered from the Office/PDF files
src/
  data/
    types.ts        ← data model types
    assignments.ts  ← ★ CENTRAL DATA: student, course, all 15 assignments
  lib/
    assignments.ts  ← status rules, stats, search, related items, file URLs
    file-meta.ts    ← build-time file existence and size checks
  components/       ← Header, Hero, StatsSection, CourseSection, PortfolioLibrary,
                      AssignmentCard, CategoryIndex, ResearchSection, FilePreview, decor…
  app/
    page.tsx              ← home (all sections)
    work/[slug]/page.tsx  ← assignment detail pages
    not-found.tsx         ← 404 page
netlify.toml
```

---

## Adding or replacing an assignment file

1. Copy the file into the matching folder, for example `public/assignments/ese/campus-campaign-poster.pdf`.
   Lowercase names with hyphens are easiest. Names with spaces or special characters also work, because URLs are encoded automatically.
2. Open `src/data/assignments.ts`, find the assignment, and add the file to its `files` array:

   ```ts
   files: [
     { label: "Campaign poster", path: "ese/campus-campaign-poster.pdf", format: "pdf" },
   ],
   ```

   `path` is relative to `public/assignments/`. Supported formats are `pdf`, `docx`, `xlsx`, `pptx`, `jpg`, and `png`. An assignment can have more than one file.
3. Set `status: "submitted"`, and remove `reviewNote` if the entry has one.
4. Run `npm run check:files`, then `npm run dev`, and check the result.

### How statuses work

| `status` in data | Shown as | Meaning |
| --- | --- | --- |
| `"submitted"` | Submitted | The file has been added and confirmed |
| `"review"` | Needs Review | A file is attached, but its match to the assignment is unconfirmed |
| `"pending"` | Pending File | No submission file has been added yet |

Honesty rule: an entry marked `"submitted"` whose files are missing from disk is automatically shown as **Pending File**. The dashboard statistics are always calculated from this data and never entered by hand.

### Optional previews for Word, Excel, and PowerPoint files

Browsers cannot display Office files natively. To show snapshots on a detail page, render images from the file and list them under `preview`. The images go in `public/previews/`.

```bash
soffice --headless --convert-to pdf my-deck.pptx
pdftoppm -jpeg -scale-to 1100 my-deck.pdf public/previews/my-deck
```

```ts
preview: { images: ["my-deck-1.jpg", "my-deck-2.jpg"], caption: "Slides rendered from the deck" },
```

---

## Deploying to Netlify

The repository includes `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "out"
```

**Option A: Git (recommended)**
1. Push this folder to a GitHub, GitLab, or Bitbucket repository.
2. In Netlify, choose **Add new site → Import an existing project** and select the repository.
3. Netlify reads `netlify.toml` automatically, so you don't need to change any settings. Click **Deploy**.

**Option B: Drag and drop**
1. Run `npm run build`.
2. Drag the generated `out/` folder onto <https://app.netlify.com/drop>.

**Option C: Netlify CLI**
```bash
npm run build
npx netlify-cli deploy --prod --dir=out
```

The site is plain static HTML, so it can also be hosted on GitHub Pages, Vercel, or any static file host.
