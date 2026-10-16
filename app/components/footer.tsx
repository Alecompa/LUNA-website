import Link from "next/link";
import { asset } from "@/lib/site";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <img
            src={asset("/logo_v5h_dark.png")}
            alt="LUNA"
            width="130"
            height="52"
          />
          <p>
            Laboratory for Underground
            <br />
            Nuclear Astrophysics
          </p>
          <p className="muted-text">
            INFN · Laboratori Nazionali del Gran Sasso
            <br />
            Assergi, L’Aquila, Italy
          </p>
        </div>
        <div>
          <h2>Research</h2>
          <Link href="/experiments/">Experiments</Link>
          <Link href="/reaction-rates/">Reaction rates</Link>
          <Link href="/publications/">Publications</Link>
          <Link href="/theses/">Theses</Link>
        </div>
        <div>
          <h2>Collaboration</h2>
          <Link href="/about/">About LUNA</Link>
          <Link href="/collaboration/">People & institutions</Link>
          <Link href="/network/">Networks</Link>
          <Link href="/work-with-us/">Work with us</Link>
        </div>
        <div>
          <h2>Explore</h2>
          <Link href="/news/">News</Link>
          <Link href="/blog/">Science stories</Link>
          <Link href="/contact/">Contact</Link>
          <a href="https://www.lngs.infn.it/">Gran Sasso laboratories ↗</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} The LUNA Collaboration</span>
        <span>Exploring the stars from deep underground.</span>
      </div>
    </footer>
  );
}
