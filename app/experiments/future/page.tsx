import Link from "next/link";
import PageHeading from "@/app/components/page-heading";
import LegacyContent from "@/app/components/legacy-content";
import { legacy } from "@/lib/site";
export const metadata = { title: "Future programme & facility history" };
export default function Future() {
  return (
    <>
      <PageHeading title="Looking ahead" eyebrow="THE EXPERIMENTAL PROGRAMME" />
      <div className="shell content-layout">
        <aside className="side-nav">
          <Link href="/experiments/">Experiments</Link>
          <a href="#programme">Research programme</a>
          <a href="#facility-plan">LUNA-MV facility plan</a>
          <Link href="/work-with-us/">Research opportunities</Link>
        </aside>
        <article>
          <div className="prose" id="programme">
            <h2>Building on the Bellotti facility</h2>
            <p>
              The Bellotti Ion Beam Facility extends the LUNA programme to
              helium burning, neutron sources and carbon fusion. The supplied
              programme includes ¹⁴N(p,γ)¹⁵O, ¹³C(α,n)¹⁶O, ²²Ne(α,n)²⁵Mg and ¹²C
              + ¹²C.
            </p>
            <p>
              Current campaigns are listed under{" "}
              <Link href="/experiments/">Experiments</Link>. Proposed
              measurements and development projects, including the ²⁷Al
              proton-capture programme, are described under{" "}
              <Link href="/work-with-us/">Work with us</Link>. The{" "}
              <Link href="/news/181-lunanova-news/">
                LUNANOVA ERC Synergy project
              </Link>{" "}
              brings a further focus on the nuclear reactions that govern the
              Sun.
            </p>
          </div>
          <div className="notice mt-8" id="facility-plan">
            <strong>Historical facility plan</strong>
            <br />
            The text below preserves the original LUNA-MV proposal, including
            its 2021–2022 construction forecasts. The facility was inaugurated
            in October 2023; those forecasts are not a current schedule.
          </div>
          <LegacyContent html={legacy.pages.future.html} />
        </article>
      </div>
    </>
  );
}
