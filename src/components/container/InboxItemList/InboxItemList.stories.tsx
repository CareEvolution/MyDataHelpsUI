import React from 'react';
import Layout from '../../presentational/Layout';
import InboxItemList, { InboxItemListProps } from './InboxItemList';

export default {
    title: 'Container/InboxItemList',
    component: InboxItemList,
    parameters: {layout: 'fullscreen'}
};

const render = (args: InboxItemListProps) => {
    return <Layout colorScheme="auto">
        <InboxItemList {...args} />
    </Layout>;
};

export const Default = {
    args: {
        previewState: 'no items',
        title: 'Items',
        showTitleWhenEmpty: false,
        emptyText: '',
        limit: 10,
        surveyVariant: 'default',
        resourceImageAlignment: 'left'
    },
    argTypes: {
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['no items', 'incomplete items', 'complete items']
        },
        showTitleWhenEmpty: {
            name: 'show title when empty?',
            if: {arg: 'previewState', 'eq': 'no items'}
        },
        emptyText: {
            name: 'empty text',
            if: {arg: 'previewState', 'eq': 'no items'}
        },
        limit: {
            control: 'number',
            if: {arg: 'previewState', 'neq': 'no items'}
        },
        surveyVariant: {
            control: 'radio',
            options: ['default', 'expanded'],
            if: {arg: 'previewState', 'eq': 'incomplete items'}
        },
        resourceImageAlignment: {
            control: 'radio',
            options: ['left', 'center', 'right'],
            if: {arg: 'previewState', 'eq': 'incomplete items'}
        }
    },
    render: render
};