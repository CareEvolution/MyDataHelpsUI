import React from "react";
import { DateRangeCoordinator, Layout, Section } from "../../../presentational";
import SymptomSeverityChart, { SymptomSeverityChartProps } from "./SymptomSeverityChart";
import { demoSymptoms } from "../../helpers/demo-data";
import { SymptomSharkVisualizationCoordinator } from "../../container";

export default { title: "SymptomShark/Presentational/SymptomSeverityChart", component: SymptomSeverityChart, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSeverityChartProps) => <Layout colorScheme="auto">
    <DateRangeCoordinator intervalType={"Month"} variant="rounded">
        <SymptomSharkVisualizationCoordinator previewState="default">
            <Section><SymptomSeverityChart {...args} /></Section>
        </SymptomSharkVisualizationCoordinator>
    </DateRangeCoordinator>
</Layout>

export const TenPointScale = {
    args: {
        symptom: demoSymptoms.find(s=>s.name == "Headache")
    },
    render: render
};

export const ThreePointScale = {
    args: {
        symptom: demoSymptoms.find(s=>s.name == "Fatigue")
    },
    render: render
};
