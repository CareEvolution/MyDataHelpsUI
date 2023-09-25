import React from 'react';
import { noop } from '../../../helpers/functions';
import { Layout } from '../../presentational';
import InboxCompletedListItem from './InboxCompletedListItem';

export default {
    title: 'Presentational/InboxCompletedListItem',
    component: InboxCompletedListItem,
    parameters: {layout: 'fullscreen'}
};

interface InboxCompletedListItemStoryArgs {
    name: string;
    status: string;
    clickable: boolean;
}

const render = (args: InboxCompletedListItemStoryArgs) => {
    return <Layout colorScheme="auto">
        <InboxCompletedListItem name={args.name} status={args.status} onClick={args.clickable ? noop : undefined}/>
    </Layout>;
};

export const Default = {
    args: {
        name: 'Item Name',
        status: 'STATUS',
        clickable: false
    },
    render: render
};