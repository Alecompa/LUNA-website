import Image from "next/image"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { ContentItem } from "@/utils/markdown"

export default function ContentDisplay({ item }: { item: ContentItem }) {
  return (
    <article className="prose prose-lg dark:prose-invert mx-auto max-w-4xl">
      {/* Cover Image */}
      {item.coverImage && (
        <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image src={item.coverImage || "/placeholder.svg"} alt={item.title} fill className="object-cover" priority />
        </div>
      )}

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4" dangerouslySetInnerHTML={{ __html: item.title }} />
        <div className="flex items-center gap-4 text-muted-foreground mb-4">
          {item.author && (
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={`/placeholder.svg?text=${item.author[0]}`} />
                <AvatarFallback>{item.author[0]}</AvatarFallback>
              </Avatar>
              <span>{item.author}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <time>{format(new Date(item.date), "MMMM d, yyyy")}</time>
            {item.readingTime && (
              <>
                <span>•</span>
                <span>{item.readingTime}</span>
              </>
            )}
          </div>
        </div>
        {item.tags && item.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* Article Content */}
      <div className="content" dangerouslySetInnerHTML={{ __html: item.content }} />
    </article>
  )
}

