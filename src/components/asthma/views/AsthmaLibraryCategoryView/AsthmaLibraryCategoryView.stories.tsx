import React from 'react';
import AsthmaLibraryCategoryView, { AsthmaLibraryCategoryViewProps } from './AsthmaLibraryCategoryView';

export default {
    title: 'Asthma/Views/AsthmaLibraryCategoryView',
    component: AsthmaLibraryCategoryView,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaLibraryCategoryViewStoryArgs extends AsthmaLibraryCategoryViewProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const render = (args: AsthmaLibraryCategoryViewStoryArgs) => {
    return <AsthmaLibraryCategoryView {...args}/>;
}

export const Default = {
    args: {
        colorScheme: 'auto',
        title: 'Category Title',
        previewState: 'some articles',
        articleImageAlignment: 'left'
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
        articleImageAlignment: {
            name: 'article image alignment',
            control: 'radio',
            options: ['left', 'center', 'right'],
            if: {arg: 'previewState', 'eq': 'some articles'}
        }
    },
    render: render
};

