"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LabelList } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AlertTriangle, TrendingUp, TrendingDown, Minus, Info } from "lucide-react"
import { apiAnalyticsAdvancedService } from "@/lib/api-analytics-advanced-service"
import type { IndustryBenchmark, CompetitorComparison } from "@/types/api-analytics-advanced"

export function ApiTokenCompetitiveAnalytics() {
  const [activeTab, setActiveTab] = useState("benchmarks")
  const [benchmarks, setBenchmarks] = useState<IndustryBenchmark[]>([])
  const [comparisons, setComparisons] = useState<CompetitorComparison[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch benchmarks and comparisons
        const [benchmarksResult, comparisonsResult] = await Promise.all([
          apiAnalyticsAdvancedService.getIndustryBenchmarks(),
          apiAnalyticsAdvancedService.getCompetitorComparisons(),
        ])

        setBenchmarks(benchmarksResult)
        setComparisons(comparisonsResult)
      } catch (err) {
        console.error("Error fetching competitive analytics data:", err)
        setError("Failed to load competitive analytics data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Get trend icon based on trend value
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "decreasing":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />
    }
  }

  // Get percentile badge color
  const getPercentileBadgeColor = (percentile: number) => {
    if (percentile >= 80) return "bg-green-100 text-green-800"
    if (percentile >= 50) return "bg-yellow-100 text-yellow-800"
    return "bg-red-100 text-red-800"
  }

  // Get comparison bar colors
  const getComparisonBarColors = () => {
    return {
      yourValue: "hsl(var(--chart-1))",
      competitorAverage: "hsl(var(--chart-2))",
      topPerformer: "hsl(var(--chart-3))",
      bottomPerformer: "hsl(var(--chart-4))",
    }
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
        <CardTitle className="text-xl font-semibold">Competitive Analytics</CardTitle>
        <CardDescription>Benchmark your API usage against industry averages and competitors</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="benchmarks">Industry Benchmarks</TabsTrigger>
            <TabsTrigger value="comparisons">Competitor Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="benchmarks" className="mt-0">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : (
              <>
                <div className="mb-4 rounded-md bg-muted/50 p-3">
                  <div className="flex items-start space-x-2">
                    <Info className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">
                      <p>
                        These benchmarks compare your API usage metrics against industry averages. Higher percentiles
                        indicate better performance relative to the industry.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {benchmarks.map((benchmark, index) => (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium">{benchmark.metric}</h3>
                          <div className="mt-1 flex items-center space-x-2">
                            <span className="text-2xl font-bold">
                              {benchmark.yourValue}
                              {benchmark.metric.includes("Rate") || benchmark.metric.includes("Availability")
                                ? "%"
                                : ""}
                            </span>
                            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                              <span>vs. industry avg:</span>
                              <span className="font-medium">
                                {benchmark.industryAverage}
                                {benchmark.metric.includes("Rate") || benchmark.metric.includes("Availability")
                                  ? "%"
                                  : ""}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <Badge className={`${getPercentileBadgeColor(benchmark.percentile)}`}>
                            {benchmark.percentile}th Percentile
                          </Badge>
                          <div className="mt-2 flex items-center space-x-1 text-sm">
                            {getTrendIcon(benchmark.trend)}
                            <span>{benchmark.trend.charAt(0).toUpperCase() + benchmark.trend.slice(1)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${benchmark.percentile}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="comparisons" className="mt-0">
            {isLoading ? (
              <div className="w-full space-y-3">
                <Skeleton className="h-[400px] w-full rounded-md" />
              </div>
            ) : (
              <>
                <div className="mb-4 rounded-md bg-muted/50 p-3">
                  <div className="flex items-start space-x-2">
                    <Info className="mt-0.5 h-4 w-4 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">
                      <p>
                        This chart compares your API performance metrics against anonymized competitor data. All
                        competitor data is aggregated and anonymized to protect privacy.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-[400px] w-full">
                  <ChartContainer
                    config={{
                      yourValue: {
                        label: "Your Value",
                        color: getComparisonBarColors().yourValue,
                      },
                      competitorAverage: {
                        label: "Competitor Average",
                        color: getComparisonBarColors().competitorAverage,
                      },
                      topPerformer: {
                        label: "Top Performer",
                        color: getComparisonBarColors().topPerformer,
                      },
                      bottomPerformer: {
                        label: "Bottom Performer",
                        color: getComparisonBarColors().bottomPerformer,
                      },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={comparisons}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="metric" tick={{ fontSize: 12 }} width={150} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar
                          dataKey="bottomPerformer"
                          name="Bottom Performer"
                          fill={getComparisonBarColors().bottomPerformer}
                          barSize={15}
                        />
                        <Bar
                          dataKey="competitorAverage"
                          name="Competitor Average"
                          fill={getComparisonBarColors().competitorAverage}
                          barSize={15}
                        />
                        <Bar
                          dataKey="yourValue"
                          name="Your Value"
                          fill={getComparisonBarColors().yourValue}
                          barSize={15}
                        >
                          <LabelList dataKey="yourValue" position="right" />
                        </Bar>
                        <Bar
                          dataKey="topPerformer"
                          name="Top Performer"
                          fill={getComparisonBarColors().topPerformer}
                          barSize={15}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {comparisons.map((comparison, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="bg-muted/50 p-4">
                        <CardTitle className="text-base">{comparison.metric}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Your Value</p>
                            <p className="text-lg font-bold">{comparison.yourValue}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Competitor Avg</p>
                            <p className="text-lg font-medium">{comparison.competitorAverage}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Top Performer</p>
                            <p className="text-lg font-medium">{comparison.topPerformer}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Bottom Performer</p>
                            <p className="text-lg font-medium">{comparison.bottomPerformer}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
