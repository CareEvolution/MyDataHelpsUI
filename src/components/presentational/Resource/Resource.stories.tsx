import React from 'react';
import resourceImage from '../../../assets/resource-image.png'
import { noop } from '../../../helpers/functions';
import Resource, { ResourceProps } from './Resource';
import Layout from '../Layout';

export default {
    title: 'Presentational/Resource',
    component: Resource,
    parameters: {layout: 'fullscreen'}
};

const render = (args: ResourceProps) => {
    return <Layout colorScheme="auto">
        <Resource {...args} onClick={noop}/>
    </Layout>;
};

export const Default = {
    args: {
        title: 'Resource Title',
        subTitle: 'Here is a resource subtitle to add context',
        imageUrl: resourceImage,
        imageAlignment: 'left',
        buttonVariant: undefined,
        buttonText: ''
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
        buttonVariant: {
            name: 'button variant',
            control: 'radio',
            options: [undefined, 'button', 'link']
        },
        buttonText: {
            name: 'button text override',
            if: {arg: 'buttonVariant', neq: undefined}
        }
    },
    render: render
};
