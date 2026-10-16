import Link from "next/link";
import PageHeading from "../components/page-heading";
export const metadata = { title: "Contact" };
export default function Contact() {
  return (
    <>
      <PageHeading title="Contact LUNA" eyebrow="COLLABORATION" />
      <div className="shell contact-grid">
        <section className="contact-block">
          <p className="eyebrow">SCIENTIFIC ENQUIRIES</p>
          <h2>Alba Formicola</h2>
          <p>
            LUNA spokesperson
            <br />
            INFN Roma, Italy
          </p>
          <a href="mailto:alba.formicola@roma1.infn.it">
            alba.formicola@roma1.infn.it ↗
          </a>
        </section>
        <section className="contact-block">
          <p className="eyebrow">RESEARCH & STUDY</p>
          <h2>Join the programme</h2>
          <p>
            Explore thesis projects, doctoral programmes and postdoctoral
            fellowships, with the relevant scientific contacts.
          </p>
          <Link href="/work-with-us/">Research opportunities →</Link>
        </section>
        <section className="contact-block">
          <p className="eyebrow">THE LABORATORY</p>
          <h2>Gran Sasso National Laboratories</h2>
          <p>
            INFN · Laboratori Nazionali del Gran Sasso
            <br />
            Assergi, L’Aquila, Italy
          </p>
          <a href="https://www.lngs.infn.it/">Visit the LNGS website ↗</a>
        </section>
        <section className="contact-block">
          <p className="eyebrow">INSTITUTIONS</p>
          <h2>An international collaboration</h2>
          <p>
            Find the participating universities, laboratories and research
            groups.
          </p>
          <Link href="/collaboration/">People & institutions →</Link>
        </section>
      </div>
    </>
  );
}
