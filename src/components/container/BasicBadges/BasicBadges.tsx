import React from "react";
import { language } from "../../../helpers";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Title } from "../../presentational";

export interface BasicBadgesProps {
    badges?: number;
}

//TODO add more colors
let badgeColors = ["#c4291c", "#e35c33", "#5db37e", "#429bdf", "#7b88c6"];

export default function (props: BasicBadgesProps) {
    return (
        <div className="mdhui-basic-badges">
            <Title order={3}>{language("my-badges").replace("{{badges}}", "5")}</Title>
            <div className="badges">
                {props.badges && Array.from({ length: props.badges }).map((_, index) =>
                    <div className="badge" style={{ background: badgeColors[index], color: "#FFD379" }}>
                        <FontAwesomeSvgIcon icon={faStar} size={"2x"} />
                    </div>
                )}
            </div>
        </div>
    )
}