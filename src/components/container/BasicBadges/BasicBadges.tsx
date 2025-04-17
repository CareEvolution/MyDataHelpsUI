import React from "react";
import { getColorFromAssortment, language, useInitializeView } from "../../../helpers";
import { BasicBadge, Title } from "../../presentational";
import "./BasicBadges.css"
import MyDataHelps from "@careevolution/mydatahelps-js";
import { parsePointsAndBadgesState } from "../../../helpers/BasicPointsAndBadges/Activities";

export interface BasicBadgesProps {
    badgeCount?: number;
    title?: string;
    pointsForBadgesCustomField?: string;
}

export default function (props: BasicBadgesProps) {
    let [badgeCount, setBadgeCount] = React.useState<number | null>(null);

    useInitializeView(() => {
        if (props.badgeCount !== undefined) { setBadgeCount(props.badgeCount); return; }
        if (props.pointsForBadgesCustomField) {
            MyDataHelps.getParticipantInfo().then(participantInfo => {
                let pointsAndBadgesState = parsePointsAndBadgesState(props.pointsForBadgesCustomField!, [], participantInfo);
                setBadgeCount(pointsAndBadgesState.badges.length);
            });
        }
    }, [], [props.badgeCount]);

    // Intentionally hiding badge list if it's 0 badges
    if (!badgeCount) return null;
    let displayedCount = Math.min(badgeCount, 4);
    let remainingCount = badgeCount - displayedCount;
    return (
        <div className="mdhui-basic-badges">
            <Title order={3}>{(props.title || language("my-badges", undefined, { "badges": badgeCount.toString() }))}</Title>
            <div className="mdhui-basic-badges-first-row">
                {badgeCount && Array.from({ length: displayedCount }).map((_, index) =>
                    <BasicBadge key={`badge-${index}`} backgroundColor={getColorFromAssortment(badgeCount! - index - 1)} />
                )}
                {remainingCount > 0 &&
                    <div className="mdhui-basic-badges-more">
                        <BasicBadge backgroundColor="#429bdf" />
                        +{remainingCount} {language("more").toLowerCase()}
                    </div>
                }
            </div>
        </div>
    )
}