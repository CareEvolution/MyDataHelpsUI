import React from 'react';
import AsthmaDataSummary, { AsthmaDataSummaryProps } from './AsthmaDataSummary';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaDataSummary',
    component: AsthmaDataSummary,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaDataSummaryProps) => <Layout colorScheme="auto" bodyBackgroundColor="#fff">
    <AsthmaDataSummary {...args} />
</Layout>;

export const Establishing = {
    args: {
        label: 'Resting HR (Day)',
        value: 64,
        units: 'BPM',
        status: 'establishing'
    },
    render: render
};

export const Offline = {
    args: {
        label: 'Resting HR (Day)',
        value: 64,
        units: 'BPM',
        status: 'offline'
    },
    render: render
};

export const InRange = {
    args: {
        label: 'Resting HR (Day)',
        value: 64,
        units: 'BPM',
        status: 'in-range'
    },
    render: render
};

export const OutOfRange = {
    args: {
        label: 'Resting HR (Day)',
        value: 64,
        units: 'BPM',
        status: 'out-of-range'
    },
    render: render
};

export const NoUnits = {
    args: {
        label: 'Steps',
        value: 4550,
        status: 'in-range'
    },
    render: render
};

export const NoValue = {
    args: {
        label: 'AQI (Home)',
        status: 'establishing'
    },
    render: render
};

export const StatusTextOverride = {
    args: {
        label: 'AQI (Home)',
        value: 130,
        status: 'out-of-range',
        statusText: 'Unhealthy'
    },
    render: render
};
