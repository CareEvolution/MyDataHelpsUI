import React, { MouseEventHandler } from "react";
import "./UnstyledButton.css"

export interface UnstyledButtonProps {
    onClick: MouseEventHandler;
    stopPropagation?: boolean;
    className?: string;
    children?: React.ReactNode;
    title?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    innerRef?: React.Ref<HTMLButtonElement>;
}

export default function (props: UnstyledButtonProps) {
    return (
        <button
            ref={props.innerRef}
            title={props.title}
            className={"mdhui-unstyled-button " + (props.className || "")}
            onClick={event => {
                if (props.stopPropagation) {
                    event.stopPropagation();
                }
                props.onClick(event);
            }}
            style={props.style}
            disabled={props.disabled}>
            {props.children}
        </button>
    );
}