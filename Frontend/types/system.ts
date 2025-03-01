export interface SystemMetric {
  id: string
  value: number
  code: string
  status: "normal" | "warning" | "error"
}

export interface SystemIndicator {
  id: string
  label: string
  status: "active" | "inactive"
}

export interface ChartData {
  label: string
  value: number
  timestamp: string
}

export interface DonutMetric {
  label: string
  value: number
  max: number
  color: string
}

