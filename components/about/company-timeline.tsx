import { Card, CardContent } from "@/components/ui/card"

const milestones = [
  {
    year: 2020,
    title: "The Beginning",
    description: "Creavibe.pro was founded with a vision to revolutionize content creation through AI.",
  },
  {
    year: 2021,
    title: "First Product Launch",
    description: "Released our beta version to select marketing teams and gathered valuable feedback.",
  },
  {
    year: 2022,
    title: "Series A Funding",
    description: "Secured $5M in Series A funding to accelerate product development and team growth.",
  },
  {
    year: 2023,
    title: "Global Expansion",
    description: "Expanded our team globally and reached 10,000 active users across 30 countries.",
  },
  {
    year: 2024,
    title: "Enterprise Solutions",
    description: "Launched enterprise-grade features for large marketing teams and creative agencies.",
  },
]

export function CompanyTimeline() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-200"></div>

        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className={`relative flex items-center ${index % 2 === 0 ? "justify-start" : "justify-end"} md:justify-between`}
            >
              <div className={`w-full md:w-5/12 ${index % 2 !== 0 ? "md:order-1" : "md:order-none"}`}>
                <Card className="shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <span className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-800 font-semibold mb-3">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-purple-600 z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
