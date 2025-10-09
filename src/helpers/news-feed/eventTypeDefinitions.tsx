import { ReactNode } from "react"
import { EhrNewsFeedClaimProcedureModel, EhrNewsFeedClaimServiceModel, EhrNewsFeedEventModel, EhrNewsFeedEventType, EhrNewsFeedImmunizationModel, EhrNewsFeedLabObservationModel, EhrNewsFeedLabReportModel, EhrNewsFeedProcedureModel, EhrNewsFeedReportModel } from "./types"
import React from "react"
import reportIcon from "../../assets/icon-report.svg";
import procedureIcon from "../../assets/icon-procedure.svg";
import immunizationIcon from "../../assets/icon-immunization.svg";
import labReportIcon from "../../assets/icon-labreport.svg";
import { claimProcedureGroupEvent, claimServiceGroupEvent, immunizationEvent, labReportEvent, procedureGroupEvent, reportEvent } from "./previewData";
import StatBlock from "../../components/presentational/StatBlock";
import language from "../language";

export interface EventTypeDefinition {
    getTitleItems(event: EhrNewsFeedEventModel): string[]
    getPreview?(event: EhrNewsFeedEventModel): ReactNode
    getKeywords(event: EhrNewsFeedEventModel): string[]
    getDetailTitle?(event: EhrNewsFeedEventModel): string
    getPreviewEvent(): EhrNewsFeedEventModel
    hasDetail?: boolean
    icon: any
}

let procedureGroupHandler: EventTypeDefinition = {
    getTitleItems: (event) => {
        let procedureGroupEvent = event.Event as EhrNewsFeedProcedureModel[];
        let distinctProcedureNames = procedureGroupEvent.map(f => f.Procedure).filter((value, index, array) => array.indexOf(value) === index);
        return distinctProcedureNames;
    },
    icon: procedureIcon,
    getKeywords: (event) => {
        let procedures = event.Event as EhrNewsFeedProcedureModel[];
        let keywords: string[] = [];
        procedures.forEach((procedure) => {
            if (procedure.Procedure) { keywords.push(procedure.Procedure); }
            if (procedure.Type) { keywords.push(procedure.Type); }
            if (procedure.Description) { keywords.push(procedure.Description); }
            if (procedure.Location) { keywords.push(procedure.Location); }
            if (procedure.PerformedByCaregiver?.CaregiverName) { keywords.push(procedure.PerformedByCaregiver.CaregiverName); }
            if (procedure.VerifiedByCaregiver?.CaregiverName) { keywords.push(procedure.VerifiedByCaregiver.CaregiverName); }
        });
        return keywords;
    },
    getDetailTitle: (event) => {
        let procedures = event.Event as EhrNewsFeedProcedureModel[];
        return procedures.length == 1 ? language("procedure") : `${procedures.length} ${language("procedures")}`;
    },
    getPreviewEvent: () => {
        return procedureGroupEvent;
    },
    hasDetail: true
}

let immunizationHandler: EventTypeDefinition = {
    getTitleItems: (event) => {
        let immunizationEvent = event.Event as EhrNewsFeedImmunizationModel;
        return immunizationEvent.MedicationName ? [immunizationEvent.MedicationName] : [];
    },
    getKeywords: (event) => {
        let immunization = event.Event as EhrNewsFeedImmunizationModel;
        return immunization.MedicationName ? [immunization.MedicationName] : [];
    },
    icon: immunizationIcon,
    getPreviewEvent: () => {
        return immunizationEvent;
    }
}

let reportHandler: EventTypeDefinition = {
    getTitleItems: (event) => {
        return [(event.Event as EhrNewsFeedReportModel).Type];
    },
    getKeywords: (event) => {
        let report = event.Event as EhrNewsFeedReportModel;
        return [
            report.Content,
            report.DictatedByCaregiver?.CaregiverName,
            report.Location,
            report.Type,
            report.Summary
        ].filter((keyword) => !!keyword) as string[];
    },
    icon: reportIcon,
    getPreviewEvent: () => {
        return reportEvent;
    },
    hasDetail: true
}

