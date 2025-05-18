import { Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { upcomingWebinars } from "@/lib/mock-community-data"

export default function UpcomingWebinars() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Upcoming Webinars</CardTitle>
            <CardDescription>Learn from experts and ask questions</CardDescription>
          </div>
          <Calendar className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingWebinars.map((webinar) => (
            <div key={webinar.id} className="border-b pb-4 last:border-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{webinar.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{webinar.description}</p>
                </div>
                {webinar.isFree ? <Badge>Free</Badge> : <Badge variant="secondary">Premium</Badge>}
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="text-xs text-muted-foreground">
                  <div>{webinar.date}</div>
                  <div>{webinar.time}</div>
                </div>
                <Button size="sm">Register</Button>
              </div>
            </div>
          ))}
          <div className="text-center mt-6">
            <a href="#" className="text-sm font-medium text-primary hover:underline">
              View all webinars →
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
