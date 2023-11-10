import React from "react";
import ReportContent, { ReportContentProps } from "./ReportContent";
import Layout from "../Layout";
import { previewReportHtml, previewReportPdf, xssHtml } from "./ReportContent.previewData";

export default { title: "Presentational/ReportContent", component: ReportContent, parameters: { layout: 'fullscreen' } };
let render = (args: ReportContentProps) => <Layout colorScheme="auto">
    <ReportContent {...args} />
</Layout>

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
        "type": "ResearchKitConsentDocument",
        "content": previewReportPdf,
        "contentType": "application/pdf"
    },
    render: render
}