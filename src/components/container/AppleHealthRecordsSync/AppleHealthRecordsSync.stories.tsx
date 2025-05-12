import React from 'react'
import AppleHealthRecordsSync, { AppleHealthRecordsStatus } from './AppleHealthRecordsSync';
import { Card, Layout } from '../../presentational';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from "../../../../.storybook/helpers";

type AppleHealthRecordSyncStoryArgs = React.ComponentProps<typeof AppleHealthRecordsSync> & {
    colorScheme: 'auto' | 'light' | 'dark';
};

const meta: Meta<AppleHealthRecordSyncStoryArgs> = {
    title: 'Container/AppleHealthRecordsSync',
    component: AppleHealthRecordsSync,
    parameters: {
        layout: 'fullscreen',
    },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <AppleHealthRecordsSync {...args} />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<AppleHealthRecordSyncStoryArgs>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'enabled with data',
        showWhen: 'not set' as AppleHealthRecordsStatus
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
            options: ['wrong platform', 'disabled', 'enabled no data yet', 'enabled no data', 'enabled with data']
        },
        showWhen: {
            name: 'show when',
            control: 'radio',
            options: ['not set', 'enabled', 'disabled'],
            mapping: {
                'not set': undefined
            }
        },
        ...argTypesToHide(['enableAppleHealthRecordsSurvey', 'innerRef'])
    }
};

