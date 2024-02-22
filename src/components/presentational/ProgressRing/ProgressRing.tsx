import React, { CSSProperties, useContext } from 'react'
import './ProgressRing.css'
import { ColorDefinition, resolveColor } from "../../../helpers/colors";
import { LayoutContext } from "../Layout";

export interface ProgressRingProps {
    children: React.ReactNode;
    style?: CSSProperties;
    color?: ColorDefinition;
    percentCompleted?: number;
    animate?: boolean;
}

export default function (props: ProgressRingProps) {
    const context = useContext(LayoutContext);

    let offset = 0;
    if (props.percentCompleted) {
        offset = 630 - ((props.percentCompleted / 100.0) * 630);
    }

    const circleStyle = {
        stroke: resolveColor(context.colorScheme, props.color),
        strokeDashoffset: offset,
        animation: props.animate ? 'mdhui-progress-ring 750ms ease-in-out' : undefined,
        '--mdhui-progress-ring-animation-end': offset
    } as CSSProperties;

    const contentStyle = {
        opacity: props.animate ? 0 : 1,
        animation: props.animate ? 'fadein 500ms ease-in-out' : undefined,
        animationDelay: '500ms',
        animationFillMode: 'forwards'
    } as CSSProperties;

    return (
        <div className="mdhui-progress-ring" style={props.style}>
            <svg>
                <circle cx="50%" cy="50%" r="100"/>
                <circle cx="50%" cy="50%" r="100" style={circleStyle}/>
            </svg>
            <div className="mdhui-progress-ring-content" style={contentStyle}>
                {props.children}
            </div>
        </div>
    );
}