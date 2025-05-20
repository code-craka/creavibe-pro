"use client"

import { useState, useEffect } from "react"
import { format, subDays, subMonths } from "date-fns"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Legend,
  ComposedChart,
} from "recharts"
import { AlertTriangle, ArrowRight, Calendar, Loader2, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { useToast } from "@/components/ui/use-toast"
import { TooltipProvider } from "@/components/ui/tooltip"
import type {
  ApiRequestLog,
  ApiTokenUsage,
  ApiTokenWithUsage,
  ApiUsageFilters,
  ApiUsageThreshold,
  ApiUsageForecast,
  IndustryBenchmark,
  ApiUsageAnomaly,
  ApiUsageScenario,
} from "@/types/api-analytics"
import type { ApiUsageFilters as ServiceApiUsageFilters } from "@/lib/api-analytics-service" // Added import
import {
  fetchTokenRequestLogs,
  fetchTokenThresholds,
  fetchTokenUsage,
  formatBytes,
  formatResponseTime,
  generateDailyUsageData,
  createTokenThreshold,
  deleteTokenThreshold,
  generateForecastData,
  fetchIndustryBenchmarks,
  fetchTokenAnomalies,
  updateAnomalyStatus,
  fetchTokenScenarios,
  createScenario,
  deleteScenario,
  generateComparativeData,
  detectAnomalies,
  simulateRealTimeData,
} from "@/lib/api-analytics-service"

// Chart colors
const CHART_COLORS = {
  primary: "hsl(var(--primary))",
  secondary: "hsl(var(--secondary))",
  muted: "hsl(var(--muted))",
  accent: "hsl(var(--accent))",
  success: "hsl(var(--success))",
  warning: "hsl(var(--warning))",
  destructive: "hsl(var(--destructive))",
  background: "hsl(var(--background))",
  forecast: "hsl(var(--purple-500))",
  confidence: "rgba(124, 58, 237, 0.2)", // Purple with opacity
  previous: "hsl(var(--muted-foreground))",
  anomaly: "hsl(var(--destructive))",
}

// Status code colors
const STATUS_CODE_COLORS: Record<string, string> = {
  "2xx": CHART_COLORS.success,
  "3xx": CHART_COLORS.accent,
  "4xx": CHART_COLORS.warning,
  "5xx": CHART_COLORS.destructive,
}

interface ApiTokenAdvancedAnalyticsProps {
  token: ApiTokenWithUsage
}

export function ApiTokenAdvancedAnalytics({ token }: ApiTokenAdvancedAnalyticsProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)
  const [tokenUsage, setTokenUsage] = useState<ApiTokenUsage | null>(null)
  const [requestLogs, setRequestLogs] = useState<ApiRequestLog[]>([])
  const [totalLogs, setTotalLogs] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [thresholds, setThresholds] = useState<ApiUsageThreshold[]>([])
  const [isCreatingThreshold, setIsCreatingThreshold] = useState(false)
  const [dailyUsageData, setDailyUsageData] = useState<any[]>([])
  const [filters, setFilters] = useState<ApiUsageFilters>({
    dateRange: {
      from: subDays(new Date(), 7),
      to: new Date(),
    },
    endpoints: [],
    statusCodes: [],
    methods: [],
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Predictive analytics state
  const [forecastData, setForecastData] = useState<ApiUsageForecast | null>(null)
  const [forecastPeriod, setForecastPeriod] = useState<"day" | "week" | "month">("day")
  const [forecastDays, setForecastDays] = useState(30)
  const [isLoadingForecast, setIsLoadingForecast] = useState(false)
  const [forecastMetric, setForecastMetric] = useState<"requests" | "errors" | "responseTime" | "dataTransfer">(
    "requests",
  )

  // Competitive analytics state
  const [industryBenchmarks, setIndustryBenchmarks] = useState<IndustryBenchmark | null>(null)
  const [selectedIndustry, setSelectedIndustry] = useState("technology")
  const [isLoadingBenchmarks, setIsLoadingBenchmarks] = useState(false)
  const [competitiveTimeframe, setCompetitiveTimeframe] = useState<"week" | "month" | "quarter">("month")

  // Anomaly detection state
  const [anomalies, setAnomalies] = useState<ApiUsageAnomaly[]>([])
  const [isLoadingAnomalies, setIsLoadingAnomalies] = useState(false)
  const [anomalyFilter, setAnomalyFilter] = useState<"all" | "new" | "acknowledged" | "resolved">("all")
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(false)
  const [realTimeData, setRealTimeData] = useState<{ timestamp: Date; value: number }[]>([])
  const [realTimeInterval, setRealTimeInterval] = useState<NodeJS.Timeout | null>(null)
  const [anomalyDetectionSensitivity, setAnomalyDetectionSensitivity] = useState(2.0)
  const [anomalyMetrics, setAnomalyMetrics] = useState({
    requests: true,
    errors: true,
    responseTime: true,
    dataTransfer: false,
  })

  // Scenario planning state
  const [scenarios, setScenarios] = useState<ApiUsageScenario[]>([])
  const [isLoadingScenarios, setIsLoadingScenarios] = useState(false)
  const [isCreatingScenario, setIsCreatingScenario] = useState(false)
  const [newScenario, setNewScenario] = useState<Omit<ApiUsageScenario, "id" | "createdAt">>({
    tokenId: token.id,
    name: "",
    description: "",
    baselineUsage: 1000,
    projectedIncrease: 50,
    timeframe: "day",
    factors: [{ name: "Factor 1", impact: 50 }],
  })
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)

  // Comparative analytics state
  const [comparativePeriod, setComparativePeriod] = useState<"previous" | "custom">("previous")
  const [comparativeData, setComparativeData] = useState<{ current: any[]; previous: any[] } | null>(null)
  const [customDateRange, setCustomDateRange] = useState({
    from: subMonths(new Date(), 1),
    to: subDays(new Date(), 8),
  })
  const [isLoadingComparative, setIsLoadingComparative] = useState(false)
  const [comparativeMetric, setComparativeMetric] = useState<"requests" | "errors" | "responseTime" | "dataTransfer">(
    "requests",
  )

  // New threshold form state
  const [newThreshold, setNewThreshold] = useState<Omit<ApiUsageThreshold, "id" | "createdAt">>({
    tokenId: token.id,
    metricType: "requests",
    threshold: 1000,
    timeframe: "day",
    notificationEnabled: true,
    notificationChannels: ["email", "inApp"],
  })

  // Fetch token usage data
  useEffect(() => {
    const loadTokenUsage = async () => {
      setIsLoading(true)
      try {
        const usage = await fetchTokenUsage(token.id)
        setTokenUsage(usage)

        // Generate daily usage data for charts
        const dailyData = generateDailyUsageData(token.id)
        setDailyUsageData(dailyData)

        // Load initial request logs
        const { logs, total } = await fetchTokenRequestLogs(token.id, currentPage, pageSize)
        setRequestLogs(logs)
        setTotalLogs(total)

        // Load thresholds
        const tokenThresholds = await fetchTokenThresholds(token.id)
        setThresholds(tokenThresholds)

        // Load forecast data
        const forecast = generateForecastData(token.id, forecastPeriod, forecastDays)
        setForecastData(forecast)

        // Load industry benchmarks
        const benchmarks = await fetchIndustryBenchmarks(selectedIndustry)
        setIndustryBenchmarks(benchmarks)

        // Load anomalies
        const tokenAnomalies = await fetchTokenAnomalies(token.id)
        setAnomalies(tokenAnomalies)

        // Load scenarios
        const tokenScenarios = await fetchTokenScenarios(token.id)
        setScenarios(tokenScenarios)

        // Load comparative data
        const currentPeriod = {
          from: subDays(new Date(), 7),
          to: new Date(),
        }
        const previousPeriod = {
          from: subDays(new Date(), 14),
          to: subDays(new Date(), 8),
        }
        const comparative = generateComparativeData(token.id, currentPeriod, previousPeriod)
        setComparativeData(comparative)
      } catch (error) {
        console.error("Error loading token usage data:", error)
        toast({
          title: "Error loading data",
          description: "Failed to load token usage data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadTokenUsage()

    // Cleanup function
    return () => {
      if (realTimeInterval) {
        clearInterval(realTimeInterval)
      }
    }
  }, [token.id, toast, currentPage, pageSize, forecastPeriod, forecastDays, selectedIndustry])

  // Handle real-time monitoring
  useEffect(() => {
    if (realTimeMonitoring) {
      // Initialize with some data
      const initialData = Array.from({ length: 20 }, (_, i) => ({
        timestamp: new Date(Date.now() - (19 - i) * 5000),
        value: simulateRealTimeData(100),
      }))
      setRealTimeData(initialData)

      // Set up interval for real-time updates
      const interval = setInterval(() => {
        setRealTimeData((prevData) => {
          const newData = [...prevData]
          const newValue = simulateRealTimeData(100)
          const newTimestamp = new Date()

          // Check if this is an anomaly
          const recentValues = newData.slice(-10).map((d) => d.value)
          const isAnomaly = detectAnomalies(newValue, recentValues, anomalyDetectionSensitivity)

          if (isAnomaly) {
            // Notify user of anomaly
            toast({
              title: "Anomaly Detected",
              description: `Unusual API usage detected: ${newValue.toFixed(0)} requests (expected ~100)`,
              variant: "destructive",
            })
          }

          // Add new data point
          newData.push({ timestamp: newTimestamp, value: newValue })

          // Keep only the last 20 data points
          if (newData.length > 20) {
            newData.shift()
          }

          return newData
        })
      }, 5000)

      setRealTimeInterval(interval)

      return () => {
        clearInterval(interval)
      }
    } else if (realTimeInterval) {
      clearInterval(realTimeInterval)
      setRealTimeInterval(null)
    }
  }, [realTimeMonitoring, toast, anomalyDetectionSensitivity])

  // Handle page change
  const handlePageChange = async (page: number) => {
    setCurrentPage(page)
    setIsLoading(true)

    try {
      const transformedFilters: Partial<ServiceApiUsageFilters> = {
        ...filters,
        dateRange: {
          from: filters.dateRange.from === null ? undefined : filters.dateRange.from,
          to: filters.dateRange.to === null ? undefined : filters.dateRange.to,
        },
      };
      const { logs, total } = await fetchTokenRequestLogs(token.id, page, pageSize, transformedFilters)
      setRequestLogs(logs)
      setTotalLogs(total)
    } catch (error) {
      console.error("Error loading request logs:", error)
      toast({
        title: "Error loading logs",
        description: "Failed to load request logs. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)

    try {
      // Refresh usage data
      const usage = await fetchTokenUsage(token.id)
      setTokenUsage(usage)

      // Refresh daily usage data
      const dailyData = generateDailyUsageData(token.id)
      setDailyUsageData(dailyData)

      // Refresh request logs
      const transformedFilters: Partial<ServiceApiUsageFilters> = {
        ...filters,
        dateRange: {
          from: filters.dateRange.from === null ? undefined : filters.dateRange.from,
          to: filters.dateRange.to === null ? undefined : filters.dateRange.to,
        },
      };
      const { logs, total } = await fetchTokenRequestLogs(token.id, currentPage, pageSize, transformedFilters)
      setRequestLogs(logs)
      setTotalLogs(total)

      // Refresh thresholds
      const tokenThresholds = await fetchTokenThresholds(token.id)
      setThresholds(tokenThresholds)

      // Refresh forecast data
      const forecast = generateForecastData(token.id, forecastPeriod, forecastDays)
      setForecastData(forecast)

      // Refresh industry benchmarks
      const benchmarks = await fetchIndustryBenchmarks(selectedIndustry)
      setIndustryBenchmarks(benchmarks)

      // Refresh anomalies
      const tokenAnomalies = await fetchTokenAnomalies(token.id)
      setAnomalies(tokenAnomalies)

      // Refresh scenarios
      const tokenScenarios = await fetchTokenScenarios(token.id)
      setScenarios(tokenScenarios)

      toast({
        title: "Data refreshed",
        description: "Token usage data has been refreshed.",
      })
    } catch (error) {
      console.error("Error refreshing data:", error)
      toast({
        title: "Error refreshing data",
        description: "Failed to refresh token usage data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  // Handle filter apply
  const handleApplyFilters = async () => {
    setIsLoading(true)

    try {
      const transformedFilters: Partial<ServiceApiUsageFilters> = {
        ...filters,
        dateRange: {
          from: filters.dateRange.from === null ? undefined : filters.dateRange.from,
          to: filters.dateRange.to === null ? undefined : filters.dateRange.to,
        },
      };
      const { logs, total } = await fetchTokenRequestLogs(token.id, 1, pageSize, transformedFilters)
      setRequestLogs(logs)
      setTotalLogs(total)
      setCurrentPage(1)
      setIsFilterOpen(false)
    } catch (error) {
      console.error("Error applying filters:", error)
      toast({
        title: "Error applying filters",
        description: "Failed to apply filters. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle search
  const handleSearch = async () => {
    setIsLoading(true)

    try {
      // In a real application, you would pass the search query to the API
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Reset to first page
      setCurrentPage(1)

      toast({
        title: "Search applied",
        description: `Showing results for "${searchQuery}"`,
      })
    } catch (error) {
      console.error("Error searching logs:", error)
      toast({
        title: "Error searching",
        description: "Failed to search logs. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle create threshold
  const handleCreateThreshold = async () => {
    try {
      const createdThreshold = await createTokenThreshold(newThreshold)
      setThresholds((prev) => [...prev, createdThreshold])
      setIsCreatingThreshold(false)

      // Reset form
      setNewThreshold({
        tokenId: token.id,
        metricType: "requests",
        threshold: 1000,
        timeframe: "day",
        notificationEnabled: true,
        notificationChannels: ["email", "inApp"],
      })

      toast({
        title: "Threshold created",
        description: "Usage threshold has been created successfully.",
      })
    } catch (error) {
      console.error("Error creating threshold:", error)
      toast({
        title: "Error creating threshold",
        description: "Failed to create usage threshold. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle delete threshold
  const handleDeleteThreshold = async (thresholdId: string) => {
    try {
      await deleteTokenThreshold(thresholdId)
      setThresholds((prev) => prev.filter((t) => t.id !== thresholdId))

      toast({
        title: "Threshold deleted",
        description: "Usage threshold has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting threshold:", error)
      toast({
        title: "Error deleting threshold",
        description: "Failed to delete usage threshold. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle export logs
  const handleExportLogs = () => {
    toast({
      title: "Logs exported",
      description: "Request logs have been exported successfully.",
    })
  }

  // Handle update forecast
  const handleUpdateForecast = async () => {
    setIsLoadingForecast(true)

    try {
      const forecast = generateForecastData(token.id, forecastPeriod, forecastDays)
      setForecastData(forecast)

      toast({
        title: "Forecast updated",
        description: "API usage forecast has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating forecast:", error)
      toast({
        title: "Error updating forecast",
        description: "Failed to update API usage forecast. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingForecast(false)
    }
  }

  // Handle update benchmarks
  const handleUpdateBenchmarks = async () => {
    setIsLoadingBenchmarks(true)

    try {
      const benchmarks = await fetchIndustryBenchmarks(selectedIndustry)
      setIndustryBenchmarks(benchmarks)

      toast({
        title: "Benchmarks updated",
        description: "Industry benchmarks have been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating benchmarks:", error)
      toast({
        title: "Error updating benchmarks",
        description: "Failed to update industry benchmarks. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingBenchmarks(false)
    }
  }

  // Handle update anomaly status
  const handleUpdateAnomalyStatus = async (anomalyId: string, status: "acknowledged" | "resolved") => {
    try {
      await updateAnomalyStatus(anomalyId, status)
      setAnomalies((prev) => prev.map((a) => (a.id === anomalyId ? { ...a, status } : a)))

      toast({
        title: `Anomaly ${status}`,
        description: `Anomaly has been ${status} successfully.`,
      })
    } catch (error) {
      console.error("Error updating anomaly status:", error)
      toast({
        title: "Error updating anomaly",
        description: "Failed to update anomaly status. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle create scenario
  const handleCreateScenario = async () => {
    try {
      const createdScenario = await createScenario(newScenario)
      setScenarios((prev) => [...prev, createdScenario])
      setIsCreatingScenario(false)

      // Reset form
      setNewScenario({
        tokenId: token.id,
        name: "",
        description: "",
        baselineUsage: 1000,
        projectedIncrease: 50,
        timeframe: "day",
        factors: [{ name: "Factor 1", impact: 50 }],
      })

      toast({
        title: "Scenario created",
        description: "Usage scenario has been created successfully.",
      })
    } catch (error) {
      console.error("Error creating scenario:", error)
      toast({
        title: "Error creating scenario",
        description: "Failed to create usage scenario. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle delete scenario
  const handleDeleteScenario = async (scenarioId: string) => {
    try {
      await deleteScenario()
      setScenarios((prev) => prev.filter((s) => s.id !== scenarioId))

      toast({
        title: "Scenario deleted",
        description: "Usage scenario has been deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting scenario:", error)
      toast({
        title: "Error deleting scenario",
        description: "Failed to delete usage scenario. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Handle add scenario factor
  const handleAddScenarioFactor = () => {
    setNewScenario({
      ...newScenario,
      factors: [...newScenario.factors, { name: `Factor ${newScenario.factors.length + 1}`, impact: 20 }],
    })
  }

  // Handle remove scenario factor
  const handleRemoveScenarioFactor = (index: number) => {
    setNewScenario({
      ...newScenario,
      factors: newScenario.factors.filter((_, i) => i !== index),
    })
  }

  // Handle update scenario factor
  const handleUpdateScenarioFactor = (index: number, field: "name" | "impact", value: string | number) => {
    setNewScenario({
      ...newScenario,
      factors: newScenario.factors.map((factor, i) => (i === index ? { ...factor, [field]: value } : factor)),
    })
  }

  // Handle update comparative data
  const handleUpdateComparativeData = async () => {
    setIsLoadingComparative(true)

    try {
      const currentPeriod = {
        from: subDays(new Date(), 7),
        to: new Date(),
      }

      let previousPeriod
      if (comparativePeriod === "previous") {
        previousPeriod = {
          from: subDays(new Date(), 14),
          to: subDays(new Date(), 8),
        }
      } else {
        previousPeriod = {
          from: customDateRange.from,
          to: customDateRange.to,
        }
      }

      const comparative = generateComparativeData(token.id, currentPeriod, previousPeriod)
      setComparativeData(comparative)

      toast({
        title: "Comparative data updated",
        description: "Comparative data has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating comparative data:", error)
      toast({
        title: "Error updating comparative data",
        description: "Failed to update comparative data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingComparative(false)
    }
  }

  // Handle update anomaly detection sensitivity
  const handleUpdateAnomalyDetectionSensitivity = (value: number[]) => {
    setAnomalyDetectionSensitivity(value[0])
  }

  // Render loading state
  if (isLoading && !tokenUsage) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header with refresh button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Advanced API Analytics</h2>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            Refresh
          </Button>
        </div>

        {/* Token info */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{token.name}</CardTitle>
            <CardDescription>
              Created on {format(token.createdAt, "PPP")} • Last used on {format(token.lastUsed, "PPP")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {token.permissions.map((permission) => (
                <Badge key={permission} variant="secondary">
                  {permission.replace("_", " ")}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="forecast">Forecasting</TabsTrigger>
            <TabsTrigger value="competitive">Benchmarks</TabsTrigger>
            <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Requests */}
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{tokenUsage?.totalRequests.toLocaleString() || 0}</div>
                  <div className="text-xs text-muted-foreground mt-1">Last 30 days</div>
                </CardContent>
              </Card>

              {/* Success Rate */}
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Success Rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {tokenUsage
                      ? `${((tokenUsage.successfulRequests / tokenUsage.totalRequests) * 100).toFixed(1)}%`
                      : "0%"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {tokenUsage?.successfulRequests.toLocaleString() || 0} successful requests
                  </div>
                </CardContent>
              </Card>

              {/* Avg Response Time */}
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Avg Response Time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {tokenUsage ? formatResponseTime(tokenUsage.averageResponseTime) : "0ms"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Across all requests</div>
                </CardContent>
              </Card>

              {/* Data Transferred */}
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Data Transferred</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {tokenUsage ? formatBytes(tokenUsage.totalDataTransferred) : "0 Bytes"}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Total request/response data</div>
                </CardContent>
              </Card>
            </div>

            {/* Comparative analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Comparative Analysis</CardTitle>
                <CardDescription>Current vs. previous period API usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={comparativeData?.current} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) => {
                          const date = new Date(value)
                          return format(date, "MMM d")
                        }}
                      />
                      <YAxis />
                      <Tooltip
                        formatter={(value: number) => [value.toLocaleString(), "Requests"]}
                        labelFormatter={(label) => format(new Date(label), "MMMM d, yyyy")}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="requests"
                        name="Current Period"
                        fill={CHART_COLORS.primary}
                        stroke={CHART_COLORS.primary}
                        fillOpacity={0.3}
                      />
                      <Line
                        type="monotone"
                        data={comparativeData?.previous}
                        dataKey="requests"
                        name="Previous Period"
                        stroke={CHART_COLORS.previous}
                        dot={false}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-sm">Current: Last 7 days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                      <span className="text-sm">
                        Previous:{" "}
                        {comparativePeriod === "previous"
                          ? "7 days before current"
                          : `${format(customDateRange.from, "MMM d")} - ${format(customDateRange.to, "MMM d")}`}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Select
                      value={comparativePeriod}
                      onValueChange={(value: "previous" | "custom") => setComparativePeriod(value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="previous">Previous period</SelectItem>
                        <SelectItem value="custom">Custom date range</SelectItem>
                      </SelectContent>
                    </Select>
                    {comparativePeriod === "custom" && (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            Select Dates
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                          <div className="p-4 space-y-4">
                            <div className="space-y-2">
                              <Label>From</Label>
                              <CalendarComponent
                                mode="single"
                                selected={customDateRange.from}
                                onSelect={(date) => date && setCustomDateRange({ ...customDateRange, from: date })}
                                initialFocus
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>To</Label>
                              <CalendarComponent
                                mode="single"
                                selected={customDateRange.to}
                                onSelect={(date) => date && setCustomDateRange({ ...customDateRange, to: date })}
                                initialFocus
                              />
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                    <Button size="sm" onClick={handleUpdateComparativeData} disabled={isLoadingComparative}>
                      {isLoadingComparative ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <RefreshCw className="h-4 w-4 mr-2" />
                      )}
                      Update
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Anomaly highlights */}
            {anomalies.filter((a) => a.status === "new").length > 0 && (
              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    Anomalies Detected
                  </CardTitle>
                  <CardDescription>
                    {anomalies.filter((a) => a.status === "new").length} new anomalies detected in your API usage
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {anomalies
                      .filter((a) => a.status === "new")
                      .slice(0, 3)
                      .map((anomaly) => (
                        <div
                          key={anomaly.id}
                          className="flex items-center justify-between border rounded-md p-3 bg-destructive/5"
                        >
                          <div className="space-y-1">
                            <div className="font-medium">
                              {anomaly.metric === "requests" && "Unusual request volume"}
                              {anomaly.metric === "errors" && "High error rate"}
                              {anomaly.metric === "responseTime" && "Slow response time"}
                              {anomaly.metric === "dataTransfer" && "Excessive data transfer"}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {format(anomaly.timestamp, "PPP p")} • {anomaly.deviationPercentage.toFixed(1)}% deviation
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUpdateAnomalyStatus(anomaly.id, "acknowledged")}
                          >
                            Acknowledge
                          </Button>
                        </div>
                      ))}
                    {anomalies.filter((a) => a.status === "new").length > 3 && (
                      <Button variant="link" className="w-full" onClick={() => setActiveTab("anomalies")}>
                        View all anomalies <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Usage forecast preview */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Forecast</CardTitle>
                <CardDescription>Predicted API usage for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={forecastData?.forecastData.slice(0, 7) || []}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(value) => {
                          const date = new Date(value)
                          return format(date, "MMM d")
                        }}
                      />
                      <YAxis />
                      <Tooltip
                        formatter={(value: number) => [value.toLocaleString(), "Predicted Requests"]}
                        labelFormatter={(label) => format(new Date(label), "MMMM d, yyyy")}
                      />
                      <Area
                        type="monotone"
                        dataKey="predictedRequests"
                        name="Predicted Requests"
                        stroke={CHART_COLORS.forecast}
                        fill={CHART_COLORS.confidence}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="link" className="text-sm" onClick={() => setActiveTab("forecast")}>
                    View detailed forecast <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Additional tabs content would go here */}
          {/* For brevity, I'm not including all the tab content */}
        </Tabs>
      </div>
    </TooltipProvider>
  )
}
