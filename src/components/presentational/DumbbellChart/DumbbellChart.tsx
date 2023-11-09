import "./DumbbellChart.css";
import line from './horizontalLine.svg';
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import MyDataHelps from "@careevolution/mydatahelps-js";
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
    inRange,
    outOfRange
}

export default function (props : DumbBellChartProps) {
    const mdh = MyDataHelps;
    const _minRange = props.axis.yRange.values[0];
    const _maxRange = props.axis.yRange.values[1];
    const _range = _maxRange - _minRange;

    const [yAxisLines, setYAxisLines] = useState<any[]>([]);
    const [chartDumbbells, setChartDumbbells] = useState<any[]>([]);

    async function initialize(){
        buildYAxis();
        buildDumbbells();
    }

    function buildYAxis(){
        const increments = _range / props.axis.yIncrement;
        const yAxis : any[] = [];
        var yValue = props.axis.yRange.values[0];
        var bottom = 0;
        var style = {"bottom": `${0}%`};

        for (var i = 0; i < (increments + 1); i++){
            var key = `yAxis${i+1}`;
            var yLabel = (i == 0) ? "" : yValue;
            yAxis.push(<div className="yAxisTick" style={style} key={key}><img src={line}></img><div className="axisText">{yLabel}</div></div>);
            yValue = (yValue + props.axis.yIncrement);
            bottom = (i + 1) * props.axis.yIncrement;
            style = {"bottom": `${(bottom/_range) * 100}%`};
        }

        setYAxisLines(yAxis);
    }

    function buildDumbbells()
    {
        setChartDumbbells( props.dumbbells.map( (db, index) => <Dumbbell key={db.xValue} dumbbell={db} axis={props.axis} index={index +1}/>));
    }

    useEffect(() => {
        let debouncedInitialize = debounce(initialize, 500);
 
         debouncedInitialize();
 
         mdh.on("applicationDidBecomeVisible", debouncedInitialize);
         
         return () => {
             mdh.off("applicationDidBecomeVisible", debouncedInitialize);
         }
     }, [props.dumbbells]);

    return (
       <div className="dumbbellViz">
            <div className="grid">
                {chartDumbbells}
                {yAxisLines}
            </div>
       </div>
    )
}