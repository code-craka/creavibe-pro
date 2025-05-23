import type {
  ApiTokenPrediction,
  ApiTokenScenario,
  CompetitorData,
  CompetitiveInsight,
  AnomalyDetectionData,
  AnomalySettings,
  ApiUsageDataPoint,
  ApiUsageForecast,
  ApiUsageTimeframe,
  ScenarioSimulation,
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
async function getPredictiveAnalytics(): Promise<ApiTokenPrediction[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockPredictiveData
}

async function getScenarioPlanning(): Promise<ApiTokenScenario[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mockScenarios
}

async function createScenario(scenario: Omit<ApiTokenScenario, "id">): Promise<ApiTokenScenario> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return {
    ...scenario,
    id: `scenario-${Date.now()}`,
  }
}

async function getCompetitiveAnalytics(): Promise<{
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

async function getAnomalyDetectionData(): Promise<AnomalyDetectionData> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1200))
  return mockAnomalyDetectionData
}

async function updateAnomalySettings(settings: AnomalySettings): Promise<void> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800))
  // In a real implementation, this would update the settings on the server
  console.log("Settings updated:", settings)
}

// Mock data for historical data
const mockHistoricalData: ApiUsageDataPoint[] = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  value: 1000 + Math.floor(Math.random() * 500),
  type: 'historical'
}));

// Mock data for forecast data
const mockForecastData: ApiUsageForecast = {
  dataPoints: Array.from({ length: 14 }, (_, i) => ({
    date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: 1200 + Math.floor(Math.random() * 700),
    type: 'forecast'
  })),
  accuracy: 0.85,
  trend: 'increasing',
  insights: [
    'API usage is projected to increase by 15% over the next two weeks',
    'Weekend usage patterns show 30% lower volume than weekdays',
    'Consider scaling resources to accommodate growth'
  ]
};

// Mock data for timeframes
const mockTimeframes: ApiUsageTimeframe[] = [
  { id: '7', label: '7 days', days: 7 },
  { id: '14', label: '14 days', days: 14, default: true },
  { id: '30', label: '30 days', days: 30 },
  { id: '90', label: '90 days', days: 90 }
];

// Mock data for scenario simulations
const mockScenarioSimulations: ScenarioSimulation[] = [
  {
    id: 'scenario-1',
    name: 'New Marketing Campaign',
    description: 'Simulate the impact of a new marketing campaign on API usage',
    parameters: [
      { name: 'Expected New Users', value: 5000, min: 1000, max: 10000, step: 100 },
      { name: 'API Calls Per User', value: 10, min: 1, max: 50, step: 1 }
    ],
    results: [
      { 
        metric: 'Daily Requests', 
        baseline: 50000, 
        simulated: 100000, 
        change: 100, 
        impact: 'positive' 
      },
      { 
        metric: 'Response Time', 
        baseline: 150, 
        simulated: 180, 
        change: 20, 
        impact: 'negative' 
      }
    ],
    recommendations: [
      'Consider scaling API infrastructure before campaign launch',
      'Implement caching to reduce response time impact'
    ],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'scenario-2',
    name: 'Feature Deprecation',
    description: 'Simulate the impact of deprecating the legacy search API',
    parameters: [
      { name: 'Current Usage %', value: 15, min: 0, max: 100, step: 1 },
      { name: 'Migration Rate', value: 50, min: 0, max: 100, step: 5 }
    ],
    results: [
      { 
        metric: 'Daily Requests', 
        baseline: 50000, 
        simulated: 42500, 
        change: -15, 
        impact: 'negative' 
      },
      { 
        metric: 'Error Rate', 
        baseline: 2.5, 
        simulated: 1.8, 
        change: -28, 
        impact: 'positive' 
      }
    ],
    recommendations: [
      'Provide clear migration documentation',
      'Implement gradual deprecation with warnings'
    ],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Additional API functions
async function getHistoricalData(days: number = 30): Promise<ApiUsageDataPoint[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockHistoricalData.slice(-days);
}

async function getForecastData(days: number = 14): Promise<ApiUsageForecast> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Adjust the forecast data based on the requested days
  const adjustedForecast = {
    ...mockForecastData,
    dataPoints: Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() + (i + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      value: 1200 + Math.floor(Math.random() * 700),
      type: 'forecast' as const
    }))
  };
  
  return adjustedForecast;
}

async function getAvailableTimeframes(): Promise<ApiUsageTimeframe[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockTimeframes;
}

async function getScenarioSimulations(): Promise<ScenarioSimulation[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockScenarioSimulations;
}

async function createScenarioSimulation(scenario: {
  name: string;
  description: string;
  baselineUsage?: number;
  simulatedUsage?: number;
  percentageChange?: number;
  impactAssessment?: string;
}): Promise<ScenarioSimulation> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  // Create a new scenario simulation with the provided data
  const newScenario: ScenarioSimulation = {
    id: `scenario-${Date.now()}`,
    name: scenario.name,
    description: scenario.description,
    parameters: [
      { name: 'Baseline Usage', value: scenario.baselineUsage || 5000, min: 1000, max: 10000, step: 100 }
    ],
    results: [
      {
        metric: 'API Requests',
        baseline: scenario.baselineUsage || 5000,
        simulated: scenario.simulatedUsage || 6000,
        change: scenario.percentageChange || 20,
        impact: (scenario.percentageChange || 20) > 0 ? 'positive' : 'negative'
      }
    ],
    recommendations: [
      scenario.impactAssessment || 'Consider the impact on your API infrastructure.'
    ],
    createdAt: new Date().toISOString()
  };
  
  // Add to mock data (for persistence during the session)
  mockScenarioSimulations.push(newScenario);
  
  return newScenario;
}

async function deleteScenarioSimulation(scenarioId: string): Promise<boolean> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  // Find the index of the scenario to delete
  const index = mockScenarioSimulations.findIndex(scenario => scenario.id === scenarioId);
  
  if (index !== -1) {
    // Remove the scenario from the mock data
    mockScenarioSimulations.splice(index, 1);
    return true;
  }
  
  return false;
}

// Create and export the service object
export const apiAnalyticsAdvancedService = {
  getPredictiveAnalytics,
  getScenarioPlanning,
  createScenario,
  getCompetitiveAnalytics,
  getAnomalyDetectionData,
  updateAnomalySettings,
  getHistoricalData,
  getForecastData,
  getAvailableTimeframes,
  getScenarioSimulations,
  createScenarioSimulation,
  deleteScenarioSimulation
}

// Also export individual functions for backward compatibility
export {
  getPredictiveAnalytics,
  getScenarioPlanning,
  createScenario,
  getCompetitiveAnalytics,
  getAnomalyDetectionData,
  updateAnomalySettings,
  getHistoricalData,
  getForecastData,
  getAvailableTimeframes,
  getScenarioSimulations,
  createScenarioSimulation,
  deleteScenarioSimulation
}
