import React from 'react';
import Layout from '../../presentational/Layout';
import InboxItemList, { InboxItemListProps } from './InboxItemList';

export default {
    title: 'Container/InboxItemList',
    component: InboxItemList,
    parameters: { layout: 'fullscreen' }
};

interface InboxItemListStoryArgs extends InboxItemListProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const render = (args: InboxItemListStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <InboxItemList {...args} />
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'no items',
        title: 'Items',
        showTitleWhenEmpty: false,
        emptyText: '',
        limit: 10,
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
            name: 'state',
            control: 'radio',
            options: ['no items', 'incomplete items', 'complete items']
        },
        showTitleWhenEmpty: {
            name: 'show title when empty?',
            if: { arg: 'previewState', 'eq': 'no items' }
        },
        emptyText: {
            name: 'empty text',
            if: { arg: 'previewState', 'eq': 'no items' }
        },
        limit: {
            control: 'number',
            if: { arg: 'previewState', 'neq': 'no items' }
        },
        surveyVariant: {
            name: 'survey variant',
            control: 'radio',
            options: ['default', 'expanded'],
            if: { arg: 'previewState', 'eq': 'incomplete items' }
        },
        resourceImageAlignment: {
            name: 'resource image alignment',
            control: 'radio',
            options: ['left', 'center', 'right'],
            if: { arg: 'previewState', 'eq': 'incomplete items' }
        },
        resourceButtonVariant: {
            name: 'resource button variant',
            control: 'radio',
            options: [undefined, 'button', 'link'],
            if: { arg: 'previewState', 'eq': 'incomplete items' }
        },
        resourceButtonText: {
            name: 'resource button text override',
            if: { arg: 'previewState', 'eq': 'incomplete items' }
        }
    },
    render: render
};