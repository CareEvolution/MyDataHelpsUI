import React from 'react';
import "./SymptomTreatmentHistograms.css"
import { add } from 'date-fns';
import { DailyLogEntry, Histogram, SymptomConfiguration, Title, TreatmentConfiguration, getDayKey, language } from '../../../..';

export interface SymptomTreatmentHistogramsProps {
    symptoms: SymptomConfiguration[];
    treatments: TreatmentConfiguration[];
    logEntries: { [key: string]: DailyLogEntry };
    currentMonth: number;
    currentYear: number;
    onSymptomSelected(symptom: string): void;
}

export default function (props: SymptomTreatmentHistogramsProps) {
    var symptomHistogram: {
        label: string;
        color: string;
        value: number;
        onSelect?(): void;
    }[] = [];

    props.symptoms.filter(s => !s.inactive).forEach((s) => {
        var value = 0;
        var startDate = new Date(props.currentYear, props.currentMonth, 1);
        while (startDate.getMonth() == props.currentMonth) {
            var logEntry = props.logEntries[getDayKey(startDate)];
            if (logEntry && logEntry.symptoms.find((s2) => s2.id == s.id)) {
                value++;
            }
            startDate = add(startDate, { days: 1 });
        }

        var onSelect = s.severityTracking && s.severityTracking != "None" ? function () {
            props.onSymptomSelected(s.id);
        } : undefined;

        if (value > 0) {
            symptomHistogram.push({
                color: s.color,
                label: s.name,
                value: value,
                onSelect: onSelect
            });
        }
    });

    var treatmentHistogram: {
        label: string;
        color: string;
        value: number;
        onSelect?(): void;
    }[] = [];

    props.treatments.filter(s => !s.inactive).forEach((t) => {
        var value = 0;
        var startDate = new Date(props.currentYear, props.currentMonth, 1);
        while (startDate.getMonth() == props.currentMonth) {
            var logEntry = props.logEntries[getDayKey(startDate)];
            if (logEntry && logEntry.treatments.find((t2) => t2.id == t.id)) {
                value++;
            }
            startDate = add(startDate, { days: 1 });
        }

        if (value > 0) {
            treatmentHistogram.push({
                color: t.color,
                label: t.name,
                value: value
            });
        }
    });

    if (!treatmentHistogram.length && !symptomHistogram.length) {
        return null;
    }

    return (
        <div className="mdhui-ss-histograms">
            <div className="mdhui-ss-histogram">
                <Title className="mdhui-ss-histogram-title" order={4}>{language("symptoms")}</Title>
                <Histogram className='ss-histogram' entries={symptomHistogram} />
            </div>
            <div className="mdhui-ss-histogram">
                <Title className="mdhui-ss-histogram-title" order={4}>{language("treatments")}</Title>
                <Histogram className='ss-histogram' entries={treatmentHistogram} />
            </div>
            <div style={{ clear: "both" }}></div>
        </div>
    );
}