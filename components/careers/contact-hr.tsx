import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export function ContactHR() {
  return (
    <section className="bg-purple-50 rounded-xl p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Don't See the Right Role?</h2>
      <p className="text-lg mb-6 max-w-2xl mx-auto">
        We're always looking for talented individuals to join our team. Send us your resume and let us know how you can
        contribute to CreaVibe.
      </p>
      <Button asChild size="lg">
        <Link href="mailto:careers@CreaVibe">
          <Mail className="mr-2 h-5 w-5" />
          Contact HR Team
        </Link>
      </Button>
    </section>
  )
}
