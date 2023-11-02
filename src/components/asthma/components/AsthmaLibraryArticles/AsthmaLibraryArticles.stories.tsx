import React from 'react';
import AsthmaLibraryArticles, { AsthmaLibraryArticlesProps } from './AsthmaLibraryArticles';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaLibraryArticles',
    component: AsthmaLibraryArticles,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaLibraryArticlesProps) => {
    return <Layout colorScheme="auto">
        <AsthmaLibraryArticles {...args} />
    </Layout>;
};

export const Default = {
    args: {
        previewState: 'some articles',
        articleImageAlignment: 'left'
    },
    argTypes: {
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['no articles', 'some articles']
        },
        articleImageAlignment: {
            name: 'article image alignment',
            control: 'radio',
            options: ['left', 'center', 'right'],
            if: {arg: 'previewState', 'eq': 'some articles'}
        }
    },
    render: render
};
