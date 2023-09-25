import React from 'react';
import { Layout } from '../../presentational';
import InboxSurveyListItem, { InboxSurveyVariant } from './InboxSurveyListItem';
import { InboxItemStatus, InboxSurvey } from '@careevolution/mydatahelps-js';
import { noop } from '../../../helpers/functions';

export default {
    title: 'Presentational/InboxSurveyListItem',
    component: InboxSurveyListItem,
    parameters: {layout: 'fullscreen'}
};

interface InboxSurveyListItemStoryArgs {
    name: string;
    status: InboxItemStatus;
    description?: string;
    dueDate?: number;
    hasSavedProgress?: boolean;
    variant?: InboxSurveyVariant;
    surveyActive?: boolean;
}

const render = (args: InboxSurveyListItemStoryArgs) => {
    const survey = {
        name: args.name,
        description: args.description,
        status: args.status,
        dueDate: args.dueDate ? new Date(args.dueDate).toISOString() : undefined,
        hasRestorationData: args.hasSavedProgress
    } as InboxSurvey;

    return <Layout colorScheme="auto">
        <InboxSurveyListItem survey={survey} variant={args.variant} surveyActive={args.surveyActive} onClick={noop}/>
    </Layout>;
};

export const Default = {
    args: {
        variant: 'default',
        status: 'incomplete',
        name: 'Survey Name',
        description: 'This is the survey description.',
        dueDate: undefined,
        hasSavedProgress: false,
        surveyActive: false
    },
    argTypes: {
        variant: {
            control: 'radio',
            options: ['default', 'expanded'],
        },
        status: {
            control: 'radio',
            options: ['incomplete', 'complete', 'closed']
        },
        description: {
            if: {arg: 'status', 'eq': 'incomplete'}
        },
        dueDate: {
            name: 'due date',
            control: 'date',
            if: {arg: 'status', eq: 'incomplete'}
        },
        hasSavedProgress: {
            name: 'in progress',
            control: 'boolean',
            if: {arg: 'status', eq: 'incomplete'}
        },
        surveyActive: {
            name: 'survey active',
            control: 'boolean',
            if: {arg: 'status', eq: 'incomplete'}
        }
    },
    render: render
};