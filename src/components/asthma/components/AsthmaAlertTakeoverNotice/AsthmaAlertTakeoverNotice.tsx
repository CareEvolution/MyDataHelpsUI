import React, { useState } from 'react';
import { Button, LoadingIndicator } from '../../../presentational';
import './AsthmaAlertTakeoverNotice.css';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, dateToAsthmaLogEntryIdentifier } from '../../helpers';
import { add } from 'date-fns';
import language from '../../../../helpers/language';

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
            setLoading(props.previewState === 'loading');
            return;
        }

        asthmaDataService.loadLogEntries(add(new Date(), {days: -2})).then(entries => {
            let todayLogEntryIdentifier = dateToAsthmaLogEntryIdentifier(new Date());
            let todayLogEntry = entries.find(e => e.identifier === todayLogEntryIdentifier);
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
        <div className="mdhui-asthma-alert-takeover-notice-instructions">{language('asthma-alert-takeover-notice-instructions')}</div>
        <div className="mdhui-asthma-alert-takeover-notice-buttons">
            {loading && <LoadingIndicator/>}
            {!loading &&
                <div>
                    <Button className="mdhui-asthma-alert-takeover-notice-button" onClick={() => onAddLogEntry()}>{language('asthma-alert-takeover-notice-add-entry-button-text')}</Button>
                    <Button className="mdhui-asthma-alert-takeover-notice-button" variant="light" onClick={() => onNotNow()}>{language('asthma-alert-takeover-notice-not-now-button-text')}</Button>
                </div>
            }
        </div>
    </div>;
}