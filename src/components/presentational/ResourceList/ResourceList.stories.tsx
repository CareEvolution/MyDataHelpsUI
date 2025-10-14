import React from 'react';
import ResourceList, { ResourceListProps } from './ResourceList';
import { Layout } from '../../presentational';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

interface ResourceListStoryArgs extends ResourceListProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

export default {
    title: 'Presentational/ResourceList',
    component: ResourceList,
    parameters: { layout: 'fullscreen' },
    render: (args: ResourceListStoryArgs) => {
        return <Layout colorScheme={args.colorScheme}>
            <ResourceList {...args} />
        </Layout>;
    }
} as Meta<ResourceListStoryArgs>;

export const Default: StoryObj<ResourceListStoryArgs> = {
    args: {
        colorScheme: 'auto',
        previewState: 'some resources',
        emptyText: '',
        imageAlignment: 'left',
        buttonVariant: undefined,
        buttonText: ''
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
            if: { arg: 'previewState', eq: 'no resources' }
        },
        imageAlignment: {
            name: 'image alignment',
            control: 'radio',
            options: ['left', 'center', 'right'],
            if: { arg: 'previewState', eq: 'some resources' }
        },
        buttonVariant: {
            name: 'button variant',
            control: 'radio',
            options: [undefined, 'button', 'link']
        },
        buttonText: {
            name: 'button text override',
            if: { arg: 'buttonVariant', neq: undefined }
        },
        ...argTypesToHide(['resources', 'onViewResource', 'style', 'innerRef'])
    }
};
