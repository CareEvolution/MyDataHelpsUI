import React from 'react';
import AsthmaLogEntryHeader, { AsthmaLogEntryHeaderProps } from './AsthmaLogEntryHeader';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaLogEntryHeader',
    component: AsthmaLogEntryHeader,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaLogEntryHeaderProps) => <Layout colorScheme="auto" bodyBackgroundColor="#fff">
    <AsthmaLogEntryHeader {...args} />
</Layout>;

export const NoLogs = {
    args: {
        previewState: 'no-logs'
    },
    render: render
};

export const TodayLogOnly = {
    args: {
        previewState: 'today-log-only'
    },
    render: render
};

export const YesterdayLogOnly = {
    args: {
        previewState: 'yesterday-log-only'
    },
    render: render
};

export const BothLogs = {
    args: {
        previewState: 'both-logs'
    },
    render: render
};
