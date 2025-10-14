import React from 'react';
import AsthmaLogEntryEditorView, { AsthmaLogEntryEditorViewProps } from './AsthmaLogEntryEditorView';
import { Meta } from '@storybook/react';
import { argTypesToHide } from '../../../../../.storybook/helpers';

export default {
    title: 'Asthma/Views/AsthmaLogEntryEditorView',
    component: AsthmaLogEntryEditorView,
    parameters: { layout: 'fullscreen' },
    render: (args: AsthmaLogEntryEditorViewProps) => {
        return <AsthmaLogEntryEditorView {...args} date={new Date()} />;
    }
} as Meta<AsthmaLogEntryEditorViewProps>;

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'no symptoms'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'no symptoms', 'mild symptoms', 'moderate symptoms', 'severe symptoms']
        },
        ...argTypesToHide(['date'])
    }
};