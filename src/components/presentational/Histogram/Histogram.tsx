import React from 'react';
import "./Histogram.css"
import ShinyOverlay from "../ShinyOverlay";

export interface HistogramProps {
    entries: {
        label: string;
        color: string;
        value: number;
    }[];
}

export default function (props: HistogramProps) {
    let maxValue = 0;
    props.entries.forEach(function (e) {
        if (e.value > maxValue) {
            maxValue = e.value;
        }
    });

    return (
        <div className="mdhui-histogram">
            {props.entries.map((entry, index) => {
                return <div className="mdhui-histogram-entry" key={index}>
                    <div className="mdhui-histogram-entry-bar-wrapper">
                        <div className="mdhui-histogram-entry-bar" style={{background: entry.color, width: ((entry.value / maxValue) * 100) + "%"}}>
                            <ShinyOverlay/>
                        </div>
                        <div className="mdhui-histogram-entry-value" style={{width: (maxValue.toString().length * 8) + "px"}}>{entry.value}</div>
                    </div>
                    <div className="mdhui-histogram-entry-label">{entry.label}</div>
                </div>;
            })}
        </div>
    );
}