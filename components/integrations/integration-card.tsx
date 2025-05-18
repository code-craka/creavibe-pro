import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Integration } from "@/types/integrations"
import Image from "next/image"

interface IntegrationCardProps {
  integration: Integration
}

export function IntegrationCard({ integration }: IntegrationCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
            <Image
              src={integration.iconUrl || "/placeholder.svg"}
              alt={`${integration.name} logo`}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <CardTitle className="text-xl">{integration.name}</CardTitle>
            {integration.isNew && (
              <Badge variant="secondary" className="ml-2">
                New
              </Badge>
            )}
            {integration.isPopular && <Badge className="ml-2">Popular</Badge>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="text-sm text-muted-foreground">{integration.description}</CardDescription>
        <div className="mt-4 flex flex-wrap gap-2">
          {integration.categories.map((category) => (
            <Badge key={category} variant="outline">
              {category}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t">
        <Button className="w-full" variant={integration.isConnected ? "outline" : "default"}>
          {integration.isConnected ? "Manage" : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  )
}
