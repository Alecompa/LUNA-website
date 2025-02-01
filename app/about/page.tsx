import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">About SciCollab</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            SciCollab is dedicated to advancing scientific knowledge through collaborative research. We bring together
            researchers from around the world to work on cutting-edge experiments and push the boundaries of human
            understanding.
          </CardDescription>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Our Vision</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            We envision a future where scientific breakthroughs are accelerated through open collaboration, shared
            resources, and interdisciplinary approaches. SciCollab aims to be the catalyst for this new era of
            scientific discovery.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}

