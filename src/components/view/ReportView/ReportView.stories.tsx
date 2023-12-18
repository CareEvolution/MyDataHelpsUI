import React from "react";
import ReportView, { ReportViewProps } from "./ReportView";

export default { title: "View/ReportView", component: ReportView, parameters: { layout: 'fullscreen' } };
let render = (args: ReportViewProps) => <ReportView {...args} />
export const Html = {
    args: { previewState: "html" },
    render: render
};

export const Pdf = {
    args: { previewState: "pdf" },
    render: render
};