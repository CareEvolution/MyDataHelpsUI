import React, { CSSProperties, ReactNode, Ref, useContext } from 'react';
import './ProgressRing.css';
import { ColorDefinition, resolveColor } from '../../../helpers';
import { LayoutContext } from '../Layout';
import { v4 as uuid } from 'uuid';

export interface ProgressRingProps {
    diameter?: number;
    strokeWidth?: number;
    color?: ColorDefinition;
    incompleteColor?: ColorDefinition;
    percentCompleted?: number;
    animate?: boolean;
    style?: CSSProperties;
    children: ReactNode;
    innerRef?: Ref<HTMLDivElement>;
}

export default function ProgressRing(props: ProgressRingProps) {
    const context = useContext(LayoutContext);

    const diameter = props.diameter ?? 220;
    const strokeWidth = props.strokeWidth ?? 20;

    const circleDiameter = diameter - strokeWidth;
    const circleCircumference = circleDiameter * Math.PI;

    let offset = 0;
    if (props.percentCompleted !== undefined) {
        offset = circleCircumference - ((props.percentCompleted / 100.0) * circleCircumference);
    }

    const ringStyle = {
        width: `${diameter}px`,
        height: `${diameter}px`,
        '--mdhui-progress-ring-animation-start': circleCircumference
    } as CSSProperties;

    const svgStyle = {
        width: `${diameter}px`,
        height: `${diameter}px`,
        overflow: 'visible'
    } as CSSProperties;

    const backgroundCircleStyle = {
        strokeWidth: strokeWidth,
        strokeDasharray: circleCircumference,
        stroke: resolveColor(context.colorScheme, props.incompleteColor) ?? 'transparent'
    } as CSSProperties;

    const foregroundCircleMaskId = uuid();
    const foregroundCircleMaskStyle = {
        strokeWidth: strokeWidth + 2,
        strokeDasharray: circleCircumference,
        stroke: 'black',
        strokeDashoffset: offset,
        strokeLinecap: 'butt',
        animation: props.animate ? 'mdhui-progress-ring 750ms ease-in-out' : undefined,
        '--mdhui-progress-ring-animation-end': offset
    } as CSSProperties;

    const foregroundCircleStyle = {
        strokeWidth: strokeWidth,
        strokeDasharray: circleCircumference,
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

    return <div className="mdhui-progress-ring" style={{ ...ringStyle, ...props.style }} ref={props.innerRef}>
        <svg style={svgStyle}>
            {offset != circleCircumference &&
                <mask id={foregroundCircleMaskId} x={-strokeWidth} y={-strokeWidth} width={diameter + strokeWidth} height={diameter + strokeWidth}>
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    <circle cx="50%" cy="50%" r={circleDiameter / 2} style={foregroundCircleMaskStyle} />
                </mask>
            }
            <circle cx="50%" cy="50%" r={circleDiameter / 2} style={backgroundCircleStyle} mask={`url(#${foregroundCircleMaskId})`} />
            <circle cx="50%" cy="50%" r={circleDiameter / 2} style={foregroundCircleStyle} />
        </svg>
        <div className="mdhui-progress-ring-content" style={contentStyle}>
            {props.children}
        </div>
    </div>;
}