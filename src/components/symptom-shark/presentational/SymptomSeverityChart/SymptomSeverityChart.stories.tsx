import React from "react";
import { DateRangeCoordinator, Layout, Section } from "../../../presentational";
import SymptomSeverityChart, { SymptomSeverityChartProps } from "./SymptomSeverityChart";
import { demoSymptoms } from "../../helpers/demo-data";
import { SymptomSharkLogVisualizationCoordinator } from "../../container";

export default { title: "SymptomShark/Presentational/SymptomSeverityChart", component: SymptomSeverityChart, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSeverityChartProps) => <Layout>
    <DateRangeCoordinator intervalType={"Month"} variant="rounded">
        <SymptomSharkLogVisualizationCoordinator previewState="default" showFilters>
            <Section><SymptomSeverityChart {...args} /></Section>
        </SymptomSharkLogVisualizationCoordinator>
    </DateRangeCoordinator>
</Layout>

export const TenPointScale = {
    args: {
        symptom: demoSymptoms[0]
    },
    render: render
};

export const ThreePointScale = {
    args: {
        symptom: demoSymptoms[1]
    },
    render: render
};
