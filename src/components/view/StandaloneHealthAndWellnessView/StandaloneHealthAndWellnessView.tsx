import React from 'react'
import { EhrNewsFeedEventDetailView, MedicationsView, ConditionsView, AllergiesView, ExternalAccountsView, StatusBarBackground, ExternalAccountsLoadingIndicator, Layout, Section, LabResultsBloodType, LabResultsSummary, ExternalAccountsPreview, ConnectEhr, Card, ProviderSearch, NavigationBar, ExternalAccountConnectionAlert } from "../.."
import { TermInformationReference } from "../../container/TermInformation/TermInformation";
import HealthPreviewSection, { HealthPreviewSectionConcept } from '../../container/HealthPreviewSection/HealthPreviewSection';
import EhrNewsFeedView from '../EhrNewsFeedView/EhrNewsFeedView';
import { EhrNewsFeedEventReference } from '../../container/EhrNewsFeed/EhrNewsFeed';
import ReportView from '../ReportView/ReportView';
import { EhrNewsFeedEventType, EhrNewsFeedType } from '../../../helpers/news-feed/types';
import TermInformationView from '../TermInformationView/TermInformationView';
import MyDataHelps, { ConnectExternalAccountOptions } from '@careevolution/mydatahelps-js';

export interface StandaloneHealthAndWellnessViewProps {
    previewState?: "default"
    colorScheme?: "auto" | "light" | "dark"
    connectExternalAccountOptions?: ConnectExternalAccountOptions
}

type InlineViewKey =
    "Dashboard" |
    "NewsFeed" |
    "Medications" |
    "Allergies" |
    "Conditions" |
    "ExternalAccounts" |
    "AddExternalAccount" |
    "TermInformation" |
    "ReportDetail" |
    "NewsFeedEventDetail" |
    "ConnectEhr";

interface InlineView {
    key: InlineViewKey
    properties?: { [key: string]: any }
}

