/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CENTRAL ASSIGNMENT DATA
 *  Edit this file to add files, change statuses, or update descriptions.
 *  The whole site (cards, stats, filters, detail pages) is generated from it.
 *
 *  To mark something as submitted:
 *   1. Put the file in /public/assignments/<isa|ese|case-studies|research>/
 *   2. Add it to the entry's `files` array (path is relative to /public/assignments)
 *   3. Set `status: "submitted"`
 *  A "submitted" entry with no files is automatically shown as Pending File.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { Assignment, Category } from "./types";

export const STUDENT = {
  name: "Hritvi Narvekar",
  formalName: "Hritvi Prasad Narvekar",
  rollNo: "24102C0073",
  className: "TE CMPN C",
} as const;

export const COURSE = {
  name: "E-waste and Environment Management",
  code: "VEC02",
  vertical: "HSSM_VEC",
  faculty: "Prof. Aniket Kundu",
  preamble:
    "Environmental Education helps learners to understand how their decisions and actions affect the environment, builds knowledge and skills necessary to address complex environmental issues, as well as ways we can take action to keep our environment healthy and sustainable for the future. It encourages character building and develops positive attitudes and values.",
  focusAreas: [
    "Responsible e-waste disposal",
    "Resource recovery and recycling",
    "Environmental impact reduction",
    "Circular economy",
    "Sustainability and environmental responsibility",
  ],
} as const;

export const CATEGORY_META: Record<
  Category,
  { label: string; short: string; sectionId: string; blurb: string }
> = {
  isa: {
    label: "ISA Activities",
    short: "ISA",
    sectionId: "isa",
    blurb: "In-semester assessment activities completed through the term.",
  },
  ese: {
    label: "ESE Activities",
    short: "ESE",
    sectionId: "ese",
    blurb: "End-semester evaluation work: class activities, studies, decks and data tasks.",
  },
  "case-study": {
    label: "Case Studies",
    short: "Case Study",
    sectionId: "research",
    blurb: "Long-form case study analysis.",
  },
  research: {
    label: "Research / IEEE",
    short: "Research",
    sectionId: "research",
    blurb: "Research paper written in IEEE conference format.",
  },
};

const TEAM_SS = ["Sakshi Sawant", "Saloni Ghutukade"];

