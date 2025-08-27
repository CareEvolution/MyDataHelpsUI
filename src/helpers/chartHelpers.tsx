import React from "react"
import { AreaChartSeries, ChartSeries, ChartThreshold, MultiSeriesBarChartOptions, MultiSeriesLineChartOptions } from "./chartOptions";
import { ColorDefinition, resolveColor } from "./colors";
import { LayoutContext } from "../components";
import { TimeSeriesDataPoint } from '../components/presentational/TimeSeriesChart/TimeSeriesChart';

export function createLineChartDefs(
    layoutContext: LayoutContext, 
    gradientKey: string, 
    series: ChartSeries[], 
    options: MultiSeriesLineChartOptions | undefined,
    dataKeys: string[],
    data: TimeSeriesDataPoint[] ) {

    const colorOrDefault = (colorDefinition: ColorDefinition | undefined, defaultColor: string) => {
        return resolveColor(layoutContext.colorScheme, colorDefinition) ?? defaultColor;
    };

    const getPercent = function (numerator: number, min: number, max: number): number {
        if ((max - min) > 0) {
            return (numerator - min) / (max - min) * 100;
        }
        return 0;
    }

    const createStopsFromThresholds = function (defaultLineColor: string, chartThresholds: ChartThreshold[] | undefined, dataKey: string) {
        let stops: any[] = [];
        let lineColor: string = defaultLineColor;
        let thresholds = chartThresholds ?? [];

        thresholds.sort((a, b) => a.value - b.value);

        const lineRange = data.reduce((result, dataPoint) => ({
            min: (dataPoint[dataKey] < result.min) ? dataPoint[dataKey] : result.min,
            max: (dataPoint[dataKey] > result.max) ? dataPoint[dataKey] : result.max,
        }), { min: data[0][dataKey], max: data[0][dataKey] });
        
        if (thresholds.length && lineRange.min >= thresholds[0].value) {
            lineColor = colorOrDefault(thresholds[0].overThresholdColor, defaultLineColor);
        }

        stops.push(<stop offset="0%" stopColor={lineColor} />);
        for (var i = 0; i < thresholds.length; i++) {
            if (lineRange.max >= thresholds[i].value) {
                let offSet = getPercent(thresholds[i].value, lineRange.min, lineRange.max);
                stops.push(<stop offset={`${offSet}%`} stopColor={lineColor} />);
                lineColor = colorOrDefault(thresholds[i].overThresholdColor, defaultLineColor);
                stops.push(<stop offset={`${offSet}%`} stopColor={lineColor} />);
            }
        }
        stops.push(<stop offset="100%" stopColor={lineColor} />);

        return stops.map((s, i) => ({ ...s, key: `${dataKey}_threshold_stop_${i}` }));
    }

    return <defs>
        {series.map((s, i) => {
            let lineColor = colorOrDefault(s.color, "var(--mdhui-color-primary");

            return <linearGradient id={`${gradientKey}${i}`} key={`${gradientKey}${i}`} x1="0%" y1="100%" x2="0%" y2="0%">
                {createStopsFromThresholds(lineColor, options?.thresholds, dataKeys[i])}
            </linearGradient>;
        })}
    </defs>;
}

export function createBarChartDefs(layoutContext: LayoutContext, gradientKey: string, series: ChartSeries[], options?: MultiSeriesBarChartOptions) {

    const colorOrDefault = (colorDefinition: ColorDefinition | undefined, defaultColor: string) => {
        return resolveColor(layoutContext.colorScheme, colorDefinition) ?? defaultColor;
    };

    return <defs>
        {series.map((s, i) =>
            <linearGradient key={`lg-${s.dataKey}`} id={`${gradientKey}${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colorOrDefault(s.color, "var(--mdhui-color-primary)")} stopOpacity={1.0} />
                <stop offset="100%" stopColor={colorOrDefault(s.color, "var(--mdhui-color-primary)")} stopOpacity={0.7} />
            </linearGradient>
        )}
        {options?.thresholds?.map((threshold, index) =>
            <linearGradient key={`lg_thresh_${index}`} id={gradientKey + "_threshold" + index} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colorOrDefault(threshold.overThresholdColor, "var(--mdhui-color-warning)")} stopOpacity={1.0} />
                <stop offset="100%" stopColor={colorOrDefault(threshold.overThresholdColor, "var(--mdhui-color-warning)")} stopOpacity={0.7} />
            </linearGradient>
        )}
    </defs>;
}

export function createAreaChartDefs(layoutContext: LayoutContext, gradientKey: string, series: AreaChartSeries[]) {

    const colorOrDefault = (colorDefinition: ColorDefinition | undefined, defaultColor: string) => {
        return resolveColor(layoutContext.colorScheme, colorDefinition) ?? defaultColor;
    };

    return <defs>
        {series.map((s, i) =>
            <>
                <linearGradient key={`lg-${s.dataKey}-fill`} id={`${gradientKey}${i}-fill`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colorOrDefault(s.areaColor, "var(--mdhui-color-primary)")} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={colorOrDefault(s.areaColor, "var(--mdhui-color-primary)")} stopOpacity={0.2} />
                </linearGradient>
                <linearGradient key={`lg-${s.dataKey}-stroke`} id={`${gradientKey}${i}-stroke`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={colorOrDefault(s.color, "var(--mdhui-color-primary)")} />
                    <stop offset="100%" stopColor={colorOrDefault(s.color, "var(--mdhui-color-primary)")} />
                </linearGradient>
            </>
        )}
    </defs>;
}