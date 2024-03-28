
import React from "react";
import SymptomSharkReportBuilder, { SymptomSharkReportBuilderProps } from "./ReportBuilder";
import { Layout } from "../../../presentational";

export default { title: "SymptomShark/Container/ReportBuilder", component: SymptomSharkReportBuilder, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSharkReportBuilderProps) => <Layout colorScheme="auto"><SymptomSharkReportBuilder {...args} /></Layout>

export const Default = {
    args: {
        previewState: "default"
    },
    render: render
};