export const assignments: Assignment[] = [
  // ───────────────────────────── ISA ACTIVITIES ─────────────────────────────
  {
    id: "isa-1",
    slug: "toxic-chemicals-any-5",
    code: "ISA 1",
    title: "Toxic Chemicals — Any 5",
    category: "isa",
    assignmentType: "Class activity · handwritten",
    description:
      "Five hazardous substances found in e-waste — lead, chromium, arsenic, cadmium and mercury — with where they occur and how they harm people and ecosystems.",
    brief:
      "Identify any five toxic chemicals associated with electronic waste and note their sources and their health and environmental effects.",
    status: "submitted",
    tags: ["toxic substances", "heavy metals", "health impact", "lead", "mercury", "cadmium"],
    highlights: [
      "Lead (Pb): found in batteries, circuit boards and old devices; pollutes soil and water",
      "Chromium (Cr): skin and respiratory irritation; can contaminate groundwater",
      "Arsenic (As): skin disease and raised cancer risk; contaminates soil and water",
      "Cadmium (Cd): kidney and bone damage; accumulates in crops and the food chain",
      "Mercury (Hg): affects the nervous system; builds up in aquatic food chains",
    ],
    files: [
      {
        label: "Activity 1 — scanned handwritten sheet",
        path: "isa/toxic-chemicals-any-5.pdf",
        format: "pdf",
      },
    ],
  },
  {
    id: "isa-2",
    slug: "assignment-3-elemental-recovery-process",
    code: "ISA 2",
    title: "Assignment 3 — Elemental Recovery Process Update",
    category: "isa",
    assignmentType: "Process infographic",
    description:
      "A three-phase pathway for recovering the strategic metals tantalum and niobium from capacitors and integrated circuits using automated laser precision and a molten-salt environment.",
    brief:
      "Update an elemental recovery process: show how specific components are sorted, which extraction method is applied, and which strategic metals are recovered.",
    status: "submitted",
    tags: ["tantalum", "niobium", "strategic metals", "molten salt", "laser", "capacitors"],
    highlights: [
      "Phase 1 — input & sorting of capacitors and integrated circuits",
      "Phase 2 — automated laser + molten-salt bespoke extraction",
      "Phase 3 — tantalum (Ta) and niobium (Nb) recovery",
    ],
    files: [
      {
        label: "Tantalum & niobium pathway infographic",
        path: "isa/assignment-3-tantalum-niobium-recovery.jpg",
        format: "jpg",
      },
    ],
  },
  {
    id: "isa-3",
    slug: "assignment-2-map-of-e-waste",
    code: "ISA 3",
    title: "Assignment 2 — Submit the Class Activity / Map of E-waste",
    category: "isa",
    assignmentType: "Class activity · infographic",
    description:
      "An infographic mapping PCB e-waste in Mizoram: main sources, nine recoverable metals, recovery procedures with typical recovery ranges, and the state's collection-to-recycling flow.",
    status: "submitted",
    tags: ["Mizoram", "PCB", "metal recovery", "hydrometallurgy", "e-waste flow", "map"],
    highlights: [
      "Sources: mobile phones, laptops, desktop PCs, televisions and PCBs",
      "Metals covered: Cu, Au, Ag, Pd, Ni, Sn, Pb, Al, Fe",
      "Flow: collection → dismantling & segregation → transport → authorised recovery",
    ],
    reviewNote:
      "Matched by topic: this Mizoram e-waste infographic was the closest fit for the 'Map of E-waste' class activity. Confirm this is the intended submission.",
    files: [
      {
        label: "Mizoram PCB e-waste metal recovery infographic",
        path: "isa/assignment-2-mizoram-pcb-metal-recovery.jpg",
        format: "jpg",
      },
    ],
  },
  {
    id: "isa-4",
    slug: "assignment-zero-check-aap",
    code: "ISA 4",
    title: "Assignment Zero — Check AAP",
    category: "isa",
    assignmentType: "Course insights worksheet",
    description:
      "Course-insight questions answered against the academic plan: curriculum buckets, where VEC02 sits in the HSSM bucket, its credits and teaching scheme, and its prerequisites.",
    status: "submitted",
    tags: ["AAP", "curriculum", "course insights", "credits", "HSSM"],
    highlights: [
      "VEC02 is offered under the HSSM bucket",
      "2 credits: 2 theory hours and 2 tutorial hours per week",
      "Prerequisite: Environmental Science (12th standard)",
    ],
    files: [
      {
        label: "Assignment 0 — Course Insights",
        path: "isa/assignment-0-check-aap.pdf",
        format: "pdf",
      },
    ],
  },
  {
    id: "isa-5",
    slug: "assignment-1-e-waste-tracker",
    code: "ISA 5",
    title: "Assignment 1 — E-waste Tracker",
    category: "isa",
    assignmentType: "Excel tracker",
    description:
      "A Mizoram state e-waste management tracker with a live 100-point scorecard computed from seven data sheets, aligned with the E-Waste (Management) Rules, 2022.",
    status: "submitted",
    tags: ["Mizoram", "tracker", "scorecard", "EPR", "Excel", "E-Waste Rules 2022"],
    highlights: [
      "Scorecard plus instructions and seven data sheets",
      "Sheets: generation, collection, recycling infrastructure, compliance, informal sector, health monitoring, awareness",
      "District-level rows for Mizoram's 11 districts",
    ],
    files: [
      {
        label: "Mizoram E-Waste Tracker workbook",
        path: "isa/assignment-1-mizoram-ewaste-tracker.xlsx",
        format: "xlsx",
      },
    ],
    preview: {
      images: ["assignment-1-mizoram-ewaste-tracker.jpg"],
      caption: "Scorecard sheet, rendered from the workbook",
    },
  },

  // ───────────────────────────── ESE ACTIVITIES ─────────────────────────────
  {
    id: "ese-1",
    slug: "e-waste-india-vs-world-data",
    code: "ESE 1",
    title: "E-waste India vs World Data Task — Class Activity",
    category: "ese",
    assignmentType: "Class activity · data task",
    description:
      "Class activity comparing e-waste data for India with global figures.",
    status: "submitted",
    tags: ["India", "global data", "statistics", "comparison"],
    team: TEAM_SS,
    files: [
      {
        label: "Uploaded file — content does not match this task",
        path: "ese/india-vs-world-data-task.docx",
        format: "docx",
        note: "Contains the Indian Companies comparative study (team version).",
      },
    ],
  },
  {
    id: "ese-2",
    slug: "carbon-footprint-task",
    code: "ESE 2",
    title: "Carbon Footprint Task — Excel Activity",
    category: "ese",
    assignmentType: "Excel activity",
    description:
      "A carbon-footprint workbook for hostels in Aizawl, Mizoram (January–August 2026) covering fossil fuel, refrigerants, electricity, water, waste, travel and offsets.",
    status: "submitted",
    tags: ["carbon footprint", "emissions", "Aizawl", "Excel", "offsets"],
    highlights: [
      "Seven activity sheets plus dropdown lists",
      "Site: hostels in Aizawl, Mizoram; period January–August 2026",
      "Data marked in the file as illustrative sample data for an academic exercise",
    ],
    files: [
      {
        label: "Carbon footprint workbook",
        path: "ese/carbon-footprint-activity.xlsx",
        format: "xlsx",
      },
    ],
    preview: {
      images: ["carbon-footprint-activity.jpg"],
      caption: "First sheet, rendered from the workbook",
    },
  },
  {
    id: "ese-3",
    slug: "state-tracker-ppt",
    code: "ESE 3",
    title: "TE CMPN C PPT — State Tracker Submission Folder",
    category: "ese",
    assignmentType: "Presentation",
    description:
      "Mizoram's e-waste challenge: the hazard and the opportunity, where collection breaks down, and a collect → aggregate → refurbish → recycle path to a circular Mizoram.",
    status: "submitted",
    tags: ["Mizoram", "state tracker", "collection gap", "circular economy", "PPT"],
    highlights: [
      "No CPCB-reported recycler or TSDF for hazardous waste in Mizoram",
      "48 hazardous-waste-generating units recorded in 2023–24; 17 filed annual returns",
      "Core idea: collect locally, repair first, recycle formally",
    ],
    files: [
      {
        label: "Mizoram's E-Waste Challenge (4 slides)",
        path: "ese/state-tracker-mizoram.pptx",
        format: "pptx",
      },
    ],
    preview: {
      images: [
        "state-tracker-mizoram-1.jpg",
        "state-tracker-mizoram-2.jpg",
        "state-tracker-mizoram-3.jpg",
        "state-tracker-mizoram-4.jpg",
      ],
      caption: "All four slides, rendered from the presentation",
    },
  },
  {
    id: "ese-4",
    slug: "recovery-process-design-patent",
    code: "ESE 4",
    title: "E-waste Recovery Process — Modification for Design Patent",
    category: "ese",
    assignmentType: "Proposal · outreach email",
    description:
      "A proposed modification to e-waste recovery for Mizoram — a modular dismantling and sorting mechanism for smaller collection hubs — sent to the Mizoram Forest department.",
    status: "submitted",
    tags: ["design patent", "Mizoram", "modular dismantling", "sorting", "outreach"],
    highlights: [
      "Recover reusable components and separate valuable materials before further processing",
      "Designed for preliminary recovery at small collection hubs",
      "Also invites a guest lecture at VIT, Wadala",
    ],
    team: TEAM_SS,
    files: [
      {
        label: "Proposal email (PDF)",
        path: "ese/recovery-process-design-patent.pdf",
        format: "pdf",
      },
    ],
  },
  {
    id: "ese-5",
    slug: "indian-companies-e-waste-rules",
    code: "ESE 5",
    title: "Indian Companies Following E-waste Rules — Comparative Study",
    category: "ese",
    assignmentType: "Comparative study",
    description:
      "A comparative study of how Dell, HP and Lenovo approach collection and recycling under India's E-Waste (Management) Rules, 2022 and its EPR framework.",
    status: "submitted",
    tags: ["EPR", "Dell", "HP", "Lenovo", "E-Waste Rules 2022", "compliance"],
    highlights: [
      "Context: EPR obligations for producers under the 2022 Rules",
      "Company-wise notes on Dell, HP and Lenovo",
      "Recommends comparing verified recycling data and EPR compliance records",
    ],
    files: [
      {
        label: "Comparative study write-up",
        path: "ese/indian-companies-ewaste-rules-study.docx",
        format: "docx",
      },
    ],
    preview: {
      images: ["indian-companies-ewaste-rules-study.jpg"],
      caption: "First page, rendered from the document",
    },
  },
  {
    id: "ese-6",
    slug: "novel-idea-pitch-deck",
    code: "ESE 6",
    title: "Novel Idea — E-waste Pitch Deck Submission Folder — CMPN C",
    category: "ese",
    assignmentType: "Pitch deck",
    description:
      "From Discarded Devices to Certified Value: a B2B platform that runs the full e-waste lifecycle for organisations, from secure collection and data wiping to certified recycling.",
    status: "submitted",
    tags: ["pitch deck", "startup idea", "B2B", "data security", "revenue model"],
    highlights: [
      "Problem: lost value, data-security risk, environmental harm",
      "Solution: collect → secure → sort → recycle → certify",
      "Six revenue streams, from subscriptions to recovered materials",
    ],
    team: TEAM_SS,
    files: [
      {
        label: "E-waste Circular Economy pitch deck (4 slides)",
        path: "ese/novel-idea-pitch-deck.pptx",
        format: "pptx",
      },
    ],
    preview: {
      images: [
        "novel-idea-pitch-deck-1.jpg",
        "novel-idea-pitch-deck-2.jpg",
        "novel-idea-pitch-deck-3.jpg",
        "novel-idea-pitch-deck-4.jpg",
      ],
      caption: "All four slides, rendered from the deck",
    },
  },
  {
    id: "ese-7",
    slug: "campus-e-waste-campaign",
    code: "ESE 7",
    title: "Campaign for E-waste in Campus — Class Activity",
    category: "ese",
    assignmentType: "Campaign · comic page",
    description:
      "A one-page comic set in Tokyo, 2087, three years after an 'E-Waste Collapse': a scavenger finds a glowing device in a dead zone that asks for help.",
    status: "submitted",
    tags: ["campaign", "awareness", "campus", "comic", "storytelling"],
    files: [
      {
        label: "E-waste awareness comic page",
        path: "ese/campus-campaign-comic.png",
        format: "png",
      },
    ],
  },
  {
    id: "ese-8",
    slug: "leed-green-buildings-india",
    code: "ESE 8",
    title: "LEED Certification of Green Buildings in India",
    category: "ese",
    assignmentType: "Excel scorecard",
    description:
      "Comparative LEED scorecards for eight Platinum-rated Indian buildings from USGBC project pages, plus a LEED v5 BD+C scorecard template and a sources-and-method sheet.",
    status: "submitted",
    tags: ["LEED", "green buildings", "USGBC", "India", "Platinum", "scorecard"],
    highlights: [
      "Eight LEED Platinum projects, including Infosys, L&T and ITC sites",
      "LEED versions differ, so ratings are compared with care",
      "Every figure linked to its USGBC source",
    ],
    files: [
      {
        label: "LEED green buildings scorecard workbook",
        path: "ese/leed-green-buildings-scorecard.xlsx",
        format: "xlsx",
      },
    ],
    preview: {
      images: ["leed-green-buildings-scorecard.jpg"],
      caption: "Building comparison sheet, rendered from the workbook",
    },
  },

  // ─────────────────────── ADDITIONAL ACADEMIC WORK ────────────────────────
  {
    id: "case-1",
    slug: "case-studies",
    code: "CASE",
    title: "Case Studies — Recycling, EPR and Circular Economy",
    category: "case-study",
    assignmentType: "Case study report",
    description:
      "A 24-page case study report presenting ten case studies on recycling, extended producer responsibility and the circular economy.",
    status: "submitted",
    tags: ["case studies", "EPR", "recycling", "circular economy", "report"],
    highlights: [
      "Ten case studies in one report",
      "Themes: recycling, EPR and circular economy",
      "Prepared for E-waste and Environment Management, TE CMPN C",
    ],
    files: [
      {
        label: "E-Waste Case Study Report (24 pages)",
        path: "case-studies/ewaste-case-study-report.pdf",
        format: "pdf",
      },
    ],
    preview: {
      images: ["ewaste-case-study-report.jpg"],
      caption: "Cover page, rendered from the PDF",
    },
  },
  {
    id: "research-1",
    slug: "ieee-paper-submission",
    code: "IEEE",
    title: "IEEE Paper — Dell's Circular Economy Strategy for Sustainable E-waste Management",
    category: "research",
    assignmentType: "Research paper · IEEE format",
    description:
      "A secondary-research case study of how Dell applies circular-economy principles to e-waste, comparing its stated ambitions with reported outcomes and drawing implications for India's EPR regime.",
    brief:
      "Six strategy areas are analysed: repairable and modular design, life extension and refurbishment, take-back and reverse logistics, recycling and closed-loop materials, packaging, and supply-chain collaboration.",
    status: "submitted",
    tags: ["IEEE", "research paper", "Dell", "circular economy", "EPR", "take-back"],
    highlights: [
      "Secondary-research case-study method; no primary data",
      "Finds reported collection well below Dell's 2030 take-back goal",
      "Recommends consistent, independently assured circularity reporting",
    ],
    team: TEAM_SS,
    files: [
      {
        label: "IEEE paper (6 pages)",
        path: "research/ieee-dell-circular-economy.pdf",
        format: "pdf",
      },
    ],
    preview: {
      images: ["ieee-dell-circular-economy.jpg"],
      caption: "First page, rendered from the PDF",
    },
  },
];
