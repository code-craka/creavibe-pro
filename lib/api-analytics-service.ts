import type {
  ApiRequestLog,
  ApiTokenUsage,
  ApiTokenWithUsage,
  ApiUsageThreshold,
  ApiUsageForecast,
  IndustryBenchmark,
  ApiUsageAnomaly,
  ApiUsageScenario,
} from "@/types/api-analytics"
import { format, subDays, addDays, addMonths, differenceInDays } from "date-fns"

// Define an interface for the daily usage data structure
export interface DailyUsageData {
  date: string;
  requests: number;
  errors: number;
}

// Mock API endpoints
const apiEndpoints = [
  "/api/v1/projects",
  "/api/v1/projects/:id",
  "/api/v1/templates",
  "/api/v1/templates/:id",
  "/api/v1/content/generate",
  "/api/v1/analytics/dashboard",
  "/api/v1/users/me",
]

// Mock HTTP methods
const httpMethods = ["GET", "POST", "PUT", "DELETE"]

// Mock status codes with weighted distribution
const statusCodes = [
  { code: 200, weight: 70 },
  { code: 201, weight: 10 },
  { code: 400, weight: 8 },
  { code: 401, weight: 5 },
  { code: 403, weight: 3 },
  { code: 404, weight: 3 },
  { code: 500, weight: 1 },
]

// Mock IP addresses
const ipAddresses = ["192.168.1.1", "192.168.1.2", "192.168.1.3", "192.168.1.4", "192.168.1.5", "10.0.0.1", "10.0.0.2"]

// Mock user agents
const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
  "PostmanRuntime/7.28.4",
  "curl/7.68.0",
  "node-fetch/1.0",
]

// Helper function to get a random item from an array
function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

// Helper function to get a random status code based on weighted distribution
function getRandomStatusCode(): number {
  const totalWeight = statusCodes.reduce((sum, item) => sum + item.weight, 0)
  let random = Math.random() * totalWeight

  for (const item of statusCodes) {
    if (random < item.weight) {
      return item.code
    }
    random -= item.weight
  }

  return 200 // Default fallback
}

