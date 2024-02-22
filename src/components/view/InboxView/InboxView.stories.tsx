import React from 'react';
import InboxView, { InboxViewProps } from './InboxView';

export default {
    title: 'View/InboxView',
    component: InboxView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: InboxViewProps) => <InboxView previewState="default" {...args} />

export const Default = {
    args: {
        surveyVariant: 'default',
        resourceImageAlignment: 'left'
    },
    argTypes: {
        surveyVariant: {
            control: 'radio',
            options: ['default', 'expanded']
        },
        resourceImageAlignment: {
            control: 'radio',
            options: ['left', 'center', 'right']
        }
    },
    render: render
};