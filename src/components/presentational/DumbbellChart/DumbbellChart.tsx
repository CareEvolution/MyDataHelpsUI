import "./DumbbellChart.css";
import Dumbbell from "./Dumbbell";
import React from "react";

export interface ClosedInterval { values : number[]};

export interface DataPoint {
    dataSet1 : ClosedInterval;
    dataSet2 : ClosedInterval;
}

export interface Dumbbell {
    dataPoint? : DataPoint;
    xValue : string,
    class? : DumbbellClass 
}

export interface Axis {
    yRange : ClosedInterval;
    yIncrement : number;
    xIncrement : number;
}

export interface DumbBellChartProps {
    axis : Axis;
    dumbbells : Dumbbell[];
}

export enum DumbbellClass {
    "mdhui-dumbbell-in-range",
    "mdhui-dumbbell-out-of-range"
}

export default function (props : DumbBellChartProps) {
    const _minRange = props.axis.yRange.values[0];
    const _maxRange = props.axis.yRange.values[1];
    const _range = _maxRange - _minRange;

    function buildYAxis(){
        const increments = _range / props.axis.yIncrement;
        const yAxis : any[] = [];
        var yValue = props.axis.yRange.values[0];
        var bottom = 0;
        var style = {"bottom": `${0}%`};
        for (var i = 0; i < (increments + 1); i++){
            var key = `yAxis${i+1}`;
            var yLabel = yValue;
            yAxis.push(<div className="mdhui-dumbbell-y-axis" style={style} key={key}><div className="mdhui-dumbbell-axis-text">{yLabel}</div></div>);
            yValue = (yValue + props.axis.yIncrement);
            bottom = (i + 1) * props.axis.yIncrement;
            style = {"bottom": `${(bottom/_range) * 100}%`};
        }

        return(yAxis);
    }

    function buildDumbbells()
    {
        return( props.dumbbells.map( (db, index) => <Dumbbell key={`mdhui-dumbbell-${index}`} dumbbell={db} axis={props.axis} index={index +1}/>));
    }


    return (
       <div className="mdhui-dumbbell-visualization">
            <div className="mdhui-dumbbell-chart">
                {buildDumbbells()}
                {buildYAxis()}
            </div>
       </div>
    )
}