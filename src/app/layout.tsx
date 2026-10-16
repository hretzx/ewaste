import type { Metadata, Viewport } from "next";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/500-italic.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { COURSE, STUDENT } from "@/data/assignments";

export const metadata: Metadata = {
  title: {
    default: `${STUDENT.name} — ${COURSE.name} Portfolio`,
    template: `%s · EWEM Portfolio`,
  },
  description: `Coursework, research, class activities and projects by ${STUDENT.formalName} (${STUDENT.rollNo}, ${STUDENT.className}) for ${COURSE.name} (${COURSE.code}).`,
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#FCF6EC",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
