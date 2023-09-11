import React from "react";
import { DateRangeCoordinator, Layout } from "../../../presentational";
import SymptomTreatmentHistograms, { SymptomTreatmentHistogramsProps } from "./SymptomTreatmentHistograms";
import { SymptomSharkVisualizationCoordinator } from "../../container";

export default { title: "SymptomShark/Presentational/SymptomTreatmentHistograms", component: SymptomTreatmentHistograms, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomTreatmentHistogramsProps) => <Layout>
    <DateRangeCoordinator intervalType={"Month"} variant="rounded">
        <SymptomSharkVisualizationCoordinator previewState="default" showFilters>
            <SymptomTreatmentHistograms {...args} />
        </SymptomSharkVisualizationCoordinator>
    </DateRangeCoordinator>
</Layout>

let defaultProps: SymptomTreatmentHistogramsProps = {
    onSymptomSelected: (symptomId: string) => { }
};

export const Default = {
    args: defaultProps,
    render: render
};