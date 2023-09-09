import React from "react";
import { SymptomSharkConfiguration } from "../../helpers/symptom-shark-data";
import { Layout } from "../../../presentational";
import { previewConfiguration } from "../../container/LogToday/LogToday.previewData";
import SymptomTreatmentHistograms, { SymptomTreatmentHistogramsProps } from "./SymptomTreatmentHistograms";
import { demoLogEntries, demoSymptoms, demoTreatments } from "../../helpers/demo-data";

export default { title: "SymptomShark/Presentational/SymptomTreatmentHistograms", component: SymptomTreatmentHistograms, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomTreatmentHistogramsProps) => <Layout><SymptomTreatmentHistograms {...args} /></Layout>

let defaultProps: SymptomTreatmentHistogramsProps = {
    symptoms: demoSymptoms,
    treatments: demoTreatments,
    currentMonth: 10,
    currentYear: 2022,
    logEntries: demoLogEntries,
    onSymptomSelected: (symptomId: string) => { }
};

export const Default = {
    args: defaultProps,
    render: render
};