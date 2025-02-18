﻿import React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import NotificationList, { NotificationListPreviewState } from './NotificationList'
import Layout from '../../presentational/Layout'
import { Card } from '../../presentational'
import { argTypesToHide } from '../../../../.storybook/helpers';
import { tryParseRegex } from '../../../helpers';


type NotificationListStoryArgs = React.ComponentProps<typeof NotificationList> & {
    colorScheme: 'auto' | 'light' | 'dark';
    state: NotificationListPreviewState | 'live';
    notificationIdentifierRegexString?: string;
};

const meta: Meta<NotificationListStoryArgs> = {
    title: 'Container/NotificationList',
    component: NotificationList,
    parameters: {
        layout: 'fullscreen'
    },
};
export default meta;

type Story = StoryObj<NotificationListStoryArgs>;

const render = (args: NotificationListStoryArgs) => {
    if (args.notificationIdentifierRegexString) {
        const { success, regex } = tryParseRegex(args.notificationIdentifierRegexString);
        if (success) {
            args.notificationIdentifierRegex = regex;
        } else {
            console.log('Invalid identifier regex.')
        }
    }

    return <Layout colorScheme={args.colorScheme}>
        <Card>
            <NotificationList
                previewState={args.state !== 'live' ? args.state : undefined}
                {...args}
            />
        </Card>
    </Layout>;
};

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        state: "loaded with data",
        notificationType: undefined,
        notificationIdentifierRegexString: '',
        displayLimit: 100,
        hideWhenEmpty: false
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        state: {
            name: 'state',
            control: 'radio',
            options: ['loading', 'loaded with data', 'loaded with no data', 'live']
        },
        notificationType: {
            name: 'type filter',
            control: {
                type: 'radio',
                labels: {
                    undefined: 'None'
                }
            },
            options: [undefined, 'Email', 'Push', 'Sms']
        },
        notificationIdentifierRegexString: {
            name: 'identifier regex',
        },
        displayLimit: {
            name: 'display limit',
            control: 'number'
        },
        hideWhenEmpty: {
            name: 'hide when empty?'
        },
        ...argTypesToHide(['previewState', 'notificationIdentifierRegex', 'innerRef'])
    },
    render: render
};

