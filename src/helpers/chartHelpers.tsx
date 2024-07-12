import React from "react"
import { isNumber } from "lodash";
import { AreaChartSeries, ChartSeries, ChartThreshold, MultiSeriesBarChartOptions, MultiSeriesLineChartOptions } from "./chartOptions";
import { ColorDefinition, resolveColor } from "./colors";
import { LayoutContext } from "../components";

export function createLineChartDefs(layoutContext: LayoutContext, gradientKey: string, series: ChartSeries[], options?: MultiSeriesLineChartOptions) {

    const colorOrDefault = (colorDefinition: ColorDefinition | undefined, defaultColor: string) => {
        return resolveColor(layoutContext.colorScheme, colorDefinition) ?? defaultColor;
    };

    let nDomainMin: number | undefined = undefined;
    let nDomainMax: number | undefined = undefined;

    if (options) {
        if (isNumber(options.domainMin)) {
            nDomainMin = options.domainMin;
        }
        nDomainMax = options.domainMax;
    }

    const getPercent = function (numerator: number, domainMin: number, domainMax: number): number {
        if ((domainMax - domainMin) > 0) {
            return (numerator - domainMin) / (domainMax - domainMin) * 100;
        }
        return 0;
    }

    const createStopsFromThresholds = function (defaultLineColor: string, domainMin: number, domainMax: number, chartThresholds?: ChartThreshold[]) {
        let stops: any[] = [];
        let lineColor: string = defaultLineColor;
        let thresholds = chartThresholds ?? [];

        thresholds.sort((a, b) => a.value - b.value);

        if (thresholds.length && domainMin >= thresholds[0].value) {
            lineColor = colorOrDefault(thresholds[0].overThresholdColor, defaultLineColor);
        }

        stops.push(<stop offset="0%" stopColor={lineColor} />);
        for (var i = 0; i < thresholds.length; i++) {
            if (domainMax >= thresholds[i].value) {
                let offSet = getPercent(thresholds[i].value, domainMin, domainMax);
                stops.push(<stop offset={`${offSet}%`} stopColor={lineColor} />);
                lineColor = colorOrDefault(thresholds[i].overThresholdColor, defaultLineColor);
                stops.push(<stop offset={`${offSet}%`} stopColor={lineColor} />);
            }
        }
        stops.push(<stop offset="100%" stopColor={lineColor} />);

        return stops;
    }

    return <defs>
        {series.map((s, i) => {
            let lineColor = colorOrDefault(s.color, "var(--mdhui-color-primary");

            if (nDomainMin !== undefined && nDomainMax !== undefined) {
                return <linearGradient id={`${gradientKey}${i}`} key={`${gradientKey}${i}`} x1="0%" y1="100%" x2="0%" y2="0%">
                    {createStopsFromThresholds(lineColor, nDomainMin, nDomainMax, options?.thresholds)}
                </linearGradient>;
            }

            return <linearGradient id={`${gradientKey}${i}`} key={`${gradientKey}${i}`} x1="0" y1="0" x2="0" y2="100%">
                <stop offset="0%" stopColor={lineColor} />
                <stop offset="100%" stopColor={lineColor} />
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
            <linearGradient key={`lg_thresh_${threshold}`} id={gradientKey + "_threshold" + index} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colorOrDefault(threshold.overThresholdBarColor, "var(--mdhui-color-warning)")} stopOpacity={1.0} />
                <stop offset="100%" stopColor={colorOrDefault(threshold.overThresholdBarColor, "var(--mdhui-color-warning)")} stopOpacity={0.7} />
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
            <linearGradient key={`lg-${s.dataKey}`} id={`${gradientKey}${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colorOrDefault(s.color, "var(--mdhui-color-primary)")} stopOpacity={0.5} />
                <stop offset="100%" stopColor={colorOrDefault(s.color, "var(--mdhui-color-primary)")} stopOpacity={0.2} />
            </linearGradient>
        )}
    </defs>;
}