// Helper function to generate a random number within a range
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Generate mock API request logs for a token
export function generateMockRequestLogs(tokenId: string, count: number): ApiRequestLog[] {
  const logs: ApiRequestLog[] = []

  for (let i = 0; i < count; i++) {
    const statusCode = getRandomStatusCode()
    const isSuccess = statusCode >= 200 && statusCode < 300
    const endpoint = getRandomItem(apiEndpoints)
    const method = getRandomItem(httpMethods)
    const responseTime = getRandomNumber(isSuccess ? 50 : 100, isSuccess ? 500 : 2000)
    const requestSize = getRandomNumber(100, 5000)
    const responseSize = getRandomNumber(200, 10000)

    // Generate a timestamp within the last 30 days
    const daysAgo = getRandomNumber(0, 30)
    const hoursAgo = getRandomNumber(0, 23)
    const minutesAgo = getRandomNumber(0, 59)
    const secondsAgo = getRandomNumber(0, 59)

    const timestamp = new Date()
    timestamp.setDate(timestamp.getDate() - daysAgo)
    timestamp.setHours(timestamp.getHours() - hoursAgo)
    timestamp.setMinutes(timestamp.getMinutes() - minutesAgo)
    timestamp.setSeconds(timestamp.getSeconds() - secondsAgo)

    logs.push({
      id: `log_${Math.random().toString(36).substring(2, 15)}`,
      timestamp: timestamp.toISOString(),
      tokenId,
      endpoint,
      method,
      statusCode,
      responseTime,
      ipAddress: getRandomItem(ipAddresses),
      userAgent: getRandomItem(userAgents),
      requestSize,
      responseSize,
      parameters:
        method !== "GET"
          ? {
              sample: "parameter",
              count: Math.floor(Math.random() * 100),
            }
          : undefined,
    })
  }

  // Sort logs by timestamp (newest first)
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

// Generate usage statistics from request logs
export function generateUsageStats(logs: ApiRequestLog[]): ApiTokenUsage {
  const totalRequests = logs.length
  const successfulRequests = logs.filter((log) => log.statusCode >= 200 && log.statusCode < 300).length
  const failedRequests = totalRequests - successfulRequests

  // Calculate average response time
  const totalResponseTime = logs.reduce((sum, log) => sum + log.responseTime, 0)
  const averageResponseTime = totalRequests > 0 ? totalResponseTime / totalRequests : 0

  // Calculate total data transferred
  const totalDataTransferred = logs.reduce((sum, log) => sum + log.requestSize + log.responseSize, 0)

  // Group requests by day
  const requestsByDay = new Map<string, number>()
  logs.forEach((log) => {
    const date = format(new Date(log.timestamp), "yyyy-MM-dd")
    requestsByDay.set(date, (requestsByDay.get(date) || 0) + 1)
  })

  // Get top endpoints
  const endpointCounts = new Map<string, number>()
  logs.forEach((log) => {
    endpointCounts.set(log.endpoint, (endpointCounts.get(log.endpoint) || 0) + 1)
  })

  const topEndpoints = Array.from(endpointCounts.entries())
    .map(([endpoint, count]) => ({ endpoint, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Get top IP addresses
  const ipCounts = new Map<string, number>()
  logs.forEach((log) => {
    ipCounts.set(log.ipAddress, (ipCounts.get(log.ipAddress) || 0) + 1)
  })

  const topIpAddresses = Array.from(ipCounts.entries())
    .map(([ipAddress, count]) => ({ ipAddress, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Get error rates by status code
  const errorCounts = new Map<number, number>()
  logs
    .filter((log) => log.statusCode >= 400)
    .forEach((log) => {
      errorCounts.set(log.statusCode, (errorCounts.get(log.statusCode) || 0) + 1)
    })

  const errorRates = Array.from(errorCounts.entries())
    .map(([statusCode, count]) => ({ statusCode, count }))
    .sort((a, b) => b.count - a.count)

  return {
    tokenId: logs[0]?.tokenId || "",
    totalRequests,
    successfulRequests,
    failedRequests,
    averageResponseTime,
    totalDataTransferred,
    requestsPerDay: Array.from(requestsByDay.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    topEndpoints,
    topIpAddresses,
    errorRates,
  }
}

// Mock API tokens with usage data
export const mockTokensWithUsage: ApiTokenWithUsage[] = [
  {
    id: "tok_1234567890",
    name: "Dashboard Integration",
    lastUsed: new Date(2023, 4, 20),
    createdAt: new Date(2023, 2, 15),
    permissions: ["read_projects", "read_templates", "read_analytics"],
    usage: generateUsageStats(generateMockRequestLogs("tok_1234567890", 1500)),
  },
  {
    id: "tok_0987654321",
    name: "Content Generator",
    lastUsed: new Date(2023, 5, 1),
    createdAt: new Date(2023, 4, 10),
    permissions: ["read_templates", "generate_content"],
    usage: generateUsageStats(generateMockRequestLogs("tok_0987654321", 800)),
  },
  {
    id: "tok_5678901234",
    name: "Mobile App Integration",
    lastUsed: new Date(2023, 5, 5),
    createdAt: new Date(2023, 3, 20),
    permissions: ["read_projects", "write_projects", "read_templates"],
    usage: generateUsageStats(generateMockRequestLogs("tok_5678901234", 2200)),
  },
]

// Mock API usage thresholds
export const mockUsageThresholds: ApiUsageThreshold[] = [
  {
    id: "threshold_1",
    tokenId: "tok_1234567890",
    metricType: "requests",
    threshold: 1000,
    timeframe: "day",
    notificationEnabled: true,
    notificationChannels: ["email", "inApp"],
    createdAt: new Date(2023, 4, 15),
  },
  {
    id: "threshold_2",
    tokenId: "tok_0987654321",
    metricType: "errors",
    threshold: 50,
    timeframe: "day",
    notificationEnabled: true,
    notificationChannels: ["inApp"],
    createdAt: new Date(2023, 4, 20),
  },
]

// Mock industry benchmarks for competitive analytics
const mockIndustryBenchmarks: Record<string, IndustryBenchmark> = {
  technology: {
    industry: "Technology",
    metrics: {
      averageRequestsPerDay: 5000,
      averageErrorRate: 2.5,
      averageResponseTime: 250,
      averageDataTransferPerRequest: 5120,
    },
    percentile: {
      requests: 75,
      errors: 30,
      responseTime: 60,
      dataTransfer: 45,
    },
  },
  marketing: {
    industry: "Marketing",
    metrics: {
      averageRequestsPerDay: 3500,
      averageErrorRate: 3.2,
      averageResponseTime: 300,
      averageDataTransferPerRequest: 7680,
    },
    percentile: {
      requests: 65,
      errors: 40,
      responseTime: 55,
      dataTransfer: 70,
    },
  },
  ecommerce: {
    industry: "E-Commerce",
    metrics: {
      averageRequestsPerDay: 8000,
      averageErrorRate: 1.8,
      averageResponseTime: 180,
      averageDataTransferPerRequest: 4096,
    },
    percentile: {
      requests: 85,
      errors: 25,
      responseTime: 40,
      dataTransfer: 60,
    },
  },
  finance: {
    industry: "Finance",
    metrics: {
      averageRequestsPerDay: 4200,
      averageErrorRate: 1.2,
      averageResponseTime: 150,
      averageDataTransferPerRequest: 3072,
    },
    percentile: {
      requests: 70,
      errors: 20,
      responseTime: 35,
      dataTransfer: 50,
    },
  },
}

// Mock anomalies for anomaly detection
const mockAnomalies: ApiUsageAnomaly[] = [
  {
    id: "anomaly_1",
    tokenId: "tok_1234567890",
    timestamp: new Date(2023, 4, 28),
    metric: "requests",
    actualValue: 2500,
    expectedValue: 1200,
    deviationPercentage: 108.33,
    severity: "high",
    status: "new",
    possibleCauses: ["Sudden traffic spike", "Potential DDoS attack", "Integration with new service"],
  },
  {
    id: "anomaly_2",
    tokenId: "tok_1234567890",
    timestamp: new Date(2023, 4, 25),
    metric: "errors",
    actualValue: 350,
    expectedValue: 120,
    deviationPercentage: 191.67,
    severity: "high",
    status: "acknowledged",
    possibleCauses: ["API endpoint outage", "Invalid request parameters", "Rate limiting"],
  },
  {
    id: "anomaly_3",
    tokenId: "tok_0987654321",
    timestamp: new Date(2023, 5, 2),
    metric: "responseTime",
    actualValue: 850,
    expectedValue: 300,
    deviationPercentage: 183.33,
    severity: "medium",
    status: "resolved",
    possibleCauses: ["Database performance issue", "Network latency", "Resource contention"],
  },
]

// Mock scenarios for scenario planning
const mockScenarios: ApiUsageScenario[] = [
  {
    id: "scenario_1",
    tokenId: "tok_1234567890",
    name: "Marketing Campaign Launch",
    description: "Projected impact of upcoming summer marketing campaign",
    baselineUsage: 1200,
    projectedIncrease: 80,
    timeframe: "day",
    createdAt: new Date(2023, 4, 15),
    factors: [
      { name: "Social media ads", impact: 35 },
      { name: "Email campaign", impact: 25 },
      { name: "Partner promotions", impact: 20 },
    ],
  },
  {
    id: "scenario_2",
    tokenId: "tok_1234567890",
    name: "New Mobile App Release",
    description: "Projected impact of new mobile app version with API integration",
    baselineUsage: 1200,
    projectedIncrease: 150,
    timeframe: "week",
    createdAt: new Date(2023, 4, 20),
    factors: [
      { name: "New users", impact: 60 },
      { name: "Increased feature usage", impact: 50 },
      { name: "Background syncing", impact: 40 },
    ],
  },
]

// Function to fetch token usage data
export async function fetchTokenUsage(tokenId: string): Promise<ApiTokenUsage> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const token = mockTokensWithUsage.find((t) => t.id === tokenId)
      if (token) {
        resolve(token.usage)
      } else {
        // If token not found, generate mock data
        const logs = generateMockRequestLogs(tokenId, 1000)
        resolve(generateUsageStats(logs))
      }
    }, 800)
  })
}

export interface ApiUsageFilters {
  dateRange?: {
    from?: Date
    to?: Date
  }
  endpoints?: string[]
  statusCodes?: number[]
  methods?: string[]
}

// Function to fetch token request logs
export async function fetchTokenRequestLogs(
  tokenId: string,
  page = 1,
  pageSize = 10,
  filters?: Partial<ApiUsageFilters>,
): Promise<{ logs: ApiRequestLog[]; total: number }> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      let logs = generateMockRequestLogs(tokenId, 100)

      // Apply filters if provided
      if (filters) {
        if (filters.dateRange?.from) {
          logs = logs.filter((log) => new Date(log.timestamp) >= filters.dateRange!.from!)
        }
        if (filters.dateRange?.to) {
          logs = logs.filter((log) => new Date(log.timestamp) <= filters.dateRange!.to!)
        }
        if (filters.endpoints && filters.endpoints.length > 0) {
          logs = logs.filter((log) => filters.endpoints!.includes(log.endpoint))
        }
        if (filters.statusCodes && filters.statusCodes.length > 0) {
          logs = logs.filter((log) => filters.statusCodes!.includes(log.statusCode))
        }
        if (filters.methods && filters.methods.length > 0) {
          logs = logs.filter((log) => filters.methods!.includes(log.method))
        }
      }

      const total = logs.length
      const paginatedLogs = logs.slice((page - 1) * pageSize, page * pageSize)

      resolve({ logs: paginatedLogs, total })
    }, 800)
  })
}

