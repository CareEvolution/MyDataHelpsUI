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
        previewState: 'loaded mobile'
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
            options: ['loading web', 'loading mobile', 'loaded web', 'loaded mobile']
        },
        ...argTypesToHide(['surveySpecification', 'surveyResultId'])
    }
};

