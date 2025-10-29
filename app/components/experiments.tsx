import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getOngoingExperiments } from "@/utils/markdown"

export default async function Experiments() {
  const ongoingExperiments = await getOngoingExperiments()

  if (!ongoingExperiments || ongoingExperiments.length === 0) {
    return null
  }

  return (
    <section id="experiments" className="py-16 muted-foreground">
      <div className="container mx-auto px-4 md:px-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Ongoing Experiments</h2>
            <p className="text-muted-foreground mt-2">Current research at LUNA facilities</p>
          </div>
          <Link href="/experiments">
            <Button variant="outline">View All Experiments</Button>
          </Link>
        </div>
        
        <Carousel>
          <CarouselContent>
            {ongoingExperiments.map((experiment) => (
              <CarouselItem key={experiment.id} className="md:basis-1/2 lg:basis-1/3">
                <Link href={`/experiments/${experiment.id}`}>
                  <Card className="overflow-hidden group h-full">
                    <div className="relative h-48 w-full">
                      <Image
                        src={experiment.coverImage || "/images/experiments/10B_alpha.jpeg"}
                        alt={experiment.id}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>
                        <span dangerouslySetInnerHTML={{ __html: experiment.title }} />
                      </CardTitle>
                      {experiment.facility && (
                        <CardDescription className="text-sm">
                          {experiment.facility}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3">
                        {experiment.excerpt}
                      </CardDescription>
                      {experiment.pi && (
                        <p className="text-xs text-muted-foreground mt-3">
                          <strong>PI:</strong> {experiment.pi}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}
