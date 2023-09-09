import React from "react";
import { SymptomSharkConfiguration } from "../../helpers/symptom-shark-data";
import { Layout, Section } from "../../../presentational";
import { previewConfiguration } from "../../container/LogToday/LogToday.previewData";
import SymptomSeverityChart, { SymptomSeverityChartProps } from "./SymptomSeverityChart";
import { demoLogEntries, demoSymptoms } from "../../helpers/demo-data";

export default { title: "SymptomShark/Presentational/SymptomSeverityChart", component: SymptomSeverityChart, parameters: { layout: 'fullscreen' } };
let render = (args: SymptomSeverityChartProps) => <Layout><Section><SymptomSeverityChart {...args} /></Section></Layout>

let configuration: SymptomSharkConfiguration = previewConfiguration;

export const TenPointScale = {
    args: {
        currentMonth: 10,
        currentYear: 2022,
        logEntries: demoLogEntries,
        symptom: demoSymptoms[0]
    },
    render: render
};


export const ThreePointScale = {
    args: {
        currentMonth: 10,
        currentYear: 2022,
        logEntries: demoLogEntries,
        symptom: demoSymptoms[1]
    },
    render: render
};