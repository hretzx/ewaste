import { Hero } from "@/components/Hero";
import { StatsSection } from "@/components/StatsSection";
import { CourseSection } from "@/components/CourseSection";
import { PortfolioLibrary } from "@/components/PortfolioLibrary";
import { CategoryIndex } from "@/components/CategoryIndex";
import { ResearchSection } from "@/components/ResearchSection";
import { SectionHeading } from "@/components/SectionHeading";
import { SparkleDivider } from "@/components/decor";
import { getResolvedAssignments } from "@/lib/file-meta";
import { computeStats } from "@/lib/assignments";

export default function HomePage() {
  const items = getResolvedAssignments();
  const stats = computeStats(items);
  const isa = items.filter((a) => a.category === "isa");
  const ese = items.filter((a) => a.category === "ese");
  const extra = items.filter((a) => a.category === "case-study" || a.category === "research");

  return (
    <>
      <Hero />
      <StatsSection stats={stats} />
      <CourseSection />

      <SparkleDivider className="container-page" />

      <section id="portfolio" aria-labelledby="portfolio-title" className="py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            id="portfolio-title"
            eyebrow="Portfolio · Assignment library"
            title="The work,"
            accent="in one place."
            description="Every ISA and ESE activity, case study and research paper for the course. Search, filter by category or status, and open any entry for its documents."
          />
          <div className="mt-10">
            <PortfolioLibrary items={items} />
          </div>
        </div>
      </section>

      <SparkleDivider className="container-page" />
      <CategoryIndex category="isa" items={isa} title="In-semester" accent="activities." />
      <SparkleDivider className="container-page" />
      <CategoryIndex category="ese" items={ese} title="End-semester" accent="activities." reverse />
      <ResearchSection items={extra} />
    </>
  );
}
