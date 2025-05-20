import type { Metadata } from "next"
import { DocContent } from "@/components/docs/doc-content"
import { getDocBySlug } from "@/lib/docs"

export const metadata: Metadata = {
  title: "Getting Started | CreaVibe Documentation",
  description: "Get started with CreaVibe API and SDK",
}

export default async function DocsPage() {
  const doc = await getDocBySlug("getting-started")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{doc.title}</h1>
        <p className="text-lg text-muted-foreground">{doc.description}</p>
      </div>
      <DocContent content={doc.content} />
    </div>
  )
}
