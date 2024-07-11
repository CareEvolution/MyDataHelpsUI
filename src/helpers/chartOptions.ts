import type { ColorDefinition } from "./colors"

export interface LineChartOptions {
    lineColor?: string
    domainMin?: number | "Auto"
}

export interface BarChartOptions {
    barColor?: ColorDefinition
    thresholds?: BarChartThreshold[]
}

export interface BarChartThreshold {
    value: number
    referenceLineColor?: ColorDefinition
    overThresholdBarColor?: ColorDefinition
}

export interface AreaChartOptions {
    lineColor?: ColorDefinition
    areaColor?: ColorDefinition
}

export interface ChartSeries {
    dataKey: string
    color?: ColorDefinition
}

export interface AreaChartSeries extends ChartSeries {
    areaColor?: ColorDefinition
}

export interface MultiSeriesLineChartOptions {
    connectNulls?: boolean
    hideDots?: boolean
    thresholds?: ChartThreshold[]
    domainMin?: number | "Auto"
    domainMax?: number
}

export interface MultiSeriesBarChartOptions {
    thresholds?: BarChartThreshold[]
}

export interface ChartThreshold {
    value: number
    referenceLineColor?: ColorDefinition
    overThresholdColor?: ColorDefinition
}

