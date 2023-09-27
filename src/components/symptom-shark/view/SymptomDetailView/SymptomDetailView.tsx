import React, { useContext } from 'react';
import { startOfMonth } from 'date-fns';
import { SymptomSharkVisualizationCoordinator } from '../../container';
import { DateRangeCoordinator, Layout, NavigationBar, Section } from '../../../presentational';
import { SymptomSharkSymptomSeverityChart, SymptomSharkSymptomSeveritySummary } from '../../presentational';
import { SymptomSharkVisualizationContext } from '../../container/VisualizationCoordinator/VisualizationCoordinator';

export interface SymptomDetailViewProps {
    symptomId: string;
    colorScheme?: "light" | "dark" | "auto";
    previewState?: "default"
    initialIntervalStart?: Date;
}

export default function (props: SymptomDetailViewProps) {

    return (
        <Layout colorScheme={props.colorScheme || "light"} className="symptom-detail-view symptom-shark-view">
            <SymptomSharkVisualizationCoordinator previewState={props.previewState}>
                <SymptomDetailViewInner {...props} />
            </SymptomSharkVisualizationCoordinator>
        </Layout>
    );
}

function SymptomDetailViewInner(props: SymptomDetailViewProps) {
    let visualizationContext = useContext(SymptomSharkVisualizationContext);
    if (!visualizationContext) {
        return null;
    }
    let symptom = visualizationContext.symptoms.find(s => s.id == props.symptomId);
    if (!symptom) {
        return null;
    }

    var initialIntervalStart = props.initialIntervalStart || startOfMonth(new Date());

    return <>
        <NavigationBar title={symptom.name} showCloseButton={true} />
        <DateRangeCoordinator initialIntervalStart={initialIntervalStart} intervalType='Month' variant="rounded" >
            <Section noTopMargin>
                <SymptomSharkSymptomSeveritySummary symptom={symptom} />
            </Section>
            <Section>
                <SymptomSharkSymptomSeverityChart symptom={symptom} />
            </Section>
        </DateRangeCoordinator>
    </>
}