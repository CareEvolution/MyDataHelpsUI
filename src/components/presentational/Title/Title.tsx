import React, { ReactNode } from "react";
import "./Title.css";
import LibraryImage, { LibraryImageKey } from "../LibraryImage/LibraryImage";
import image from "@rollup/plugin-image";

export interface TitleProps {
    order?: 1 | 2 | 3 | 4 | 5 | 6;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    libraryImage?: LibraryImageKey;
    image?: ReactNode;
    imageAlignment?: "top" | "left"
    defaultMargin?: boolean
}

export default function (props: TitleProps) {
    let Tag: keyof JSX.IntrinsicElements = `h${props.order || 1}`;
    let classes = ["mdhui-title"];
    if (props.className) {
        classes.push(props.className);
    }
    if (props.imageAlignment === "top") {
        classes.push("mdhui-title-image-top");
    }
    if (props.defaultMargin) {
        classes.push("mdhui-title-default-margin");
    }

    let imageWidth = 24;
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

    if(props.imageAlignment == "top"){
        imageWidth = imageWidth * 2;
    }

    return <div className={classes.join(" ")}>
        {props.libraryImage &&
            <LibraryImage width={imageWidth} image={props.libraryImage} />
        }
        <Tag style={props.style}>{props.children}</Tag>
    </div>
}