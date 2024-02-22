import React from 'react';
import { Layout, ResourceImageAlignment } from '../../presentational';
import InboxResourceListItem from './InboxResourceListItem';
import resourceImage from '../../../assets/resource-image.png'
import { InboxItemStatus, InboxResource } from '@careevolution/mydatahelps-js';
import { noop } from '../../../helpers/functions';

export default {
    title: 'Presentational/InboxResourceListItem',
    component: InboxResourceListItem,
    parameters: {layout: 'fullscreen'}
};

interface InboxResourceListItemStoryArgs {
    title: string;
    subTitle?: string;
    imageUrl?: string;
    status: InboxItemStatus;
    imageAlignment?: ResourceImageAlignment;
    buttonText?: string;
}

const render = (args: InboxResourceListItemStoryArgs) => {
    const resource = {
        title: args.title,
        subTitle: args.subTitle,
        url: 'some url',
        imageUrl: args.imageUrl,
        status: args.status
    } as InboxResource;

    return <Layout colorScheme="auto">
        <InboxResourceListItem resource={resource} imageAlignment={args.imageAlignment} buttonText={args.buttonText} onClick={noop}/>
    </Layout>;
};

export const Default = {
    args: {
        status: 'incomplete',
        title: 'Resource Title',
        subTitle: 'Here is a resource subtitle to add context',
        imageUrl: resourceImage,
        imageAlignment: 'left',
        buttonText: 'Open'
    },
    argTypes: {
        status: {
            control: 'radio',
            options: ['incomplete', 'complete', 'closed']
        },
        subTitle: {
            name: 'sub title',
            if: {arg: 'status', 'eq': 'incomplete'}
        },
        imageUrl: {
            name: 'image url',
            if: {arg: 'status', 'eq': 'incomplete'}
        },
        imageAlignment: {
            name: 'image alignment',
            control: 'radio',
            options: ['left', 'center', 'right'],
            if: {arg: 'status', 'eq': 'incomplete'}
        },
        buttonText: {
            name: 'button text',
            if: {arg: 'status', 'eq': 'incomplete'}
        }
    },
    render: render
};