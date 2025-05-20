import { Button } from "@/components/ui/button"

export function IntegrationsHero() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Works beautifully with your stack</h1>
      <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
        Supercharge your workflow by connecting CreaVibe with your favorite tools. Our integrations make it easy to
        streamline your content creation process.
      </p>
      <div className="mt-6">
        <Button size="lg">Explore Integrations</Button>
      </div>
    </div>
  )
}
