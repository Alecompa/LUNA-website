import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { processLatex } from "@/utils/processLatex"
import { notFound } from "next/navigation"

// Reference the experiments data from experiments.tsx
const experiments = [
  {
    id: 1,
    title: "$^{14}$N(p,$\\gamma$)$^{15}$O at Bellotti IBF",
    description:
      "Esploring the solar physics at the 3.5 MV accelerator of LNGS Bellotti Ion Beam Facility",
    fullContent: "Esploring the solar physics at the 3.5 MV accelerator of LNGS Bellotti Ion Beam Facility",
    image: "/images/experiments/14N_pg_MV.jpeg",
  },
  {
    id: 2,
    title: "SHADES at the Bellotti IBF",
    description:
      "Measuring the s-process neutron source reaction $^{22}\\textup{Ne}$($\\alpha$,n)$^{25}$Mg. Founded by ERC Starting Grant.",
    fullContent: "Measuring the s-process neutron source reaction $^{22}\\textup{Ne}$($\\alpha$,n)$^{25}$Mg. Founded by ERC Starting Grant.",
    image: "/images/experiments/shades.png",
  },
  {
    id: 3,
    title: "$^{12}$C+$^{12}$C at the Bellotti IBF",
    description:
      "Exploring the Carbon fusion thorugh $\\gamma$-ray detection.",
    fullContent: "Exploring the Carbon fusion thorugh $\\gamma$-ray detection.",
    image: "/images/experiments/12C_12C.jpg",
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
  const resolvedParams = await params
  const id = resolvedParams.id
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
            src={experiment.image}
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