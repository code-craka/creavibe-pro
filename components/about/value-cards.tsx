import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, Users, Zap, Shield } from "lucide-react"

const values = [
  {
    title: "Innovation",
    description: "We constantly push the boundaries of what's possible with AI and content creation.",
    icon: Lightbulb,
  },
  {
    title: "Collaboration",
    description: "We believe in the power of teams working together seamlessly across time and space.",
    icon: Users,
  },
  {
    title: "Efficiency",
    description: "We're obsessed with helping our users work smarter, not harder.",
    icon: Zap,
  },
  {
    title: "Trust",
    description: "We build secure, reliable tools that our users can depend on every day.",
    icon: Shield,
  },
]

export function ValueCards() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((value) => (
          <Card key={value.title} className="shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <value.icon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
