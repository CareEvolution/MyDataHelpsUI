import React from "react";
import "./ViewHeader.css"

export interface ViewHeaderProps {
    title?: string;
    subtitle?: string;
}

export default function (props: ViewHeaderProps) {
    if (!props.title && !props.subtitle) return null;
    return (
        <div className="mdhui-view-header">
            {props.title &&
                <div className="mdhui-view-header-title">{props.title}</div>
            }
            {props.subtitle &&
                <div className="mdhui-view-header-subtitle">{props.subtitle}</div>
            }
        </div>
    );
}