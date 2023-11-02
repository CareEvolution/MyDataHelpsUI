import React from 'react';
import AsthmaLogEntryEditorView, { AsthmaLogEntryEditorViewProps } from './AsthmaLogEntryEditorView';

export default {
    title: 'Asthma/Views/AsthmaLogEntryEditorView',
    component: AsthmaLogEntryEditorView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaLogEntryEditorViewProps) => <AsthmaLogEntryEditorView {...args} />;

export const NoSymptoms = {
    args: {
        previewState: 'logged-no-symptoms',
        date: new Date()
    },
    render: render
};

export const MildSymptoms = {
    args: {
        previewState: 'logged-mild-symptoms',
        date: new Date()
    },
    render: render
};

export const ModerateSymptoms = {
    args: {
        previewState: 'logged-moderate-symptoms',
        date: new Date()
    },
    render: render
};

export const SevereSymptoms = {
    args: {
        previewState: 'logged-severe-symptoms',
        date: new Date()
    },
    render: render
};