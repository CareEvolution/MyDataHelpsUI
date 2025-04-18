import React, { useContext } from "react";
import { LoadingIndicator, ProgressBar, ProgressBarStep, Title } from "../../presentational";
import language from "../../../helpers/language";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { useInitializeView } from "../../../helpers/Initialization";
import "./BasicPointsForBadges.css"
import { ColorDefinition, getColorFromAssortment } from "../../../helpers/colors";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { BasicPointsForBadgesActivity, parsePointsAndBadgesState, persistPointsAndBadgesState } from "../../../helpers/BasicPointsAndBadges/Activities";
import { awardPointsAndBadges, sumActivityPoints } from "../../../helpers";
import { FontAwesomeSvgIcon } from "react-fontawesome-svg-icon";
import { previewAwardPointsAndBadges, previewParticipantInfo } from "./BasicPointsForBadges.previewData";
import { formatNumberForLocale } from "../../../helpers/locale"

export interface BasicPointsForBadgesProps {
    pointsPerBadge: number;
    activities: BasicPointsForBadgesActivity[];
    previewState?: "default";
    progressBarFillColor?: ColorDefinition;
    pointsLabelColor?: ColorDefinition;
    awardBadgesViewUrl: string;
    showTotalPoints?: boolean;
    customField: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

/**
 * Earn points for completing activities. Badges are earned once pointsPerBadge are reached.
 * The progress bar will fill as points are earned. When a badge is earned a celebration step 
 * will show and the progress bar will then reset. 
 * Activity types supported are Survey Completion, Daily device data like sleep and steps, 
 * connecting external accounts like an EHR, Health Plan, or wearable device, 
 * and lastly based on the participant's custom field value. 
*/
export default function BasicPointsForBadges(props: BasicPointsForBadgesProps) {
    let [badges, setBadges] = React.useState<number[] | undefined>(undefined);
    let [points, setPoints] = React.useState<number | undefined>(undefined);

    async function initialize() {
        let participantInfo = !props.previewState ? await MyDataHelps.getParticipantInfo() : previewParticipantInfo(props.activities, props.pointsPerBadge, props.customField);
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

        // This component will load to reflect the existing points status
        // followed by showing a pop up if new badges are awarded.
        // Once the pop is shown, the new point total and badges will be set.
        // In a preview env, if badges were awarded, the user will see the progress bar fill to 100%,
        // followed by a pause, and then see the progress bar reset to reflect 
        // how many points are needed for the next badge. Skipping back is accomplished by 
        // resetting the progressbar key as noted below
        if (currentState.badges.length < updatedState.badges.length) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            MyDataHelps.openApplication(props.awardBadgesViewUrl, { modal: true });
            await new Promise(resolve => setTimeout(resolve, 1000));
            //wait for the new badges view to open before setting the badges, and new point total
            setBadges(updatedState.badges);
        }
    }

    useInitializeView(() => {
        initialize()
    }, [], []);

    function pointsUntilNextBadge() {
        if (badges === undefined || points === undefined) { return 0; }
        let lastBadge = badges.length ? Math.max(...badges) : 0;
        let nextBadge = lastBadge + props.pointsPerBadge;
        let pointsNeeded = nextBadge - points;
        if (pointsNeeded < 0) {
            pointsNeeded = 0;
        }
        return pointsNeeded;
    }

    function nextBadgeColor() {
        return getColorFromAssortment(badges?.length || 0)
    }

    return <div className={"mdhui-basic-points-for-badges"} ref={props.innerRef}>
        {badges !== undefined && points !== undefined &&
            <>
                <Title order={1} className="mdhui-basic-points-for-badges-points-toward-badge" color={props.pointsLabelColor} >
                    {props.showTotalPoints ? formatNumberForLocale(points) : formatNumberForLocale(props.pointsPerBadge - pointsUntilNextBadge())}{language('points-abbreviation')}
                </Title>
                <ProgressBar key={badges.length} // forces re-render to skip "backwards" animation when badges change
                    fillPercent={(props.pointsPerBadge - pointsUntilNextBadge()) / (props.pointsPerBadge * 1.0) * 100}
                    fillColor={props.progressBarFillColor ?? "var(--mdhui-color-primary)"}
                    backgroundColor="var(--mdhui-background-color-2)" steps={[{
                        percent: 100,
                        icon:
                            <ProgressBarStep borderColor={nextBadgeColor()} backgroundColor={nextBadgeColor()} height="24px">
                                <FontAwesomeSvgIcon icon={faStar} size={"1x"} style={{ color: "#FFF", marginTop: "-2px" }} />
                            </ProgressBarStep>
                    }]} />
                <div className="mdhui-basic-points-for-badges-next-badge">{language("points-until-next-badge", undefined, { "points": pointsUntilNextBadge().toString()})}</div>
            </>
        }
        {!badges === undefined || points === undefined &&
            <LoadingIndicator />
        }
    </div>
}
