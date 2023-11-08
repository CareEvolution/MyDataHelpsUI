import React from "react";
import { EhrNewsFeedEventModel, EhrNewsFeedProcedureModel } from "../../helpers/EhrNewsFeedTypes";
import { Action } from "../../../presentational";
import { format, parseISO } from "date-fns";
import procedureIcon from "./icon-procedure.svg";

export interface ProcedureGroupListItemProps {
    event: EhrNewsFeedEventModel
    showIcon?: boolean
    onClick?(event: EhrNewsFeedEventModel): void
}

export default function ProcedureGroupListItem(props: ProcedureGroupListItemProps) {
    let event = props.event.Event as EhrNewsFeedProcedureModel[];
    let distinctProcedureNames = event.map(f => f.Procedure).filter((value, index, array) => array.indexOf(value) === index);
    return <Action
        icon={props.showIcon ? <img src={procedureIcon} width={24} /> : undefined}
        onClick={props.onClick}
        title={distinctProcedureNames.join(" • ")}
        subtitle={`${format(parseISO(props.event.Date), "h:mm:ss b")} • ${props.event.Patient.RecordAuthority}`}
    />;
}
