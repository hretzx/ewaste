import type { ReactNode } from "react";
import { Sparkle } from "./decor";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  id,
  align = "left",
  aside,
}: {
  eyebrow: string;
  /** Plain part of the title (forest green serif). */
  title: string;
  /** Emphasised part (coral italic serif). */
  accent?: string;
  description?: ReactNode;
  id?: string;
  align?: "left" | "center";
  aside?: ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-5 ${
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      }`}
    >
      <div className={align === "center" ? "max-w-2xl" : "max-w-2xl"}>
        <p className="eyebrow flex items-center gap-2">
          <Sparkle size={10} className="text-coral-300" />
          {eyebrow}
        </p>
        <h2 id={id} className="mt-3 font-serif text-[2.1rem] leading-[1.1] text-sage-800 sm:text-[2.6rem]">
          {title}
          {accent && (
            <>
              {" "}
              <em className="font-serif italic text-coral-600">{accent}</em>
            </>
          )}
        </h2>
        {description && <p className="mt-3 text-[1rem] leading-relaxed text-muted">{description}</p>}
      </div>
      {aside}
    </div>
  );
}
