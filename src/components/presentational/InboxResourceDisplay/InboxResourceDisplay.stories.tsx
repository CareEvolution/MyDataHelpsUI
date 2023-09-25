import React from 'react';
import resourceImage from '../../../assets/resource-image.png'
import { InboxResource } from '@careevolution/mydatahelps-js';
import { noop } from '../../../helpers/functions';
import InboxResourceDisplay from './InboxResourceDisplay';
import Layout from '../Layout';
import { InboxResourceImageAlignment } from '../InboxResourceListItem';

export default {
    title: 'Presentational/InboxResourceDisplay',
    component: InboxResourceDisplay,
    parameters: {layout: 'fullscreen'}
};

interface InboxResourceDisplayStoryArgs {
    title: string;
    subTitle?: string;
    imageUrl?: string;
    imageAlignment?: InboxResourceImageAlignment;
    buttonText?: string;
}

const render = (args: InboxResourceDisplayStoryArgs) => {
    const resource = {
        title: args.title,
        subTitle: args.subTitle,
        url: 'some url',
        imageUrl: args.imageUrl
    } as InboxResource;

    return <Layout colorScheme="auto">
        <InboxResourceDisplay resource={resource} imageAlignment={args.imageAlignment} buttonText={args.buttonText} onClick={noop}/>
    </Layout>;
};

export const Default = {
    args: {
        title: 'Resource Title',
        subTitle: 'Here is a resource subtitle to add context',
        imageUrl: resourceImage,
        imageAlignment: 'left',
        buttonText: 'Open'
    },
    argTypes: {
        subTitle: {
            name: 'sub title'
        },
        imageUrl: {
            name: 'image url'
        },
        imageAlignment: {
            name: 'image alignment',
            control: 'radio',
            options: ['left', 'center', 'right']
        },
        buttonText: {
            name: 'button text'
        }
    },
    render: render
};
