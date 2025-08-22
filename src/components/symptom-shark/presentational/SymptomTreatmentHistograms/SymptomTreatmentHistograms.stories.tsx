import React from 'react';
import { Layout } from '../../../presentational';
import SymptomTreatmentHistograms, { SymptomTreatmentHistogramsProps } from './SymptomTreatmentHistograms';
import VisualizationCoordinator from '../../container/VisualizationCoordinator/VisualizationCoordinator';

export default {
    title: 'SymptomShark/SymptomTreatmentHistograms',
    component: SymptomTreatmentHistograms,
    parameters: { layout: 'fullscreen' }
};

const render = (args: SymptomTreatmentHistogramsProps) => (
    <Layout colorScheme="auto">
        <VisualizationCoordinator previewState="default">
            <SymptomTreatmentHistograms {...args} />
        </VisualizationCoordinator>
    </Layout>
);

export const Default = {
    args: {
        intervalStart: new Date(2025, 6, 1), // July 1, 2025
        onSymptomSelected: (symptom: string, intervalStart: Date) => console.log('Selected symptom:', symptom, 'for interval starting:', intervalStart)
    },
    render: render
};

export const WithLinkColorDefinition = {
    args: {
        intervalStart: new Date(2025, 6, 1), // July 1, 2025
        onSymptomSelected: (symptom: string, intervalStart: Date) => console.log('Selected symptom:', symptom, 'for interval starting:', intervalStart),
        linkColor: { lightMode: '#71b345', darkMode: '#a1e375' }
    },
    render: render
};
