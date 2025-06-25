import React from 'react'
import DocumentLibraryView, { DocumentLibraryViewProps } from './DocumentLibraryView';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

const meta: Meta<DocumentLibraryViewProps> = {
    title: 'View/DocumentLibraryView',
    component: DocumentLibraryView,
    parameters: {
        layout: 'fullscreen',
    },
    render: args => <DocumentLibraryView {...args} />
};
export default meta;

type Story = StoryObj<DocumentLibraryViewProps>;

export const Default: Story = {
    args: {
        colorScheme: 'auto',
        previewState: 'some documents'
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
            options: ['loading', 'reloading', 'no documents', 'some documents']
        },
        ...argTypesToHide(['surveySpecification', 'documentDetailViewBaseUrl'])
    }
};