// Function to fetch usage thresholds for a token
export async function fetchTokenThresholds(tokenId: string): Promise<ApiUsageThreshold[]> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const thresholds = mockUsageThresholds.filter((t) => t.tokenId === tokenId)
      resolve(thresholds)
    }, 500)
  })
}

// Function to create a new usage threshold
export async function createTokenThreshold(
  threshold: Omit<ApiUsageThreshold, "id" | "createdAt">,
): Promise<ApiUsageThreshold> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newThreshold: ApiUsageThreshold = {
        ...threshold,
        id: `threshold_${Math.random().toString(36).substring(2, 15)}`,
        createdAt: new Date(),
      }
      resolve(newThreshold)
    }, 500)
  })
}

// Function to delete a usage threshold
export async function deleteTokenThreshold(thresholdId: string): Promise<boolean> {
  // In a real application, this would be an API call
  // The thresholdId parameter would be used here to identify the threshold to delete
  console.log(`Attempting to delete threshold: ${thresholdId}`); // Example usage
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 500)
  })
}

// Function to generate forecast data
export function generateForecastData(
  tokenId: string,
  period: "day" | "week" | "month" = "day",
  days = 30,
): ApiUsageForecast {
  const dailyData = generateDailyUsageData(tokenId, 90) // Get 90 days of historical data
  const forecastData = []
  const today = new Date()

  // Simple forecasting algorithm (in a real app, this would use more sophisticated methods)
  for (let i = 1; i <= days; i++) {
    let forecastDate
    if (period === "day") {
      forecastDate = addDays(today, i)
    } else if (period === "week") {
      forecastDate = addDays(today, i * 7)
    } else {
      forecastDate = addMonths(today, i)
    }

    const dateStr = format(forecastDate, "yyyy-MM-dd")

    // Calculate predicted values based on historical trends
    // This is a simplified model - a real app would use more sophisticated forecasting
    const dayOfWeek = forecastDate.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    // Base prediction on average of last 30 days with some randomness
    const recentData = dailyData.slice(0, 30)
    const avgRequests = recentData.reduce((sum, item) => sum + item.requests, 0) / recentData.length
    const avgErrors = recentData.reduce((sum, item) => sum + item.errors, 0) / recentData.length

    // Add some trend (increasing over time)
    const trendFactor = 1 + i * 0.01 // 1% increase per day

    // Weekend adjustment
    const weekendFactor = isWeekend ? 0.7 : 1.0

    // Calculate predicted values
    const predictedRequests = Math.round(avgRequests * trendFactor * weekendFactor)
    const predictedErrors = Math.round(avgErrors * trendFactor * weekendFactor)
    const predictedDataTransfer = Math.round(predictedRequests * 5000) // Assuming 5KB per request
    const predictedResponseTime = Math.round(200 + i * 0.5) // Slight degradation over time

    // Add confidence intervals (±15%)
    const confidenceLow = Math.round(predictedRequests * 0.85)
    const confidenceHigh = Math.round(predictedRequests * 1.15)

    forecastData.push({
      date: dateStr,
      predictedRequests,
      predictedErrors,
      predictedDataTransfer,
      predictedResponseTime,
      confidenceLow,
      confidenceHigh,
    })
  }

  return {
    tokenId,
    forecastPeriod: period,
    forecastData,
    lastUpdated: new Date(),
  }
}

