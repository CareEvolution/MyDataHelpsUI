import React from 'react';
import AsthmaDayView, { AsthmaDayViewProps } from './AsthmaDayView';

export default {
    title: 'Asthma/Views/AsthmaDayView',
    component: AsthmaDayView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaDayViewProps) => <AsthmaDayView {...args} />;

export const Default = {
    args: {
        previewState: {
            logEntryDetailsPreviewState: 'logged-mild-symptoms',
            biometricsPreviewState: 'default',
            airQualitiesPreviewState: 'default'
        },
        date: new Date()
    },
    render: render
};

