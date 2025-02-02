import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"
import remarkMath from "remark-math"
import remarkGfm from "remark-gfm"
import rehypeKatex from "rehype-katex"
import rehypeStringify from "rehype-stringify"
import { unified } from "unified"

const postsDirectory = path.join(process.cwd(), "content/posts")
const articlesDirectory = path.join(process.cwd(), "content/articles")

export type ContentItem = {
  id: string
  title: string
  date: string
  content: string
  excerpt: string
  author?: string
  coverImage?: string
  readingTime?: string
  tags?: string[]
}

export async function getContentData(id: string, type: "post" | "article"): Promise<ContentItem> {
  const directory = type === "post" ? postsDirectory : articlesDirectory
  const fullPath = path.join(directory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  const { data, content } = matter(fileContents)


  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  // Calculate reading time (rough estimate)
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/g).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)

  return {
    id,
    title: data.title,
    date: data.date,
    content: contentHtml,
    excerpt: data.excerpt || content.slice(0, 150) + "...",
    author: data.author,
    coverImage: data.coverImage,
    readingTime: `${readingTime} min read`,
    tags: data.tags || [],
  }
}

export function getAllContentIds(type: "post" | "article"): string[] {
  const directory = type === "post" ? postsDirectory : articlesDirectory
  const fileNames = fs.readdirSync(directory)
  return fileNames.map((fileName) => fileName.replace(/\.md$/, ""))
}

export async function getAllContentData(type: "post" | "article"): Promise<ContentItem[]> {
  const directory = type === "post" ? postsDirectory : articlesDirectory
  const fileNames = fs.readdirSync(directory)
  const allContentData = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "")
      return getContentData(id, type)
    }),
  )
  return allContentData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

