import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const publications = [
  {
    id: 1,
    title: "Quantum Entanglement at Macroscopic Scales",
    authors: "Smith, J., Doe, J., Brown, E.",
    journal: "Nature Physics",
    year: 2023,
  },
  {
    id: 2,
    title: "CRISPR-Cas9 Efficiency in Treating Genetic Disorders",
    authors: "Doe, J., Brown, E., Smith, J.",
    journal: "Cell",
    year: 2022,
    doi: "10.1016/j.cell.2022.01.001",
  },
  {
    id: 3,
    title: "New Constraints on Dark Matter Properties",
    authors: "Brown, E., Smith, J., Doe, J.",
    journal: "Physical Review Letters",
    year: 2023,
  },
]

export default function Publications() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Publications</h1>
      <div className="space-y-6">
        {publications.map((pub) => (
          <Card key={pub.id}>
            <CardHeader>
              <CardTitle>{pub.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <div>
                  <strong>Authors:</strong> {pub.authors}
                </div>
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

