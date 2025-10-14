import React from 'react';
import AsthmaLogEntryDetails, { AsthmaLogEntryDetailsProps } from './AsthmaLogEntryDetails';
import { Card, Layout } from '../../../presentational';
import { add, startOfToday } from 'date-fns';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../../.storybook/helpers';

interface AsthmaLogEntryDetailsStoryArgs extends AsthmaLogEntryDetailsProps {
    colorScheme: 'auto' | 'light' | 'dark';
    daysInPast: number;
}

export default {
    title: 'Asthma/Components/AsthmaLogEntryDetails',
    component: AsthmaLogEntryDetails,
    parameters: { layout: 'fullscreen' },
    render: (args: AsthmaLogEntryDetailsStoryArgs) => {
        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <AsthmaLogEntryDetails {...args} date={add(startOfToday(), { days: args.daysInPast * -1 })} />
            </Card>
        </Layout>;
    }
} as Meta<AsthmaLogEntryDetailsStoryArgs>;

export const Default: StoryObj<AsthmaLogEntryDetailsStoryArgs> = {
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
        },
        ...argTypesToHide(['date', 'logTodayEntrySurveyName', 'logYesterdayEntrySurveyName', 'editLogEntryUrl', 'infoUrl', 'innerRef'])
    }
};