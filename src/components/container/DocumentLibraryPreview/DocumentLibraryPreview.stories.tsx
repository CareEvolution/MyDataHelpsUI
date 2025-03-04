import React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { Description } from "@storybook/blocks"
import DocumentLibraryPreview, { DocumentLibraryPreviewProps } from "./DocumentLibraryPreview";
import { Layout } from "../../presentational";

const meta: Meta<typeof DocumentLibraryPreview> = {
    title: "Container/DocumentLibraryPreview",
    component: DocumentLibraryPreview,
    parameters: {
        layout: 'fullscreen',
        docs: {
            Description: <Description />
        }
    }
};

export default meta;
type Story = StoryObj<typeof DocumentLibraryPreview>;

const render = (args: DocumentLibraryPreviewProps) =>
    <Layout colorScheme="auto">
        <DocumentLibraryPreview {...args} />
    </Layout>;

const defaultProps: DocumentLibraryPreviewProps = {
    uploadDocumentSurveyName: 'UploadDocument',
    fileResultIdentifier: 'document',
    typeResultIdentifier: 'document_type',
    nameResultIdentifier: 'document_name',
    dateResultIdentifier: 'document_date',
    notesResultIdentifier: 'document_notes',
    documentLibraryViewBaseUrl: ''
};

export const NoUploadedFiles: Story = {
    args: { ...defaultProps, preview: 'PreviewNoDocuments' },
    render: render
};

export const UploadedFiles: Story = {
    args: { ...defaultProps, preview: 'PreviewDocuments' },
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