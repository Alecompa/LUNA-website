import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const experiments = [
  { id: 1, title: "Quantum Entanglement Study", description: "Investigating long-distance quantum entanglement effects" },
  { id: 2, title: "CRISPR Gene Editing", description: "Exploring novel applications of CRISPR in disease treatment" },
  { id: 3, title: "Dark Matter Detection", description: "Developing new methods for detecting dark matter particles" },
]

export default function Experiments() {
  return (
    <section id="experiments" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Ongoing Experiments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((experiment) => (
            <Card key={experiment.id}>
              <CardHeader>
                <CardTitle>{experiment.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{experiment.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

