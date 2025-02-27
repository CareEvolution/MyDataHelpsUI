import React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { Description } from "@storybook/blocks"
import DocumentLibraryView, { DocumentLibraryViewProps } from "./DocumentLibraryView"
import { Action } from "../../presentational";

const meta: Meta<typeof DocumentLibraryView> = {
    title: "View/DocumentLibraryView",
    component: DocumentLibraryView,
    parameters: {
        layout: 'fullscreen',
        docs: {
            Description: <Description />
        }
    }
};

export default meta;
type Story = StoryObj<typeof DocumentLibraryView>;

const render = (args: DocumentLibraryViewProps) => 
    <DocumentLibraryView {...args} />;

const defaultProps : DocumentLibraryViewProps = {
    colorScheme: 'auto',
    uploadDocumentSurveyName: 'UploadDocument',
    fileResultIdentifier: 'document',
    typeResultIdentifier: 'document_type',
    nameResultIdentifier: 'document_name',
    dateResultIdentifier: 'document_date',
    notesResultIdentifier: 'document_notes',
    documentDetailViewBaseUrl: ''
};

export const Default: Story = {
    args: { ...defaultProps, preview: 'Preview' },
    render: render
};

export const NoFiles: Story = {
    args: { ...defaultProps, preview: 'PreviewNoFiles' },
    render: render
};

export const Loading: Story = {
    args: { ...defaultProps, preview: 'PreviewLoading' },
    render: render
};

export const Live: Story = {
    args: { ...defaultProps },
    render: render
};