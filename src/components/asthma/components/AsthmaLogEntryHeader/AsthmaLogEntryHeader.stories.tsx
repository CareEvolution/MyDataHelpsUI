import React from 'react';
import AsthmaLogEntryHeader, { AsthmaLogEntryHeaderProps } from './AsthmaLogEntryHeader';
import { Layout } from '../../../presentational';

export default {
    title: 'Asthma/Components/AsthmaLogEntryHeader',
    component: AsthmaLogEntryHeader,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaLogEntryHeaderStoryArgs extends AsthmaLogEntryHeaderProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const render = (args: AsthmaLogEntryHeaderStoryArgs) => {
    return <Layout colorScheme={args.colorScheme} bodyBackgroundColor="var(--mdhui-background-color-0)">
        <AsthmaLogEntryHeader {...args} />
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'no logs'
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
            options: ['loading', 'no logs', 'today log only', 'yesterday log only', 'both logs'],
        }
    },
    render: render
};
