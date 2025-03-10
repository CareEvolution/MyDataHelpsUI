import React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { Description } from "@storybook/blocks"
import DocumentDetailView, { DocumentDetailViewProps } from "./DocumentDetailView";

const meta: Meta<typeof DocumentDetailView> = {
    title: "View/DocumentDetailView",
    component: DocumentDetailView,
    parameters: {
        layout: 'fullscreen',
        docs: {
            Description: <Description />
        }
    }
};

export default meta;
type Story = StoryObj<typeof DocumentDetailView>;

const render = (args: DocumentDetailViewProps) => <DocumentDetailView {...args} />;

const uploadDocumentSurveyProps: DocumentDetailViewProps = {
    colorScheme: 'auto',
    surveyResultId: '',
    fileResultIdentifier: 'document',
    typeResultIdentifier: 'document_type',
    nameResultIdentifier: 'document_name',
    dateResultIdentifier: 'document_date',
    notesResultIdentifier: 'document_notes'
}

export const AllFields: Story = {
    args: { ...uploadDocumentSurveyProps, preview: 'PreviewPdf' },
    render: render
};

export const EmptyOptionalFields: Story = {
    args: { ...uploadDocumentSurveyProps, preview: 'PreviewOptionalFields' },
    render: render
};

export const Text: Story = {
    args: { ...uploadDocumentSurveyProps, preview: 'PreviewText' },
    render: render
};

export const Image: Story = {
    args: { ...uploadDocumentSurveyProps, preview: 'PreviewImage' },
    render: render
};

export const Csv: Story = {
    args: { ...uploadDocumentSurveyProps, preview: 'PreviewCsvFile' },
    render: render
};

export const Video: Story = {
    args: { ...uploadDocumentSurveyProps, preview: 'PreviewMp4' },
    render: render
};

export const Loading: Story = {
    args: { ...uploadDocumentSurveyProps, preview: 'PreviewLoading' },
    render: render
};

export const FileNotFound: Story = {
    args: { ...uploadDocumentSurveyProps, preview: 'PreviewFileNotFound' },
    render: render
};

export const Live: Story = {
    args: { ...uploadDocumentSurveyProps, surveyResultId: 'c8fd5680-d4f9-ef11-baff-0affe8024cad' },
    render: render
};