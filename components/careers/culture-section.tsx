import Image from "next/image"
import { Card } from "@/components/ui/card"

export function CultureSection() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Culture</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-bold mb-4 text-purple-600">Work That Matters</h3>
          <p className="text-lg mb-4">
            At CreaVibe, we're building tools that empower creators around the world. Our work directly impacts how
            people express themselves and collaborate in the digital age.
          </p>
          <p className="text-lg mb-4">
            We believe in a culture of innovation, where ideas are valued regardless of where they come from. Our team
            members are encouraged to experiment, take risks, and learn from both successes and failures.
          </p>
          <p className="text-lg">
            We're committed to diversity and inclusion, recognizing that the best products are built by teams with
            varied perspectives and backgrounds.
          </p>
        </div>

        <Card className="overflow-hidden shadow-lg">
          <div className="aspect-video relative">
            <Image
              src="/placeholder-9wvjt.png"
              alt="CreaVibe team collaborating"
              fill
              className="object-cover"
            />
          </div>
        </Card>
      </div>
    </section>
  )
}
