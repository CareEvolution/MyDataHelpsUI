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

const render = (args: DocumentDetailViewProps) => <div style={{margin: "15px"}}><DocumentDetailView {...args} /></div>;

export const Live: Story = {
    args: {
        fileKey: '17c31658-8386-48d1-9a7d-59629aff9a8c/a7872e02-30f4-4f49-bd44-b7d63cb92c27/surveyresult_b60c0337-cfe4-ef11-bafe-0affe8024cad/2025-02-10T21:15:15.910Z_Your paragraph text.png',
    },
    render: render
};