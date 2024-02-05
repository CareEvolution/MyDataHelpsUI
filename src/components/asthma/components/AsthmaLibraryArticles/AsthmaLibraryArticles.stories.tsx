import React from 'react';
import AsthmaLibraryArticles, { AsthmaLibraryArticlesProps } from './AsthmaLibraryArticles';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaLibraryArticles',
    component: AsthmaLibraryArticles,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaLibraryArticlesStoryArgs extends AsthmaLibraryArticlesProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const render = (args: AsthmaLibraryArticlesStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <AsthmaLibraryArticles {...args}/>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'some articles',
        imageAlignment: 'left'
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['no articles', 'some articles']
        },
        imageAlignment: {
            name: 'image alignment',
            control: 'radio',
            options: ['left', 'center', 'right'],
            if: {arg: 'previewState', 'eq': 'some articles'}
        }
    },
    render: render
};
