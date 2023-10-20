import React, { useContext } from "react";
import "./Title.css";
import { LayoutContext } from "../Layout";
import { ColorDefinition, resolveColor } from "../../../helpers/colors";

export interface TitleProps {
    color?: ColorDefinition
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

    let context = useContext(LayoutContext);
    let color = resolveColor(context?.colorScheme, props.color);
    return <Tag className={classes.join(" ")} style={{...props.style, color:color}}>{props.children}</Tag>
}