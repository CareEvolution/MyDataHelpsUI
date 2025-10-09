import React from 'react';
import { Layout } from '../../../presentational';
import AsthmaActionPlanManager, { AsthmaActionPlanManagerProps } from './AsthmaActionPlanManager';

export default {
    title: 'Asthma/Components/AsthmaActionPlanManager',
    component: AsthmaActionPlanManager,
    parameters: { layout: 'fullscreen' }
};

interface AsthmaActionPlanManagerStoryArgs extends AsthmaActionPlanManagerProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const render = (args: AsthmaActionPlanManagerStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <AsthmaActionPlanManager {...args} />
    </Layout>;
}

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'loaded without action plan'
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
            options: ['loading', 'loading (caregiver mode)', 'loaded without action plan', 'loaded without action plan (caregiver mode)', 'loaded with action plan', 'loaded with action plan (caregiver mode)']
        }
    },
    render: render
};
