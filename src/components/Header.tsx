"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Leaf, Menu, X } from "lucide-react";

const NAV = [
  { label: "Home", id: "top" },
  { label: "Portfolio", id: "portfolio" },
  { label: "ISA Activities", id: "isa" },
  { label: "ESE Activities", id: "ese" },
  { label: "Research", id: "research" },
  { label: "Course", id: "course" },
] as const;

type SectionId = (typeof NAV)[number]["id"];

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId>("top");
  const [scrolled, setScrolled] = useState(false);

  // Active section tracking (home page only).
  useEffect(() => {
    if (!onHome) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const offset = 160;
      // Sections may appear in any DOM order: pick the one whose top edge
      // most recently passed the header line.
      let current: SectionId = "top";
      let best = -Infinity;
      let lastInDom: { id: SectionId; top: number } | null = null;
      for (const item of NAV) {
        const el = document.getElementById(item.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (!lastInDom || top > lastInDom.top) lastInDom = { id: item.id, top };
        if (top - offset <= 0 && top > best) {
          best = top;
          current = item.id;
        }
      }
      // At the very bottom, the last section wins even if it is short.
      if (lastInDom && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = lastInDom.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  useEffect(() => {
    if (onHome) return;
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  // Close the mobile menu on Escape and on route change.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const href = (id: SectionId) => (onHome ? `#${id}` : `/#${id}`);

  const linkClass = (id: SectionId) => {
    const isActive = onHome && active === id;
    return `relative rounded-full px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? "text-sage-800" : "text-muted hover:text-terra-600"
    }`;
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-terra-100 bg-canvas/90 shadow-[0_1px_0_rgba(148,80,52,0.04)] backdrop-blur-md"
          : "border-transparent bg-canvas/60 backdrop-blur-sm"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-sage-700 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href={onHome ? "#top" : "/"} className="group flex items-center gap-2.5" aria-label="EWEM Portfolio — home">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-sage-200 bg-sage-50 text-sage-600 transition-colors group-hover:bg-sage-100">
            <Leaf className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className="font-sans text-[0.8rem] font-semibold tracking-[0.2em] text-ink">
            EWEM <span className="font-normal text-terra-300">/</span>{" "}
            <span className="text-terra-500">PORTFOLIO</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={href(item.id)}
                className={linkClass(item.id)}
                aria-current={onHome && active === item.id ? "location" : undefined}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-px h-px origin-left bg-sage-500 transition-transform duration-300 ${
                    onHome && active === item.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-terra-100 bg-paper text-terra-600 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-terra-100 bg-canvas/95 backdrop-blur-md lg:hidden"
      >
        <ul className="container-page grid gap-1 py-3">
          {NAV.map((item) => (
            <li key={item.id}>
              <a
                href={href(item.id)}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-xl px-3 py-3 text-[0.95rem] font-medium transition-colors ${
                  onHome && active === item.id ? "bg-sage-50 text-sage-800" : "text-ink hover:bg-cream-100"
                }`}
                aria-current={onHome && active === item.id ? "location" : undefined}
              >
                {item.label}
                {onHome && active === item.id && (
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-coral-300" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
