import React from 'react'
import { Layout, StatusBarBackground, LabResultsSummary, ExternalAccountsPreview, ConnectEhr, Card, Section } from "../.."
import MyDataHelps from '@careevolution/mydatahelps-js';
import { TermInformation } from '../../presentational/LabResultWithSparkline/LabResultWithSparkline';
import HealthPreviewSection, { HealthPreviewSectionConcept } from '../../container/HealthPreviewSection/HealthPreviewSection';
import ExternalAccountsLoadingIndicator from '../../container/ExternalAccountsLoadingIndicator';

export interface HealthAndWellnessViewProps {
    previewState?: "default"
    colorScheme?: "auto" | "light" | "dark"
    connectEhrApplicationUrl: string
    externalAccountsApplicationUrl: string
    variant?: "default" | "cardBased"
}

export default function (props: HealthAndWellnessViewProps) {
    function viewLabs() {
        MyDataHelps.openApplication("https://hw.careevolutionapps.com/LabReports.html?lang=" + MyDataHelps.getCurrentLanguage());
    }

    function viewTermInfo(termInfo: TermInformation) {
        var queryString = new URLSearchParams({ termFamily: termInfo.TermFamily, termNamespace: termInfo.TermNamespace, termCode: termInfo.TermCode, lang: MyDataHelps.getCurrentLanguage() }).toString();
        MyDataHelps.openApplication("https://hw.careevolutionapps.com/TermInformation.html?" + queryString, { modal: true });
    }

    function viewHealthSectionDetails(concept: HealthPreviewSectionConcept) {
        MyDataHelps.openApplication("https://hw.careevolutionapps.com/" + concept + ".html");
    }

    let variant = props.variant ?? "default";
    function getHealthPreviewSection(concept: HealthPreviewSectionConcept) {
        var buildSection = function () {
            return <HealthPreviewSection concept={concept as any}
                onClick={() => viewHealthSectionDetails(concept)}
                previewState={props.previewState == "default" ? "Default" : undefined}
                indicatorPosition={variant == "cardBased" ? "topRight" : "default"} />
        }

        if (props.variant == "cardBased") {
            return <Card>{buildSection()}</Card>
        } else {
            return buildSection();
        }
    }

    return (
        <Layout colorScheme={props.colorScheme ?? "auto"}>
            <StatusBarBackground color='var(--mdh-background-color-0)' />
            <ExternalAccountsLoadingIndicator externalAccountCategories={["Provider", "Health Plan"]} />
            {variant == "default" &&
                <Section noTopMargin>
                    <LabResultsSummary onViewTermInfo={(t) => viewTermInfo(t)} onClick={() => viewLabs()} previewState={props.previewState == "default" ? "ImportantLabs" : undefined} />
                    {getHealthPreviewSection("Medications")}
                    {getHealthPreviewSection("Immunizations")}
                    {getHealthPreviewSection("Reports")}
                    {getHealthPreviewSection("Allergies")}
                    {getHealthPreviewSection("Conditions")}
                    {getHealthPreviewSection("Procedures")}
                </Section>
            }
            {variant == "cardBased" &&
                <>
                    <Card>
                        <LabResultsSummary onViewTermInfo={(t) => viewTermInfo(t)} onClick={() => viewLabs()} previewState={props.previewState == "default" ? "ImportantLabs" : undefined} />
                    </Card>
                    {getHealthPreviewSection("Medications")}
                    {getHealthPreviewSection("Immunizations")}
                    {getHealthPreviewSection("Reports")}
                    {getHealthPreviewSection("Allergies")}
                    {getHealthPreviewSection("Conditions")}
                    {getHealthPreviewSection("Procedures")}
                    <Card>
                        <ExternalAccountsPreview applicationUrl={props.externalAccountsApplicationUrl} previewState={props.previewState == "default" ? "Default" : undefined} />
                    </Card>
                </>
            }
            <Card>
                <ConnectEhr bottomBorder applicationUrl={props.connectEhrApplicationUrl} previewState={props.previewState == "default" ? "enabledConnected" : undefined} />
            </Card>
        </Layout>
    )
}