import React from 'react';
import { Layout } from '../../presentational';
import InboxMessageListItem from './InboxMessageListItem';
import { InboxMessage } from '@careevolution/mydatahelps-js';
import { noop } from '../../../helpers/functions';

export default {
    title: 'Presentational/InboxMessageListItem',
    component: InboxMessageListItem,
    parameters: {layout: 'fullscreen'}
};

const render = (message: InboxMessage) => {
    return <Layout colorScheme="auto">
        <InboxMessageListItem message={message} onClick={noop}/>
    </Layout>;
};

export const Default = {
    args: {
        status: 'incomplete',
        title: 'Message Title'
    },
    argTypes: {
        status: {
            control: 'radio',
            options: ['incomplete', 'complete', 'closed']
        }
    },
    render: render
};