import React from 'react';
import resourceImage from '../../../assets/resource-image.png'
import Resource, { ResourceProps } from './Resource';
import Layout from '../Layout';

export default {
    title: 'Presentational/Resource',
    component: Resource,
    parameters: { layout: 'fullscreen' }
};

interface ResourceStoryArgs extends ResourceProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const onClick = () => {
    console.log('resource clicked');
};

const render = (args: ResourceStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <Resource {...args} onClick={() => onClick()} />
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        title: 'Resource Title',
        subTitle: 'Here is a resource subtitle to add context',
        imageUrl: resourceImage,
        imageAlignment: 'left',
        buttonVariant: undefined,
        buttonText: ''
    },
    argTypes: {
        colorScheme: {
            default: 'auto',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
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
        buttonVariant: {
            name: 'button variant',
            control: 'radio',
            options: [undefined, 'button', 'link']
        },
        buttonText: {
            name: 'button text override'
        }
    },
    render: render
};
