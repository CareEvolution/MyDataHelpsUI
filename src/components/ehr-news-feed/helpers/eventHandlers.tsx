import { ReactNode } from "react"
import { EhrNewsFeedClaimProcedureModel, EhrNewsFeedClaimServiceModel, EhrNewsFeedEventModel, EhrNewsFeedEventType, EhrNewsFeedImmunizationModel, EhrNewsFeedLabObservationModel, EhrNewsFeedLabReportModel, EhrNewsFeedProcedureModel, EhrNewsFeedReportModel } from "./types"
import StatBlock from "../../presentational/StatBlock"
import React from "react"
import reportIcon from "../../../assets/icon-report.svg";
import procedureIcon from "../../../assets/icon-procedure.svg";
import immunizationIcon from "../../../assets/icon-immunization.svg";
import labReportIcon from "../../../assets/icon-labreport.svg";
import NewsFeedDetailTitle from "../presentational/NewsFeedDetailTitle/NewsFeedDetailTitle";
import { Card, Title } from "../../presentational";

export interface EventTypeHandler {
    getTitle(event: EhrNewsFeedEventModel): string
    getPreview?(event: EhrNewsFeedEventModel): ReactNode
    getKeywords(event: EhrNewsFeedEventModel): string[]
    getDetailTitle?(event: EhrNewsFeedEventModel): string
    getDetail?(event: EhrNewsFeedEventModel): ReactNode
    icon: any
}


let procedureGroupHandler: EventTypeHandler = {
    getTitle: (event) => {
        let procedureGroupEvent = event.Event as EhrNewsFeedProcedureModel[];
        let distinctProcedureNames = procedureGroupEvent.map(f => f.Procedure).filter((value, index, array) => array.indexOf(value) === index);
        return distinctProcedureNames.join(" • ");
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
        return procedures.length == 1 ? "Procedure" : `${procedures.length} Procedures`;
    },
    getDetail: (event) => {
        let procedures = event.Event as EhrNewsFeedProcedureModel[];
        return <>
            <NewsFeedDetailTitle event={event} />
            {procedures.map((procedure, index) =>
                <Card key={procedure.ID} style={{ marginTop: "0" }}>
                    <Title defaultMargin order={5}>{procedure.Procedure}</Title>
                    <StatBlock labelWidth="90px" defaultMargin stats={[
                        { label: "Type", value: procedure.Type },
                        { label: "Location", value: procedure.Location },
                        { label: "Description", value: procedure.Description == procedure.Procedure ? undefined : procedure.Description },
                        { label: "Performed By", value: procedure.PerformedByCaregiver?.CaregiverName },
                        { label: "Verified By", value: procedure.VerifiedByCaregiver?.CaregiverName }
                    ]} />
                </Card>
            )}
        </>
    }
}



let immunizationHandler: EventTypeHandler = {
    getTitle: (event) => {
        let immunizationEvent = event.Event as EhrNewsFeedImmunizationModel;
        return immunizationEvent.MedicationName;
    },
    getKeywords: (event) => {
        let immunization = event.Event as EhrNewsFeedImmunizationModel;
        return [immunization.MedicationName];
    },
    icon: immunizationIcon
}



let reportHandler: EventTypeHandler = {
    getTitle: (event) => {
        return (event.Event as EhrNewsFeedReportModel).Type;
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
    icon: reportIcon
}



let labReportHandler: EventTypeHandler = {
    getTitle: (event) => {
        return (event.Event as EhrNewsFeedLabReportModel).Service;
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
    getDetailTitle: (event) => "Lab Report"
};



let claimProcedureGroupHandler: EventTypeHandler = {
    getTitle: (event) => {
        let procedureGroupEvent = event.Event as EhrNewsFeedClaimProcedureModel[];
        let distinctProcedureNames = procedureGroupEvent.map(f => f.Procedure).filter((value, index, array) => array.indexOf(value) === index);
        return distinctProcedureNames.join(" • ");
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
        return procedures.length == 1 ? "Procedure" : `${procedures.length} Procedures`;
    },
    getDetail: (event) => {
        let procedures = event.Event as EhrNewsFeedClaimProcedureModel[];
        return <>
            <NewsFeedDetailTitle event={event} />
            {procedures.map((procedure) =>
                <Card key={procedure.ID} style={{ marginTop: "0" }}>
                    <Title defaultMargin order={5}>{procedure.Procedure}</Title>
                    <StatBlock labelWidth="90px" defaultMargin stats={[
                        { label: "Type", value: procedure.Type }
                    ]} />
                </Card>
            )}
        </>
    }
};



let claimServiceGroupHandler: EventTypeHandler = {
    getTitle: (event) => {
        let serviceGroupEvent = event.Event as EhrNewsFeedClaimServiceModel[];
        let distinctServiceNames = serviceGroupEvent.map(f => f.Service).filter((value, index, array) => array.indexOf(value) === index);
        return distinctServiceNames.join(" • ");
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
        return procedures.length == 1 ? "Service Performed" : `${procedures.length} Services Performed`;
    }
};


export const eventTypeHandlers: Record<EhrNewsFeedEventType, EventTypeHandler> = {
    ProcedureGroup: procedureGroupHandler,
    Immunization: immunizationHandler,
    Report: reportHandler,
    LabReport: labReportHandler,
    ClaimProcedureGroup: claimProcedureGroupHandler,
    ClaimServiceGroup: claimServiceGroupHandler
};
