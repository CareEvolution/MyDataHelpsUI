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

const render = (args: DocumentLibraryViewProps) => <div style={{margin: "15px"}}><DocumentLibraryView {...args} /></div>;


const renderTest = (args: DocumentLibraryViewProps) => <div style={{margin: "15px"}}>
    <Action key={`suf_${1111}`} title={"Test Story Action"} onClick={() => console.log("Hello World")}></Action>
    </div>;

export const Default: Story = {
    args: {
        preview: 'default',
        uploadDocumentSurveyName: 'DocumentUpload',
        fileResultIdentifier: 'document',
        typeResultIdentifier: 'document_type',
        nameResultIdentifier: 'document_name',
        dateResultIdentifier: 'document_date',
        notesResultIdentifier: 'document_notes'
    },
    render: renderTest
};

export const Live: Story = {
    args: {
        uploadDocumentSurveyName: 'UploadDocument',
        fileResultIdentifier: 'document',
        typeResultIdentifier: 'document_type',
        nameResultIdentifier: 'document_name',
        dateResultIdentifier: 'document_date',
        notesResultIdentifier: 'document_notes'
    },
    render: render
};