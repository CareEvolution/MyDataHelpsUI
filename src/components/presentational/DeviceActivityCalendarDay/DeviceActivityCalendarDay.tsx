import React from 'react';
import "./DeviceActivityCalendarDay.css"
import { DailyLogEntry, SymptomSharkConfiguration } from '../../symptom-shark';
import SparkBarChart, { SparkBarChartBar } from '../SparkBarChart';
import DayTrackerSymbol from '../DayTrackerSymbol';
import Face from '../Face';

export interface DeviceActivityCalendarDayProps {
    loading: boolean;
    averageFillPercent: number;
    date: Date;
    bars: SparkBarChartBar[];
    selected: boolean;
    logEntry?: DailyLogEntry;
    participantInfo: SymptomSharkConfiguration;
    highlightOutOfRange: boolean;
}

export interface DeviceActivityBar {
    color: string;
    barFillPercent: number;
}


export default function (props: DeviceActivityCalendarDayProps) {
    var currentDate = new Date();
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0, 0);
    var isFuture = false;
    if (props.date > currentDate) {
        isFuture = true;
    }

    function getDayTracker(entry: DailyLogEntry) {
        var primaryColors = entry.symptoms.map(t => props.participantInfo.symptoms.find(s => s.id == t.id)?.color).filter(t => !!t).map(t => t!);
        var secondaryColors = entry.treatments.map(t => props.participantInfo.treatments.find(s => s.id == t.id)?.color).filter(t => !!t).map(t => t!);
        if (primaryColors.length === 0 && secondaryColors.length === 0) { return null; }
        //key prevents rendering weirdness, for some reason?  
        return <DayTrackerSymbol key={primaryColors.join('|') + ',' + secondaryColors.join('|')} primaryColors={primaryColors} secondaryColors={secondaryColors} />
    }

    return <div key={props.date.getTime()} className={"device-activity-calendar-day " + (props.selected ? "selected" : "") + (isFuture ? "future" : "")}>
        {/* <div className="day-symptoms-marker">
            {!props.loading && !!props.logEntry && getDayTracker(props.logEntry)}
        </div> */}
        <div className="face-wrapper" style={{paddingTop:"16px"}}>
            {!props.loading && props.logEntry && props.logEntry.overallFeeling &&
                <Face className="ss-face" faceValue={props.logEntry.overallFeeling} selected={true} />
            }
        </div>
        <div className="day-bar-wrapper">
            <SparkBarChart
                averageFillPercent={props.averageFillPercent}
                bars={props.bars} />
        </div>
    </div>;
}
