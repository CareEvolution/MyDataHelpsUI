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
    domain: [number, number]
    ranges: SparkRangeChartRange[],
    reference?: number;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SparkRangeChartProps) {
    const layoutContext = useContext(LayoutContext);
    const chartWidth = 8;

    const domainMin = Math.min(...props.domain);
    const domainMax = Math.max(...props.domain);

    const convertValueToPercent = (value: number): number => {
        return 100 - (((value - domainMin) / (domainMax - domainMin)) * 100.0);
    };

    let referencePercent: number | undefined;
    if (props.reference != undefined && props.reference >= domainMin && props.reference <= domainMax) {
        referencePercent = convertValueToPercent(props.reference);
    }

    const createReferenceOnlySvg = () => {
        return <svg width="100%" height={40} overflow="visible">
            {referencePercent !== undefined &&
                <line x1={0} y1={referencePercent + "%"} x2="100%" y2={referencePercent + "%"} stroke="var(--mdhui-background-color-2)" strokeWidth={1} strokeDasharray={3} />
            }
        </svg>;
    };

    const createRangeSvg = (range: SparkRangeChartRange, index: number) => {
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

        return <svg key={index} width="100%" height={40} overflow="visible">
            {referencePercent !== undefined &&
                <line x1={0} y1={referencePercent + "%"} x2="100%" y2={referencePercent + "%"} stroke="var(--mdhui-background-color-2)" strokeWidth={1} strokeDasharray={3} />
            }
            <line x1={`calc(50% - ${chartWidth / 2}px)`} y1={minValuePercent + '%'} x2={`calc(50% + ${chartWidth / 2}px)`} y2={minValuePercent + '%'} stroke={color} strokeWidth={2} />
            <line x1={`calc(50% - ${chartWidth / 2}px)`} y1={maxValuePercent + '%'} x2={`calc(50% + ${chartWidth / 2}px)`} y2={maxValuePercent + '%'} stroke={color} strokeWidth={2} />
            <line x1="50%" y1={minValuePercent + '%'} x2="50%" y2={maxValuePercent + '%'} stroke={color} strokeWidth={2} />
            {averageValuePercent !== undefined &&
                <circle cx="50%" cy={averageValuePercent + '%'} r={chartWidth / 2} fill={color} />
            }
        </svg>;
    };

    return <div className="mdhui-spark-range-chart" ref={props.innerRef} style={{ gridTemplateColumns: Array(props.ranges.length).fill('1fr').join(' ') }}>
        {props.ranges.length === 0 && props.reference != undefined &&  createReferenceOnlySvg()}
        {props.ranges.length > 0 && props.ranges.map(createRangeSvg)}
    </div>;
}
