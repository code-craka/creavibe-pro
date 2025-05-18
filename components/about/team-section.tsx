import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Alex Morgan",
    title: "Founder & CEO",
    bio: "Former AI researcher with a passion for creative tools. Founded Creavibe.pro to bridge the gap between AI and human creativity.",
    image: "/authors/alex-morgan.png",
  },
  {
    name: "Jamie Chen",
    title: "Chief Technology Officer",
    bio: "AI specialist with 10+ years experience building scalable platforms. Leads Creavibe.pro's technical vision and innovation.",
    image: "/authors/jamie-chen.png",
  },
  {
    name: "Taylor Wilson",
    title: "Head of Product",
    bio: "Product visionary with experience at leading SaaS companies. Ensures Creavibe.pro meets the needs of modern content creators.",
    image: "/authors/taylor-wilson.png",
  },
  {
    name: "Jordan Rivera",
    title: "Head of Marketing",
    bio: "Digital marketing expert who practices what we preach. Uses Creavibe.pro daily to create compelling marketing campaigns.",
    image: "/professional-headshot.png",
  },
]

export function TeamSection() {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.name} className="overflow-hidden">
            <div className="aspect-square relative">
              <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-purple-600 mb-2">{member.title}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
