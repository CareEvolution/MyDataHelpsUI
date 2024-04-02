import React, { useEffect } from 'react'
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
    "Dashboard" |
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

    function selectReport(reportID: string) {
        pushView({ key: "ReportDetail", properties: { reportID: reportID } });
    }

    function viewBloodTypeInformation() {
        let spanish = MyDataHelps.getCurrentLanguage().toLowerCase().startsWith("es");
        let linkTarget = "https://medlineplus.gov/ency/article/003345.htm";
        if (spanish) linkTarget = "https://medlineplus.gov/spanish/ency/article/003345.htm";
        window.open(linkTarget, "_blank");
    }

    function getView(view: InlineView) {
        if (view.key == "Dashboard") {
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

        if (view.key == "NewsFeed") {
            return <EhrNewsFeedView feed={view.properties?.feed as any}
                previewState={props.previewState}
                presentation="Push" colorScheme={props.colorScheme}
                onEventSelected={(e) => { setViewStack([...viewStack, { key: "NewsFeedEventDetail", properties: { eventReference: e } }]) }}
                onReportSelected={(r) => selectReport(r)}
                onBack={() => back()} />
        }

        if (view.key == "NewsFeedEventDetail") {
            let eventReference = view.properties?.eventReference as EhrNewsFeedEventReference;
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

        if (view.key == "TermInformation") {
            return <TermInformationView
                presentation="Modal"
                openLinksInNewWindow
                previewState={props.previewState}
                term={view.properties?.term}
                labObservationID={view.properties?.labObservationID}
                onClose={() => back()} />
        }

        if (view.key == "Medications") {
            return <MedicationsView
                presentation="Push"
                previewState={props.previewState}
                onBack={() => back()}
                onViewTermInfo={(e) => viewTermInfo(e)} />
        }

        if (view.key == "Conditions") {
            return <ConditionsView
                presentation="Push"
                previewState={props.previewState}
                onBack={() => back()}
                onViewTermInfo={(e) => viewTermInfo(e)} />
        }

        if (view.key == "Allergies") {
            return <AllergiesView presentation="Push"
                previewState={props.previewState}
                onBack={() => back()}
                onViewTermInfo={(e) => viewTermInfo(e)} />
        }

        if (view.key == "ReportDetail") {
            return <ReportView previewState={"html"} reportId={view.properties?.reportId} onClose={() => back()} />
        }

        if (view.key == "ExternalAccounts") {
            return <ExternalAccountsView
                presentation="Push"
                onBack={() => back()}
                excludeDeviceManufacturers
                colorScheme={props.colorScheme}
                previewState={props.previewState}
                reconnectOpenNewWindow={false}
                standaloneModeFinalRedirectPath={"https://mydatahelps.org"} />
        }
    }


    return <>
        {viewStack.map((view, index) =>
            <div style={{ display: index != viewStack.length - 1 ? "none" : undefined }}>{getView(view)}</div>
        )}
    </>
}