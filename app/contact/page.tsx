import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHead } from "../components/ui";
export const metadata = { title: "Contact" };
export default function Contact() {
  return (
    <>
      <PageHead crumbs={[["Contact"]]} title="Contact" />
      <div className="shell contact-grid" style={{ paddingBottom: 112 }}>
        <section className="contact-card">
          <span className="label">Spokesperson</span>
          <h2>Alba Formicola</h2>
          <p>INFN Roma</p>
          <a className="link" href="mailto:alba.formicola@roma1.infn.it">alba.formicola@roma1.infn.it</a>
        </section>
        <section className="contact-card">
          <span className="label">Study and research</span>
          <h2>Theses and fellowships</h2>
          <p>Projects for bachelor, master and PhD students, and postdoctoral positions.</p>
          <Link className="link" href="/work-with-us/">Work with us <ArrowUpRight size={15} /></Link>
        </section>
        <section className="contact-card">
          <span className="label">Laboratory</span>
          <h2>Laboratori Nazionali del Gran Sasso</h2>
          <p>INFN · Assergi (L’Aquila), Italy</p>
          <a className="link" href="https://www.lngs.infn.it/">lngs.infn.it <ArrowUpRight size={15} /></a>
        </section>
        <section className="contact-card">
          <span className="label">Papers</span>
          <h2>Can’t access a paper?</h2>
          <p>Write to us and we will send you a copy.</p>
          <Link className="link" href="/publications/">Publications <ArrowUpRight size={15} /></Link>
        </section>
      </div>
    </>
  );
}
