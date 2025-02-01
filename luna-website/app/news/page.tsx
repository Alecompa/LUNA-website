import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllContentData, type ContentItem } from "@/utils/markdown"

export default async function NewsPage() {
  const articles = await getAllContentData("article")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">News & Articles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article: ContentItem) => (
          <Card key={article.id}>
            <CardHeader>
              <CardTitle>{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <div>{article.excerpt}</div>
                <div className="mt-2">
                  {article.date} {article.author && `| By ${article.author}`}
                </div>
              </div>
              <Link href={`/news/${article.id}`} className="text-primary hover:underline mt-2 inline-block">
                Read more
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

