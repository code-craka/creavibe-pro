"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  Clock,
  Download,
  Eye,
  Filter,
  RefreshCw,
  Settings,
  Shield,
  Zap,
} from "lucide-react"
import { getAnomalyDetectionData, updateAnomalySettings } from "@/lib/api-analytics-advanced-service"
import type {
  AnomalyDetectionData,
  AnomalySettings,
  AnomalyEvent,
  AnomalyThreshold,
} from "@/types/api-analytics-advanced"

export function ApiTokenAnomalyDetection() {
  const [loading, setLoading] = useState(true)
  const [anomalyData, setAnomalyData] = useState<AnomalyDetectionData | null>(null)
  const [selectedToken, setSelectedToken] = useState<string>("all")
  const [timeRange, setTimeRange] = useState<string>("7d")
  const [settings, setSettings] = useState<AnomalySettings>({
    sensitivityLevel: 2,
    autoThreshold: true,
    notificationsEnabled: true,
    customThresholds: {
      requestVolume: 50,
      errorRate: 10,
      latency: 30,
      unusualPatterns: 25,
    },
  })
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // getAnomalyDetectionData doesn't accept parameters
        const data = await getAnomalyDetectionData()
        setAnomalyData(data)
      } catch (error) {
        console.error("Error fetching anomaly detection data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
    // Set up polling for real-time updates
    const intervalId = setInterval(fetchData, 60000) // Update every minute

    return () => clearInterval(intervalId)
  }, [selectedToken, timeRange])

  const handleSettingsChange = async () => {
    try {
      await updateAnomalySettings(settings)
      // Show success message
    } catch (error) {
      console.error("Error updating anomaly settings:", error)
      // Show error message
    }
  }

  const handleSensitivityChange = (value: number[]) => {
    setSettings((prev) => ({
      ...prev,
      sensitivityLevel: value[0],
    }))
  }

  const handleThresholdChange = (type: keyof AnomalyThreshold, value: number[]) => {
    setSettings((prev) => ({
      ...prev,
      customThresholds: {
        ...prev.customThresholds,
        [type]: value[0],
      },
    }))
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 hover:bg-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "low":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  if (loading && !anomalyData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Anomaly Detection</CardTitle>
          <CardDescription>Loading anomaly detection data...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <div className="animate-pulse flex flex-col space-y-4 w-full">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-24 bg-gray-200 rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>API Anomaly Detection</CardTitle>
          <CardDescription>Detect and respond to unusual API usage patterns</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedToken} onValueChange={setSelectedToken}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Token" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tokens</SelectItem>
              {anomalyData?.tokens.map((token) => (
                <SelectItem key={token.id} value={token.id}>
                  {token.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="patterns">Usage Patterns</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {anomalyData?.recentAnomalies && anomalyData.recentAnomalies.length > 0 && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Anomalies Detected</AlertTitle>
                <AlertDescription>
                  {anomalyData.recentAnomalies.length} anomalies detected in the selected time period.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-muted-foreground">Total Anomalies</span>
                    <span className="text-2xl font-bold">{anomalyData?.stats.totalAnomalies || 0}</span>
                    <span
                      className={`text-xs ${anomalyData?.stats.anomalyTrend && anomalyData.stats.anomalyTrend > 0 ? "text-red-500" : "text-green-500"}`}
                    >
                      {anomalyData?.stats.anomalyTrend && anomalyData.stats.anomalyTrend > 0
                        ? `↑ ${anomalyData.stats.anomalyTrend}% from previous period`
                        : `↓ ${Math.abs(anomalyData?.stats.anomalyTrend || 0)}% from previous period`}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-muted-foreground">Critical Anomalies</span>
                    <span className="text-2xl font-bold">{anomalyData?.stats.criticalAnomalies || 0}</span>
                    <span className="text-xs text-red-500">Requires immediate attention</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-muted-foreground">Detection Accuracy</span>
                    <span className="text-2xl font-bold">{anomalyData?.stats.detectionAccuracy || 0}%</span>
                    <span className="text-xs text-muted-foreground">Based on feedback</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-muted-foreground">Response Time</span>
                    <span className="text-2xl font-bold">{anomalyData?.stats.avgResponseTime || 0} min</span>
                    <span className="text-xs text-muted-foreground">Average time to respond</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Anomaly Trend</h3>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    anomalies: {
                      label: "Anomalies",
                      color: "hsl(var(--chart-1))",
                    },
                    baseline: {
                      label: "Baseline",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={anomalyData?.anomalyTrend || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="anomalies" stroke="var(--color-anomalies)" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="baseline" stroke="var(--color-baseline)" strokeDasharray="5 5" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Anomaly Distribution by Type</h3>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    count: {
                      label: "Count",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={anomalyData?.anomalyTypes || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="count" fill="var(--color-count)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Recent Anomaly Alerts</h3>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {anomalyData?.recentAnomalies && anomalyData.recentAnomalies.length > 0 ? (
                anomalyData.recentAnomalies.map((anomaly: AnomalyEvent, index: number) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div
                          className={`p-4 md:w-2 ${anomaly.severity === "critical" ? "bg-red-500" : anomaly.severity === "high" ? "bg-orange-500" : "bg-yellow-500"}`}
                        ></div>
                        <div className="p-4 flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium">{anomaly.title}</h4>
                              <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                            </div>
                            <Badge className={getSeverityColor(anomaly.severity)}>
                              {anomaly.severity.charAt(0).toUpperCase() + anomaly.severity.slice(1)}
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline">{anomaly.type}</Badge>
                            <Badge variant="outline">Token: {anomaly.tokenName}</Badge>
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {anomaly.timestamp}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-3 w-3 mr-1" />
                                View Details
                              </Button>
                              <Button variant="outline" size="sm">
                                <Shield className="h-3 w-3 mr-1" />
                                Mark as Resolved
                              </Button>
                            </div>
                            <div>
                              {anomaly.status === "new" ? (
                                <Badge className="bg-blue-100 text-blue-800">New</Badge>
                              ) : anomaly.status === "investigating" ? (
                                <Badge className="bg-purple-100 text-purple-800">Investigating</Badge>
                              ) : (
                                <Badge className="bg-green-100 text-green-800">Resolved</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No anomalies detected</h3>
                  <p className="text-muted-foreground">
                    No unusual API usage patterns have been detected in the selected time period.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Request Volume Patterns</CardTitle>
                  <CardDescription>Unusual spikes or drops in API requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ChartContainer
                      config={{
                        actual: {
                          label: "Actual",
                          color: "hsl(var(--chart-1))",
                        },
                        expected: {
                          label: "Expected",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-[200px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={anomalyData?.volumePattern || []}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" />
                          <Line
                            type="monotone"
                            dataKey="expected"
                            stroke="var(--color-expected)"
                            strokeDasharray="5 5"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  {anomalyData?.volumeInsights && (
                    <Alert className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Volume Insight</AlertTitle>
                      <AlertDescription>{anomalyData.volumeInsights}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Error Rate Patterns</CardTitle>
                  <CardDescription>Unusual increases in API errors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ChartContainer
                      config={{
                        actual: {
                          label: "Actual",
                          color: "hsl(var(--chart-1))",
                        },
                        threshold: {
                          label: "Threshold",
                          color: "hsl(var(--chart-3))",
                        },
                      }}
                      className="h-[200px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={anomalyData?.errorPattern || []}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" />
                          <Line
                            type="monotone"
                            dataKey="threshold"
                            stroke="var(--color-threshold)"
                            strokeDasharray="5 5"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  {anomalyData?.errorInsights && (
                    <Alert className="mt-4" variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error Insight</AlertTitle>
                      <AlertDescription>{anomalyData.errorInsights}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Latency Patterns</CardTitle>
                  <CardDescription>Unusual increases in API response times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ChartContainer
                      config={{
                        actual: {
                          label: "Actual",
                          color: "hsl(var(--chart-1))",
                        },
                        baseline: {
                          label: "Baseline",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-[200px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={anomalyData?.latencyPattern || []}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" />
                          <Line
                            type="monotone"
                            dataKey="baseline"
                            stroke="var(--color-baseline)"
                            strokeDasharray="5 5"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  {anomalyData?.latencyInsights && (
                    <Alert className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Latency Insight</AlertTitle>
                      <AlertDescription>{anomalyData.latencyInsights}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geographic Patterns</CardTitle>
                  <CardDescription>Unusual access patterns by location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ChartContainer
                      config={{
                        count: {
                          label: "Count",
                          color: "hsl(var(--chart-1))",
                        },
                        anomalies: {
                          label: "Anomalies",
                          color: "hsl(var(--chart-3))",
                        },
                      }}
                      className="h-[200px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={anomalyData?.geoPattern || []}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="location" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Bar dataKey="count" fill="var(--color-count)" />
                          <Bar dataKey="anomalies" fill="var(--color-anomalies)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  {anomalyData?.geoInsights && (
                    <Alert className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Geographic Insight</AlertTitle>
                      <AlertDescription>{anomalyData.geoInsights}</AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detection Sensitivity</CardTitle>
                  <CardDescription>Adjust how sensitive the anomaly detection system is</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Sensitivity Level</Label>
                      <span className="text-sm font-medium">
                        {settings.sensitivityLevel === 1
                          ? "Low"
                          : settings.sensitivityLevel === 2
                            ? "Medium"
                            : settings.sensitivityLevel === 3
                              ? "High"
                              : "Custom"}
                      </span>
                    </div>
                    <Slider
                      value={[settings.sensitivityLevel]}
                      min={1}
                      max={3}
                      step={1}
                      onValueChange={handleSensitivityChange}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Fewer alerts</span>
                      <span>More alerts</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="auto-threshold">Auto-adjust thresholds</Label>
                    <Switch
                      id="auto-threshold"
                      checked={settings.autoThreshold}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoThreshold: checked }))}
                    />
                  </div>

                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      {settings.autoThreshold
                        ? "The system will automatically adjust thresholds based on historical patterns."
                        : "Set custom thresholds for different types of anomalies."}
                    </p>

                    {!settings.autoThreshold && (
                      <div className="space-y-4 pt-2">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Request Volume Threshold (%)</Label>
                            <span className="text-sm font-medium">{settings.customThresholds.requestVolume}%</span>
                          </div>
                          <Slider
                            value={[settings.customThresholds.requestVolume]}
                            min={10}
                            max={100}
                            step={5}
                            onValueChange={(value) => handleThresholdChange("requestVolume", value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Error Rate Threshold (%)</Label>
                            <span className="text-sm font-medium">{settings.customThresholds.errorRate}%</span>
                          </div>
                          <Slider
                            value={[settings.customThresholds.errorRate]}
                            min={5}
                            max={50}
                            step={5}
                            onValueChange={(value) => handleThresholdChange("errorRate", value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Latency Threshold (%)</Label>
                            <span className="text-sm font-medium">{settings.customThresholds.latency}%</span>
                          </div>
                          <Slider
                            value={[settings.customThresholds.latency]}
                            min={10}
                            max={100}
                            step={5}
                            onValueChange={(value) => handleThresholdChange("latency", value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Unusual Patterns Threshold (%)</Label>
                            <span className="text-sm font-medium">{settings.customThresholds.unusualPatterns}%</span>
                          </div>
                          <Slider
                            value={[settings.customThresholds.unusualPatterns]}
                            min={10}
                            max={100}
                            step={5}
                            onValueChange={(value) => handleThresholdChange("unusualPatterns", value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how you want to be notified about anomalies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="notifications-enabled">Enable notifications</Label>
                    <Switch
                      id="notifications-enabled"
                      checked={settings.notificationsEnabled}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, notificationsEnabled: checked }))}
                    />
                  </div>

                  {settings.notificationsEnabled && (
                    <div className="space-y-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="notify-critical"
                          className="rounded border-gray-300"
                          defaultChecked
                        />
                        <Label htmlFor="notify-critical">Critical severity anomalies</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="notify-high" className="rounded border-gray-300" defaultChecked />
                        <Label htmlFor="notify-high">High severity anomalies</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="notify-medium" className="rounded border-gray-300" />
                        <Label htmlFor="notify-medium">Medium severity anomalies</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="notify-low" className="rounded border-gray-300" />
                        <Label htmlFor="notify-low">Low severity anomalies</Label>
                      </div>

                      <div className="pt-2">
                        <Label className="mb-2 block">Notification channels</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="channel-email"
                              className="rounded border-gray-300"
                              defaultChecked
                            />
                            <Label htmlFor="channel-email">Email</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="channel-dashboard"
                              className="rounded border-gray-300"
                              defaultChecked
                            />
                            <Label htmlFor="channel-dashboard">Dashboard</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="channel-slack" className="rounded border-gray-300" />
                            <Label htmlFor="channel-slack">Slack</Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="channel-webhook" className="rounded border-gray-300" />
                            <Label htmlFor="channel-webhook">Webhook</Label>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Label htmlFor="quiet-hours" className="mb-2 block">
                          Quiet hours
                        </Label>
                        <Select>
                          <SelectTrigger id="quiet-hours">
                            <SelectValue placeholder="Select quiet hours" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No quiet hours</SelectItem>
                            <SelectItem value="night">Night (10 PM - 8 AM)</SelectItem>
                            <SelectItem value="weekend">Weekends</SelectItem>
                            <SelectItem value="custom">Custom schedule</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>Configure advanced anomaly detection settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="learning-period" className="mb-2 block">
                      Learning Period
                    </Label>
                    <Select defaultValue="30d">
                      <SelectTrigger id="learning-period">
                        <SelectValue placeholder="Select learning period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">7 days</SelectItem>
                        <SelectItem value="14d">14 days</SelectItem>
                        <SelectItem value="30d">30 days</SelectItem>
                        <SelectItem value="90d">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">
                      Historical data used to establish baseline patterns
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="detection-algorithm" className="mb-2 block">
                      Detection Algorithm
                    </Label>
                    <Select defaultValue="adaptive">
                      <SelectTrigger id="detection-algorithm">
                        <SelectValue placeholder="Select algorithm" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="static">Static thresholds</SelectItem>
                        <SelectItem value="adaptive">Adaptive learning</SelectItem>
                        <SelectItem value="ml">Machine learning</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">Algorithm used to detect anomalies</p>
                  </div>

                  <div>
                    <Label htmlFor="min-data-points" className="mb-2 block">
                      Minimum Data Points
                    </Label>
                    <Select defaultValue="100">
                      <SelectTrigger id="min-data-points">
                        <SelectValue placeholder="Select minimum data points" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50 points</SelectItem>
                        <SelectItem value="100">100 points</SelectItem>
                        <SelectItem value="500">500 points</SelectItem>
                        <SelectItem value="1000">1000 points</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">Minimum data points required before detection</p>
                  </div>

                  <div>
                    <Label htmlFor="analysis-frequency" className="mb-2 block">
                      Analysis Frequency
                    </Label>
                    <Select defaultValue="15m">
                      <SelectTrigger id="analysis-frequency">
                        <SelectValue placeholder="Select analysis frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5m">Every 5 minutes</SelectItem>
                        <SelectItem value="15m">Every 15 minutes</SelectItem>
                        <SelectItem value="1h">Hourly</SelectItem>
                        <SelectItem value="6h">Every 6 hours</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">How often the system analyzes for anomalies</p>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="auto-remediation">Enable auto-remediation</Label>
                    <Switch id="auto-remediation" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Automatically take actions to remediate certain anomalies
                  </p>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="feedback-learning">Use feedback for learning</Label>
                    <Switch id="feedback-learning" defaultChecked />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Incorporate user feedback to improve detection accuracy
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSettingsChange}>Save Settings</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          Last updated: {anomalyData?.lastUpdated || "Never"}
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Configure Alerts
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Advanced Settings
          </Button>
          <Button size="sm">
            <Zap className="h-4 w-4 mr-2" />
            Run Analysis Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
