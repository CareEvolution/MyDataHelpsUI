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


/*
return <div class="event-main">
<div class="cfhr-icon">
    <img src="../../../images/icon-procedure.svg" />
</div>
<div class="event-title" ng-show="expanded">
    <span ng-show="event.Event.length == 1">Procedure</span>
    <span ng-show="event.Event.length > 1">{{event.Event.length}} Procedures</span>
</div>
<div class="event-field" ng-show="!expanded">
    <span ng-repeat="procedure in getProcedureNames() | limitTo:3">
        <strong>{{procedure}}</strong>
        <span ng-show="!$last"> • </span>
    </span>
    <span ng-show="getProcedureNames().length > 3">
        •
        <a href="#">{{getProcedureNames().length - 3}} more</a>
    </span>
</div>
<div class="event-time">{{formatEventDate(event.Date, expanded)}} ({{event.Patient.RecordAuthority}})</div>
</div>
<div class="event-component" ng-show="expanded">
<div class="table-component">
    <table>
        <thead>
            <tr>
                <th>Procedure</th>
                <th ng-show="anyItemWithValue(event.Event, 'Type')">Type</th>
                <th ng-show="anyItemWithValue(event.Event, 'Location')">Location</th>
                <th ng-show="anyItemWithValue(event.Event, 'Description')">Description</th>
                <th ng-show="anyItemWithValue(event.Event, 'PerformedByCaregiver')">Performed By</th>
                <th ng-show="anyItemWithValue(event.Event, 'VerifiedByCaregiver')">Verified By</th>
            </tr>
        </thead>
        <tbody ng-repeat="procedure in event.Event">
            <tr ng-class="{alternating:$index % 2 == 0}">
                <td>{{procedure.Procedure}}</td>
                <td ng-show="anyItemWithValue(event.Event, 'Type')">{{procedure.Type}}</td>
                <td ng-show="anyItemWithValue(event.Event, 'Location')">{{procedure.Location}}</td>
                <td ng-show="anyItemWithValue(event.Event, 'Description')">{{procedure.Description}}</td>
                <td ng-show="anyItemWithValue(event.Event, 'PerformedByCaregiver')"><hw-news-feed-caregiver caregiver="procedure.PerformedByCaregiver"></hw-news-feed-caregiver></td>
                <td ng-show="anyItemWithValue(event.Event, 'VerifiedByCaregiver')"><hw-news-feed-caregiver caregiver="procedure.VerifiedByCaregiver"></hw-news-feed-caregiver></td>
            </tr>
        </tbody>
    </table>
</div>
</div>;()
*/