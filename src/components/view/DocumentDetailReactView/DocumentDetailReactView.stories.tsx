import React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { Description } from "@storybook/blocks"
import DocumentDetailReactView, { DocumentDetailReactViewProps } from "./DocumentDetailReactView";

const meta: Meta<typeof DocumentDetailReactView> = {
    title: "View/DocumentDetailReactView",
    component: DocumentDetailReactView,
    parameters: {
        layout: 'fullscreen',
        docs: {
            Description: <Description />
        }
    }
};

export default meta;
type Story = StoryObj<typeof DocumentDetailReactView>;

const render = (args: DocumentDetailReactViewProps) => <DocumentDetailReactView {...args} />;

const uploadDocumentSurveyProps: DocumentDetailReactViewProps = {
    colorScheme: 'auto',
    surveyResultId: '',
    fileResultIdentifier: 'document',
    typeResultIdentifier: 'document_type',
    nameResultIdentifier: 'document_name',
    dateResultIdentifier: 'document_date',
    notesResultIdentifier: 'document_notes'
}

export const Pdf: Story = {
    args: { ...uploadDocumentSurveyProps, preview: 'PreviewPdf', colorScheme: 'light' },
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

export const LivePdf: Story = {
    args: { ...uploadDocumentSurveyProps, surveyResultId: 'ad038eea-79f4-ef11-bafe-0affe8024cad' },
    render: render
};

