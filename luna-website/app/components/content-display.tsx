import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ContentItem } from "@/utils/markdown"

export default function ContentDisplay({ item }: { item: ContentItem }) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <div className="text-sm text-muted-foreground">
          {item.date} {item.author && `| By ${item.author}`}
        </div>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: item.content }} />
      </CardContent>
    </Card>
  )
}

