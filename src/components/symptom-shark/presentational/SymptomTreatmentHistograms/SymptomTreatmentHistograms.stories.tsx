import React from 'react';
import { Layout } from '../../../presentational';
import SymptomTreatmentHistograms, { SymptomTreatmentHistogramsProps } from './SymptomTreatmentHistograms';
import VisualizationCoordinator from '../../container/VisualizationCoordinator/VisualizationCoordinator';

export default {
    title: 'Symptom Shark/SymptomTreatmentHistograms',
    component: SymptomTreatmentHistograms,
    parameters: { layout: 'fullscreen' }
};

// Sample data for the stories
const sampleSymptoms = [
    { id: 'symptom1', name: 'Headache', color: '#c4291c', severityTracking: 'Scale' },
    { id: 'symptom2', name: 'Nausea', color: '#e35c33', severityTracking: 'Scale' },
    { id: 'symptom3', name: 'Fatigue', color: '#5db37e', severityTracking: 'None' }
];

const sampleTreatments = [
    { id: 'treatment1', name: 'Medication A', color: '#429bdf' },
    { id: 'treatment2', name: 'Medication B', color: '#7b88c6' }
];

const sampleLogEntries = {
    '2025-07-01': {
        symptoms: [{ id: 'symptom1' }, { id: 'symptom2' }],
        treatments: [{ id: 'treatment1' }]
    },
    '2025-07-02': {
        symptoms: [{ id: 'symptom1' }],
        treatments: [{ id: 'treatment1' }, { id: 'treatment2' }]
    },
    '2025-07-03': {
        symptoms: [{ id: 'symptom3' }],
        treatments: [{ id: 'treatment2' }]
    }
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
