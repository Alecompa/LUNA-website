import { getContentData, getAllContentIds } from "@/utils/markdown"
import ContentDisplay from "@/app/components/content-display"

export async function generateStaticParams() {
  const ids = getAllContentIds("article")
  return ids.map((id) => ({ id }))
}

export default async function NewsArticle({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const article = await getContentData(resolvedParams.id, "article")

  return (
    <div className="container mx-auto px-4 py-8">
      <ContentDisplay item={article} />
    </div>
  )
}

