import React from 'react';
import AsthmaLibraryCategories, { AsthmaLibraryCategoriesProps } from './AsthmaLibraryCategories';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaLibraryCategories',
    component: AsthmaLibraryCategories,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaLibraryCategoriesProps) => {
    return <Layout colorScheme="auto">
        <AsthmaLibraryCategories {...args} />
    </Layout>;
};

export const Default = {
    args: {
        previewState: 'some categories'
    },
    argTypes: {
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['no categories', 'some categories']
        }
    },
    render: render
};
