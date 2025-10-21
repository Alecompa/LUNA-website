"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { JSX, useState } from "react"

function formatReactionTitle(title: string): JSX.Element {
  // Regex: cerca ^numeri e sostituisce con <sup>
  const parts = title.split(/(\^\d+)/g).map((part, i) => {
    if (/^\^\d+$/.test(part)) {
      return <sup key={i}>{part.slice(1)}</sup>
    }

    // Sostituisci \gamma o (gamma) con γ (Unicode)
    const replaced = part
      .replace(/\\gamma|gamma/g, "γ")
      .replace(/\\alpha|alpha/g, "α")
      .replace(/\\beta|beta/g, "β")

    return <span key={i}>{replaced}</span>
  })

  return <>{parts}</>
}

const publications = [
  {
    id: 1,
    title: "Improved direct measurement of low-energy resonances in ^21Ne(p,\\gamma)^22Na reaction",
    authors: "Sidhu, R. S., Casaburo, F., Masha, E., Aliotta, M., Ananna, C., Barbieri, L., Barile, F., Baron, C., Bemmerer, D., Best, A., Biasissi, R., Boeltzig, A., Bonnell, R., Broggini, C., Bruno, C. G., Caciolli, A., Campostrini, M., Cavanna, F., Chillery, T., Ciani, G. F., Colombetti, P., Compagnucci, A., Corvisiero, P., Csedreki, L., Davinson, T., Depalo, R., Di Leva, A., D’Ottavi, A., Elekes, Z., Ferraro, F., Formicola, A., Fülöp, Zs., Gervino, G., Gesuè, R., Gosta, G., Guglielmetti, A., Gustavino, C., Gyürky, Gy., Imbriani, G., Jones, J., José, J., Junker, M., Lugaro, M., Marigo, P., Marsh, J., Menegazzo, R., Mercogliano, D., Piatti, D., Prati, P., Rapagnani, D., Rigato, V., Robb, D., Rossi, M., Sariyal, R., Skowronski, J., Straniero, O., Szücs, T., Turkat, S., Vagnoni, M., Zavatarelli, S., (LUNA Collaboration)",
    journal: "Physical Review C",
    year: 2025,
  },
  {
    id: 2,
    title: "Towards a comprehensive study of the ^14N(p,\\gamma)^15O astrophysical key reaction: Description of the experimental technique including novel target preparation",
    authors: "Compagnucci, A., Formicola, A., Campostrini, M., Cruz, J., Aliotta, M., Ananna, C., Barbieri, L., Barile, F., Bemmerer, D., Best, A., Boeltzig, A., Broggini, C., Bruno, C. G., Caciolli, A., Casaburo, F., Cavanna, F., Ciani, G. F., Colombetti, P., Corvisiero, P., Csedreki, L., Davinson, T., Depalo, R., Di Leva, A., Elekes, Z., Ferraro, F., Fülöp, Zs., Guglielmetti, A., Gustavino, C., Gyürky, Gy., Imbriani, G., Junker, M., Lugaro, M., Marigo, P., Marsh, J., Masha, E., Menegazzo, R., Paticchio, V., Piatti, D., Prati, P., Rapagnani, D., Rigato, V., Robb, D., Schiavulli, L., Sidhu, R. S., Skowronski, J., Straniero, O., Szücs, T., Turkat, S., Zavatarelli, S.",
    journal: "European Physical Journal A",
    year: 2025,
    doi: "10.1140/epja/s10050-025-01658-7"
  },
  {
    id: 3, 
    title: "Detector characterization for a new ^12C+^12C reaction study at LUNA",
    authors: "Gesuè, R. M., Turkat, S., Skowronski, J., Aliotta, M., Barbieri, L., Barile, F., Bemmerer, D., Best, A., Boeltzig, A., Broggini, C., Bruno, C. G., Caciolli, A., Campostrini, M., Casaburo, F., Cavanna, F., Chillery, T., Ciani, G. F., Colombetti, P., Compagnucci, A., Corvisiero, P., Csedreki, L., Davinson, T., Dell'Aquila, D., Depalo, R., Di Leva, A., Elekes, Z., Ferraro, F., Formicola, A., Fulop, Zs., Gervino, G., Guglielmetti, A., Gustavino, C., Gyurky, G., Imbriani, G., Junker, M., Lugaro, M., Marigo, P., Marsh, J., Masha, E., Menegazzo, R., Mercogliano, D., Paticchio, V., Piatti, D., Prati, P., Rapagnani, D., Rigato, V., Robb, D., Russell, L., Sidhu, R. S., Spadavecchia, B., Straniero, O., Szücs, T., Zavatarelli, S.",
    journal: "Journal of Physics G: Nuclear and Particle Physics",
    year: 2025, 
    doi: "10.1088/1361-6471/ade0dc"
  },
  {
    id: 4,
    title: "A high energy resolution gas target setup to study selected NeNa cycle reactions",
    authors: "Masha, E., Casaburo, F., Sidhu, R. S., Aliotta, M., Ananna, C., Barbieri, L., Barile, F., Bemmerer, D., Best, A., Boeltzig, A., Broggini, C., Bruno, C. G., Caciolli, A., Campostrini, M., Cavanna, F., Ciani, G. F., Colombetti, P., Compagnucci, A., Corvisiero, P., Csedreki, L., Davinson, T., Depalo, R., Dell’Aquila, D., Di Leva, A., Elekes, Z., Ferraro, F., Formicola, A., Fülöp, Zs., Gervino, G., Gesuè, R. M., Guglielmetti, A., Gustavino, C., Gyürky, Gy., Imbriani, G., Junker, M., Lugaro, M., Marigo, P., Marsh, J., Menegazzo, R., Mercogliano, D., Paticchio, V., Piatti, D., Prati, P., Rapagnani, D., Rigato, V., Robb, D., Schiavulli, L., Skowronski, J., Straniero, O., Szücs, T., Zavatarelli, S.",
    journal: "The European Physical Journal A",
    year: 2025, 
    doi: "10.1140/epja/s10050-025-01512-w"
  },
  {
    id: 5,
    title: "Revision of the CNO cycle: Rate of ^17O destruction in stars",
    authors: "Rapagnani, D., Straniero, O., Imbriani, G., Aliotta, M., Ananna, C., Barile, F., Barbieri, L., Bemmerer, D., Best, A., Boeltzig, A., Broggini, C., Bruno, C. G., Caciolli, A., Campostrini, M., Casaburo, F., Cavanna, F., Ciani, G. F., Colombetti, P., Compagnucci, A., Corvisiero, P., Csedreki, L., Davinson, T., Depalo, R., Di Leva, A., Elekes, Z., Ferraro, F., Formicola, A., Fülöp, Zs., Gervino, G., Gesuè, R. M., Gyürky, Gy., Guglielmetti, A., Gustavino, C., Junker, M., Lugaro, M., Marigo, P., Marsh, J., Masha, E., Menegazzo, R., Mercogliano, D., Paticchio, V., Piatti, D., Prati, P., Rigato, V., Robb, D., Sidhu, R. S., Skowronski, J., Szücs, T., Zavatarelli, S. (LUNA Collaboration)",
    journal: "Physical Review C",
    year: 2025, 
    doi: "10.1103/PhysRevC.111.025805"
  },
  {
    id: 6, 
    title: "Comparative analysis of R-matrix fitting: ^12C(p,\\gamma)^13N as a test case",
    authors: "Skowronski, J., Piatti, D., Rapagnani, D., Aliotta, M., Ananna, C., Barbieri, L., Barile, F., Bemmerer, D., Best, A., Boeltzig, A., Broggini, C., Bruno, C. G., Caciolli, A., Campostrini, M., Casaburo, F., Cavanna, F., Ciani, G. F., Colombetti, P., Compagnucci, A., Corvisiero, P., Csedreki, L., Davinson, T., Depalo, R., Di Leva, A., Elekes, Z., Ferraro, F., Formicola, A., Fülöp, Zs., Gervino, G., Gesuè, R. M., Guglielmetti, A., Gustavino, C., Gyürky, Gy., Imbriani, G., Junker, M., Lugaro, M., Marigo, P., Marsh, J., Masha, E., Menegazzo, R., Mercogliano, D., Paticchio, V., Perrino, R., Prati, P., Rigato, V., Robb, D., Schiavulli, L., Sidhu, R. S., Straniero, O., Szücs, T., Turkat, S., Zavatarelli, S. (LUNA Collaboration)",
    journal: "Physical Review C",
    year: 2025,
    doi: "10.1103/PhysRevC.111.035802"
  }
]