export default function (props: StandaloneHealthAndWellnessViewProps) {
    let [viewStack, setViewStack] = React.useState<InlineView[]>([{ key: "Dashboard" }]);

    function pushView(view: InlineView) {
        setViewStack([...viewStack, view]);
    }

    function viewLabs() {
        pushView({ key: "NewsFeed", properties: { feed: "LabReports" } });
    }

    function viewTermInfo(termInfo: TermInformationReference) {
        let term: TermInformationReference = { TermFamily: termInfo.TermFamily, TermNamespace: termInfo.TermNamespace, TermCode: termInfo.TermCode };
        pushView({ key: "TermInformation", properties: { "term": term } });
    }

    function viewLabTermInfo(labObservationId: string) {
        pushView({ key: "TermInformation", properties: { "labObservationID": labObservationId } });
    }

    function viewHealthSectionDetails(concept: HealthPreviewSectionConcept) {
        if (concept == "Reports" || concept == "Immunizations" || concept == "Procedures") {
            pushView({ key: "NewsFeed", properties: { feed: concept as any } });
        } else {
            pushView({ key: concept });
        }
    }

    function viewExternalAccounts() {
        pushView({ key: "ExternalAccounts" });
    }

    function back() {
        setViewStack(viewStack.slice(0, viewStack.length - 1));
        if (viewStack.length == 2) {
            //refresh the main dashboard when going back to it
            MyDataHelps.triggerEvent({ type: "applicationDidBecomeVisible" });
        }
    }
    MyDataHelps.back = back;
    MyDataHelps.dismiss = back;

    function selectReport(reportID: string) {
        pushView({ key: "ReportDetail", properties: { reportID: reportID } });
    }

    function viewBloodTypeInformation() {
        let spanish = MyDataHelps.getCurrentLanguage().toLowerCase().startsWith("es");
        let linkTarget = "https://medlineplus.gov/ency/article/003345.htm";
        if (spanish) linkTarget = "https://medlineplus.gov/spanish/ency/article/003345.htm";
        window.open(linkTarget, "_blank");
    }

    function getHealthPreviewSection(concept: HealthPreviewSectionConcept) {
        return <HealthPreviewSection concept={concept as any}
            onClick={() => viewHealthSectionDetails(concept)}
            previewState={props.previewState == "default" ? "Default" : undefined} />
    }

    function getView(view: InlineView) {
        if (view.key == "Dashboard") {
            return <Layout colorScheme={props.colorScheme ?? "auto"}>
                <ExternalAccountsLoadingIndicator
                    previewState={props.previewState == "default" ? "externalAccountsLoaded" : undefined}
                    externalAccountCategories={["Provider", "Health Plan"]}
                    triggerWebExternalAccountSyncComplete />
                <Section noTopMargin>
                    <ExternalAccountConnectionAlert previewState={props.previewState == "default" ? "externalAccountWithIssue" : undefined} externalAccountCategories={["Provider", "Health Plan"]} onClick={() => viewExternalAccounts()} />
                    <ExternalAccountsPreview
                        excludeDeviceManufacturers
                        onClick={() => viewExternalAccounts()}
                        previewState={props.previewState == "default" ? "Default" : undefined} />
                    <LabResultsSummary onViewTermInfo={(t) => viewTermInfo(t)} onClick={() => viewLabs()} previewState={props.previewState == "default" ? "ImportantLabs" : undefined} />
                    <LabResultsBloodType previewState={props.previewState == "default" ? "BloodTypeLabs" : undefined} onClick={() => viewBloodTypeInformation()} />
                    {getHealthPreviewSection("Medications")}
                    {getHealthPreviewSection("Immunizations")}
                    {getHealthPreviewSection("Reports")}
                    {getHealthPreviewSection("Allergies")}
                    {getHealthPreviewSection("Conditions")}
                    {getHealthPreviewSection("Procedures")}
                </Section>
                <Card>
                    <ConnectEhr previewState={props.previewState == "default" ? "enabled" : undefined} variant="small" hideWhenConnected onClick={() => pushView({ key: "ConnectEhr" })}></ConnectEhr>
                </Card>
            </Layout>
        }

        if (view.key == "NewsFeed") {
            return <EhrNewsFeedView feed={view.properties?.feed as any}
                previewState={props.previewState}
                presentation="Push" colorScheme={props.colorScheme}
                onEventSelected={(e) => { setViewStack([...viewStack, { key: "NewsFeedEventDetail", properties: { eventReference: e } }]) }}
                onReportSelected={(r) => selectReport(r)} />
        }

        if (view.key == "NewsFeedEventDetail") {
            let eventReference = view.properties?.eventReference as EhrNewsFeedEventReference;
            let feed = eventReference.feed as EhrNewsFeedType;

            let detailPreviewState: EhrNewsFeedEventType | undefined = undefined;
            if (props.previewState) {
                if (feed == "Procedures") {
                    detailPreviewState = "ProcedureGroup";
                }
                if (feed == "LabReports") {
                    detailPreviewState = "LabReport";
                }
            }

            return <EhrNewsFeedEventDetailView feed={eventReference.feed}
                presentation="Push"
                pageDate={eventReference.pageDate}
                pageId={eventReference.pageId}
                onViewLabObservationTermInfo={(l) => viewLabTermInfo(l)}
                previewState={detailPreviewState} />
        }

        if (view.key == "TermInformation") {
            return <TermInformationView
                presentation="Modal"
                openLinksInNewWindow
                previewState={props.previewState}
                term={view.properties?.term}
                labObservationID={view.properties?.labObservationID} />
        }

        if (view.key == "Medications") {
            return <MedicationsView
                presentation="Push"
                previewState={props.previewState}
                onViewTermInfo={(e) => viewTermInfo(e)} />
        }

        if (view.key == "Conditions") {
            return <ConditionsView
                presentation="Push"
                previewState={props.previewState}
                onViewTermInfo={(e) => viewTermInfo(e)} />
        }

        if (view.key == "Allergies") {
            return <AllergiesView presentation="Push"
                previewState={props.previewState}
                onViewTermInfo={(e) => viewTermInfo(e)} />
        }

        if (view.key == "ReportDetail") {
            return <ReportView previewState={"html"} reportId={view.properties?.reportId} />
        }

        if (view.key == "ExternalAccounts") {
            return <ExternalAccountsView
                presentation="Push"
                onBack={() => back()}
                excludeDeviceManufacturers
                colorScheme={props.colorScheme}
                previewState={props.previewState}
                connectExternalAccountOptions={props.connectExternalAccountOptions} />
        }

        if (view.key == "ConnectEhr") {
            return <Layout colorScheme={props.colorScheme} >
                <NavigationBar showBackButton={true} />
                <Section>
                    <ProviderSearch
                        providerCategories={["Provider", "Health Plan"]}
                        connectExternalAccountOptions={props.connectExternalAccountOptions} />
                </Section>
            </Layout>
        }
    }

    return <>
        {viewStack.map((view, index) =>
            <div key={view.key} style={{ display: index != viewStack.length - 1 ? "none" : undefined }}>{getView(view)}</div>
        )}
    </>
}