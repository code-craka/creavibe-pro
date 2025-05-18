import Link from "next/link"
import { Button } from "@/components/ui/button"

export function AboutCTA() {
  return (
    <section className="bg-purple-50 rounded-xl p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Join Us on Our Mission</h2>
      <p className="text-lg mb-6 max-w-2xl mx-auto">
        Whether you're looking to join our team or partner with us, we'd love to hear from you.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/careers">View Open Positions</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </div>
    </section>
  )
}
