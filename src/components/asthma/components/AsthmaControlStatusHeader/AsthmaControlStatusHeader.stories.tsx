import React from 'react';
import AsthmaControlStatusHeader, { AsthmaControlStatusHeaderProps } from './AsthmaControlStatusHeader';
import { Layout } from '../../../presentational';
import { AsthmaParticipant } from '../../model';
import MyDataHelps from '@careevolution/mydatahelps-js';

export default {
    title: 'Asthma/Components/AsthmaControlStatusHeader',
    component: AsthmaControlStatusHeader,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaControlStatusHeaderStoryArgs extends AsthmaControlStatusHeaderProps {
    colorScheme: 'auto' | 'light' | 'dark';
    language: 'English' | 'Spanish';
}

const render = (args: AsthmaControlStatusHeaderStoryArgs) => {
    MyDataHelps.setCurrentLanguage(args.language === 'English' ? 'en' : 'es');

    let participant = {
        hasPairedDevice: () => args.previewState !== 'no data',
        hasEstablishedBaseline: () => args.previewState !== 'no data'
    } as AsthmaParticipant;

    return <Layout colorScheme={args.colorScheme} bodyBackgroundColor="var(--mdhui-background-color-0)">
        <AsthmaControlStatusHeader {...args} participant={participant}/>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        language: 'English',
        previewState: 'no data'
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
            options: [
                'loading', 'no data', 'abnormal dhr', 'abnormal nhr', 'abnormal rr', 'abnormal activity', 'abnormal sleep',
                'abnormal dbol', 'abnormal nbol', 'abnormal home aqi', 'abnormal work aqi', 'abnormal multiple',
                'not determined', 'not controlled', 'controlled'
            ]
        }
    },
    render: render
};