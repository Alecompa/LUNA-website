import { getContentData, getAllContentIds } from "@/utils/markdown"
import ContentDisplay from "@/app/components/content-display"

export async function generateStaticParams() {
  const ids = getAllContentIds("article")
  return ids.map((id) => ({ id }))
}

export default async function NewsArticle({ params }: { params: { id: string } }) {
  const article = await getContentData(await params.id, "article")

  return (
    <div className="container mx-auto px-4 py-8">
      <ContentDisplay item={article} />
    </div>
  )
}

