import type {
  ApiTokenPrediction,
  ApiTokenScenario,
  CompetitorData,
  CompetitiveInsight,
  AnomalyDetectionData,
  AnomalySettings,
} from "@/types/api-analytics-advanced"

// Mock data for API token usage predictions
const mockPredictiveData: ApiTokenPrediction[] = [
  { date: "2023-06-01", predicted: 12500, lower: 11000, upper: 14000 },
  { date: "2023-06-02", predicted: 13000, lower: 11500, upper: 14500 },
  { date: "2023-06-03", predicted: 13200, lower: 11700, upper: 14700 },
  { date: "2023-06-04", predicted: 13500, lower: 12000, upper: 15000 },
  { date: "2023-06-05", predicted: 14000, lower: 12500, upper: 15500 },
  { date: "2023-06-06", predicted: 14500, lower: 13000, upper: 16000 },
  { date: "2023-06-07", predicted: 15000, lower: 13500, upper: 16500 },
  { date: "2023-06-08", predicted: 15500, lower: 14000, upper: 17000 },
  { date: "2023-06-09", predicted: 16000, lower: 14500, upper: 17500 },
  { date: "2023-06-10", predicted: 16500, lower: 15000, upper: 18000 },
  { date: "2023-06-11", predicted: 17000, lower: 15500, upper: 18500 },
  { date: "2023-06-12", predicted: 17500, lower: 16000, upper: 19000 },
  { date: "2023-06-13", predicted: 18000, lower: 16500, upper: 19500 },
  { date: "2023-06-14", predicted: 18500, lower: 17000, upper: 20000 },
]

// Mock data for API token scenarios
const mockScenarios: ApiTokenScenario[] = [
  {
    id: "1",
    name: "Increased Marketing Campaign",
    description: "Launch of new marketing campaign expected to increase API usage by 30%",
    impact: 30,
    probability: 80,
    timeline: "2 weeks",
  },
  {
    id: "2",
    name: "New Enterprise Client",
    description: "Onboarding of large enterprise client with high API usage requirements",
    impact: 50,
    probability: 60,
    timeline: "1 month",
  },
  {
    id: "3",
    name: "Product Feature Launch",
    description: "Launch of new product feature that will increase API calls per user",
    impact: 25,
    probability: 90,
    timeline: "2 weeks",
  },
  {
    id: "4",
    name: "Seasonal Traffic Spike",
    description: "Expected seasonal increase in traffic during holiday period",
    impact: 40,
    probability: 95,
    timeline: "3 months",
  },
  {
    id: "5",
    name: "Infrastructure Upgrade",
    description: "Planned infrastructure upgrade that may temporarily reduce capacity",
    impact: -15,
    probability: 70,
    timeline: "1 week",
  },
]

// Mock data for competitor analysis
const mockCompetitors: CompetitorData[] = [
  {
    id: "1",
    name: "CompetitorA",
    marketShare: 35,
    apiPerformance: 85,
    featureCount: 42,
    pricing: 75,
    userSatisfaction: 80,
  },
  {
    id: "2",
    name: "CompetitorB",
    marketShare: 25,
    apiPerformance: 90,
    featureCount: 38,
    pricing: 65,
    userSatisfaction: 85,
  },
  {
    id: "3",
    name: "CompetitorC",
    marketShare: 15,
    apiPerformance: 75,
    featureCount: 45,
    pricing: 90,
    userSatisfaction: 70,
  },
  {
    id: "4",
    name: "YourCompany",
    marketShare: 20,
    apiPerformance: 88,
    featureCount: 40,
    pricing: 80,
    userSatisfaction: 82,
  },
  {
    id: "5",
    name: "CompetitorD",
    marketShare: 5,
    apiPerformance: 70,
    featureCount: 30,
    pricing: 95,
    userSatisfaction: 75,
  },
]

const mockCompetitiveInsights: CompetitiveInsight[] = [
  {
    id: "1",
    title: "API Performance Gap",
    description: "CompetitorB has 2% better API performance metrics. Consider optimizing endpoint response times.",
    impact: "medium",
    actionable: true,
  },
  {
    id: "2",
    title: "Feature Parity",
    description: "CompetitorC offers 5 more API features than our platform. Consider roadmap adjustments.",
    impact: "high",
    actionable: true,
  },
  {
    id: "3",
    title: "Pricing Advantage",
    description: "We maintain a pricing advantage over CompetitorA by 5%. Maintain this differential.",
    impact: "medium",
    actionable: false,
  },
  {
    id: "4",
    title: "Market Share Opportunity",
    description: "Potential to gain 5% market share from CompetitorD due to their performance issues.",
    impact: "high",
    actionable: true,
  },
  {
    id: "5",
    title: "User Satisfaction",
    description: "CompetitorB leads in user satisfaction. Key differentiator is their documentation quality.",
    impact: "medium",
    actionable: true,
  },
]

