import React from 'react';
import './AsthmaLogEntrySummary.css';
import { AsthmaLogEntry } from '../../model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import MyDataHelps from '@careevolution/mydatahelps-js';
import { LoadingIndicator } from "../../../presentational";
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface AsthmaLogEntrySummaryProps {
    label: string;
    logEntry?: AsthmaLogEntry;
    logEntrySurveyName: string;
    loading?: boolean;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaLogEntrySummaryProps) {
    const getStatus = (): string => {
        if (props.logEntry) {
            if (props.logEntry.symptomLevel === 'mild') return 'Mild symptoms';
            if (props.logEntry.symptomLevel === 'moderate') return 'Moderate symptoms';
            if (props.logEntry.symptomLevel === 'severe') return 'Severe symptoms';
            return 'No symptoms';
        }
        return 'Not logged yet';
    };

    const onClick = (): void => {
        if (props.loading) return;

        if (props.logEntry) {
            // TODO: remove this and launch the day view.
            MyDataHelps.startSurvey(props.logEntrySurveyName);
        } else {
            MyDataHelps.startSurvey(props.logEntrySurveyName);
        }
    };

    return <div className="mdhui-asthma-log-entry-summary" ref={props.innerRef} onClick={() => onClick()}>
        <div className="mdhui-asthma-log-entry-summary-details">
            <div className="mdhui-asthma-log-entry-summary-label">{props.label}</div>
            <div className="mdhui-asthma-log-entry-summary-status">{getStatus()}</div>
        </div>
        <div className="mdhui-asthma-log-entry-summary-action">
            {props.loading &&
                <LoadingIndicator/>
            }
            {!props.loading && !props.logEntry &&
                <div className="mdhui-asthma-log-entry-summary-add-button">+ Daily Entry</div>
            }
            {!props.loading && props.logEntry &&
                <FontAwesomeIcon icon={faChevronRight as IconProp} className="mdhui-asthma-log-entry-summary-chevron"/>
            }
        </div>
    </div>;
}