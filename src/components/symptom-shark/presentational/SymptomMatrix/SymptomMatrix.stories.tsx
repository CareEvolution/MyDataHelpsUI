import React from "react";
import { DateRangeCoordinator, Layout, Section } from "../../../presentational";
import SymptomMatrix, { SymptomSharkSymptomMatrixProps } from "./SymptomMatrix";
import { SymptomSharkVisualizationCoordinator } from "../../container";

export default { title: "SymptomShark/Presentational/SymptomMatrix", component: SymptomMatrix, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSharkSymptomMatrixProps) => <Layout colorScheme="auto">
    <DateRangeCoordinator intervalType={"Month"} variant="rounded">
        <SymptomSharkVisualizationCoordinator previewState="default" showFilters>
            <Section><SymptomMatrix {...args} /></Section>
        </SymptomSharkVisualizationCoordinator>
    </DateRangeCoordinator>
</Layout>

export const Default = {
    render: render
};