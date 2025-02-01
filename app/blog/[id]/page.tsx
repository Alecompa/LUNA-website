import { getContentData, getAllContentIds } from "@/utils/markdown"
import ContentDisplay from "@/app/components/content-display"

export async function generateStaticParams() {
  const ids = getAllContentIds("post")
  return ids.map((id) => ({ id }))
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { id } = params;
  const post = await getContentData(id, "post")

  return (
    <div className="container mx-auto px-4 py-8">
      <ContentDisplay item={post} />
    </div>
  )
}

