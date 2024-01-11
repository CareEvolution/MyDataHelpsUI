import React from "react";
import KidneyHealthDataView, { KidneyHealthDataViewProps } from "./KidneyHealthDataView";
import { SurveyBloodPressureDataParameters } from "../../../../helpers/blood-pressure-data-providers";

export default { title: "SampleStudies/View/KidneyHealthDataView", component: KidneyHealthDataView, parameters: { layout: 'fullscreen' } };
let render = (args: KidneyHealthDataViewProps) => <KidneyHealthDataView {...args} />

const bpSurveyParams: SurveyBloodPressureDataParameters = {
	surveyName: "Blood Pressure Readings",
	dateResultIdentifier: "Date of BP",
	systolicResultIdentifier: "Systolic BP",
	diastolicResultIdentifier: "Diastolic BP"
}

export const Default = {
    args: {
        bloodPressureSurveyName: bpSurveyParams.surveyName,
        bloodPressureDateResultIdentifier: bpSurveyParams.dateResultIdentifier,
        bloodPressureSystolicResultIdentifier: bpSurveyParams.systolicResultIdentifier,
        bloodPressureDiastolicResultIdentifier: bpSurveyParams.diastolicResultIdentifier,
        swellingSurveyName: 'Survey 1',
        swellingDateRecordedResultIdentifier: 'severityDate',
        swellingSeverityResultIdentifier: 'severityValue',
        previewState : 'Default'
    },
    render: render
};

export const Live = {
    args: {
        bloodPressureSurveyName: 'Blood Pressure Readings - OPTIONAL',
        bloodPressureDateResultIdentifier: bpSurveyParams.dateResultIdentifier,
        bloodPressureSystolicResultIdentifier: bpSurveyParams.systolicResultIdentifier,
        bloodPressureDiastolicResultIdentifier: bpSurveyParams.diastolicResultIdentifier,
        bloodPressureInfoSurveyName : "Blood Pressure Info Survey Name",
        swellingSurveyName: 'Swelling and Urine Protein Measurements - OPTIONAL',
        swellingSeverityResultIdentifier: 'Swelling Severity',
        swellingDateRecordedResultIdentifier: 'Recent Swelling Date',
        swellingInfoSurveyName : "Swelling Info Survey Name"
    },
    render: render
};