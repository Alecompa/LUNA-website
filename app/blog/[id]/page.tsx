import { getContentData, getAllContentIds } from "@/utils/markdown"
import ContentDisplay from "@/app/components/content-display"
import { GetStaticPropsContext } from 'next'

export async function generateStaticParams() {
  const ids = getAllContentIds("post")
  return ids.map((id) => ({ id }))
}

export default async function BlogPost(context: GetStaticPropsContext) {
  const { params } = context;
  const { id } = params as { id: string };
  const post = await getContentData(id, "post")

  return (
    <div className="container mx-auto px-4 py-8">
      <ContentDisplay item={post} />
    </div>
  )
}

