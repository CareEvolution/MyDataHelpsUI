import React from 'react';
import { Layout } from '../../../presentational';
import AsthmaActionPlan, { AsthmaActionPlanProps } from './AsthmaActionPlan';

export default {
    title: 'Asthma/Components/AsthmaActionPlan',
    component: AsthmaActionPlan,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaActionPlanProps) => {
    return <Layout colorScheme="auto">
        <AsthmaActionPlan {...args}/>
    </Layout>;
}

export const Default = {
    args: {
        previewState: 'loaded without action plan'
    },
    argTypes: {
        previewState: {
            name: 'State',
            control: 'radio',
            options: ['loading', 'loaded without action plan', 'loaded with action plan']
        }
    },
    render: render
};
