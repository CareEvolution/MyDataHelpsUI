import React from 'react';
import AsthmaControlStatusHeader, { AsthmaControlStatusHeaderProps } from './AsthmaControlStatusHeader';
import { Layout } from '../../../presentational';
import { AsthmaParticipant, AsthmaParticipantMode } from '../../model';

export default {
    title: 'Asthma/Components/AsthmaControlStatusHeader',
    component: AsthmaControlStatusHeader,
    parameters: { layout: 'fullscreen' }
};

interface AsthmaControlStatusHeaderStoryArgs extends AsthmaControlStatusHeaderProps {
    colorScheme: 'auto' | 'light' | 'dark';
    participantMode: AsthmaParticipantMode;
}

const render = (args: AsthmaControlStatusHeaderStoryArgs) => {
    let participant = {
        hasPairedDevice: () => args.previewState !== 'no data',
        hasEstablishedBaseline: () => args.previewState !== 'no data',
        getParticipantMode: () => args.participantMode,
        getCareRecipientName: () => args.participantMode === 'Caregiver' ? 'Leroy' : undefined
    } as AsthmaParticipant;

    return <Layout colorScheme={args.colorScheme} bodyBackgroundColor="var(--mdhui-background-color-0)">
        <AsthmaControlStatusHeader {...args} participant={participant} />
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'no data',
        participantMode: 'Self'
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
        },
        participantMode: {
            name: 'participant mode',
            control: 'radio',
            options: ['Self', 'Caregiver']
        }
    },
    render: render
};