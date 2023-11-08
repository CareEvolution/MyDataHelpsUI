import React from "react";
import { EhrNewsFeedEventModel, EhrNewsFeedProcedureModel } from "../../helpers/EhrNewsFeedTypes"
import { format, parseISO } from "date-fns";
import { Action, Card, Title } from "../../../presentational";
import procedureIcon from "./icon-procedure.svg";
import StatBlock from "../../../presentational/StatBlock";

export interface ProcedureGroupDetailProps {
    event: EhrNewsFeedEventModel
}

export default function (props: ProcedureGroupDetailProps) {
    let event = props.event.Event as EhrNewsFeedProcedureModel[];
    let title = event.length == 1 ? "Procedure" : `${event.length} Procedures`;
    let subtitle = `${format(parseISO(props.event.Date), "EEEE, MMMM do h:mm:ss b")} • ${props.event.Patient.RecordAuthority}`

    return <>
        <Action indicator={<></>} title={title} subtitle={subtitle} icon={<img src={procedureIcon} width={24} />} />
        {event.map((procedure, index) =>
            <Card style={{ marginTop: "0" }}>
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