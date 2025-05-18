export interface ApiRequestLog {
  id: string
  timestamp: string
  tokenId: string
  endpoint: string
  method: string
  statusCode: number
  responseTime: number
  ipAddress: string
  userAgent: string
  requestSize: number
  responseSize: number
  parameters?: Record<string, any>
}

export interface ApiTokenUsage {
  tokenId: string
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  averageResponseTime: number
  totalDataTransferred: number
  requestsPerDay: {
    date: string
    count: number
  }[]
  topEndpoints: {
    endpoint: string
    count: number
  }[]
  topIpAddresses: {
    ipAddress: string
    count: number
  }[]
  errorRates: {
    statusCode: number
    count: number
  }[]
}

export interface ApiTokenWithUsage {
  id: string
  name: string
  lastUsed: Date
  createdAt: Date
  permissions: string[]
  usage: ApiTokenUsage
}

export interface ApiUsageFilters {
  dateRange: {
    from: Date | null
    to: Date | null
  }
  endpoints: string[]
  statusCodes: number[]
  methods: string[]
}

export interface ApiUsageThreshold {
  id: string
  tokenId: string
  metricType: "requests" | "errors" | "responseTime" | "dataTransfer"
  threshold: number
  timeframe: "hour" | "day" | "week" | "month"
  notificationEnabled: boolean
  notificationChannels: ("email" | "inApp")[]
  createdAt: Date
}

// New types for predictive analytics
export interface ApiUsageForecast {
  tokenId: string
  forecastPeriod: "day" | "week" | "month"
  forecastData: {
    date: string
    predictedRequests: number
    predictedErrors: number
    predictedDataTransfer: number
    predictedResponseTime: number
    confidenceLow: number
    confidenceHigh: number
  }[]
  lastUpdated: Date
}

// New types for competitive analytics
export interface IndustryBenchmark {
  industry: string
  metrics: {
    averageRequestsPerDay: number
    averageErrorRate: number
    averageResponseTime: number
    averageDataTransferPerRequest: number
  }
  percentile: {
    requests: number
    errors: number
    responseTime: number
    dataTransfer: number
  }
}

// New types for anomaly detection
export interface ApiUsageAnomaly {
  id: string
  tokenId: string
  timestamp: Date
  metric: "requests" | "errors" | "responseTime" | "dataTransfer"
  actualValue: number
  expectedValue: number
  deviationPercentage: number
  severity: "low" | "medium" | "high"
  status: "new" | "acknowledged" | "resolved"
  possibleCauses?: string[]
}

// New types for scenario planning
export interface ApiUsageScenario {
  id: string
  tokenId: string
  name: string
  description: string
  baselineUsage: number
  projectedIncrease: number
  timeframe: "day" | "week" | "month"
  createdAt: Date
  factors: {
    name: string
    impact: number
  }[]
}
