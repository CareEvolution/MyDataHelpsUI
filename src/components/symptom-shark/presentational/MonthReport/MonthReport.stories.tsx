import React from "react";
import { DateRangeCoordinator, Layout, Section } from "../../../presentational";
import MonthReport, { SymptomSharkMonthReportProps } from "./MonthReport";
import { SymptomSharkVisualizationCoordinator } from "../../container";

export default { title: "SymptomShark/Presentational/MonthReport", component: MonthReport, parameters: { layout: 'fullscreen' } };
let render = () => <Layout colorScheme="auto">
    <DateRangeCoordinator intervalType={"Month"} variant="rounded">
        <SymptomSharkVisualizationCoordinator previewState="default" showFilters>
            <Section><MonthReport includeDailyOverallFeeling includeNotes /></Section>
        </SymptomSharkVisualizationCoordinator>
    </DateRangeCoordinator>
</Layout>;

export const Default = {
    render: render
};