import React, { useState } from 'react';
import './AsthmaLogEntryDetails.css';
import { AsthmaLogEntry } from '../../model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { add, formatISO, isBefore, isSameDay, startOfToday } from 'date-fns';
import { LoadingIndicator } from '../../../presentational';
import { useInitializeView } from '../../../../helpers/Initialization';
import { asthmaDataService, dateToAsthmaLogEntryIdentifier } from '../../helpers';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { AsthmaLogEntryDetailsPreviewState, previewData } from './AsthmaLogEntryDetails.previewData';

export interface AsthmaLogEntryDetailsProps {
    previewState?: AsthmaLogEntryDetailsPreviewState;
    date: Date;
    logTodayEntrySurveyName: string;
    logYesterdayEntrySurveyName: string;
    editLogEntryUrl: string;
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

        if (props.previewState) {
            setLogEntry(previewData[props.previewState].logEntry);
            setLoading(false);
            return;
        }

        asthmaDataService.loadLogEntries(dayBefore, dayAfter).then(logEntries => {
            setLogEntry(logEntries.find(e => e.identifier === dateToAsthmaLogEntryIdentifier(props.date)));
            setLoading(false);
        });
    });

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
        // TODO: Show helpful info.
    };

    const canStillEditLogEntry = (): boolean => {
        return !isBefore(props.date, yesterday);
    };

    const getStatus = (): string => {
        if (logEntry) {
            if (logEntry.symptomLevel === 'mild') return 'Mild symptoms';
            if (logEntry.symptomLevel === 'moderate') return 'Moderate symptoms';
            if (logEntry.symptomLevel === 'severe') return 'Severe symptoms';
            return 'No symptoms';
        }
        if (!canStillEditLogEntry()) {
            return 'Daily entry missed';
        }
        return 'Not logged yet';
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
                        <div className="mdhui-asthma-log-entry-details-header-action" onClick={() => onEditLogEntryClicked()}>
                            {logEntry ?
                                <div className="mdhui-asthma-log-entry-details-header-edit-button">Edit</div>
                                : <div className="mdhui-asthma-log-entry-details-header-add-button">Log Entry</div>
                            }
                        </div>
                        : <div className="mdhui-asthma-log-entry-details-header-action" onClick={() => onInfoClicked()}>
                            <FontAwesomeIcon className="mdhui-asthma-log-entry-details-header-info-button" icon={faCircleInfo}/>
                        </div>
                    }
                </div>
                <LogEntryComponent className="mdhui-asthma-log-entry-details-component-symptoms" label="Symptoms" data={logEntry?.symptoms}/>
                <LogEntryComponent className="mdhui-asthma-log-entry-details-component-impacts" label="Impacts" data={logEntry?.impacts}/>
                <LogEntryComponent className="mdhui-asthma-log-entry-details-component-triggers" label="Triggers" data={logEntry?.triggers}/>
            </div>
        }

    </div>;
}

function LogEntryComponent(props: { className: string, label: string, data?: string[] }) {
    return <div className={['mdhui-asthma-log-entry-details-component', props.className].join(' ')}>
        <div className="mdhui-asthma-log-entry-details-component-header">
            <div className="mdhui-asthma-log-entry-details-component-header-icon"/>
            <div className="mdhui-asthma-log-entry-details-component-header-label">{props.label}</div>
        </div>
        {(!props.data || props.data.length === 0) &&
            <div className="mdhui-asthma-log-entry-details-component-no-data">No {props.label.toLowerCase()} logged</div>
        }
        {props.data && props.data.length > 0 && props.data.map(data => {
            return <div className="mdhui-asthma-log-entry-details-component-data">{data}</div>;
        })}
    </div>;
}