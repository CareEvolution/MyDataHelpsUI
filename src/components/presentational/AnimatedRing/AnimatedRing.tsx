import React, { CSSProperties } from 'react'
import './AnimatedRing.css'

export interface AnimatedRingProps {
    children: React.ReactNode;
    style?: CSSProperties;
    color?: string;
}

export default function (props: AnimatedRingProps) {
    return (
        <div className="mdhui-animated-ring" style={props.style}>
            <svg>
                <circle cx="50%" cy="50%" r="100"/>
                <circle cx="50%" cy="50%" r="100" style={{stroke: props.color}}/>
            </svg>
            <div className="mdhui-animated-ring-content">
                {props.children}
            </div>
        </div>
    );
}