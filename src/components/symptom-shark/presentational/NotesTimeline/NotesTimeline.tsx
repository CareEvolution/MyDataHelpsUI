import React, { useContext } from 'react';
import "./NotesTimeline.css"
import { startOfMonth } from 'date-fns';
import { DateRangeContext, TextBlock, getDayKey, language } from '../../../..';
import { SymptomSharkVisualizationContext } from '../../container/VisualizationCoordinator/VisualizationCoordinator';
import { getDatesForMonth } from '../../../../helpers/date-helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import LogEntryIcon from '../LogEntryIcon/LogEntryIcon';
import { getFullDateString } from '../../../../helpers/date-helpers';

export interface SymptomSharkNotesTimelineProps {
    intervalStart?: Date;
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SymptomSharkNotesTimelineProps) {
    let visualizationContext = useContext(SymptomSharkVisualizationContext);
    if (!visualizationContext) {
        return <TextBlock innerRef={props.innerRef}>Error: Notes timeline must be used inside a Symptom Shark Visualization Coordinator.</TextBlock>
    }

    let dateRangeContext = useContext(DateRangeContext);
    let intervalStart = dateRangeContext?.intervalStart ?? props.intervalStart ?? startOfMonth(new Date());
   
    if (!visualizationContext.symptoms.length && !visualizationContext.treatments.length) {
        return null;
    }

    var monthDays = getDatesForMonth(intervalStart.getFullYear(), intervalStart.getMonth());
    var daysWithNotes = monthDays.filter((m) => visualizationContext!.logEntries[getDayKey(m)]?.notes?.length);
    if (!daysWithNotes.length) {
        return null;
    }

    return (
        <div ref={props.innerRef} className="ss-notes-timeline">
            <div className="ss-notes-timeline-title">{language("notes")}</div>
            <div className="ss-notes-timeline-line"></div>
            {daysWithNotes.map(day =>
                <div key={day.toISOString()} className="ss-notes-timeline-day">
                    {visualizationContext!.logEntries[getDayKey(day)].icon ? <LogEntryIcon className="ss-notes-timeline-day-icon" icon={visualizationContext!.logEntries[getDayKey(day)].icon!}/> : <FontAwesomeIcon className="ss-notes-timeline-day-icon ss-notes-timeline-day-circle" icon={faCircle}/>}
                    <div className="ss-notes-timeline-day-title">{getFullDateString(day)}</div>
                    <div className="ss-notes-timeline-note">{visualizationContext!.logEntries[getDayKey(day)].notes}</div>
                </div>
            )}
        </div>
    );
}