import { Factory, Leaf, Recycle, RefreshCcw, Trash2 } from "lucide-react";
import { COURSE } from "@/data/assignments";
import { Branch, LoopMark, Sparkle } from "./decor";
import { SectionHeading } from "./SectionHeading";

const FOCUS_ICONS = [Trash2, Recycle, Factory, RefreshCcw, Leaf];

export function CourseSection() {
  const rows = [
    { label: "Course Name", value: COURSE.name },
    { label: "Course Code", value: COURSE.code },
    { label: "Vertical / Sub-Vertical", value: COURSE.vertical },
    { label: "Faculty", value: COURSE.faculty },
  ];

  return (
    <section id="course" aria-labelledby="course-title" className="relative py-20 sm:py-24">
      <div className="container-page">
        <SectionHeading id="course-title" eyebrow="Course" title="About the" accent="course." />

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {/* Course panel */}
          <div className="relative overflow-hidden rounded-card border border-sage-100 bg-sage-800 p-6 text-sage-50 shadow-lift sm:p-8 lg:col-span-5">
            <LoopMark className="absolute -bottom-10 -right-10 h-48 w-48 text-sage-600/60" />
            <Sparkle size={14} twinkle className="absolute right-6 top-6 text-coral-300" />
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-cream-300">Course details</p>
            <dl className="relative mt-6 space-y-5">
              {rows.map((r) => (
                <div key={r.label}>
                  <dt className="text-[0.75rem] uppercase tracking-[0.14em] text-sage-200">{r.label}</dt>
                  <dd className="mt-1 font-serif text-[1.35rem] leading-snug text-white">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Preamble + focus areas */}
          <div className="grid gap-5 lg:col-span-7">
            <figure className="card relative overflow-hidden p-6 sm:p-8">
              <Branch className="absolute -right-8 -top-2 h-16 w-56 text-sage-200" />
              <p className="eyebrow">Course preamble</p>
              <blockquote className="relative mt-4 font-serif text-[1.12rem] leading-[1.7] text-ink sm:text-[1.2rem]">
                <span aria-hidden="true" className="float-left mr-2 mt-1 font-serif text-[3.2rem] leading-[0.8] text-coral-300">
                  “
                </span>
                {COURSE.preamble}
              </blockquote>
            </figure>

            <div className="card p-6 sm:p-8">
              <h3 className="font-serif text-[1.35rem] text-sage-800">
                Key focus <em className="italic text-coral-600">areas</em>
              </h3>
              <ul className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {COURSE.focusAreas.map((area, i) => {
                  const Icon = FOCUS_ICONS[i % FOCUS_ICONS.length];
                  return (
                    <li key={area} className="flex items-center gap-3 text-[0.95rem] text-ink">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-sage-100 bg-sage-50 text-sage-600">
                        <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      {area}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
