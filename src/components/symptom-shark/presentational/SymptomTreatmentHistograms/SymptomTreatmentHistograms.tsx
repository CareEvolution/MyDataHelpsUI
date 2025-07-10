import React, { useContext } from 'react';
import "./SymptomTreatmentHistograms.css"
import { add, startOfMonth } from 'date-fns';
import { Histogram, TextBlock, Title, getDayKey, language } from '../../../..';
import { ColorDefinition } from '../../../../helpers/colors';
import { SymptomSharkVisualizationContext } from '../../container/VisualizationCoordinator/VisualizationCoordinator';
import { DateRangeContext } from '../../../presentational/DateRangeCoordinator/DateRangeCoordinator';

export interface SymptomTreatmentHistogramsProps {
    intervalStart?: Date;
    onSymptomSelected(symptom: string, intervalStart: Date): void;
    innerRef?: React.Ref<HTMLDivElement>;
    linkColor?: ColorDefinition;
}

export default function (props: SymptomTreatmentHistogramsProps) {
    let visualizationContext = useContext(SymptomSharkVisualizationContext);
    if (!visualizationContext) {
        return <TextBlock innerRef={props.innerRef}>Error: Symptom Treatment Histograms must be used inside a Symptom Shark Visualization Coordinator.</TextBlock>
    }
    let { symptoms, treatments, logEntries } = visualizationContext;

    let dateRangeContext = useContext(DateRangeContext);
    let intervalStart = props.intervalStart || startOfMonth(new Date());
    if (dateRangeContext) {
        intervalStart = dateRangeContext.intervalStart;
    }

    var symptomHistogram: {
        label: string;
        color: string;
        value: number;
        onSelect?(): void;
    }[] = [];

    symptoms.forEach((s) => {
        var value = 0;
        var startDate = intervalStart;
        while (startDate.getMonth() == intervalStart.getMonth()) {
            var logEntry = logEntries[getDayKey(startDate)];
            if (logEntry && logEntry.symptoms.find((s2) => s2.id == s.id)) {
                value++;
            }
            startDate = add(startDate, { days: 1 });
        }

        var onSelect = s.severityTracking && s.severityTracking != "None" ? function () {
            props.onSymptomSelected(s.id, intervalStart);
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

    treatments.forEach((t) => {
        var value = 0;
        var startDate = intervalStart;
        while (startDate.getMonth() == intervalStart.getMonth()) {
            var logEntry = logEntries[getDayKey(startDate)];
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
        <div ref={props.innerRef} className="mdhui-ss-histograms">
            <div className="mdhui-ss-histogram">
                <Title className="mdhui-ss-histogram-title" order={4}>{language("symptoms")}</Title>
                <Histogram className='ss-histogram' entries={symptomHistogram} linkColor={props.linkColor} />
            </div>
            <div className="mdhui-ss-histogram">
                <Title className="mdhui-ss-histogram-title" order={4}>{language("treatments")}</Title>
                <Histogram className='ss-histogram' entries={treatmentHistogram} linkColor={props.linkColor} />
            </div>
            <div style={{ clear: "both" }}></div>
        </div>
    );
}
