import React from 'react'
import { HealthAndWellnessView, EhrNewsFeedEventDetailView, MedicationsView, ConditionsView, AllergiesView, ExternalAccountsView } from "../.."
import { TermInformationReference } from '../../presentational/LabResultWithSparkline/LabResultWithSparkline';
import { HealthPreviewSectionConcept } from '../../container/HealthPreviewSection/HealthPreviewSection';
import EhrNewsFeedView from '../EhrNewsFeedView/EhrNewsFeedView';
import { EhrNewsFeedEventReference } from '../../container/EhrNewsFeed/EhrNewsFeed';
import ReportView from '../ReportView/ReportView';
import { EhrNewsFeedEventType, EhrNewsFeedFeed } from '../../../helpers/news-feed/types';
import TermInformationView from '../TermInformationView/TermInformationView';
import MyDataHelps from '@careevolution/mydatahelps-js';

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

    function viewTermInfo(termInfo: TermInformationReference) {
        let term: TermInformationReference = { TermFamily: termInfo.TermFamily, TermNamespace: termInfo.TermNamespace, TermCode: termInfo.TermCode };
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

    function viewBloodTypeInformation() {
        let spanish = MyDataHelps.getCurrentLanguage().toLowerCase().startsWith("es");
        let linkTarget = "https://medlineplus.gov/ency/article/003345.htm";
        if (spanish) linkTarget = "https://medlineplus.gov/spanish/ency/article/003345.htm";
        window.open(linkTarget, "_blank");
    }

    if (!viewStack.length) {
        return <HealthAndWellnessView
            previewState={props.previewState}
            colorScheme={props.colorScheme}
            onViewExternalAccounts={() => viewExternalAccounts()}
            onViewHealthSectionDetails={(concept) => viewHealthSectionDetails(concept)}
            onViewLabs={() => viewLabs()}
            onViewTermInfo={(termInfo) => viewTermInfo(termInfo)}
            onBloodTypeClick={() => viewBloodTypeInformation()}
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
        let feed = eventReference.feed as EhrNewsFeedFeed;
        let detailPreviewState: EhrNewsFeedEventType = "LabReport";
        if (feed == "Procedures") {
            detailPreviewState = "ProcedureGroup";
        }

        return <EhrNewsFeedEventDetailView feed={eventReference.feed}
            presentation="Push"
            pageDate={eventReference.pageDate}
            pageId={eventReference.pageId}
            onViewLabObservationTermInfo={(l) => viewLabTermInfo(l)}
            previewState={detailPreviewState}
            onBack={() => back()} />
    }

    if (currentView.key == "TermInformation") {
        return <TermInformationView
            presentation="Modal"
            openLinksInNewWindow
            previewState={props.previewState}
            term={currentView.properties?.term}
            labObservationID={currentView.properties?.labObservationID}
            onClose={() => back()} />
    }

    if (currentView.key == "Medications") {
        return <MedicationsView
            presentation="Push"
            previewState={props.previewState}
            onBack={() => back()}
            onViewTermInfo={(e) => viewTermInfo(e)} />
    }

    if (currentView.key == "Conditions") {
        return <ConditionsView
            presentation="Push"
            previewState={props.previewState}
            onBack={() => back()}
            onViewTermInfo={(e) => viewTermInfo(e)} />
    }

    if (currentView.key == "Allergies") {
        return <AllergiesView presentation="Push"
            previewState={props.previewState}
            onBack={() => back()}
            onViewTermInfo={(e) => viewTermInfo(e)} />
    }

    if (currentView.key == "ReportDetail") {
        return <ReportView previewState={"html"} reportId={currentView.properties?.reportId} onClose={() => back()} />
    }

    if (currentView.key == "ExternalAccounts") {
        return <ExternalAccountsView
            presentation="Push"
            onBack={() => back()}
            excludeDeviceManufacturers
            colorScheme={props.colorScheme}
            previewState={props.previewState} />
    }

    return null;
}