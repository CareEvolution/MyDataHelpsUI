import { useContext } from "react";
import { ColorDefinition, resolveColor } from "../../../helpers";
import { LayoutContext } from "../Layout";
import React from "react";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./BasicBadge.css"

export interface BasicBadgeProps {
    backgroundColor?: ColorDefinition;
}

export default function (props: BasicBadgeProps) {
    let layoutContext = useContext<LayoutContext>(LayoutContext);

    return (
        <div className="mdhui-basic-badge" style={{ backgroundColor: resolveColor(layoutContext.colorScheme, props.backgroundColor), color: "#FFD379" }}>
            <FontAwesomeSvgIcon className="mdhui-basic-badge-icon" icon={faStar} size={"2x"} />
        </div>
    );
}