import type { ColorDefinition } from "./colors"
import { ReactElement } from "react";

export interface LineChartOptions {
    lineColor?: string;
    domainMin?: number | "Auto";
}

export interface BarChartOptions {
    barColor?: ColorDefinition;
    thresholds?: BarChartThreshold[];
}

export interface BarChartThreshold {
    value: number;
    referenceLineColor?: ColorDefinition;
    overThresholdBarColor?: ColorDefinition;
}

export interface AreaChartOptions {
    lineColor?: ColorDefinition;
    areaColor?: ColorDefinition;
}

export interface ChartSeries {
    dataKey: string;
    color?: ColorDefinition;
}

export interface AreaChartSeries extends ChartSeries {
    areaColor?: ColorDefinition;
}

export interface TimeSeriesChartContainerOptions {
    height?: string | number;
}

export interface TimeSeriesGridOptions {
    hide?: boolean;
}

export interface TimeSeriesChartXAxisOptions {
    height?: number | undefined;
    domain?: [number | string, number | string];
    ticks?: (string | number)[];
    tickFormatter?: (value: any, index: number) => string;
}

export interface TimeSeriesChartYAxisOptions {
    width?: number;
    domain?: [number | string, number | string];
    ticks?: (string | number)[];
}

export type TimeSeriesChartLabel = ReactElement<SVGElement> | ((props: any) => ReactElement<SVGElement>) | boolean | string | number;
export type TimeSeriesChartLineDot = ReactElement<SVGElement> | ((props: any) => ReactElement<SVGElement>) | boolean;

export interface TimeSeriesChartLineOptions {
    connectNulls?: boolean;
    dot?: TimeSeriesChartLineDot;
    label?: TimeSeriesChartLabel;
    strokeWidth?: number;
    animationDuration?: number;
}

export interface TimeSeriesChartOptions {
    containerOptions?: TimeSeriesChartContainerOptions;
    gridOptions?: TimeSeriesGridOptions;
    xAxisOptions?: TimeSeriesChartXAxisOptions;
    yAxisOptions?: TimeSeriesChartYAxisOptions;
}

export interface MultiSeriesLineChartOptions extends TimeSeriesChartOptions {
    thresholds?: ChartThreshold[];
    lineOptions?: TimeSeriesChartLineOptions;
}

export interface MultiSeriesBarChartOptions extends TimeSeriesChartOptions {
    thresholds?: ChartThreshold[];
}

export interface ChartThreshold {
    value: number;
    referenceLineColor?: ColorDefinition;
    overThresholdColor?: ColorDefinition;
}

