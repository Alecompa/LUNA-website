import { asset, legacy } from "@/lib/site";
import LegacyContent from "./legacy-content";

const networks = [
  {
    name: "GIANTS",
    scope: "Italy",
    image: "Giants_large.png",
    summary:
      "Connecting Italian nuclear astrophysics groups to share results and coordinate research.",
    href: "https://pandora.infn.it/public/giantsnews",
    link: "Explore the newsletter",
  },
  {
    name: "ChETEC",
    scope: "Europe",
    image: "chetec.png",
    summary:
      "Bringing astronomy, astrophysics, and nuclear physics together around shared scientific questions.",
    href: "http://www.chetec.eu/",
    link: "Visit ChETEC",
  },
  {
    name: "IReNA",
    scope: "International",
    image: "IReNA.png",
    summary:
      "Connecting research networks to investigate the origin of chemical elements in the Universe.",
    href: "https://www.irenaweb.org/",
    link: "Visit IReNA",
  },
];

export default function NetworkCards() {
  // Retain each complete source description behind the concise card summary.
  const descriptions = legacy.pages.network.html.match(/<p>[\s\S]*?<\/p>/g) || [];
  return (
    <section className="network-grid" aria-label="LUNA scientific networks">
      {networks.map((network, index) => (
        <article className="network-card" key={network.name}>
          <div className="network-logo">
            <img
              className={network.name === "IReNA" ? "network-logo-square" : undefined}
              src={asset(`/legacy/images/Network/${network.image}`)}
              alt={`${network.name} logo`}
            />
          </div>
          <div className="network-card-body">
            <span className="network-scope">{network.scope}</span>
            <h2>{network.name}</h2>
            <p className="network-summary">{network.summary}</p>
            <details className="network-details">
              <summary>Network details</summary>
              <LegacyContent html={descriptions[index] || ""} />
            </details>
            <a className="network-link" href={network.href}>
              {network.link} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}
