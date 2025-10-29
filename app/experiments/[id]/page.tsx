import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getExperimentData, getAllExperimentIds } from "@/utils/markdown"

export async function generateStaticParams() {
  const experimentIds = getAllExperimentIds()
  return experimentIds.map((id) => ({
    id: id,
  }))
}

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const id = resolvedParams.id

  try {
    const experiment = await getExperimentData(id)

    return (
      <div className="container mx-auto px-4 py-8">
        <article className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
          {/* Hero Image */}
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={experiment.coverImage || "/images/experiments/10B_alpha.jpeg"}
              alt={id}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 right-4">
              <Badge variant={experiment.status === "ongoing" ? "default" : "secondary"} className="text-lg px-4 py-2">
                {experiment.status === "ongoing" ? "Ongoing" : "Completed"}
              </Badge>
            </div>
          </div>

          {/* Title and Metadata Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl">
                <span dangerouslySetInnerHTML={{ __html: experiment.title }} />
              </CardTitle>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-4">
                {experiment.pi && (
                  <div>
                    <strong>Principal Investigator:</strong> {experiment.pi}
                  </div>
                )}
                {experiment.facility && (
                  <div>
                    <strong>Facility:</strong> {experiment.facility}
                  </div>
                )}
                {experiment.date && (
                  <div>
                    <strong>Date:</strong> {new Date(experiment.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                  </div>
                )}
              </div>
              {experiment.tags && experiment.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {experiment.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardHeader>
          </Card>

          {/* Content */}
          <Card>
            <CardContent className="pt-6">
              <div 
                className="prose prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: experiment.content }} 
              />
            </CardContent>
          </Card>
        </article>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
