"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/paths";
const links = [
  ["About", "/about/"],
  ["Experiments", "/experiments/"],
  ["Reaction rates", "/reaction-rates/"],
  ["Publications", "/publications/"],
  ["News", "/news/"],
];
export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link
          href="/"
          className="brand"
          aria-label="LUNA home"
          onClick={() => setOpen(false)}
        >
          <img
            src={asset("/logo_v5h.png")}
            alt="LUNA"
            width="108"
            height="43"
          />
          <span>
            Laboratory for Underground
            <br />
            Nuclear Astrophysics
          </span>
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
        <nav
          id="main-nav"
          aria-label="Main navigation"
          className={open ? "nav-links is-open" : "nav-links"}
        >
          {links.map(([name, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                path.startsWith(href.replace(/\/$/, "")) ? "page" : undefined
              }
              onClick={() => setOpen(false)}
            >
              {name}
            </Link>
          ))}
          <Link
            className="nav-contact"
            href="/contact/"
            onClick={() => setOpen(false)}
          >
            Contact <ArrowUpRight size={14} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
