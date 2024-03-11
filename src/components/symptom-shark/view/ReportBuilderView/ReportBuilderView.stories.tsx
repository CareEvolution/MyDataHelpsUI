import React from "react";
import SymptomSharkReportBuilderView, { SymptomSharkReportBuilderViewProps } from "./ReportBuilderView";

export default { title: "SymptomShark/View/ReportBuilderView", component: SymptomSharkReportBuilderView, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSharkReportBuilderViewProps) => <SymptomSharkReportBuilderView {...args} />

export const Default = {
    args: {
        previewState: "default"
    },
    render: render
};

export const Live = {
    render: render
};