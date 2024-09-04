import React from 'react';
import { Layout } from '../../presentational';
import InboxCompletedListItem from './InboxCompletedListItem';

export default {
    title: 'Presentational/InboxCompletedListItem',
    component: InboxCompletedListItem,
    parameters: { layout: 'fullscreen' }
};

interface InboxCompletedListItemStoryArgs {
    colorScheme: 'auto' | 'light' | 'dark';
    name: string;
    status: string;
    clickable: boolean;
}

const onClick = () => {
    console.log('completed list item clicked');
};

const render = (args: InboxCompletedListItemStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <InboxCompletedListItem
            name={args.name}
            status={args.status}
            onClick={args.clickable ? onClick : undefined}
        />
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        name: 'Item Name',
        status: 'STATUS',
        clickable: false
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        }
    },
    render: render
};