import React, { useState } from 'react';
import { Button, LoadingIndicator } from '../../../presentational';
import './AsthmaAlertTakeoverNotice.css';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, dateToAsthmaLogEntryIdentifier } from '../../helpers';
import { add } from 'date-fns';

export interface AsthmaAlertTakeoverNoticeProps {
    previewState?: 'loading' | 'loaded';
    message: string;
    logEntrySurveyName: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaAlertTakeoverNoticeProps) {
    const [loading, setLoading] = useState<boolean>(true);

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState) {
            if (props.previewState === 'loaded') {
                setLoading(false);
            }
            return;
        }

        asthmaDataService.loadLogEntries(add(new Date(), {days: -2})).then(entries => {
            const todayLogEntry = entries.find(e => e.identifier === dateToAsthmaLogEntryIdentifier(new Date()));
            if (todayLogEntry) {
                MyDataHelps.dismiss();
            } else {
                setLoading(false);
            }
        });
    }, [], [props.previewState]);

    const onAddLogEntry = (): void => {
        if (props.previewState) return;
        setLoading(true);
        MyDataHelps.startSurvey(props.logEntrySurveyName);
    };

    const onNotNow = (): void => {
        if (props.previewState) return;
        MyDataHelps.dismiss();
    }

    return <div className="mdhui-asthma-alert-takeover-notice" ref={props.innerRef}>
        <div className="mdhui-asthma-alert-takeover-notice-message">{props.message}</div>
        <div className="mdhui-asthma-alert-takeover-notice-instructions">Take a moment to record any asthma symptoms in a daily entry.</div>
        <div className="mdhui-asthma-alert-takeover-notice-buttons">
            {loading && <LoadingIndicator/>}
            {!loading &&
                <div>
                    <Button className="mdhui-asthma-alert-takeover-notice-button" onClick={() => onAddLogEntry()}>+ Daily Entry</Button>
                    <Button className="mdhui-asthma-alert-takeover-notice-button" variant="light" onClick={() => onNotNow()}>Not Now</Button>
                </div>
            }
        </div>
    </div>;
}