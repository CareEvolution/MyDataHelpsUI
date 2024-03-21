import React, { useContext } from "react";
import { LayoutContext, LoadingIndicator, ProgressBar, ProgressBarStep, Title } from "../../presentational";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import language from "../../../helpers/language";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { useInitializeView } from "../../../helpers/Initialization";
import "./BasicPointsForBadges.css"
import { BasicPointsForBadgesGoal, pointsForGoal } from "./Goals";
import { ColorDefinition, resolveColor } from "../../../helpers/colors";

export interface BasicPointsForBadgesProps {
    pointsForBadge: number;
    goals: BasicPointsForBadgesGoal[];
    previewState?: "Default";
    titleColor?: string;
    progressBarFillColor?: ColorDefinition;
    pointsLabelColor?: ColorDefinition;
}

interface PointsAndBadgesState {
    points: number;
    badges: number;
}

async function getCurrentPointsAndBadges(): Promise<PointsAndBadgesState> {
    let state = (await MyDataHelps.queryDeviceData({ type: "BasicPointsAndBadges", namespace: "Project" })).deviceDataPoints;
    if (state.length > 0) {
        return JSON.parse(state[0].value);
    }
    return { points: 0, badges: 0 };
}

async function persistCurrentPointsAndBadges(state: PointsAndBadgesState) {
    await MyDataHelps.persistDeviceData([{
        type: "BasicPointsAndBadges",
        value: JSON.stringify(state)
    }]);
}

export default function (props: BasicPointsForBadgesProps) {
    let [pointsAndBadges, setPointsAndBadges] = React.useState<PointsAndBadgesState | undefined>(undefined);
    let layoutContext = useContext<LayoutContext>(LayoutContext);

    async function awardPointsAndBadges() {
        if (props.previewState === "Default") {
            setPointsAndBadges({ points: 550 + (4 * props.pointsForBadge), badges: 4 });
            return;
        };

        let currentState = await getCurrentPointsAndBadges();
        setPointsAndBadges(currentState);

        let newPoints = currentState.points;
        props.goals.forEach(async goal => {
            let serializedGoalState: string | undefined = undefined;
            let goalStateDataPoint = (await MyDataHelps.queryDeviceData({ type: `BasicGoal_${goal.key}`, namespace: "Project" })).deviceDataPoints;
            if (goalStateDataPoint.length > 0) {
                serializedGoalState = goalStateDataPoint[0].value;
            }
            let points = await pointsForGoal(goal, serializedGoalState);
            newPoints += points;
        });

        if (newPoints == 0) { return; }

        let lastBadgeThreshold = 0;
        for (var i = 0; i < currentState.points; i += props.pointsForBadge) {
            lastBadgeThreshold = i;
        }

        let badgesToAward = 0;
        for (var i = lastBadgeThreshold; i < newPoints; i += props.pointsForBadge) {
            badgesToAward++;
        }

        let newState = { points: newPoints, badges: currentState.badges + badgesToAward };
        await persistCurrentPointsAndBadges(newState);
        setPointsAndBadges(newState);
    }

    useInitializeView(() => {
        awardPointsAndBadges()
    }, [], []);


    function pointsUntilNextBadge() {
        return props.pointsForBadge - (pointsAndBadges!.points % props.pointsForBadge);
    }

    return <div className="mdhui-basic-points-for-badges">
        <Title order={4}>{language("current-points")}</Title>
        {pointsAndBadges &&
            <>
                <Title order={1} className="mdhui-basic-points-for-badges-points-toward-badge">{props.pointsForBadge - pointsUntilNextBadge()}pts</Title>
                <ProgressBar fillPercent={(pointsUntilNextBadge() * 1.0 / (props.pointsForBadge * 1.0)) * 100} fillColor={resolveColor(layoutContext.colorScheme, props.progressBarFillColor) || "var(--mdhui-color-primary)"} backgroundColor="var(--mdhui-background-color-2)" steps={[{
                    percent: 100,
                    icon:
                        <ProgressBarStep borderColor="rgba(148, 148, 148, 1)" backgroundColor="rgba(148, 148, 148, 1)" height="24px">
                            <FontAwesomeIcon icon={faStar as any} size={"1x"} style={{ color: "#fcfcfc", marginTop: "-3px" }} />
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
