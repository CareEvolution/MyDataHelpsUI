import React from "react";
import { useContext } from "react";
import { SymptomSharkVisualizationContext } from '../../container/VisualizationCoordinator/VisualizationCoordinator';
import { Calendar, DayTrackerSymbol, TextBlock, UnstyledButton } from "../../../presentational";
import { DateRangeContext } from "../../../presentational/DateRangeCoordinator/DateRangeCoordinator";
import { startOfMonth } from "date-fns";
import getDayKey from "../../../../helpers/get-day-key";
import { DailyLogEntry, SymptomConfiguration, TreatmentConfiguration } from "../../helpers/symptom-shark-data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import "./Calendar.css"

export interface SymptomSharkCalendarProps {
    intervalStart?: Date;
    onDaySelected(day: Date): void;
}

export default function (props: SymptomSharkCalendarProps) {
    let visualizationContext = useContext(SymptomSharkVisualizationContext);
    if (!visualizationContext) {
        return <TextBlock>Error: Symptom Calendar must be used inside a Symptom Shark Visualization Coordinator.</TextBlock>
    }
    let { symptoms, treatments, logEntries } = visualizationContext;

    let dateRangeContext = useContext(DateRangeContext);
    let intervalStart = props.intervalStart || startOfMonth(new Date());
    if (dateRangeContext) {
        intervalStart = dateRangeContext.intervalStart;
    }

    function viewDay(d: number) {
        var date = new Date(intervalStart.getFullYear(), intervalStart.getMonth(), d);
        if (date > new Date()) {
            return;
        }
        props.onDaySelected(date)
    }

    function renderDay(year: number, month: number, day?: number) {
        if (!day) {
            return <div />;
        }
        var date = new Date(year, month, day);
        var logEntry = logEntries[getDayKey(date)];

        var future = false;
        if (date > new Date()) {
            future = true;
        }

        return <CalendarDay onClick={(d) => viewDay(d)}
            day={day}
            logEntry={logEntry}
            symptomConfigurations={symptoms}
            treatmentConfigurations={treatments}
            future={future} />;
    }

    return <Calendar className="mdhui-ss-calendar" month={intervalStart.getMonth()}
        year={intervalStart.getFullYear()}
        dayRenderer={renderDay} />
}

interface CalendarDayProps {
    day: number;
    logEntry: DailyLogEntry;
    symptomConfigurations: SymptomConfiguration[]
    treatmentConfigurations: TreatmentConfiguration[]
    onClick(day: number): void;
    future: boolean;
}

function CalendarDay(props: CalendarDayProps) {
    function getDayTracker() {
        if (!props.logEntry) {
            return <DayTrackerSymbol className='day-tracker' primaryColors={[]} secondaryColors={[]} />;
        }
        var primaryColors = props.symptomConfigurations.filter(t => !t.inactive && props.logEntry.symptoms.find(s => s.id == t.id)).map(t => t.color);
        var secondaryColors = props.treatmentConfigurations.filter(t => !t.inactive && props.logEntry.treatments.find(s => s.id == t.id)).map(t => t.color);
        if (primaryColors.length === 0 && secondaryColors.length === 0) { return <DayTrackerSymbol className='day-tracker' primaryColors={[]} secondaryColors={[]} />; }
        return <DayTrackerSymbol className='day-tracker' key={Math.random()} primaryColors={primaryColors} secondaryColors={secondaryColors} />
    }

    return (
        <UnstyledButton className={"calendar-day" + (props.future ? " future" : "")} onClick={() => props.onClick(props.day)}>
            {getDayTracker()}
            <div className="day-label">
                &nbsp;{props.day}&nbsp;
                {props.logEntry?.notes.length > 0 &&
                    <FontAwesomeIcon icon={faFileAlt} className="notes-icon" />
                }
            </div>
        </UnstyledButton>
    );
}