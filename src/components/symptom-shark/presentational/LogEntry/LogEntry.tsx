import React from "react";
import "./LogEntry.css"
import { isToday } from "date-fns";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DailyLogEntry, SymptomSharkConfiguration } from "../../helpers/symptom-shark-data";
import { getDayOfWeek, getFullDateString } from "../../../../helpers/date-helpers";
import { Action, Card, Face, ShinyOverlay, TrackerItem } from "../../../presentational";
import language from "../../../../helpers/language";

export interface SymptomSharkLogEntryProps {
    date: Date;
    logEntry?: DailyLogEntry;
    configuration: SymptomSharkConfiguration;
    onClick?(d: Date): void;
    title?: string;
    subtitle?: string;
    highlight?: boolean;
    noDataMessage?: string;
    highlightedSymptoms?: string[];
    highlightedTreatments?: string[];
    innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: SymptomSharkLogEntryProps) {
    if (!props.configuration.symptoms.length) {
        return null;
    }

    function startEditing() {
        if (props.onClick) {
            props.onClick(props.date);
        }
    }

    let emptyLogEntry = false;
    if (!props.logEntry || !(props.logEntry.symptoms.length > 0 || props.logEntry.treatments.length > 0 || (props.logEntry && props.logEntry.notes.length > 0))) {
        emptyLogEntry = true;
    }



    let title: string = props.title ?? getDayOfWeek(props.date);
    let highlight = props.highlight ?? isToday(props.date);
    let subtitle = !props.title ? props.subtitle ?? getFullDateString(props.date) : undefined;

    if (emptyLogEntry) {
        return <Card innerRef={props.innerRef} variant={highlight ? "highlight" : "subtle"} className="mdhui-ss-log-entry">
            <Action
                title={title}
                subtitle={subtitle}
                onClick={() => startEditing()}
                indicatorIcon={faPlus}>
                {!!props.noDataMessage &&
                    <div className="mdhui-ss-log-entry-section">{props.noDataMessage}</div>
                }
                <ShinyOverlay />
            </Action>
        </Card>;
    }

    return <Card innerRef={props.innerRef} className="mdhui-ss-log-entry">
        <Action
            title={title}
            subtitle={subtitle}
            onClick={() => startEditing()}
            indicatorPosition="topRight"
            indicator={<>{props.logEntry?.overallFeeling &&
                <Face faceValue={props.logEntry?.overallFeeling} selected />
            }</>}>
            <LogEntrySymptomsAndTreatments
                configuration={props.configuration}
                logEntry={props.logEntry}
                highlightedSymptoms={props.highlightedSymptoms}
                highlightedTreatments={props.highlightedTreatments} />
            {props.logEntry!.notes &&
                <div className="mdhui-ss-log-entry-section">
                    <div className="mdhui-ss-section-header">Notes</div>
                    <div className="mdhui-ss-notes-content">{props.logEntry!.notes}</div>
                </div>
            }
        </Action>
    </Card>;
}

interface LogEntrySymptomsAndTreatmentsProps {
    logEntry?: DailyLogEntry;
    configuration: SymptomSharkConfiguration;
    highlightedSymptoms?: string[];
    highlightedTreatments?: string[];
}

interface DailySymptom {
    id: string,
    name: string,
    severity: string | undefined,
    color: string
}

interface DailyTreatment {
    id: string,
    name: string,
    color: string
}

function LogEntrySymptomsAndTreatments(props: LogEntrySymptomsAndTreatmentsProps) {
    var symptoms: DailySymptom[] = [];
    var treatments: DailyTreatment[] = [];

    if (props.logEntry) {
        props.logEntry.symptoms.forEach((s) => {
            var symptomDefinition = props.configuration.symptoms.find(s2 => s2.id == s.id);
            if (!symptomDefinition) { return; }

            var severity;
            if (symptomDefinition.severityTracking == "10PointScale") {
                severity = s.severity ? s.severity.toString() : undefined;
            }
            if (symptomDefinition.severityTracking == "3PointScale") {
                if (s.severity! > 7) { severity = language("severe-shortened"); }
                else if (s.severity! > 4) { severity = language("moderate-shortened"); }
                else if (s.severity! > 0) { severity = language("mild-shortened"); }
            }
            symptoms.push({
                id: s.id,
                severity: severity,
                name: symptomDefinition.name,
                color: symptomDefinition.color
            });
        });
        symptoms.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));

        props.logEntry.treatments.forEach((s) => {
            var treatmentDefinition = props.configuration.treatments.find(s2 => s2.id == s.id);
            if (!treatmentDefinition) { return; }
            treatments.push({
                id: s.id,
                name: treatmentDefinition.name,
                color: treatmentDefinition.color
            })
        });
        treatments.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    }

    if (!props.logEntry || !(symptoms.length > 0 || treatments.length > 0 || props.logEntry.notes.length > 0)) {
        return null;
    }

    var highlightedSymptoms: string[] = [];
    var highlightedTreatments: string[] = [];
    if (props.highlightedSymptoms) {
        highlightedSymptoms = props.highlightedSymptoms;
    }
    if (props.highlightedTreatments) {
        highlightedTreatments = props.highlightedTreatments;
    }

    if (props.logEntry.symptoms.length == 0 && props.logEntry.treatments.length == 0) {
        return null;
    }

    return <div className="mdhui-ss-log-entry-section">
        <div className="mdhui-ss-section-header">Activities & Symptoms</div>
        {symptoms.filter((s) => highlightedSymptoms.indexOf(s.id) != -1).map((s) =>
            <TrackerItem noBoxShadow selected={true} color={s.color} badge={s.severity} key={s.id} text={s.name} />
        )}
        {treatments.filter((s) => highlightedTreatments.indexOf(s.id) != -1).map((s) =>
            <TrackerItem noBoxShadow selected={true} color={s.color} key={s.id} text={s.name} bordered={true} />
        )}
        {symptoms.filter((s) => highlightedSymptoms.indexOf(s.id) == -1).map((s) =>
            <span key={s.id} style={{ opacity: highlightedSymptoms.length > 0 || highlightedTreatments.length > 0 ? .5 : 1 }}>
                <TrackerItem noBoxShadow selected={true} color={s.color} badge={s.severity} text={s.name} />
            </span>
        )}
        {treatments.filter((s) => highlightedTreatments.indexOf(s.id) == -1).map((s) =>
            <span key={s.id} style={{ opacity: highlightedSymptoms.length > 0 || highlightedTreatments.length > 0 ? .5 : 1 }}>
                <TrackerItem noBoxShadow selected={true} color={s.color} text={s.name} bordered={true} />
            </span>
        )}
    </div>;

}