import React from "react";
import { SymptomSharkConfiguration } from "../../helpers/symptom-shark-data";
import { DateRangeCoordinator, Layout, Section } from "../../../presentational";
import { previewConfiguration } from "../../container/LogToday/LogToday.previewData";
import OverallExperienceChart, { OverallExperienceChartProps } from "./OverallExperienceChart";
import { demoLogEntries } from "../../helpers/demo-data";
import { SymptomSharkLogVisualizationCoordinator } from "../../container";

export default { title: "SymptomShark/Presentational/OverallExperienceChart", component: OverallExperienceChart, parameters: { layout: 'fullscreen' } };
let render = (args: OverallExperienceChartProps) => <Layout>
    <DateRangeCoordinator intervalType={"Month"} variant="rounded">
        <SymptomSharkLogVisualizationCoordinator previewState="default" showFilters>
            <Section><OverallExperienceChart {...args} /></Section>
        </SymptomSharkLogVisualizationCoordinator>
    </DateRangeCoordinator>
</Layout>

export const Default = {
    render: render
};