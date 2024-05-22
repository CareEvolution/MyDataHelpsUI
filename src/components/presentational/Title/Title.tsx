import React, { ReactNode, useContext } from "react";
import "./Title.css";
import { LayoutContext } from "../Layout";
import { ColorDefinition, resolveColor } from "../../../helpers/colors";

export interface TitleProps {
    color?: ColorDefinition
    order?: 1 | 2 | 3 | 4 | 5 | 6;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    image?: ReactNode;
    autosizeImage?: boolean;
    imageAlignment?: "top" | "left"
    defaultMargin?: boolean
    innerRef?: React.Ref<HTMLDivElement>
}

export default function (props: TitleProps) {
    let Tag: keyof JSX.IntrinsicElements = `h${props.order || 1}`;
    let classes = ["mdhui-title"];
    if (props.className) {
        classes.push(props.className);
    }


    let context = useContext(LayoutContext);
    let color = resolveColor(context?.colorScheme, props.color);

    if (props.imageAlignment === "top") {
        classes.push("mdhui-title-image-top");
    }
    if (props.defaultMargin) {
        classes.push("mdhui-title-default-margin");
    }

    let imageWidth: number | null = null;
    if (props.image && props.autosizeImage) {
        imageWidth = 24;
        switch (props.order) {
            case 1:
                imageWidth = 40;
                break;
            case 2:
                imageWidth = 30;
                break;
            case 3:
                imageWidth = 24;
                break;
            case 4:
                imageWidth = 20;
                break;
            case 5:
                imageWidth = 16;
                break;
            case 6:
                imageWidth = 12;
                break;
        }
        if (props.imageAlignment == "top") {
            imageWidth = imageWidth * 2;
        }
    }

    return <div className={classes.join(" ")} ref={props.innerRef}>
        {props.image &&
            <div className={"mdhui-title-image " + (props.autosizeImage ? "mdhui-title-image-autosize" : "")} style={{ width: imageWidth + "px" }}>
                {props.image}
            </div>
        }
        <Tag style={{ ...props.style, color: color }}>{props.children}</Tag>
    </div>
}