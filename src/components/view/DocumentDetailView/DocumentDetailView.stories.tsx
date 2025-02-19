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
    surveyResultId: '',
    uploadDocumentSurveyName: 'UploadDocument',
    fileResultIdentifier: 'document',
    typeResultIdentifier: 'document_type',
    nameResultIdentifier: 'document_name',
    dateResultIdentifier: 'document_date',
    notesResultIdentifier: 'document_notes'
}

export const Pdf: Story = {
    args: { ...uploadDocumentSurveyProps, preview: 'PreviewPdf' },
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

export const Unsupported: Story = {
    args: { ...uploadDocumentSurveyProps, preview: 'PreviewUnknown' },
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

export const LiveMultiPagePdf: Story = {
    args: { ...uploadDocumentSurveyProps, surveyResultId: '' },
    render: render
};

export const LiveSingleLandscapePdf: Story = {
    args: { ...uploadDocumentSurveyProps, surveyResultId: '2e3f7062-87e8-ef11-bafe-0affe8024cad' },
    render: render
};

export const LiveSinglePortraitPdf: Story = {
    args: { ...uploadDocumentSurveyProps, surveyResultId: '97477698-85e9-ef11-bafe-0affe8024cad' },
    render: render
};

export const LiveCsv: Story = {
    args: { ...uploadDocumentSurveyProps, surveyResultId: '540e6dc9-eeee-ef11-bafe-0affe8024cad' },
    render: render
};

export const LiveText: Story = {
    args: { ...uploadDocumentSurveyProps, surveyResultId: 'b1508427-a3e8-ef11-bafe-0affe8024cad' },
    render: render
};

export const LiveImage: Story = {
    args: { ...uploadDocumentSurveyProps, surveyResultId: 'a90c0337-cfe4-ef11-bafe-0affe8024cad' },
    render: render
};