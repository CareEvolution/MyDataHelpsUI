import React from "react";
import { EhrNewsFeedEventModel, EhrNewsFeedImmunizationModel, EhrNewsFeedProcedureModel } from "../../helpers/types";
import { Action } from "../../../presentational";
import { format, parseISO } from "date-fns";
import getIcon from "../../helpers/icons";

export interface NewsFeedListItemProps {
    event: EhrNewsFeedEventModel
    showIcon?: boolean
    onClick?(event: EhrNewsFeedEventModel): void
}

export default function (props: NewsFeedListItemProps) {
    return <Action
        icon={props.showIcon ? <img src={getIcon(props.event)} width={24} /> : undefined}
        onClick={props.onClick}
        title={getTitle(props.event)}
        subtitle={`${format(parseISO(props.event.Date), "h:mm a")} • ${props.event.Patient.RecordAuthority}`}
    />;
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
}
