"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { PlusCircle, Trash2, AlertTriangle, BarChart3 } from "lucide-react"
import { apiAnalyticsAdvancedService } from "@/lib/api-analytics-advanced-service"
import type { ScenarioSimulation } from "@/types/api-analytics-advanced"

export function ApiTokenScenarioPlanning() {
  const [scenarios, setScenarios] = useState<ScenarioSimulation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newScenario, setNewScenario] = useState({
    name: "",
    description: "",
    baselineUsage: 5000, // Default value
    percentageChange: 20, // Default value
  })

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await apiAnalyticsAdvancedService.getScenarioSimulations()
        setScenarios(data)
      } catch (err) {
        console.error("Error fetching scenario simulations:", err)
        setError("Failed to load scenario simulations. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchScenarios()
  }, [])

  const handleCreateScenario = async () => {
    try {
      setIsLoading(true)

      // Calculate simulated usage based on baseline and percentage change
      const simulatedUsage = Math.round(newScenario.baselineUsage * (1 + newScenario.percentageChange / 100))

      // Determine impact assessment based on percentage change
      let impactAssessment = ""
      if (newScenario.percentageChange > 50) {
        impactAssessment = "Critical impact. Infrastructure scaling required. Consider rate limiting."
      } else if (newScenario.percentageChange > 25) {
        impactAssessment = "High impact. Consider scaling API infrastructure before implementation."
      } else if (newScenario.percentageChange > 10) {
        impactAssessment = "Moderate impact. Current infrastructure should handle the load."
      } else {
        impactAssessment = "Low impact. No infrastructure changes needed."
      }

      const createdScenario = await apiAnalyticsAdvancedService.createScenarioSimulation({
        name: newScenario.name,
        description: newScenario.description,
        baselineUsage: newScenario.baselineUsage,
        simulatedUsage,
        percentageChange: newScenario.percentageChange,
        impactAssessment,
      })

      setScenarios((prev) => [...prev, createdScenario])
      setIsDialogOpen(false)
      resetNewScenario()
    } catch (err) {
      console.error("Error creating scenario simulation:", err)
      setError("Failed to create scenario simulation. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteScenario = async (scenarioId: string) => {
    try {
      setIsLoading(true)
      await apiAnalyticsAdvancedService.deleteScenarioSimulation(scenarioId)
      setScenarios((prev) => prev.filter((scenario) => scenario.id !== scenarioId))
    } catch (err) {
      console.error("Error deleting scenario simulation:", err)
      setError("Failed to delete scenario simulation. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetNewScenario = () => {
    setNewScenario({
      name: "",
      description: "",
      baselineUsage: 5000,
      percentageChange: 20,
    })
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Get impact color based on percentage change
  const getImpactColor = (percentageChange: number) => {
    if (percentageChange > 50) return "text-red-500"
    if (percentageChange > 25) return "text-amber-500"
    if (percentageChange > 10) return "text-yellow-500"
    return "text-green-500"
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Scenario Planning</CardTitle>
            <CardDescription>Simulate the impact of different scenarios on your API usage</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Scenario
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Scenario</DialogTitle>
                <DialogDescription>
                  Simulate how changes in your application or business might affect API usage.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="scenario-name">Scenario Name</Label>
                  <Input
                    id="scenario-name"
                    value={newScenario.name}
                    onChange={(e) => setNewScenario((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., New Marketing Campaign"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="scenario-description">Description</Label>
                  <Textarea
                    id="scenario-description"
                    value={newScenario.description}
                    onChange={(e) => setNewScenario((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the scenario and its expected impact"
                    rows={3}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="baseline-usage">Baseline API Requests (per day)</Label>
                  <Input
                    id="baseline-usage"
                    type="number"
                    value={newScenario.baselineUsage}
                    onChange={(e) =>
                      setNewScenario((prev) => ({ ...prev, baselineUsage: Number.parseInt(e.target.value) || 0 }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="percentage-change">Expected Change (%)</Label>
                    <span className="text-sm font-medium">{newScenario.percentageChange}%</span>
                  </div>
                  <Slider
                    id="percentage-change"
                    min={-50}
                    max={200}
                    step={5}
                    value={[newScenario.percentageChange]}
                    onValueChange={(value) => setNewScenario((prev) => ({ ...prev, percentageChange: value[0] }))}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>-50%</span>
                    <span>0%</span>
                    <span>+100%</span>
                    <span>+200%</span>
                  </div>
                </div>
                <div className="mt-2 rounded-md bg-muted p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Simulated Usage:</span>
                    <span className="text-sm font-medium">
                      {Math.round(
                        newScenario.baselineUsage * (1 + newScenario.percentageChange / 100),
                      ).toLocaleString()}{" "}
                      requests/day
                    </span>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateScenario} disabled={!newScenario.name || isLoading}>
                  Create Scenario
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && scenarios.length === 0 ? (
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : scenarios.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
            <BarChart3 className="mb-4 h-10 w-10 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-medium">No scenarios yet</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Create scenarios to simulate how changes might affect your API usage.
            </p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Your First Scenario
            </Button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Scenario</TableHead>
                  <TableHead className="hidden md:table-cell">Created</TableHead>
                  <TableHead className="text-right">Baseline</TableHead>
                  <TableHead className="text-right">Simulated</TableHead>
                  <TableHead className="text-right">Change</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scenarios.map((scenario) => (
                  <TableRow key={scenario.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{scenario.name}</div>
                        <div className="hidden text-sm text-muted-foreground md:block">
                          {scenario.description.length > 50
                            ? `${scenario.description.substring(0, 50)}...`
                            : scenario.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(scenario.createdAt)}</TableCell>
                    <TableCell className="text-right">{scenario.baselineUsage.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{scenario.simulatedUsage.toLocaleString()}</TableCell>
                    <TableCell className={`text-right ${getImpactColor(scenario.percentageChange)}`}>
                      {scenario.percentageChange > 0 ? "+" : ""}
                      {scenario.percentageChange}%
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteScenario(scenario.id)}
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      {scenarios.length > 0 && (
        <CardFooter className="border-t bg-muted/50 px-6 py-3">
          <div className="text-sm text-muted-foreground">
            <strong>Note:</strong> These scenarios are simulations based on your current API usage patterns. Actual
            results may vary based on implementation details and other factors.
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