function AuthorsList({ authors }: { authors: string }) {
  const [showAll, setShowAll] = useState(false)
  
  // Dividi gli autori per virgola
  const authorArray = authors.split(", ")
  
  // Mostra solo i primi 3 autori se non è espanso
  const displayedAuthors = showAll ? authorArray : authorArray.slice(0, 2)
  const hasMore = authorArray.length > 2
  
  return (
    <div>
      <strong>Authors:</strong>{" "}
      {displayedAuthors.join(", ")}
      {!showAll && hasMore && "..."}
      {hasMore && (
        <Button
          variant="link"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="ml-2 p-0 h-auto text-blue-600"
        >
          {showAll ? "Show less" : "Show more"}
        </Button>
      )}
    </div>
  )
}

export default function Publications() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-8">Publications</h1>
    <p className="text-sm text-gray-500 mb-6">Last update: {lastUpdated}</p>
    
    <div className="text-base text-gray-700 mb-6 space-y-4">
    <p>
    Test The <strong>LUNA Collaboration</strong> has published over <strong>90 papers</strong> in refereed journals.
    If you are interested in a specific paper that you cannot download, please get in touch with us and we will send you a copy.
    </p>

    <p>
    Reviews on the LUNA activities have been published in:
    </p>

    <ul className="list-disc list-inside ml-4 space-y-1">
    <li>
    <a
      href="https://doi.org/10.1146/annurev-nucl-110221-103625"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Annual Review of Nuclear and Particle Sciences 72 (2022) 177
    </a>
    </li>
    <li>
    <a
      href="https://doi.org/10.1016/j.ppnp.2017.09.002"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Progress in Particle and Nuclear Physics 98 (2018) 55
    </a>
    </li>
    <li>
    <a
      href="https://doi.org/10.1142/S0217751X18430108"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      International Journal of Modern Physics A 33 (2018) 1843010-346
    </a>
    </li>
    <li>
    <a
      href="https://doi.org/10.1146/annurev.nucl.012809.104505"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Annual Review of Nuclear and Particle Science 60 (2010) 53
    </a>
    </li>
    <li>
    <a
      href="https://doi.org/10.1088/0034-4885/72/8/086301"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Reports on Progress in Physics 72 (2009) 086301
    </a>
    </li>
    </ul>

    <p>
    More recently, <em>European Physical Journal A</em> has dedicated a topical issue to Underground Nuclear Astrophysics:&nbsp;
    <a
    href="https://epja.epj.org/component/toc/?task=topic&id=581"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:underline"
    >
    Solar Neutrinos – European Physical Journal A – Topical Issue 52 (2016) 88
    </a>.
    </p>

    <p>
    In 2020 the LUNA Collaboration published a paper in <em>Nature</em> and some interviews and related papers are available at:
    </p>
    </div>
    <ul className="list-disc list-inside ml-4 space-y-1">
    <li>
    <a
      href="https://www.quantamagazine.org/physicists-pin-down-nuclear-reaction-from-moments-after-the-big-bang-20201111/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Quanta magazine interview by Thomas Lewton 
    </a>
    </li>
    <li>
    <a
      href="https://www.nature.com/articles/d41586-020-03117-3"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Nature News and Views by Prof. Brian Fields
    </a>
    </li>
    <li>
    <a
      href="https://www.nature.com/articles/d43978-020-00024-z"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Nature Italy: research highlight by Michele Catanzaro (english version) 
    </a>
    </li>
    <li>
    <a
      href="https://www.nature.com/articles/d43978-020-00025-y"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Nature Italy: research highlight by Michele Catanzaro (italian version) 
    </a>
    </li>
    <li>
    <a
      href="https://www.nature.com/articles/s42254-020-00260-8"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Nature reviews physics by Zoe Budrikis
    </a>
    </li>
    <li>
    <a
      href="https://www.vice.com/en/article/scientists-recreated-nuclear-fusion-from-the-big-bang-under-a-mountain-in-italy/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      Vice magazine interview by Becky Ferreira
    </a>
    </li>

    </ul>

    <br/>
    <p> In the following the list of all LUNA Collaboration published papers</p>
    <br/>

      <div className="space-y-6">
        {publications.map((pub) => (
          <Card key={pub.id}>
            <CardHeader>
              <CardTitle>{formatReactionTitle(pub.title)}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <AuthorsList authors={pub.authors} />
                <div>
                  <strong>Journal:</strong> {pub.journal}
                </div>
                <div>
                  <strong>Year:</strong> {pub.year}
                </div>
                {pub.doi && (<div>
                  <strong>DOI:</strong>{" "}
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pub.doi}
                  </a>
                </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

