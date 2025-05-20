// Existing types
export interface ApiTokenUsage {
  id: string
  name: string
  requests: number
  successRate: number
  avgLatency: number
  trend: number
  // For error TS2322 in server-api-analytics-service.ts
  totalRequests: number
  successfulRequests: number
  failedRequests: number
  averageResponseTime: number
  totalDataTransferred: number
  requestsByEndpoint?: Record<string, number>
  requestsByStatusCode?: Record<string, number>
  requestsByMethod?: Record<string, number>
  requestsOverTime?: Array<any>
}

export interface ApiTokenPrediction {
  date: string
  predicted: number
  lower: number
  upper: number
}

export interface ApiTokenScenario {
  id: string
  name: string
  description: string
  impact: number
  probability: number
  timeline: string
}

export interface CompetitorData {
  id: string
  name: string
  marketShare: number
  apiPerformance: number
  featureCount: number
  pricing: number
  userSatisfaction: number
}

export interface CompetitiveInsight {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  actionable: boolean
}

// New types for anomaly detection
export interface AnomalyDetectionData {
  tokens: { id: string; name: string }[]
  stats: {
    totalAnomalies: number
    criticalAnomalies: number
    detectionAccuracy: number
    avgResponseTime: number
    anomalyTrend: number
  }
  anomalyTrend: {
    date: string
    anomalies: number
    baseline: number
  }[]
  anomalyTypes: {
    type: string
    count: number
  }[]
  recentAnomalies: AnomalyEvent[]
  volumePattern: {
    time: string
    actual: number
    expected: number
  }[]
  errorPattern: {
    time: string
    actual: number
    threshold: number
  }[]
  latencyPattern: {
    time: string
    actual: number
    baseline: number
  }[]
  geoPattern: {
    location: string
    count: number
    anomalies: number
  }[]
  volumeInsights: string
  errorInsights: string
  latencyInsights: string
  geoInsights: string
  lastUpdated: string
}

export interface AnomalyEvent {
  id?: string
  title: string
  description: string
  severity: "critical" | "high" | "medium" | "low"
  type: string
  tokenId: string
  tokenName: string
  timestamp: string
  status: "new" | "investigating" | "resolved"
}

export interface AnomalyThreshold {
  requestVolume: number
  errorRate: number
  latency: number
  unusualPatterns: number
}

export interface AnomalySettings {
  sensitivityLevel: number
  autoThreshold: boolean
  notificationsEnabled: boolean
  customThresholds: AnomalyThreshold
}

// Added missing types needed for components
export interface IndustryBenchmark {
  id: string
  industry: string
  metric: string
  value: number
  percentile: number
  trend: number
  insight: string
}

export interface CompetitorComparison {
  id: string
  competitor: string
  metrics: {
    name: string
    yourValue: number
    theirValue: number
    difference: number
    insight: string
  }[]
  overallScore: number
  strengths: string[]
  weaknesses: string[]
}

export interface ApiUsageDataPoint {
  date: string
  value: number
  type: 'historical' | 'forecast'
}

export interface ApiUsageForecast {
  dataPoints: ApiUsageDataPoint[]
  accuracy: number
  trend: 'increasing' | 'decreasing' | 'stable'
  insights: string[]
}

export interface ApiUsageTimeframe {
  id: string
  label: string
  days: number
  default?: boolean
}

export interface ScenarioSimulation {
  id: string
  name: string
  description: string
  parameters: {
    name: string
    value: number
    min: number
    max: number
    step: number
  }[]
  results: {
    metric: string
    baseline: number
    simulated: number
    change: number
    impact: 'positive' | 'negative' | 'neutral'
  }[]
  recommendations: string[]
  createdAt: string
}
