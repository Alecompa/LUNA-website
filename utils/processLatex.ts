import { unified } from "unified"
import rehypeParse from "rehype-parse"
import rehypeKatex from "rehype-katex"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkMath from "remark-math"
import remarkRehype from "remark-rehype"

export async function processLatex(content: string): Promise<string> {
    const processedContent = await unified()
        .use(remarkParse)
        .use(remarkMath)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeKatex)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(content)

    return processedContent.toString()
}

