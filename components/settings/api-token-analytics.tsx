"use client"

import { useState, useEffect } from "react"
import { format, subDays } from "date-fns"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import {
  AlertTriangle,
  Bell,
  Calendar,
  ChevronDown,
  Clock,
  Database,
  Download,
  Filter,
  Loader2,
  Plus,
  RefreshCw,
  Search,
  Server,
  Trash2,
  Zap,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import type {
  ApiRequestLog,
  ApiTokenUsage,
  ApiTokenWithUsage,
  ApiUsageFilters,
  ApiUsageThreshold,
} from "@/types/api-analytics"
import {
  fetchTokenRequestLogs,
  fetchTokenThresholds,
  fetchTokenUsage,
  formatBytes,
  formatResponseTime,
  generateDailyUsageData,
  createTokenThreshold,
  deleteTokenThreshold,
} from "@/lib/api-analytics-service"
import { DailyUsageData } from '@/lib/api-analytics-service';
import type { ApiUsageFilters as ServiceApiUsageFilters } from '@/lib/api-analytics-service';

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
}

// Status code colors
const STATUS_CODE_COLORS: Record<string, string> = {
  "2xx": CHART_COLORS.success,
  "3xx": CHART_COLORS.accent,
  "4xx": CHART_COLORS.warning,
  "5xx": CHART_COLORS.destructive,
}

interface ApiTokenAnalyticsProps {
  token: ApiTokenWithUsage
}

