import { MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { forumTopics } from "@/lib/mock-community-data"

export default function CommunityForums() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Forums</CardTitle>
            <CardDescription>Join discussions with other users</CardDescription>
          </div>
          <MessageSquare className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {forumTopics.map((topic) => (
            <div key={topic.id} className="border-b pb-4 last:border-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium hover:text-primary">
                    <a href="#">{topic.title}</a>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{topic.excerpt}</p>
                </div>
                <Badge variant={topic.isHot ? "destructive" : "secondary"}>
                  {topic.replies} {topic.replies === 1 ? "reply" : "replies"}
                </Badge>
              </div>
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <span>Started by {topic.author}</span>
                <span className="mx-2">•</span>
                <span>Last reply {topic.lastReply}</span>
              </div>
            </div>
          ))}
          <div className="text-center mt-6">
            <a href="#" className="text-sm font-medium text-primary hover:underline">
              View all forum topics →
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
