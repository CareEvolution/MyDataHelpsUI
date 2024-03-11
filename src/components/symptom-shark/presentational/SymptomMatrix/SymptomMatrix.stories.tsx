import React from "react";
import { DateRangeCoordinator, Layout, Section } from "../../../presentational";
import BulletChart, { SymptomSharkBulletChartProps } from "./SymptomMatrix";
import { SymptomSharkVisualizationCoordinator } from "../../container";

export default { title: "SymptomShark/Presentational/BulletChart", component: BulletChart, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSharkBulletChartProps) => <Layout colorScheme="auto">
    <DateRangeCoordinator intervalType={"Month"} variant="rounded">
        <SymptomSharkVisualizationCoordinator previewState="default" showFilters>
            <Section><BulletChart {...args} /></Section>
        </SymptomSharkVisualizationCoordinator>
    </DateRangeCoordinator>
</Layout>

export const Default = {
    render: render
};