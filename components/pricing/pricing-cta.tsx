import { Button } from "@/components/ui/button"

export default function PricingCTA() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Transform Your Content Creation?
            </h2>
            <p className="mx-auto max-w-[700px] md:text-xl">
              Join thousands of creators and marketing teams who are already using Creavibe.pro to produce exceptional
              content.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button size="lg" variant="secondary" className="h-12 px-8">
              Start Your Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
