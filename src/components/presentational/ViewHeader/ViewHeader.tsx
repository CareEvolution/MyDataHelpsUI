import React, { useContext } from "react";
import "./ViewHeader.css"
import { ColorDefinition, resolveColor } from "../../../helpers/colors";
import { LayoutContext } from "../Layout";

export interface ViewHeaderProps {
    title?: string;
    subtitle?: string;
	titleColor?: ColorDefinition;
	subtitleColor?: ColorDefinition;
}

export default function (props: ViewHeaderProps) {
	let layoutContext = useContext(LayoutContext);
    
    if (!props.title && !props.subtitle) return null;
    return (
        <div className="mdhui-view-header">
            {props.title &&
                <div style={{color:resolveColor(layoutContext.colorScheme, props.titleColor)}} className="mdhui-view-header-title">{props.title}</div>
            }
            {props.subtitle &&
                <div style={{color:resolveColor(layoutContext.colorScheme, props.subtitleColor)}} className="mdhui-view-header-subtitle">{props.subtitle}</div>
            }
        </div>
    );
}