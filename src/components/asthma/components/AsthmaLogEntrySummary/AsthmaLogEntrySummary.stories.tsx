import React from 'react';
import AsthmaLogEntrySummary, { AsthmaLogEntrySummaryProps } from './AsthmaLogEntrySummary';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaLogEntrySummary',
    component: AsthmaLogEntrySummary,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaLogEntrySummaryProps) => <Layout colorScheme="auto" bodyBackgroundColor="#fff">
    <AsthmaLogEntrySummary {...args} />
</Layout>;

export const NotLogged = {
    args: {
        label: 'Today',
        logEntry: null
    },
    render: render
};

export const LoggedNoSymptoms = {
    args: {
        label: 'Today',
        logEntry: {
            symptomLevel: 'none'
        }
    },
    render: render
};

export const LoggedMildSymptoms = {
    args: {
        label: 'Today',
        logEntry: {
            symptomLevel: 'mild',
        }
    },
    render: render
};

export const LoggedModerateSymptoms = {
    args: {
        label: 'Today',
        logEntry: {
            symptomLevel: 'moderate',
        }
    },
    render: render
};

export const LoggedSevereSymptoms = {
    args: {
        label: 'Today',
        logEntry: {
            symptomLevel: 'severe',
        }
    },
    render: render
};

export const Loading = {
    args: {
        label: 'Today',
        loading: true
    },
    render: render
};
