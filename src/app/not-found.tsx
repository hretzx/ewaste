import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LeafSprig, Sparkle } from "@/components/decor";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="grain relative overflow-hidden">
      <LeafSprig className="absolute -right-6 top-10 h-64 w-48 rotate-12 text-sage-200" />
      <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="eyebrow flex items-center gap-2">
          <Sparkle size={10} className="text-coral-300" /> Error 404
        </p>
        <h1 className="mt-4 font-serif text-[3rem] leading-tight text-sage-800 sm:text-[4rem]">
          This page has been <em className="italic text-coral-600">recycled.</em>
        </h1>
        <p className="mt-4 max-w-lg text-[1.05rem] text-muted">
          The address you followed doesn&apos;t match any page or assignment in this portfolio. It may have been
          renamed, or the link may contain a typo.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to home
          </Link>
          <Link href="/#portfolio" className="btn-secondary">
            Browse all assignments
          </Link>
        </div>
      </div>
    </section>
  );
}
