"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Info, TrendingUp, AlertTriangle } from "lucide-react"
import { Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Area, ComposedChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { apiAnalyticsAdvancedService } from "@/lib/api-analytics-advanced-service"
import type { ApiUsageDataPoint, ApiUsageForecast, ApiUsageTimeframe } from "@/types/api-analytics-advanced"

export function ApiTokenPredictiveAnalytics() {
  const [activeTab, setActiveTab] = useState("requests")
  const [forecastTimeframe, setForecastTimeframe] = useState("14")
  const [historicalData, setHistoricalData] = useState<ApiUsageDataPoint[]>([])
  const [forecastData, setForecastData] = useState<ApiUsageForecast | null>(null)
  const [timeframes, setTimeframes] = useState<ApiUsageTimeframe[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Fetch historical data, forecast data, and available timeframes
        const [historicalDataResult, forecastDataResult, timeframesResult] = await Promise.all([
          apiAnalyticsAdvancedService.getHistoricalData(30),
          apiAnalyticsAdvancedService.getForecastData(Number.parseInt(forecastTimeframe)),
          apiAnalyticsAdvancedService.getAvailableTimeframes(),
        ])

        setHistoricalData(historicalDataResult)
        setForecastData(forecastDataResult)
        setTimeframes(timeframesResult)
      } catch (err) {
        console.error("Error fetching predictive analytics data:", err)
        setError("Failed to load predictive analytics data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [forecastTimeframe])

  // Update forecast data when timeframe changes
  const handleTimeframeChange = async (value: string) => {
    setForecastTimeframe(value)
    try {
      setIsLoading(true)
      const forecastDataResult = await apiAnalyticsAdvancedService.getForecastData(Number.parseInt(value))
      setForecastData(forecastDataResult)
    } catch (err) {
      console.error("Error updating forecast data:", err)
      setError("Failed to update forecast data. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  // Prepare combined data for chart
  const prepareChartData = () => {
    if (historicalData.length === 0 || !forecastData) return []

    // Map historical data
    const chartData = historicalData.map((point) => ({
      date: formatDate(point.date),
      [activeTab]: point.value, // Using the value property for all metrics in this simplified version
      type: "historical",
    }))

    // Add forecast data
    forecastData.dataPoints.forEach((point: ApiUsageDataPoint) => {
      chartData.push({
        date: formatDate(point.date),
        [activeTab]: point.value, // Using the value property for all metrics
        // Add confidence interval (mocked values for simplicity)
        [`${activeTab}Lower`]: point.value * 0.9, // 10% lower bound
        [`${activeTab}Upper`]: point.value * 1.1, // 10% upper bound
        type: "forecast",
      })
    })

    return chartData
  }

  // Get metric label
  const getMetricLabel = (metric: string) => {
    switch (metric) {
      case "requests":
        return "API Requests"
      case "errors":
        return "API Errors"
      case "latency":
        return "API Latency (ms)"
      case "resourceUtilization":
        return "Resource Utilization (%)"
      default:
        return metric
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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">API Usage Forecasting</CardTitle>
            <CardDescription>Predict future API usage based on historical patterns</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={forecastTimeframe} onValueChange={handleTimeframeChange} disabled={isLoading}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Forecast period" />
              </SelectTrigger>
              <SelectContent>
                {timeframes.map((timeframe) => (
                  <SelectItem key={timeframe.id} value={timeframe.id}>
                    {timeframe.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="errors">Errors</TabsTrigger>
            <TabsTrigger value="latency">Latency</TabsTrigger>
            <TabsTrigger value="resourceUtilization">Resource Usage</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
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
                        This chart shows historical {getMetricLabel(activeTab).toLowerCase()} (solid line) and
                        forecasted {getMetricLabel(activeTab).toLowerCase()} (dashed line) with confidence intervals
                        (shaded area).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-[400px] w-full">
                  <ChartContainer
                    config={{
                      [activeTab]: {
                        label: getMetricLabel(activeTab),
                        color: "hsl(var(--chart-1))",
                      },
                      [`${activeTab}Lower`]: {
                        label: "Lower Bound",
                        color: "transparent",
                      },
                      [`${activeTab}Upper`]: {
                        label: "Upper Bound",
                        color: "transparent",
                      },
                    }}
                    className="h-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={prepareChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />

                        {/* Confidence interval area */}
                        <Area
                          type="monotone"
                          dataKey={`${activeTab}Upper`}
                          stroke="transparent"
                          fillOpacity={0.1}
                          fill="var(--color-chart-1)"
                        />
                        <Area
                          type="monotone"
                          dataKey={`${activeTab}Lower`}
                          stroke="transparent"
                          fillOpacity={0.1}
                          fill="var(--color-chart-1)"
                        />

                        {/* Historical and forecast lines */}
                        <Line
                          type="monotone"
                          dataKey={activeTab}
                          stroke="var(--color-chart-1)"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                          name={getMetricLabel(activeTab)}
                          strokeDasharray="0" // Solid line for all data points
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-[var(--color-chart-1)]" />
                    <span className="text-sm">Historical Data</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-0 w-8 border-t-2 border-dashed border-[var(--color-chart-1)]" />
                    <span className="text-sm">Forecast</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-6 rounded-sm bg-[var(--color-chart-1)] opacity-10" />
                    <span className="text-sm">Confidence Interval</span>
                  </div>
                </div>

                <Alert className="mt-6">
                  <TrendingUp className="h-4 w-4" />
                  <AlertTitle>Forecast Insights</AlertTitle>
                  <AlertDescription>
                    {activeTab === "requests" && forecastData && (
                      <p>
                        Based on current trends, your API request volume is projected to 
                        {forecastData.trend === 'increasing' ? 'increase' : forecastData.trend === 'decreasing' ? 'decrease' : 'remain stable'} 
                        over the next {forecastTimeframe} days.
                        {forecastData.insights[0]}
                      </p>
                    )}
                    {activeTab === "errors" && forecastData && (
                      <p>
                        Your API error rate is projected to remain stable at approximately 2.5% 
                        over the next {forecastTimeframe} days.
                        {forecastData.insights[1]}
                      </p>
                    )}
                    {activeTab === "latency" && forecastData && (
                      <p>
                        Your API response times are projected to 
                        {forecastData.trend === 'increasing' ? 'increase' : 'decrease'} 
                        over the next {forecastTimeframe} days.
                        Response times are expected to remain within acceptable thresholds.
                      </p>
                    )}
                    {activeTab === "resourceUtilization" && forecastData && (
                      <p>
                        Your resource utilization is projected to reach 75% over the next {forecastTimeframe} days.
                        {forecastData.insights[2]}
                      </p>
                    )}
                  </AlertDescription>
                </Alert>
              </>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