// Function to fetch industry benchmarks
export async function fetchIndustryBenchmarks(industry = "technology"): Promise<IndustryBenchmark> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockIndustryBenchmarks[industry] || mockIndustryBenchmarks.technology)
    }, 800)
  })
}

// Function to fetch anomalies for a token
export async function fetchTokenAnomalies(
  tokenId: string,
  status?: "new" | "acknowledged" | "resolved",
): Promise<ApiUsageAnomaly[]> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      let anomalies = mockAnomalies.filter((a) => a.tokenId === tokenId)

      if (status) {
        anomalies = anomalies.filter((a) => a.status === status)
      }

      resolve(anomalies)
    }, 800)
  })
}

// Function to update anomaly status
export async function updateAnomalyStatus(anomalyId: string, status: "acknowledged" | "resolved"): Promise<boolean> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const anomaly = mockAnomalies.find((a) => a.id === anomalyId)
      if (anomaly) {
        anomaly.status = status
      }
      resolve(true)
    }, 500)
  })
}

// Function to fetch scenarios for a token
export async function fetchTokenScenarios(tokenId: string): Promise<ApiUsageScenario[]> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const scenarios = mockScenarios.filter((s) => s.tokenId === tokenId)
      resolve(scenarios)
    }, 800)
  })
}

