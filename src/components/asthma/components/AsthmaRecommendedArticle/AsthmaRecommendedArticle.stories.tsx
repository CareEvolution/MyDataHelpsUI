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
        <AsthmaRecommendedArticle {...args} />
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'default',
        imageAlignment: 'left',
        hideButton: false,
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
            options: ['none', 'default']
        },
        imageAlignment: {
            name: 'image alignment',
            control: 'radio',
            options: ['left', 'center', 'right']
        },
        hideButton: {
            name: 'hide button?'
        },
        buttonText: {
            name: 'button text override',
            if: {arg: 'hideButton', eq: false}
        }
    },
    render: render
};