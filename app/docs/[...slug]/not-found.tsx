import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-10">
      <h1 className="text-4xl font-bold">404</h1>
      <h2 className="text-xl font-semibold">Documentation Not Found</h2>
      <p className="text-muted-foreground">
        The documentation page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/docs"
        className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        Go to Documentation Home
      </Link>
    </div>
  )
}
