import React from "react";
import ReportContent, { ReportContentProps } from "./ReportContent";
import Layout from "../Layout";
import { previewReportHtml, previewReportPdf, xssHtml } from "./ReportContent.previewData";

export default { title: "Presentational/ReportContent", component: ReportContent, parameters: { layout: 'fullscreen' } };
const render = (args: ReportContentProps) => <Layout colorScheme="auto">
    <ReportContent preview {...args} />
</Layout>;

export const Html = {
    args: {
        type: "Subsequent evaluation note",
        content: previewReportHtml,
        contentType: "text/html"
    },
    render: render
};

export const Xss = {
    args: {
        type: "Subsequent evaluation note",
        content: xssHtml,
        contentType: "text/html"
    },
    render: render
};

export const Pdf = {
    args: {
        "type": "Symptom Report",
        "content": previewReportPdf,
        "contentType": "application/pdf"
    },
    render: render
};