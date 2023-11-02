import React from 'react';
import './AsthmaCalendarViewHeader.css';
import AsthmaControlCalendar from '../AsthmaControlCalendar';
import AsthmaLogEntryHeader from '../AsthmaLogEntryHeader';
import { AsthmaCalendarViewHeaderPreviewState, previewData } from "./AsthmaCalendarViewHeader.previewData";
import { DateRangeCoordinator } from '../../../presentational';

export interface AsthmaCalendarViewHeaderProps {
    previewState?: AsthmaCalendarViewHeaderPreviewState;
    logTodayEntrySurveyName: string;
    logYesterdayEntrySurveyName: string;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: AsthmaCalendarViewHeaderProps) {
    return <div className="mdhui-asthma-calendar-view-header" ref={props.innerRef}>
        <DateRangeCoordinator intervalType="Month">
            <AsthmaControlCalendar previewState={props.previewState ? previewData[props.previewState].controlCalendarPreviewState : undefined}/>
        </DateRangeCoordinator>
        <AsthmaLogEntryHeader
            previewState={props.previewState ? previewData[props.previewState].logEntryPreviewState : undefined}
            logTodayEntrySurveyName={props.logTodayEntrySurveyName}
            logYesterdayEntrySurveyName={props.logYesterdayEntrySurveyName}
        />
    </div>;
}