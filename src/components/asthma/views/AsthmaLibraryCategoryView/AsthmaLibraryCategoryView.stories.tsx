import React from 'react';
import AsthmaLibraryCategoryView, { AsthmaLibraryCategoryViewProps } from './AsthmaLibraryCategoryView';

export default {
    title: 'Asthma/Views/AsthmaLibraryCategoryView',
    component: AsthmaLibraryCategoryView,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaLibraryCategoryViewProps) => {
    return <AsthmaLibraryCategoryView {...args}/>;
}

export const Default = {
    args: {
        previewState: 'some articles',
        title: 'Category Title',
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

