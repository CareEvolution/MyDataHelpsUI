import React from "react";
import { Card, Layout } from "../../../presentational";
import LabReportDetail, { LabReportDetailProps } from "./LabReportDetail";
import { labReportEvent } from "../../helpers/previewData";

export default { title: "EhrNewsFeed/Presentational/LabReportDetail", component: LabReportDetail, parameters: { layout: 'fullscreen' } };
let render = (args: LabReportDetailProps) => <Layout colorScheme="auto">
    <LabReportDetail {...args} />
</Layout>

export const Default = {
    args: {
        labReport: labReportEvent.Event
    },
    render: render
};
