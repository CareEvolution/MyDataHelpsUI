import React from 'react'
import { Layout, StatusBarBackground, LabResultsSummary, LabResultsBloodType, ExternalAccountsPreview, ConnectEhr, Card, Section, NavigationBar, HealthAndWellnessView, EhrNewsFeedEventDetailView, MedicationsView, ConditionsView, AllergiesView, ExternalAccountList, ExternalAccountsView } from "../.."
import MyDataHelps from '@careevolution/mydatahelps-js';
import { TermInformation } from '../../presentational/LabResultWithSparkline/LabResultWithSparkline';
import HealthPreviewSection, { HealthPreviewSectionConcept } from '../../container/HealthPreviewSection/HealthPreviewSection';
import ExternalAccountsLoadingIndicator from '../../container/ExternalAccountsLoadingIndicator';
import EhrNewsFeed from '../../container/EhrNewsFeed';
import EhrNewsFeedView from '../EhrNewsFeedView/EhrNewsFeedView';
import { EhrNewsFeedEventReference } from '../../container/EhrNewsFeed/EhrNewsFeed';
import { set } from 'lodash';
import ReportView from '../ReportView/ReportView';

export interface StandaloneHealthAndWellnessViewProps {
    previewState?: "default"
    colorScheme?: "auto" | "light" | "dark"
}

type InlineViewKey =
    "NewsFeed" |
    "Medications" |
    "Allergies" |
    "Conditions" |
    "ExternalAccounts" |
    "AddExternalAccount" |
    "TermInformation" |
    "ReportDetail" |
    "NewsFeedEventDetail";

interface InlineView {
    key: InlineViewKey
    properties?: { [key: string]: any }
}

export default function (props: StandaloneHealthAndWellnessViewProps) {
    let [viewStack, setViewStack] = React.useState<InlineView[]>([]);

    function viewLabs() {
        setViewStack([...viewStack, { key: "NewsFeed", properties: { feed: "LabReports" } }]);
    }

    function viewTermInfo(termInfo: TermInformation) {
        let term = { termFamily: termInfo.TermFamily, termNamespace: termInfo.TermNamespace, termCode: termInfo.TermCode, lang: MyDataHelps.getCurrentLanguage() };
        setViewStack([...viewStack, { key: "TermInformation", properties: { "term": term } }]);
    }


    function viewLabTermInfo(labObservationId: string) {
        setViewStack([...viewStack, { key: "TermInformation", properties: { "labObservationID": labObservationId } }]);
    }

    function viewHealthSectionDetails(concept: HealthPreviewSectionConcept) {
        if (concept == "Reports" || concept == "Immunizations" || concept == "Procedures") {
            setViewStack([...viewStack, { key: "NewsFeed", properties: { feed: concept as any } }]);
        } else {
            setViewStack([...viewStack, { key: concept }]);
        }
    }

    function viewExternalAccounts() {
        setViewStack([...viewStack, { key: "ExternalAccounts" }]);
    }

    function back() {
        setViewStack(viewStack.slice(0, viewStack.length - 1))
    }

    function selectReport(reportID: string) {
        setViewStack([...viewStack, { key: "ReportDetail", properties: { reportID: reportID } }]);
    }

    if (!viewStack.length) {
        return <HealthAndWellnessView
            previewState={props.previewState}
            colorScheme={props.colorScheme}
            onViewExternalAccounts={() => viewExternalAccounts()}
            onViewHealthSectionDetails={(concept) => viewHealthSectionDetails(concept)}
            onViewLabs={() => viewLabs()}
            onViewTermInfo={(termInfo) => viewTermInfo(termInfo)}
            variant="default" />
    }

    let currentView = viewStack[viewStack.length - 1];

    if (currentView.key == "NewsFeed") {
        return <EhrNewsFeedView feed={currentView.properties?.feed as any}
            previewState={props.previewState}
            presentation="Push" colorScheme={props.colorScheme}
            onEventSelected={(e) => { setViewStack([...viewStack, { key: "NewsFeedEventDetail", properties: { eventReference: e } }]) }}
            onReportSelected={(r) => selectReport(r)}
            onBack={() => back()} />
    }

    if (currentView.key == "NewsFeedEventDetail") {
        let eventReference = currentView.properties?.eventReference as EhrNewsFeedEventReference;
        return <EhrNewsFeedEventDetailView feed={eventReference.feed}
            pageDate={eventReference.pageDate}
            pageId={eventReference.pageId}
            onViewLabObservationTermInfo={(l) => viewLabTermInfo(l)} />
    }

    if (currentView.key == "TermInformation") {
        if (currentView.properties?.labObservationID) {
            // TODO do a term information view
            let labObservationID = currentView.properties?.labObservationID as string;

        } else {
            let term = currentView.properties?.term as { termFamily: string, termNamespace: string, termCode: string, lang: string };
        }

        return <NavigationBar showCloseButton={true} onClose={() => back()} />
    }

    if (currentView.key == "Medications") {
        return <MedicationsView previewState={props.previewState} />
    }

    if (currentView.key == "Conditions") {
        return <ConditionsView previewState={props.previewState} />
    }

    if (currentView.key == "Allergies") {
        return <AllergiesView previewState={props.previewState} />
    }

    if (currentView.key == "ReportDetail") {
        return <ReportView previewState={"html"} reportId={currentView.properties?.reportId} />
    }

    if (currentView.key == "ExternalAccounts") {
        return <ExternalAccountsView colorScheme={props.colorScheme} />
    }

    return null;
}