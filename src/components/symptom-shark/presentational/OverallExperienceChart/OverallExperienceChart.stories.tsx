import React from "react";
import { DateRangeCoordinator, Layout, Section } from "../../../presentational";
import OverallExperienceChart, { OverallExperienceChartProps } from "./OverallExperienceChart";
import { SymptomSharkVisualizationCoordinator } from "../../container";

export default { title: "SymptomShark/Presentational/OverallExperienceChart", component: OverallExperienceChart, parameters: { layout: 'fullscreen' } };
let render = (args: OverallExperienceChartProps) => <Layout colorScheme="auto">
    <DateRangeCoordinator intervalType={"Month"} variant="rounded">
        <SymptomSharkVisualizationCoordinator previewState="default" showFilters>
            <Section><OverallExperienceChart {...args} /></Section>
        </SymptomSharkVisualizationCoordinator>
    </DateRangeCoordinator>
</Layout>

export const Default = {
    render: render
};