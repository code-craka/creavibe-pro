"use client"

import { useState } from "react"
import {
  BarChart,
  LineChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AlertTriangle, ArrowUpRight, BarChart3, Bell, Download, RefreshCw, Settings, Share2, Zap } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for API usage
const apiUsageData = [
  { name: "Jan", requests: 4000, errors: 240, latency: 35 },
  { name: "Feb", requests: 3000, errors: 198, latency: 42 },
  { name: "Mar", requests: 2000, errors: 980, latency: 51 },
  { name: "Apr", requests: 2780, errors: 390, latency: 39 },
  { name: "May", requests: 1890, errors: 480, latency: 45 },
  { name: "Jun", requests: 2390, errors: 380, latency: 41 },
  { name: "Jul", requests: 3490, errors: 430, latency: 38 },
  { name: "Aug", requests: 4000, errors: 200, latency: 36 },
  { name: "Sep", requests: 5000, errors: 189, latency: 32 },
  { name: "Oct", requests: 6000, errors: 239, latency: 30 },
  { name: "Nov", requests: 7000, errors: 349, latency: 29 },
  { name: "Dec", requests: 9000, errors: 278, latency: 28 },
]

// Mock data for endpoint distribution
const endpointData = [
  { name: "Content Generation", value: 400 },
  { name: "User Management", value: 300 },
  { name: "Analytics", value: 300 },
  { name: "Authentication", value: 200 },
  { name: "Storage", value: 100 },
]

// Mock data for anomalies
const anomalyData = [
  {
    id: 1,
    timestamp: "2023-12-01 08:23:15",
    endpoint: "/api/content/generate",
    metric: "Latency",
    value: "320ms",
    threshold: "200ms",
    severity: "High",
  },
  {
    id: 2,
    timestamp: "2023-12-02 14:45:32",
    endpoint: "/api/auth/login",
    metric: "Error Rate",
    value: "8.5%",
    threshold: "5%",
    severity: "Medium",
  },
  {
    id: 3,
    timestamp: "2023-12-03 19:12:08",
    endpoint: "/api/analytics/report",
    metric: "Request Count",
    value: "1,245",
    threshold: "1,000",
    severity: "Low",
  },
]

// Mock data for forecasting
const forecastData = [
  { name: "Jan", actual: 4000, forecast: 4200 },
  { name: "Feb", actual: 3000, forecast: 3100 },
  { name: "Mar", actual: 2000, forecast: 2200 },
  { name: "Apr", actual: 2780, forecast: 2900 },
  { name: "May", actual: 1890, forecast: 2000 },
  { name: "Jun", actual: 2390, forecast: 2500 },
  { name: "Jul", actual: 3490, forecast: 3600 },
  { name: "Aug", actual: 4000, forecast: 4100 },
  { name: "Sep", actual: 5000, forecast: 5200 },
  { name: "Oct", actual: 6000, forecast: 6300 },
  { name: "Nov", actual: null, forecast: 7200 },
  { name: "Dec", actual: null, forecast: 8400 },
]

