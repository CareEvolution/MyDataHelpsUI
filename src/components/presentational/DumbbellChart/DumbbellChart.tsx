import "./DumbbellChart.css";
import Dumbbell from "./Dumbbell";
import React from "react";

export interface ClosedInterval { values: number[] };

export interface DataPoint {
    dataSet1: ClosedInterval;
    dataSet2: ClosedInterval;
}

export interface DumbbellDataPoint {
    dataPoint?: DataPoint;
    xValue: string,
    class?: DumbbellClass
}

export interface Axis {
    yRange: ClosedInterval;
    yIncrement: number;
    xIncrement: number;
}

export interface DumbBellChartProps {
    axis: Axis;
    dumbbells: DumbbellDataPoint[];
    variant?: "default" | "minimal";
}

export enum DumbbellClass {
    "mdhui-dumbbell-in-range",
    "mdhui-dumbbell-out-of-range"
}

export default function DumbbellChart(props: DumbBellChartProps) {
    const _minRange = props.axis.yRange.values[0];
    const _maxRange = props.axis.yRange.values[1];
    const _range = _maxRange - _minRange;

    function buildYAxis() {
        const increments = _range / props.axis.yIncrement;
        const yAxis: React.ReactElement[] = [];
        var yValue = props.axis.yRange.values[0];
        var bottom = 0;
        var style = { "bottom": `${0}%` };
        for (var i = 0; i < (increments + 1); i++) {
            var key = `yAxis${i + 1}`;
            var yLabel = yValue;
            let axisTextClass: string[] = ["mdhui-dumbbell-axis-text"];
            if (i == increments || i == 0) {
                axisTextClass.push("mdhui-dumbbell-axis-text-hidden");
            }
            yAxis.push(<div className="mdhui-dumbbell-y-axis" style={style} key={key}><div className={axisTextClass.join(' ')} >{yLabel}</div></div>);
            yValue = (yValue + props.axis.yIncrement);
            bottom = (i + 1) * props.axis.yIncrement;
            style = { "bottom": `${(bottom / _range) * 100}%` };
        }

        return (yAxis);
    }

    function buildDumbbells() {
        return (props.dumbbells.map((db, index) => <Dumbbell key={`mdhui-dumbbell-${index}`} dumbbell={db} axis={props.axis} index={index + 1} />));
    }

    let classes = ["mdhui-dumbbell-visualization"];
    if (props.variant === "minimal") {
        classes.push("mdhui-dumbbell-visualization-minimal");
    }

    return (
        <div className={classes.join(" ")}>
            <div className="mdhui-dumbbell-chart">
                {buildDumbbells()}
                {buildYAxis()}
            </div>
        </div>
    )
}