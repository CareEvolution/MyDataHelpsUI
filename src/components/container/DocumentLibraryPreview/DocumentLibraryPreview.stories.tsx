import React from 'react'
import DocumentLibraryPreview from './DocumentLibraryPreview';
import { Card, Layout } from '../../presentational';
import { Meta, StoryObj } from '@storybook/react';
import { argTypesToHide } from '../../../../.storybook/helpers';

type DocumentLibraryPreviewStoryArgs = React.ComponentProps<typeof DocumentLibraryPreview> & {
    colorScheme: 'auto' | 'light' | 'dark';
};

const meta: Meta<DocumentLibraryPreviewStoryArgs> = {
    title: 'Container/DocumentLibraryPreview',
    component: DocumentLibraryPreview,
    parameters: {
        layout: 'fullscreen',
    },
    render: args => {
        return <Layout colorScheme={args.colorScheme}>
            <Card>
                <DocumentLibraryPreview {...args} />
            </Card>
        </Layout>;
    }
};
export default meta;

type Story = StoryObj<DocumentLibraryPreviewStoryArgs>;

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
            options: ['loading', 'no documents', 'some documents']
        },
        ...argTypesToHide(['surveySpecification', 'documentLibraryViewBaseUrl', 'innerRef'])
    }
};

