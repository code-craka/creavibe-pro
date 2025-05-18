import { Lightbulb, ThumbsUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { featureRequests } from "@/lib/mock-community-data"

export default function FeatureRequests() {
  return (
    <div className="mt-16 mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Feature Requests</h2>
          <p className="text-muted-foreground mt-1">Vote on features you'd like to see or suggest new ones</p>
        </div>
        <Button>
          <Lightbulb className="mr-2 h-4 w-4" />
          Suggest Feature
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featureRequests.map((feature) => (
          <Card key={feature.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle>{feature.title}</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>{feature.votes} votes</span>
                <span className="text-muted-foreground">{feature.status}</span>
              </div>
              <Progress value={feature.progress} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-8">
        <a href="#" className="text-sm font-medium text-primary hover:underline">
          View all feature requests →
        </a>
      </div>
    </div>
  )
}
