import { COURSE, STUDENT } from "@/data/assignments";
import { SparkleDivider } from "./decor";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-terra-100 bg-canvas">
      <div className="container-page py-10 text-center">
        <SparkleDivider className="mx-auto mb-8 max-w-xs" />
        <p className="text-[0.92rem] font-medium text-ink">
          {STUDENT.name} <span className="text-terra-300">·</span> {STUDENT.rollNo}{" "}
          <span className="text-terra-300">·</span> {STUDENT.className}
        </p>
        <p className="mt-1.5 text-[0.88rem] text-terra-600">
          {COURSE.name} <span className="text-terra-300">|</span> {COURSE.code}
        </p>
        <p className="mt-1.5 text-[0.88rem] text-muted">Faculty: {COURSE.faculty}</p>
      </div>
    </footer>
  );
}
