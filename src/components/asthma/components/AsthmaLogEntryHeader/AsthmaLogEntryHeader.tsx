import React, { useState } from 'react';
import './AsthmaLogEntryHeader.css';
import { AsthmaLogEntry } from '../../model';
import { add, startOfDay } from 'date-fns';
import { asthmaDataService, dateToAsthmaLogEntryIdentifier, getAsthmaSymptomLevelText } from '../../helpers';
import { useInitializeView } from '../../../../helpers/Initialization';
import { AsthmaLogEntryHeaderPreviewState, previewData } from './AsthmaLogEntryHeader.previewData';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { LoadingIndicator, UnstyledButton } from '../../../presentational';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import language from '../../../../helpers/language';

export interface AsthmaLogEntryHeaderProps {
    previewState?: 'loading' | AsthmaLogEntryHeaderPreviewState;
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

        if (props.previewState === 'loading') {
            return;
        }
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
    }, ['surveyDidFinish'], [props.previewState]);

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

    const getStatus = (logEntry?: AsthmaLogEntry): string => {
        if (logEntry) {
            return getAsthmaSymptomLevelText(logEntry.symptomLevel);
        }
        return language('asthma-log-entry-header-not-logged-yet');
    };

    const getLogEntrySummary = (label: string, surveyName: string, logEntry?: AsthmaLogEntry) => {
        return <UnstyledButton className="mdhui-asthma-log-entry-summary" onClick={() => onClick(surveyName, logEntry)}>
            <div className="mdhui-asthma-log-entry-summary-details">
                <div className="mdhui-asthma-log-entry-summary-label">{label}</div>
                <div className="mdhui-asthma-log-entry-summary-status">{getStatus(logEntry)}</div>
            </div>
            <div className="mdhui-asthma-log-entry-summary-action">
                {loading &&
                    <LoadingIndicator/>
                }
                {!loading && !logEntry &&
                    <div className="mdhui-asthma-log-entry-summary-add-button">{language('asthma-log-entry-header-add-button-text')}</div>
                }
                {!loading && logEntry &&
                    <FontAwesomeIcon icon={faChevronRight as IconProp} className="mdhui-asthma-log-entry-summary-chevron"/>
                }
            </div>
        </UnstyledButton>;
    };

    return <div className="mdhui-asthma-log-entry-header" ref={props.innerRef}>
        {getLogEntrySummary(language('asthma-log-entry-header-today-log-label'), props.logTodayEntrySurveyName, todayLogEntry)}
        {getLogEntrySummary(language('asthma-log-entry-header-yesterday-log-label'), props.logYesterdayEntrySurveyName, yesterdayLogEntry)}
    </div>;
}