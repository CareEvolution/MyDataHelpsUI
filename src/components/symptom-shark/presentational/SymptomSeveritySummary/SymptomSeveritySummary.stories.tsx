import React from "react";
import { DateRangeCoordinator, Layout } from "../../../presentational";
import SymptomSeveritySummary, { SymptomSeveritySummaryProps } from "./SymptomSeveritySummary";
import { SymptomSharkVisualizationCoordinator } from "../../container";
import { demoSymptoms } from "../../helpers/demo-data";

export default { title: "SymptomShark/Presentational/SymptomSeveritySummary", component: SymptomSeveritySummary, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSeveritySummaryProps) => <Layout colorScheme="auto">
    <DateRangeCoordinator intervalType={"Month"} variant="rounded">
        <SymptomSharkVisualizationCoordinator previewState="default">
            <SymptomSeveritySummary {...args} />
        </SymptomSharkVisualizationCoordinator>
    </DateRangeCoordinator>
</Layout>

let defaultProps: SymptomSeveritySummaryProps = {
    symptom: demoSymptoms.find(s => s.name == "Fatigue")!
};

export const Default = {
    args: defaultProps,
    render: render
};