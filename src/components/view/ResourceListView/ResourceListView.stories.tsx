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
        resourceImageAlignment: 'left'
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
            name: 'resources image alignment',
            control: 'radio',
            options: ['left', 'center', 'right'],
            if: {arg: 'previewState', 'eq': 'some resources'}
        }
    },
    render: render
};

