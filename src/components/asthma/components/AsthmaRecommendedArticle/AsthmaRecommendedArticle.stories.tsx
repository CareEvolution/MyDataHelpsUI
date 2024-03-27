import React from 'react';
import AsthmaRecommendedArticle, { AsthmaRecommendedArticleProps } from './AsthmaRecommendedArticle';
import { Layout } from '../../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default {
    title: 'Asthma/Components/AsthmaRecommendedArticle',
    component: AsthmaRecommendedArticle,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaRecommendedArticleStoryArgs extends AsthmaRecommendedArticleProps {
    colorScheme: 'auto' | 'light' | 'dark';
    language: 'English' | 'Spanish';
}

const render = (args: AsthmaRecommendedArticleStoryArgs) => {
    MyDataHelps.setCurrentLanguage(args.language === 'English' ? 'en' : 'es');
    return <Layout colorScheme={args.colorScheme}>
        <AsthmaRecommendedArticle {...args} />
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        language: 'English',
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
        language: {
            name: 'language',
            control: 'radio',
            options: ['English', 'Spanish']
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