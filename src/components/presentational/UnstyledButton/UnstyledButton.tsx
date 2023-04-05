import React, { MouseEventHandler } from "react";
import "./UnstyledButton.css"

export interface UnstyledButtonProps {
	onClick: MouseEventHandler;
    className?: string;
    children?: React.ReactNode;
    title?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
}

export default function (props: UnstyledButtonProps) {
    return (
        <button
            title={props.title}
            className={"mdhui-unstyled-button " + (props.className || "")}
            onClick={props.onClick}
            style={props.style}
            disabled={props.disabled}>
            {props.children}
        </button>
    );
}