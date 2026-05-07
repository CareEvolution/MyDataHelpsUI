import React, { useState } from 'react';
import './AsthmaLogEntryDetails.css';
import { AsthmaLogEntry } from '../../model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { add, formatISO, isBefore, isSameDay, startOfToday } from 'date-fns';
import { LoadingIndicator, UnstyledButton } from '../../../presentational';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, dateToAsthmaLogEntryIdentifier, getAsthmaImpactTexts, getAsthmaSymptomLevelText, getAsthmaSymptomTexts, getAsthmaTriggerTexts } from '../../helpers';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { AsthmaLogEntryDetailsPreviewState, previewData } from './AsthmaLogEntryDetails.previewData';
import language from '../../../../helpers/language';

export interface AsthmaLogEntryDetailsProps {
    previewState?: 'loading' | AsthmaLogEntryDetailsPreviewState;
    date: Date;
    logTodayEntrySurveyName: string;
    logYesterdayEntrySurveyName: string;
    editLogEntryUrl: string;
    infoUrl: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaLogEntryDetailsProps) {
    const [loading, setLoading] = useState<boolean>(true);
    const [logEntry, setLogEntry] = useState<AsthmaLogEntry>();

    let today = startOfToday();
    let yesterday = add(new Date(today), {days: -1});

    let dayBefore = add(new Date(props.date), {days: -1});
    let dayAfter = add(new Date(props.date), {days: 1});

    useInitializeView(() => {
        setLoading(true);

        if (props.previewState === 'loading') {
            return;
        }
        if (props.previewState) {
            setLogEntry(previewData[props.previewState].logEntry);
            setLoading(false);
            return;
        }

        asthmaDataService.loadLogEntries(dayBefore, dayAfter).then(logEntries => {
            let logEntryIdentifier = dateToAsthmaLogEntryIdentifier(props.date);
            setLogEntry(logEntries.find(e => e.identifier === logEntryIdentifier));
            setLoading(false);
        });
    }, [], [props.previewState]);

    const onEditLogEntryClicked = (): void => {
        if (loading || props.previewState) return;

        setLoading(true);
        if (logEntry) {
            MyDataHelps.openApplication(props.editLogEntryUrl + '?date=' + formatISO(props.date, {representation: 'date'}), {modal: true});
        } else if (isSameDay(props.date, today)) {
            MyDataHelps.startSurvey(props.logTodayEntrySurveyName);
        } else if (isSameDay(props.date, yesterday)) {
            MyDataHelps.startSurvey(props.logYesterdayEntrySurveyName);
        }
    };

    const onInfoClicked = (): void => {
        if (loading || props.previewState) return;
        MyDataHelps.openApplication(props.infoUrl, {modal: true});
    };

    const canStillEditLogEntry = (): boolean => {
        return !isBefore(props.date, yesterday);
    };

    const getStatus = (): string => {
        if (logEntry) {
            return getAsthmaSymptomLevelText(logEntry.symptomLevel);
        }
        if (!canStillEditLogEntry()) {
            return language('asthma-log-entry-details-not-editable');
        }
        return language('asthma-log-entry-details-not-logged-yet');
    };

    return <div className="mdhui-asthma-log-entry-details" ref={props.innerRef}>
        {loading &&
            <LoadingIndicator/>
        }
        {!loading &&
            <div>
                <div className="mdhui-asthma-log-entry-details-header">
                    <div className="mdhui-asthma-log-entry-details-header-status">{getStatus()}</div>
                    {canStillEditLogEntry() ?
                        <UnstyledButton className="mdhui-asthma-log-entry-details-header-action" onClick={() => onEditLogEntryClicked()}>
                            {logEntry ?
                                <div className="mdhui-asthma-log-entry-details-header-edit-button">{language('asthma-log-entry-details-edit-button-text')}</div>
                                : <div className="mdhui-asthma-log-entry-details-header-add-button">{language('asthma-log-entry-details-add-button-text')}</div>
                            }
                        </UnstyledButton>
                        : <UnstyledButton className="mdhui-asthma-log-entry-details-header-info-button" onClick={() => onInfoClicked()}>
                            <FontAwesomeIcon icon={faCircleInfo}/>
                        </UnstyledButton>
                    }
                </div>
                <LogEntryComponent className="mdhui-asthma-log-entry-details-component-symptoms" label={language('asthma-log-entry-details-symptoms-label')} data={getAsthmaSymptomTexts(logEntry?.symptoms)}/>
                <LogEntryComponent className="mdhui-asthma-log-entry-details-component-impacts" label={language('asthma-log-entry-details-impacts-label')} data={getAsthmaImpactTexts(logEntry?.impacts)}/>
                <LogEntryComponent className="mdhui-asthma-log-entry-details-component-triggers" label={language('asthma-log-entry-details-triggers-label')} data={getAsthmaTriggerTexts(logEntry?.triggers)}/>
            </div>
        }

    </div>;
}

function LogEntryComponent(props: { className: string, label: string, data: string[] }) {
    return <div className={['mdhui-asthma-log-entry-details-component', props.className].join(' ')}>
        <div className="mdhui-asthma-log-entry-details-component-header">
            <div className="mdhui-asthma-log-entry-details-component-header-icon"/>
            <div className="mdhui-asthma-log-entry-details-component-header-label">{props.label}</div>
        </div>
        {props.data.length === 0 &&
            <div className="mdhui-asthma-log-entry-details-component-no-data">{language('asthma-log-entry-details-component-no-data', undefined, { dataType: props.label.toLowerCase() })}</div>
        }
        {props.data.length > 0 && props.data.map(data => {
            return <div key={data} className="mdhui-asthma-log-entry-details-component-data">{data}</div>;
        })}
    </div>;
}