import React from 'react'
import { Layout, StatusBarBackground, LabResultsSummary } from "../.."
import MyDataHelps from '@careevolution/mydatahelps-js';
import { TermInformation } from '../../presentational/LabResultWithSparkline/LabResultWithSparkline';
import HealthPreviewSection from '../../container/HealthPreviewSection/HealthPreviewSection';
import ExternalAccountStatus from '../../container/ExternalAccountStatus';

export interface HealthAndWellnessViewProps {
    previewState?: "default"
    colorScheme?: "auto" | "light" | "dark"
    externalAccountsApplicationUrl: string
}

export default function (props: HealthAndWellnessViewProps) {
    function viewLabs() {
        MyDataHelps.openApplication("https://hw.careevolutionapps.com/LabReports.html?lang=" + MyDataHelps.getCurrentLanguage());
    }

    function viewTermInfo(termInfo: TermInformation) {
        var queryString = new URLSearchParams({ termFamily: termInfo.TermFamily, termNamespace: termInfo.TermNamespace, termCode: termInfo.TermCode, lang: MyDataHelps.getCurrentLanguage() }).toString();
        MyDataHelps.openApplication("https://hw.careevolutionapps.com/TermInformation.html?" + queryString, { modal: true });
    }

    function viewHealthSectionDetails(concept: string) {
        MyDataHelps.openApplication("https://hw.careevolutionapps.com/" + concept + ".html");
    }

    return (
        <Layout bodyBackgroundColor='var(--mdhui-background-color-0)' colorScheme={props.colorScheme ?? "auto"}>
            <StatusBarBackground color='var(--mdh-background-color-0)' />
            <ExternalAccountStatus onClick={() => MyDataHelps.openApplication(props.externalAccountsApplicationUrl)} previewState={props.previewState == "default" ? "externalAccountsFetchingData" : undefined} />
            <LabResultsSummary onViewTermInfo={(t) => viewTermInfo(t)} onClick={() => viewLabs()} previewState={props.previewState == "default" ? "ImportantLabs" : undefined} />
            <HealthPreviewSection concept="Medications" onClick={() => viewHealthSectionDetails("Medications")} previewState={props.previewState == "default" ? "Default" : undefined} />
            <HealthPreviewSection concept="Immunizations" onClick={() => viewHealthSectionDetails("Immunizations")} previewState={props.previewState == "default" ? "Default" : undefined} />
            <HealthPreviewSection concept="Reports" onClick={() => viewHealthSectionDetails("Reports")} previewState={props.previewState == "default" ? "Default" : undefined} />
            <HealthPreviewSection concept="Allergies" onClick={() => viewHealthSectionDetails("Allergies")} previewState={props.previewState == "default" ? "Default" : undefined} />
            <HealthPreviewSection concept="Conditions" onClick={() => viewHealthSectionDetails("Conditions")} previewState={props.previewState == "default" ? "Default" : undefined} />
            <HealthPreviewSection concept="Procedures" onClick={() => viewHealthSectionDetails("Procedures")} previewState={props.previewState == "default" ? "Default" : undefined} />
        </Layout>
    )
}