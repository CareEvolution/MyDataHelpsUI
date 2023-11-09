import React from "react";
import { Dumbbell, DumbbellClass, Axis } from "./DumbbellChart";
import "./DumbbellChart.css";

export interface DumbbellProps {
    dumbbell? :Dumbbell;
    axis : Axis;
    index : number;
}

export default function (props : DumbbellProps) {
    const xIncrement : number = props.axis.xIncrement;
    const halfCirclePx = 4.5;
    const minOfRange = props.axis.yRange.values[0];
    const maxOfRange = props.axis.yRange.values[1]
    const range = maxOfRange - minOfRange;

    const classEnum = props.dumbbell?.class ?? DumbbellClass.inRange;
    const dbClass = DumbbellClass[classEnum];
    const left = {"left" : `${(props.index * xIncrement) - halfCirclePx}px`};

    const dataSet1 = props.dumbbell && props.dumbbell.dataPoint ? props.dumbbell.dataPoint.dataSet1.values : [];
    const dataSet2 = props.dumbbell && props.dumbbell.dataPoint ? props.dumbbell.dataPoint.dataSet2.values : [];
    const ds1HighEnd : number = dataSet1.length >1 ? dataSet1[1] : dataSet1[0];
    const ds2HighEnd : number = dataSet2.length >1 ? dataSet2[1] : dataSet2[0];
    
    const dataSet1Bottom = dataSet1[0] - minOfRange;
    const dataSet1BottomAsPercent = getAsPercent(dataSet1Bottom, range);
    const dataSet1OutOfRange : boolean = (dataSet1[0] < minOfRange);
    const dataSet1Height = ds1HighEnd - dataSet1[0];
    const dataSet1Style : any = getStyle(`${dataSet1Height}px`, `${dataSet1BottomAsPercent}%`);

    const dataSet2Bottom = dataSet2[0] - minOfRange;
    var dataSet2BottomAsPercent = getAsPercent(dataSet2Bottom, range);
    const dataSet2OutOfRange = (dataSet2[1] >= maxOfRange);
    if (dataSet2OutOfRange){
        dataSet2BottomAsPercent = 100;
    }
    const dataSet2Height = ds2HighEnd - dataSet2[0];
    const dataSet2Style : any = getStyle(`${dataSet2Height}px`, `${dataSet2BottomAsPercent}%`);
 
    
    var lineHeight1 = (dataSet2OutOfRange ? (maxOfRange - minOfRange) : dataSet2Bottom) - (dataSet1OutOfRange ? 0 : dataSet1Bottom);
    var lineHeightAsPercent = getAsPercent(lineHeight1, range);
    lineHeightAsPercent = lineHeightAsPercent > 100 ? 100 : lineHeightAsPercent;
    const lineStyle = {"height": `${lineHeightAsPercent}%`, "bottom": `${dataSet1OutOfRange ? 0 : dataSet1BottomAsPercent}%`, "left" : `${(props.index * xIncrement) + halfCirclePx + .5}px`};
   
    function getAsPercent( xx : number, range : number){
        return ((xx/ range) * 100);
    }

    function getStyle(height : any, bottom : any){
        return {"height": height, "bottom": bottom, "left" : `${props.index * xIncrement}px`};
    }

    return (
        <div className="dumbbell">
            {props.dumbbell?.dataPoint && 
                <>
                {dataSet2OutOfRange && <div className="outOfRangeIcon top" style={{"left" : `${(props.index * xIncrement)}px`}} ></div>}
                {!dataSet2OutOfRange && <div className={`pill ${dbClass}`} style={dataSet2Style} ></div>}
                <div className={`line ${dbClass}`} style={lineStyle} ></div>
                {dataSet1OutOfRange && <div className="outOfRangeIcon bottom" style={{"left" : `${(props.index * xIncrement)}px`}} ></div>}
                {!dataSet1OutOfRange && <div className={`pill ${dbClass}`} style={dataSet1Style} ></div>}
                </>
            }
            <div style={left} className="xAxisTick axisText" key={`xAxis${props.index+1}`} >{props.dumbbell?.xValue}</div>
        </div>
    )
}