// Function to create a new scenario
export async function createScenario(scenario: Omit<ApiUsageScenario, "id" | "createdAt">): Promise<ApiUsageScenario> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const newScenario: ApiUsageScenario = {
        ...scenario,
        id: `scenario_${Math.random().toString(36).substring(2, 15)}`,
        createdAt: new Date(),
      }
      resolve(newScenario)
    }, 500)
  })
}

// Function to delete a scenario
export async function deleteScenario(): Promise<boolean> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, 500)
  })
}

// Function to detect anomalies in real-time
export function detectAnomalies(currentValue: number, historicalValues: number[], threshold = 2.0): boolean {
  if (historicalValues.length === 0) return false

  // Calculate mean and standard deviation
  const mean = historicalValues.reduce((sum, val) => sum + val, 0) / historicalValues.length
  const squaredDiffs = historicalValues.map((val) => Math.pow(val - mean, 2))
  const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / historicalValues.length
  const stdDev = Math.sqrt(variance)

  // Calculate z-score
  const zScore = Math.abs((currentValue - mean) / stdDev)

  // If z-score exceeds threshold, it's an anomaly
  return zScore > threshold
}

// Function to simulate real-time data for anomaly detection
export function simulateRealTimeData(baseValue: number, anomalyProbability = 0.1): number {
  // Normal variation (±20%)
  const normalVariation = baseValue * (0.8 + Math.random() * 0.4)

  // Occasionally introduce an anomaly
  if (Math.random() < anomalyProbability) {
    // Anomaly can be 2-5x the base value
    return normalVariation * (2 + Math.random() * 3)
  }

  return normalVariation
}

// Function to generate comparative data for different time periods
export function generateComparativeData(
  tokenId: string,
  currentPeriod: { from: Date; to: Date },
  previousPeriod: { from: Date; to: Date },
): { current: DailyUsageData[]; previous: DailyUsageData[] } {
  const currentDays = differenceInDays(currentPeriod.to, currentPeriod.from) + 1
  const previousDays = differenceInDays(previousPeriod.to, previousPeriod.from) + 1

  const currentData = generateDailyUsageData(tokenId, currentDays).reverse()
  const previousData = generateDailyUsageData(tokenId, previousDays).reverse()

  // Adjust data to match the actual date ranges
  for (let i = 0; i < currentData.length; i++) {
    const date = addDays(currentPeriod.from, i)
    currentData[i].date = format(date, "yyyy-MM-dd")
  }

  for (let i = 0; i < previousData.length; i++) {
    const date = addDays(previousPeriod.from, i)
    previousData[i].date = format(date, "yyyy-MM-dd")
  }

  return {
    current: currentData,
    previous: previousData,
  }
}

// Function to generate daily usage data for charts
export function generateDailyUsageData(
  tokenId: string,
  days = 30,
): DailyUsageData[] {
  const data: DailyUsageData[] = []
  const today = new Date()

  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(today, i)
    const dateStr = format(date, "yyyy-MM-dd")

    // Generate random data with some patterns
    let requests = Math.floor(Math.random() * 100) + 50

    // Add weekly patterns (weekends have less traffic)
    const dayOfWeek = date.getDay()
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      requests = Math.floor(requests * 0.6)
    }

    // Add some spikes
    if (i % 7 === 3) {
      requests = Math.floor(requests * 1.5)
    }

    // Calculate errors (around 5-10% of requests)
    const errors = Math.floor(requests * (Math.random() * 0.05 + 0.05))

    data.push({
      date: dateStr,
      requests,
      errors,
    })
  }

  return data
}

// Function to format bytes to human-readable format
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes"

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
}

// Function to format milliseconds to human-readable format
export function formatResponseTime(ms: number): string {
  if (ms < 1000) {
    return `${ms.toFixed(0)}ms`
  } else {
    return `${(ms / 1000).toFixed(2)}s`
  }
}
