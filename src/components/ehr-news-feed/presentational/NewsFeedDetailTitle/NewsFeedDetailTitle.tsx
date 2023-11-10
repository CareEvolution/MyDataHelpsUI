import { format, parseISO } from "date-fns";
import { Action } from "../../../presentational";
import { EhrNewsFeedEventModel } from "../../helpers/types";
import React from "react";
import { eventTypeHandlers } from "../../helpers/eventHandlers";

export interface NewsFeedDetailTitleProps {
    event: EhrNewsFeedEventModel
}

export default function (props: NewsFeedDetailTitleProps) {
    let handler = eventTypeHandlers[props.event.Type];

    let title = handler.getDetailTitle ? handler.getDetailTitle(props.event) : undefined;
    if (!title) { return null; }

    let date = parseISO(props.event.Date);
    let subtitle = `${format(parseISO(props.event.Date), "EEEE, MMMM do, y h:mm a")} • ${props.event.Patient.RecordAuthority}`
    if(format(date, "h:mm a") == "12:00 AM") {
        subtitle = props.event.Patient.RecordAuthority;
    }

    return <Action
        indicator={<></>}
        title={title}
        subtitle={subtitle}
        icon={<img src={handler.icon} width={24} />} />;
}