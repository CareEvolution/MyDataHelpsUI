import React from 'react'
import DocumentDetailView, { DocumentDetailViewProps } from './DocumentDetailView';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

const meta: Meta<DocumentDetailViewProps> = {
    title: 'View/DocumentDetailView',
    component: DocumentDetailView,
    parameters: {
        layout: 'fullscreen',
    },
    render: args => <DocumentDetailView {...args} />
};
export default meta;

type Story = StoryObj<DocumentDetailViewProps>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'image loaded on mobile'
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
            options: ['loading', 'image loaded on web', 'image loaded on mobile', 'pdf loaded on web', 'pdf loaded on mobile']
        },
        ...argTypesToHide(['surveySpecification', 'surveyResultId'])
    }
};

