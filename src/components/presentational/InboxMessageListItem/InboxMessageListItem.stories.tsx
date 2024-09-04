import React from 'react';
import { Layout } from '../../presentational';
import InboxMessageListItem from './InboxMessageListItem';
import { InboxMessage } from '@careevolution/mydatahelps-js';

export default {
    title: 'Presentational/InboxMessageListItem',
    component: InboxMessageListItem,
    parameters: { layout: 'fullscreen' }
};

interface InboxMessageListItemStoryArgs extends InboxMessage {
    colorScheme: 'auto' | 'light' | 'dark';
}

const onClick = () => {
    console.log('message list item clicked');
};

const render = (args: InboxMessageListItemStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <InboxMessageListItem
            message={args}
            onClick={() => onClick()}
        />
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        status: 'incomplete',
        title: 'Message Title'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        status: {
            control: 'radio',
            options: ['incomplete', 'complete', 'closed']
        }
    },
    render: render
};