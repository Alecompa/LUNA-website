import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const newsItems = [
  {
    id: 1,
    title: "Breakthrough in Quantum Computing",
    excerpt: "Our team has achieved a major milestone in quantum computing, paving the way for more stable qubits.",
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "New Collaboration with CERN",
    excerpt: "SciCollab is excited to announce a new partnership with CERN to advance particle physics research.",
    date: "2023-04-22",
  },
  {
    id: 3,
    title: "SciCollab Receives Major Grant",
    excerpt: "We've been awarded a $10 million grant to further our research in clean energy technologies.",
    date: "2023-03-10",
  },
]

export default function NewsPreview() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest News & Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <div>{item.excerpt}</div>
                  <div className="mt-2 text-gray-500">Published on: {item.date}</div>
                </div>
                <Link href={`/news/${item.id}`} className="text-primary hover:underline mt-2 inline-block">
                  Read more
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/news" className="text-primary hover:underline">
            View all news
          </Link>
        </div>
      </div>
    </section>
  )
}

