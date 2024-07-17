import React from 'react'
import { isNumber } from "lodash";
import { ChartThreshold, MultiSeriesLineChartOptions } from "./chartOptions";
import { resolveColor } from "./colors";
import { LayoutContext } from "../components";
import { TimeSeriesDataPoint } from '../components/presentational/TimeSeriesChart/TimeSeriesChart';

export function createLineChartDefs(
    layoutContext: LayoutContext, 
    gradientKey: string, 
    seriesLineColors: string[], 
    multiSeriesLineChartOptions: MultiSeriesLineChartOptions | undefined,
    dataKeys: string[],
    data: TimeSeriesDataPoint[] ) {

    const getPercent = function (numerator: number, min: number, max: number) {
        if ((max - min) > 0){
            return (numerator - min) / (max - min) * 100;
        }
        return 0;
    }

    const createStopsFromThresholds = function (defaultLineColor: string, chartThresholds: ChartThreshold[] | undefined, index: number) {
        let stops: any[] = [];
        var lineColor: string = defaultLineColor;
        var thresholds = chartThresholds ?? [];

        thresholds.sort((a, b) => a.value - b.value);

        const lineRange = data.reduce((result, dataPoint) => ({
            min: (dataPoint[dataKeys[index]] < result.min || result.min === 0) ? dataPoint[dataKeys[index]] : result.min,
            max: (dataPoint[dataKeys[index]] > result.max || result.max === 0) ? dataPoint[dataKeys[index]] : result.max,
          }), { min: 0, max: 0 });

        if (thresholds.length && lineRange.min >= thresholds[0].value) {
            lineColor = resolveColor(layoutContext.colorScheme, thresholds[0].overThresholdColor) || defaultLineColor;
        }

        console.log()

        console.log(`Index: ${index}, lineMin: ${lineRange.min}, lineMax, ${lineRange.max}`);

        stops.push(<stop offset="0%" stopColor={lineColor} />);
        for (var i = 0; i < thresholds.length; i++) {
            if (lineRange.max >= thresholds[i].value) {
                var offSet = getPercent(thresholds[i].value, lineRange.min, lineRange.max);
                stops.push(<stop offset={`${offSet}%`} stopColor={lineColor} />);
                lineColor = resolveColor(layoutContext.colorScheme, thresholds[i].overThresholdColor) || defaultLineColor;
                stops.push(<stop offset={`${offSet}%`} stopColor={lineColor} />);
            }
        }
        stops.push(<stop offset="100%" stopColor={lineColor} />);

        return stops;
    }


    const defs = seriesLineColors.map((lineColor, i) => {
            return (
                <linearGradient id={`${gradientKey}${i}`} key={`${gradientKey}${i}`} x1="0%" y1="100%" x2="0%" y2="0%">
                    {createStopsFromThresholds(lineColor, multiSeriesLineChartOptions?.thresholds, i)}
                </linearGradient>
            );
    });

    return <defs>{defs}</defs>;
}