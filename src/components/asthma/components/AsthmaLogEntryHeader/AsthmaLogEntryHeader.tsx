import React, { useState } from 'react';
import './AsthmaLogEntryHeader.css';
import { AsthmaLogEntry } from '../../model';
import AsthmaLogEntrySummary from '../AsthmaLogEntrySummary';
import { add, startOfDay } from 'date-fns';
import { asthmaDataService, dateToAsthmaLogEntryIdentifier } from '../../helpers';
import { useInitializeView } from '../../../../helpers/Initialization';
import { AsthmaLogEntryHeaderPreviewState, previewData } from './AsthmaLogEntryHeader.previewData';
import MyDataHelps from '@careevolution/mydatahelps-js';

export interface AsthmaLogEntryHeaderProps {
    previewState?: AsthmaLogEntryHeaderPreviewState;
    logTodayEntrySurveyName: string;
    logYesterdayEntrySurveyName: string;
    dayViewUrl: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaLogEntryHeaderProps) {
    let [firstTimeLoading, setFirstTimeLoading] = useState<boolean>(true);
    let [loading, setLoading] = useState<boolean>(true);
    let [yesterdayLogEntry, setYesterdayLogEntry] = useState<AsthmaLogEntry>();
    let [todayLogEntry, setTodayLogEntry] = useState<AsthmaLogEntry>();

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState) {
            setYesterdayLogEntry(previewData[props.previewState].yesterdayLogEntry);
            setTodayLogEntry(previewData[props.previewState].todayLogEntry);
            setLoading(false);
            setFirstTimeLoading(false);
            return;
        }

        asthmaDataService.loadLogEntries(add(new Date(), {days: -3})).then(entries => {
            let today = startOfDay(new Date());
            setTodayLogEntry(entries.find(e => e.identifier === dateToAsthmaLogEntryIdentifier(today)));

            let yesterday = startOfDay(add(new Date(), {days: -1}));
            setYesterdayLogEntry(entries.find(e => e.identifier === dateToAsthmaLogEntryIdentifier(yesterday)));

            setLoading(false);
            setFirstTimeLoading(false);
        });
    }, ['surveyDidFinish']);

    if (firstTimeLoading) {
        return null;
    }

    const onClick = (surveyName: string, logEntry?: AsthmaLogEntry): void => {
        if (props.previewState || loading) return;

        if (logEntry) {
            MyDataHelps.openApplication(props.dayViewUrl + '?date=' + logEntry.identifier, {modal: true});
        } else {
            MyDataHelps.startSurvey(surveyName);
        }
    };

    return <div className="mdhui-asthma-log-entry-header" ref={props.innerRef}>
        <AsthmaLogEntrySummary label="Today" logEntry={todayLogEntry} onClick={() => onClick(props.logTodayEntrySurveyName, todayLogEntry)} loading={loading}/>
        <AsthmaLogEntrySummary label="Yesterday" logEntry={yesterdayLogEntry} onClick={() => onClick(props.logYesterdayEntrySurveyName, yesterdayLogEntry)} loading={loading}/>
    </div>;
}