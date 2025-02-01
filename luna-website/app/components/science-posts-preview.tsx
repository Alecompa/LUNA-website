import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const sciencePosts = [
  {
    id: 1,
    title: "The Future of Quantum Computing",
    excerpt: "Exploring the potential applications and challenges of quantum computing in various scientific fields.",
    author: "Dr. Jane Smith",
  },
  {
    id: 2,
    title: "Advancements in CRISPR Technology",
    excerpt: "Recent breakthroughs in gene editing and their implications for medicine and biotechnology.",
    author: "Prof. John Doe",
  },
  {
    id: 3,
    title: "Dark Matter: The Hunt Continues",
    excerpt: "An overview of ongoing experiments and theories in the search for dark matter.",
    author: "Dr. Emily Brown",
  },
]

export default function SciencePostsPreview() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Science Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sciencePosts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <div>{post.excerpt}</div>
                  <div className="mt-2 text-gray-500">By: {post.author}</div>
                </div>
                <Link href={`/blog/${post.id}`} className="text-primary hover:underline mt-2 inline-block">
                  Read more
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/blog" className="text-primary hover:underline">
            View all posts
          </Link>
        </div>
      </div>
    </section>
  )
}

