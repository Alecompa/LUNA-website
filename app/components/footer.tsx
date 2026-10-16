import Link from "next/link";
import { asset } from "@/lib/site";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <img src={asset("/logo_v5h_dark.png")} alt="LUNA" width="110" height="44" />
          <p>
            Laboratory for Underground Nuclear Astrophysics
            <br />
            INFN Laboratori Nazionali del Gran Sasso
            <br />
            Assergi (L’Aquila), Italy
          </p>
        </div>
        <div>
          <h2>Research</h2>
          <Link href="/experiments/">Experiments</Link>
          <Link href="/facilities/">Facilities</Link>
          <Link href="/reaction-rates/">Reaction rates</Link>
          <Link href="/publications/">Publications</Link>
          <Link href="/theses/">Theses</Link>
        </div>
        <div>
          <h2>Collaboration</h2>
          <Link href="/about/">About LUNA</Link>
          <Link href="/collaboration/">People & institutions</Link>
          <Link href="/work-with-us/">Work with us</Link>
          <Link href="/news/">News</Link>
        </div>
        <div>
          <h2>Contact</h2>
          <Link href="/contact/">Get in touch</Link>
          <a href="https://www.lngs.infn.it/">LNGS ↗</a>
          <a href="https://www.infn.it/">INFN ↗</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} The LUNA Collaboration</span>
        <span>1.4 km under the Gran Sasso</span>
      </div>
    </footer>
  );
}
