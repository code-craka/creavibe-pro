// Existing types
export interface ApiTokenUsage {
  id: string
  name: string
  requests: number
  successRate: number
  avgLatency: number
  trend: number
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
