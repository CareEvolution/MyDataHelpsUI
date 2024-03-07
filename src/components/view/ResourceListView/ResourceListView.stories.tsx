import React from 'react';
import ResourceListView, { ResourceListViewProps } from './ResourceListView';

export default {
    title: 'View/ResourceListView',
    component: ResourceListView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: ResourceListViewProps) => {
    return <ResourceListView {...args}/>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'some resources',
        title: 'List Title',
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
            name: 'state',
            control: 'radio',
            options: ['no resources', 'some resources']
        },
        resourceImageAlignment: {
            name: 'resource image alignment',
            control: 'radio',
            options: ['left', 'center', 'right'],
            if: {arg: 'previewState', 'eq': 'some resources'}
        },
        resourceButtonVariant: {
            name: 'resource button variant',
            control: 'radio',
            options: [undefined, 'button', 'link']
        },
        resourceButtonText: {
            name: 'resource button text override',
            if: {arg: 'resourceButtonVariant', neq: undefined}
        }
    },
    render: render
};

