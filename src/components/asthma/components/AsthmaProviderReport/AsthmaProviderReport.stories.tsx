import React from 'react';
import { Layout } from '../../../presentational';
import AsthmaProviderReport, { AsthmaProviderReportProps } from './AsthmaProviderReport';

export default {
    title: 'Asthma/Components/AsthmaProviderReport',
    component: AsthmaProviderReport,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaProviderReportProps) => {
    return <Layout colorScheme='light' bodyBackgroundColor="#fff">
        <AsthmaProviderReport {...args}/>
    </Layout>;
}

export const Default = {
    args: {
        previewState: 'default'
    },
    argTypes: {
        previewState: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'default']
        }
    },
    render: render
};
