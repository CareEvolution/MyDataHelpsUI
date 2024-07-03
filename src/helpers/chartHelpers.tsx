import React from 'react'
import { isNumber } from "lodash";
import { ChartThreshold, MultiSeriesLineChartOptions } from "./chartOptions";
import { resolveColor } from "./colors";
import { LayoutContext } from "../components";

export function createLineChartDefs(layoutContext: LayoutContext, gradientKey: string, seriesLineColors: string[], multiSeriesLineChartOptions?: MultiSeriesLineChartOptions) {
    let nDomainMin: number | undefined = undefined;
    let nDomainMax: number | undefined = undefined;

    if (multiSeriesLineChartOptions) {
        if (isNumber(multiSeriesLineChartOptions.domainMin)) nDomainMin = multiSeriesLineChartOptions.domainMin;
        nDomainMax = multiSeriesLineChartOptions.domainMax;
    }

    const getPercent = function (numerator: number, domainMin: number, domainMax: number): number {
        return (numerator - domainMin) / (domainMax - domainMin) * 100;
    }

    const createStopsFromThresholds = function (defaultLineColor: string, domainMin: number, domainMax: number, chartThresholds?: ChartThreshold[]) {
        let stops: any[] = [];
        var lineColor: string = defaultLineColor;
        var thresholds = chartThresholds ?? [];

        thresholds.sort((a, b) => a.value - b.value);

        if (thresholds.length && domainMin >= thresholds[0].value) {
            lineColor = resolveColor(layoutContext.colorScheme, thresholds[0].overThresholdColor) || defaultLineColor;
        }

        stops.push(<stop offset="0%" stopColor={lineColor} />);
        for (var i = 0; i < thresholds.length; i++) {
            if (domainMax >= thresholds[i].value) {
                var offSet = getPercent(thresholds[i].value, domainMin, domainMax);
                stops.push(<stop offset={`${offSet}%`} stopColor={lineColor} />);
                lineColor = resolveColor(layoutContext.colorScheme, thresholds[i].overThresholdColor) || defaultLineColor;
                stops.push(<stop offset={`${offSet}%`} stopColor={lineColor} />);
            }
        }
        stops.push(<stop offset="100%" stopColor={lineColor} />);

        return stops;
    }


    const defs = seriesLineColors.map((lineColor, i) => {
        if (nDomainMin !== undefined && nDomainMax !== undefined) {
            return (
                <linearGradient id={`${gradientKey}${i}`} key={`${gradientKey}${i}`} x1="0%" y1="100%" x2="0%" y2="0%">
                    {createStopsFromThresholds(lineColor, nDomainMin, nDomainMax, multiSeriesLineChartOptions?.thresholds)}
                </linearGradient>
            )
        }

        return (
            <linearGradient id={`${gradientKey}${i}`} key={`${gradientKey}${i}`} x1="0" y1="0" x2="0" y2="100%">
                <stop offset="0%" stopColor={lineColor} />
                <stop offset="100%" stopColor={lineColor} />
            </linearGradient>
        )
    });

    return <defs>{defs}</defs>;
}