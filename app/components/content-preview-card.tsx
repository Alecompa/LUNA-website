import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { ContentItem } from "@/utils/markdown"

export default function ContentPreviewCard({
    item,
    type,
}: {
    item: ContentItem
    type: "post" | "article"
}) {
    const href = type === "post" ? `/blog/${item.id}` : `/news/${item.id}`

    return (
        <Card className="overflow-hidden group">
            <Link href={href}>
                <div className="relative h-48 w-full">
                    <Image
                        src={item.coverImage || "/placeholder.svg?height=200&width=400"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                    />
                </div>
            </Link>
            <CardHeader className="space-y-2">
                {item.tags && item.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                        {item.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
                <Link href={href} className="hover:underline">
                    <h3 className="text-xl font-bold" dangerouslySetInnerHTML={{ __html: item.title }} />
                </Link>
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground space-y-4">
                    <p>{item.excerpt}</p>
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
            </CardContent>
        </Card>
    )
}
