import React, { useContext } from 'react';
import './SparkRangeChart.css'
import { ColorDefinition, getColorFromAssortment, resolveColor } from "../../../helpers";
import { LayoutContext } from "../Layout";

export interface SparkRangeChartRange {
    min: number;
    max: number;
    average: number;
    color?: ColorDefinition;
}

export interface SparkRangeChartProps {
    previewState?: 'default';
    domain: [number, number]
    ranges: SparkRangeChartRange[],
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SparkRangeChartProps) {
    const layoutContext = useContext(LayoutContext);
    const chartWidth = 10;

    const domainMin = Math.min(...props.domain);
    const domainMax = Math.max(...props.domain);

    const convertValueToPercent = (value: number): number => {
        return ((value - domainMin) / (domainMax - domainMin)) * 100.0;
    };

    const createSvg = (range: SparkRangeChartRange, index: number) => {
        const minValue = Math.max(range.min, domainMin);
        const maxValue = Math.min(range.max, domainMax);

        const minValuePercent = convertValueToPercent(minValue);
        const maxValuePercent = convertValueToPercent(maxValue);

        let averageValuePercent: number | undefined;
        if (range.average != undefined) {
            const averageValue = Math.min(Math.max(range.average, domainMin), domainMax);
            averageValuePercent = convertValueToPercent(averageValue);
        }

        let color = resolveColor(layoutContext.colorScheme, range.color) ?? getColorFromAssortment(index);

        return <svg key={index} width={chartWidth} height={50} fill="cyan" overflow="visible">
            <line x1={0} y1={minValuePercent + '%'} x2={chartWidth} y2={minValuePercent + '%'} stroke={color} strokeWidth={2} />
            <line x1={0} y1={maxValuePercent + '%'} x2={chartWidth} y2={maxValuePercent + '%'} stroke={color} strokeWidth={2} />
            <line x1={chartWidth / 2} y1={minValuePercent + '%'} x2={chartWidth / 2} y2={maxValuePercent + '%'} stroke={color} strokeWidth={2} />
            {averageValuePercent !== undefined &&
                <circle cx={chartWidth / 2} cy={averageValuePercent + '%'} r={chartWidth / 2} fill={color} />
            }
        </svg>;
    };

    return <div className="mdhui-spark-range-chart" ref={props.innerRef}>
        {props.ranges.map(createSvg)}
    </div>;
}
