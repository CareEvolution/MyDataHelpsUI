import React from "react";
import { SymptomSharkConfiguration } from "../../helpers/symptom-shark-data";
import { Layout, Section } from "../../../presentational";
import { previewConfiguration } from "../../container/LogToday/LogToday.previewData";
import OverallExperienceChart, { OverallExperienceChartProps } from "./OverallExperienceChart";
import { demoLogEntries } from "../../helpers/demo-data";

export default { title: "SymptomShark/Presentational/OverallExperienceChart", component: OverallExperienceChart, parameters: { layout: 'fullscreen' } };
let render = (args: OverallExperienceChartProps) => <Layout><Section><OverallExperienceChart {...args} /></Section></Layout>

let configuration: SymptomSharkConfiguration = previewConfiguration;

let defaultProps: OverallExperienceChartProps = {
    currentMonth: 10,
    currentYear: 2022,
    logEntries: demoLogEntries
};

export const Default = {
    args: defaultProps,
    render: render
};