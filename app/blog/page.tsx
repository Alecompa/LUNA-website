import { getAllContentData } from "@/utils/markdown"
import ContentPreviewCard from "@/app/components/content-preview-card"

export default async function BlogPage() {
  const posts = await getAllContentData("post")

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Blog Posts</h1>
        <p className="text-xl text-muted-foreground">Latest insights and discoveries from our research team</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <ContentPreviewCard key={post.id} item={post} type="post" />
        ))}
      </div>
    </div>
  )
}



