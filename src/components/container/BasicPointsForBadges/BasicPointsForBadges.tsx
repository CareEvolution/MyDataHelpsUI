import React, { useContext } from "react";
import { LayoutContext, LoadingIndicator, ProgressBar, ProgressBarStep, Title } from "../../presentational";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import language from "../../../helpers/language";
import MyDataHelps, { ParticipantInfo } from "@careevolution/mydatahelps-js";
import { useInitializeView } from "../../../helpers/Initialization";
import "./BasicPointsForBadges.css"
import { ColorDefinition, getColorFromAssortment, resolveColor } from "../../../helpers/colors";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { BasicPointsForBadgesActivity, BasicPointsForBadgesActivityState, BasicPointsForBadgesState, parsePointsAndBadgesState, persistPointsAndBadgesState } from "../../../helpers/BasicPointsAndBadges/Activities";
import { awardPointsAndBadges } from "../../../helpers";

export interface BasicPointsForBadgesProps {
    pointsPerBadge: number;
    activities: BasicPointsForBadgesActivity[];
    previewState?: "default";
    titleColor?: ColorDefinition;
    progressBarFillColor?: ColorDefinition;
    pointsLabelColor?: ColorDefinition;
    awardBadgesViewUrl: string;
    showTotalPoints?: boolean;
    customField: string;
}

export default function (props: BasicPointsForBadgesProps) {
    let [badges, setBadges] = React.useState<number[] | undefined>(undefined);
    let [points, setPoints] = React.useState<number | undefined>(undefined);
    let layoutContext = useContext<LayoutContext>(LayoutContext);

    function sumActivityPoints(activityStates: { [key: string]: BasicPointsForBadgesActivityState }) {
        return props.activities.reduce((sum, activity) => sum + activityStates[activity.key].pointsAwarded, 0);
    }

    function previewParticipantInfo(): ParticipantInfo {
        let previewActivityStates: { [key: string]: BasicPointsForBadgesActivityState } = {};
        props.activities.forEach((activity, index) => {
            previewActivityStates[activity.key] = { pointsAwarded: index == 0 ? 300 + (2 * props.pointsPerBadge) : 0 };
        });
        return {
            participantID: "1",
            participantIdentifier: "1",
            //@ts-ignore
            demographics: {},
            customFields: {
                [props.customField]: JSON.stringify({
                    badges: [props.pointsPerBadge, props.pointsPerBadge * 2],
                    activityStates: previewActivityStates
                })
            }
        }
    }

    async function previewAwardPointsAndBadges(
        activities: BasicPointsForBadgesActivity[],
        state: BasicPointsForBadgesState): Promise<BasicPointsForBadgesState> {
        await new Promise(resolve => setTimeout(resolve, 500));
        let newState = { ...state };
        activities.forEach((activity, index) => {
            newState.activityStates[activity.key].pointsAwarded += 250;
        });
        return newState;
    }

    async function initialize() {
        let participantInfo = !props.previewState ? await MyDataHelps.getParticipantInfo() : previewParticipantInfo();
        let currentState = parsePointsAndBadgesState(props.customField, props.activities, participantInfo);
        setBadges(currentState.badges);
        setPoints(sumActivityPoints(currentState.activityStates));

        let updatedState = !props.previewState ?
            await awardPointsAndBadges(props.activities, currentState, props.pointsPerBadge, participantInfo) :
            await previewAwardPointsAndBadges(props.activities, currentState);
        if (!props.previewState) {
            await persistPointsAndBadgesState(props.customField, updatedState);
        }
        let newPointTotal = sumActivityPoints(updatedState.activityStates);
        setPoints(newPointTotal);

        MyDataHelps.openApplication(props.awardBadgesViewUrl);
        //wait for the new badges view to open before setting the new point total
        await new Promise(resolve => setTimeout(resolve, 3000));
        setBadges(updatedState.badges);
    }

    useInitializeView(() => {
        initialize()
    }, [], []);

    function pointsUntilNextBadge() {
        if (badges == undefined || points == undefined) { return 0; }
        let lastBadge = badges.length ? Math.max(...badges) : 0;
        let nextBadge = lastBadge + props.pointsPerBadge;
        let pointsNeeded = nextBadge - points;
        if (pointsNeeded < 0) {
            pointsNeeded = 0;
        }
        return pointsNeeded;
    }

    function nextBadgeColor() {
        return getColorFromAssortment((badges?.length || 0) + 1)
    }

    return <div className={"mdhui-basic-points-for-badges"}>
        <Title order={4} style={{ color: resolveColor(layoutContext.colorScheme, props.titleColor) }}>{language("current-points")}</Title>
        {badges != undefined && points != undefined &&
            <>
                <Title order={1} className="mdhui-basic-points-for-badges-points-toward-badge" style={{ color: resolveColor(layoutContext.colorScheme, props.pointsLabelColor) }}>{props.showTotalPoints ? points : (props.pointsPerBadge - pointsUntilNextBadge())}pts</Title>
                <ProgressBar key={badges.length} // forces re-render to skip "backwards" animation when badges change
                    fillPercent={(props.pointsPerBadge - pointsUntilNextBadge()) / (props.pointsPerBadge * 1.0) * 100}
                    fillColor={resolveColor(layoutContext.colorScheme, props.progressBarFillColor) || "var(--mdhui-color-primary)"}
                    backgroundColor="var(--mdhui-background-color-2)" steps={[{
                        percent: 100,
                        icon:
                            <ProgressBarStep borderColor={nextBadgeColor()} backgroundColor={nextBadgeColor()} height="24px">
                                <FontAwesomeIcon icon={faStar as any} size={"1x"} style={{ color: "#FFF", marginTop: "-2px" }} />
                            </ProgressBarStep>
                    }]} />
                <div className="mdhui-basic-points-for-badges-next-badge">{language("points-until-next-badge").replace("{{points}}", pointsUntilNextBadge().toString())}</div>
            </>
        }
        {!badges == undefined || points == undefined &&
            <LoadingIndicator />
        }
    </div>
}
