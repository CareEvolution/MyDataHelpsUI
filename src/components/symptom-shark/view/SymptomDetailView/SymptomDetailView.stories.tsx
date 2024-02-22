import React from "react";
import SymptomSharkSymptomDetailView, { SymptomDetailViewProps } from "./SymptomDetailView";
import { demoSymptoms } from "../../helpers/demo-data";

export default { title: "SymptomShark/View/SymptomDetailView", component: SymptomSharkSymptomDetailView, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomDetailViewProps) => <SymptomSharkSymptomDetailView {...args} previewState="default" />

export const Default = {
    args: {
        symptomId: demoSymptoms.find(s => s.name == "Fatigue")?.id
    },
    render: render
};