// Mock data for anomaly detection
const mockAnomalyDetectionData: AnomalyDetectionData = {
  tokens: [
    { id: "token1", name: "Production API Key" },
    { id: "token2", name: "Development API Key" },
    { id: "token3", name: "Analytics API Key" },
    { id: "token4", name: "Partner Integration Key" },
  ],
  stats: {
    totalAnomalies: 24,
    criticalAnomalies: 3,
    detectionAccuracy: 92,
    avgResponseTime: 12,
    anomalyTrend: -15,
  },
  anomalyTrend: [
    { date: "2023-05-01", anomalies: 5, baseline: 3 },
    { date: "2023-05-02", anomalies: 3, baseline: 3 },
    { date: "2023-05-03", anomalies: 7, baseline: 3 },
    { date: "2023-05-04", anomalies: 4, baseline: 3 },
    { date: "2023-05-05", anomalies: 2, baseline: 3 },
    { date: "2023-05-06", anomalies: 1, baseline: 3 },
    { date: "2023-05-07", anomalies: 2, baseline: 3 },
  ],
  anomalyTypes: [
    { type: "Request Volume Spike", count: 8 },
    { type: "Error Rate Increase", count: 6 },
    { type: "Latency Spike", count: 5 },
    { type: "Unusual Access Pattern", count: 3 },
    { type: "Geographic Anomaly", count: 2 },
  ],
  recentAnomalies: [
    {
      id: "anom1",
      title: "Sudden API Request Spike",
      description: "Request volume increased by 300% in a 5-minute period",
      severity: "critical",
      type: "Request Volume Spike",
      tokenId: "token1",
      tokenName: "Production API Key",
      timestamp: "2023-05-07 14:32:15",
      status: "investigating",
    },
    {
      id: "anom2",
      title: "Elevated Error Rate",
      description: "Error rate increased to 15% for authentication endpoints",
      severity: "high",
      type: "Error Rate Increase",
      tokenId: "token1",
      tokenName: "Production API Key",
      timestamp: "2023-05-07 10:15:22",
      status: "new",
    },
    {
      id: "anom3",
      title: "Unusual Geographic Access",
      description: "Sudden increase in API calls from previously inactive region",
      severity: "medium",
      type: "Geographic Anomaly",
      tokenId: "token3",
      tokenName: "Analytics API Key",
      timestamp: "2023-05-06 22:45:11",
      status: "resolved",
    },
    {
      id: "anom4",
      title: "Latency Increase",
      description: "Average latency increased by 200ms across all endpoints",
      severity: "medium",
      type: "Latency Spike",
      tokenId: "token2",
      tokenName: "Development API Key",
      timestamp: "2023-05-06 16:20:45",
      status: "resolved",
    },
    {
      id: "anom5",
      title: "Unusual Access Pattern",
      description: "Sequential scanning of user IDs detected",
      severity: "high",
      type: "Unusual Access Pattern",
      tokenId: "token4",
      tokenName: "Partner Integration Key",
      timestamp: "2023-05-06 08:12:33",
      status: "resolved",
    },
  ],
  volumePattern: [
    { time: "08:00", actual: 1200, expected: 1100 },
    { time: "09:00", actual: 1500, expected: 1400 },
    { time: "10:00", actual: 1800, expected: 1700 },
    { time: "11:00", actual: 2100, expected: 1900 },
    { time: "12:00", actual: 2400, expected: 2000 },
    { time: "13:00", actual: 4500, expected: 2100 },
    { time: "14:00", actual: 2300, expected: 2200 },
    { time: "15:00", actual: 2100, expected: 2000 },
  ],
  errorPattern: [
    { time: "08:00", actual: 2, threshold: 5 },
    { time: "09:00", actual: 3, threshold: 5 },
    { time: "10:00", actual: 4, threshold: 5 },
    { time: "11:00", actual: 12, threshold: 5 },
    { time: "12:00", actual: 8, threshold: 5 },
    { time: "13:00", actual: 6, threshold: 5 },
    { time: "14:00", actual: 4, threshold: 5 },
    { time: "15:00", actual: 3, threshold: 5 },
  ],
  latencyPattern: [
    { time: "08:00", actual: 120, baseline: 125 },
    { time: "09:00", actual: 125, baseline: 125 },
    { time: "10:00", actual: 130, baseline: 125 },
    { time: "11:00", actual: 135, baseline: 125 },
    { time: "12:00", actual: 220, baseline: 125 },
    { time: "13:00", actual: 180, baseline: 125 },
    { time: "14:00", actual: 150, baseline: 125 },
    { time: "15:00", actual: 130, baseline: 125 },
  ],
  geoPattern: [
    { location: "North America", count: 5200, anomalies: 0 },
    { location: "Europe", count: 3800, anomalies: 0 },
    { location: "Asia", count: 2100, anomalies: 0 },
    { location: "South America", count: 800, anomalies: 0 },
    { location: "Africa", count: 200, anomalies: 150 },
    { location: "Oceania", count: 600, anomalies: 0 },
  ],
  volumeInsights: "Unusual spike in request volume detected at 13:00, exceeding expected values by 114%.",
  errorInsights: "Error rate exceeded threshold between 11:00 and 12:00, primarily affecting authentication endpoints.",
  latencyInsights:
    "Latency spike observed at 12:00, with values 76% above baseline. Affected endpoints: /api/data and /api/users.",
  geoInsights: "Unusual activity detected from Africa region, with 75% of traffic potentially anomalous.",
  lastUpdated: "2023-05-07 15:30:45",
}

// API functions
export async function getPredictiveAnalytics(tokenId: string, timeRange: string): Promise<ApiTokenPrediction[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockPredictiveData
}

export async function getScenarioPlanning(): Promise<ApiTokenScenario[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mockScenarios
}

export async function createScenario(scenario: Omit<ApiTokenScenario, "id">): Promise<ApiTokenScenario> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return {
    ...scenario,
    id: `scenario-${Date.now()}`,
  }
}

export async function getCompetitiveAnalytics(): Promise<{
  competitors: CompetitorData[]
  insights: CompetitiveInsight[]
}> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))
  return {
    competitors: mockCompetitors,
    insights: mockCompetitiveInsights,
  }
}

export async function getAnomalyDetectionData(tokenId: string, timeRange: string): Promise<AnomalyDetectionData> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return mockAnomalyDetectionData
}

export async function updateAnomalySettings(settings: AnomalySettings): Promise<void> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800))
  // In a real implementation, this would update the settings on the server
  console.log("Settings updated:", settings)
}
