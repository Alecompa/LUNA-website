import { getAllContentData } from "@/utils/markdown"
import ContentPreviewCard from "@/app/components/content-preview-card"
export default async function NewsPage() {
  const articles = await getAllContentData("article")

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">News & Articles</h1>
        <p className="text-xl text-muted-foreground">Stay updated with the latest developments and announcements</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <ContentPreviewCard key={article.id} item={article} type="article" />
        ))}
      </div>
    </div>
  )
}

