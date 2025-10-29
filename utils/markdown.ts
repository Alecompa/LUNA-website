import fs from "fs"
import path from "path"
import matter from "gray-matter"
import remarkMath from "remark-math"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeKatex from "rehype-katex"
import remarkParse from "remark-parse"
import rehypeDocument from "rehype-document"
import rehypeFormat from "rehype-format"
import rehypeStringify from "rehype-stringify"
import rehypeSlug from "rehype-slug"
import rehypeParse from "rehype-parse"
import { unified } from "unified"

const postsDirectory = path.join(process.cwd(), "content/posts")
const articlesDirectory = path.join(process.cwd(), "content/articles")
const experimentsDirectory = path.join(process.cwd(), "content/experiments")

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

export type ExperimentItem = ContentItem & {
  status: "ongoing" | "past"
  pi: string
  facility?: string
}

export async function getContentData(id: string, type: "post" | "article"): Promise<ContentItem> {
  const directory = type === "post" ? postsDirectory : articlesDirectory
  const fullPath = path.join(directory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  const { data, content } = matter(fileContents)

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeSlug)
    .use(rehypeDocument, { title: data.title })
    .use(rehypeFormat)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  const contentHtml = processedContent.toString()

  // Process the title to render math
  const processedTitle = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(data.title)

  const titleHtml = processedTitle.toString()

  // Calculate reading time (rough estimate)
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/g).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)

  return {
    id,
    title: titleHtml,
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

// Experiment-specific functions
export async function getExperimentData(id: string): Promise<ExperimentItem> {
  try {
    const fullPath = path.join(experimentsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    const { data, content } = matter(fileContents)

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)

  const contentHtml = processedContent.toString()

  // Process the title to render math
  const processedTitle = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(data.title)

  const titleHtml = processedTitle.toString()

  // Calculate reading time
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/g).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)

    return {
      id,
      title: titleHtml,
      date: data.date,
      content: contentHtml,
      excerpt: data.excerpt || content.slice(0, 150) + "...",
      author: data.author,
      coverImage: data.coverImage,
      readingTime: `${readingTime} min read`,
      tags: data.tags || [],
      status: data.status || "ongoing",
      pi: data.pi,
      facility: data.facility,
    }
  } catch (error) {
    console.error(`Error reading experiment ${id}:`, error)
    throw error
  }
}

export function getAllExperimentIds(): string[] {
  try {
    const fileNames = fs.readdirSync(experimentsDirectory).filter(name => name.endsWith('.md'))
    return fileNames.map((fileName) => fileName.replace(/\.md$/, ""))
  } catch (error) {
    console.error('Error reading experiment IDs:', error)
    return []
  }
}

export async function getAllExperiments(): Promise<ExperimentItem[]> {
  try {
    const fileNames = fs.readdirSync(experimentsDirectory).filter(name => name.endsWith('.md'))
    const experimentPromises = fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "")
      try {
        return await getExperimentData(id)
      } catch (error) {
        console.error(`Failed to load experiment ${id}:`, error)
        return null
      }
    })
    const allExperiments = await Promise.all(experimentPromises)
    // Filter out any null values from failed reads
    const validExperiments = allExperiments.filter((exp): exp is ExperimentItem => exp !== null)
    return validExperiments.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error reading experiments directory:', error)
    return []
  }
}

export async function getOngoingExperiments(): Promise<ExperimentItem[]> {
  const allExperiments = await getAllExperiments()
  return allExperiments.filter((exp) => exp.status === "ongoing")
}

export async function getPastExperiments(): Promise<ExperimentItem[]> {
  const allExperiments = await getAllExperiments()
  return allExperiments.filter((exp) => exp.status === "past")
}
