import type { ColorDefinition } from "./colors"
import { LineProps } from "recharts";
import { LineDot } from "recharts/types/cartesian/Line";
import { ImplicitLabelType } from "recharts/types/component/Label";
import { AnimationDuration, AxisDomain } from "recharts/types/util/types";
import { ReactElement } from "react";
import { Props as DotProps } from "recharts/types/shape/Dot";

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
    dot?: ReactElement<SVGElement> | ((props: any) => ReactElement<SVGElement>) | boolean;
    label?: ReactElement<SVGElement> | ((props: any) => ReactElement<SVGElement>) | boolean | string | number;
    strokeWidth?: number | string;
    animationDuration?: number;
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
    label?: ImplicitLabelType
}

