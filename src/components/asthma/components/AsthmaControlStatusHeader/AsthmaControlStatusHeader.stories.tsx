import React from 'react';
import AsthmaControlStatusHeader, { AsthmaControlStatusHeaderProps } from './AsthmaControlStatusHeader';
import { Layout } from '../../../presentational';
import { AsthmaParticipant } from '../../model';

export default {
    title: 'Asthma/Components/AsthmaControlStatusHeader',
    component: AsthmaControlStatusHeader,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaControlStatusHeaderStoryArgs extends AsthmaControlStatusHeaderProps {
    colorScheme: 'auto' | 'light' | 'dark';
}

const render = (args: AsthmaControlStatusHeaderStoryArgs) => {
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
        previewState: 'no data'
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
            options: [
                'loading', 'no data', 'abnormal dhr', 'abnormal nhr', 'abnormal rr', 'abnormal activity', 'abnormal sleep',
                'abnormal dbol', 'abnormal nbol', 'abnormal home aqi', 'abnormal work aqi', 'abnormal multiple',
                'not determined', 'not controlled', 'controlled'
            ]
        }
    },
    render: render
};