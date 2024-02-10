import React from 'react';
import ResourceList, { ResourceListProps } from './ResourceList';
import { Layout } from '../../presentational';

export default {
    title: 'Presentational/ResourceList',
    component: ResourceList,
    parameters: {layout: 'fullscreen'}
};

interface ResourceListStoryArgs extends ResourceListProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const render = (args: ResourceListStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <ResourceList {...args}/>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'some resources',
        emptyText: '',
        imageAlignment: 'left'
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
        emptyText: {
            name: 'empty text override',
            if: {arg: 'previewState', eq: 'no resources'}
        },
        imageAlignment: {
            name: 'image alignment',
            control: 'radio',
            options: ['left', 'center', 'right'],
            if: {arg: 'previewState', eq: 'some resources'}
        }
    },
    render: render
};
