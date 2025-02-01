import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllContentData, type ContentItem } from "@/utils/markdown"

export default async function BlogPage() {
  const posts = await getAllContentData("post")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: ContentItem) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <div>{post.excerpt}</div>
                <div className="mt-2">
                  {post.date} {post.author && `| By ${post.author}`}
                </div>
              </div>
              <Link href={`/blog/${post.id}`} className="text-primary hover:underline mt-2 inline-block">
                Read more
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

