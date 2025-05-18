import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const teamQuotes = [
  {
    quote:
      "Working at Creavibe.pro has been the most rewarding experience of my career. I get to solve challenging problems while working with an amazing team.",
    name: "Alex Chen",
    role: "Senior Engineer",
    image: "/smiling-professional-woman-headshot.png",
  },
  {
    quote:
      "I love how we're empowering creators with AI. The culture here encourages innovation and we're constantly pushing the boundaries of what's possible.",
    name: "Marcus Johnson",
    role: "Product Designer",
    image: "/smiling-man-headshot.png",
  },
  {
    quote:
      "The remote-first approach at Creavibe.pro has allowed me to work with talented people from around the world while maintaining the perfect work-life balance.",
    name: "Sophia Rodriguez",
    role: "Marketing Manager",
    image: "/latina-professional-headshot.png",
  },
]

export function TeamPhotos() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Life at Creavibe.pro</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="overflow-hidden shadow-lg">
          <div className="aspect-video relative">
            <Image src="/team-brainstorming.png" alt="Team brainstorming session" fill className="object-cover" />
          </div>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Team brainstorming session</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden shadow-lg">
          <div className="aspect-video relative">
            <Image src="/company-retreat-nature.png" alt="Company retreat" fill className="object-cover" />
          </div>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Annual company retreat</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden shadow-lg">
          <div className="aspect-video relative">
            <Image
              src="/placeholder.svg?height=600&width=800&query=team celebrating launch"
              alt="Product launch celebration"
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Celebrating our latest product launch</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-6 text-center">What Our Team Says</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamQuotes.map((item) => (
            <Card key={item.name} className="shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden relative mb-4">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <p className="italic mb-4">"{item.quote}"</p>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-purple-600 text-sm">{item.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
