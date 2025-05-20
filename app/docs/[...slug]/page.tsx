import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DocContent } from "@/components/docs/doc-content"
import { getDocBySlug, getAllDocs } from "@/lib/docs"

interface DocPageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const slug = params.slug.join("/")
  const doc = await getDocBySlug(slug)

  if (!doc) {
    return {
      title: "Not Found | CreaVibe Documentation",
      description: "The requested documentation page was not found.",
    }
  }

  return {
    title: `${doc.title} | CreaVibe Documentation`,
    description: doc.description,
  }
}

export async function generateStaticParams() {
  const docs = await getAllDocs()

  return docs.map((doc) => ({
    slug: doc.slug.split("/"),
  }))
}

export default async function DocPage({ params }: DocPageProps) {
  const slug = params.slug.join("/")
  const doc = await getDocBySlug(slug)

  if (!doc) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{doc.title}</h1>
          <p className="text-lg text-muted-foreground">{doc.description}</p>
        </div>
        <a
          href={`https://github.com/creavibe/docs/edit/main/content/${slug}.mdx`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
            <path d="m15 5 4 4" />
          </svg>
          Edit on GitHub
        </a>
      </div>
      <DocContent content={doc.content} />
    </div>
  )
}