let labReportHandler: EventTypeDefinition = {
    getTitleItems: (event) => {
        return [(event.Event as EhrNewsFeedLabReportModel).Service];
    },
    getPreview: (event) => {
        function getLabObservationValue(labObservation: EhrNewsFeedLabObservationModel) {
            let style: React.CSSProperties = {};
            let acuityElement: ReactNode | undefined;
            if (labObservation.AcuityHighlight === "High") {
                style.fontWeight = "bold";
                style.color = "var(--mdhui-color-danger)";
                acuityElement = <div style={{ backgroundColor: "var(--mdhui-color-danger)" }} className="mdhui-news-feed-list-item-acuity">H</div>;
            }
            if (labObservation.AcuityHighlight === "Low") {
                style.fontWeight = "bold";
                style.color = "var(--mdhui-color-primary)";
                acuityElement = <div style={{ backgroundColor: "var(--mdhui-color-primary)" }} className="mdhui-news-feed-list-item-acuity">L</div>;
            }
            return <div style={style}>{labObservation.Value} {labObservation.Units} {acuityElement}</div>
        }

        let labReport = event.Event as EhrNewsFeedLabReportModel;
        return <StatBlock labelWidth="50%" style={{ marginTop: "4px", marginBottom: "4px", marginLeft: "calc(var(--mdhui-padding-xxs) * -1)" }} alternating stats={labReport.LabObservations.map((observation) => {
            return { label: observation.Type, value: getLabObservationValue(observation) };
        })} />
    },
    icon: labReportIcon,
    getKeywords: (event) => {
        let labReport = event.Event as EhrNewsFeedLabReportModel;
        let keywords: string[] = [
            labReport.AccessionNumber,
            labReport.FillerOrderNumber,
            labReport.PlacerOrderNumber,
            labReport.Comment,
            labReport.Location,
            labReport.OrderingCaregiver?.CaregiverName,
            labReport.Service,
            labReport.ServiceDefinition
        ].filter((keyword) => !!keyword) as string[];
        labReport.LabObservations.forEach((observation) => {
            if (observation.Comment) { keywords.push(observation.Comment); }
            if (observation.Type) { keywords.push(observation.Type); }
            if (observation.Value) { keywords.push(observation.Value); }
            if (observation.TypeDefinition) { keywords.push(observation.TypeDefinition); }
        });
        return keywords;
    },
    getDetailTitle: (event) => language("lab-report"),
    getPreviewEvent: () => {
        return labReportEvent;
    },
    hasDetail: true
};

let claimProcedureGroupHandler: EventTypeDefinition = {
    getTitleItems: (event) => {
        let procedureGroupEvent = event.Event as EhrNewsFeedClaimProcedureModel[];
        return procedureGroupEvent.map(f => f.Procedure).filter((value, index, array) => array.indexOf(value) === index);
    },
    icon: procedureIcon,
    getKeywords: (event) => {
        let procedures = event.Event as EhrNewsFeedClaimProcedureModel[];
        let keywords: string[] = [];
        procedures.forEach((procedure) => {
            if (procedure.Procedure) { keywords.push(procedure.Procedure); }
            if (procedure.Type) { keywords.push(procedure.Type); }
        });
        return keywords;
    },
    getDetailTitle: (event) => {
        let procedures = event.Event as EhrNewsFeedClaimProcedureModel[];
        return procedures.length == 1 ? language("procedure") : `${procedures.length} ${language("procedures")}`;
    },
    getPreviewEvent: () => {
        return claimProcedureGroupEvent;
    },
    hasDetail: true
};

let claimServiceGroupHandler: EventTypeDefinition = {
    getTitleItems: (event) => {
        let serviceGroupEvent = event.Event as EhrNewsFeedClaimServiceModel[];
        return serviceGroupEvent.map(f => f.Service).filter((value, index, array) => array.indexOf(value) === index);
    },
    icon: procedureIcon,
    getKeywords: (event) => {
        let procedures = event.Event as EhrNewsFeedClaimServiceModel[];
        let keywords: string[] = [];
        procedures.forEach((procedure) => {
            if (procedure.Service) { keywords.push(procedure.Service); }
        });
        return keywords;
    },
    getDetailTitle: (event) => {
        let procedures = event.Event as EhrNewsFeedClaimServiceModel[];
        return procedures.length == 1 ? language("service-performed") : `${procedures.length} ${language("services-performed")}`;
    },
    getPreviewEvent: () => {
        return claimServiceGroupEvent;
    },
    hasDetail: true
};

export const eventTypeDefinitions: Record<EhrNewsFeedEventType, EventTypeDefinition> = {
    ProcedureGroup: procedureGroupHandler,
    Immunization: immunizationHandler,
    Report: reportHandler,
    LabReport: labReportHandler,
    ClaimProcedureGroup: claimProcedureGroupHandler,
    ClaimServiceGroup: claimServiceGroupHandler
};
