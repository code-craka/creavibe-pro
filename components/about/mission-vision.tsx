import { Card, CardContent } from "@/components/ui/card"

export function MissionVision() {
  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">Our Mission</h2>
            <p className="text-lg">
              At Creavibe.pro, our mission is to democratize content creation through AI-powered tools that empower
              marketing teams and creators to produce exceptional content faster than ever before. We believe in
              breaking down barriers to creativity and enabling seamless collaboration in the digital workspace.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600">Our Vision</h2>
            <p className="text-lg">
              We envision a future where AI and human creativity work in perfect harmony, where teams across the globe
              collaborate in real-time to create content that captivates audiences. Creavibe.pro aims to be the catalyst
              for this creative revolution, setting new standards for what's possible in content creation.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
