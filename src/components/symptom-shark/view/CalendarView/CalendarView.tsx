import React, { useContext } from 'react'
import { DateRangeCoordinator, Layout, Section, TextBlock } from '../../../presentational';
import { SymptomSharkLogVisualizationCoordinator } from '../../container';
import { SymptomSharkCalendar, SymptomSharkOverallExperienceChart, SymptomSharkSymptomSeverityChart, SymptomSharkSymptomTreatmentHistograms } from '../../presentational';
import { SymptomSharkVisualizationContext } from '../../container/VisualizationCoordinator/VisualizationCoordinator';

export interface CalendarViewProps {
    colorScheme?: "light" | "dark" | "auto";
    onDaySelected(d: Date): void;
    onSymptomSelected(symptom: string, intervalStart: Date): void;
    previewState?: "default";
}

export default function (props: CalendarViewProps) {

    return (
        <Layout colorScheme={props.colorScheme ?? "light"}>
            <DateRangeCoordinator variant='rounded' intervalType='Month'>
                <SymptomSharkLogVisualizationCoordinator showFilters previewState={props.previewState}>
                    <Section>
                        <SymptomSharkCalendar onDaySelected={props.onDaySelected} />
                    </Section>
                    <Section>
                        <SymptomSharkSymptomTreatmentHistograms onSymptomSelected={props.onSymptomSelected} />
                    </Section>
                    <Section>
                        <SymptomSharkOverallExperienceChart />
                    </Section>
                    <CalendarSeverityCharts />
                </SymptomSharkLogVisualizationCoordinator>
            </DateRangeCoordinator>
        </Layout>
    )
}

function CalendarSeverityCharts() {
    let visualizationContext = useContext(SymptomSharkVisualizationContext);
    if (!visualizationContext) {
        return <TextBlock>Error: Symptom Treatment Histograms must be used inside a Symptom Shark Visualization Coordinator.</TextBlock>
    }
    let { hasFilteredSymptoms, symptoms } = visualizationContext;

    if (!hasFilteredSymptoms) { return null; }

    return symptoms.filter(s => s.severityTracking != "None").map(s =>
        <Section key={s.id}>
            <SymptomSharkSymptomSeverityChart symptom={s} />
        </Section>
    )
}