import type { ColorDefinition } from "./colors"
import { LineProps } from "recharts";
import { LineDot } from "recharts/types/cartesian/Line";
import { ImplicitLabelType } from "recharts/types/component/Label";
import { AnimationDuration, AxisDomain } from "recharts/types/util/types";

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
    connectNulls?: boolean,
    domainMin?: number | "Auto"
}

export interface MultiSeriesBarChartOptions {
    thresholds?: ChartThreshold[]
}

export interface ChartThreshold {
    value: number
    referenceLineColor?: ColorDefinition
    overThresholdColor?: ColorDefinition
    label?: ImplicitLabelType
}

