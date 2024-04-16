import React from 'react';
import AsthmaLogEntryDetails, { AsthmaLogEntryDetailsProps } from './AsthmaLogEntryDetails';
import { Card, Layout } from '../../../presentational';
import { add } from 'date-fns';

export default {
    title: 'Asthma/Components/AsthmaLogEntryDetails',
    component: AsthmaLogEntryDetails,
    parameters: {layout: 'fullscreen'}
};

interface AsthmaLogEntryDetailsStoryArgs extends AsthmaLogEntryDetailsProps {
    colorScheme: 'auto' | 'light' | 'dark';
    daysInPast: number;
}

const render = (args: AsthmaLogEntryDetailsStoryArgs) => {
    return <Layout colorScheme={args.colorScheme}>
        <Card>
            <AsthmaLogEntryDetails {...args} date={add(new Date(), {days: args.daysInPast * -1})}/>
        </Card>
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        previewState: 'not logged',
        daysInPast: 0
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
            options: ['loading', 'not logged', 'logged with no symptoms', 'logged with mild symptoms', 'logged with moderate symptoms', 'logged with severe symptoms']
        },
        daysInPast: {
            name: 'days in past',
            control: 'radio',
            options: [0, 1, 2]
        }
    },
    render: render
};