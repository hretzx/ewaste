import { ArrowUpRight } from "lucide-react";
import { COURSE, STUDENT } from "@/data/assignments";
import { HeroIllustration } from "./HeroIllustration";
import { LeafSprig, Sparkle, SparkleOutline } from "./decor";

export function Hero() {
  const details = [
    { label: "Roll No.", value: STUDENT.rollNo },
    { label: "Class", value: STUDENT.className },
    { label: "Course Code", value: COURSE.code },
    { label: "Faculty", value: COURSE.faculty },
  ];

  return (
    <section id="top" aria-labelledby="hero-title" className="grain relative overflow-hidden">
      {/* Faint botanical line art at the edges */}
      <LeafSprig className="absolute -left-10 top-24 hidden h-64 w-48 -rotate-12 text-sage-300/60 md:block" />
      <LeafSprig className="absolute -right-6 bottom-0 h-40 w-32 rotate-[200deg] text-terra-200/70" />

      <div className="container-page relative grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pb-24 lg:pt-16">
        {/* Left: editorial copy */}
        <div className="relative animate-fade-up">
          <p className="eyebrow flex flex-wrap items-center gap-2">
            <span className="inline-block h-px w-8 bg-terra-300" aria-hidden="true" />
            Student Portfolio · Environmental Studies
          </p>

          <h1 id="hero-title" className="relative mt-6 font-serif leading-[0.98] tracking-[-0.01em]">
            <span className="block text-[3.3rem] text-sage-700 sm:text-[4.6rem] lg:text-[5.4rem]">Small steps.</span>
            <span className="relative mt-1 inline-block text-[3.3rem] italic text-coral-600 sm:text-[4.6rem] lg:text-[5.4rem]">
              Big change.
              {/* Soft coral underline swash in the true brand coral */}
              <svg
                aria-hidden="true"
                viewBox="0 0 300 18"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-1 h-3 w-[96%] text-coral-300"
              >
                <path d="M2 12C70 4 160 2 298 9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <Sparkle size={22} twinkle className="absolute -right-7 -top-2 text-coral-300" />
              <Sparkle size={11} twinkle delay={2} className="absolute -right-12 top-8 text-terra-300" />
            </span>
            <SparkleOutline size={16} className="absolute -left-6 top-2 hidden text-terra-300 sm:block" />
          </h1>

          <p className="mt-8 max-w-xl text-[1.08rem] leading-relaxed text-muted sm:text-[1.15rem]">
            A digital portfolio of coursework, research, class activities, and projects for{" "}
            <span className="font-medium text-terra-600">E-waste and Environment Management</span>.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#portfolio" className="btn-primary group">
              Explore My Work
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        {/* Right: illustration + student details card */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <HeroIllustration className="mx-auto w-[86%] max-w-[420px] lg:ml-auto lg:mr-0 lg:w-[80%]" />

          <aside
            aria-label="Student details"
            className="card relative z-10 -mt-12 bg-paper/95 backdrop-blur-sm ml-auto mr-2 w-[min(100%,20rem)] animate-fade-up p-5 [animation-delay:200ms] sm:-mt-20 lg:-mt-24 lg:ml-0"
          >
            <span aria-hidden="true" className="absolute -right-2 -top-2">
              <Sparkle size={16} twinkle delay={3} className="text-coral-300" />
            </span>
            <p className="eyebrow text-[0.65rem]">Student</p>
            <p className="mt-1 font-serif text-[1.45rem] leading-tight text-sage-800">{STUDENT.name}</p>
            <div className="hairline my-3.5" />
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[0.86rem]">
              {details.map((d) => (
                <div key={d.label} className="contents">
                  <dt className="text-terra-500">{d.label}</dt>
                  <dd className="font-medium text-ink">{d.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
