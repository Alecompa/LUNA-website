import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { processLatex } from "@/utils/processLatex"
import { notFound } from "next/navigation"

// Reference the experiments data from experiments.tsx
const experiments = [
  {
    id: 1,
    title: "Quantum Entanglement Study: $E = \\hbar \\omega$",
    description:
      "Investigating long-distance quantum entanglement effects using the equation $\\rho = \\sum_i p_i |\\psi_i\\rangle\\langle\\psi_i|$",
    fullContent: `
      # Quantum Entanglement Study

      Our research focuses on understanding quantum entanglement at macroscopic scales. The fundamental equation governing our study is:

      $E = \\hbar \\omega$

      ## Research Goals

      We aim to investigate how quantum entanglement manifests in systems of increasing size and complexity. The density matrix formalism:

      $\\rho = \\sum_i p_i |\\psi_i\\rangle\\langle\\psi_i|$

      helps us track the quantum state of our system throughout the experiments.
    `,
  },
  {
    id: 2,
    title: "CRISPR Gene Editing: $\\text{DNA} + \\text{Cas9} \\rightarrow \\text{Edited DNA}$",
    description:
      "Exploring novel applications of CRISPR in disease treatment, focusing on the guide RNA sequence $5'-\\text{GTTCG}-3'$",
    fullContent: "# CRISPR Gene Editing Researc \n prova",
  },
  {
    id: 3,
    title: "Dark Matter Detection: $F = G \\frac{m_1 m_2}{r^2}$",
    description:
      "Developing new methods for detecting dark matter particles using the modified gravity equation $F = \\frac{G m_1 m_2}{r^2} + \\alpha e^{-r/\\lambda}$",
    fullContent: "# Dark Matter Detection Research",
  },
]

export async function generateStaticParams() {
  return experiments.map((exp) => ({
    id: exp.id.toString(),
  }))
}

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Await params.id before using it
  const id = await params.id
  const experiment = experiments.find((exp) => exp.id === parseInt(id))

  if (!experiment) {
    notFound()
  }

  const processedTitle = await processLatex(experiment.title)
  const processedContent = await processLatex(experiment.fullContent)

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src="/Luna-5258.jpg"
            alt={experiment.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              <span dangerouslySetInnerHTML={{ __html: processedTitle }} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div dangerouslySetInnerHTML={{ __html: processedContent }} />
          </CardContent>
        </Card>
      </article>
    </div>
  )
} 