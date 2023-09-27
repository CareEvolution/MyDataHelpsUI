import React from "react";
import "./Title.css";

export interface TitleProps {
    order?: 1 | 2 | 3 | 4 | 5 | 6;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

export default function (props: TitleProps) {
    let Tag: keyof JSX.IntrinsicElements = `h${props.order || 1}`;
    let classes = ["mdhui-title"];
    if (props.className) {
        classes.push(props.className);
    }
    return <Tag className={classes.join(" ")} style={props.style}>{props.children}</Tag>
}