// Colors for pie chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function ApiAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("year")
  const [refreshing, setRefreshing] = useState(false)
  const [alertsEnabled, setAlertsEnabled] = useState(true)

  const handleRefresh = () => {
    setRefreshing(true)
    // Simulate API refresh
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Analytics Dashboard</h1>
          <p className="text-muted-foreground">Monitor your API usage, performance metrics, and detect anomalies</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24 hours</SelectItem>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 90 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total API Requests</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284,943</div>
            <p className="text-xs text-muted-foreground">+20.1% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127ms</div>
            <p className="text-xs text-muted-foreground">-5.2% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <p className="text-xs text-muted-foreground">+0.3% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tokens</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">+4 from last period</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Usage Trends</CardTitle>
              <CardDescription>Total requests, errors, and average latency over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  requests: {
                    label: "Requests",
                    color: "hsl(var(--chart-1))",
                  },
                  errors: {
                    label: "Errors",
                    color: "hsl(var(--chart-2))",
                  },
                  latency: {
                    label: "Avg. Latency (ms)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={apiUsageData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="requests"
                      stroke="var(--color-requests)"
                      activeDot={{ r: 8 }}
                    />
                    <Line yAxisId="left" type="monotone" dataKey="errors" stroke="var(--color-errors)" />
                    <Line yAxisId="right" type="monotone" dataKey="latency" stroke="var(--color-latency)" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Endpoint Distribution</CardTitle>
                <CardDescription>API requests by endpoint category</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={endpointData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {endpointData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error Distribution</CardTitle>
                <CardDescription>API errors by status code</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "400", value: 240 },
                      { name: "401", value: 120 },
                      { name: "403", value: 80 },
                      { name: "404", value: 180 },
                      { name: "429", value: 320 },
                      { name: "500", value: 150 },
                      { name: "502", value: 90 },
                      { name: "504", value: 60 },
                    ]}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#ff4d4f" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Endpoints Tab */}
        <TabsContent value="endpoints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Endpoint Performance</CardTitle>
              <CardDescription>Response time and request volume by endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Input placeholder="Search endpoints..." className="max-w-sm" />
                  <Select defaultValue="latency">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latency">Latency</SelectItem>
                      <SelectItem value="volume">Request Volume</SelectItem>
                      <SelectItem value="errors">Error Rate</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  {[
                    { name: "/api/content/generate", latency: "145ms", volume: "452,120", errorRate: "1.2%" },
                    { name: "/api/auth/login", latency: "87ms", volume: "325,430", errorRate: "0.8%" },
                    { name: "/api/projects/list", latency: "210ms", volume: "215,672", errorRate: "2.1%" },
                    { name: "/api/analytics/report", latency: "320ms", volume: "124,890", errorRate: "3.5%" },
                    { name: "/api/users/profile", latency: "95ms", volume: "98,452", errorRate: "0.5%" },
                  ].map((endpoint, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                          <div>
                            <h3 className="font-medium">{endpoint.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>Latency: {endpoint.latency}</span>
                              <span>•</span>
                              <span>Volume: {endpoint.volume}</span>
                              <span>•</span>
                              <span>Error Rate: {endpoint.errorRate}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                Number.parseFloat(endpoint.errorRate) > 3
                                  ? "destructive"
                                  : Number.parseFloat(endpoint.errorRate) > 1
                                    ? "warning"
                                    : "success"
                              }
                            >
                              {Number.parseFloat(endpoint.errorRate) > 3
                                ? "High Error Rate"
                                : Number.parseFloat(endpoint.errorRate) > 1
                                  ? "Moderate Errors"
                                  : "Healthy"}
                            </Badge>
                            <Button variant="outline" size="sm">
                              Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Anomaly Detection Tab */}
        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Anomaly Detection</CardTitle>
              <CardDescription>Unusual patterns and outliers in your API usage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Severities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select defaultValue="all-metrics">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by metric" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-metrics">All Metrics</SelectItem>
                        <SelectItem value="latency">Latency</SelectItem>
                        <SelectItem value="error-rate">Error Rate</SelectItem>
                        <SelectItem value="request-count">Request Count</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-detect" checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
                    <Label htmlFor="auto-detect">Auto-detect anomalies</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  {anomalyData.map((anomaly) => (
                    <Card key={anomaly.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <AlertTriangle
                                className={`h-4 w-4 ${
                                  anomaly.severity === "High"
                                    ? "text-red-500"
                                    : anomaly.severity === "Medium"
                                      ? "text-amber-500"
                                      : "text-blue-500"
                                }`}
                              />
                              <h3 className="font-medium">{anomaly.endpoint}</h3>
                              <Badge
                                variant={
                                  anomaly.severity === "High"
                                    ? "destructive"
                                    : anomaly.severity === "Medium"
                                      ? "warning"
                                      : "default"
                                }
                              >
                                {anomaly.severity}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <span>Metric: {anomaly.metric}</span>
                              <span>•</span>
                              <span>Value: {anomaly.value}</span>
                              <span>•</span>
                              <span>Threshold: {anomaly.threshold}</span>
                              <span>•</span>
                              <span>Detected: {anomaly.timestamp}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              Investigate
                            </Button>
                            <Button variant="outline" size="sm">
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forecasting Tab */}
        <TabsContent value="forecasting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Usage Forecast</CardTitle>
              <CardDescription>Predicted API usage based on historical patterns</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ChartContainer
                config={{
                  actual: {
                    label: "Actual Requests",
                    color: "hsl(var(--chart-1))",
                  },
                  forecast: {
                    label: "Forecasted Requests",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={forecastData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="var(--color-actual)"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="var(--color-forecast)"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
            <CardFooter>
              <div className="w-full space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Forecast Accuracy</span>
                  <span className="text-sm">92.4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Projected Growth (Next 30 Days)</span>
                  <span className="text-sm text-green-600">+15.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Confidence Interval</span>
                  <span className="text-sm">±8.3%</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Capacity Planning</CardTitle>
                <CardDescription>Projected resource requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Current Daily Average</span>
                      <span className="text-sm">42,500 requests</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Projected Daily Average (30 days)</span>
                      <span className="text-sm">48,900 requests</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Projected Daily Average (90 days)</span>
                      <span className="text-sm">62,300 requests</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Current Capacity</span>
                      <span className="text-sm">100,000 requests/day</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Capacity Utilization (Current)</span>
                      <span className="text-sm">42.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Capacity Utilization (90 days)</span>
                      <span className="text-sm">62.3%</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" size="sm">
                      View Detailed Capacity Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Seasonal Patterns</CardTitle>
                <CardDescription>Identified usage patterns and seasonality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge>Daily</Badge>
                      <span className="text-sm">Peak usage between 2PM-4PM UTC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Weekly</Badge>
                      <span className="text-sm">Higher volume on weekdays, 32% drop on weekends</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Monthly</Badge>
                      <span className="text-sm">15% increase in the first week of each month</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>Quarterly</Badge>
                      <span className="text-sm">Q4 shows 28% higher volume than other quarters</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Special Events</Badge>
                      <span className="text-sm">Marketing campaigns cause 3-5x normal traffic</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button variant="outline" size="sm">
                      Configure Scaling Rules
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Configuration</CardTitle>
              <CardDescription>Configure notifications for API usage anomalies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch id="alerts-enabled" checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
                    <Label htmlFor="alerts-enabled">Enable API Usage Alerts</Label>
                  </div>
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Test Notifications
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Alert Thresholds</h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="error-rate-threshold">Error Rate Threshold (%)</Label>
                        <div className="flex items-center space-x-2">
                          <Input id="error-rate-threshold" type="number" defaultValue="5" />
                          <Select defaultValue="greater">
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="greater">Greater Than</SelectItem>
                              <SelectItem value="less">Less Than</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="latency-threshold">Latency Threshold (ms)</Label>
                        <div className="flex items-center space-x-2">
                          <Input id="latency-threshold" type="number" defaultValue="200" />
                          <Select defaultValue="greater">
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="greater">Greater Than</SelectItem>
                              <SelectItem value="less">Less Than</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="request-volume-threshold">Request Volume Threshold</Label>
                        <div className="flex items-center space-x-2">
                          <Input id="request-volume-threshold" type="number" defaultValue="10000" />
                          <Select defaultValue="greater">
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="greater">Greater Than</SelectItem>
                              <SelectItem value="less">Less Than</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="success-rate-threshold">Success Rate Threshold (%)</Label>
                        <div className="flex items-center space-x-2">
                          <Input id="success-rate-threshold" type="number" defaultValue="95" />
                          <Select defaultValue="less">
                            <SelectTrigger className="w-[140px]">
                              <SelectValue placeholder="Condition" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="greater">Greater Than</SelectItem>
                              <SelectItem value="less">Less Than</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Channels</h3>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="email-notifications" defaultChecked />
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="slack-notifications" defaultChecked />
                        <Label htmlFor="slack-notifications">Slack Notifications</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="webhook-notifications" />
                        <Label htmlFor="webhook-notifications">Webhook Notifications</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch id="sms-notifications" />
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Alert Configuration</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
