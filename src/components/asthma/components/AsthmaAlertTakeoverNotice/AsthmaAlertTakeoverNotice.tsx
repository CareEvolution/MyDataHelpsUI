import React from 'react';
import { Button } from '../../../presentational';
import './AsthmaAlertTakeoverNotice.css';
import MyDataHelps from "@careevolution/mydatahelps-js";

export interface AsthmaAlertTakeoverNoticeProps {
    previewState?: 'default';
    message: string;
    logEntrySurveyName: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaAlertTakeoverNoticeProps) {
    const onAddLogEntry = (): void => {
        if (props.previewState) return;
        MyDataHelps.startSurvey(props.logEntrySurveyName);
        MyDataHelps.dismiss();
    };

    const onNotNow = (): void => {
        if (props.previewState) return;
        MyDataHelps.dismiss();
    }

    return <div className="mdhui-asthma-alert-takeover-notice" ref={props.innerRef}>
        <div className="mdhui-asthma-alert-takeover-notice-message">{props.message}</div>
        <div className="mdhui-asthma-alert-takeover-notice-instructions">Take a moment to record any asthma symptoms in a daily entry.</div>
        <div className="mdhui-asthma-alert-takeover-notice-buttons">
            <Button className="mdhui-asthma-alert-takeover-notice-button" onClick={() => onAddLogEntry()}>+ Daily Entry</Button>
            <Button className="mdhui-asthma-alert-takeover-notice-button" variant="light" onClick={() => onNotNow()}>Not Now</Button>
        </div>
    </div>;
}