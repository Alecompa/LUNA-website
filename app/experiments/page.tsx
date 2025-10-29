import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { getOngoingExperiments, getPastExperiments } from "@/utils/markdown"

export default async function ExperimentsPage() {
  const ongoingExperiments = await getOngoingExperiments()
  const pastExperiments = await getPastExperiments()

  const hasOngoing = ongoingExperiments && ongoingExperiments.length > 0
  const hasPast = pastExperiments && pastExperiments.length > 0

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Experiments</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Exploring the nuclear reactions that power stars through precision measurements deep underground
        </p>
      </div>

      {/* Ongoing Experiments Section */}
      {hasOngoing && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Ongoing Experiments</h2>
              <p className="text-muted-foreground">Current research campaigns at LUNA facilities</p>
            </div>
            <Badge variant="default" className="text-lg px-4 py-2">
              {ongoingExperiments.length} Active
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingExperiments.map((experiment) => (
            <Link href={`/experiments/${experiment.id}`} key={experiment.id}>
              <Card className="overflow-hidden group h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={experiment.coverImage || "/images/experiments/10B_alpha.jpeg"}
                    alt={experiment.id}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="default">Ongoing</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    <span dangerouslySetInnerHTML={{ __html: experiment.title }} />
                  </CardTitle>
                  {experiment.facility && (
                    <CardDescription className="text-sm font-medium">
                      {experiment.facility}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                    {experiment.excerpt}
                  </p>
                  {experiment.pi && (
                    <p className="text-xs text-muted-foreground">
                      <strong>PI:</strong> {experiment.pi}
                    </p>
                  )}
                  <div className="mt-4">
                    <Button variant="ghost" size="sm" className="w-full">
                      View Details →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        </section>
      )}

      {/* Past Experiments Section */}
      {hasPast && (
        <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Past Experiments</h2>
            <p className="text-muted-foreground">Completed campaigns and published results</p>
          </div>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {pastExperiments.length} Completed
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastExperiments.map((experiment) => (
            <Link href={`/experiments/${experiment.id}`} key={experiment.id}>
              <Card className="overflow-hidden group h-full hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image
                    src={experiment.coverImage || "/images/experiments/10B_alpha.jpeg"}
                    alt={experiment.id}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    <span dangerouslySetInnerHTML={{ __html: experiment.title }} />
                  </CardTitle>
                  {experiment.facility && (
                    <CardDescription className="text-sm font-medium">
                      {experiment.facility}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                    {experiment.excerpt}
                  </p>
                  {experiment.pi && (
                    <p className="text-xs text-muted-foreground">
                      <strong>PI:</strong> {experiment.pi}
                    </p>
                  )}
                  <div className="mt-4">
                    <Button variant="ghost" size="sm" className="w-full">
                      View Details →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        </section>
      )}
    </div>
  )
}

