import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { processLatex } from "@/utils/processLatex"
import Image from "next/image"
import Link from "next/link"

const experiments = [
  {
    id: 1,
    title: "$^{14}$N(p,$\\gamma$)$^{15}$O at Bellotti IBF",
    description:
      "Esploring the solar physics at the 3.5 MV accelerator of LNGS Bellotti Ion Beam Facility",
    image: "/images/experiments/14N_pg_MV.jpeg",
  },
  {
    id: 2,
    title: "SHADES at the Bellotti IBF",
    description:
      "Measuring the s-process neutron source reaction $^{22}\\textup{Ne}$($\\alpha$,n)$^{25}$Mg in the framework of the SHADES project. Founded by ERC Starting Grant",
    image: "/images/experiments/shades.png",
  },
  {
    id: 3,
    title: "$^{12}$C+$^{12}$C at the Bellotti IBF",
    description:
      "Exploring the Carbon fusion thorugh $\\gamma$-ray detection.",
    image: "/images/experiments/12C_12C.jpg",
  },
  {
    id: 4,
    title: "NUCLEAR at the LUNA400",
    description:
      "NUclear CLustering Effects in Astrophysical Reaction",
    image: "/images/experiments/12C_12C.jpg",
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
    <section id="experiments" className="py-16 muted-foreground">
      <div className="container mx-auto px-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Ongoing Experiments</h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> */}
        <Carousel>
          <CarouselContent>
            {processedExperiments.map((experiment) => (
              <CarouselItem key={experiment.id} className="md:basis-1/2 lg:basis-1/3">
                <Link href={`/experiments/${experiment.id}`} key={experiment.id}>
                  <Card className="overflow-hidden group">
                    <div className="relative h-48 w-full">
                      <Image
                        src={experiment.image}
                        alt="LUNA experiment"
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
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* </div> */}
      </div>
    </section>
  )
}