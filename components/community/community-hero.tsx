import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CommunityHero() {
  return (
    <div className="text-center">
      <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
        <Users className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">Join Our Community</h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        Connect with other CreaVibe users, share ideas, get help, and contribute to making our platform even better.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button size="lg">Join Discord</Button>
        <Button size="lg" variant="outline">
          Follow on Twitter
        </Button>
      </div>
    </div>
  )
}
