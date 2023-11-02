import React from 'react';
import AsthmaLogEntryDetails, { AsthmaLogEntryDetailsProps } from './AsthmaLogEntryDetails';
import { Card, Layout } from '../../../presentational';
import { add } from 'date-fns';

export default {
    title: 'Asthma/Components/AsthmaLogEntryDetails',
    component: AsthmaLogEntryDetails,
    parameters: {layout: 'fullscreen'}
};

const render = (args: AsthmaLogEntryDetailsProps) => <Layout colorScheme="auto">
    <Card>
        <AsthmaLogEntryDetails {...args} />
    </Card>
</Layout>;

export const NotLogged = {
    args: {
        previewState: 'not-logged',
        date: new Date()
    },
    render: render
};

export const LoggedNoSymptoms = {
    args: {
        previewState: 'logged-no-symptoms',
        date: new Date()
    },
    render: render
};

export const LoggedMildSymptoms = {
    args: {
        previewState: 'logged-mild-symptoms',
        date: new Date()
    },
    render: render
};

export const LoggedModerateSymptoms = {
    args: {
        previewState: 'logged-moderate-symptoms',
        date: new Date()
    },
    render: render
};

export const LoggedSevereSymptoms = {
    args: {
        previewState: 'logged-severe-symptoms',
        date: new Date()
    },
    render: render
};

export const NotLoggedTooLate = {
    args: {
        previewState: 'not-logged',
        date: add(new Date(), {days: -2})
    },
    render: render
};

export const LoggedTooLate = {
    args: {
        previewState: 'logged-no-symptoms',
        date: add(new Date(), {days: -2})
    },
    render: render
};