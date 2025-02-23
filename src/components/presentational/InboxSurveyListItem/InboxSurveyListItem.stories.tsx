import React from 'react';
import { Layout } from '../../presentational';
import InboxSurveyListItem, { InboxSurveyVariant } from './InboxSurveyListItem';
import { InboxItemStatus, InboxSurvey } from '@careevolution/mydatahelps-js';

export default {
    title: 'Presentational/InboxSurveyListItem',
    component: InboxSurveyListItem,
    parameters: { layout: 'fullscreen' }
};

interface InboxSurveyListItemStoryArgs {
    colorScheme: 'auto' | 'light' | 'dark';
    name: string;
    displayName?: string;
    status: InboxItemStatus;
    description?: string;
    dueDate?: number;
    hasSavedProgress?: boolean;
    variant?: InboxSurveyVariant;
    surveyActive?: boolean;
}

const onClick = () => {
    console.log('survey list item clicked');
};

const render = (args: InboxSurveyListItemStoryArgs) => {
    const survey = {
        name: args.name,
        displayName: args.displayName,
        description: args.description,
        status: args.status,
        dueDate: args.dueDate ? new Date(args.dueDate).toISOString() : undefined,
        hasRestorationData: args.hasSavedProgress
    } as InboxSurvey;

    return <Layout colorScheme={args.colorScheme}>
        <InboxSurveyListItem
            survey={survey}
            variant={args.variant}
            surveyActive={args.surveyActive}
            onClick={() => onClick()}
        />
    </Layout>;
};

export const Default = {
    args: {
        colorScheme: 'auto',
        variant: 'default',
        status: 'incomplete',
        name: 'Survey Name',
        displayName: undefined,
        description: 'This is the survey description.',
        dueDate: undefined,
        hasSavedProgress: false,
        surveyActive: false
    },
    argTypes: {
        colorScheme: {
            name: 'color scheme',
            control: 'radio',
            options: ['auto', 'light', 'dark']
        },
        variant: {
            control: 'radio',
            options: ['default', 'expanded'],
        },
        status: {
            control: 'radio',
            options: ['incomplete', 'complete', 'closed']
        },
        displayName: {
            name: 'display name',
            control: 'text'
        },
        description: {
            if: { arg: 'status', 'eq': 'incomplete' }
        },
        dueDate: {
            name: 'due date',
            control: 'date',
            if: { arg: 'status', eq: 'incomplete' }
        },
        hasSavedProgress: {
            name: 'in progress',
            control: 'boolean',
            if: { arg: 'status', eq: 'incomplete' }
        },
        surveyActive: {
            name: 'survey active',
            control: 'boolean',
            if: { arg: 'status', eq: 'incomplete' }
        }
    },
    render: render
};