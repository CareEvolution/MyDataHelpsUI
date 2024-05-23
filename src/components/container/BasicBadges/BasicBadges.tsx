import React from "react";
import { language, useInitializeView } from "../../../helpers";
import { BasicBadge, Title } from "../../presentational";
import { getBadgeColor, getCurrentPointsAndBadges } from "../../../helpers/PointsAndBadges/PointsAndBadges";
import "./BasicBadges.css"

export interface BasicBadgesProps {
    badgeCount?: number;
    title?: string;
}

export default function (props: BasicBadgesProps) {
    let [badgeCount, setBadgeCount] = React.useState<number | null>(null);

    useInitializeView(() => {
        if (props.badgeCount !== undefined) { setBadgeCount(props.badgeCount); return; }
        getCurrentPointsAndBadges().then(function (pointsAndBadges) {
            setBadgeCount(pointsAndBadges.badges);
        });
    }, [], [props.badgeCount]);

    // Intentionally hiding badge list if it's 0
    if (!badgeCount) return null;
    return (
        <div className="mdhui-basic-badges">
            <Title order={3}>{props.title || language("my-badges").replace("{{badges}}", "5")}</Title>
            <div className="mdhui-basic-badges-list">
                {badgeCount && Array.from({ length: badgeCount }).map((_, index) =>
                    <BasicBadge key={index} backgroundColor={getBadgeColor(index)} />
                )}
            </div>
        </div>
    )
}