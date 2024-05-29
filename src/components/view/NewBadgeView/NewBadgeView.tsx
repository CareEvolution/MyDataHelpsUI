import React from "react";
import { getColorFromAssortment, language, useInitializeView } from "../../../helpers";
import MyDataHelps from "@careevolution/mydatahelps-js";
import { BasicBadge, Button, Layout, LoadingIndicator, TextBlock, Title } from "../../presentational";
import "./NewBadgeView.css";
import { parsePointsAndBadgesState } from "../../../helpers/BasicPointsAndBadges/Activities";

export interface NewBadgeViewProps {
    title?: string;
    text?: string;
    colorScheme?: 'auto' | 'light' | 'dark';
    primaryColor?: string;
    customField: string;
    previewState?: "default";
}

export default function (props: NewBadgeViewProps) {
    let [badges, setBadges] = React.useState<number[] | null>(null);

    useInitializeView(() => {
        if (props.previewState == "default") { setBadges([1000, 2000, 3000]); return; }
        MyDataHelps.getParticipantInfo().then(participantInfo => {
            let pointsAndBadgesState = parsePointsAndBadgesState(props.customField!, [], participantInfo);
            setBadges(pointsAndBadgesState.badges);
        });
    }, [], []);

    if (badges != null && badges.length === 0) {
        MyDataHelps.dismiss();
        return null;
    }

    return <Layout bodyBackgroundColor={props.colorScheme === 'dark' ? '' : '#fff'} colorScheme={props.colorScheme ?? 'auto'} primaryColor={props.primaryColor}>
        <div className="mdhui-new-badge-view">
            {badges == null && <LoadingIndicator />}
            {badges != null && <>
                <div className="mdhui-new-badge-view-badge-container">
                    <BasicBadge size="xl" backgroundColor={getColorFromAssortment(badges.length - 1)}>
                        <>
                            <>{Math.max(...badges).toLocaleString()}<br />points</>
                        </>
                    </BasicBadge>
                </div>
                <Title order={2} style={{ margin: "16px", marginBottom: 0 }}>{props.title || language("new-badge-title")}</Title>
                <TextBlock>{props.text || language("new-badge-text")}</TextBlock>
                <Button onClick={() => MyDataHelps.dismiss()}>
                    {language("get-badge")}
                </Button>
            </>
            }
        </div>
    </Layout>
}