import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

const benefitCategories = [
  {
    title: "Health & Wellness",
    benefits: [
      "Comprehensive health insurance",
      "Dental and vision coverage",
      "Mental health support",
      "Wellness stipend",
    ],
  },
  {
    title: "Work-Life Balance",
    benefits: ["Flexible working hours", "Remote-first culture", "Unlimited PTO policy", "Paid parental leave"],
  },
  {
    title: "Growth & Development",
    benefits: [
      "Learning and development budget",
      "Conference attendance",
      "Career progression framework",
      "Internal mentorship program",
    ],
  },
  {
    title: "Perks",
    benefits: ["Equity compensation", "Home office stipend", "Team retreats", "Free Creavibe.pro subscription"],
  },
]

export function BenefitsSection() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Benefits & Perks</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefitCategories.map((category) => (
          <Card key={category.title} className="shadow-md">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-purple-600">{category.title}</h3>
              <ul className="space-y-2">
                {category.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
