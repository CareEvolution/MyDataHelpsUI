import React from "react";
import ReportContent from "./ReportContent";
import Layout from "../Layout";
import { previewReportHtml, previewReportPdf, xssHtml } from "./ReportContent.previewData";
import { v4 as uuid } from "uuid";
import { Meta, StoryObj } from "@storybook/react";
import { argTypesToHide } from "../../../../.storybook/helpers";

type ReportContentStoryArgs = React.ComponentProps<typeof ReportContent> & {
    colorScheme: "auto" | "light" | "dark";
};

const meta: Meta<ReportContentStoryArgs> = {
    title: "Presentational/ReportContent",
    component: ReportContent,
    parameters: {
        layout: "fullscreen"
    },
    render: (args: ReportContentStoryArgs) => <Layout colorScheme={args.colorScheme}>
        <ReportContent {...args} style={{ height: '600px', background: "var(--mdhui-background-color-2)" }} />
    </Layout>,
    args: {
        colorScheme: "auto",
        preview: true,
        reportId: uuid()
    },
    argTypes: {
        colorScheme: {
            name: "color scheme",
            control: "radio",
            options: ["auto", "light", "dark"]
        },
        ...argTypesToHide(["preview", "reportId", "content", "contentType", "type", "style"])
    }
};
export default meta;

export const Html: StoryObj<ReportContentStoryArgs> = {
    args: {
        content: previewReportHtml,
        contentType: "text/html",
        type: "Subsequent evaluation note"
    }
};

export const Xss: StoryObj<ReportContentStoryArgs> = {
    args: {
        content: xssHtml,
        contentType: "text/html",
        type: "Subsequent evaluation note"
    }
};

export const Pdf: StoryObj<ReportContentStoryArgs> = {
    args: {
        content: previewReportPdf,
        contentType: "application/pdf",
        type: "Symptom Report"
    }
};