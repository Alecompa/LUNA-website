import Link from "next/link"
import Hero from "./components/hero"
import Experiments from "./components/experiments"
import ImageCarousel from "./components/image-carousel"
import Team from "./components/team"
import ContentPreviewCard from "./components/content-preview-card"
import { Button } from "@/components/ui/button"
import { getAllContentData } from "@/utils/markdown"

export default async function Home() {
  const latestNews = await getAllContentData("article")
  const latestPosts = await getAllContentData("post")

  // Get the 3 most recent items for each category
  const recentNews = latestNews.slice(0, 3)
  const recentPosts = latestPosts.slice(0, 3)

  return (
    <>
      <Hero />

      {/* News Preview Section */}
      <section className="py-16 muted">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest News</h2>
            <Link href="/news">
              <Button variant="outline">View all news</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentNews.map((item) => (
              <ContentPreviewCard key={item.id} item={item} type="article" />
            ))}
          </div>
        </div>
      </section>

      <Experiments />

      <ImageCarousel />

      {/* Science Posts Preview Section */}
      <section className="py-16 background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
            <Link href="/blog">
              <Button variant="outline">View all posts</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((item) => (
              <ContentPreviewCard key={item.id} item={item} type="post" />
            ))}
          </div>
        </div>
      </section>

      <Team />
    </>
  )
}