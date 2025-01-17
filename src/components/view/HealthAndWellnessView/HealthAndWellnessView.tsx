import React from 'react'
import { Layout, StatusBarBackground, LabResultsSummary, LabResultsBloodType, ExternalAccountsPreview, ConnectEhr, Card, Section, Action, Button } from "../.."
import MyDataHelps from '@careevolution/mydatahelps-js';
import { TermInformationReference } from "../../container/TermInformation/TermInformation";
import HealthPreviewSection, { HealthPreviewSectionConcept } from '../../container/HealthPreviewSection/HealthPreviewSection';
import ExternalAccountsLoadingIndicator from '../../container/ExternalAccountsLoadingIndicator';
import HealthConnectLogo from '../../../assets/healthconnect-logo.svg';

export interface HealthAndWellnessViewProps {
    previewState?: "default"
    colorScheme?: "auto" | "light" | "dark"
    connectEhrApplicationUrl: string
    externalAccountsApplicationUrl: string
    variant?: "default" | "cardBased"
}

/**
 * This view allows the participant to connect to their EHR provider. 
 * After establishing the connection, participants can access a comprehensive range of health information, including labs, blood type, medications, immunizations, reports, allergies, conditions, and procedures.
 */
export default function HealthAndWellnessView(props: HealthAndWellnessViewProps) {
    function viewLabs() {
        MyDataHelps.openApplication("https://hw.careevolutionapps.com/LabReports.html?lang=" + MyDataHelps.getCurrentLanguage());
    }

    function viewTermInfo(termInfo: TermInformationReference) {
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
            <StatusBarBackground />
            <ExternalAccountsLoadingIndicator previewState={props.previewState == "default" ? "externalAccountsLoaded" : undefined} externalAccountCategories={["Provider", "Health Plan"]} />
            {variant == "default" &&
                <Section noTopMargin>
                    <Action
                        bottomBorder
                        title="Sync with Health Connect"
                        subtitle='Choose data to write to and read from Health Connect'
                        titleIcon={<img style={{ width: "15px", marginRight: "8px" }} src={HealthConnectLogo} />}
                        indicator={<Button onClick={() => { }}>Connect</Button>}
                    />
                    <LabResultsSummary onViewTermInfo={(t) => viewTermInfo(t)} onClick={() => viewLabs()} previewState={props.previewState == "default" ? "ImportantLabs" : undefined} />
                    <LabResultsBloodType previewState={props.previewState == "default" ? "BloodTypeLabs" : undefined} />
                    {getHealthPreviewSection("Medications")}
                    {getHealthPreviewSection("Immunizations")}
                    {getHealthPreviewSection("Reports")}
                    {getHealthPreviewSection("Allergies")}
                    {getHealthPreviewSection("Conditions")}
                    {getHealthPreviewSection("Procedures")}
                    <Action
                        bottomBorder
                        title="Sync with Health Connect"
                        subtitle='Last synced 5 minutes ago'
                        titleIcon={<img style={{ width: "15px", marginRight: "8px" }} src={HealthConnectLogo} />}
                        indicator={<Button variant="subtle" onClick={() => { }}>Settings</Button>}
                    />
                    <ExternalAccountsPreview
                        excludeDeviceManufacturers
                        applicationUrl={props.externalAccountsApplicationUrl}
                        previewState={props.previewState == "default" ? "Default" : undefined} />
                </Section>
            }
            {variant == "cardBased" &&
                <>
                    <Card>
                        <LabResultsSummary onViewTermInfo={(t) => viewTermInfo(t)} onClick={() => viewLabs()} previewState={props.previewState == "default" ? "ImportantLabs" : undefined} />
                    </Card>
                    <Card>
                        <LabResultsBloodType previewState={props.previewState == "default" ? "BloodTypeLabs" : undefined} />
                    </Card>
                    {getHealthPreviewSection("Medications")}
                    {getHealthPreviewSection("Immunizations")}
                    {getHealthPreviewSection("Reports")}
                    {getHealthPreviewSection("Allergies")}
                    {getHealthPreviewSection("Conditions")}
                    {getHealthPreviewSection("Procedures")}
                    <Card>
                        <ExternalAccountsPreview
                            excludeDeviceManufacturers
                            applicationUrl={props.externalAccountsApplicationUrl}
                            previewState={props.previewState == "default" ? "Default" : undefined} />
                    </Card>
                </>
            }
            <Card>
                <ConnectEhr bottomBorder applicationUrl={props.connectEhrApplicationUrl} previewState={props.previewState == "default" ? "enabledConnected" : undefined} />
            </Card>
        </Layout>
    )
}