export function ApiTokenAnalytics({ token }: ApiTokenAnalyticsProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(false)
  const [tokenUsage, setTokenUsage] = useState<ApiTokenUsage | null>(null)
  const [requestLogs, setRequestLogs] = useState<ApiRequestLog[]>([])
  const [totalLogs, setTotalLogs] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [thresholds, setThresholds] = useState<ApiUsageThreshold[]>([])
  const [isCreatingThreshold, setIsCreatingThreshold] = useState(false)
  const [dailyUsageData, setDailyUsageData] = useState<DailyUsageData[]>([])
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

        // Load thresholds
        const tokenThresholds = await fetchTokenThresholds(token.id)
        setThresholds(tokenThresholds)
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
  }, [token.id, toast, currentPage, pageSize, filters])

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

  // Render loading state
  if (isLoading && !tokenUsage) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with refresh button */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">API Token Analytics</h2>
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logs">Request Logs</TabsTrigger>
          <TabsTrigger value="alerts">Usage Alerts</TabsTrigger>
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

          {/* Usage over time chart */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Over Time</CardTitle>
              <CardDescription>API requests per day for the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyUsageData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                    <Line
                      type="monotone"
                      dataKey="requests"
                      name="Requests"
                      stroke={CHART_COLORS.primary}
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="errors" name="Errors" stroke={CHART_COLORS.destructive} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top endpoints and error rates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Endpoints */}
            <Card>
              <CardHeader>
                <CardTitle>Top Endpoints</CardTitle>
                <CardDescription>Most frequently accessed API endpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={tokenUsage?.topEndpoints || []}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis
                        type="category"
                        dataKey="endpoint"
                        width={150}
                        tickFormatter={(value) => {
                          // Truncate long endpoint paths
                          return value.length > 20 ? value.substring(0, 20) + "..." : value
                        }}
                      />
                      <Tooltip />
                      <Bar dataKey="count" fill={CHART_COLORS.primary} name="Requests" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Error Rates */}
            <Card>
              <CardHeader>
                <CardTitle>Error Distribution</CardTitle>
                <CardDescription>Breakdown of error status codes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tokenUsage?.errorRates || []}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        nameKey="statusCode"
                        label={({ statusCode, count, percent }) => `${statusCode}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {tokenUsage?.errorRates.map((entry, index) => {
                          const statusGroup = `${Math.floor(entry.statusCode / 100)}xx`
                          return (
                            <Cell key={`cell-${index}`} fill={STATUS_CODE_COLORS[statusGroup] || CHART_COLORS.muted} />
                          )
                        })}
                      </Pie>
                      <Tooltip
                        formatter={(value: number, name: string) => [value.toLocaleString(), `Status ${name}`]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Request Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          {/* Search and filter controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch()
                    }
                  }}
                />
              </div>
              <Button variant="outline" onClick={handleSearch}>
                Search
              </Button>
            </div>

            <div className="flex gap-2">
              <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="end">
                  <div className="space-y-4">
                    <h4 className="font-medium">Filter Logs</h4>

                    {/* Date Range */}
                    <div className="space-y-2">
                      <Label>Date Range</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="justify-start text-left font-normal">
                              <Calendar className="h-4 w-4 mr-2" />
                              {filters.dateRange.from ? (
                                format(filters.dateRange.from, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={filters.dateRange.from || undefined}
                              onSelect={(date) =>
                                setFilters({
                                  ...filters,
                                  dateRange: { ...filters.dateRange, from: date === undefined ? null : date },
                                })
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="justify-start text-left font-normal">
                              <Calendar className="h-4 w-4 mr-2" />
                              {filters.dateRange.to ? format(filters.dateRange.to, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={filters.dateRange.to || undefined}
                              onSelect={(date) =>
                                setFilters({
                                  ...filters,
                                  dateRange: { ...filters.dateRange, to: date === undefined ? null : date },
                                })
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {/* HTTP Methods */}
                    <div className="space-y-2">
                      <Label>HTTP Methods</Label>
                      <div className="flex flex-wrap gap-2">
                        {["GET", "POST", "PUT", "DELETE"].map((method) => (
                          <Badge
                            key={method}
                            variant={filters.methods.includes(method) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              setFilters({
                                ...filters,
                                methods: filters.methods.includes(method)
                                  ? filters.methods.filter((m) => m !== method)
                                  : [...filters.methods, method],
                              })
                            }}
                          >
                            {method}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Status Codes */}
                    <div className="space-y-2">
                      <Label>Status Codes</Label>
                      <div className="flex flex-wrap gap-2">
                        {[200, 201, 400, 401, 403, 404, 500].map((code) => (
                          <Badge
                            key={code}
                            variant={filters.statusCodes.includes(code) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              setFilters({
                                ...filters,
                                statusCodes: filters.statusCodes.includes(code)
                                  ? filters.statusCodes.filter((c) => c !== code)
                                  : [...filters.statusCodes, code],
                              })
                            }}
                          >
                            {code}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFilters({
                            dateRange: {
                              from: subDays(new Date(), 7),
                              to: new Date(),
                            },
                            endpoints: [],
                            statusCodes: [],
                            methods: [],
                          })
                        }}
                      >
                        Reset
                      </Button>
                      <Button size="sm" onClick={handleApplyFilters}>
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button variant="outline" onClick={handleExportLogs}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Request logs table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Timestamp</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead className="w-[80px]">Method</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[120px]">Response Time</TableHead>
                    <TableHead className="w-[120px]">IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requestLogs.length > 0 ? (
                    requestLogs.map((log) => {
                      const statusCodeClass =
                        log.statusCode >= 200 && log.statusCode < 300
                          ? "text-green-600"
                          : log.statusCode >= 300 && log.statusCode < 400
                            ? "text-blue-600"
                            : log.statusCode >= 400 && log.statusCode < 500
                              ? "text-amber-600"
                              : "text-red-600"

                      return (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono text-xs">
                            {format(new Date(log.timestamp), "yyyy-MM-dd HH:mm:ss")}
                          </TableCell>
                          <TableCell className="font-mono text-xs truncate max-w-[200px]">{log.endpoint}</TableCell>
                          <TableCell className="font-mono text-xs">
                            <Badge variant="outline">{log.method}</Badge>
                          </TableCell>
                          <TableCell className={`font-mono text-xs ${statusCodeClass}`}>{log.statusCode}</TableCell>
                          <TableCell className="font-mono text-xs">{formatResponseTime(log.responseTime)}</TableCell>
                          <TableCell className="font-mono text-xs">{log.ipAddress}</TableCell>
                        </TableRow>
                      )
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                        No request logs found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between p-4 border-t">
              <div className="text-sm text-muted-foreground">
                Showing {requestLogs.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
                {Math.min(currentPage * pageSize, totalLogs)} of {totalLogs} logs
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage * pageSize >= totalLogs}
                >
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Usage Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Usage Thresholds</CardTitle>
                <CardDescription>
                  Set up alerts for when your API token usage exceeds certain thresholds
                </CardDescription>
              </div>
              <Dialog open={isCreatingThreshold} onOpenChange={setIsCreatingThreshold}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Threshold
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Usage Threshold</DialogTitle>
                    <DialogDescription>
                      Set up an alert for when your API token usage exceeds a certain threshold.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-2">
                    {/* Metric Type */}
                    <div className="space-y-2">
                      <Label htmlFor="metricType">Metric Type</Label>
                      <Select
                        value={newThreshold.metricType}
                        onValueChange={(value: any) => setNewThreshold({ ...newThreshold, metricType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select metric type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="requests">Total Requests</SelectItem>
                          <SelectItem value="errors">Error Count</SelectItem>
                          <SelectItem value="responseTime">Response Time</SelectItem>
                          <SelectItem value="dataTransfer">Data Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Threshold Value */}
                    <div className="space-y-2">
                      <Label htmlFor="threshold">Threshold Value</Label>
                      <Input
                        id="threshold"
                        type="number"
                        value={newThreshold.threshold}
                        onChange={(e) =>
                          setNewThreshold({
                            ...newThreshold,
                            threshold: Number.parseInt(e.target.value) || 0,
                          })
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        {newThreshold.metricType === "requests" && "Number of requests"}
                        {newThreshold.metricType === "errors" && "Number of error responses"}
                        {newThreshold.metricType === "responseTime" && "Average response time in ms"}
                        {newThreshold.metricType === "dataTransfer" && "Data transferred in KB"}
                      </p>
                    </div>

                    {/* Timeframe */}
                    <div className="space-y-2">
                      <Label>Timeframe</Label>
                      <RadioGroup
                        value={newThreshold.timeframe}
                        onValueChange={(value: any) => setNewThreshold({ ...newThreshold, timeframe: value })}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hour" id="timeframe-hour" />
                          <Label htmlFor="timeframe-hour">Hour</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="day" id="timeframe-day" />
                          <Label htmlFor="timeframe-day">Day</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="week" id="timeframe-week" />
                          <Label htmlFor="timeframe-week">Week</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="month" id="timeframe-month" />
                          <Label htmlFor="timeframe-month">Month</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Notification Channels */}
                    <div className="space-y-2">
                      <Label>Notification Channels</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="notify-email"
                            checked={newThreshold.notificationChannels.includes("email")}
                            onCheckedChange={(checked) => {
                              setNewThreshold({
                                ...newThreshold,
                                notificationChannels: checked
                                  ? [...newThreshold.notificationChannels.filter((c) => c !== "email"), "email"]
                                  : newThreshold.notificationChannels.filter((c) => c !== "email"),
                              })
                            }}
                          />
                          <Label htmlFor="notify-email">Email</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="notify-inapp"
                            checked={newThreshold.notificationChannels.includes("inApp")}
                            onCheckedChange={(checked) => {
                              setNewThreshold({
                                ...newThreshold,
                                notificationChannels: checked
                                  ? [...newThreshold.notificationChannels.filter((c) => c !== "inApp"), "inApp"]
                                  : newThreshold.notificationChannels.filter((c) => c !== "inApp"),
                              })
                            }}
                          />
                          <Label htmlFor="notify-inapp">In-App Notification</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreatingThreshold(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateThreshold}>Create Threshold</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {thresholds.length > 0 ? (
                <div className="space-y-4">
                  {thresholds.map((threshold) => (
                    <div
                      key={threshold.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between border rounded-md p-4 hover:bg-accent/50 transition-colors gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">
                            {threshold.metricType === "requests" && "Total Requests"}
                            {threshold.metricType === "errors" && "Error Count"}
                            {threshold.metricType === "responseTime" && "Response Time"}
                            {threshold.metricType === "dataTransfer" && "Data Transfer"}
                          </h3>
                          {threshold.notificationEnabled && (
                            <Badge variant="outline" className="text-xs">
                              <Bell className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm">
                          Alert when exceeds <span className="font-medium">{threshold.threshold.toLocaleString()}</span>{" "}
                          per <span className="font-medium">{threshold.timeframe}</span>
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          Created {format(threshold.createdAt, "PPP")}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteThreshold(threshold.id)}>
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-md">
                  <AlertTriangle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <h3 className="font-medium text-lg mb-1">No Usage Thresholds</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first usage threshold to get notified when your API token exceeds certain limits.
                  </p>
                  <Button onClick={() => setIsCreatingThreshold(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Threshold
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Usage Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Recommendations</CardTitle>
              <CardDescription>
                Suggestions to optimize your API token usage based on your current patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Server className="h-4 w-4" />
                <AlertTitle>High error rate detected</AlertTitle>
                <AlertDescription>
                  Your token has a{" "}
                  {tokenUsage ? ((tokenUsage.failedRequests / tokenUsage.totalRequests) * 100).toFixed(1) : 0}% error
                  rate. Consider reviewing the most common error responses.
                </AlertDescription>
              </Alert>

              <Alert>
                <Zap className="h-4 w-4" />
                <AlertTitle>Response time optimization</AlertTitle>
                <AlertDescription>
                  The average response time is {tokenUsage ? formatResponseTime(tokenUsage.averageResponseTime) : "0ms"}
                  . Consider implementing caching for frequently accessed endpoints.
                </AlertDescription>
              </Alert>

              <Alert>
                <Database className="h-4 w-4" />
                <AlertTitle>Data transfer optimization</AlertTitle>
                <AlertDescription>
                  You've transferred {tokenUsage ? formatBytes(tokenUsage.totalDataTransferred) : "0 Bytes"} of data.
                  Consider using pagination or field filtering to reduce payload sizes.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
