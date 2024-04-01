import React from 'react'
import { Layout, StatusBarBackground, LabResultsSummary, LabResultsBloodType, ExternalAccountsPreview, ConnectEhr, Card, Section } from "../.."
import MyDataHelps from '@careevolution/mydatahelps-js';
import { TermInformationReference } from '../../presentational/LabResultWithSparkline/LabResultWithSparkline';
import HealthPreviewSection, { HealthPreviewSectionConcept } from '../../container/HealthPreviewSection/HealthPreviewSection';
import ExternalAccountsLoadingIndicator from '../../container/ExternalAccountsLoadingIndicator';

export interface HealthAndWellnessViewProps {
    previewState?: "default"
    colorScheme?: "auto" | "light" | "dark"
    connectEhrApplicationUrl?: string
    externalAccountsApplicationUrl?: string
    variant?: "default" | "cardBased"
    onViewTermInfo?(termInfo: TermInformationReference): void
    onViewLabs?(): void
    onViewHealthSectionDetails?(concept: HealthPreviewSectionConcept): void
    onViewExternalAccounts?(): void
    onBloodTypeClick?(): void
}

export default function (props: HealthAndWellnessViewProps) {
    function viewLabs() {
        if (props.onViewLabs) {
            props.onViewLabs();
            return;
        }

        MyDataHelps.openApplication("https://hw.careevolutionapps.com/LabReports.html?lang=" + MyDataHelps.getCurrentLanguage());
    }

    function viewTermInfo(termInfo: TermInformationReference) {
        if (props.onViewTermInfo) {
            props.onViewTermInfo(termInfo);
            return;
        }

        var queryString = new URLSearchParams({ termFamily: termInfo.TermFamily, termNamespace: termInfo.TermNamespace, termCode: termInfo.TermCode, lang: MyDataHelps.getCurrentLanguage() }).toString();
        MyDataHelps.openApplication("https://hw.careevolutionapps.com/TermInformation.html?" + queryString, { modal: true });
    }

    function viewHealthSectionDetails(concept: HealthPreviewSectionConcept) {
        if (props.onViewHealthSectionDetails) {
            props.onViewHealthSectionDetails(concept);
            return;
        }

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
            <StatusBarBackground />
            <ExternalAccountsLoadingIndicator previewState={props.previewState == "default" ? "externalAccountsLoaded" : undefined} externalAccountCategories={["Provider", "Health Plan"]} />
            {variant == "default" &&
                <Section noTopMargin>
                    <LabResultsSummary onViewTermInfo={(t) => viewTermInfo(t)} onClick={() => viewLabs()} previewState={props.previewState == "default" ? "ImportantLabs" : undefined} />
                    <LabResultsBloodType previewState={props.previewState == "default" ? "BloodTypeLabs" : undefined} onClick={props.onBloodTypeClick} />
                    {getHealthPreviewSection("Medications")}
                    {getHealthPreviewSection("Immunizations")}
                    {getHealthPreviewSection("Reports")}
                    {getHealthPreviewSection("Allergies")}
                    {getHealthPreviewSection("Conditions")}
                    {getHealthPreviewSection("Procedures")}
                    <ExternalAccountsPreview
                        excludeDeviceManufacturers
                        applicationUrl={props.externalAccountsApplicationUrl}
                        previewState={props.previewState == "default" ? "Default" : undefined}
                        onClick={() => props.onViewExternalAccounts?.()} />
                </Section>
            }
            {variant == "cardBased" &&
                <>
                    <Card>
                        <LabResultsSummary onViewTermInfo={(t) => viewTermInfo(t)} onClick={() => viewLabs()} previewState={props.previewState == "default" ? "ImportantLabs" : undefined} />
                    </Card>
                    <Card>
                        <LabResultsBloodType previewState={props.previewState == "default" ? "BloodTypeLabs" : undefined} onClick={props.onBloodTypeClick} />
                    </Card>
                    {getHealthPreviewSection("Medications")}
                    {getHealthPreviewSection("Immunizations")}
                    {getHealthPreviewSection("Reports")}
                    {getHealthPreviewSection("Allergies")}
                    {getHealthPreviewSection("Conditions")}
                    {getHealthPreviewSection("Procedures")}
                    <Card>
                        <ExternalAccountsPreview
                            onClick={() => props.onViewExternalAccounts?.()}
                            excludeDeviceManufacturers
                            applicationUrl={props.externalAccountsApplicationUrl}
                            previewState={props.previewState == "default" ? "Default" : undefined} />
                    </Card>
                </>
            }
            {props.connectEhrApplicationUrl &&
                <Card>
                    <ConnectEhr bottomBorder applicationUrl={props.connectEhrApplicationUrl} previewState={props.previewState == "default" ? "enabledConnected" : undefined} />
                </Card>
            }
        </Layout>
    )
}