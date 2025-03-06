import React from "react";
import { DumbbellDataPoint, DumbbellClass, Axis } from "./DumbbellChart";
import "./DumbbellChart.css";

export interface DumbbellProps {
    dumbbell?: DumbbellDataPoint;
    axis: Axis;
    index: number;
    hideXAxis?: boolean;
}

export default function (props: DumbbellProps) {
    const xIncrementPercent: number = props.axis.xIncrement;
    const halfCirclePx = 4.5;
    const minOfRange = props.axis.yRange.values[0];
    const maxOfRange = props.axis.yRange.values[1]
    const range = maxOfRange - minOfRange;

    const classEnum = props.dumbbell?.class ?? DumbbellClass["mdhui-dumbbell-in-range"];
    const dbClass = DumbbellClass[classEnum];
    const ds1dbClass: string[] = [dbClass];
    const ds2dbClass: string[] = [dbClass];
    const leftAsPercent = { "left": `${(props.index * xIncrementPercent)}%` };

    const dataSet1 = props.dumbbell && props.dumbbell.dataPoint ? props.dumbbell.dataPoint.dataSet1.values : [];
    const dataSet2 = props.dumbbell && props.dumbbell.dataPoint ? props.dumbbell.dataPoint.dataSet2.values : [];
    const ds1HighEnd: number = dataSet1.length > 1 ? dataSet1[1] : dataSet1[0];
    const ds2HighEnd: number = dataSet2.length > 1 ? dataSet2[1] : dataSet2[0];
    const ds2IsSingleValue: boolean = ds2HighEnd === dataSet2[0];

    const dataSet1Bottom = dataSet1[0] - minOfRange;
    const dataSet1BottomAsPercent = getAsPercent(dataSet1Bottom + halfCirclePx, range);
    var dataSet1BottomStyle = `${dataSet1BottomAsPercent}%`;
    const dataSet1LowOutOfRange: boolean = (dataSet1[0] < minOfRange);
    const dataSet1HighOutOfRange: boolean = (ds1HighEnd < minOfRange);
    const dataSet1FullOutOfRange: boolean = dataSet1HighOutOfRange;
    var dataSet1Height = ds1HighEnd - dataSet1[0];
    if (!dataSet1FullOutOfRange && dataSet1LowOutOfRange) {
        ds1dbClass.push("mdhui-dumbbell-partial-out-of-range-pill");
        ds1dbClass.push("mdhui-dumbbell-bottom-lower-out-of-range");
        dataSet1Height = ds1HighEnd - minOfRange;
        dataSet1BottomStyle = "10px";
    }
    else {
        ds1dbClass.push("mdhui-dumbbell-pill");
    }

    const dataSet1Style: any = getStyle(`${dataSet1Height}px`, dataSet1BottomStyle);

    const dataSet2LowOutOfRange: boolean = (dataSet2[0] > maxOfRange);
    const dataSet2HighOutOfRange: boolean = (ds2HighEnd > maxOfRange);
    const dataSet2FullOutOfRange = dataSet2LowOutOfRange;

    const axisLineDiv = 11;
    var dataSet2Bottom = 0;
    if (ds2IsSingleValue && dataSet2FullOutOfRange) {
        dataSet2Bottom = maxOfRange - (halfCirclePx * 2);
    }
    else {
        dataSet2Bottom = dataSet2[0] - minOfRange;
    }
    var dataSet2BottomAsPercent = getAsPercent(dataSet2Bottom, range);

    var dataSet2Height = 0;
    if (!ds2IsSingleValue) {
        var topPoint = ds2HighEnd > maxOfRange ? (maxOfRange + axisLineDiv) : ds2HighEnd;
        dataSet2Height = topPoint - dataSet2Bottom;
    }
    const dataSet2Style: any = ds2IsSingleValue ? { "bottom": `${dataSet2BottomAsPercent}%` } : getStyle(`${dataSet2Height}px`, `${dataSet2BottomAsPercent}%`);

    if (!dataSet2FullOutOfRange && dataSet2HighOutOfRange) {
        ds2dbClass.push("mdhui-dumbbell-partial-out-of-range-pill");
        ds2dbClass.push("mdhui-dumbbell-top-upper-out-of-range");
    }
    else {
        ds2dbClass.push("mdhui-dumbbell-pill");
    }


    var lineHeight1 = (dataSet2FullOutOfRange ? (maxOfRange - minOfRange) : dataSet2Bottom) - ((dataSet1FullOutOfRange || dataSet1[0] < 0) ? 0 : dataSet1Bottom);
    var lineHeightAsPercent = getAsPercent(lineHeight1, range);
    lineHeightAsPercent = lineHeightAsPercent > 100 ? 100 : lineHeightAsPercent;
    const lineBottom = (dataSet1FullOutOfRange || dataSet1Bottom <= 0) ? "10px" : `${dataSet1BottomAsPercent}%`;
    const lineStyle = { "height": `${lineHeightAsPercent}%`, "bottom": lineBottom, "left": `${halfCirclePx + .5}px` };

    function getAsPercent(xx: number, range: number) {
        return ((xx / range) * 100);
    }

    function getStyle(height: any, bottom: any) {
        return { "height": height, "bottom": bottom };
    }

    return (
        <div className="mdhui-dumbbell" style={leftAsPercent} >
            {props.dumbbell?.dataPoint &&
                <>
                    {dataSet2FullOutOfRange && <div className="mdhui-dumbbell-full-out-of-range-pill mdhui-dumbbell-top-upper-out-of-range"></div>}
                    {!dataSet2FullOutOfRange && <div className={ds2dbClass.join(' ')} style={dataSet2Style} ></div>}
                    <div className={`mdhui-dumbbell-line ${dbClass}`} style={lineStyle} ></div>
                    {dataSet1FullOutOfRange && <div className="mdhui-dumbbell-full-out-of-range-pill mdhui-dumbbell-bottom-lower-out-of-range"></div>}
                    {!dataSet1FullOutOfRange && <div className={ds1dbClass.join(' ')} style={dataSet1Style} ></div>}
                </>
            }
            {!props.hideXAxis &&
                <div className="mdhui-dumbbell-x-axis mdhui-dumbbell-axis-text" key={`xAxis${props.index + 1}`} >{props.dumbbell?.xValue}</div>
            }
        </div>
    )
}