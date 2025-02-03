import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { processLatex } from "@/utils/processLatex"
import Image from "next/image"

const experiments = [
  {
    id: 1,
    title: "Quantum Entanglement Study: $E = \\hbar \\omega$",
    description:
      "Investigating long-distance quantum entanglement effects using the equation $\\rho = \\sum_i p_i |\\psi_i\\rangle\\langle\\psi_i|$",
  },
  {
    id: 2,
    title: "CRISPR Gene Editing: $\\text{DNA} + \\text{Cas9} \\rightarrow \\text{Edited DNA}$",
    description:
      "Exploring novel applications of CRISPR in disease treatment, focusing on the guide RNA sequence $5'-\\text{GTTCG}-3'$",
  },
  {
    id: 3,
    title: "Dark Matter Detection: $F = G \\frac{m_1 m_2}{r^2}$",
    description:
      "Developing new methods for detecting dark matter particles using the modified gravity equation $F = \\frac{G m_1 m_2}{r^2} + \\alpha e^{-r/\\lambda}$",
  },
]

export default async function Experiments() {
  const processedExperiments = await Promise.all(
    experiments.map(async (experiment) => ({
      ...experiment,
      title: await processLatex(experiment.title),
      description: await processLatex(experiment.description),
    })),
  )

  return (
    <section id="experiments" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Ongoing Experiments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedExperiments.map((experiment) => (
            <Card key={experiment.id}>
              <div className="relative h-48 w-full">
                <Image
                  src="/Luna-5258.jpg?height=200&width=400"
                  alt="SciCollab Team"
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>
                  <span dangerouslySetInnerHTML={{ __html: experiment.title }} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  <span dangerouslySetInnerHTML={{ __html: experiment.description }} />
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}