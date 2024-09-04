import React from 'react';
import InboxView, { InboxViewProps } from './InboxView';

export default {
    title: 'View/InboxView',
    component: InboxView,
    parameters: { layout: 'fullscreen' }
};

const render = (args: InboxViewProps) => <InboxView {...args} />

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'default',
        surveyVariant: 'default',
        resourceImageAlignment: 'left',
        resourceButtonVariant: undefined,
        resourceButtonText: ''
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        previewState: {
            name: 'preview state',
            control: 'radio',
            options: ['default', 'empty']
        },
        surveyVariant: {
            name: 'survey variant',
            control: 'radio',
            options: ['default', 'expanded'],
            if: { arg: 'previewState', 'eq': 'default' }
        },
        resourceImageAlignment: {
            name: 'resource image alignment',
            control: 'radio',
            options: ['left', 'center', 'right'],
            if: { arg: 'previewState', 'eq': 'default' }
        },
        resourceButtonVariant: {
            name: 'resource button variant',
            control: 'radio',
            options: [undefined, 'button', 'link'],
            if: { arg: 'previewState', 'eq': 'default' }
        },
        resourceButtonText: {
            name: 'resource button text override',
            if: { arg: 'previewState', 'eq': 'default' }
        }
    },
    render: render
};