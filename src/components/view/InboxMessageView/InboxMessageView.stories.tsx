import React from 'react';
import Layout from '../../presentational/Layout';
import InboxMessageView from './InboxMessageView';
import resourceImage from '../../../assets/resource-image.png'
import { InboxMessage, InboxMessageResource } from "@careevolution/mydatahelps-js";

export default {
    title: 'View/InboxMessageView',
    component: InboxMessageView,
    parameters: {layout: 'fullscreen'}
};

interface InboxMessageViewStoryArgs {
    title: string;
    content: string;
    hasRelatedResources?: boolean;
    resourceImageAlignment?: 'left' | 'center' | 'right';
    resourceButtonText?: string;
}

const render = (args: InboxMessageViewStoryArgs) => {
    let message = {
        title: args.title,
        content: args.content
    } as InboxMessage;

    if (args.hasRelatedResources) {
        message.relatedResources = [
            {
                title: 'Resource Title 1',
                subTitle: 'Here is a resource subtitle to add context.',
                imageUrl: resourceImage
            } as InboxMessageResource,
            {
                title: 'Resource Title 2',
                subTitle: 'Here is another resource subtitle to add context.'
            } as InboxMessageResource
        ];
    }

    return <Layout colorScheme="auto">
        <InboxMessageView previewState={message} resourceImageAlignment={args.resourceImageAlignment} resourceButtonText={args.resourceButtonText}/>
    </Layout>;
};

export const Default = {
    args: {
        title: 'Message Title',
        content: 'Here is some message content.',
        hasRelatedResources: false,
        resourceImageAlignment: 'left',
        resourceButtonText: 'Open'
    },
    argTypes: {
        hasRelatedResources: {
            name: 'has related resources'
        },
        resourceImageAlignment: {
            name: 'resource image alignment',
            control: 'radio',
            options: ['left', 'center', 'right'],
            if: {arg: 'hasRelatedResources', 'eq': true}
        },
        resourceButtonText: {
            name: 'resource button text',
            if: {arg: 'hasRelatedResources', 'eq': true}
        }
    },
    render: render
};
