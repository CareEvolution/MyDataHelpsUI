import type { ReactElement } from "react";
import { useContext } from "react";
import type { ColorDefinition } from "../../../helpers";
import { resolveColor } from "../../../helpers";
import { LayoutContext } from "../Layout";
import React from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./BasicBadge.css"

export interface BasicBadgeProps {
    backgroundColor?: ColorDefinition;
    size?: "small" | "xl";
    children?: ReactElement;
}

export default function (props: BasicBadgeProps) {
    const layoutContext = useContext<LayoutContext>(LayoutContext);
    let classes = ["mdhui-basic-badge"];
    if (props.size === "xl") classes.push("mdhui-basic-badge-xl");

    return (
        <div className={classes.join(" ")} style={{ backgroundColor: resolveColor(layoutContext.colorScheme, props.backgroundColor), color: "#FFD379" }}>
            <FontAwesomeSvgIcon className="mdhui-basic-badge-icon" icon={faStar} size={"2x"} />
            <div className="mdhui-basic-badge-children">{props.children}</div>
        </div>
    );
}