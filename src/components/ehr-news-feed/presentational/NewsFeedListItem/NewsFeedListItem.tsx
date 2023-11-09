import React, { ReactNode } from "react";
import { EhrNewsFeedClaimProcedureModel, EhrNewsFeedClaimServiceModel, EhrNewsFeedEventModel, EhrNewsFeedImmunizationModel, EhrNewsFeedLabObservationModel, EhrNewsFeedLabReportModel, EhrNewsFeedProcedureModel, EhrNewsFeedReportModel } from "../../helpers/types";
import { Action } from "../../../presentational";
import { format, parseISO } from "date-fns";
import getIcon from "../../helpers/icons";
import StatBlock from "../../../presentational/StatBlock";
import "./NewsFeedListItem.css"

export interface NewsFeedListItemProps {
    event: EhrNewsFeedEventModel
    showIcon?: boolean
    onClick(event: EhrNewsFeedEventModel): void
}

export default function (props: NewsFeedListItemProps) {
    return <Action
        className="mdhui-news-feed-list-item"
        bottomBorder
        icon={props.showIcon ? <img src={getIcon(props.event)} width={24} /> : undefined}
        onClick={isClickable(props.event) ? () => props.onClick!(props.event) : undefined}
        indicator={isClickable(props.event) ? undefined : <></>}
    >
        <div className="mdhui-news-feed-list-item-title">{getTitle(props.event)}</div>
        {getChildren(props.event)}
        <div className="mdhui-news-feed-list-item-date">{`${format(parseISO(props.event.Date), "h:mm a")} • ${props.event.Patient.RecordAuthority}`}</div>
    </Action>;
}

function getTitle(event: EhrNewsFeedEventModel) {
    if (event.Type == "ProcedureGroup") {
        let procedureGroupEvent = event.Event as EhrNewsFeedProcedureModel[];
        let distinctProcedureNames = procedureGroupEvent.map(f => f.Procedure).filter((value, index, array) => array.indexOf(value) === index);
        return distinctProcedureNames.join(" • ");
    }
    if (event.Type == "Immunization") {
        let immunizationEvent = event.Event as EhrNewsFeedImmunizationModel;
        return immunizationEvent.MedicationName;
    }
    if (event.Type == "Report") {
        return (event.Event as EhrNewsFeedReportModel).Type;
    }
    if (event.Type == "LabReport") {
        return (event.Event as EhrNewsFeedLabReportModel).Service;
    }
    if (event.Type == "ClaimProcedureGroup") {
        let procedureGroupEvent = event.Event as EhrNewsFeedClaimProcedureModel[];
        let distinctProcedureNames = procedureGroupEvent.map(f => f.Procedure).filter((value, index, array) => array.indexOf(value) === index);
        return distinctProcedureNames.join(" • ");
    }
    if (event.Type == "ClaimServiceGroup") {
        let serviceGroupEvent = event.Event as EhrNewsFeedClaimServiceModel[];
        let distinctServiceNames = serviceGroupEvent.map(f => f.Service).filter((value, index, array) => array.indexOf(value) === index);
        return distinctServiceNames.join(" • ");
    }
}

function getChildren(event: EhrNewsFeedEventModel) {
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

    if (event.Type == "LabReport") {
        let labReport = event.Event as EhrNewsFeedLabReportModel;
        return <StatBlock labelWidth="50%" style={{ marginTop: "4px", marginBottom: "4px", marginLeft: "calc(var(--mdhui-padding-xxs) * -1)" }} alternating stats={labReport.LabObservations.map((observation) => {
            return { label: observation.Type, value: getLabObservationValue(observation) };
        })} />
    }

    return null;
}

function isClickable(event: EhrNewsFeedEventModel) {
    if (event.Type == "Immunization") {
        return false;
    }
    return true;
}
