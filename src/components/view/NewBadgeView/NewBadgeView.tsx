import React from "react";
import { getColorFromAssortment, language, useInitializeView } from "../../../helpers";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { BasicBadge, Button, Layout, TextBlock, Title } from "../../presentational";
import "./NewBadgeView.css";
import { parsePointsAndBadgesState } from "../../../helpers/BasicPointsAndBadges/Activities";

export interface NewBadgeViewProps {
    badgeNumber?: number;
    pointsPerBadge?: number;
    title?: string;
    text?: string;
    colorScheme?: 'auto' | 'light' | 'dark';
    primaryColor?: string;
    customField: string;
}

export default function (props: NewBadgeViewProps) {
    let [badgeNumber, setBadgeNumber] = React.useState<number | null>(null);

    useInitializeView(() => {
        if (props.badgeNumber !== undefined) { setBadgeNumber(props.badgeNumber); return; }
        MyDataHelps.getParticipantInfo().then(participantInfo => {
            let pointsAndBadgesState = parsePointsAndBadgesState(props.customField!, [], participantInfo);
            setBadgeNumber(pointsAndBadgesState.badges.length);
        });
    }, [], [props.badgeNumber]);

    if (badgeNumber === 0) {
        MyDataHelps.dismiss();
        return null;
    }

    if (badgeNumber === null) return null;

    return <Layout bodyBackgroundColor={props.colorScheme === 'dark' ? '' : '#fff'} colorScheme={props.colorScheme ?? 'auto'} primaryColor={props.primaryColor}>
        <div className="mdhui-new-badge-view">
            <div className="mdhui-new-badge-view-badge-container">
                <BasicBadge size="xl" backgroundColor={getColorFromAssortment(badgeNumber)}>
                    <>
                        {!!props.pointsPerBadge &&
                            <>{(props.pointsPerBadge * badgeNumber).toLocaleString()}<br />points</>
                        }
                    </>
                </BasicBadge>
            </div>
            <Title order={2} style={{ margin: "16px", marginBottom: 0 }}>{props.title || language("new-badge-title")}</Title>
            <TextBlock>{props.text || language("new-badge-text")}</TextBlock>
            <Button onClick={() => MyDataHelps.dismiss()}>
                {language("get-badge")}
            </Button>
        </div>
    </Layout>
}