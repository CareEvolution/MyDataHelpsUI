import React from 'react';
import AsthmaLogEntryHeader, { AsthmaLogEntryHeaderProps } from './AsthmaLogEntryHeader';
import { Layout } from '../../../presentational';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default {
    title: 'Asthma/Components/AsthmaLogEntryHeader',
    component: AsthmaLogEntryHeader,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaLogEntryHeaderStoryArgs extends AsthmaLogEntryHeaderProps {
    colorScheme: 'auto' | 'light' | 'dark';
    language: 'English' | 'Spanish';
}

const render = (args: AsthmaLogEntryHeaderStoryArgs) => {
    MyDataHelps.setCurrentLanguage(args.language === 'English' ? 'en' : 'es');
    return <Layout colorScheme={args.colorScheme} bodyBackgroundColor="var(--mdhui-background-color-0)">
        <AsthmaLogEntryHeader {...args} />
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        language: 'English',
        previewState: 'no logs'
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
            options: ['loading', 'no logs', 'today log only', 'yesterday log only', 'both logs'],
        }
    },
    render: render
};
