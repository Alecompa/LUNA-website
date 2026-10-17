import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/header";
import Footer from "./components/footer";
import HashScroll from "./components/hash-scroll";
import { asset } from "@/lib/site";
export const metadata: Metadata = {
  title: {
    default: "LUNA · Laboratory for Underground Nuclear Astrophysics",
    template: "%s · LUNA",
  },
  description:
    "Nuclear astrophysics at the Gran Sasso National Laboratories. Explore the LUNA experiments, publications and thermonuclear reaction rates.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="stylesheet" href={asset("/vendor/katex/katex.min.css")} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <HashScroll />
      </body>
    </html>
  );
}
