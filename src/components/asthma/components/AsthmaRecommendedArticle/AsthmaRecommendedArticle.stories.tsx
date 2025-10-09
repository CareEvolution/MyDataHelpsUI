import React from 'react';
import AsthmaRecommendedArticle, { AsthmaRecommendedArticleProps } from './AsthmaRecommendedArticle';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaRecommendedArticle',
    component: AsthmaRecommendedArticle,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaRecommendedArticleStoryArgs extends AsthmaRecommendedArticleProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const render = (args: AsthmaRecommendedArticleStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <AsthmaRecommendedArticle {...args} libraryBaseUrl="https://asthma.careevolutionapps.dev/library/" />
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'default',
        imageAlignment: 'left',
        buttonVariant: undefined,
        buttonText: ''
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
            options: ['none', 'default', 'live']
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