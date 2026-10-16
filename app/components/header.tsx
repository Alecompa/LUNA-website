"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { asset } from "@/lib/paths";
const links = [
  ["About", "/about/"],
  ["Experiments", "/experiments/"],
  ["Facilities", "/facilities/"],
  ["Publications", "/publications/"],
  ["Data", "/reaction-rates/"],
  ["Collaboration", "/collaboration/"],
  ["News", "/news/"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const current = (href: string) =>
    path.startsWith(href.replace(/\/$/, "")) ? "page" : undefined;
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="LUNA home" onClick={() => setOpen(false)}>
          <img src={asset("/logo_v5h.png")} alt="LUNA" width="88" height="35" />
        </Link>
        <button
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav id="main-nav" aria-label="Main" className={open ? "nav is-open" : "nav"}>
          {links.map(([name, href]) => (
            <Link key={href} href={href} aria-current={current(href)} onClick={() => setOpen(false)}>
              {name}
            </Link>
          ))}
          <Link className="nav-cta" href="/contact/" aria-current={current("/contact/")} onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
