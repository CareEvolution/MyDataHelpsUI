import React, { useContext } from "react";
import { LayoutContext, LoadingIndicator, ProgressBar, ProgressBarStep, Title } from "../../presentational";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import language from "../../../helpers/language";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { useInitializeView } from "../../../helpers/Initialization";
import "./BasicPointsForBadges.css"
import { ColorDefinition, getColorFromAssortment, resolveColor } from "../../../helpers/colors";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { BasicPointsForBadgesActivity as BasicPointsForBadgesActivity, PointsAndBadgesState, getCurrentPointsAndBadges, persistCurrentPointsAndBadges, pointsForActivity } from "../../../helpers/PointsAndBadges/PointsAndBadges";

export interface BasicPointsForBadgesProps {
    pointsPerBadge: number;
    activities: BasicPointsForBadgesActivity[];
    previewState?: "Default";
    titleColor?: ColorDefinition;
    progressBarFillColor?: ColorDefinition;
    pointsLabelColor?: ColorDefinition;
    awardBadgesViewUrl: string;
    showTotalPoints?: boolean;
}

export default function (props: BasicPointsForBadgesProps) {
    let [pointsAndBadges, setPointsAndBadges] = React.useState<PointsAndBadgesState | undefined>(undefined);
    let layoutContext = useContext<LayoutContext>(LayoutContext);

    async function awardPointsAndBadges() {
        if (props.previewState === "Default") {
            setPointsAndBadges({ points: 550 + (3 * props.pointsPerBadge), badges: 3 });
            await new Promise(resolve => setTimeout(resolve, 1000));
            setPointsAndBadges({ points: 1200 + (3 * props.pointsPerBadge), badges: 3 });
            return;
        };

        let currentState = await getCurrentPointsAndBadges();
        setPointsAndBadges(currentState);

        let newPoints = currentState.points;
        props.activities.forEach(async goal => {
            let serializedGoalState: string | undefined = undefined;
            let goalStateDataPoint = (await MyDataHelps.queryDeviceData({ type: `BasicGoal_${goal.key}`, namespace: "Project" })).deviceDataPoints;
            if (goalStateDataPoint.length > 0) {
                serializedGoalState = goalStateDataPoint[0].value;
            }
            let points = await pointsForActivity(goal, serializedGoalState);
            newPoints += points;
        });

        if (newPoints == 0) { return; }

        let lastBadgeThreshold = 0;
        for (var i = 0; i < currentState.points; i += props.pointsPerBadge) {
            lastBadgeThreshold = i;
        }

        let badgesToAward = 0;
        for (var i = lastBadgeThreshold; i < newPoints; i += props.pointsPerBadge) {
            badgesToAward++;
        }

        //keep badges the same such that points animate to fill the progress bar.  
        //after the points modal dismisses the page will refresh again to show the new badge
        let newState = { points: newPoints, badges: currentState.badges, pointsPerBadge: props.pointsPerBadge };
        await persistCurrentPointsAndBadges(newState);
        setPointsAndBadges(newState);

        if (badgesToAward > 0) {
            awardBadges(badgesToAward);
        }
    }

    useInitializeView(() => {
        awardPointsAndBadges()
    }, [], []);

    async function awardBadges(badges: number) {
        // Wait for progress bar animation
        await new Promise(resolve => setTimeout(resolve, 1000));
        MyDataHelps.openApplication(props.awardBadgesViewUrl);
    }

    function pointsUntilNextBadge() {
        let nextBadge = (pointsAndBadges!.badges + 1) * props.pointsPerBadge;
        var points = nextBadge - pointsAndBadges!.points;
        if (points < 0) {
            points = 0;
        }
        return points;
    }

    function nextBadgeColor() {
        return getColorFromAssortment(pointsAndBadges!.badges + 1)
    }

    return <div className="mdhui-basic-points-for-badges">
        <Title order={4} style={{ color: resolveColor(layoutContext.colorScheme, props.titleColor) }}>{language("current-points")}</Title>
        {pointsAndBadges &&
            <>
                <Title order={1} className="mdhui-basic-points-for-badges-points-toward-badge" style={{ color: resolveColor(layoutContext.colorScheme, props.pointsLabelColor) }}>{props.showTotalPoints ? pointsAndBadges!.points : (props.pointsPerBadge - pointsUntilNextBadge())}pts</Title>
                <ProgressBar fillPercent={(props.pointsPerBadge - pointsUntilNextBadge()) / (props.pointsPerBadge * 1.0) * 100} fillColor={resolveColor(layoutContext.colorScheme, props.progressBarFillColor) || "var(--mdhui-color-primary)"} backgroundColor="var(--mdhui-background-color-2)" steps={[{
                    percent: 100,
                    icon:
                        <ProgressBarStep borderColor={nextBadgeColor()} backgroundColor={nextBadgeColor()} height="24px">
                            <FontAwesomeIcon icon={faStar as any} size={"1x"} style={{ color: "#FFF", marginTop: "-2px" }} />
                        </ProgressBarStep>
                }]} />
                <div className="mdhui-basic-points-for-badges-next-badge">{language("points-until-next-badge").replace("{{points}}", pointsUntilNextBadge().toString())}</div>
            </>
        }
        {!pointsAndBadges &&
            <LoadingIndicator />
        }
    </div>
}