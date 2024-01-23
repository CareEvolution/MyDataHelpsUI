import React from 'react';
import { Layout } from '../../../presentational';
import AsthmaActionPlanManager, { AsthmaActionPlanManagerProps } from './AsthmaActionPlanManager';

export default {
    title: 'Asthma/Components/AsthmaActionPlanManager',
    component: AsthmaActionPlanManager,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaActionPlanManagerProps) => {
    return <Layout colorScheme="auto">
        <AsthmaActionPlanManager {...args}/>
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
